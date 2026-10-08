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
  if (!svgEl) return;
  
  // Collect all elements up front (stable references)
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
      if (item.type === 'show' || item.type === 'photon') {
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
      activeTimers.push(timer);
    });
  }, 50);
  activeTimers.push(phase2Timer);
}

window.ChalkboardTimeline = {
  start: startTimeline,
  clear: clearTimers,
  reset: function(svgEl, timeline) {
    clearTimers();
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
