/* ============================================================
   TTS ENGINE — Text-to-Speech (shared across all chapters)
   ============================================================ */

const speech = window.speechSynthesis;
let preferredVoice = null;

function pickVoice() {
  // Find all voice-select dropdowns (they may be created dynamically when
  // a chapter is loaded, so we re-query every time).
  const selects = document.querySelectorAll('.voice-select, .lec-voice-select, #gpVoiceSelect');
  if (selects.length === 0) return;

  // If speechSynthesis is not available, still add a placeholder option
  // so the dropdown is visible (not an empty tiny box).
  if (!speech) {
    selects.forEach(sel => {
      if (sel.options.length === 0) {
        const opt = document.createElement('option');
        opt.textContent = 'Voice N/A';
        opt.disabled = true;
        sel.appendChild(opt);
      }
    });
    return;
  }

  const voices = speech.getVoices();

  // If voices aren't loaded yet, add a placeholder and retry later.
  if (!voices.length) {
    selects.forEach(sel => {
      if (sel.options.length === 0) {
        const opt = document.createElement('option');
        opt.textContent = 'Loading voices…';
        opt.disabled = true;
        sel.appendChild(opt);
      }
    });
    // Retry after a delay (voices may load asynchronously)
    setTimeout(pickVoice, 500);
    return;
  }

  // Auto-pick preferred voice on first call
  if (!preferredVoice) {
    const priority = [
      v => /en-IN/i.test(v.lang) && /female|heera|ravi|neerja/i.test(v.name),
      v => /en-IN/i.test(v.lang),
      v => /en-GB/i.test(v.lang),
      v => /en-US/i.test(v.lang),
      v => /^en/i.test(v.lang)
    ];
    for (const test of priority) {
      const found = voices.find(test);
      if (found) { preferredVoice = found; break; }
    }
    if (!preferredVoice) preferredVoice = voices[0];
  }

  const englishVoices = voices.filter(v => /^en/i.test(v.lang));
  const voicesToUse = englishVoices.length > 0 ? englishVoices : voices;

  selects.forEach(sel => {
    if (!sel) return;
    sel.innerHTML = '';
    voicesToUse.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.name;
      opt.textContent = `${v.name} (${v.lang})`;
      if (preferredVoice && v.name === preferredVoice.name) opt.selected = true;
      sel.appendChild(opt);
    });

    if (!sel._wired) {
      sel.addEventListener('change', () => {
        const picked = voices.find(v => v.name === sel.value);
        if (picked) {
          preferredVoice = picked;
          document.querySelectorAll('.voice-select, .lec-voice-select, #gpVoiceSelect').forEach(other => {
            if (other && other !== sel) other.value = sel.value;
          });
        }
      });
      sel._wired = true;
    }
  });
}

if (speech) {
  speech.onvoiceschanged = pickVoice;
  pickVoice();
  setTimeout(pickVoice, 500);
  setTimeout(pickVoice, 1500);
}

function speak(text, opts = {}) {
  if (!speech) {
    if (opts.onEnd) opts.onEnd();
    return null;
  }
  speech.cancel();

  // Split long text into sentence-sized chunks. Chrome's
  // speechSynthesis has a known bug where utterances longer than
  // ~15 seconds get cut off without firing onend. By splitting
  // into sentences and speaking them sequentially, each chunk is
  // short enough to complete reliably.
  const chunks = chunkText(text);
  if (chunks.length === 0) {
    if (opts.onEnd) opts.onEnd();
    return null;
  }

  let chunkIdx = 0;
  let called = false;
  let currentUtter = null;

  const finishOnce = () => {
    if (called) return;
    called = true;
    if (opts.onEnd) opts.onEnd();
  };

  // Safety timeout: if speech stalls (Chrome bug), force-finish
  // after a generous estimate. Reset on each chunk to avoid
  // premature firing.
  let safetyTimer = null;
  const resetSafety = () => {
    if (safetyTimer) clearTimeout(safetyTimer);
    const chunkMs = Math.max(2000, (chunks[chunkIdx].length / 14) * 1000 / (opts.rate || 1));
    safetyTimer = setTimeout(finishOnce, chunkMs + 6000);
  };

  const speakNextChunk = () => {
    // A3 fix: if cancel() was called, do NOT advance to the next chunk.
    // Previously, when cancel() aborted the current utterance, Chrome fired
    // utter.onerror which incremented chunkIdx and called speakNextChunk(),
    // causing the NEXT chunk to be queued anyway — defeating the cancel.
    if (called) return;
    if (chunkIdx >= chunks.length) {
      if (safetyTimer) clearTimeout(safetyTimer);
      finishOnce();
      return;
    }
    const chunk = chunks[chunkIdx];
    const utter = new SpeechSynthesisUtterance(chunk);
    utter.rate = opts.rate || 1;
    utter.pitch = opts.pitch || 1;
    utter.volume = opts.volume || 1;
    utter.voice = opts.voice || preferredVoice;
    utter.lang = (utter.voice && utter.voice.lang) || 'en-IN';

    utter.onend = () => {
      if (safetyTimer) clearTimeout(safetyTimer);
      chunkIdx++;
      speakNextChunk();
    };
    utter.onerror = (event) => {
      // A3 fix: same guard — don't proceed if we've been cancelled.
      if (called) return;
      if (safetyTimer) clearTimeout(safetyTimer);
      // BUG #7 fix (live-play audit): don't blindly advance to the next chunk
      // on every onerror. Chrome fires onerror for various reasons:
      //  - "interrupted" — speech was cancelled (usually by another speak())
      //  - "canceled" — explicitly cancelled via speech.cancel()
      //  - "not-allowed" — browser blocked autoplay (no user gesture yet)
      //  - "synthesis-failed" — TTS engine failed (e.g. no voices)
      //  - "audio-busy" — another TTS is using the audio device
      //
      // For "interrupted" / "canceled", the cancel() call already set `called`,
      // so we'll hit the early-return above. For "not-allowed" / "audio-busy",
      // we want to STOP — don't keep trying to speak chunks that will all
      // fail the same way. For "synthesis-failed" (common when there are 0
      // voices), advancing is harmless but wastes CPU; just stop.
      const errType = (event && event.error) || 'unknown';
      console.warn('TTS utter.onerror:', errType);
      if (errType === 'not-allowed' || errType === 'audio-busy' || errType === 'synthesis-failed') {
        // Stop the lecture — further chunks will all fail the same way.
        // Don't set `called = true` because the caller's onEnd still wants
        // to fire — just don't queue the next chunk.
        if (safetyTimer) clearTimeout(safetyTimer);
        // Skip to the end so the lecture's onEnd can fire and the lecture
        // auto-advances via the playTimer (without audio).
        chunkIdx = chunks.length;
        finishOnce();
        return;
      }
      // For other errors (e.g. "interrupted" with no specific cause),
      // advance to the next chunk — same as before.
      chunkIdx++;
      speakNextChunk();
    };

    currentUtter = utter;
    resetSafety();
    speech.speak(utter);
  };

  speakNextChunk();
  // A3 fix + C2 fix: cancel() now reliably stops speech.
  // - `called = true` is checked at the top of speakNextChunk() so any
  //   pending onerror/onend callbacks become no-ops.
  // - speech.cancel() is asynchronous in Chrome; we don't need to schedule
  //   a follow-up since the `called` guard catches the eventual onerror.
  return { cancel: () => {
    called = true;
    if (safetyTimer) clearTimeout(safetyTimer);
    try { speech.cancel(); } catch (e) { /* ignore */ }
  } };
}

// Split text into sentence-sized chunks (max ~200 chars each).
// Splits on sentence boundaries (. ! ? …) and long dashes.
function chunkText(text) {
  // C1 fix: return [] for null/undefined so we never create
  // new SpeechSynthesisUtterance(null) which would speak the word "null".
  if (!text) return [];
  if (text.length < 180) return [text];
  const chunks = [];
  // Split on sentence-ending punctuation followed by space, keeping the punctuation
  const sentences = text.match(/[^.!?…]+[.!?…]+|\S+[^.!?…]*$/g) || [text];
  let current = '';
  for (const s of sentences) {
    if ((current + s).length > 200) {
      if (current) { chunks.push(current); current = ''; }
      // If a single sentence is very long, split on commas
      if (s.length > 200) {
        const parts = s.split(/,\s*/);
        let part = '';
        for (const p of parts) {
          if ((part + p).length > 200) {
            if (part) { chunks.push(part); part = ''; }
            if (p.length > 200) {
              // Hard-split very long pieces
              for (let i = 0; i < p.length; i += 200) {
                chunks.push(p.slice(i, i + 200));
              }
            } else {
              part = p + ', ';
            }
          } else {
            part += p + ', ';
          }
        }
        if (part) chunks.push(part);
      } else {
        chunks.push(s);
      }
    } else {
      current += s;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

function stopSpeaking() {
  if (speech) speech.cancel();
}

function attachVoiceBar(rootEl, state) {
  if (!rootEl) return;
  const toggle = rootEl.querySelector('.voice-toggle');
  const speedBtns = rootEl.querySelectorAll('.voice-speed button');
  if (toggle && !toggle._wired) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('on');
      state.voiceOn = toggle.classList.contains('on');
      if (!state.voiceOn) stopSpeaking();
    });
    toggle._wired = true;
  }
  speedBtns.forEach(btn => {
    if (btn._wired) return;
    btn.addEventListener('click', () => {
      speedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.ttsRate = parseFloat(btn.dataset.speed);
    });
    btn._wired = true;
  });
}

// Expose globally
window.TTS = {
  speech,
  speak,
  stopSpeaking,
  attachVoiceBar,
  pickVoice
};
