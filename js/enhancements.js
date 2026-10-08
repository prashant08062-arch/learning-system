/* ============================================================
   LEARNING SYSTEM — Enhancement Layer
   ============================================================
   Three offline-first features that add classroom-like engagement:

   1. PROGRESSIVE HINTS — guided practice shows hints in 3 levels
      after wrong attempts (2nd wrong → hint 1, 3rd → hint 2,
      4th → full solution). Works with existing `step.hints` array
      or falls back to `step.hint` string.

   2. CONTEXTUAL DOUBTS — each beat can have pre-generated
      FAQs that students can expand. Stored at lecture level as
      `lec.beatDoubts` array: [{ beat: 1, doubts: [{q, a}] }]
      A "💬 Doubts" button appears on each beat in the transcript.

   3. MASTERY TRACKING — tracks per-topic accuracy across guided
      practice problems. Tags each problem with a `topic` field.
      Gates progression: requires ≥80% accuracy before allowing
      next topic. Stored in localStorage as
      learning_system_mastery_<email>.

   All three work 100% offline (no server, no API calls).
   ============================================================ */

(function() {
'use strict';

// ============================================================
// 1. PROGRESSIVE HINTS
// ============================================================
// Hooks into the existing gpCheckAnswer() flow.
// Called from app.js after a wrong answer.
//
// Usage in app.js:
//   In the wrong-answer branch of gpCheckAnswer(), replace:
//     if (gpState.attempts >= 5) { ... show hint ... }
//   with:
//     if (window.Enhancements && window.Enhancements.showProgressiveHint) {
//       window.Enhancements.showProgressiveHint(step, gpState);
//     }
// ============================================================

function showProgressiveHint(step, gpState) {
  const hintEl = document.getElementById('gpHint');
  if (!hintEl) return;

  // Get hints: prefer array form `step.hints`, fall back to `step.hint`
  const hints = Array.isArray(step.hints) ? step.hints : null;
  const singleHint = step.hint || null;

  const attempts = gpState.attempts;

  if (hints && hints.length > 0) {
    // Progressive: show level 1 after 2 wrong, level 2 after 3, level 3 after 4
    let level = -1;
    if (attempts >= 4 && hints.length >= 3) level = 2;
    else if (attempts >= 3 && hints.length >= 2) level = 1;
    else if (attempts >= 2 && hints.length >= 1) level = 0;

    if (level >= 0 && level < hints.length) {
      hintEl.classList.add('show');
      hintEl.innerHTML = '<span class="hint-level">💡 Hint ' + (level + 1) + ' of ' + hints.length + '</span><br>' + hints[level];
      // Auto-scroll hint into view
      hintEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } else if (singleHint && attempts >= 3) {
    // Fall back to old single-hint behaviour
    hintEl.classList.add('show');
    hintEl.textContent = singleHint;
  } else if (attempts >= 5) {
    // Last resort: generic encouragement
    hintEl.classList.add('show');
    hintEl.textContent = "You're close — keep trying. Re-read the question carefully.";
  }
}


// ============================================================
// 2. CONTEXTUAL DOUBTS (FAQs per beat)
// ============================================================
// Injects a "💬 Common Doubts" button into each beat in the
// transcript. When clicked, shows pre-generated Q&A for that beat.
//
// Data format in chapter.js (at lecture level):
//   "beatDoubts": [
//     { "beat": 1, "doubts": [
//       { "q": "Why is profit calculated on CP?", "a": "Because CP is your investment..." },
//       { "q": "What if SP < CP?", "a": "Then it's a loss, not a profit..." }
//     ]},
//     { "beat": 3, "doubts": [...] }
//   ]
//
// Usage in app.js:
//   In renderTranscript(), after creating each beat div, call:
//     if (window.Enhancements) window.Enhancements.injectDoubtButton(div, i, lec);
// ============================================================

function injectDoubtButton(beatDiv, beatIndex, lec) {
  if (!lec || !lec.beatDoubts) return;

  // Find doubts for this beat (beatIndex is 0-based, beat numbers in data are 1-based)
  const beatNum = beatIndex + 1;
  const doubtEntry = lec.beatDoubts.find(d => d.beat === beatNum);
  if (!doubtEntry || !doubtEntry.doubts || doubtEntry.doubts.length === 0) return;

  const doubtBtn = document.createElement('button');
  doubtBtn.className = 'beat-doubt-btn';
  doubtBtn.innerHTML = '💬 ' + doubtEntry.doubts.length + ' Common Question' + (doubtEntry.doubts.length > 1 ? 's' : '');
  doubtBtn.addEventListener('click', function() {
    toggleDoubtPanel(beatDiv, doubtEntry.doubts, doubtBtn);
  });

  // Insert after the beat-text div
  const beatText = beatDiv.querySelector('.beat-text');
  if (beatText) {
    beatText.appendChild(doubtBtn);
  } else {
    beatDiv.appendChild(doubtBtn);
  }
}

function toggleDoubtPanel(beatDiv, doubts, btn) {
  // Check if panel already exists
  let panel = beatDiv.querySelector('.beat-doubt-panel');
  if (panel) {
    // Toggle visibility
    if (panel.style.display === 'none') {
      panel.style.display = '';
      btn.classList.add('active');
    } else {
      panel.style.display = 'none';
      btn.classList.remove('active');
    }
    return;
  }

  // Create the panel
  panel = document.createElement('div');
  panel.className = 'beat-doubt-panel';

  let html = '';
  doubts.forEach((d, i) => {
    html += '<div class="doubt-item">';
    html += '<div class="doubt-q" onclick="this.parentElement.querySelector(\'.doubt-a\').style.display = this.parentElement.querySelector(\'.doubt-a\').style.display === \'none\' ? \'\' : \'none\'">';
    html += '<span class="doubt-q-icon">❓</span> ' + escapeHtml(d.q);
    html += '</div>';
    html += '<div class="doubt-a" style="display:none;">' + escapeHtml(d.a) + '</div>';
    html += '</div>';
  });
  panel.innerHTML = html;

  // Insert after the button
  btn.parentNode.insertBefore(panel, btn.nextSibling);
  btn.classList.add('active');
}

function escapeHtml(s) {
  if (s == null) return '';
  // C4 fix: also escape `"` and `'` so that escaped strings are safe to
  // interpolate into both element content AND into attribute values.
  // Previously only &, <, > were escaped, which broke inline onclick handlers
  // (B4) whenever a doubt text contained an apostrophe.
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


// ============================================================
// 3. MASTERY TRACKING
// ============================================================
// Tracks per-topic accuracy across guided practice problems.
// Each guided practice problem can have a `topic` field.
// When the student answers, we update mastery for that topic.
//
// Mastery levels:
//   untried    → 0 attempts
//   learning   → <50% accuracy
//   struggling → 50-79% accuracy
//   mastered   → ≥80% accuracy (gate passes)
//
// Progression gate: if a problem's topic is "learning" or
// "struggling", show a "Review" prompt and recommend revisiting
// the relevant lecture before proceeding.
//
// Storage: learning_system_mastery_<email>
// ============================================================

const MASTERY_KEY_PREFIX = 'learning_system_mastery_';
const MASTERY_THRESHOLD = 0.80; // 80% accuracy = mastered

function getMasteryStore() {
  const user = window.Auth ? window.Auth.getCurrentUser() : null;
  const uid = user ? (user.email || user.id || 'unknown') : 'guest';
  try {
    const raw = localStorage.getItem(MASTERY_KEY_PREFIX + uid);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveMasteryStore(store) {
  const user = window.Auth ? window.Auth.getCurrentUser() : null;
  const uid = user ? (user.email || user.id || 'unknown') : 'guest';
  localStorage.setItem(MASTERY_KEY_PREFIX + uid, JSON.stringify(store));
}

function getTopicMastery(chapterSlug, topic) {
  const store = getMasteryStore();
  const chapter = store[chapterSlug] || {};
  const t = chapter[topic] || { attempts: 0, correct: 0, level: 'untried' };
  return t;
}

function recordAttempt(chapterSlug, topic, isCorrect) {
  if (!topic) return;
  const store = getMasteryStore();
  if (!store[chapterSlug]) store[chapterSlug] = {};
  if (!store[chapterSlug][topic]) store[chapterSlug][topic] = { attempts: 0, correct: 0, level: 'untried' };

  const t = store[chapterSlug][topic];
  t.attempts++;
  if (isCorrect) t.correct++;

  const accuracy = t.correct / t.attempts;
  if (accuracy >= MASTERY_THRESHOLD && t.attempts >= 3) {
    t.level = 'mastered';
  } else if (accuracy >= 0.5) {
    t.level = 'learning';
  } else {
    t.level = 'struggling';
  }

  saveMasteryStore(store);
  return t;
}

function getMasteryInfo(chapterSlug, topic) {
  if (!topic) return null;
  const t = getTopicMastery(chapterSlug, topic);
  return {
    level: t.level,
    accuracy: t.attempts > 0 ? Math.round((t.correct / t.attempts) * 100) : 0,
    attempts: t.attempts,
    correct: t.correct,
    isMastered: t.level === 'mastered'
  };
}

function getChapterMasterySummary(chapterSlug) {
  const store = getMasteryStore();
  const chapter = store[chapterSlug] || {};
  const topics = Object.keys(chapter);
  const summary = {
    total: topics.length,
    mastered: 0,
    learning: 0,
    struggling: 0,
    untried: 0
  };
  topics.forEach(topic => {
    const level = chapter[topic].level || 'untried';
    if (level === 'mastered') summary.mastered++;
    else if (level === 'learning') summary.learning++;
    else if (level === 'struggling') summary.struggling++;
    else summary.untried++;
  });
  return summary;
}

// Check if a topic is "gated" (student should review before proceeding)
function isTopicGated(chapterSlug, topic) {
  if (!topic) return false;
  const m = getTopicMastery(chapterSlug, topic);
  // Gate is active if the student has tried 3+ times and accuracy < 50%
  return m.attempts >= 3 && (m.correct / m.attempts) < 0.5;
}

// Render mastery badge for a guided practice problem
function renderMasteryBadge(chapterSlug, topic) {
  if (!topic) return '';
  const m = getMasteryInfo(chapterSlug, topic);
  if (!m || m.attempts === 0) return '';

  const levelConfig = {
    mastered: { icon: '✅', label: 'Mastered', color: '#22c55e' },
    learning: { icon: '📖', label: 'Learning', color: '#38bdf8' },
    struggling: { icon: '💪', label: 'Keep Trying', color: '#fbbf24' }
  };
  const cfg = levelConfig[m.level] || levelConfig.learning;
  return '<span class="mastery-badge mastery-' + m.level + '" style="color:' + cfg.color + '">' +
         cfg.icon + ' ' + cfg.label + ' (' + m.accuracy + '%)</span>';
}

// Show a "review" prompt if the student is struggling with a topic
function checkGateAndPrompt(chapterSlug, topic, problemTitle) {
  if (!isTopicGated(chapterSlug, topic)) return null;
  return '💡 You seem to be finding "' + problemTitle + '" tricky. ' +
         'Try reviewing the lecture, then come back. You can do this!';
}


// ============================================================
// PUBLIC API
// ============================================================

window.Enhancements = {
  // Progressive hints
  showProgressiveHint: showProgressiveHint,

  // Contextual doubts
  injectDoubtButton: injectDoubtButton,

  // Mastery tracking
  recordAttempt: recordAttempt,
  getMasteryInfo: getMasteryInfo,
  getChapterMasterySummary: getChapterMasterySummary,
  isTopicGated: isTopicGated,
  renderMasteryBadge: renderMasteryBadge,
  checkGateAndPrompt: checkGateAndPrompt
};

})();
