/* ============================================================
   TTS ENGINE — Text-to-Speech (simplified, robust)
   Splits long text into sentence chunks for Chrome's 15s bug.
   cancel() reliably stops all speech.
   ============================================================ */

const speech = window.speechSynthesis;
let preferredVoice = null;
let currentHandle = null;

function pickVoice() {
  if (!speech) return;
  const voices = speech.getVoices();
  if (!voices.length) { setTimeout(pickVoice, 500); return; }
  if (!preferredVoice) {
    preferredVoice = voices.find(v => /en-IN/i.test(v.lang)) ||
                     voices.find(v => /en-GB/i.test(v.lang)) ||
                     voices.find(v => /en-US/i.test(v.lang)) ||
                     voices[0];
  }
  document.querySelectorAll('.voice-select, #gpVoiceSelect').forEach(sel => {
    if (!sel.options.length) {
      voices.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.name;
        opt.textContent = v.name + ' (' + v.lang + ')';
        if (preferredVoice && v.name === preferredVoice.name) opt.selected = true;
        sel.appendChild(opt);
      });
    }
  });
}

if (speech) {
  speech.onvoiceschanged = pickVoice;
  pickVoice();
  setTimeout(pickVoice, 500);
}

function chunkText(text) {
  if (!text) return [];
  if (text.length < 180) return [text];
  const sentences = text.match(/[^.!?…]+[.!?…]+|\S+[^.!?…]*$/g) || [text];
  const chunks = [];
  let current = '';
  for (const s of sentences) {
    if ((current + s).length > 200) {
      if (current) { chunks.push(current); current = ''; }
      if (s.length > 200) {
        for (let i = 0; i < s.length; i += 200) chunks.push(s.slice(i, i + 200));
      } else { current = s; }
    } else { current += s; }
  }
  if (current) chunks.push(current);
  return chunks;
}

function speak(text, opts) {
  opts = opts || {};
  stopSpeaking();

  if (!speech) { if (opts.onEnd) opts.onEnd(); return; }

  const chunks = chunkText(text);
  if (!chunks.length) { if (opts.onEnd) opts.onEnd(); return; }

  let idx = 0;
  let cancelled = false;
  let safetyTimer = null;

  function nextChunk() {
    if (cancelled) return;
    if (idx >= chunks.length) {
      if (safetyTimer) clearTimeout(safetyTimer);
      if (opts.onEnd) opts.onEnd();
      return;
    }
    const utter = new SpeechSynthesisUtterance(chunks[idx]);
    utter.rate = opts.rate || 1;
    utter.voice = opts.voice || preferredVoice;
    utter.lang = (utter.voice && utter.voice.lang) || 'en-IN';
    safetyTimer = setTimeout(function() {
      if (!cancelled) { idx++; nextChunk(); }
    }, Math.max(3000, chunks[idx].length * 80) + 5000);
    utter.onend = function() {
      if (cancelled) return;
      if (safetyTimer) clearTimeout(safetyTimer);
      idx++;
      nextChunk();
    };
    utter.onerror = function(e) {
      if (cancelled) return;
      if (safetyTimer) clearTimeout(safetyTimer);
      // For real errors (not-allowed, synthesis-failed), skip to end
      var err = (e && e.error) || '';
      if (err === 'not-allowed' || err === 'synthesis-failed' || err === 'audio-busy') {
        idx = chunks.length;
        if (opts.onEnd) opts.onEnd();
        return;
      }
      // For interrupted/canceled, just stop
      idx++;
      nextChunk();
    };
    try { speech.speak(utter); } catch(e) {}
  }

  nextChunk();

  currentHandle = {
    cancel: function() {
      cancelled = true;
      if (safetyTimer) clearTimeout(safetyTimer);
      try { speech.cancel(); } catch(e) {}
    }
  };
  return currentHandle;
}

function stopSpeaking() {
  if (currentHandle) { currentHandle.cancel(); currentHandle = null; }
  if (speech) { try { speech.cancel(); } catch(e) {} }
}

window.TTS = { speech: speech, speak: speak, stopSpeaking: stopSpeaking, pickVoice: pickVoice };
