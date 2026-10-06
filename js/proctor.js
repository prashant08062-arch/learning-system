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

const MAX_WARNINGS_BEFORE_TERMINATE = 5;
const WARNING_THRESHOLD             = 3;
const FULLSCREEN_CHECK_MS           = 2000;

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

/* ----------------------------------------------------------
   Storage helpers
   ---------------------------------------------------------- */
function getCurrentUserId() {
  const u = window.Auth && window.Auth.getCurrentUser ? window.Auth.getCurrentUser() : null;
  return u ? u.id : null;
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
      lecturesCompleted: 0,
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

function trackLectureBeat(slug, beatNum, totalBeats) {
  if (!slug) return;
  const store = getProgressStore();
  const entry = ensureChapterEntry(store, slug);
  // Track the highest beat reached
  if (beatNum > entry.lecturesCompleted) {
    entry.lecturesCompleted = beatNum;
  }
  if (totalBeats > entry.totalLectures) {
    entry.totalLectures = totalBeats;
  }
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
function showToast(message, type) {
  if (window.Auth && window.Auth._toast) return window.Auth._toast(message, type);
  let toast = document.getElementById('proctorToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'proctorToast';
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
   Fullscreen helpers
   ---------------------------------------------------------- */
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
  overlay.innerHTML = `
    <div style="background:#0f172a;border:1px solid #7f1d1d;border-radius:16px;padding:36px 28px;max-width:480px;width:100%;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,0.7);">
      <div style="font-size:54px;margin-bottom:8px;">🛑</div>
      <h2 style="color:#fca5a5;font-size:24px;margin:0 0 12px;font-weight:700;">Session Terminated</h2>
      <p style="color:#e2e8f0;font-size:14px;line-height:1.6;margin:0 0 16px;">
        Your learning session has been terminated due to a proctoring violation.
      </p>
      <p style="color:#94a3b8;font-size:13px;line-height:1.5;margin:0 0 22px;background:#1e293b;padding:10px 14px;border-radius:8px;border:1px solid #334155;">
        <strong style="color:#fbbf24;">Reason:</strong> ${reason}
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
   ---------------------------------------------------------- */
function handleViolation(reason) {
  if (!proctoringActive) return;
  tabSwitchCount += 1;
  logViolation({
    type: 'tab_switch',
    chapter: activeChapterSlug,
    warning: tabSwitchCount,
    reason: reason || 'Window/tab lost focus'
  });

  if (tabSwitchCount >= MAX_WARNINGS_BEFORE_TERMINATE) {
    // Terminate session
    const reason = `${MAX_WARNINGS_BEFORE_TERMINATE} tab switches detected during proctored session`;
    logViolation({
      type: 'session_terminated',
      chapter: activeChapterSlug,
      reason
    });
    showTerminationOverlay(reason);
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

  // visibilitychange — fires when user switches tab/minimizes
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && proctoringActive) {
      handleViolation('Tab became hidden (visibilitychange)');
    }
  });

  // window blur — fires when window loses focus
  window.addEventListener('blur', () => {
    if (proctoringActive) {
      handleViolation('Window lost focus (blur event)');
    }
  });

  // Detect user exiting fullscreen manually (ESC / F11)
  const onFsChange = () => {
    if (proctoringActive && !isInFullscreen()) {
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
  bindListeners();
  activeChapterSlug = chapterSlug;
  proctoringActive = true;
  tabSwitchCount = 0;
  warningShown = false;

  // Show badge
  if (window.Auth && window.Auth._showProctorBadge) window.Auth._showProctorBadge();

  // Track chapter visit
  trackChapterVisit(chapterSlug);
  trackTabOpen(chapterSlug, 'lecture');
  startTimer(chapterSlug);

  showToast('🔒 Proctoring active. Please stay on this tab.', 'warning');

  // Request fullscreen — wrapped in setTimeout so it fires after click
  setTimeout(() => requestFullscreen(), 100);

  // Periodic fullscreen check
  if (fullscreenTimer) clearInterval(fullscreenTimer);
  fullscreenTimer = setInterval(() => {
    if (proctoringActive && !isInFullscreen()) {
      handleViolation('Not in fullscreen during proctored session');
    }
  }, FULLSCREEN_CHECK_MS);
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
  dismissTermination
};

/* ----------------------------------------------------------
   Bridge with app.js — auto-proctor when chapter loads
   We expose a helper that app.js (or its hooks) can call,
   AND we monkey-patch the existing loadChapter / switchTab /
   goHome if they exist on the global scope.

   Since app.js is wrapped in an IIFE, the cleanest approach
   is for app.js to call window.Proctor.startProctoring(slug)
   itself. We also add DOM-level hooks as a fallback:
   listen for the chapter screen becoming visible.
   ---------------------------------------------------------- */
function hookIntoApp() {
  // Observe chapter screen visibility to auto-start/stop proctoring
  const chapterScreen = document.getElementById('chapterScreen');
  const homeScreen    = document.getElementById('homeScreen');
  if (!chapterScreen) return;

  const observer = new MutationObserver(() => {
    const chapterVisible = chapterScreen.style.display !== 'none' &&
                           window.getComputedStyle(chapterScreen).display !== 'none';
    if (chapterVisible) {
      // Chapter is shown — proctoring will start when a chapter loads
      // (we need a slug — read from chapterTopTitle's parent dataset if available)
      const titleEl = document.getElementById('chapterTopTitle');
      if (titleEl && titleEl.dataset && titleEl.dataset.slug && !proctoringActive) {
        // Start proctoring
        startProctoring(titleEl.dataset.slug);
      }
    } else if (!chapterVisible && proctoringActive) {
      // Chapter hidden — stop proctoring
      stopProctoring();
    }
  });
  observer.observe(chapterScreen, { attributes: true, attributeFilter: ['style'] });
  if (homeScreen) {
    observer.observe(homeScreen, { attributes: true, attributeFilter: ['style'] });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hookIntoApp);
} else {
  hookIntoApp();
}

})();
