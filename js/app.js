/* ============================================================
   LEARNING SYSTEM — Main Application
   ============================================================
   This file:
     1. Renders the home screen (subjects + chapters)
     2. Loads chapter data dynamically
     3. Renders the chapter interface (6 tabs)
     4. Handles lecture player (SVG or image based)
     5. Handles real-life scenarios, guided practice, self-test

   Architecture:
     - catalog.js (loaded first) defines window.CATALOG
     - When user selects a chapter, we dynamically load its
       dataFile (e.g., data/maths/baudhayana_pythagoras/chapter.js)
       which sets window.CHAPTER_DATA
     - Then we render the chapter interface from CHAPTER_DATA
   ============================================================ */

(function() {
'use strict';
// ====================================================================
// GRADE FILTERING — Class 6 / Class 7 / Class 8 / All
// ====================================================================
let currentGrade = localStorage.getItem('selectedGrade') || '6';

function filterChaptersByGrade(chapters, grade) {
  if (!chapters) return [];
  if (grade === 'all') return chapters;
  return chapters.filter(ch => String(ch.grade || '8') === grade);
}



// State
let currentChapterData = null;
let currentSubject = null;
let currentChapter = null;
const lecStates = {};
let gpState = null;

// ====================================================================
// HOME SCREEN — Render subjects & chapters
// ====================================================================
function renderHome() {
  const grid = document.getElementById('subjectsGrid');
  grid.innerHTML = '';

  window.CATALOG.subjects.forEach(subject => {
    const _filteredChapters = filterChaptersByGrade(subject.chapters, currentGrade);
    if (_filteredChapters.length === 0) return;
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.style.setProperty('--subject-color', subject.color);
    card.dataset.subjectId = subject.id;

    const chapterCount = _filteredChapters.length;
    const countLabel = chapterCount === 0 ? 'No chapters yet' :
                       chapterCount === 1 ? '1 chapter' :
                       `${chapterCount} chapters`;

    card.innerHTML = `
      <div class="subject-icon">${subject.icon}</div>
      <div class="subject-name">${subject.name}</div>
      <div class="subject-count ${chapterCount > 0 ? 'has-chapters' : ''}">${countLabel}</div>
      <div class="chapters-list">
        ${chapterCount === 0 ?
          '<div style="padding:14px; text-align:center; color:#64748b; font-size:12px; font-style:italic;">Chapters coming soon</div>' :
          _filteredChapters.map(ch => `
            <div class="chapter-item" data-chapter-slug="${ch.slug}">
              <div class="chapter-item-title">${ch.title}</div>
              <div class="chapter-item-subtitle">${ch.subtitle}</div>
              <div class="chapter-item-desc">${ch.description}</div>
              <div class="chapter-item-meta">⏱ ${ch.estimatedTime} · ${ch.hasImages ? '🖼️ Image-based' : '✏️ SVG-based'}</div>
            </div>
          `).join('')
        }
      </div>
    `;

    // Click on card (not on a chapter) toggles expansion
    card.addEventListener('click', (e) => {
      if (e.target.closest('.chapter-item')) return;
      // Collapse all other cards
      document.querySelectorAll('.subject-card').forEach(c => {
        if (c !== card) c.classList.remove('expanded');
      });
      card.classList.toggle('expanded');
    });

    // Click on a chapter item loads the chapter
    card.querySelectorAll('.chapter-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const slug = item.dataset.chapterSlug;
        const chapter = subject.chapters.find(c => c.slug === slug);
        if (chapter) loadChapter(subject, chapter);
      });
    });

    grid.appendChild(card);
  });
}

// ====================================================================
// LOAD CHAPTER — Dynamically load chapter.js and render
// ====================================================================
function loadChapter(subject, chapter) {
  currentSubject = subject;
  currentChapter = chapter;
  // Dispose any existing globe viewers and clear lecture states
  Object.values(lecStates).forEach(s => {
    if (s.globe && typeof s.globe.dispose === 'function') s.globe.dispose();
  });
  Object.keys(lecStates).forEach(k => delete lecStates[k]);
  currentChapterData = null;
  gpState = null;

  // Show chapter screen
  document.getElementById('homeScreen').style.display = 'none';
  document.getElementById('chapterScreen').style.display = 'block';

  // Update top bar
  document.getElementById('chapterTopSubject').textContent = subject.name;
  const chapterTopTitleEl = document.getElementById('chapterTopTitle');
  chapterTopTitleEl.textContent = chapter.title;
  // Stash the slug on the title element so proctor.js can pick it up
  // (proctor.js uses a MutationObserver on the chapter screen)
  chapterTopTitleEl.dataset.slug = chapter.slug || '';

  // Start auto-proctoring for this chapter (if student is logged in)
  if (window.Proctor && chapter.slug) {
    window.Proctor.startProctoring(chapter.slug);
  }

  // Show loading state
  document.getElementById('lectureContainer').innerHTML =
    '<div style="padding:40px; text-align:center; color:#64748b;">Loading chapter…</div>';
  document.getElementById('notesContent').innerHTML = '<p>Loading…</p>';
  document.getElementById('practiceContent').innerHTML = '<p>Loading…</p>';
  document.getElementById('reallifeContent').innerHTML = '<p>Loading…</p>';
  document.getElementById('guidedApp').innerHTML = '<div class="content"><p>Loading…</p></div>';
  document.getElementById('selftestContent').innerHTML = '<p>Loading…</p>';
  document.getElementById('lectureSectionBar').innerHTML = '';

  // Reset to lecture tab
  switchTab('lecture');
  window.scrollTo({ top: 0, behavior: 'instant' });

  // Dynamically load the chapter data file
  const script = document.createElement('script');
  script.src = chapter.dataFile;
  script.onload = () => {
    currentChapterData = window.CHAPTER_DATA;
    if (currentChapterData) {
      renderChapter();
    } else {
      console.error('Chapter data not found in', chapter.dataFile);
      alert('Chapter data not found in: ' + chapter.dataFile);
      goHome();
    }
  };
  script.onerror = () => {
    alert('Failed to load chapter data: ' + chapter.dataFile);
    goHome();
  };
  document.head.appendChild(script);
}

function goHome() {
  document.getElementById('homeScreen').style.display = 'block';
  document.getElementById('chapterScreen').style.display = 'none';
  if (window.TTS) TTS.stopSpeaking();
  // Stop proctoring when returning to home screen
  if (window.Proctor) window.Proctor.stopProctoring();
  // Dispose all globe viewers
  Object.values(lecStates).forEach(s => {
    if (s.globe && typeof s.globe.dispose === 'function') s.globe.dispose();
  });
  Object.keys(lecStates).forEach(k => delete lecStates[k]);
  currentChapterData = null;
  currentSubject = null;
  currentChapter = null;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ====================================================================
// TAB SWITCHING
// ====================================================================
function switchTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const section = document.getElementById(tabId);
  if (tab) tab.classList.add('active');
  if (section) section.classList.add('active');
  if (window.TTS) TTS.stopSpeaking();
  // Track tab open in proctor progress
  if (window.Proctor && window.Proctor.trackTabOpen && currentChapter) {
    window.Proctor.trackTabOpen(currentChapter.slug, tabId);
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// ====================================================================
// RENDER CHAPTER — Build all 6 tabs from CHAPTER_DATA
// ====================================================================
function renderChapter() {
  if (!currentChapterData) {
    console.warn('renderChapter called with no currentChapterData');
    return;
  }

  renderLectures();
  renderNotes();
  renderPractice();
  renderRealLife();
  renderGuidedPractice();
  renderSelfTest();

  // Test Paper tab — only show for Maths chapters
  var testpaperTab = document.querySelector('.tab-testpaper');
  if (testpaperTab) {
    var subj = currentChapterData.meta.subject || (currentSubject ? currentSubject.id : '');
    if (subj === 'maths' && window.TestPaper) {
      testpaperTab.style.display = '';
      // Render the test paper intro
      window.TestPaper.render(currentChapterData);
    } else {
      testpaperTab.style.display = 'none';
      // If the test paper tab was active, switch back to lecture
      if (testpaperTab.classList.contains('active')) {
        switchTab('lecture');
      }
    }
  }

  // Populate voice-select dropdowns after rendering (they are created dynamically)
  if (window.TTS && TTS.pickVoice) {
    setTimeout(() => TTS.pickVoice(), 100);
    setTimeout(() => TTS.pickVoice(), 600);
  }
}

// ====================================================================
// LECTURES — Multi-section lecture player
// Supports both SVG-based and image-based chapters
// ====================================================================
function renderLectures() {
  const data = currentChapterData;
  const lectures = data.lectures || [];
  const chapterType = data.meta.type;  // 'svg', 'image', or 'globe'
  const isImageType = chapterType === 'image';
  const isGlobeType = chapterType === 'globe';
  const basePath = data.meta.imagesBasePath || '';

  // Render section selector bar
  const bar = document.getElementById('lectureSectionBar');
  bar.innerHTML = lectures.map((lec, i) =>
    `<button class="lec-sec-btn${i === 0 ? ' active' : ''}" data-lec="${lec.id}">${lec.label}</button>`
  ).join('');

  // Render each lecture section
  const container = document.getElementById('lectureContainer');
  container.innerHTML = '';

  lectures.forEach((lec, i) => {
    const active = i === 0 ? 'active' : '';
    const sectionEl = document.createElement('div');
    sectionEl.className = `lecture-app lec-section ${active}`;
    sectionEl.id = `lec-${lec.id}`;
    sectionEl.dataset.lecSection = lec.id;

    let canvasContent;
    if (isGlobeType) {
      // Globe-based: a container div that will hold the Three.js canvas
      canvasContent = `<div class="globe-container" id="globe-${lec.id}"><div class="globe-loading">Loading 3D globe…</div></div>`;
    } else if (isImageType) {
      // Image-based: stack of <img> elements
      const imgs = (lec.images || []).map((img, bi) =>
        `<img class="el" data-beat="${bi+1}" src="${basePath}${img.file}" alt="${img.caption || ''}" loading="lazy" />`
      ).join('\n          ');

      if (lec.svg) {
        // HYBRID (image + SVG overlay): the historical image stays as a
        // backdrop, and an SVG layer on top shows beat-synced bullets,
        // year markers, arrows and highlights — so the screen feels
        // alive even on beats that share the same image.
        canvasContent = `
          <div class="canvas-stack hybrid-stack">
            <div class="image-layer">${imgs}</div>
            <svg class="lec-board lec-overlay" viewBox="${lec.viewBox || '0 0 600 460'}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
              ${lec.svg}
            </svg>
          </div>`;
      } else {
        canvasContent = `<div class="canvas-stack">${imgs}</div>`;
      }
    } else {
      // SVG-based: inline SVG with groups
      canvasContent = `
        <svg class="lec-board" viewBox="${lec.viewBox}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
          ${lec.svg || ''}
        </svg>`;
    }

    sectionEl.innerHTML = `
      <div class="canvas-panel">${canvasContent}</div>
      <div class="narration-panel">
        <div class="chapter-title">Section ${lec.label}</div>
        <div class="chapter-name">${data.meta.title}</div>
        <div class="transcript lec-transcript" data-lec="${lec.id}"></div>
      </div>
      <div class="voice-bar">
        <label>
          <button class="voice-toggle on lec-voice-toggle" data-lec="${lec.id}" title="Toggle voice"></button>
          <span>🔊 Voice</span>
        </label>
        <div class="voice-speed lec-voice-speed" data-lec="${lec.id}">
          <button data-speed="0.6">0.6x</button>
          <button data-speed="0.8">0.8x</button>
          <button data-speed="1" class="active">1x</button>
          <button data-speed="1.2">1.2x</button>
          <button data-speed="1.5">1.5x</button>
        </div>
        <select class="voice-select lec-voice-select" data-lec="${lec.id}"></select>
      </div>
      <div class="controls lec-controls" data-lec="${lec.id}">
        <button class="control-btn lec-prev">⏮</button>
        <button class="control-btn primary lec-play">▶</button>
        <button class="control-btn lec-next">⏭</button>
        <div class="progress-bar lec-progress"><div class="progress-fill lec-progress-fill" style="width:0%"></div></div>
        <div class="beat-counter lec-counter">1 / ${lec.beats.length}</div>
        <button class="control-btn lec-immersive-btn" title="Immersive mode — full-screen animation with beat text at bottom" style="margin-left:auto;">🎬</button>
      </div>
    `;
    container.appendChild(sectionEl);

    // Initialize state for this lecture
    initLectureState(sectionEl, lec, isImageType, isGlobeType);
  });

  // Wire section selector buttons
  container.querySelectorAll('.lec-sec-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lecId = btn.dataset.lec;
      Object.values(lecStates).forEach(s => { if (s.stop) s.stop(); });
      document.querySelectorAll('.lec-sec-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.lec-section').forEach(s => s.classList.remove('active'));
      const target = document.querySelector(`.lec-section[data-lec-section="${lecId}"]`);
      if (target) {
        target.classList.add('active');
        const st = lecStates[lecId];
        if (st && st.updateUI) st.updateUI();
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
  // Note: section bar buttons are above container; re-wire them
  document.querySelectorAll('#lectureSectionBar .lec-sec-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lecId = btn.dataset.lec;
      Object.values(lecStates).forEach(s => { if (s.stop) s.stop(); });
      document.querySelectorAll('#lectureSectionBar .lec-sec-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.lec-section').forEach(s => s.classList.remove('active'));
      const target = document.querySelector(`.lec-section[data-lec-section="${lecId}"]`);
      if (target) {
        target.classList.add('active');
        const st = lecStates[lecId];
        if (st && st.updateUI) st.updateUI();
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  });
}

function initLectureState(sectionEl, lec, isImageType, isGlobeType) {
  const lecId = lec.id;
  const beats = lec.beats;
  const locations = currentChapterData.locations || {};
  const basePath = currentChapterData.meta.imagesBasePath || '';

  let imgPerBeat = [];
  if (isImageType) {
    const imgs = lec.images || [];
    const nBeats = beats.length;

    // Check if any image has atBeat specified
    const hasAtBeat = imgs.some(img => img.atBeat !== undefined);

    if (hasAtBeat) {
      // Use explicit atBeat mapping: for each beat, show the image with
      // the largest atBeat <= current beat (1-based). Image stays visible
      // from its atBeat until the next image's atBeat.
      for (let bi = 0; bi < nBeats; bi++) {
        const beat1 = bi + 1;  // 1-based beat number
        let imgIdx = 0;
        for (let i = 0; i < imgs.length; i++) {
          const atBeat = imgs[i].atBeat || 1;
          if (atBeat <= beat1) {
            imgIdx = i;
          }
        }
        imgPerBeat.push(imgIdx);
      }
    } else {
      // Fall back to even distribution
      const nImgs = imgs.length;
      for (let bi = 0; bi < nBeats; bi++) {
        imgPerBeat.push(nImgs > 0 ? Math.min(Math.floor(bi * nImgs / Math.max(1, nBeats)), nImgs - 1) : 0);
      }
    }
  }

  const state = {
    beats,
    imgPerBeat,
    isImageType,
    isGlobeType,
    locations,
    basePath,
    currentBeat: 0,
    isPlaying: false,
    playTimer: null,
    voiceOn: true,
    ttsRate: 1,
    globe: null
  };
  lecStates[lecId] = state;

  const transcriptEl = sectionEl.querySelector('.lec-transcript');
  const playBtn = sectionEl.querySelector('.lec-play');
  const prevBtn = sectionEl.querySelector('.lec-prev');
  const nextBtn = sectionEl.querySelector('.lec-next');
  const progressFill = sectionEl.querySelector('.lec-progress-fill');
  const progressBar = sectionEl.querySelector('.lec-progress');
  const counterEl = sectionEl.querySelector('.lec-counter');

  let boardEls, imgEls;
  if (isImageType) {
    imgEls = Array.from(sectionEl.querySelectorAll('.canvas-stack img.el'));
    // HYBRID: also collect SVG overlay elements (if present) so they
    // can be revealed beat-by-beat on top of the cycling image.
    boardEls = Array.from(sectionEl.querySelectorAll('svg.lec-overlay .el'));
  } else if (!isGlobeType) {
    boardEls = Array.from(sectionEl.querySelectorAll('svg.lec-board .el'));
  }

  // Initialize globe if this is a globe-type lecture
  if (isGlobeType && window.GlobeViewer) {
    const globeContainer = sectionEl.querySelector('.globe-container');
    if (globeContainer) {
      // Wait for the container to have proper dimensions
      setTimeout(() => {
        // Remove loading indicator
        const loading = globeContainer.querySelector('.globe-loading');
        if (loading) loading.remove();
        state.globe = new GlobeViewer(globeContainer);
        // Focus on the first beat's location
        renderGlobe();
      }, 100);
    }
  }

  if (window.TTS) TTS.attachVoiceBar(sectionEl.querySelector('.voice-bar'), state);

  function renderTranscript() {
    transcriptEl.innerHTML = '';
    state.beats.forEach((beat, i) => {
      const div = document.createElement('div');
      div.className = 'beat ' + (i === state.currentBeat ? 'current' : i < state.currentBeat ? 'past' : 'future');
      div.innerHTML = `<div class="beat-number">Beat ${i + 1} of ${state.beats.length}</div><div class="beat-text">${beat}</div>`;
      // Inject "💬 Common Doubts" button if this beat has pre-generated FAQs
      if (window.Enhancements && window.Enhancements.injectDoubtButton) {
        window.Enhancements.injectDoubtButton(div, i, lec);
      }
      transcriptEl.appendChild(div);
    });
    const cur = transcriptEl.querySelector('.beat.current');
    if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ----------------------------------------------------------------
  // Globe rendering: rotate to the current beat's location
  // ----------------------------------------------------------------
  function renderGlobe() {
    if (!state.globe) return;

    // Get the location key for the current beat
    const beatLocations = lec.beatLocations || [];
    const locKey = beatLocations[state.currentBeat];
    const loc = state.locations[locKey];

    if (loc) {
      state.globe.focusOn(loc.lat, loc.lng, loc.label, loc.zoom || 2.5);
    }

    // Check if there's an image overlay for this beat
    const beatImages = lec.beatImages || {};
    const imgInfo = beatImages[state.currentBeat + 1];  // 1-based
    if (imgInfo) {
      state.globe.showImageOverlay(state.basePath + imgInfo.file, imgInfo.caption);
    } else {
      state.globe.clearImageOverlay();
    }
  }

  function renderBoard() {
    if (isGlobeType) {
      renderGlobe();
    } else if (isImageType) {
      // 1) Cycle the background image per beat (existing behaviour).
      const targetIdx = state.imgPerBeat[state.currentBeat] || 0;
      imgEls.forEach((img, i) => {
        const shouldShow = i === targetIdx;
        const wasVisible = img.classList.contains('visible');
        img.classList.toggle('visible', shouldShow);
        img.classList.remove('pulse');
        if (shouldShow && !wasVisible) {
          void img.offsetWidth;
          img.classList.add('pulse');
        }
      });
      // 2) HYBRID: reveal ONLY the current beat's SVG element.
      // Uses RANK-BASED matching: sort elements by data-beat value,
      // then the Nth element in sorted order = beat N. This handles
      // SVGs where data-beat starts at 2 or has gaps — the first
      // element still shows at beat 1.
      if (boardEls && boardEls.length) {
        const sortedEls = Array.from(boardEls).sort((a, b) =>
          parseInt(a.dataset.beat, 10) - parseInt(b.dataset.beat, 10)
        );
        const currentRank = state.currentBeat; // 0-based rank
        sortedEls.forEach((el, i) => {
          const isCurrent = i === currentRank;
          el.classList.toggle('visible', isCurrent);
          el.classList.remove('pulse');
          if (isCurrent) {
            void el.offsetWidth;
            el.classList.add('pulse');
            // Restart CSS animations inside this beat group so
            // they play from the beginning when the beat becomes
            // active (not on page load).
            restartSVGAnimations(el);
          }
        });
      }
    } else {
      // Pure-SVG chapters: accumulate — each beat adds to the diagram.
      // Uses RANK-BASED matching: sort elements by data-beat value,
      // then show the first (currentBeat + 1) elements. This handles
      // SVGs where data-beat starts at 2 or has gaps — the first
      // element still shows at beat 1.
      const sortedEls = Array.from(boardEls).sort((a, b) =>
        parseInt(a.dataset.beat, 10) - parseInt(b.dataset.beat, 10)
      );
      const showCount = state.currentBeat + 1; // 1-based count
      sortedEls.forEach((el, i) => {
        const shouldShow = i < showCount;
        const wasVisible = el.classList.contains('visible');
        el.classList.toggle('visible', shouldShow);
        el.classList.remove('pulse');
        if (i === showCount - 1) {
          void el.offsetWidth;
          el.classList.add('pulse');
          // Restart CSS animations for the newly-visible beat.
          // Always restart (not just when !wasVisible) because
          // navigating back to a previously-seen beat should also
          // replay the animations.
          restartSVGAnimations(el);
          // Check if this beat has a chalkboard timeline and start it
          startChalkboardTimeline(el);
        }
      });
    }
  }

  // Start chalkboard timeline if this beat has one.
  // The timeline data is stored at lecture level as:
  //   lec.timeline = { beat: 2, steps: [{delay, show, draw, photon, pulse}] }
  // When the beat becomes visible, elements are revealed at specific
  // timestamps synced with the TTS narration.
  function startChalkboardTimeline(el) {
    // Clear any existing timeline timers
    if (window.ChalkboardTimeline) {
      window.ChalkboardTimeline.clear();
    }
    
    if (!lec) return;
    
    // Get the beat number of this element
    var beatNum = parseInt(el.getAttribute('data-beat'), 10);
    
    // Find the SVG element containing this beat group
    var svgEl = sectionEl.querySelector('svg.lec-board');
    if (!svgEl) return;
    
    // Support both single-timeline (lec.timeline) and multi-timeline (lec.timelines)
    var timelineSteps = null;
    
    if (lec.timelines && Array.isArray(lec.timelines)) {
      // Multi-timeline: find the one matching this beat
      for (var i = 0; i < lec.timelines.length; i++) {
        if (lec.timelines[i].beat === beatNum) {
          timelineSteps = lec.timelines[i].steps;
          break;
        }
      }
      
      // ALWAYS reset ALL timeline elements from ALL beats before
      // starting a new timeline. This ensures beat 2's elements
      // are hidden when navigating to beat 3, etc.
      var allSteps = [];
      lec.timelines.forEach(function(tl) { allSteps = allSteps.concat(tl.steps); });
      if (window.ChalkboardTimeline) {
        window.ChalkboardTimeline.reset(svgEl, allSteps);
      }
      
      if (!timelineSteps) {
        return;
      }
    } else if (lec.timeline) {
      if (lec.timeline.beat !== beatNum) {
        if (window.ChalkboardTimeline) {
          window.ChalkboardTimeline.reset(svgEl, lec.timeline.steps);
        }
        return;
      }
      timelineSteps = lec.timeline.steps;
    } else {
      return;
    }
    
    // Small delay before starting to let the reset settle
    setTimeout(function() {
      if (timelineSteps && window.ChalkboardTimeline) {
        window.ChalkboardTimeline.start(svgEl, timelineSteps);
      }
    }, 10);
  }

  // Restart CSS animations inside an SVG element.
  // Uses the Web Animations API (getAnimations) to reset each
  // animation's currentTime to 0, which properly restarts it.
  // Falls back to the clone-replace technique if getAnimations
  // is not available.
  function restartSVGAnimations(el) {
    // Skip restartSVGAnimations for chalkboard timeline elements —
    // those are managed by the ChalkboardTimeline controller, not
    // by CSS animation classes. Calling cancel()+play() on their
    // Web Animations would conflict with the timeline's setTimeout
    // reveals.
    //
    // Only restart elements that have universal animation classes
    // (anim-*, area-tile, fade-in, etc.) but NOT chalkboard-
    // specific classes (chalk-*, photon).
    const animated = el.querySelectorAll(
      '.area-tile, .fade-in, .draw-line, .perim-dot, .perim-dot-square, ' +
      '.anim-fade-in, .anim-pop-in, .anim-draw, .anim-pulse-in, ' +
      '.anim-slide-left, .anim-slide-right'
    );
    // Filter OUT elements that also have chalkboard classes
    const filtered = Array.from(animated).filter(function(e) {
      return !e.classList.contains('chalk-draw') &&
             !e.classList.contains('chalk-fade') &&
             !e.classList.contains('chalk-pulse') &&
             !e.classList.contains('photon') &&
             !e.classList.contains('photon-slow');
    });
    filtered.forEach(function(animEl) {
      // Use Web Animations API if available (Chrome, Firefox, Edge)
      if (animEl.getAnimations) {
        const anims = animEl.getAnimations();
        if (anims.length > 0) {
          anims.forEach(function(anim) {
            anim.cancel();  // reset to initial state
            anim.play();    // restart from beginning
          });
          return;
        }
      }
      // Fallback: clone and replace (forces a fresh element)
      const clone = animEl.cloneNode(true);
      if (animEl.parentNode) {
        animEl.parentNode.replaceChild(clone, animEl);
      }
    });
  }

  function updateUI() {
    renderTranscript();
    renderBoard();
    progressFill.style.width = ((state.currentBeat + 1) / state.beats.length * 100) + '%';
    counterEl.textContent = `${state.currentBeat + 1} / ${state.beats.length}`;
    // Track lecture beat progress in proctor
    if (window.Proctor && window.Proctor.trackLectureBeat && currentChapter) {
      window.Proctor.trackLectureBeat(currentChapter.slug, state.currentBeat + 1, state.beats.length);
    }
  }

  function clearTimers() { clearTimeout(state.playTimer); if (window.ChalkboardTimeline) window.ChalkboardTimeline.clear(); }

  let currentTTS = null;  // Track the current TTS handle to prevent stale onEnd callbacks

  function goToBeat(index) {
    if (index < 0 || index >= state.beats.length) return;
    state.currentBeat = index;
    updateUI();
    if (!state.isPlaying) return;
    clearTimers();

    // Capture the beat index at the time of this call. If a stale
    // onEnd callback fires later (from a previous TTS.speak that was
    // cancelled), it will check this capture and NOT advance.
    const beatAtCallTime = state.currentBeat;

    const advance = () => {
      if (!state.isPlaying) return;
      // Only advance if we're still on the same beat — prevents
      // double-advancing if a stale onEnd fires after a new beat
      // has already started.
      if (state.currentBeat !== beatAtCallTime) return;
      if (state.currentBeat < state.beats.length - 1) goToBeat(state.currentBeat + 1);
      else { state.isPlaying = false; playBtn.textContent = '▶'; }
    };

    if (state.voiceOn && window.TTS) {
      // Stop any previous speech cleanly
      if (currentTTS && currentTTS.cancel) currentTTS.cancel();
      TTS.stopSpeaking();
      currentTTS = TTS.speak(state.beats[state.currentBeat], {
        rate: state.ttsRate,
        onEnd: () => {
          // Only schedule advance if we're still on this beat
          if (state.currentBeat !== beatAtCallTime) return;
          state.playTimer = setTimeout(advance, 500);
        }
      });
    } else {
      const estMs = Math.max(2500, (state.beats[state.currentBeat].length / 14) * 1000);
      state.playTimer = setTimeout(advance, estMs);
    }
  }

  function togglePlay() {
    state.isPlaying = !state.isPlaying;
    playBtn.textContent = state.isPlaying ? '⏸' : '▶';
    if (state.isPlaying) {
      if (state.currentBeat === state.beats.length - 1) state.currentBeat = 0;
      goToBeat(state.currentBeat);
    } else { clearTimers(); if (window.TTS) TTS.stopSpeaking(); }
  }

  playBtn.addEventListener('click', togglePlay);
  nextBtn.addEventListener('click', () => {
    state.isPlaying = false; playBtn.textContent = '▶';
    clearTimers(); if (window.TTS) TTS.stopSpeaking();
    goToBeat(state.currentBeat + 1);
  });
  prevBtn.addEventListener('click', () => {
    state.isPlaying = false; playBtn.textContent = '▶';
    clearTimers(); if (window.TTS) TTS.stopSpeaking();
    goToBeat(state.currentBeat - 1);
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const idx = Math.floor(((e.clientX - rect.left) / rect.width) * state.beats.length);
    state.isPlaying = false; playBtn.textContent = '▶';
    clearTimers(); if (window.TTS) TTS.stopSpeaking();
    goToBeat(Math.max(0, Math.min(state.beats.length - 1, idx)));
  });

  state.updateUI = updateUI;
  state.goToBeat = goToBeat;
  state.stop = () => {
    state.isPlaying = false;
    playBtn.textContent = '▶';
    clearTimers();
    if (currentTTS && currentTTS.cancel) currentTTS.cancel();
    if (window.TTS) TTS.stopSpeaking();
  };

  updateUI();

  // ----------------------------------------------------------------
  // IMMERSIVE MODE — full-screen animation + current beat at bottom
  // ----------------------------------------------------------------
  const immersiveBtn = sectionEl.querySelector('.lec-immersive-btn');
  let immersiveOverlay = null;

  function enterImmersive() {
    // Create overlay if not exists or was removed from DOM
    if (!immersiveOverlay || !document.body.contains(immersiveOverlay)) {
      immersiveOverlay = document.createElement('div');
      immersiveOverlay.className = 'immersive-overlay';
      immersiveOverlay.innerHTML = `
        <div class="immersive-canvas" id="imCanvas-${lec.id}"></div>
        <div class="immersive-title-bar">
          <span class="im-title">${(currentChapterData.meta || {}).title || ''}</span>
          <span class="im-section">${lec.label}</span>
        </div>
        <button class="immersive-close-btn" id="imClose-${lec.id}">✕ Exit</button>
        <div class="immersive-beat-panel">
          <div class="immersive-beat-number" id="imBeatNum-${lec.id}"></div>
          <div class="immersive-beat-text" id="imBeatText-${lec.id}"></div>
          <div class="immersive-controls">
            <button class="ctrl-btn" id="imPrev-${lec.id}">⏮</button>
            <button class="ctrl-btn primary" id="imPlay-${lec.id}">▶</button>
            <button class="ctrl-btn" id="imNext-${lec.id}">⏭</button>
            <div class="progress-bar" id="imProgress-${lec.id}"><div class="progress-fill" id="imProgressFill-${lec.id}" style="width:0%"></div></div>
            <div class="beat-counter" id="imCounter-${lec.id}">1 / ${lec.beats.length}</div>
            <div class="immersive-voice">
              <button id="imVoice-${lec.id}" class="${state.voiceOn ? 'active' : ''}">🔊 Voice</button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(immersiveOverlay);

      // Wire close button
      immersiveOverlay.querySelector(`#imClose-${lec.id}`).addEventListener('click', exitImmersive);

      // Wire controls
      immersiveOverlay.querySelector(`#imPrev-${lec.id}`).addEventListener('click', () => {
        state.isPlaying = false;
        clearTimers(); if (window.TTS) TTS.stopSpeaking();
        goToBeat(state.currentBeat - 1);
      });
      immersiveOverlay.querySelector(`#imNext-${lec.id}`).addEventListener('click', () => {
        state.isPlaying = false;
        clearTimers(); if (window.TTS) TTS.stopSpeaking();
        goToBeat(state.currentBeat + 1);
      });
      immersiveOverlay.querySelector(`#imPlay-${lec.id}`).addEventListener('click', () => {
        togglePlay();
      });
      immersiveOverlay.querySelector(`#imProgress-${lec.id}`).addEventListener('click', (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const idx = Math.floor(((e.clientX - rect.left) / rect.width) * state.beats.length);
        state.isPlaying = false; playBtn.textContent = '▶';
        clearTimers(); if (window.TTS) TTS.stopSpeaking();
        goToBeat(Math.max(0, Math.min(state.beats.length - 1, idx)));
      });
      immersiveOverlay.querySelector(`#imVoice-${lec.id}`).addEventListener('click', (e) => {
        state.voiceOn = !state.voiceOn;
        e.target.classList.toggle('active', state.voiceOn);
        const mainToggle = sectionEl.querySelector('.lec-voice-toggle');
        if (mainToggle) mainToggle.classList.toggle('on', state.voiceOn);
      });

      // ESC to exit
      immersiveOverlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') exitImmersive();
      });
    }

    // Clone the SVG/images into the immersive canvas
    const imCanvas = immersiveOverlay.querySelector(`#imCanvas-${lec.id}`);
    imCanvas.innerHTML = '';
    if (isGlobeType) {
      // For globe, just show a message (globe can't be easily cloned)
      imCanvas.innerHTML = '<div style="color:#94a3b8;font-size:14px;text-align:center;padding:40px;">Globe view not available in immersive mode. Please use the standard view.</div>';
    } else if (isImageType) {
      // Clone the whole canvas-stack — for hybrid mode this includes
      // BOTH the image layer AND the SVG overlay layer, so the
      // immersive view stays in sync beat-by-beat just like the
      // standard view.
      const stackOrig = sectionEl.querySelector('.canvas-stack');
      const stackClone = stackOrig.cloneNode(true);
      // Use aspect-ratio (NOT height:100%) so the SVG's 600x460
      // viewBox renders at the correct shape inside the immersive
      // canvas. Without this, the stack stretches to fill the
      // available height and the SVG gets squashed, making the
      // bullet cards invisible at the edges.
      stackClone.style.cssText = 'display:block;width:100%;max-height:100%;position:relative;aspect-ratio:600/460;margin:0 auto;';
      // Reset image visibility — it will be re-applied by updateImmersiveUI
      stackClone.querySelectorAll('img').forEach(img => {
        img.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;opacity:0;transition:opacity 0.4s;';
        if (img.classList.contains('visible')) img.style.opacity = '1';
      });
      // Reset SVG overlay element visibility — re-applied below
      stackClone.querySelectorAll('svg.lec-overlay .el').forEach(el => {
        el.classList.remove('visible', 'pulse');
      });
      imCanvas.appendChild(stackClone);
      // Store refs for both image and overlay updates
      state._imImgEls = Array.from(stackClone.querySelectorAll('img'));
      state._imBoardEls = Array.from(stackClone.querySelectorAll('svg.lec-overlay .el'));
    } else {
      // Clone SVG
      const svgOrig = sectionEl.querySelector('svg.lec-board');
      if (svgOrig) {
        const svgClone = svgCloneWithState(svgOrig);
        imCanvas.appendChild(svgClone);
        state._imBoardEls = Array.from(svgClone.querySelectorAll('.el'));
      }
    }

    immersiveOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateImmersiveUI();
    // Request focus for keyboard events
    setTimeout(() => immersiveOverlay.tabIndex = 0, 0);
    immersiveOverlay.focus();
  }

  function svgCloneWithState(origSvg) {
    // Deep clone the SVG and copy visibility classes
    const clone = origSvg.cloneNode(true);
    const origEls = origSvg.querySelectorAll('.el');
    const cloneEls = clone.querySelectorAll('.el');
    cloneEls.forEach((el, i) => {
      if (origEls[i]) {
        el.setAttribute('class', origEls[i].getAttribute('class') || '');
      }
    });
    return clone;
  }

  function exitImmersive() {
    if (immersiveOverlay) {
      immersiveOverlay.classList.remove('active');
      document.body.style.overflow = '';
      // Stop TTS when exiting immersive mode — otherwise audio
      // continues playing after the overlay closes.
      if (state.isPlaying) {
        state.isPlaying = false;
        playBtn.textContent = '▶';
      }
      clearTimers();
      if (currentTTS && currentTTS.cancel) currentTTS.cancel();
      if (window.TTS) TTS.stopSpeaking();
      // Only clear the IMMERSIVE clone's chalkboard timers — leave the
      // dual-screen SVG's pending timers intact so the dual-screen
      // animation continues from where it was before immersive mode.
      // (Previously this called ChalkboardTimeline.clear() with no args,
      // which cancelled ALL chalkboard timers including the dual-screen's,
      // leaving the dual-screen view "stuck" with only the immediately-
      // visible elements showing.)
      if (window.ChalkboardTimeline) {
        const imSvg = immersiveOverlay.querySelector('svg.lec-board, svg');
        if (imSvg) window.ChalkboardTimeline.clear(imSvg);
      }
    }
  }

  function updateImmersiveUI() {
    if (!immersiveOverlay || !immersiveOverlay.classList.contains('active')) return;

    // Update beat text
    const beatNumEl = immersiveOverlay.querySelector(`#imBeatNum-${lec.id}`);
    const beatTextEl = immersiveOverlay.querySelector(`#imBeatText-${lec.id}`);
    if (beatNumEl) beatNumEl.textContent = `Beat ${state.currentBeat + 1} of ${state.beats.length}`;
    if (beatTextEl) {
      // Fade transition
      beatTextEl.classList.add('fade');
      setTimeout(() => {
        beatTextEl.textContent = state.beats[state.currentBeat];
        beatTextEl.classList.remove('fade');
      }, 150);
    }

    // Update controls
    const playBtnIm = immersiveOverlay.querySelector(`#imPlay-${lec.id}`);
    if (playBtnIm) playBtnIm.textContent = state.isPlaying ? '⏸' : '▶';
    const progressFillIm = immersiveOverlay.querySelector(`#imProgressFill-${lec.id}`);
    if (progressFillIm) progressFillIm.style.width = ((state.currentBeat + 1) / state.beats.length * 100) + '%';
    const counterIm = immersiveOverlay.querySelector(`#imCounter-${lec.id}`);
    if (counterIm) counterIm.textContent = `${state.currentBeat + 1} / ${state.beats.length}`;

    // Update SVG/image visibility in immersive canvas
    if (isImageType && state._imImgEls) {
      // 1) Cycle the background image per beat
      const targetIdx = state.imgPerBeat[state.currentBeat] || 0;
      state._imImgEls.forEach((img, i) => {
        img.style.opacity = (i === targetIdx) ? '1' : '0';
      });
      // 2) HYBRID: reveal ONLY the current beat's SVG element.
      // Uses RANK-BASED matching (same as renderBoard).
      if (state._imBoardEls && state._imBoardEls.length) {
        const sortedEls = Array.from(state._imBoardEls).sort((a, b) =>
          parseInt(a.dataset.beat, 10) - parseInt(b.dataset.beat, 10)
        );
        const currentRank = state.currentBeat;
        sortedEls.forEach((el, i) => {
          const isCurrent = i === currentRank;
          el.classList.toggle('visible', isCurrent);
          el.classList.remove('pulse');
          if (isCurrent) {
            void el.offsetWidth;
            el.classList.add('pulse');
          }
        });
      }
    } else if (state._imBoardEls && !isGlobeType) {
      // Pure-SVG chapters: accumulate (build up diagram).
      // Uses RANK-BASED matching (same as renderBoard).
      const sortedEls = Array.from(state._imBoardEls).sort((a, b) =>
        parseInt(a.dataset.beat, 10) - parseInt(b.dataset.beat, 10)
      );
      const showCount = state.currentBeat + 1;
      sortedEls.forEach((el, i) => {
        const shouldShow = i < showCount;
        el.classList.toggle('visible', shouldShow);
        el.classList.remove('pulse');
        if (i === showCount - 1) {
          void el.offsetWidth;
          el.classList.add('pulse');
          // Start chalkboard timeline in immersive mode too
          var imSvg = immersiveOverlay.querySelector('svg.lec-board, svg');
          if (imSvg && window.ChalkboardTimeline && lec) {
            var imBeatNum = parseInt(el.getAttribute('data-beat'), 10);
            var imSteps = null;
            if (lec.timelines && Array.isArray(lec.timelines)) {
              for (var ti = 0; ti < lec.timelines.length; ti++) {
                if (lec.timelines[ti].beat === imBeatNum) {
                  imSteps = lec.timelines[ti].steps;
                  break;
                }
              }
            } else if (lec.timeline && lec.timeline.beat === imBeatNum) {
              imSteps = lec.timeline.steps;
            }
            if (imSteps) {
              window.ChalkboardTimeline.start(imSvg, imSteps);
            }
          }
        }
      });
    }
  }

  // Patch the original updateUI to also update immersive
  const origUpdateUI = updateUI;
  updateUI = function() {
    origUpdateUI();
    updateImmersiveUI();
  };
  state.updateUI = updateUI;

  // Wire the immersive toggle button
  if (immersiveBtn) {
    immersiveBtn.addEventListener('click', function() {
      try { enterImmersive(); } catch(e) { console.error('Immersive mode error:', e.message, e.stack); alert('Immersive mode error: ' + e.message); }
    });
  }
}

// ====================================================================
// NOTES — Render HTML content + Print/Export-to-PDF toolbar
// ====================================================================
function renderNotes() {
  const notesHTML = currentChapterData.notes || '<p>No notes available.</p>';
  const meta = currentChapterData.meta || {};
  const chapterTitle = meta.title || 'Chapter Notes';
  const chapterSubtitle = meta.subtitle || '';

  // Inject the notes content together with a small action toolbar that
  // lets the student print or export the Key Notes to PDF.
  // NOTE: app.js is wrapped in an IIFE, so we cannot use inline onclick
  // attributes (the handler would not be on `window`). Instead we attach
  // the click listener via addEventListener below — consistent with the
  // rest of the app.
  document.getElementById('notesContent').innerHTML = `
    <div class="notes-toolbar">
      <div class="notes-toolbar-info">
        <div class="notes-toolbar-title">📝 Key Things to Remember</div>
        <div class="notes-toolbar-sub">${chapterSubtitle || chapterTitle}</div>
      </div>
      <button type="button" class="notes-print-btn" title="Print or save these notes as a PDF file">
        <span class="notes-print-icon">🖨</span>
        <span class="notes-print-label">Print / Export to PDF</span>
      </button>
    </div>
    <div id="notesBody">${notesHTML}</div>
  `;

  // Attach the click listener (app.js is in an IIFE, so the handler
  // must be wired up here rather than via an inline onclick attribute).
  const printBtn = document.querySelector('#notesContent .notes-print-btn');
  if (printBtn) {
    printBtn.addEventListener('click', printNotes);
  }
}

// ====================================================================
// PRINT NOTES — Open a clean print-friendly window with just the notes
// content, then trigger the browser's Print dialog. The student (or
// teacher) can choose "Save as PDF" as the destination to export the
// notes to a PDF file.
// ====================================================================
function printNotes() {
  const notesBody = document.getElementById('notesBody');
  if (!notesBody) {
    alert('Notes content is not loaded yet. Please wait a moment and try again.');
    return;
  }

  const meta = (currentChapterData && currentChapterData.meta) || {};
  const chapterTitle = meta.title || 'Chapter Notes';
  const chapterSubtitle = meta.subtitle || '';
  const subject = (currentSubject && currentSubject.name) || '';

  // Build a self-contained print-friendly HTML document.
  // - Inline all styles so the printed output is portable.
  // - Use a light background with dark text (print-optimized).
  // - Preserve the existing chapter color scheme for headings so the
  //   notes remain visually identifiable per subject.
  const subjectColor = (currentSubject && currentSubject.color) || '#38bdf8';
  const accentR = parseInt(subjectColor.slice(1, 3), 16);
  const accentG = parseInt(subjectColor.slice(3, 5), 16);
  const accentB = parseInt(subjectColor.slice(5, 7), 16);

  const printDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHTML(chapterTitle)} — Key Notes</title>
  <style>
    @page { margin: 16mm 14mm; }
    * { box-sizing: border-box; }

    /* ===== PRINT-FRIENDLY OVERRIDE ===== */
    /* Force EVERYTHING to white background + dark text.
       This overrides ALL inline styles (gradient cards, dark
       rgba() backgrounds, light text colors, etc.) so the
       printed PDF is truly print-friendly: black text on
       white paper, minimal ink usage. */
    * {
      background: white !important;
      color: #1e293b !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
      margin: 0;
      padding: 0;
      line-height: 1.6;
      font-size: 12pt;
      background: #ffffff !important;
      color: #1e293b !important;
    }

    .print-header {
      border-bottom: 3px solid #475569;
      padding-bottom: 14px;
      margin-bottom: 24px;
      background: white !important;
    }
    .print-header-eyebrow {
      font-size: 10pt;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b !important;
      margin-bottom: 4px;
    }
    .print-header-title {
      font-size: 22pt;
      font-weight: 700;
      color: #0f172a !important;
      margin: 0 0 6px 0;
      line-height: 1.2;
    }
    .print-header-sub {
      font-size: 11pt;
      color: #475569 !important;
      margin: 0;
    }

    /* Headings: dark text, bottom border for visual structure */
    h2 {
      color: #0f172a !important;
      font-size: 16pt;
      margin: 28px 0 10px;
      padding-bottom: 4px;
      border-bottom: 2px solid #cbd5e1;
      page-break-after: avoid;
      background: white !important;
    }
    h3 {
      color: #1e293b !important;
      font-size: 13pt;
      font-weight: 700;
      margin: 22px 0 8px;
      page-break-after: avoid;
      background: white !important;
    }
    h4 {
      color: #0f172a !important;
      font-size: 11.5pt;
      font-weight: 700;
      margin: 16px 0 6px;
      page-break-after: avoid;
      background: white !important;
    }
    p {
      margin: 0 0 10px;
      color: #1e293b !important;
      background: white !important;
    }
    ul, ol { margin: 6px 0 12px 22px; }
    li {
      margin-bottom: 4px;
      color: #1e293b !important;
      background: white !important;
    }
    strong { color: #000 !important; font-weight: 700; }
    em { color: #334155 !important; font-style: italic; }
    code {
      font-family: "SF Mono", "Monaco", "Consolas", monospace;
      background: #f1f5f9 !important;
      color: #0f172a !important;
      padding: 1px 5px;
      border-radius: 3px;
      font-size: 10.5pt;
    }

    /* Cards: light gray background, colored LEFT border for type distinction */
    .card {
      background: #f8fafc !important;
      border: 1px solid #e2e8f0 !important;
      border-left-width: 4px !important;
      border-radius: 8px;
      padding: 12px 16px !important;
      margin: 14px 0 !important;
    }
    .card.warn    { border-left-color: #f59e0b !important; }
    .card.tip     { border-left-color: #10b981 !important; }
    .card.formula { border-left-color: #6366f1 !important; }
    .card.history { border-left-color: #8b5cf6 !important; }
    .card.open    { border-left-color: #f97316 !important; }
    .card h4 { margin-top: 0; }
    .card ul, .card ol { margin-top: 6px; }
    .card p { color: #1e293b !important; }

    /* Formula display */
    .formula-big {
      font-size: 16pt;
      font-weight: 700;
      color: #0f172a !important;
      text-align: center;
      margin: 6px 0;
      background: white !important;
    }
    .formula-sub {
      font-size: 10.5pt;
      color: #475569 !important;
      text-align: center;
      margin-bottom: 8px;
      background: white !important;
    }

    /* Tables: light gray header, zebra striping — no dark backgrounds */
    table.styled-table {
      width: 100%;
      border-collapse: collapse;
      margin: 14px 0;
      font-size: 10.5pt;
      page-break-inside: avoid;
    }
    .styled-table th {
      background: #e2e8f0 !important;
      color: #0f172a !important;
      padding: 8px 10px;
      text-align: left;
      border: 1px solid #94a3b8;
      font-weight: 700;
    }
    .styled-table td {
      padding: 7px 10px;
      border: 1px solid #e2e8f0;
      color: #1e293b !important;
      background: white !important;
    }
    .styled-table tr:nth-child(even) td {
      background: #f8fafc !important;
    }

    /* Practice cards */
    .practice-card {
      background: #f8fafc !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 8px;
      padding: 12px 14px !important;
      margin: 12px 0 !important;
      page-break-inside: avoid;
    }
    .practice-card h3 {
      color: #0f172a !important;
      margin-top: 0;
    }
    .practice-card p { color: #1e293b !important; }

    /* Hide reveal buttons; force-show answers */
    .reveal-btn { display: none; }
    .reveal-answer {
      display: block !important;
      background: #f1f5f9 !important;
      border-left: 3px solid #64748b !important;
      padding: 8px 12px;
      border-radius: 4px;
      margin-top: 8px;
      color: #1e293b !important;
      font-size: 11pt;
    }

    /* Triples */
    .triples {
      display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0;
    }
    .triple {
      background: #e2e8f0 !important;
      color: #0f172a !important;
      padding: 6px 12px;
      border-radius: 6px;
      font-weight: 700;
      font-size: 11pt;
    }

    /* The "Before We Begin" gradient card — override to a bordered box */
    div[style*="linear-gradient"] {
      background: white !important;
      border: 2px solid #cbd5e1 !important;
      border-radius: 10px;
      padding: 16px 18px !important;
    }
    div[style*="linear-gradient"] h2,
    div[style*="linear-gradient"] h3,
    div[style*="linear-gradient"] p {
      color: #1e293b !important;
      background: white !important;
    }

    /* Override dark rgba() backgrounds inside the vocab boxes */
    div[style*="rgba(15, 23, 42"],
    div[style*="rgba(15,23,42"],
    div[style*="background: rgba"],
    div[style*="background:rgba"] {
      background: #f8fafc !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: 8px;
    }

    /* Answer badges and problem styling */
    .answer-badge, .badge-easy, .badge-med, .badge-hard {
      background: #e2e8f0 !important;
      color: #0f172a !important;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 10pt;
      font-weight: 700;
    }
    .problem {
      background: #f8fafc !important;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 12px;
      margin: 12px 0;
      page-break-inside: avoid;
    }
    .answer {
      background: #f1f5f9 !important;
      border-left: 3px solid #64748b;
      padding: 6px 10px;
      border-radius: 4px;
      color: #0f172a !important;
      font-weight: 700;
      display: block;
      margin-top: 8px;
    }

    /* Avoid awkward page breaks */
    .scenario-dropdown, .lec-section { page-break-inside: avoid; }
    img { max-width: 100%; height: auto; }

    /* Footer */
    .print-footer {
      margin-top: 36px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      font-size: 9.5pt;
      color: #64748b !important;
      text-align: center;
      background: white !important;
    }
    .print-footer .print-chapter { font-weight: 600; color: #475569 !important; }

    @media print {
      body { font-size: 11pt; }
      .print-header { page-break-after: avoid; }
    }
  </style>
</head>
<body>
  <div class="print-header">
    <div class="print-header-eyebrow">${escapeHTML(subject ? subject + ' · Key Notes' : 'Key Notes')}</div>
    <h1 class="print-header-title">${escapeHTML(chapterTitle)}</h1>
    ${chapterSubtitle ? `<p class="print-header-sub">${escapeHTML(chapterSubtitle)}</p>` : ''}
  </div>

  ${notesBody.innerHTML}

  <div class="print-footer">
    <span class="print-chapter">${escapeHTML(chapterTitle)}</span>
    &nbsp;·&nbsp; Generated from the Learning System interactive module
    &nbsp;·&nbsp; ${new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
  </div>

  <script>
    window.addEventListener('load', function () {
      setTimeout(function () {
        window.focus();
        window.print();
      }, 300);
    });
  </script>
</body>
</html>`;

  // Open the print-friendly document in a new window/tab and trigger
  // the print dialog. Using a new window keeps the main app untouched
  // and lets the user return to the chapter after printing.
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow pop-ups for this site to print or export the notes as PDF.');
    return;
  }
  printWindow.document.open();
  printWindow.document.write(printDoc);
  printWindow.document.close();
}

// Small helper to safely escape HTML for the print header text.
function escapeHTML(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ====================================================================
// PRACTICE — Render HTML content with reveal buttons
// ====================================================================
function renderPractice() {
  document.getElementById('practiceContent').innerHTML = currentChapterData.practice || '<p>No practice problems available.</p>';
}

// ====================================================================
// REAL LIFE — Render scenarios
// ====================================================================
function renderRealLife() {
  const scenarios = currentChapterData.realLife || [];
  // For globe chapters, treat real-life scenarios as image-based (they have image refs)
  const isImageType = currentChapterData.meta.type === 'image' || currentChapterData.meta.type === 'globe';
  const basePath = currentChapterData.meta.imagesBasePath || '';
  const container = document.getElementById('reallifeContent');

  if (scenarios.length === 0) {
    container.innerHTML = '<p>No real-life scenarios available.</p>';
    return;
  }

  let html = `
    <h2>🌍 Real-Life Connections</h2>
    <p>Tap any scenario below to walk through it step by step.</p>
    <div class="scenario-selector">
  `;

  scenarios.forEach(sc => {
    let canvasContent;
    if (isImageType) {
      const imgs = (sc.images || []).map((img, bi) =>
        `<img class="el rl-img" data-beat="${bi+1}" src="${basePath}${img.file}" alt="${img.caption || ''}" />`
      ).join('\n                ');
      canvasContent = `<div class="canvas-stack rl-stack" data-scenario="${sc.id}">${imgs}</div>`;
    } else {
      canvasContent = `
        <svg class="rl-board" viewBox="${sc.viewBox}" preserveAspectRatio="xMidYMid meet">
          <defs><pattern id="rl-grid-${sc.id}" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1e293b" stroke-width="0.5"/></pattern></defs>
          <rect x="0" y="0" width="550" height="700" fill="url(#rl-grid-${sc.id})" />
          ${sc.svg || ''}
        </svg>`;
    }

    html += `
      <div class="scenario-dropdown" data-scenario="${sc.id}">
        <div class="scenario-header">
          <span>${sc.title}</span>
          <span class="chevron">▼</span>
        </div>
        <div class="scenario-body">
          <div class="real-life-lecture">
            <div class="real-life-canvas">${canvasContent}</div>
            <div class="real-life-narration">
              <div class="real-life-title-small">${sc.title}</div>
              <div class="real-life-transcript" data-scenario="${sc.id}"></div>
            </div>
            <div class="voice-bar">
              <label><button class="voice-toggle on rl-voice-toggle"></button><span>🔊 Voice</span></label>
              <div class="voice-speed rl-voice-speed">
                <button data-speed="0.6">0.6x</button><button data-speed="0.8">0.8x</button><button data-speed="1" class="active">1x</button><button data-speed="1.2">1.2x</button><button data-speed="1.5">1.5x</button>
              </div>
            </div>
            <div class="controls rl-controls">
              <button class="control-btn rl-prev">⏮</button>
              <button class="control-btn primary rl-play">▶</button>
              <button class="control-btn rl-next">⏭</button>
              <div class="progress-bar rl-progress"><div class="progress-fill rl-progress-fill" style="width:0%"></div></div>
              <div class="beat-counter rl-counter">1 / ${sc.beats.length}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  container.innerHTML = html;

  // Wire each scenario
  container.querySelectorAll('.scenario-dropdown').forEach(dropdown => {
    initRealLifeScenario(dropdown, isImageType);
  });
}

function initRealLifeScenario(dropdown, isImageType) {
  const scenarioKey = dropdown.dataset.scenario;
  const scenarios = currentChapterData.realLife || [];
  const sc = scenarios.find(s => s.id === scenarioKey);
  if (!sc) return;
  const beats = sc.beats;

  const transcriptEl = dropdown.querySelector('.real-life-transcript');
  const stackEl = dropdown.querySelector('.rl-stack');
  const svgEl = dropdown.querySelector('.rl-board');
  const imgEls = stackEl ? Array.from(stackEl.querySelectorAll('img.el')) : [];
  const boardEls = svgEl ? Array.from(svgEl.querySelectorAll('.el')) : [];
  const playBtn = dropdown.querySelector('.rl-play');
  const prevBtn = dropdown.querySelector('.rl-prev');
  const nextBtn = dropdown.querySelector('.rl-next');
  const progressFill = dropdown.querySelector('.rl-progress-fill');
  const progressBar = dropdown.querySelector('.rl-progress');
  const counterEl = dropdown.querySelector('.rl-counter');

  const state = { voiceOn: true, ttsRate: 1, currentBeat: 0, isPlaying: false, playTimer: null };
  if (window.TTS) TTS.attachVoiceBar(dropdown.querySelector('.voice-bar'), state);

  function render() {
    transcriptEl.innerHTML = '';
    beats.forEach((beat, i) => {
      const div = document.createElement('div');
      div.className = 'beat ' + (i === state.currentBeat ? 'current' : i < state.currentBeat ? 'past' : 'future');
      div.innerHTML = `<div class="beat-text">${beat}</div>`;
      transcriptEl.appendChild(div);
    });
    const cur = transcriptEl.querySelector('.beat.current');
    if (cur) cur.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (isImageType) {
      // Show image corresponding to current beat
      const imgs = sc.images || [];
      const nImgs = imgEls.length;
      if (nImgs > 1) {
        // Check if any image has atBeat specified
        const hasAtBeat = imgs.some(img => img.atBeat !== undefined);
        let targetIdx;
        if (hasAtBeat) {
          // Use explicit atBeat mapping
          const beat1 = state.currentBeat + 1;
          targetIdx = 0;
          for (let i = 0; i < imgs.length; i++) {
            const atBeat = imgs[i].atBeat || 1;
            if (atBeat <= beat1) targetIdx = i;
          }
        } else {
          // Even distribution
          targetIdx = Math.min(Math.floor(state.currentBeat * nImgs / beats.length), nImgs - 1);
        }
        imgEls.forEach((img, i) => {
          img.classList.toggle('visible', i === targetIdx);
        });
      } else if (nImgs === 1) {
        imgEls[0].classList.add('visible');
      }
    } else {
      boardEls.forEach(el => {
        const bn = parseInt(el.dataset.beat, 10);
        el.classList.toggle('visible', bn <= state.currentBeat + 1);
        el.classList.remove('pulse');
        if (bn === state.currentBeat + 1) {
          void el.offsetWidth;
          el.classList.add('pulse');
        }
      });
    }

    progressFill.style.width = ((state.currentBeat + 1) / beats.length * 100) + '%';
    counterEl.textContent = `${state.currentBeat + 1} / ${beats.length}`;
  }

  function clearTimers() { clearTimeout(state.playTimer); if (window.ChalkboardTimeline) window.ChalkboardTimeline.clear(); }

  function goTo(index) {
    if (index < 0 || index >= beats.length) return;
    state.currentBeat = index;
    render();
    if (!state.isPlaying) return;
    clearTimers();

    const advance = () => {
      if (!state.isPlaying) return;
      if (state.currentBeat < beats.length - 1) goTo(state.currentBeat + 1);
      else { state.isPlaying = false; playBtn.textContent = '▶'; }
    };

    if (state.voiceOn && window.TTS) {
      TTS.speak(beats[state.currentBeat], {
        rate: state.ttsRate,
        onEnd: () => { state.playTimer = setTimeout(advance, 500); }
      });
    } else {
      const estMs = Math.max(2500, (beats[state.currentBeat].length / 14) * 1000);
      state.playTimer = setTimeout(advance, estMs);
    }
  }

  playBtn.addEventListener('click', () => {
    state.isPlaying = !state.isPlaying;
    playBtn.textContent = state.isPlaying ? '⏸' : '▶';
    if (state.isPlaying) {
      if (state.currentBeat === beats.length - 1) state.currentBeat = 0;
      goTo(state.currentBeat);
    } else { clearTimers(); if (window.TTS) TTS.stopSpeaking(); }
  });

  nextBtn.addEventListener('click', () => {
    state.isPlaying = false; playBtn.textContent = '▶';
    clearTimers(); if (window.TTS) TTS.stopSpeaking();
    goTo(state.currentBeat + 1);
  });

  prevBtn.addEventListener('click', () => {
    state.isPlaying = false; playBtn.textContent = '▶';
    clearTimers(); if (window.TTS) TTS.stopSpeaking();
    goTo(state.currentBeat - 1);
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const idx = Math.floor(((e.clientX - rect.left) / rect.width) * beats.length);
    state.isPlaying = false; playBtn.textContent = '▶';
    clearTimers(); if (window.TTS) TTS.stopSpeaking();
    goTo(Math.max(0, Math.min(beats.length - 1, idx)));
  });

  const header = dropdown.querySelector('.scenario-header');
  header.addEventListener('click', () => {
    const wasOpen = dropdown.classList.contains('open');
    document.querySelectorAll('.scenario-dropdown').forEach(d => {
      d.classList.remove('open');
      const p = d.querySelector('.rl-play');
      if (p) p.textContent = '▶';
      const s = d._rlState;
      if (s) { s.isPlaying = false; clearTimeout(s.playTimer); }
    });
    if (window.TTS) TTS.stopSpeaking();
    if (!wasOpen) {
      dropdown.classList.add('open');
      state.currentBeat = 0;
      state.isPlaying = false;
      playBtn.textContent = '▶';
      render();
    } else {
      state.isPlaying = false;
      clearTimers();
    }
  });

  dropdown._rlState = state;
  render();
}

// ====================================================================
// GUIDED PRACTICE — Interactive step-by-step problems
// ====================================================================
function renderGuidedPractice() {
  const problems = currentChapterData.guidedPractice || [];
  // For globe chapters, treat guided practice as image-based
  const isImageType = currentChapterData.meta.type === 'image' || currentChapterData.meta.type === 'globe';
  const basePath = currentChapterData.meta.imagesBasePath || '';
  const app = document.getElementById('guidedApp');

  if (problems.length === 0) {
    app.innerHTML = '<div class="content"><p>No guided practice problems available.</p></div>';
    return;
  }

  app.innerHTML = `
    <div class="gp-header">
      <div class="gp-num" id="gpNum">Problem 1 of ${problems.length}</div>
      <span class="gp-badge gp-easy" id="gpBadge">Easy</span>
      <div class="gp-voice-bar">
        <button class="voice-toggle on" id="gpVoiceToggle"></button>
        <span>🔊</span>
        <div class="gp-voice-speed" id="gpVoiceSpeed">
          <button data-speed="0.6">0.6x</button>
          <button data-speed="0.8">0.8x</button>
          <button data-speed="1" class="active">1x</button>
          <button data-speed="1.2">1.2x</button>
        </div>
        <select class="gp-voice-select" id="gpVoiceSelect"></select>
      </div>
    </div>
    <div class="gp-statement" id="gpStatement"></div>
    <div class="gp-split">
      <div class="gp-canvas" id="gpCanvas">
        ${isImageType ? '<img id="gpImage" alt="" />' : '<svg id="gpBoard" viewBox="60 130 460 540" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="gp-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1e293b" stroke-width="0.5"/></pattern></defs><rect x="0" y="0" width="550" height="700" fill="url(#gp-grid)" /><g id="gpScene"></g></svg>'}
      </div>
      <div class="gp-work" id="gpWork">
        <div id="gpWorkContent">
          <div class="gp-step-num" id="gpStepNum">Step 1</div>
          <div class="gp-question" id="gpQuestion"></div>
          <input type="text" id="gpInput" class="gp-input" placeholder="Type your answer…" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" />
          <div class="gp-format-hint" id="gpFormatHint"></div>
          <button class="gp-check-btn" id="gpCheck">Check</button>
          <div class="gp-feedback" id="gpFeedback"></div>
          <div class="gp-hint" id="gpHint"></div>
        </div>
        <div class="gp-complete" id="gpComplete" style="display:none">
          <div class="gp-complete-icon">🎉</div>
          <div class="gp-complete-title">Question Solved!</div>
          <div class="gp-complete-msg" id="gpCompleteMsg"></div>
          <button class="gp-check-btn" id="gpCompleteBtn">Next Question →</button>
        </div>
      </div>
    </div>
    <div class="gp-controls">
      <button class="gp-nav-btn" id="gpPrev">⏮ Prev</button>
      <div class="gp-dots" id="gpDots"></div>
      <button class="gp-nav-btn" id="gpNext">Next ⏭</button>
    </div>
  `;

  gpState = {
    problemIdx: 0,
    stepIdx: 0,
    attempts: 0,
    voiceOn: true,
    rate: 1,
    completed: new Set(),
    isImageType,
    basePath
  };

  // Wire voice controls
  document.getElementById('gpVoiceToggle').addEventListener('click', function() {
    this.classList.toggle('on');
    gpState.voiceOn = this.classList.contains('on');
    if (!gpState.voiceOn && window.TTS) TTS.stopSpeaking();
  });
  document.querySelectorAll('#gpVoiceSpeed button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#gpVoiceSpeed button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      gpState.rate = parseFloat(btn.dataset.speed);
    });
  });

  document.getElementById('gpPrev').addEventListener('click', () => {
    if (gpState.problemIdx > 0) gpLoad(gpState.problemIdx - 1);
  });
  document.getElementById('gpNext').addEventListener('click', () => {
    if (gpState.problemIdx < problems.length - 1) gpLoad(gpState.problemIdx + 1);
  });
  document.getElementById('gpCheck').addEventListener('click', gpCheckAnswer);
  document.getElementById('gpInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); gpCheckAnswer(); }
  });

  gpLoad(0);
}

function gpRenderDots() {
  const problems = currentChapterData.guidedPractice || [];
  const dots = document.getElementById('gpDots');
  dots.innerHTML = '';
  problems.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'gp-dot' +
      (i === gpState.problemIdx ? ' active' : '') +
      (gpState.completed.has(i) ? ' done' : '');
    d.addEventListener('click', () => gpLoad(i));
    dots.appendChild(d);
  });
}

function gpRenderStep() {
  if (!currentChapterData || !gpState) return;
  const problems = currentChapterData.guidedPractice || [];
  const p = problems[gpState.problemIdx];
  if (!p) return;
  const step = p.steps[gpState.stepIdx];
  if (!step) return;

  document.getElementById('gpWorkContent').style.display = '';
  document.getElementById('gpComplete').style.display = 'none';

  document.getElementById('gpStepNum').textContent = `Step ${gpState.stepIdx + 1} of ${p.steps.length}`;
  document.getElementById('gpQuestion').textContent = step.prompt;
  document.getElementById('gpFormatHint').textContent = step.formatHint || '';
  const input = document.getElementById('gpInput');
  input.value = '';
  input.className = 'gp-input';
  input.disabled = false;
  document.getElementById('gpCheck').disabled = false;
  document.getElementById('gpFeedback').className = 'gp-feedback';
  document.getElementById('gpFeedback').textContent = '';
  document.getElementById('gpHint').className = 'gp-hint';
  document.getElementById('gpHint').textContent = '';

  setTimeout(() => input.focus(), 80);
}

function gpLoad(idx) {
  if (!currentChapterData || !gpState) return;
  const problems = currentChapterData.guidedPractice || [];
  if (idx < 0 || idx >= problems.length) return;
  if (window.TTS) TTS.stopSpeaking();
  gpState.problemIdx = idx;
  gpState.stepIdx = 0;
  gpState.attempts = 0;

  const p = problems[idx];
  var masteryBadge = '';
  if (window.Enhancements && window.Enhancements.renderMasteryBadge && currentChapter) {
    masteryBadge = window.Enhancements.renderMasteryBadge(currentChapter.slug, p.topic || p.title);
  }
  document.getElementById('gpNum').innerHTML = `Problem ${idx + 1} of ${problems.length} · ${p.title}` + (masteryBadge ? ' ' + masteryBadge : '');

  // Show gate prompt if student is struggling with this topic
  if (window.Enhancements && window.Enhancements.checkGateAndPrompt && currentChapter) {
    var gatePrompt = window.Enhancements.checkGateAndPrompt(currentChapter.slug, p.topic || p.title, p.title);
    if (gatePrompt) {
      var hintEl = document.getElementById('gpHint');
      if (hintEl) {
        hintEl.classList.add('show');
        hintEl.innerHTML = gatePrompt;
      }
    }
  }

  document.getElementById('gpBadge').textContent = p.difficulty;
  document.getElementById('gpBadge').className = 'gp-badge ' + p.diffClass;
  document.getElementById('gpStatement').textContent = p.statement;

  // Set the canvas
  if (gpState.isImageType) {
    const img = document.getElementById('gpImage');
    if (img && p.image) {
      img.src = gpState.basePath + p.image;
      img.style.display = '';
    } else if (img) {
      img.style.display = 'none';
    }
  } else {
    const board = document.getElementById('gpBoard');
    const scene = document.getElementById('gpScene');
    if (board && p.viewBox) board.setAttribute('viewBox', p.viewBox);
    if (scene && p.svg) scene.innerHTML = p.svg;
    // Reset gel visibility
    if (scene) scene.querySelectorAll('.gel').forEach(el => el.classList.remove('visible'));
  }

  document.getElementById('gpPrev').disabled = idx === 0;
  document.getElementById('gpNext').disabled = idx === problems.length - 1;

  gpRenderDots();
  gpRenderStep();
  gpUpdateBeats();
}

function gpUpdateBeats() {
  if (gpState.isImageType) return; // no beats for image type
  const scene = document.getElementById('gpScene');
  if (!scene) return;
  scene.querySelectorAll('.gel').forEach(el => {
    const beat = parseInt(el.dataset.beat, 10);
    const wasVisible = el.classList.contains('visible');
    const isVisible = beat <= gpState.stepIdx;
    el.classList.toggle('visible', isVisible);
    el.classList.remove('pulse');
    if (!wasVisible && isVisible) {
      void el.offsetWidth;
      el.classList.add('pulse');
    }
  });
}

function gpValidate(value, validator) {
  if (!validator) return false;
  const v = value.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.,;:!?]/g, '');

  switch (validator.type) {
    case 'match':
      return (validator.answers || []).some(a =>
        a.toLowerCase().trim().replace(/\s+/g, ' ').replace(/[.,;:!?]/g, '') === v
      );
    case 'regex':
      const re = new RegExp(validator.pattern, validator.flags || '');
      return re.test(v);
    case 'pureNum':
      return new RegExp(`^${validator.value}\\.?$`).test(v.trim());
    case 'numUnit':
      return new RegExp(`^${validator.value}\\.?\\s*(${validator.unit})\\.?$`, 'i').test(v.trim());
    case 'formula':
      const normalized = v.replace(/\s+/g, '').replace(/²/g, '^2').replace(/[×·*]/g, '').replace(/,/g, '').replace(/–/g, '-');
      return (validator.forms || []).includes(normalized);
    default:
      return false;
  }
}

function gpCheckAnswer() {
  if (!currentChapterData || !gpState) return;
  const problems = currentChapterData.guidedPractice || [];
  const p = problems[gpState.problemIdx];
  if (!p) return;
  const step = p.steps[gpState.stepIdx];
  if (!step) return;
  const input = document.getElementById('gpInput');
  if (!input) return;
  const value = input.value.trim();
  if (!value) return;

  if (gpValidate(value, step.validate)) {
    input.classList.add('correct');
    input.classList.remove('wrong');
    input.disabled = true;
    document.getElementById('gpCheck').disabled = true;

    // Track practice problem in proctor
    if (window.Proctor && window.Proctor.trackPractice && currentChapter) {
      window.Proctor.trackPractice(currentChapter.slug, true);
    }

    // Mastery tracking: record the correct attempt
    if (window.Enhancements && window.Enhancements.recordAttempt && currentChapter) {
      window.Enhancements.recordAttempt(currentChapter.slug, p.topic || p.title, true);
    }

    const feedback = document.getElementById('gpFeedback');
    feedback.className = 'gp-feedback show success';
    feedback.textContent = step.explanation;

    if (gpState.voiceOn && window.TTS) {
      TTS.speak(step.explanation, { rate: gpState.rate });
    }

    gpState.stepIdx++;
    gpState.attempts = 0;
    setTimeout(gpUpdateBeats, 200);

    setTimeout(() => {
      if (gpState.stepIdx >= p.steps.length) {
        gpShowComplete();
      } else {
        gpRenderStep();
        gpUpdateBeats();
      }
    }, 2400);
  } else {
    gpState.attempts++;
    input.classList.add('wrong');
    input.classList.remove('correct');
    // Track practice attempt (incorrect)
    if (gpState.attempts === 1 && window.Proctor && window.Proctor.trackPractice && currentChapter) {
      window.Proctor.trackPractice(currentChapter.slug, false);
    }
    const feedback = document.getElementById('gpFeedback');
    feedback.className = 'gp-feedback show error';
    feedback.textContent = 'Try again.';

    // Progressive hints: show level 1 after 2 wrong, level 2 after 3,
    // level 3 (full solution) after 4. Falls back to old single-hint
    // behaviour if step.hints array isn't present.
    if (window.Enhancements && window.Enhancements.showProgressiveHint) {
      window.Enhancements.showProgressiveHint(step, gpState);
    } else if (gpState.attempts >= 5) {
      const hint = document.getElementById('gpHint');
      hint.classList.add('show');
      hint.textContent = step.hint || "You're close — keep trying. Re-read the question carefully.";
    }

    // Mastery tracking: record the wrong attempt
    if (window.Enhancements && window.Enhancements.recordAttempt && currentChapter) {
      window.Enhancements.recordAttempt(currentChapter.slug, p.topic || p.title, false);
    }

    setTimeout(() => input.classList.remove('wrong'), 600);
    setTimeout(() => input.focus(), 650);
  }
}

function gpShowComplete() {
  if (!currentChapterData || !gpState) return;
  const problems = currentChapterData.guidedPractice || [];
  const p = problems[gpState.problemIdx];
  if (!p) return;
  gpState.completed.add(gpState.problemIdx);
  gpRenderDots();

  document.getElementById('gpWorkContent').style.display = 'none';
  const complete = document.getElementById('gpComplete');
  complete.style.display = '';
  document.getElementById('gpCompleteMsg').textContent = p.finalAnswer;

  const btn = document.getElementById('gpCompleteBtn');
  if (gpState.problemIdx < problems.length - 1) {
    btn.textContent = 'Next Question →';
    btn.onclick = () => gpLoad(gpState.problemIdx + 1);
  } else {
    btn.textContent = 'Restart from Q1';
    btn.onclick = () => gpLoad(0);
  }
}

// ====================================================================
// SELF-TEST — Quick recall questions
// ====================================================================
function renderSelfTest() {
  const questions = currentChapterData.selfTest || [];
  const container = document.getElementById('selftestContent');

  if (questions.length === 0) {
    container.innerHTML = '<p>No self-test questions available.</p>';
    return;
  }

  let html = `
    <h2>🧪 Quick Self-Test</h2>
    <p>Try these ${questions.length} questions on your own. Click "Reveal Answer" only after you've attempted each one.</p>
  `;

  questions.forEach((q, i) => {
    html += `
      <div class="problem">
        <div class="problem-title">Q${i + 1}</div>
        <div class="problem-q">${q.q}</div>
        <button class="reveal-btn">Reveal Answer</button>
        <div class="problem-steps">
          <p>${q.steps}</p>
          <span class="answer">${q.answer}</span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Wire reveal buttons
  container.querySelectorAll('.reveal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const steps = btn.nextElementSibling;
      const wasRevealed = steps.classList.contains('revealed');
      steps.classList.toggle('revealed');
      btn.textContent = steps.classList.contains('revealed') ? 'Hide Answer' : 'Reveal Answer';
      // Track self-test answer in proctor (count each question only once)
      if (!wasRevealed && window.Proctor && window.Proctor.trackSelfTest && currentChapter) {
        // Self-test is reveal-based, so we count as "answered" (no correctness check)
        window.Proctor.trackSelfTest(currentChapter.slug, true);
      }
    });
  });
}

// ====================================================================
// INITIALIZATION
// ====================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Wire class selector — but lock to student's registered grade if logged in
  document.querySelectorAll('.class-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // If student is logged in, lock to their grade
      var user = window.Auth ? window.Auth.getCurrentUser() : null;
      if (user && user.role === 'student' && user.grade) {
        // Force the grade back to the student's registered grade
        currentGrade = String(user.grade);
        // Don't allow switching
        return;
      }
      currentGrade = btn.dataset.grade;
      localStorage.setItem('selectedGrade', currentGrade);
      document.querySelectorAll('.class-btn').forEach(b => b.classList.toggle('active', b.dataset.grade === currentGrade));
      renderHome();
    });
  });

  // After login, lock grade to student's registered grade
  function lockGradeToStudent() {
    var user = window.Auth ? window.Auth.getCurrentUser() : null;
    if (user && user.role === 'student' && user.grade) {
      currentGrade = String(user.grade);
      localStorage.setItem('selectedGrade', currentGrade);
      // Hide the class selector entirely (student can only see their grade)
      var selectorBar = document.querySelector('.class-selector-bar');
      if (selectorBar) selectorBar.style.display = 'none';
      // Mark the student's grade button as active
      document.querySelectorAll('.class-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.grade === currentGrade);
      });
      renderHome();
    } else {
      // Show class selector for non-logged-in or parent users
      var selectorBar = document.querySelector('.class-selector-bar');
      if (selectorBar) selectorBar.style.display = '';
    }
  }

  // Call lockGradeToStudent whenever the user bar is updated (login/logout)
  // We patch the Auth._updateUserBar to also call our lock function
  if (window.Auth) {
    var origUpdate = window.Auth._updateUserBar;
    window.Auth._updateUserBar = function() {
      if (origUpdate) origUpdate();
      lockGradeToStudent();
    };
  }

  renderHome();

  // Tab switching
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Back button
  document.getElementById('backBtn').addEventListener('click', goHome);

  // Logout button on chapter screen
  var chapterLogoutBtn = document.getElementById('chapterLogoutBtn');
  if (chapterLogoutBtn) {
    chapterLogoutBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to logout?')) {
        if (window.Proctor) window.Proctor.stopProctoring();
        if (window.Auth) window.Auth.logout();
      }
    });
  }

  // Fullscreen reading mode
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const exitFullscreenBtn = document.getElementById('exitFullscreenBtn');
  const chapterScreen = document.getElementById('chapterScreen');

  function toggleFullscreen() {
    chapterScreen.classList.toggle('fullscreen-mode');
    fullscreenBtn.classList.toggle('active');
    fullscreenBtn.textContent = chapterScreen.classList.contains('fullscreen-mode')
      ? '⛶ Exit Fullscreen'
      : '⛶ Fullscreen';
    // Scroll to top when entering fullscreen
    if (chapterScreen.classList.contains('fullscreen-mode')) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  fullscreenBtn.addEventListener('click', toggleFullscreen);
  exitFullscreenBtn.addEventListener('click', toggleFullscreen);

  // ESC key to exit fullscreen
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chapterScreen.classList.contains('fullscreen-mode')) {
      toggleFullscreen();
    }
  });
});

  // ============================================================
  // AUTH GATE — After app finishes rendering, trigger auth init
  // so the login overlay appears on top of the fully-built page.
  // ============================================================
  if (window.Auth && typeof window.Auth._showOverlay === 'function') {
    if (!window.Auth.isLoggedIn()) {
      window.Auth._showOverlay();
    } else {
      // Logged in — lock grade to student's registered grade
      var u = window.Auth.getCurrentUser();
      if (u && u.grade) {
        currentGrade = String(u.grade);
        localStorage.setItem('selectedGrade', currentGrade);
        var sb = document.querySelector('.class-selector-bar');
        if (sb) sb.style.display = 'none';
        document.querySelectorAll('.class-btn').forEach(function(b) {
          b.classList.toggle('active', b.dataset.grade === currentGrade);
        });
        renderHome();
      }
    }
  }

  // Also patch _updateUserBar to re-lock grade after login/signup
  if (window.Auth && window.Auth._updateUserBar) {
    var origUUB = window.Auth._updateUserBar;
    window.Auth._updateUserBar = function() {
      if (origUUB) origUUB();
      // Lock grade to student's registered grade
      var u = window.Auth.getCurrentUser();
      if (u && u.role === 'student' && u.grade) {
        currentGrade = String(u.grade);
        localStorage.setItem('selectedGrade', currentGrade);
        var sb = document.querySelector('.class-selector-bar');
        if (sb) sb.style.display = 'none';
        document.querySelectorAll('.class-btn').forEach(function(b) {
          b.classList.toggle('active', b.dataset.grade === currentGrade);
        });
        renderHome();
      } else {
        // Not logged in — show class selector
        var sb2 = document.querySelector('.class-selector-bar');
        if (sb2) sb2.style.display = '';
      }
    };
  }

  // Listen for auth-grade-change event (dispatched by auth.js after login/signup)
  window.addEventListener('auth-grade-change', function(e) {
    var grade = e.detail.grade;
    if (grade) {
      currentGrade = grade;
      localStorage.setItem('selectedGrade', grade);
      var sb = document.querySelector('.class-selector-bar');
      if (sb) sb.style.display = 'none';
      document.querySelectorAll('.class-btn').forEach(function(b) {
        b.classList.toggle('active', b.dataset.grade === grade);
      });
      renderHome();
    }
  });

  // ============================================================
  // PUBLIC TEARDOWN — callable by auth.js on logout
  // Fully stops every active lecture player: timers, TTS voice,
  // globe/webgl viewers, immersive overlays, and state registry.
  // Without this, the player keeps running (and the voice keeps
  // reading) even after the auth overlay is shown.
  // ============================================================
  window.App = window.App || {};
  window.App.teardownActiveContent = function() {
    // 1) Stop every lecture's playback loop (timers + TTS + UI state)
    Object.values(lecStates).forEach(function(s) {
      try { if (typeof s.stop === 'function') s.stop(); } catch(e) {}
    });
    // 2) Hard-stop any in-flight speech (covers TTS started outside lecStates)
    try { if (window.TTS && typeof TTS.stopSpeaking === 'function') TTS.stopSpeaking(); } catch(e) {}
    // 3) Dispose globe/webgl viewers so render loops stop
    Object.values(lecStates).forEach(function(s) {
      try { if (s.globe && typeof s.globe.dispose === 'function') s.globe.dispose(); } catch(e) {}
    });
    // 4) Clear the lecture-state registry so stale timers can't re-arm
    Object.keys(lecStates).forEach(function(k) { delete lecStates[k]; });
    // 5) Remove every immersive overlay element from the DOM
    //    (auth.js used to only strip .active — the element stayed
    //     in the DOM with pending timers attached to its buttons.)
    document.querySelectorAll('.immersive-overlay').forEach(function(el) { el.remove(); });
    // 6) Reset body scroll state
    document.body.style.overflow = '';
    // 7) Hide chapter screen, show home screen
    var hs = document.getElementById('homeScreen');
    var cs = document.getElementById('chapterScreen');
    if (hs) hs.style.display = 'block';
    if (cs) cs.style.display = 'none';
    // 8) Reset chapter-tracking state
    currentChapterData = null;
    currentSubject = null;
    currentChapter = null;
    gpState = null;
    // 9) Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

})();
