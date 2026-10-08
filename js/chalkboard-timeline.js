/* ============================================================
   CHALKBOARD TIMELINE CONTROLLER (per-SVG timer tracking)
   ============================================================
   Instead of CSS animation-delay (which runs from page load,
   not when the beat becomes visible), this controller uses
   JavaScript setTimeout to reveal SVG elements at specific
   timestamps that sync with the TTS narration.

   IMPORTANT — Per-SVG timer isolation:
   The controller maintains a SEPARATE timer list per SVG element.
   This prevents the multi-lecture init race condition where each
   lecture's start() call would clear the previous lecture's
   pending timers (leaving the first 3 lectures' beat-1
   animations stuck at opacity:0).

   It also prevents immersive mode from cancelling the dual-screen's
   pending chalkboard timers when the user enters/exits immersive
   mode — each SVG (original + clone) has its own independent
   timeline.

   Usage in chapter.js lecture data:
     "timeline": [
       { "delay": 0,    "show": ["title"] },
       { "delay": 3000, "show": ["mirror-glass", "mirror-silver"] },
       { "delay": 5000, "show": ["label-glass", "label-silver"] },
       ...
     ]

   SVG elements must have id attributes matching the "show" names.
   They start hidden (opacity:0) and are revealed via JS.
   ============================================================ */

(function() {
'use strict';

// Map: svgEl -> array of active timer IDs
// Each SVG element (e.g., the dual-screen SVG and the immersive clone)
// has its own independent set of timers, so starting a timeline on
// one SVG does NOT cancel the timeline running on another SVG.
const activeTimersBySvg = new Map();

// Track SVG elements by a stable key, since Map keys are by reference
// and svgClone could be a different reference but conceptually the "same"
// SVG. We use a data attribute as the key.
let svgKeyCounter = 0;

function getSvgKey(svgEl) {
  if (!svgEl) return null;
  if (!svgEl._ctKey) {
    svgEl._ctKey = 'ct_' + (++svgKeyCounter);
  }
  return svgEl._ctKey;
}

function clearTimersForSvg(svgEl) {
  const key = getSvgKey(svgEl);
  if (!key) return;
  const timers = activeTimersBySvg.get(key);
  if (timers) {
    timers.forEach(function(t) { clearTimeout(t); });
    activeTimersBySvg.delete(key);
  }
}

function clearAllTimers() {
  activeTimersBySvg.forEach(function(timers) {
    timers.forEach(function(t) { clearTimeout(t); });
  });
  activeTimersBySvg.clear();
}

function trackTimer(svgEl, timer) {
  const key = getSvgKey(svgEl);
  if (!key) return;
  if (!activeTimersBySvg.has(key)) {
    activeTimersBySvg.set(key, []);
  }
  activeTimersBySvg.get(key).push(timer);
}

function startTimeline(svgEl, timeline, onComplete) {
  // Only clear timers for THIS svg (per-SVG isolation)
  clearTimersForSvg(svgEl);

  if (!timeline || timeline.length === 0) return;
  if (!svgEl) return;

  // Collect all items up front (stable references)
  var allItems = [];
  timeline.forEach(function(step) {
    (step.show || []).forEach(function(id) { allItems.push({id: id, type: 'show', el: svgEl.querySelector('#' + id)}); });
    (step.draw || []).forEach(function(id) { allItems.push({id: id, type: 'draw', el: svgEl.querySelector('#' + id)}); });
    (step.photon || []).forEach(function(id) { allItems.push({id: id, type: 'photon', el: svgEl.querySelector('#' + id)}); });
    (step.pulse || []).forEach(function(id) { allItems.push({id: id, type: 'pulse', el: svgEl.querySelector('#' + id)}); });
  });

  // PHASE 1: Force-reset ALL elements to hidden state.
  allItems.forEach(function(item) {
    if (!item.el) return;
    item.el.style.transition = 'none';
    item.el.style.opacity = '0';
    if (item.type === 'draw') {
      item.el.style.strokeDasharray = '2000';
      item.el.style.strokeDashoffset = '2000';
    }
    item.el.style.animation = 'none';
  });

  // Force reflow
  void svgEl.offsetWidth;

  // PHASE 2: Re-enable transitions after 50ms
  var phase2Timer = setTimeout(function() {
    allItems.forEach(function(item) {
      if (!item.el) return;
      if (item.type === 'show' || item.type === 'pulse') {
        item.el.style.transition = 'opacity 0.6s ease';
      }
      if (item.type === 'draw') {
        item.el.style.transition = 'opacity 0.3s ease, stroke-dashoffset 1.5s ease';
      }
    });

    // PHASE 3: Schedule each timeline step
    timeline.forEach(function(step) {
      var timer = setTimeout(function() {
        (step.show || []).forEach(function(id) {
          var el = svgEl.querySelector('#' + id);
          if (el) el.style.opacity = '1';
        });
        (step.draw || []).forEach(function(id) {
          var el = svgEl.querySelector('#' + id);
          if (el) {
            el.style.opacity = '1';
            el.style.strokeDashoffset = '0';
          }
        });
        (step.photon || []).forEach(function(id) {
          var el = svgEl.querySelector('#' + id);
          if (el) {
            el.style.opacity = '1';
            el.style.animation = 'photon-travel 3s linear infinite';
          }
        });
        (step.pulse || []).forEach(function(id) {
          var el = svgEl.querySelector('#' + id);
          if (el) {
            el.style.opacity = '1';
            el.style.animation = 'chalk-pulse-anim 0.8s ease-in-out infinite alternate';
          }
        });
      }, step.delay);
      trackTimer(svgEl, timer);
    });
  }, 50);
  trackTimer(svgEl, phase2Timer);
}

window.ChalkboardTimeline = {
  start: startTimeline,
  // clear(svgEl?): if svgEl provided, clears only that SVG's timers.
  // If called without args, clears ALL timers (used by teardown/logout).
  clear: function(svgEl) {
    if (svgEl) {
      clearTimersForSvg(svgEl);
    } else {
      clearAllTimers();
    }
  },
  reset: function(svgEl, timeline) {
    // Only clear timers for THIS svg (per-SVG isolation)
    clearTimersForSvg(svgEl);
    if (!timeline || timeline.length === 0 || !svgEl) return;
    // Force-reset ALL elements to hidden
    timeline.forEach(function(step) {
      (step.show || []).forEach(function(id) {
        var el = svgEl.querySelector('#' + id);
        if (!el) return;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.animation = 'none';
      });
      (step.draw || []).forEach(function(id) {
        var el = svgEl.querySelector('#' + id);
        if (!el) return;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.strokeDasharray = '2000';
        el.style.strokeDashoffset = '2000';
        el.style.animation = 'none';
      });
      (step.photon || []).forEach(function(id) {
        var el = svgEl.querySelector('#' + id);
        if (!el) return;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.animation = 'none';
      });
      (step.pulse || []).forEach(function(id) {
        var el = svgEl.querySelector('#' + id);
        if (!el) return;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.animation = 'none';
      });
    });
    void svgEl.offsetWidth;
  }
};

})();
