/* ============================================================
   APP — Main application logic (clean rebuild)
   Renders chapters from window.CHAPTERS[slug] or window.CHAPTER_DATA.
   All functions are null-safe — no crashes on missing data.
   ============================================================ */

(function() {
'use strict';

// ============================================================
// STATE
// ============================================================
var currentGrade = localStorage.getItem('selectedGrade') || '8';
var currentChapterData = null;
var currentSubject = null;
var currentChapter = null;
var lecStates = {};
var gpState = null;

// ============================================================
// GRADE FILTERING
// ============================================================
function filterChaptersByGrade(chapters, grade) {
  if (!chapters) return [];
  if (grade === 'all' || !grade) return chapters;
  return chapters.filter(function(ch) {
    var g = ch.grade;
    if (Array.isArray(g)) return g.map(String).indexOf(String(grade)) !== -1;
    return String(g || '8') === String(grade);
  });
}

// ============================================================
// HOME SCREEN
// ============================================================
function renderHome() {
  var grid = document.getElementById('subjectsGrid');
  if (!grid) return;

  // Show/hide class selector based on login
  var user = window.Auth ? window.Auth.getCurrentUser() : null;
  var selectorBar = document.querySelector('.class-selector-bar');
  if (selectorBar) {
    selectorBar.style.display = (user && user.role === 'student') ? 'none' : '';
  }

  // Set active grade button
  document.querySelectorAll('.class-btn').forEach(function(btn) {
    btn.classList.toggle('active', btn.dataset.grade === currentGrade);
  });

  grid.innerHTML = '';
  var catalog = window.CATALOG;
  if (!catalog || !catalog.subjects) return;

  catalog.subjects.forEach(function(subject) {
    var filtered = filterChaptersByGrade(subject.chapters, currentGrade);
    if (filtered.length === 0) return;

    var card = document.createElement('div');
    card.className = 'subject-card';
    card.innerHTML = '<div class="subject-header">' +
      '<span class="subject-icon">' + (subject.icon || '📚') + '</span>' +
      '<span class="subject-name">' + escapeHtml(subject.name) + '</span>' +
      '<span class="subject-count">' + filtered.length + ' chapter' + (filtered.length > 1 ? 's' : '') + '</span>' +
      '</div><div class="chapters-list"></div>';
    var listEl = card.querySelector('.chapters-list');

    filtered.forEach(function(ch) {
      var item = document.createElement('div');
      item.className = 'chapter-item';
      item.innerHTML = '<div class="chapter-item-title">' + escapeHtml(ch.title) + '</div>' +
        '<div class="chapter-item-subtitle">' + escapeHtml(ch.subtitle || '') + '</div>';
      item.addEventListener('click', function() {
        loadChapter(subject, ch);
      });
      listEl.appendChild(item);
    });

    grid.appendChild(card);
  });
}

// ============================================================
// LOAD CHAPTER
// ============================================================
function loadChapter(subject, chapter) {
  currentSubject = subject;
  currentChapter = chapter;

  // Get chapter data from pre-loaded CHAPTERS or fallback to CHAPTER_DATA
  var data = null;
  if (window.CHAPTERS && window.CHAPTERS[chapter.slug]) {
    data = window.CHAPTERS[chapter.slug];
  } else if (window.CHAPTER_DATA) {
    data = window.CHAPTER_DATA;
  }

  if (!data) {
    console.error('Chapter data not found for:', chapter.slug);
    alert('Could not load chapter: ' + chapter.title + '\n\n' +
          'If you opened this from file:// protocol, make sure all chapter files are listed in index.html.');
    return;
  }

  currentChapterData = data;

  // Show chapter screen
  var hs = document.getElementById('homeScreen');
  var cs = document.getElementById('chapterScreen');
  if (hs) hs.style.display = 'none';
  if (cs) cs.style.display = 'block';

  // Update top bar
  var ts = document.getElementById('chapterTopSubject');
  var tt = document.getElementById('chapterTopTitle');
  if (ts) ts.textContent = subject.name;
  if (tt) tt.textContent = chapter.title;

  // Show/hide logout button
  var lb = document.getElementById('logoutBtn');
  if (lb) lb.style.display = (window.Auth && window.Auth.isLoggedIn && window.Auth.isLoggedIn()) ? '' : 'none';

  // Reset to lecture tab
  switchTab('lecture');

  // Render all sections
  renderLectures();
  renderNotes();
  renderPractice();
  renderRealLife();
  renderGuidedPractice();
  renderSelfTest();

  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ============================================================
// GO HOME
// ============================================================
function goHome() {
  // Stop all lecture playback
  Object.values(lecStates).forEach(function(s) {
    if (s.isPlaying) s.isPlaying = false;
    if (s.playTimer) { clearTimeout(s.playTimer); s.playTimer = null; }
  });
  if (window.TTS) TTS.stopSpeaking();
  if (window.ChalkboardTimeline) window.ChalkboardTimeline.clear();

  var hs = document.getElementById('homeScreen');
  var cs = document.getElementById('chapterScreen');
  if (hs) hs.style.display = 'block';
  if (cs) cs.style.display = 'none';
  currentChapterData = null;
  currentSubject = null;
  currentChapter = null;
  Object.keys(lecStates).forEach(function(k) { delete lecStates[k]; });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ============================================================
// TAB SWITCHING
// ============================================================
function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.section').forEach(function(s) { s.classList.remove('active'); });
  var tab = document.querySelector('.tab[data-tab="' + tabId + '"]');
  var section = document.getElementById(tabId);
  if (tab) tab.classList.add('active');
  if (section) section.classList.add('active');

  // Stop lecture playback when switching tabs
  if (tabId !== 'lecture') {
    Object.values(lecStates).forEach(function(s) {
      if (s.isPlaying) s.isPlaying = false;
      if (s.playTimer) { clearTimeout(s.playTimer); s.playTimer = null; }
      try { s.playBtn.textContent = '▶'; } catch(e) {}
    });
    if (window.TTS) TTS.stopSpeaking();
    if (window.ChalkboardTimeline) window.ChalkboardTimeline.clear();
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ============================================================
// RENDER LECTURES
// ============================================================
function renderLectures() {
  if (!currentChapterData || !currentChapterData.lectures) return;
  var lectures = currentChapterData.lectures;
  var isImageType = currentChapterData.meta && currentChapterData.meta.type === 'image';
  var isGlobeType = currentChapterData.meta && currentChapterData.meta.type === 'globe';
  var basePath = (currentChapterData.meta && currentChapterData.meta.imagesBasePath) || '';

  // Section selector bar
  var bar = document.getElementById('lectureSectionBar');
  if (bar) {
    bar.innerHTML = lectures.map(function(lec, i) {
      return '<button class="lec-sec-btn' + (i === 0 ? ' active' : '') + '" data-lec="' + lec.id + '">' + escapeHtml(lec.label) + '</button>';
    }).join('');
    bar.querySelectorAll('.lec-sec-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var lecId = btn.dataset.lec;
        // Pause all lectures
        Object.values(lecStates).forEach(function(s) {
          if (s.isPlaying) { s.isPlaying = false; try { s.playBtn.textContent = '▶'; } catch(e) {} }
          if (s.playTimer) { clearTimeout(s.playTimer); s.playTimer = null; }
        });
        if (window.TTS) TTS.stopSpeaking();
        // Switch active section
        bar.querySelectorAll('.lec-sec-btn').forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('.lec-section').forEach(function(s) {
          s.classList.remove('active');
          s.setAttribute('aria-hidden', 'true');
        });
        var target = document.querySelector('.lec-section[data-lec-section="' + lecId + '"]');
        if (target) {
          target.classList.add('active');
          target.setAttribute('aria-hidden', 'false');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
      });
    });
  }

  // Render each lecture section
  var container = document.getElementById('lectureContainer');
  if (!container) return;
  container.innerHTML = '';

  lectures.forEach(function(lec, i) {
    var sectionEl = document.createElement('div');
    sectionEl.className = 'lecture-app lec-section' + (i === 0 ? ' active' : '');
    sectionEl.id = 'lec-' + lec.id;
    sectionEl.dataset.lecSection = lec.id;
    if (i !== 0) sectionEl.setAttribute('aria-hidden', 'true');

    var canvasContent = '';
    if (isGlobeType) {
      canvasContent = '<div class="globe-container">Loading 3D globe...</div>';
    } else if (isImageType) {
      var imgs = (lec.images || []).map(function(img, bi) {
        return '<img class="el" data-beat="' + (bi+1) + '" src="' + basePath + (img.file || '') + '" alt="' + escapeHtml(img.caption || '') + '" />';
      }).join('\n');
      canvasContent = '<div class="canvas-stack">' + imgs + '</div>';
      if (lec.svg) canvasContent += '<svg class="lec-overlay" viewBox="' + (lec.viewBox || '0 0 800 600') + '" preserveAspectRatio="xMidYMid meet">' + lec.svg + '</svg>';
    } else {
      canvasContent = '<svg class="lec-board" viewBox="' + (lec.viewBox || '0 0 800 600') + '" preserveAspectRatio="xMidYMid meet">' + (lec.svg || '') + '</svg>';
    }

    sectionEl.innerHTML =
      '<div class="canvas-panel">' + canvasContent + '</div>' +
      '<div class="narration-panel">' +
        '<div class="chapter-title">Section ' + escapeHtml(lec.label || '') + '</div>' +
        '<div class="chapter-name">' + escapeHtml((currentChapterData.meta || {}).title || '') + '</div>' +
        '<div class="transcript lec-transcript"></div>' +
      '</div>' +
      '<div class="voice-bar">' +
        '<label><button class="voice-toggle on"></button><span>🔊 Voice</span></label>' +
        '<div class="voice-speed">' +
          '<button data-speed="0.6">0.6x</button><button data-speed="0.8">0.8x</button>' +
          '<button data-speed="1" class="active">1x</button><button data-speed="1.2">1.2x</button>' +
          '<button data-speed="1.5">1.5x</button>' +
        '</div>' +
        '<select class="voice-select"></select>' +
      '</div>' +
      '<div class="controls lec-controls">' +
        '<button class="control-btn lec-prev">⏮</button>' +
        '<button class="control-btn primary lec-play">▶</button>' +
        '<button class="control-btn lec-next">⏭</button>' +
        '<div class="progress-bar lec-progress"><div class="progress-fill lec-progress-fill" style="width:0%"></div></div>' +
        '<div class="beat-counter lec-counter">1 / ' + (lec.beats ? lec.beats.length : 0) + '</div>' +
      '</div>';

    container.appendChild(sectionEl);
    initLectureState(sectionEl, lec, isImageType, isGlobeType);
  });
}

// ============================================================
// INIT LECTURE STATE
// ============================================================
function initLectureState(sectionEl, lec, isImageType, isGlobeType) {
  var lecId = lec.id;
  var beats = lec.beats || [];
  var state = {
    beats: beats, isImageType: isImageType, isGlobeType: isGlobeType,
    currentBeat: 0, isPlaying: false, playTimer: null,
    voiceOn: true, ttsRate: 1, _destroyed: false
  };
  lecStates[lecId] = state;

  var transcriptEl = sectionEl.querySelector('.lec-transcript');
  var playBtn = sectionEl.querySelector('.lec-play');
  var prevBtn = sectionEl.querySelector('.lec-prev');
  var nextBtn = sectionEl.querySelector('.lec-next');
  var progressFill = sectionEl.querySelector('.lec-progress-fill');
  var counterEl = sectionEl.querySelector('.lec-counter');

  var boardEls = [];
  if (!isGlobeType) {
    boardEls = Array.from(sectionEl.querySelectorAll('svg.lec-board .el, svg.lec-overlay .el'));
  }

  state.playBtn = playBtn;
  state.progressFill = progressFill;
  state.counterEl = counterEl;

  function renderTranscript() {
    if (!transcriptEl) return;
    transcriptEl.innerHTML = '';
    beats.forEach(function(beat, i) {
      var div = document.createElement('div');
      div.className = 'beat ' + (i === state.currentBeat ? 'current' : i < state.currentBeat ? 'past' : 'future');
      div.innerHTML = '<div class="beat-number">Beat ' + (i + 1) + ' of ' + beats.length + '</div>' +
        '<div class="beat-text">' + escapeHtml(beat || '') + '</div>';
      transcriptEl.appendChild(div);
    });
    var cur = transcriptEl.querySelector('.beat.current');
    if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function renderBoard() {
    if (isGlobeType || !boardEls.length) return;
    var sortedEls = boardEls.slice().sort(function(a, b) {
      return parseInt(a.dataset.beat, 10) - parseInt(b.dataset.beat, 10);
    });
    var showCount = state.currentBeat + 1;
    sortedEls.forEach(function(el, i) {
      var shouldShow = i < showCount;
      el.classList.toggle('visible', shouldShow);
      el.classList.remove('pulse');
      if (i === showCount - 1) {
        void el.offsetWidth;
        el.classList.add('pulse');
        restartSVGAnimations(el);
        startChalkboardTimeline(el);
      }
    });
  }

  function restartSVGAnimations(el) {
    if (!el.querySelectorAll) return;
    var animated = el.querySelectorAll('.anim-fade-in, .anim-pop-in, .anim-draw, .anim-pulse-in, .area-tile, .fade-in, .draw-line');
    animated.forEach(function(animEl) {
      if (animEl.getAnimations) {
        var anims = animEl.getAnimations();
        if (anims.length > 0) {
          anims.forEach(function(a) { try { a.cancel(); a.play(); } catch(e) {} });
          return;
        }
      }
    });
  }

  function startChalkboardTimeline(el) {
    if (window.ChalkboardTimeline) window.ChalkboardTimeline.clear();
    if (!lec.timelines && !lec.timeline) return;
    var svgEl = sectionEl.querySelector('svg.lec-board, svg.lec-overlay');
    if (!svgEl) return;
    var beatNum = parseInt(el.getAttribute('data-beat'), 10);
    var timelineSteps = null;

    if (lec.timelines && Array.isArray(lec.timelines)) {
      for (var i = 0; i < lec.timelines.length; i++) {
        if (lec.timelines[i].beat === beatNum) { timelineSteps = lec.timelines[i].steps; break; }
      }
      var allSteps = [];
      lec.timelines.forEach(function(tl) { allSteps = allSteps.concat(tl.steps || []); });
      if (window.ChalkboardTimeline) window.ChalkboardTimeline.reset(svgEl, allSteps);
      if (!timelineSteps) return;
    } else if (lec.timeline) {
      if (lec.timeline.beat !== beatNum) {
        if (window.ChalkboardTimeline) window.ChalkboardTimeline.reset(svgEl, lec.timeline.steps || []);
        return;
      }
      timelineSteps = lec.timeline.steps;
    } else { return; }

    setTimeout(function() {
      if (timelineSteps && window.ChalkboardTimeline) {
        window.ChalkboardTimeline.start(svgEl, timelineSteps);
      }
    }, 10);
  }

  function updateUI() {
    renderTranscript();
    renderBoard();
    if (progressFill) progressFill.style.width = ((state.currentBeat + 1) / Math.max(1, beats.length) * 100) + '%';
    if (counterEl) counterEl.textContent = (state.currentBeat + 1) + ' / ' + beats.length;
  }

  state.updateUI = updateUI;
  state.stop = function() {
    state._destroyed = true;
    state.isPlaying = false;
    if (state.playTimer) { clearTimeout(state.playTimer); state.playTimer = null; }
    if (window.ChalkboardTimeline) window.ChalkboardTimeline.clear();
    if (window.TTS) TTS.stopSpeaking();
    try { playBtn.textContent = '▶'; } catch(e) {}
  };

  function clearTimers() {
    if (state.playTimer) { clearTimeout(state.playTimer); state.playTimer = null; }
    if (window.ChalkboardTimeline) window.ChalkboardTimeline.clear();
  }

  function goToBeat(index) {
    if (index < 0 || index >= beats.length) return;
    if (state._destroyed) return;
    state.currentBeat = index;
    updateUI();
    if (!state.isPlaying) return;
    clearTimers();

    var beatAtCallTime = state.currentBeat;
    function advance() {
      if (state._destroyed || !state.isPlaying) return;
      if (state.currentBeat !== beatAtCallTime) return;
      if (state.currentBeat < beats.length - 1) goToBeat(state.currentBeat + 1);
      else { state.isPlaying = false; playBtn.textContent = '▶'; }
    }

    if (state.voiceOn && window.TTS) {
      TTS.stopSpeaking();
      TTS.speak(beats[state.currentBeat], {
        rate: state.ttsRate,
        onEnd: function() {
          if (state._destroyed || !state.isPlaying) return;
          if (state.currentBeat !== beatAtCallTime) return;
          state.playTimer = setTimeout(advance, 500);
        }
      });
    } else {
      var estMs = Math.max(2500, (beats[state.currentBeat] || '').length / 14 * 1000);
      state.playTimer = setTimeout(advance, estMs);
    }
  }

  function togglePlay() {
    if (state._destroyed) return;
    state.isPlaying = !state.isPlaying;
    playBtn.textContent = state.isPlaying ? '⏸' : '▶';
    if (state.isPlaying) {
      if (state.currentBeat === beats.length - 1) state.currentBeat = 0;
      goToBeat(state.currentBeat);
    } else {
      clearTimers();
      if (window.TTS) TTS.stopSpeaking();
    }
  }

  playBtn.addEventListener('click', togglePlay);
  prevBtn.addEventListener('click', function() {
    state.isPlaying = false; playBtn.textContent = '▶';
    clearTimers();
    if (window.TTS) TTS.stopSpeaking();
    goToBeat(Math.max(0, state.currentBeat - 1));
  });
  nextBtn.addEventListener('click', function() {
    state.isPlaying = false; playBtn.textContent = '▶';
    clearTimers();
    if (window.TTS) TTS.stopSpeaking();
    goToBeat(Math.min(beats.length - 1, state.currentBeat + 1));
  });

  // Voice toggle
  var voiceToggle = sectionEl.querySelector('.voice-toggle');
  if (voiceToggle) {
    voiceToggle.addEventListener('click', function() {
      voiceToggle.classList.toggle('on');
      state.voiceOn = voiceToggle.classList.contains('on');
      if (!state.voiceOn && window.TTS) TTS.stopSpeaking();
    });
  }

  // Speed buttons
  sectionEl.querySelectorAll('.voice-speed button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      sectionEl.querySelectorAll('.voice-speed button').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      state.ttsRate = parseFloat(btn.dataset.speed);
    });
  });

  updateUI();
}

// ============================================================
// RENDER NOTES
// ============================================================
function renderNotes() {
  var el = document.getElementById('notesContent');
  if (!el) return;
  var notes = (currentChapterData && currentChapterData.notes) || '<p>No notes available.</p>';
  el.innerHTML = notes;
}

// ============================================================
// RENDER PRACTICE
// ============================================================
function renderPractice() {
  var el = document.getElementById('practiceContent');
  if (!el) return;
  var practice = (currentChapterData && currentChapterData.practice) || '<p>No practice problems available.</p>';
  el.innerHTML = practice;

  // Wire reveal buttons
  el.querySelectorAll('.reveal-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var answer = btn.nextElementSibling;
      if (answer) {
        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        btn.textContent = answer.style.display === 'none' ? 'Show Answer' : 'Hide Answer';
      }
    });
  });
}

// ============================================================
// RENDER REAL LIFE
// ============================================================
function renderRealLife() {
  var el = document.getElementById('reallifeContent');
  if (!el) return;
  var scenarios = (currentChapterData && currentChapterData.realLife) || [];
  if (scenarios.length === 0) { el.innerHTML = '<p>No real-life scenarios available.</p>'; return; }

  var isImageType = (currentChapterData.meta && currentChapterData.meta.type === 'image') ||
                    (currentChapterData.meta && currentChapterData.meta.type === 'globe');
  var basePath = (currentChapterData.meta && currentChapterData.meta.imagesBasePath) || '';

  var html = '<h2>🌍 Real-Life Connections</h2>' +
    '<p>Tap any scenario below to walk through it step by step.</p>' +
    '<div class="scenario-selector">';

  scenarios.forEach(function(sc) {
    var canvasContent = '';
    if (isImageType && sc.images) {
      var imgs = sc.images.map(function(img, bi) {
        return '<img class="el" data-beat="' + (bi+1) + '" src="' + basePath + (img.file || '') + '" alt="' + escapeHtml(img.caption || '') + '" />';
      }).join('\n');
      canvasContent = '<div class="canvas-stack rl-stack" data-scenario="' + sc.id + '">' + imgs + '</div>';
    } else {
      var rectW = 550, rectH = 700;
      if (sc.viewBox) {
        var parts = String(sc.viewBox).split(/[\s,]+/).map(Number);
        if (parts.length >= 4 && isFinite(parts[2]) && isFinite(parts[3])) {
          rectW = parts[2]; rectH = parts[3];
        }
      }
      canvasContent = '<svg class="rl-board" viewBox="' + (sc.viewBox || '0 0 800 600') + '" preserveAspectRatio="xMidYMid meet">' +
        '<defs><pattern id="rl-grid-' + sc.id + '" width="25" height="25" patternUnits="userSpaceOnUse">' +
        '<path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1e293b" stroke-width="0.5"/></pattern></defs>' +
        '<rect x="0" y="0" width="' + rectW + '" height="' + rectH + '" fill="url(#rl-grid-' + sc.id + ')" />' +
        (sc.svg || '') + '</svg>';
    }

    // Use sc.beats or sc.steps (handles both formats)
    var stepCount = (sc.beats || sc.steps || []).length;

    html += '<div class="scenario-dropdown" data-scenario="' + sc.id + '">' +
      '<div class="scenario-header"><span>' + escapeHtml(sc.title || '') + '</span><span class="chevron">▼</span></div>' +
      '<div class="scenario-body" style="display:none;">' +
        '<div class="real-life-lecture">' +
          '<div class="real-life-canvas">' + canvasContent + '</div>' +
          '<div class="real-life-narration">' +
            '<div class="real-life-title-small">' + escapeHtml(sc.title || '') + '</div>' +
            '<div class="real-life-transcript" data-scenario="' + sc.id + '"></div>' +
          '</div>' +
          '<div class="voice-bar">' +
            '<label><button class="voice-toggle on rl-voice-toggle"></button><span>🔊 Voice</span></label>' +
            '<div class="voice-speed rl-voice-speed">' +
              '<button data-speed="0.6">0.6x</button><button data-speed="0.8">0.8x</button>' +
              '<button data-speed="1" class="active">1x</button><button data-speed="1.2">1.2x</button>' +
              '<button data-speed="1.5">1.5x</button>' +
            '</div>' +
          '</div>' +
          '<div class="controls">' +
            '<button class="control-btn rl-prev">⏮</button>' +
            '<button class="control-btn primary rl-play">▶</button>' +
            '<button class="control-btn rl-next">⏭</button>' +
            '<div class="progress-bar rl-progress"><div class="progress-fill rl-progress-fill" style="width:0%"></div></div>' +
            '<div class="beat-counter rl-counter">1 / ' + stepCount + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  });

  html += '</div>';
  el.innerHTML = html;

  // Wire scenario dropdowns
  el.querySelectorAll('.scenario-dropdown').forEach(function(dropdown) {
    var header = dropdown.querySelector('.scenario-header');
    header.addEventListener('click', function() {
      var body = dropdown.querySelector('.scenario-body');
      var chevron = dropdown.querySelector('.chevron');
      var isOpen = body.style.display !== 'none';
      // Close all others
      el.querySelectorAll('.scenario-body').forEach(function(b) { b.style.display = 'none'; });
      el.querySelectorAll('.chevron').forEach(function(c) { c.textContent = '▼'; });
      if (!isOpen) {
        body.style.display = 'block';
        chevron.textContent = '▲';
        initRealLifeScenario(dropdown);
      }
    });
  });
}

function initRealLifeScenario(dropdown) {
  var scenarioKey = dropdown.dataset.scenario;
  var scenarios = currentChapterData.realLife || [];
  var sc = scenarios.find(function(s) { return s.id === scenarioKey; });
  if (!sc) return;

  // Use beats or steps (handles both formats)
  var beats = sc.beats || sc.steps || [];
  var transcriptEl = dropdown.querySelector('.real-life-transcript');
  var playBtn = dropdown.querySelector('.rl-play');
  var prevBtn = dropdown.querySelector('.rl-prev');
  var nextBtn = dropdown.querySelector('.rl-next');
  var progressFill = dropdown.querySelector('.rl-progress-fill');
  var counterEl = dropdown.querySelector('.rl-counter');
  var boardEls = Array.from(dropdown.querySelectorAll('.el'));

  var rlState = { currentBeat: 0, isPlaying: false, playTimer: null, voiceOn: true, ttsRate: 1 };

  function renderTranscript() {
    if (!transcriptEl) return;
    transcriptEl.innerHTML = '';
    beats.forEach(function(beat, i) {
      var div = document.createElement('div');
      div.className = 'beat ' + (i === rlState.currentBeat ? 'current' : i < rlState.currentBeat ? 'past' : 'future');
      div.innerHTML = '<div class="beat-text">' + escapeHtml(beat || '') + '</div>';
      transcriptEl.appendChild(div);
    });
    var cur = transcriptEl.querySelector('.beat.current');
    if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function renderBoard() {
    if (!boardEls.length) return;
    var sortedEls = boardEls.slice().sort(function(a, b) {
      return parseInt(a.dataset.beat, 10) - parseInt(b.dataset.beat, 10);
    });
    var showCount = rlState.currentBeat + 1;
    sortedEls.forEach(function(el, i) {
      el.classList.toggle('visible', i < showCount);
    });
  }

  function updateUI() {
    renderTranscript();
    renderBoard();
    if (progressFill) progressFill.style.width = ((rlState.currentBeat + 1) / Math.max(1, beats.length) * 100) + '%';
    if (counterEl) counterEl.textContent = (rlState.currentBeat + 1) + ' / ' + beats.length;
  }

  function clearTimers() {
    if (rlState.playTimer) { clearTimeout(rlState.playTimer); rlState.playTimer = null; }
    if (window.TTS) TTS.stopSpeaking();
  }

  function goToBeat(index) {
    if (index < 0 || index >= beats.length) return;
    rlState.currentBeat = index;
    updateUI();
    if (!rlState.isPlaying) return;
    clearTimers();
    var beatAtCallTime = rlState.currentBeat;
    function advance() {
      if (!rlState.isPlaying || rlState.currentBeat !== beatAtCallTime) return;
      if (rlState.currentBeat < beats.length - 1) goToBeat(rlState.currentBeat + 1);
      else { rlState.isPlaying = false; playBtn.textContent = '▶'; }
    }
    if (rlState.voiceOn && window.TTS) {
      TTS.speak(beats[rlState.currentBeat], {
        rate: rlState.ttsRate,
        onEnd: function() {
          if (!rlState.isPlaying || rlState.currentBeat !== beatAtCallTime) return;
          rlState.playTimer = setTimeout(advance, 500);
        }
      });
    } else {
      var estMs = Math.max(2500, (beats[rlState.currentBeat] || '').length / 14 * 1000);
      rlState.playTimer = setTimeout(advance, estMs);
    }
  }

  playBtn.addEventListener('click', function() {
    rlState.isPlaying = !rlState.isPlaying;
    playBtn.textContent = rlState.isPlaying ? '⏸' : '▶';
    if (rlState.isPlaying) {
      if (rlState.currentBeat === beats.length - 1) rlState.currentBeat = 0;
      goToBeat(rlState.currentBeat);
    } else { clearTimers(); }
  });
  prevBtn.addEventListener('click', function() {
    rlState.isPlaying = false; playBtn.textContent = '▶';
    clearTimers();
    goToBeat(Math.max(0, rlState.currentBeat - 1));
  });
  nextBtn.addEventListener('click', function() {
    rlState.isPlaying = false; playBtn.textContent = '▶';
    clearTimers();
    goToBeat(Math.min(beats.length - 1, rlState.currentBeat + 1));
  });

  var voiceToggle = dropdown.querySelector('.rl-voice-toggle');
  if (voiceToggle) {
    voiceToggle.addEventListener('click', function() {
      voiceToggle.classList.toggle('on');
      rlState.voiceOn = voiceToggle.classList.contains('on');
      if (!rlState.voiceOn && window.TTS) TTS.stopSpeaking();
    });
  }
  dropdown.querySelectorAll('.rl-voice-speed button').forEach(function(btn) {
    btn.addEventListener('click', function() {
      dropdown.querySelectorAll('.rl-voice-speed button').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      rlState.ttsRate = parseFloat(btn.dataset.speed);
    });
  });

  updateUI();
}

// ============================================================
// RENDER GUIDED PRACTICE
// ============================================================
function renderGuidedPractice() {
  var el = document.getElementById('guidedApp');
  if (!el) return;
  var problems = (currentChapterData && currentChapterData.guidedPractice) || [];
  if (problems.length === 0) { el.innerHTML = '<div class="content"><p>No guided practice problems available.</p></div>'; return; }

  var html = '<div class="content"><h2>🎯 Guided Practice</h2><p>Solve each problem step by step.</p>';
  problems.forEach(function(p, pi) {
    html += '<div class="gp-problem" data-pidx="' + pi + '">' +
      '<div class="gp-problem-title">' + (pi + 1) + '. ' + escapeHtml(p.title || '') + '</div>' +
      '<div class="gp-problem-statement">' + escapeHtml(p.statement || '') + '</div>';
    if (p.viewBox && p.svg) {
      html += '<svg class="gp-board" viewBox="' + p.viewBox + '" preserveAspectRatio="xMidYMid meet">' + p.svg + '</svg>';
    }
    html += '<div class="gp-step-area"></div></div>';
  });
  html += '</div>';
  el.innerHTML = html;

  // Init each problem
  problems.forEach(function(p, pi) {
    var probEl = el.querySelector('.gp-problem[data-pidx="' + pi + '"]');
    if (probEl) initGuidedProblem(probEl, p);
  });
}

function initGuidedProblem(probEl, p) {
  var steps = p.steps || [];
  var stepArea = probEl.querySelector('.gp-step-area');
  var stepIdx = 0;

  // Collect SVG elements for this problem
  var boardEls = Array.from(probEl.querySelectorAll('svg.gp-board .gel, svg.gp-board .el'));

  function renderStep() {
    if (!stepArea) return;
    if (stepIdx >= steps.length) {
      stepArea.innerHTML = '<div class="gp-complete">✓ ' + escapeHtml(p.finalAnswer || 'Complete!') + '</div>';
      return;
    }
    var step = steps[stepIdx];
    stepArea.innerHTML = '<div class="gp-step">' +
      '<div class="gp-prompt">' + escapeHtml(step.prompt || '') + '</div>' +
      '<div class="gp-input-row">' +
        '<input type="text" class="gp-input" placeholder="' + escapeHtml(step.formatHint || '') + '" />' +
        '<button class="gp-check-btn">Check</button>' +
      '</div>' +
      '<div class="gp-feedback"></div>' +
      '<div class="gp-hint" style="display:none;">' + escapeHtml(step.hint || '') + '</div>' +
      '</div>';

    // Show SVG elements up to current step
    boardEls.forEach(function(el, i) {
      var beat = parseInt(el.dataset.beat, 10) || 0;
      el.classList.toggle('visible', beat <= stepIdx + 1);
    });

    var input = stepArea.querySelector('.gp-input');
    var checkBtn = stepArea.querySelector('.gp-check-btn');
    var feedback = stepArea.querySelector('.gp-feedback');
    var hint = stepArea.querySelector('.gp-hint');

    input.focus();

    checkBtn.addEventListener('click', function() {
      var val = input.value.trim();
      if (!val) { feedback.innerHTML = '<span style="color:#fbbf24;">Please enter an answer.</span>'; return; }
      if (gpValidate(val, step.validate)) {
        feedback.innerHTML = '<span style="color:#34d399;">✓ ' + escapeHtml(step.explanation || 'Correct!') + '</span>';
        stepIdx++;
        setTimeout(renderStep, 1500);
      } else {
        feedback.innerHTML = '<span style="color:#f87171;">✗ Try again.</span>';
        hint.style.display = 'block';
      }
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') checkBtn.click();
    });
  }

  renderStep();
}

function gpValidate(value, validator) {
  if (!validator) return value.trim().length > 0;
  var v = value.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.,;:!?]/g, '');
  switch (validator.type) {
    case 'match':
      return (validator.answers || []).some(function(a) {
        return a.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.,;:!?]/g, '') === v;
      });
    case 'regex':
      try { return new RegExp(validator.pattern, validator.flags || '').test(v); } catch(e) { return false; }
    case 'pureNum':
      return new RegExp('^' + validator.value + '\\.?$').test(v.trim());
    case 'numUnit':
      return new RegExp('^' + validator.value + '\\.?\\s*(' + validator.unit + ')\\.?$', 'i').test(v.trim());
    case 'formula':
      var normalized = v.replace(/\s+/g, '').replace(/²/g, '^2').replace(/[×·*]/g, '').replace(/,/g, '').replace(/–/g, '-');
      return (validator.forms || []).includes(normalized);
    default:
      return value.trim().length > 0;
  }
}

// ============================================================
// RENDER SELF-TEST
// ============================================================
function renderSelfTest() {
  var el = document.getElementById('selftestContent');
  if (!el) return;
  var questions = (currentChapterData && currentChapterData.selfTest) || [];
  if (questions.length === 0) { el.innerHTML = '<p>No self-test questions available.</p>'; return; }

  var html = '<h2>🧪 Quick Self-Test</h2><p>Try each question, then click "Show Answer" to check.</p>';
  questions.forEach(function(q, i) {
    html += '<div class="self-test-card">' +
      '<div class="self-test-q">' + (i + 1) + '. ' + escapeHtml(q.q || '') + '</div>' +
      '<button class="reveal-btn">Show Answer</button>' +
      '<div class="self-test-a" style="display:none;">' + (q.a || '') + '</div>';
    if (q.hint) html += '<div class="self-test-hint">💡 ' + escapeHtml(q.hint) + '</div>';
    html += '</div>';
  });
  el.innerHTML = html;

  el.querySelectorAll('.reveal-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var answer = btn.nextElementSibling;
      if (answer) {
        answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        btn.textContent = answer.style.display === 'none' ? 'Show Answer' : 'Hide Answer';
      }
    });
  });
}

// ============================================================
// HELPER: escape HTML
// ============================================================
function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
  // Class selector buttons
  document.querySelectorAll('.class-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var user = window.Auth ? window.Auth.getCurrentUser() : null;
      if (user && user.role === 'student' && user.grade) return;
      currentGrade = btn.dataset.grade;
      localStorage.setItem('selectedGrade', currentGrade);
      renderHome();
    });
  });

  // Tab buttons
  document.querySelectorAll('.tab').forEach(function(tab) {
    tab.addEventListener('click', function() { switchTab(tab.dataset.tab); });
  });

  // Back button
  var backBtn = document.getElementById('backBtn');
  if (backBtn) backBtn.addEventListener('click', goHome);

  // Render home
  renderHome();

  // Auto-login check
  if (window.Auth && window.Auth.isLoggedIn && window.Auth.isLoggedIn()) {
    var user = window.Auth.getCurrentUser();
    if (user && user.grade) {
      currentGrade = String(user.grade);
      localStorage.setItem('selectedGrade', currentGrade);
      var selectorBar = document.querySelector('.class-selector-bar');
      if (selectorBar) selectorBar.style.display = 'none';
      renderHome();
    }
  }
});

// ============================================================
// GLOBAL API
// ============================================================
window.renderHome = renderHome;
window.loadChapter = loadChapter;
window.goHome = goHome;
window.switchTab = switchTab;
window.renderChapter = function() {
  renderLectures();
  renderNotes();
  renderPractice();
  renderRealLife();
  renderGuidedPractice();
  renderSelfTest();
};
window.onAuthSuccess = function() {
  var user = window.Auth.getCurrentUser();
  if (user && user.grade) {
    currentGrade = String(user.grade);
    localStorage.setItem('selectedGrade', currentGrade);
    var selectorBar = document.querySelector('.class-selector-bar');
    if (selectorBar) selectorBar.style.display = 'none';
    renderHome();
  }
  var lb = document.getElementById('logoutBtn');
  if (lb) lb.style.display = '';
};

})();
