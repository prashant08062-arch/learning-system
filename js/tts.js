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
    utter.onerror = () => {
      if (safetyTimer) clearTimeout(safetyTimer);
      chunkIdx++;
      speakNextChunk();
    };

    currentUtter = utter;
    resetSafety();
    speech.speak(utter);
  };

  speakNextChunk();
  return { cancel: () => { called = true; if (safetyTimer) clearTimeout(safetyTimer); speech.cancel(); } };
}

// Split text into sentence-sized chunks (max ~200 chars each).
// Splits on sentence boundaries (. ! ? …) and long dashes.
function chunkText(text) {
  if (!text || text.length < 180) return [text];
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
