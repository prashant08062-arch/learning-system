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
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = opts.rate || 1;
  utter.pitch = opts.pitch || 1;
  utter.volume = opts.volume || 1;
  utter.voice = opts.voice || preferredVoice;
  utter.lang = (utter.voice && utter.voice.lang) || 'en-IN';

  let called = false;
  const finishOnce = () => {
    if (called) return;
    called = true;
    if (opts.onEnd) opts.onEnd();
  };

  const estimatedMs = Math.max(1500, (text.length / 14) * 1000 / (opts.rate || 1));
  const safety = setTimeout(finishOnce, estimatedMs + 4000);

  utter.onend = () => { clearTimeout(safety); finishOnce(); };
  utter.onerror = () => { clearTimeout(safety); finishOnce(); };

  speech.speak(utter);
  return utter;
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
