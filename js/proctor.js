/* ============================================================
   LEARNING SYSTEM — Progress Tracking + Auto-Proctor
   ============================================================
   This file manages:

   1. PROGRESS TRACKING
      Tracks which chapters a student has visited, which tabs
      they've opened, lecture beats completed, practice problems
      attempted, self-test questions answered.

   2. AUTO-PROCTOR
      When a student opens a chapter, automatically request
      fullscreen mode. Detect tab switching / window blur.
      On 3 tab switches, warn. On 5, terminate the session.

   3. FULLSCREEN ENFORCEMENT
      Check every 2 seconds if still in fullscreen. If not
      (and proctoring active), count it as a violation.

   Storage keys:
     - learning_system_progress_<userId>     : JSON object
     - learning_system_proctor_logs_<userId>  : JSON array
   ============================================================ */

(function() {
'use strict';

const PROGRESS_KEY  = (uid) => `learning_system_progress_${uid}`;
const LOGS_KEY      = (uid) => `learning_system_proctor_logs_${uid}`;

// BUG #1 fix (live-play audit): the previous threshold of 5 was far too
// aggressive for a daily-learning app. A student who briefly checks a
// calculator tab, Wikipedia, or their email would hit 5 violations within
// a few minutes and get force-logged-out — appearing as "audio lapses"
// because the lecture was killed mid-playback.
//
// New thresholds:
// - Proctoring is OPT-IN. It only activates when the parent has explicitly
//   enabled "exam mode" from the parent dashboard (stored as
//   `learning_system_proctor_enabled_<uid>` = 'true'). For daily learning,
//   no proctoring — students can freely switch tabs.
// - When proctoring IS enabled (exam mode), the threshold is 15 violations
//   before termination, with warnings starting at 8.
// - Tab-switch violations are only counted if the tab was hidden for more
//   than 2 seconds (filters out accidental Cmd+Tab flicks).
const MAX_WARNINGS_BEFORE_TERMINATE = 15;
const WARNING_THRESHOLD             = 8;
const FULLSCREEN_CHECK_MS           = 2000;
const TAB_SWITCH_MIN_DURATION_MS    = 2000;  // ignore focus losses shorter than this
const PROCTOR_ENABLED_KEY = (uid) => `learning_system_proctor_enabled_${uid}`;

function isProctorEnabled() {
  const uid = getCurrentUserId();
  if (!uid) return false;
  try {
    return localStorage.getItem(PROCTOR_ENABLED_KEY(uid)) === 'true';
  } catch (e) { return false; }
}

function setProctorEnabled(uid, enabled) {
  if (!uid) return;
  try {
    if (enabled) localStorage.setItem(PROCTOR_ENABLED_KEY(uid), 'true');
    else localStorage.removeItem(PROCTOR_ENABLED_KEY(uid));
  } catch (e) { /* ignore */ }
}

/* ----------------------------------------------------------
   State
   ---------------------------------------------------------- */
let activeChapterSlug   = null;
let proctoringActive    = false;
let tabSwitchCount      = 0;
let warningShown        = false;
let fullscreenTimer     = null;
let chapterTimers       = {};   // slug -> { startedAt, accumulated }
let currentTimerSlug    = null;
let currentTimerStart   = null;
let tabHiddenAt         = 0;     // BUG #1 fix: track when tab became hidden, to filter brief focus losses
let pendingBlurTimeout  = null;  // BUG #1 fix: defer blur violation to check if it's a real tab switch

/* ----------------------------------------------------------
   Storage helpers
   ---------------------------------------------------------- */
function getCurrentUserId() {
  const u = window.Auth && window.Auth.getCurrentUser ? window.Auth.getCurrentUser() : null;
  if (!u) return null;
  // Prefer explicit id; fall back to parentEmail (C7 fix — parent sessions had no id)
  return u.id || u.parentEmail || u.email || null;
}

function getProgressStore(userId) {
  const uid = userId || getCurrentUserId();
  if (!uid) return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY(uid));
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveProgressStore(store, userId) {
  const uid = userId || getCurrentUserId();
  if (!uid) return;
  localStorage.setItem(PROGRESS_KEY(uid), JSON.stringify(store));
}

function getLogStore(userId) {
  const uid = userId || getCurrentUserId();
  if (!uid) return [];
  try {
    const raw = localStorage.getItem(LOGS_KEY(uid));
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveLogStore(logs, userId) {
  const uid = userId || getCurrentUserId();
  if (!uid) return;
  localStorage.setItem(LOGS_KEY(uid), JSON.stringify(logs));
}

function ensureChapterEntry(store, slug) {
  if (!store[slug]) {
    store[slug] = {
      visited: false,
      lastVisited: null,
      // B5 fix: track BOTH the max beat reached (for resume) AND a set of completed
      // lecture ids (for "how many lectures finished"). The old `lecturesCompleted`
      // field actually stored max beat — parent dashboard math was nonsense.
      maxBeatReached: 0,
      completedLectures: [],   // array of lecture ids whose full beat sequence was viewed
      totalLectures: 0,
      tabsOpened: [],
      practiceAnswered: 0,
      practiceCorrect: 0,
      selfTestAnswered: 0,
      selfTestCorrect: 0,
      timeSpent: 0
    };
  }
  return store[slug];
}

/* ----------------------------------------------------------
   Progress tracking API
   ---------------------------------------------------------- */
function trackChapterVisit(slug) {
  if (!slug) return;
  const store = getProgressStore();
  const entry = ensureChapterEntry(store, slug);
  entry.visited = true;
  entry.lastVisited = new Date().toISOString();
  saveProgressStore(store);
}

function trackTabOpen(slug, tab) {
  if (!slug || !tab) return;
  const store = getProgressStore();
  const entry = ensureChapterEntry(store, slug);
  if (!entry.tabsOpened.includes(tab)) {
    entry.tabsOpened.push(tab);
  }
  saveProgressStore(store);
}

function trackLectureBeat(slug, beatNum, totalBeats, lectureId) {
  if (!slug) return;
  const store = getProgressStore();
  const entry = ensureChapterEntry(store, slug);
  // B5 fix: track max beat reached separately from completed lectures.
  if (beatNum > entry.maxBeatReached) {
    entry.maxBeatReached = beatNum;
  }
  if (totalBeats > entry.totalLectures) {
    entry.totalLectures = totalBeats;
  }
  // If a lectureId was supplied AND this beat is the final beat, mark the lecture complete.
  if (lectureId && beatNum >= totalBeats) {
    if (!entry.completedLectures.includes(lectureId)) {
      entry.completedLectures.push(lectureId);
    }
  }
  // Backward-compat: keep legacy `lecturesCompleted` as a mirror of maxBeatReached
  // so old parent-dashboard code keeps working, but the canonical field is
  // `completedLectures.length`.
  entry.lecturesCompleted = entry.maxBeatReached;
  saveProgressStore(store);
}

function trackPractice(slug, correct) {
  if (!slug) return;
  const store = getProgressStore();
  const entry = ensureChapterEntry(store, slug);
  entry.practiceAnswered += 1;
  if (correct) entry.practiceCorrect += 1;
  saveProgressStore(store);
}

function trackSelfTest(slug, correct) {
  if (!slug) return;
  const store = getProgressStore();
  const entry = ensureChapterEntry(store, slug);
  entry.selfTestAnswered += 1;
  if (correct) entry.selfTestCorrect += 1;
  saveProgressStore(store);
}

/* ----------------------------------------------------------
   Time tracking — start/stop per chapter
   ---------------------------------------------------------- */
function startTimer(slug) {
  if (!slug) return;
  // Flush any previous timer
  if (currentTimerSlug && currentTimerSlug !== slug) {
    stopTimer(currentTimerSlug);
  }
  currentTimerSlug = slug;
  currentTimerStart = Date.now();
}

function stopTimer(slug) {
  const targetSlug = slug || currentTimerSlug;
  if (!targetSlug || !currentTimerStart) {
    currentTimerSlug = null;
    currentTimerStart = null;
    return;
  }
  const elapsedSec = Math.floor((Date.now() - currentTimerStart) / 1000);
  if (elapsedSec > 0) {
    const store = getProgressStore();
    const entry = ensureChapterEntry(store, targetSlug);
    entry.timeSpent = (entry.timeSpent || 0) + elapsedSec;
    saveProgressStore(store);
  }
  if (currentTimerSlug === targetSlug) {
    currentTimerSlug = null;
    currentTimerStart = null;
  }
}

function getProgress(userId, slug) {
  const store = getProgressStore(userId);
  return store[slug] || null;
}

function getAllProgress(userId) {
  return getProgressStore(userId);
}

/* ----------------------------------------------------------
   Toast helper (shared with auth.js)
   ---------------------------------------------------------- */
// B6 fix: export a single shared toast so auth.js and proctor.js don't both
// render their own toast at the same screen position.
function showToast(message, type) {
  // Prefer the auth.js toast if it has been exposed (single source of truth)
  if (window.Auth && typeof window.Auth._toast === 'function') {
    return window.Auth._toast(message, type);
  }
  let toast = document.getElementById('sharedToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'sharedToast';
    toast.style.cssText = [
      'position:fixed','top:20px','left:50%','transform:translateX(-50%)',
      'z-index:100001','padding:12px 22px','border-radius:8px',
      'font-size:14px','font-weight:600','color:#0a1326',
      'background:#38bdf8','box-shadow:0 6px 18px rgba(0,0,0,0.4)',
      'max-width:90vw','text-align:center','transition:opacity .3s'
    ].join(';');
    document.body.appendChild(toast);
  }
  if (type === 'error') {
    toast.style.background = '#fca5a5'; toast.style.color = '#7f1d1d';
  } else if (type === 'warning') {
    toast.style.background = '#fbbf24'; toast.style.color = '#0a1326';
  } else if (type === 'success') {
    toast.style.background = '#86efac'; toast.style.color = '#064e3b';
  } else {
    toast.style.background = '#38bdf8'; toast.style.color = '#0a1326';
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.display = 'block';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 350);
  }, 3200);
}

/* ----------------------------------------------------------
   Fullscreen helpers (A1 fix)
   ---------------------------------------------------------- */
// A1 fix: detect up-front whether fullscreen is even supported on this browser.
// iOS Safari does NOT support Element.requestFullscreen on non-video elements,
// so the periodic fullscreen check would generate a false-positive violation
// every 2 seconds and terminate the session in ~10s. We only enforce
// fullscreen when it's actually achievable.
function canFullscreen() {
  const el = document.documentElement;
  return !!(el.requestFullscreen ||
            el.webkitRequestFullscreen ||
            el.mozRequestFullScreen ||
            el.msRequestFullscreen) &&
         // iOS Safari reports webkitRequestFullscreen but only works on <video>.
         // Detect iOS and disable fullscreen enforcement there.
         !(/iPad|iPhone|iPod/.test(navigator.userAgent) &&
            !(window.MSStream));
}

function requestFullscreen() {
  const el = document.documentElement;
  const req = el.requestFullscreen
           || el.webkitRequestFullscreen
           || el.mozRequestFullScreen
           || el.msRequestFullscreen;
  if (req) {
    try {
      const p = req.call(el);
      if (p && p.catch) p.catch(() => {/* user may need to interact first */});
    } catch (e) { /* ignore */ }
  }
}

function exitFullscreen() {
  const exit = document.exitFullscreen
            || document.webkitExitFullscreen
            || document.mozCancelFullScreen
            || document.msExitFullscreen;
  if (exit) {
    try { exit.call(document); } catch (e) { /* ignore */ }
  }
}

function isInFullscreen() {
  return !!(document.fullscreenElement
         || document.webkitFullscreenElement
         || document.mozFullScreenElement
         || document.msFullscreenElement);
}

/* ----------------------------------------------------------
   Proctor log + warning helpers
   ---------------------------------------------------------- */
function logViolation(entry) {
  const uid = getCurrentUserId();
  if (!uid) return;
  const logs = getLogStore(uid);
  logs.push(Object.assign({ timestamp: new Date().toISOString() }, entry));
  saveLogStore(logs, uid);
}

function showWarning(n) {
  showToast(`⚠️ Warning ${n}/${MAX_WARNINGS_BEFORE_TERMINATE}: Tab switching detected. Switching tabs again may terminate your session.`, 'warning');
}

function showTerminationOverlay(reason) {
  // Exit fullscreen first
  exitFullscreen();

  // Stop timer for current chapter
  if (currentTimerSlug) stopTimer(currentTimerSlug);

  // Build overlay (replace if exists)
  let overlay = document.getElementById('terminationOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'terminationOverlay';
    overlay.style.cssText = [
      'position:fixed','inset:0','background:rgba(7, 10, 20, 0.97)',
      'z-index:100010','display:flex','align-items:center','justify-content:center',
      'padding:24px','font-family:Segoe UI, system-ui, sans-serif'
    ].join(';');
    document.body.appendChild(overlay);
  }
  // C6 fix: escape the reason text before interpolating into innerHTML.
  // Currently only ever called with fixed strings, but unsafe pattern.
  const safeReason = String(reason || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  overlay.innerHTML = `
    <div style="background:#0f172a;border:1px solid #7f1d1d;border-radius:16px;padding:36px 28px;max-width:480px;width:100%;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,0.7);">
      <div style="font-size:54px;margin-bottom:8px;">🛑</div>
      <h2 style="color:#fca5a5;font-size:24px;margin:0 0 12px;font-weight:700;">Session Terminated</h2>
      <p style="color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 16px;">
        Your learning session has been terminated due to a proctoring violation.
      </p>
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0 0 22px;background:#1e293b;padding:10px 14px;border-radius:8px;border:1px solid #334155;">
        <strong style="color:#fbbf24;">Reason:</strong> ${safeReason}
      </p>
      <p style="color:#64748b;font-size:11px;margin:0 0 18px;">
        This incident has been logged and will be visible to your parent in the Parent Dashboard.
      </p>
      <button id="terminationBackBtn" style="background:#38bdf8;color:#0a1326;border:0;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;">
        Return to Home
      </button>
    </div>
  `;
  overlay.style.display = 'flex';
  const btn = document.getElementById('terminationBackBtn');
  btn.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlay.innerHTML = '';
    // Hide proctor badge
    if (window.Auth && window.Auth._hideProctorBadge) window.Auth._hideProctorBadge();
    // BUG #4 fix (live-play audit): call App.teardownActiveContent() to fully
    // tear down the lecture player — including the immersive overlay, all
    // timers, TTS voice, and chalkboard timeline. Without this, the
    // `.immersive-overlay.active` element and `body.overflow=hidden` style
    // persist into the next chapter session and the user sees a frozen screen.
    if (window.App && typeof window.App.teardownActiveContent === 'function') {
      try { window.App.teardownActiveContent(); } catch (e) { console.error('teardownActiveContent error:', e); }
    }
    // Go home using app's goHome if available
    if (typeof window.goHome === 'function') {
      window.goHome();
    } else {
      // Fallback: hide chapter screen, show home screen
      const cs = document.getElementById('chapterScreen');
      const hs = document.getElementById('homeScreen');
      if (cs) cs.style.display = 'none';
      if (hs) hs.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
    // Stop proctoring
    stopProctoring();
  });
}

/* ----------------------------------------------------------
   Tab-switch / blur violation handler
   A1 fix: debounce violations (so a single tab switch doesn't fire both
   visibilitychange AND blur) and require the document to actually be hidden
   before counting a blur as a violation.
   ---------------------------------------------------------- */
let lastViolationAt = 0;
const VIOLATION_DEBOUNCE_MS = 800;

function handleViolation(reason) {
  if (!proctoringActive) return;
  const now = Date.now();
  // A1 fix: debounce — within 800ms, count only ONE violation per incident.
  // This prevents a single tab switch from firing both `visibilitychange`
  // and `blur` and being counted twice.
  if (now - lastViolationAt < VIOLATION_DEBOUNCE_MS) return;
  lastViolationAt = now;
  tabSwitchCount += 1;
  logViolation({
    type: 'tab_switch',
    chapter: activeChapterSlug,
    warning: tabSwitchCount,
    reason: reason || 'Window/tab lost focus'
  });

  if (tabSwitchCount >= MAX_WARNINGS_BEFORE_TERMINATE) {
    // Terminate session
    const termReason = `${MAX_WARNINGS_BEFORE_TERMINATE} tab switches detected during proctored session`;
    logViolation({
      type: 'session_terminated',
      chapter: activeChapterSlug,
      reason: termReason
    });
    showTerminationOverlay(termReason);
    stopProctoring();
  } else if (tabSwitchCount >= WARNING_THRESHOLD) {
    showWarning(tabSwitchCount);
  } else {
    showToast(`Tab switch detected (${tabSwitchCount}/${MAX_WARNINGS_BEFORE_TERMINATE})`, 'warning');
  }
}

/* ----------------------------------------------------------
   Event listeners (added once)
   ---------------------------------------------------------- */
let listenersBound = false;
function bindListeners() {
  if (listenersBound) return;
  listenersBound = true;

  // visibilitychange — fires when user switches tab/minimizes. This is the
  // authoritative signal; blur alone is too noisy (browser chrome clicks,
  // DevTools open, OS notifications, etc. all fire blur).
  //
  // BUG #1 fix: only count as a violation if the tab was hidden for more than
  // TAB_SWITCH_MIN_DURATION_MS (2 seconds). Filters out accidental Cmd+Tab
  // flicks where the user immediately returns.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (proctoringActive) {
        tabHiddenAt = Date.now();
      }
    } else {
      // Tab became visible again
      if (proctoringActive && tabHiddenAt > 0) {
        const hiddenDuration = Date.now() - tabHiddenAt;
        if (hiddenDuration >= TAB_SWITCH_MIN_DURATION_MS) {
          handleViolation(`Tab was hidden for ${Math.round(hiddenDuration/1000)}s`);
        }
        tabHiddenAt = 0;
      }
    }
  });

  // window blur — A1 fix: only count as a violation if the document is ALSO
  // hidden. Most browsers fire blur for many benign reasons (clicking the
  // address bar, opening DevTools, clicking a notification) and these should
  // NOT trigger a violation on their own.
  // BUG #1 fix: even when document.hidden is true, defer the violation by
  // TAB_SWITCH_MIN_DURATION_MS so we can cancel it if the user returns quickly.
  window.addEventListener('blur', () => {
    if (proctoringActive && document.hidden) {
      if (pendingBlurTimeout) clearTimeout(pendingBlurTimeout);
      pendingBlurTimeout = setTimeout(() => {
        // Re-check that the document is still hidden after the timeout
        if (proctoringActive && document.hidden) {
          handleViolation('Window lost focus while tab hidden');
        }
        pendingBlurTimeout = null;
      }, TAB_SWITCH_MIN_DURATION_MS);
    }
  });
  // Cancel pending blur violation if window regains focus quickly
  window.addEventListener('focus', () => {
    if (pendingBlurTimeout) {
      clearTimeout(pendingBlurTimeout);
      pendingBlurTimeout = null;
    }
  });

  // Detect user exiting fullscreen manually (ESC / F11) — only enforce if
  // fullscreen is supported on this browser (A1 fix).
  const onFsChange = () => {
    if (proctoringActive && canFullscreen() && !isInFullscreen()) {
      handleViolation('Exited fullscreen during proctored session');
    }
  };
  document.addEventListener('fullscreenchange', onFsChange);
  document.addEventListener('webkitfullscreenchange', onFsChange);
  document.addEventListener('mozfullscreenchange', onFsChange);
  document.addEventListener('MSFullscreenChange', onFsChange);
}

/* ----------------------------------------------------------
   Start / Stop proctoring
   ---------------------------------------------------------- */
function startProctoring(chapterSlug) {
  if (!chapterSlug) return;
  if (!window.Auth || !window.Auth.isLoggedIn || !window.Auth.isLoggedIn()) {
    // Not logged in — skip proctoring (e.g., preview)
    return;
  }
  // BUG #1 fix: proctoring is opt-in. Only active when parent has enabled
  // "exam mode" for this student. Daily learning has NO proctoring — students
  // can freely switch tabs without losing their session.
  if (!isProctorEnabled()) {
    // Still track chapter visit + start the timer (for progress dashboard),
    // but do NOT bind visibility/blur/fullscreen violation listeners.
    activeChapterSlug = chapterSlug;
    trackChapterVisit(chapterSlug);
    trackTabOpen(chapterSlug, 'lecture');
    startTimer(chapterSlug);
    return;
  }
  bindListeners();
  activeChapterSlug = chapterSlug;
  proctoringActive = true;
  tabSwitchCount = 0;
  warningShown = false;
  lastViolationAt = 0;
  tabHiddenAt = 0;

  // Show badge
  if (window.Auth && window.Auth._showProctorBadge) window.Auth._showProctorBadge();

  // Track chapter visit
  trackChapterVisit(chapterSlug);
  trackTabOpen(chapterSlug, 'lecture');
  startTimer(chapterSlug);

  showToast('🔒 Exam mode active. Please stay on this tab.', 'warning');

  // A1 fix: do NOT defer fullscreen via setTimeout. Calling requestFullscreen()
  // from inside startProctoring (which is invoked from app.js loadChapter, NOT
  // a user gesture) means the browser will reject the request. The rejection is
  // silent, and then the periodic 2s check fires violations until termination.
  //
  // The correct flow: app.js's chapter-card click handler (which IS a user
  // gesture) should call window.Proctor.requestFullscreen() directly. We
  // attempt it here as a best-effort, but we DO NOT start the periodic
  // fullscreen check unless fullscreen is actually supported AND we are
  // currently in fullscreen.
  //
  // Best-effort attempt — if it works, great; if not, no harm.
  if (canFullscreen()) {
    try { requestFullscreen(); } catch (e) { /* ignore */ }
    // Periodic fullscreen check — only enforce if we successfully entered
    // fullscreen at some point during this session. We track that with
    // `everEnteredFullscreen`.
    if (fullscreenTimer) clearInterval(fullscreenTimer);
    let everEnteredFullscreen = isInFullscreen();
    fullscreenTimer = setInterval(() => {
      if (!proctoringActive) return;
      if (isInFullscreen()) {
        everEnteredFullscreen = true;
      } else if (everEnteredFullscreen) {
        // We WERE in fullscreen and now we're not — that's a manual exit.
        handleViolation('Not in fullscreen during proctored session');
      }
      // If we never entered fullscreen, don't fault the user — the browser
      // may simply not have honoured the request (e.g. iOS).
    }, FULLSCREEN_CHECK_MS);
  }
  // If canFullscreen() is false (iOS Safari), we skip fullscreen enforcement
  // entirely and rely only on visibilitychange + blur for proctoring.
}

function stopProctoring() {
  proctoringActive = false;
  activeChapterSlug = null;
  tabSwitchCount = 0;
  warningShown = false;
  if (fullscreenTimer) {
    clearInterval(fullscreenTimer);
    fullscreenTimer = null;
  }
  if (currentTimerSlug) stopTimer(currentTimerSlug);
  exitFullscreen();
  if (window.Auth && window.Auth._hideProctorBadge) window.Auth._hideProctorBadge();
}

function getProctorLogs(userId) {
  return getLogStore(userId);
}

/* ----------------------------------------------------------
   Termination overlay removal helper (for parent dashboard use)
   ---------------------------------------------------------- */
function dismissTermination() {
  const o = document.getElementById('terminationOverlay');
  if (o) { o.style.display = 'none'; o.innerHTML = ''; }
}

/* ----------------------------------------------------------
   PUBLIC API
   ---------------------------------------------------------- */
window.Proctor = {
  trackChapterVisit,
  trackTabOpen,
  trackLectureBeat,
  trackPractice,
  trackSelfTest,
  startTimer,
  stopTimer,
  getProgress,
  getAllProgress,
  startProctoring,
  stopProctoring,
  getProctorLogs,
  requestFullscreen,
  exitFullscreen,
  canFullscreen,
  isProctorEnabled,
  setProctorEnabled,
  dismissTermination
};

/* ----------------------------------------------------------
   Bridge with app.js (B1 fix — simplified)

   Previously, this file used a MutationObserver on #chapterScreen to
   auto-start proctoring when the chapter screen became visible. That
   caused double-starts (app.js loadChapter AND the observer both fired
   startProctoring) and silently discarded the first timer's elapsed time.

   The observer has been removed. app.js is now the sole authority and
   calls window.Proctor.startProctoring(slug) directly from loadChapter.

   C7 fix: getCurrentUserId now falls back to parentEmail/email if `id`
   is absent, so parent sessions no longer write to
   `learning_system_progress_undefined`.
   ---------------------------------------------------------- */

})();
