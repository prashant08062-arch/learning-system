/* ============================================================
   CHALKBOARD TIMELINE CONTROLLER
   ============================================================
   Instead of CSS animation-delay (which runs from page load,
   not when the beat becomes visible), this controller uses
   JavaScript setTimeout to reveal SVG elements at specific
   timestamps that sync with the TTS narration.

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

const activeTimers = [];

function clearTimers() {
  activeTimers.forEach(function(t) { clearTimeout(t); });
  activeTimers.length = 0;
}

function startTimeline(svgEl, timeline, onComplete) {
  clearTimers();
  
  if (!timeline || timeline.length === 0) return;
  
  // PHASE 1: Force-reset ALL elements to hidden state.
  // Disable transitions first so the reset is instant, then
  // re-enable transitions after a microtask.
  var allIds = [];
  timeline.forEach(function(step) {
    (step.show || []).forEach(function(id) { allIds.push({id: id, type: 'show'}); });
    (step.draw || []).forEach(function(id) { allIds.push({id: id, type: 'draw'}); });
    (step.photon || []).forEach(function(id) { allIds.push({id: id, type: 'photon'}); });
    (step.pulse || []).forEach(function(id) { allIds.push({id: id, type: 'pulse'}); });
  });
  
  // Disable transitions and reset to hidden
  allIds.forEach(function(item) {
    var el = svgEl.querySelector('#' + item.id);
    if (!el) return;
    el.style.transition = 'none';
    if (item.type === 'show' || item.type === 'photon' || item.type === 'draw') {
      el.style.opacity = '0';
    }
    if (item.type === 'draw') {
      el.style.strokeDasharray = '2000';
      el.style.strokeDashoffset = '2000';
    }
    if (item.type === 'photon') {
      el.style.animation = 'none';
    }
    if (item.type === 'pulse') {
      el.style.animation = 'none';
      el.style.opacity = '0';
    }
  });
  
  // Force reflow to apply the reset
  void svgEl.offsetWidth;
  
  // PHASE 2: Re-enable transitions (after a short delay so the
  // browser registers the reset state)
  setTimeout(function() {
    allIds.forEach(function(item) {
      var el = svgEl.querySelector('#' + item.id);
      if (!el) return;
      if (item.type === 'show' || item.type === 'photon' || item.type === 'draw') {
        el.style.transition = 'opacity 0.6s ease';
      }
      if (item.type === 'draw') {
        el.style.transition = 'opacity 0.3s ease, stroke-dashoffset 2s ease';
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
      activeTimers.push(timer);
    });
    
    // Schedule completion callback
    if (onComplete) {
      var lastDelay = timeline[timeline.length - 1].delay + 3000;
      var completeTimer = setTimeout(onComplete, lastDelay);
      activeTimers.push(completeTimer);
    }
  }, 50); // 50ms delay to ensure browser registers the reset
  
  // Start title immediately (delay 0 steps should run after reset)
  var immediateSteps = timeline.filter(function(s) { return s.delay === 0; });
  // These will be handled by the setTimeout above, but with a 50ms delay
  // which is close enough to "immediate"
}

window.ChalkboardTimeline = {
  start: startTimeline,
  clear: clearTimers,
  reset: function(svgEl, timeline) {
    clearTimers();
    if (!timeline || timeline.length === 0) return;
    // Force-reset ALL elements to hidden (same as startTimeline Phase 1)
    var allIds = [];
    timeline.forEach(function(step) {
      (step.show || []).forEach(function(id) { allIds.push({id: id, type: 'show'}); });
      (step.draw || []).forEach(function(id) { allIds.push({id: id, type: 'draw'}); });
      (step.photon || []).forEach(function(id) { allIds.push({id: id, type: 'photon'}); });
      (step.pulse || []).forEach(function(id) { allIds.push({id: id, type: 'pulse'}); });
    });
    allIds.forEach(function(item) {
      var el = svgEl.querySelector('#' + item.id);
      if (!el) return;
      el.style.transition = 'none';
      el.style.opacity = '0';
      if (item.type === 'draw') {
        el.style.strokeDasharray = '2000';
        el.style.strokeDashoffset = '2000';
      }
      el.style.animation = 'none';
    });
    void svgEl.offsetWidth;
  }
};

})();
