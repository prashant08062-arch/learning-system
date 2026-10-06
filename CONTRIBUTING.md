# 🎓 Master Prompt — Adding New Chapters to the Learning-System Repository

> **Purpose:** This is a complete, self-contained brief that lets ANY AI agent (with or without prior memory of this sandbox) add a new chapter to the existing `learning-system` GitHub repository. It captures every convention, code pattern, narration style, and testing protocol established across multiple sessions of work.
>
> **Copy-paste this entire document as your first user message to a fresh AI agent when you want it to add a chapter.**

---

## 🎯 Your Mission

You are adding a new chapter to an existing multi-subject interactive learning system hosted on GitHub. The system is a self-contained, browser-based HTML/JS/CSS app for **Grade 6 and Grade 8** students. Each chapter lives in its own `data/<subject>/<chapter_slug>/chapter.js` file.

The end deliverable is always:
1. A new `chapter.js` file that defines `window.CHAPTER_DATA = { ... }` following the schema below.
2. An updated `data/catalog.js` that registers the new chapter (with a `grade` field).
3. (Optional) An `images/` subfolder with reference images extracted from a PDF or sourced elsewhere.
4. (Optional) Updates to `css/style.css` and `README.md`.
5. All changes committed and pushed to the GitHub repository.

---

## 📦 Repository Identity

- **GitHub repo:** `https://github.com/prashant08062-arch/learning-system`
- **Default branch:** `main`
- **Git identity to use:**
  - `user.name` = `prashant08062-arch`
  - `user.email` = `prashant08062-arch@users.noreply.github.com`
- **Personal Access Token (PAT):** The user will supply this when invoking the task. Store it in an environment variable and never echo it to logs.
- **Clone URL pattern (with PAT):** `https://x-access-token:${GIT_PAT}@github.com/prashant08062-arch/learning-system.git`

---

## 🗂️ Existing Repository Structure (do NOT break this)

```
learning-system/
├── index.html                       # Home screen + chapter screen + atlas launchers
│                                   # Includes CLASS SELECTOR (Class 6 / 7 / 8 / All)
│                                   # Includes AUTH OVERLAY (login/signup with OTP)
├── README.md                        # Documents all chapters
├── CONTRIBUTING.md                 # THIS FILE — conventions for adding chapters
├── CLASS_6_7_SUITABILITY.md         # Pedagogical review
├── parent-dashboard.html            # Parent dashboard (progress + test papers + proctor logs)
├── css/style.css                    # Shared styles + .el reveal rules + class selector CSS
│                                   # + test paper CSS + animation CSS + immersive mode CSS
├── js/
│   ├── app.js                       # Renders 7 tabs per chapter + grade filtering
│   │                               # + rank-based SVG matching + restartSVGAnimations()
│   │                               # + logout teardown (window.App.teardownActiveContent)
│   ├── auth.js                      # Student/parent auth + OTP verification + user bar
│   ├── proctor.js                   # Progress tracking + auto-proctoring (tab-switch detection)
│   ├── tts.js                       # Web Speech API TTS with sentence chunking
│   ├── testpaper.js                 # CBSE-style test paper engine (Maths only)
│   │                               # 5-section format, 45-min timer, image upload
│   ├── enhancements.js              # Progressive hints + contextual doubts + mastery tracking
│   │                               # (offline-first enhancement layer for guided practice + lectures)
│   ├── globe.js                     # Three.js Earth viewer (for geography chapter)
│   └── globe-mirror-atlas.js        # Mirror & lens 3D atlas (for physics chapter)
├── vendor/three.min.js              # Three.js r128 (MIT) bundled locally
├── data/
│   ├── catalog.js                   # ← EDIT THIS to register new chapters
│   │                               #   Uses window.CATALOG = { subjects: [...] }
│   │                               #   Each chapter MUST have a `grade` field (6 or 8)
│   │
│   │  ── CLASS 6 CHAPTERS (15) ──
│   ├── maths/perimeter_area/chapter.js               # Ch 6: Perimeter and Area
│   ├── geography/locating_places/chapter.js           # Ch 1: Locating Places on the Earth
│   ├── geography/oceans_continents/chapter.js         # Ch 2: Oceans and Continents
│   ├── geography/landforms_life/chapter.js            # Ch 3: Landforms and Life
│   ├── history/india_bharat/chapter.js                # Ch 5: India, That Is Bharat
│   ├── civics/family_community/chapter.js             # Ch 9: Family and Community
│   ├── civics/grassroots_governance/chapter.js         # Ch 10: Governance
│   ├── civics/rural_local_government/chapter.js        # Ch 11: Rural Local Government
│   ├── civics/urban_local_government/chapter.js        # Ch 12: Urban Local Government
│   ├── physics/temperature_measurement/chapter.js      # Ch 7: Temperature
│   ├── physics/beyond_earth/chapter.js                 # Ch 12: Beyond Earth
│   ├── chemistry/separation_methods/chapter.js          # Ch 9: Separation Methods
│   ├── biology/mindful_eating/chapter.js                # Ch 3: Mindful Eating
│   ├── biology/living_creatures/chapter.js              # Ch 10: Living Creatures
│   ├── biology/natures_treasures/chapter.js             # Ch 11: Nature's Treasures
│   │
│   │  ── CLASS 8 CHAPTERS (20) ──
│   ├── maths/baudhayana_pythagoras/chapter.js          # Ch 2: Baudhāyana–Pythagoras
│   ├── maths/fractions_in_disguise/chapter.js           # Ch 1: Fractions in Disguise
│   ├── maths/proportional_reasoning_2/chapter.js        # Ch 3: Proportional Reasoning
│   ├── maths/exploring_geometric_themes/chapter.js       # Ch 4: Geometric Themes
│   ├── maths/tales_by_dots_and_lines/chapter.js          # Ch 5: Tales by Dots and Lines
│   ├── maths/algebra_play/chapter.js                     # Ch 6: Algebra Play
│   ├── maths/area/chapter.js                             # Ch 7: Area
│   ├── geography/world_geography/chapter.js               # Ch 1: World Geography
│   ├── history/india_independence/chapter.js              # Ch 2: India Independence
│   ├── history/indian_architecture/chapter.js             # Ch 4: Indian Architecture
│   ├── civics/role_of_judiciary/chapter.js                # Ch 4: Role of the Judiciary
│   ├── civics/citizenship_rights_duties/chapter.js        # Ch 5: Citizenship
│   ├── economics/population_urban/chapter.js              # Ch 6-7: Population & Urban
│   ├── physics/light_mirrors_lenses/chapter.js            # Ch 10: Light: Mirrors & Lenses
│   ├── physics/pressure_winds_storms_cyclones/chapter.js   # Ch 6: Pressure & Cyclones
│   ├── physics/keeping_time_skies/chapter.js               # Ch 11: Keeping Time with Skies
│   ├── chemistry/particulate_nature_matter/chapter.js       # Ch 7: Particulate Nature
│   ├── chemistry/elements_compounds_mixtures/chapter.js      # Ch 8: Elements, Compounds, Mixtures
│   ├── chemistry/solutes_solvents_solutions/chapter.js       # Ch 9: Solutes, Solvents, Solutions
│   ├── biology/how_nature_works_in_harmony/chapter.js        # Ch 12: Nature in Harmony
│   └── biology/our_home_earth/chapter.js                    # Ch 13: Our Home: Earth
│
├── water_body_atlas.html            # Standalone 3D atlas (Three.js, geography)
└── mirrors_lenses_3d_atlas.html     # Standalone 3D atlas (Three.js, physics)
```

**Subjects defined in `catalog.js`:** maths, geography, history, civics, economics, physics, chemistry, biology — each with an icon and a colour. To add a brand-new subject, edit the `subjects` array in `data/catalog.js`.

**Total chapters: 35** (15 Class 6 + 20 Class 8). The home page has a **class selector** that filters chapters by grade.

---

## 📚 chapter.js Schema (the file you author)

Every chapter.js file MUST define a global `window.CHAPTER_DATA`. Here is the full schema with annotations:

```javascript
/* ============================================================
   CHAPTER DATA — <Chapter Title>
   Subject: <subject> (Grade X, <Textbook name>)
   ============================================================
   Contains:
     • N lectures (X narrated beats) covering <period>
     • 'Before We Begin' story-time vocabulary section in notes
     • N real-life story scenarios
     • N guided-practice problems with step-by-step validation
     • N self-test questions with worked-out answers
     • N practice cards with reveal-answer buttons
     • N images extracted from the original textbook PDF
   ============================================================ */

window.CHAPTER_DATA = {
  "meta": {
    "subject": "history",              // must match subject id in catalog.js
    "slug": "india_independence",      // must match folder name
    "title": "India's Long Road to Independence",
    "subtitle": "Chapter 2 · Exploring Society: India and Beyond · Grade 8 Part 2",
    "chapterNumber": 2,
    "type": "image",                   // 'svg' | 'image' | 'globe'
    // For image-type chapters, add:
    "imagesBasePath": "data/history/india_independence/images/",
    "intro": "Brief description shown on the home screen and as chapter intro."
  },

  // ──────────────────────────────────────────────────────────────
  // CATALOG REGISTRATION — you MUST also add this chapter to catalog.js
  // ──────────────────────────────────────────────────────────────
  // In data/catalog.js, under the appropriate subject's chapters[] array, add:
  //
  //   {
  //     slug: 'india_independence',           // must match meta.slug
  //     title: 'India\'s Long Road to Independence',
  //     subtitle: 'Chapter 2 · Grade 8',     // shown on home screen
  //     description: 'A long, true story...', // short description
  //     grade: 8,                            // ⚠️ REQUIRED: 6, 7, or 8
  //     dataFile: 'data/history/india_independence/chapter.js',
  //     hasImages: true,                     // true if images/ subfolder exists
  //     estimatedTime: '60 min',
  //     ready: true                           // true = chapter.js exists and works
  //   }

  // LECTURES — one entry per sub-lecture. Each lecture has multiple "beats"
  // (narration text). As each beat plays, the next SVG element (with matching
  // data-beat) becomes visible, OR (for image-type) the next image becomes visible.
  "lectures": [
    {
      "id": "queen_takes_over",        // unique within chapter
      "label": "1. The Queen Takes Over (1858)",  // shown in the section bar
      // For SVG-type chapters:
      "viewBox": "0 0 800 600",
      "svg": "<g class=\"el\" data-beat=\"1\">...</g>",  // each el appears at beat N
      // For image-type chapters, replace viewBox/svg with:
      "images": [
        {"file": "fig2_01_quit_india_women.png", "caption": "Brave women marching in 1942"}
      ],
      "beats": [
        "Beat 1 narration text. Should be 1-3 sentences.",
        "Beat 2 narration text...",
        // ... one entry per beat (beats are auto-distributed across images)
      ]
    }
    // ... more lectures
  ],

  // NOTES — HTML content. Use <h2>, <h3>, <p>, <table class="styled-table">,
  // <div class="practice-card"> etc.
  // IMPORTANT: A "Print / Export to PDF" button is AUTOMATICALLY injected at the
  // top of the Notes tab by renderNotes() in js/app.js. You do NOT need to add
  // anything to your chapter.js notes HTML — the toolbar is added by the app.
  // The button opens a clean print-friendly window with just the notes content
  // and triggers the browser's Print dialog (where the user can pick "Save as
  // PDF" as the destination). See the "🖨 Print / Export to PDF Button" section
  // below for details on styling and the print-friendly stylesheet.
  "notes": "<h2>📝 Key Notes</h2><p>...</p>",

  // PRACTICE — HTML content with reveal-answer buttons
  "practice": "<h2>✏️ Practice</h2><div class=\"practice-card\">...</div>",

  // REAL LIFE — scenarios with synchronized narration + SVG or images
  "realLife": [
    {
      "id": "salt_march_story",
      "title": "🚶 The Story of the Salt March",
      "viewBox": "0 0 700 600",
      "svg": "<g class=\"el\" data-beat=\"1\">...</g>",
      // For image-type chapters, use 'images' instead of 'svg':
      // "images": [{"file": "...", "caption": "..."}],
      "beats": ["Beat 1...", "Beat 2..."]
    }
  ],

  // GUIDED PRACTICE — interactive step-by-step problems with validation
  "guidedPractice": [
    {
      "title": "When did India become free?",
      "difficulty": "Easy",          // "Easy" | "Medium" | "Hard"
      "diffClass": "gp-easy",         // "gp-easy" | "gp-med" | "gp-hard"
      "statement": "On what date did India become independent?",
      "steps": [
        {
          "prompt": "Type the date.",
          "validate": {
            "type": "match",          // "match" | "regex" | "pureNum" | "numUnit" | "formula"
            "answers": ["15 august 1947", "august 15 1947"]
          },
          "formatHint": "Example: 15 August 1947",
          "explanation": "Yes! India became free on 15 August 1947.",
          "hint": "It is in August, and the year starts with 194..."
        }
      ],
      "finalAnswer": "India became independent on 15 August 1947."
    }
  ],

  // SELF-TEST — quick recall questions with reveal-answer buttons
  "selfTest": [
    {
      "q": "Question text?",
      "steps": "Step-by-step worked answer (HTML allowed).",
      "answer": "Short one-line answer."
    }
  ]
};
```

### Chapter type decision tree

| Use case | type | Lectures contain | Real-life contains |
|---|---|---|---|
| Math, physics, chemistry, civics (diagrammatic) | `"svg"` | `viewBox` + `svg` (with `class="el" data-beat="N"` elements) | `viewBox` + `svg` |
| History, biology (photos, paintings, satellite images) | `"image"` | `images: [...]` array | `images: [...]` array |
| Geography with 3D Earth | `"globe"` | `beatLocations: [...]` (keys into `meta.locations`) + optional `beatImages` | `images: [...]` array |

**IMPORTANT**: For image-type chapters, real-life scenarios MUST also use `images: [...]` arrays — NOT `svg`. The app.js determines this based on `meta.type === 'image' || 'globe'` for both lectures and real-life scenarios.

### ⚠️ Per-lecture SVG override (mixed chapters)

A chapter with `meta.type: "image"` can have **individual lectures** that use SVG boards instead of images. Simply provide `viewBox` + `svg` on that lecture (instead of `images`), and the app will render it as an SVG board. This is useful for chapters that need both real photos (maps, satellite images) and animated diagrams:

```javascript
// In an image-type chapter, a lecture can override to SVG:
{
  id: 'constitution',
  label: '5. The Constitution',
  viewBox: '0 0 600 460',     // ← provides viewBox + svg → uses SVG mode
  svg: '<g class="el" data-beat="1">...</g>',
  // NO images: [...] field → app detects SVG override
  beats: ['Beat 1...', 'Beat 2...']
}
```

---

## 🎬 Narration Style — story-form for 5-7 year olds

When the chapter is long and content-heavy (like a 50-page history chapter), DO NOT cut the content. Instead, write the beats as a long, story-form narration:

- Open with: "Namaste, my little friend! Welcome to a very special story-time. Today, I am going to tell you a true story..."
- Use direct address: "Are you ready? Let's sit down and listen…"
- Frame each lecture as a chapter of a single long story: "Welcome back, my little friend!"
- Define every technical term in ONE LINE the first time it appears, with a real-world example: "The Sanskrit word for self-rule is SWARAJ. Say it with me: SWA-RAJ."
- Use analogies from a child's world: "Imagine someone tells you what to wear, what to eat, when to sleep... You would feel angry, wouldn't you? That is what FREEDOM means."
- End each lecture with a teaser: "In our next story, we will meet... Ready? Let's turn the page…"
- Include the dates and names — DO NOT dilute the historical content. Just frame it as a story.

**For true 5-7 year olds, the simplest beats should be 2-3 sentences each.** For older kids (Class 6-7), 3-5 sentences is fine. The chapter must remain comprehensive — never compromise on content depth.

---

## 📖 The "Before We Begin" Pattern — separate assets section

For every new chapter, include a dedicated **"Before We Begin — Story-Time Words"** section at the TOP of the `notes` HTML, BEFORE the "Key Notes" section. This is a separate set of assets that explains every technical term a student needs to understand BEFORE starting the lectures.

Format (use this template):

```html
<div style="background: linear-gradient(135deg, #3b0764 0%, #5b21b6 100%); border: 1px solid #a78bfa; border-radius: 14px; padding: 22px 24px; margin-bottom: 28px;">
<h2 style="color: #ddd6fe; font-size: 22px; margin: 0 0 8px; font-weight: 700;">📖 Before We Begin — Story-Time Words</h2>
<p style="color: #ddd6fe; font-size: 13px; margin: 0 0 16px; line-height: 1.6;">My little friend, before we begin our long story, let us sit together and learn some special words... Imagine we are sitting on a soft rug, with a cup of warm milk, and I am telling you these words one by one. Ready? Let's begin!</p>

<div style="background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;">
<h3 style="color: #c4b5fd; font-size: 16px; margin: 0 0 8px;">🌍 1. <Term name></h3>
<p style="color: #e9d5ff; font-size: 13px; line-height: 1.6; margin: 0;">Explain the term in story-form, in 4-6 sentences. Include a real-world example a 5-7 year old would recognise.</p>
</div>

<!-- ... repeat for 10-15 key terms ... -->
</div>
```

Pick 10-15 key terms — the vocabulary a student MUST know before the lectures make sense. For a History chapter on India's independence: India, the British, East India Company, Great Uprising 1857, Freedom/Swaraj, Indian National Congress, Mahatma Gandhi, Non-Violence, Swadeshi, Boycott, Revolutionaries, Vande Mataram, Pakistan/Partition, Princely States, Martyr.

---

## 📊 Supplementary Sections Pattern — hierarchies, chronologies, glossaries

When a chapter benefits from a visual hierarchy or chronological list (e.g., British officials, dynasties of kings, scientific classification), add a new section in `notes` HTML BETWEEN the "Before We Begin" section and the "Key Notes" section. Use:

- **SVG diagrams** with `<rect>`s for boxes, `<line>`s and `<marker>` for arrows, and `<text>` for labels. Color-code levels with different `linearGradient`s. Include a title at the top.
- **SVG timelines** — a vertical line with year markers, dots for events, and rectangles for entries beside each dot. Color-code: ⚠️ red for harmful, ✓ green for reformist, yellow for neutral.
- **HTML tables** with `<table class="styled-table">` for detailed lists (columns: #, Name, Years, Key events/contributions). Use symbols in cells: ✓ positive, ⚠️ harmful, 🎓 founding event, 🏛️ structural change.

Example: the History chapter has a "British Administration in India" section with:
1. SVG hierarchy diagram (5 levels: Crown → Secretary of State → Viceroy → Governors → Collectors)
2. Two SVG timelines (Part 1: 1858-1899, Part 2: 1899-1947) for all 20 Viceroys
3. Detailed HTML table of all 21 Viceroy entries with years and key events
4. Bonus: pre-1858 Governors-General of the East India Company

Use this pattern whenever the user asks for "maps of hierarchy" or "chronological list".

---

## 📄 PDF → Chapter Workflow

When the user supplies a PDF link (Google Drive or similar):

1. **Download:**
   ```bash
   curl -L "https://drive.google.com/uc?export=download&id=<FILE_ID>" -o input.pdf
   file input.pdf   # verify it's actually a PDF
   ```

2. **Extract text + images:**
   ```bash
   pdftotext -layout input.pdf text.txt
   wc -l text.txt
   pdfimages -png -p input.pdf extracted/page
   ls extracted/images | wc -l
   ```

3. **Identify real figures** (skip full-page background extractions):
   - Real figures are typically between 200x200 and 2000x2000 pixels
   - Full-page extractions are usually 1894x1894 or 2480x3508 — skip those
   ```bash
   for f in extracted/images/*; do
     size=$(file "$f" | grep -oE '[0-9]+ x [0-9]+' | head -1)
     w=$(echo $size | cut -d' ' -f1); h=$(echo $size | cut -d' ' -f3)
     if [[ $w -ge 200 && $w -le 2000 && $h -ge 200 && $h -le 2000 && "$size" != "1894 x 1894" && "$size" != "2480 x 3508" ]]; then
       echo "$f → $size"
     fi
   done
   ```

4. **Find figure captions** in the extracted text:
   ```bash
   grep -n "Fig\. [0-9]" text.txt
   ```

5. **Map captions to images** — copy the most relevant ones to `data/<subject>/<chapter_slug>/images/` with descriptive filenames like `fig2_01_quit_india_women.png`.

6. **Reference images in chapter.js** — for image-type chapters, set `meta.imagesBasePath` and use `images: [{"file": "...", "caption": "..."}]` in each lecture.

---

## 🐍 JSON Encoding Rules (avoid silent failures)

The chapter.js file is a JSON object. Three.js r128 has `THREE.Geometry` REMOVED — use `THREE.BufferGeometry` only. Use a Python script to build chapter.js so you don't have to manually escape quotes:

```python
import json
chapter_data = {
    "meta": {...},
    "lectures": [...],
    "notes": "<p>Use HTML strings...</p>",
    # ...
}
with open(OUT_PATH, "w", encoding="utf-8") as f:
    f.write("window.CHAPTER_DATA = ")
    f.write(json.dumps(chapter_data, ensure_ascii=False, indent=2))
    f.write(";\n")
```

**Critical gotchas:**
- ⚠️ **Beat text strings must NOT contain unescaped double quotes.** If a beat needs to quote someone, use single quotes inside: `'He said, "Hello!"'` works inside `"..."`. The reverse `"...\"...\"..."` does NOT work in a plain Python string (you must escape with `\"` or use triple-quoted `r"""..."""`).
- ⚠️ **Inline SVG strings must NOT contain unescaped double quotes either.** Same rule.
- ⚠️ **Three.js r128 has no `THREE.Geometry`.** Use `THREE.BufferGeometry().setFromPoints([...])` and call `.computeLineDistances()` on the Line object (NOT the geometry) for dashed lines.
- ⚠️ **Three.js r128's MeshPhysicalMaterial does not support `transmission` or `thickness` parameters** — they just produce warnings. Use `MeshStandardMaterial` instead.
- ⚠️ **`<` and `>` in HTML/text content must be escaped as `&lt;` and `&gt;`** inside JSON strings (or use Unicode characters like `≤`, `≥`).

---

## ✅ Browser Testing Protocol

After generating chapter.js, ALWAYS run these checks:

1. **JSON validation:**
   ```bash
   node -e "
   const fs = require('fs');
   const code = fs.readFileSync('data/<subject>/<slug>/chapter.js', 'utf-8');
   const jsonStart = code.indexOf('window.CHAPTER_DATA = ') + 'window.CHAPTER_DATA = '.length;
   const jsonText = code.slice(jsonStart, code.lastIndexOf(';'));
   try { JSON.parse(jsonText); console.log('✓ JSON valid'); }
   catch(e) { console.error('✗ JSON error:', e.message); }
   "
   ```

2. **Open the home screen and verify the chapter appears:**
   ```bash
   agent-browser open "file://<absolute_path>/index.html"
   sleep 2
   agent-browser eval "Array.from(document.querySelectorAll('.subject-card')).find(c => c.textContent.includes('<Subject>'))?.click()"
   sleep 1
   agent-browser eval "Array.from(document.querySelectorAll('.chapter-item-title')).map(t => t.innerText)"
   # Should list your new chapter
   ```

3. **Click the chapter and verify each tab loads:**
   ```bash
   agent-browser eval "Array.from(document.querySelectorAll('.chapter-item')).find(c => c.querySelector('.chapter-item-title')?.innerText.includes('<chapter title>'))?.click()"
   sleep 2
   # For each tab: lecture, notes, practice, reallife, guided, selftest
   for tab in lecture notes practice reallife guided selftest; do
     agent-browser click ".tab[data-tab='$tab']"
     sleep 1
     agent-browser eval "JSON.stringify({ tab: '$tab', hasContent: document.getElementById('${tab === 'guided' ? 'guidedApp' : tab + 'Content'}').innerHTML.length > 100 })"
   done
   ```

4. **For SVG-type chapters — verify the beats advance and reveal SVG elements:**
   ```bash
   agent-browser click ".tab[data-tab='lecture']"
   sleep 1
   agent-browser snapshot -i | grep "⏭"   # find the next button ref
   agent-browser click @<ref>   # advance beat
   sleep 1
   agent-browser eval "JSON.stringify({ currentBeat: document.querySelector('.lec-section.active .beat.current .beat-number')?.innerText, visibleEls: document.querySelectorAll('.lec-section.active svg.lec-board .el.visible').length })"
   ```

5. **Vision verification with VLM** (catches visual rendering issues that JS checks miss):
   ```bash
   agent-browser screenshot /tmp/test.png
   z-ai vision -p "Describe this educational screenshot. Is the SVG diagram visible? Are the labels appropriate for the target age group?" -i /tmp/test.png
   ```

6. **Console error capture** (essential for Three.js scenes):
   ```bash
   agent-browser console | head -20
   agent-browser errors | head -20
   # If you see "THREE.Geometry is not a constructor" → switch to BufferGeometry
   # If you see "MeshPhysicalMaterial: 'thickness' is not a property" → switch to MeshStandardMaterial
   ```

---

## 🎨 CSS — SVG Element Reveal Rules (MANDATORY for SVG-type chapters)

The `css/style.css` file already contains the following CSS rules that make SVG elements with `class="el"` start hidden and reveal beat-by-beat. These rules are **already in the repo** — you do NOT need to add them again. But you MUST ensure your SVG uses `class="el"` (not `class="ann-el"`) for the reveal animation to work:

```css
/* SVG element reveal — supports both .ann-el and .el classes */
.svg-board .ann-el,
.svg-board .el {
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
  transform: scale(0.92);
  transform-origin: center;
  transform-box: fill-box;
}
.svg-board .ann-el.visible,
.svg-board .el.visible {
  opacity: 1;
  transform: scale(1);
}
.svg-board .ann-el.pulse,
.svg-board .el.pulse {
  animation: svgPulse 1.4s ease-out;
}
@keyframes svgPulse {
  0%   { filter: drop-shadow(0 0 0 rgba(56,189,248,0)); }
  30%  { filter: drop-shadow(0 0 14px rgba(56,189,248,0.7)); }
  100% { filter: drop-shadow(0 0 0 rgba(56,189,248,0)); }
}
```

**⚠️ CRITICAL: SVG Beat Sync Rule**

Each SVG `<g>` element with `class="el" data-beat="N"` becomes visible when beat N is narrated (i.e., when `currentBeat = N - 1`). Therefore:

- `data-beat="1"` → visible when beat 1 is narrated (first beat)
- `data-beat="2"` → visible when beat 2 is narrated
- ...
- `data-beat="N"` → visible when beat N is narrated (last beat)

**Each lecture MUST have exactly `len(beats)` data-beat groups**, numbered `1, 2, 3, ..., N`. If you have more SVG groups than beats, the extra groups will all appear on the last beat (they get clamped). If you have fewer groups than beats, the last group stays visible for remaining beats.

**Verification script** (run after generating each chapter):
```bash
node -e "
const fs = require('fs');
const vm = require('vm');
const code = fs.readFileSync('data/<subject>/<slug>/chapter.js', 'utf-8');
const sandbox = { window: {} };
vm.runInNewContext(code, sandbox);
const data = sandbox.window.CHAPTER_DATA;
data.lectures.forEach(lec => {
  if (!lec.svg) return;
  const beats = lec.beats.length;
  const groups = (lec.svg.match(/data-beat=\"\d+\"/g) || []).length;
  const ok = groups === beats;
  console.log((ok ? '✓' : '✗') + ' ' + lec.id + ': ' + beats + ' beats, ' + groups + ' groups');
});
"
```

## 🎨 CSS Additions (optional, for animated SVG/3D scenes)

For SVG-based chapters (physics, maths), add subject-specific CSS to `css/style.css` to make ray diagrams glow:

```css
/* ---------- Animated light rays in SVG lectures ---------- */
svg.lec-board line[stroke*="fbbf24"],
svg.lec-board line[stroke*="fb923c"],
svg.rl-board line[stroke*="fbbf24"],
svg.rl-board line[stroke*="fb923c"] {
  filter: drop-shadow(0 0 4px rgba(251, 191, 36, 0.65));
  animation: lightPulse 1.6s ease-in-out infinite;
}
@keyframes lightPulse {
  0%, 100% { opacity: 0.85; filter: drop-shadow(0 0 4px rgba(251,191,36,0.5)); }
  50%      { opacity: 1.00; filter: drop-shadow(0 0 8px rgba(251,191,36,0.85)); }
}

/* Practice cards */
.practice-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 18px 20px;
  margin-bottom: 16px;
}
.practice-card h3 { color: #38bdf8; font-size: 16px; margin-bottom: 8px; }
.reveal-answer {
  margin-top: 12px;
  padding: 12px 14px;
  background: rgba(56,189,248,0.08);
  border-left: 3px solid #38bdf8;
  border-radius: 6px;
}
```

---

## 🖨 Print / Export to PDF Button (in every chapter's Notes tab)

Every chapter's **Notes (Key Things to Remember)** tab automatically shows a **"Print / Export to PDF"** button at the top of the content. Students (and teachers) can use this button to:

- **Print** the notes to a physical printer, OR
- **Export to PDF** by choosing "Save as PDF" as the destination in the browser's Print dialog.

### How it works (no per-chapter work required)

The button is **automatically injected** by `renderNotes()` in `js/app.js` whenever a chapter's Notes tab is rendered. You do **NOT** need to add anything to your chapter's `notes` HTML — the toolbar is added by the app, not by individual chapter.js files.

When the user clicks the button:

1. The `printNotes()` function in `js/app.js` reads the current chapter's notes HTML (from the `#notesBody` div that `renderNotes()` created).
2. It builds a **self-contained print-friendly HTML document** in a new browser window/tab. The document includes:
   - A **print header** at the top with the chapter title and subtitle, with a colored accent bar matching the subject's color.
   - The full notes HTML content, restyled for print: light background, dark text, readable font sizes (12pt body, 16pt h2, 13pt h3), and proper page-break rules (`page-break-after: avoid` on headings, `page-break-inside: avoid` on tables/cards).
   - A **print footer** at the bottom with the chapter name and generation date.
   - An inline `<script>` that calls `window.print()` automatically when the page loads.
3. The browser's Print dialog opens. The user picks "Save as PDF" (or a physical printer) and clicks Save.

### Styling details (already handled by `printNotes()`)

The print-friendly document has its own inline stylesheet (so it doesn't depend on the main app's `style.css`). Notable rules:

- **Subject color is reused** for the header accent bar, h2/h3 colors, table header background, formula text, and triple pill backgrounds — so the printed PDF remains visually identifiable per subject (blue for Maths, pink for Physics, yellow for History, green for Geography).
- **The "Before We Begin" gradient card** (used in History and Fractions chapters) keeps its dark purple gradient background with light text — `print-color-adjust: exact` is set so the gradient prints correctly.
- **Reveal-answer buttons** (`.reveal-btn`) are hidden in the print output, and the reveal-answer content (`.reveal-answer`) is force-shown so the student gets the full notes including hidden answers.
- **Tables** (`.styled-table`) use the subject color for the header row and zebra-striping for readability.

### CSS in `css/style.css` (for the on-screen button)

The toolbar button itself (visible in the live app) is styled by the `.notes-toolbar`, `.notes-toolbar-info`, `.notes-toolbar-title`, `.notes-toolbar-sub`, `.notes-print-btn`, `.notes-print-icon`, and `.notes-print-label` classes in `css/style.css`. The toolbar is `position: sticky` so it stays visible as the user scrolls through long notes. On mobile (≤600px width) it stacks vertically so the print button is full-width and easy to tap.

### Quality-checklist additions for this feature

When adding a new chapter, also verify:

- [ ] Notes tab shows the "📝 Key Things to Remember" toolbar at the top
- [ ] The "Print / Export to PDF" button is visible and tappable
- [ ] Clicking the button opens a new window/tab with a print-friendly view of the notes
- [ ] The print view has a header with the chapter title and colored accent bar
- [ ] In the print view: `page-break-after: avoid` is set on h2/h3/h4 (so headings don't get orphaned at the bottom of a page)
- [ ] In the print view: tables and `.practice-card` blocks have `page-break-inside: avoid`
- [ ] In the print view: the subject's accent color is used for headings, table headers, and formula text

### If you need to change the button label or styling

Edit `js/app.js` (search for `renderNotes` and `printNotes`) and `css/style.css` (search for `.notes-toolbar` and `.notes-print-btn`). The print-friendly stylesheet itself is inline in the `printNotes()` function in `js/app.js` — it is intentionally NOT in `css/style.css` because the print document is a separate window with no access to the main app's stylesheet.

---

## 🚀 Push to GitHub

After all browser tests pass and VLM verification confirms the visuals are correct:

```bash
# 1. Set up git identity (if not already)
git config --global user.email "prashant08062-arch@users.noreply.github.com"
git config --global user.name "prashant08062-arch"

# 2. Sync the local repo with the bundle directory
# (the working copy is at /home/z/my-project/github_push/ — clone the repo fresh there if needed)
cd /home/z/my-project/github_push
git pull origin main

# 3. Copy the new chapter.js, images/, and updated catalog.js into the repo
cp -r /home/z/my-project/download/<bundle_dir>/* .

# 4. Stage and commit
git add -A
git commit -m "feat(<subject>): add <chapter title> (<grade>)

<2-3 sentence summary of the chapter content>

CHAPTER CONTENT:
- N story-form lectures (X narrated beats) covering <period/topics>
- 'Before We Begin' story-time vocabulary section in notes (N terms)
- N real-life story scenarios
- N guided-practice problems with step-by-step validation
- N self-test questions with worked-out answers
- N practice cards with reveal-answer buttons
- N images extracted from the original textbook PDF

LECTURES (N):
 1. <Lecture 1 title>
 2. <Lecture 2 title>
 ...

(For supplementary sections:)
+ <section name> with SVG hierarchy diagram + SVG chronological timeline + HTML table"

# 5. Push
git push origin main
```

Verify the push via the GitHub API:
```bash
curl -s -H "Authorization: token $GIT_PAT" \
  "https://api.github.com/repos/prashant08062-arch/learning-system/commits?per_page=2" | grep message
```

---

## 🌊 Standalone 3D Atlases (optional — only if the user explicitly asks)

If the user asks for an interactive 3D atlas alongside the chapter (similar to the existing `water_body_atlas.html` and `mirrors_lenses_3d_atlas.html`), build a self-contained HTML file using Three.js r128 from CDN.

### IMPORTANT: Animated teaching, not static viewers

The `water_body_atlas.html` was redesigned (Sept 2025) to TEACH each term through animation, not just display a 3D model. New atlases should follow the same pattern:

- **Each term has a 6-step teaching timeline** (not just a static scene). Each step:
  1. Starts with a simple scene
  2. Animates the feature forming/appearing
  3. Highlights the key part with arrows/colors (yellow/orange)
  4. Shows the term name (3D label)
  5. Shows a real-world example on a mini-map (SVG world map with a glowing dot)
  6. Shows a side-by-side comparison with the most easily-confused term (SVG diagrams)
- **The animation itself must explain the concept** — text alone is insufficient.
- **Use simple procedural geometry/SVG/Canvas where possible** — no heavy external 3D assets.
- **Colors are consistent:** blue=water, green/brown=land, yellow/orange=highlighted feature, pink=comparison feature.
- **Keep text minimal and Class-8-friendly.**

### Architecture of the redesigned atlas

- **Layout (preserved):** Sidebar (term buttons) + 3D viewport (canvas) + Info panel (definition, example, mini-map, teaching-steps list, comparison table)
- **Three.js r128 gotchas:**
  - No `THREE.Geometry` — use `THREE.BufferGeometry().setFromPoints([...])`
  - No `THREE.CapsuleGeometry` — provide a shim or use scaled spheres
  - `MeshStandardMaterial` instead of `MeshPhysicalMaterial` (no `transmission`/`thickness`)
  - `LineDashedMaterial` requires `line.computeLineDistances()` on the Line object, not the geometry
- **Each term has a `SCENE_CONTROLLERS[termKey] = function(root) { ... return { build, update, reset, steps, totalDuration }; }`** — the controller builds ALL 3D objects (initially invisible), then `update(t)` reveals/highlights/moves them based on the timeline `t` (in seconds).
- **Each term has a `TERMS[termKey]` object** with: name, pronounce, icon, definition, example, compareTitle, compare (table data).
- **Teaching controls (in the viewport bottom bar):**
  - **🎓 Teach Me** — toggles auto-advance mode; the controller's `update(t)` drives camera, animations, highlights, labels.
  - **⏸ Pause / ▶ Play** — pauses/resumes timeline progression.
  - **↻ Replay** — restarts from t=0.
  - **⟲ Reset View** — resets the camera.
  - **⏭ Step** — snaps to the next step boundary.
  - **Scrubber slider** — drag to any t; calls `update(t)` immediately for responsiveness.
- **Camera tween helper:** `tweenCamera(t, t0, t1, fromPos, toPos, fromLookAt, toLookAt)` returns `{ pos, lookAt }` using smoothstep. Set `cameraOverride` to this object; the render loop applies it.
- **Smoothstep helper:** `smoothAt(t, t0, t1, v0, v1)` for tweening object opacity/scale/position.
- **Comparison overlay:** `showComparison(leftLabel, leftSVG, rightLabel, rightSVG)` displays two SVG diagrams side-by-side over the 3D viewport. Call `hideComparison()` when the comparison step is not active.
- **3D labels:** `createTextLabel(text, color, size)` returns a `THREE.Sprite` with a CanvasTexture — useful for floating term names like "GULF", "BAY", etc.
- **Highlight arrows:** `createHighlightArrow(from, to, color)` returns a `THREE.Group` with a shaft + arrowhead — useful for pointing at the key feature.
- **Orbit controls:** drag (rotate), wheel (zoom), right-drag (pan), touch support.
- **Error handling:** wrap `initEngine()` in try/catch; wrap each controller's `build()` call in try/catch so one bad scene doesn't break the others.

### Add a launcher button on the home screen

Add to `index.html` below the existing subject grid:
```html
<div style="margin: 0 auto 16px; max-width: 760px; padding: 18px 22px; background: linear-gradient(135deg, #...); border-radius: 14px; ...">
  <a href="<atlas_filename>.html" target="_blank" style="background: #fbbf24; color: #0a1326; ...">🚀 Launch 3D Atlas →</a>
</div>
```

### Quality-checklist additions for atlases

- [ ] Each term has at least 6 teaching steps in its timeline
- [ ] The "Teach Me" button works — auto-advances the timeline, controls camera, reveals objects progressively
- [ ] Each term's animation actually TEACHES the concept (not just shows a 3D model)
- [ ] A real-world example mini-map (SVG world map with a glowing dot) appears in the info panel
- [ ] A side-by-side SVG comparison overlay appears at the final step for easily-confused terms
- [ ] All 6 controls work: Teach Me, Play/Pause, Replay, Reset View, Step, Scrubber
- [ ] Camera tweens are smooth (use smoothstep, not linear interpolation)
- [ ] Objects fade in/out smoothly (use `setOpacity(obj, t)` with smoothstep)
- [ ] No console errors when switching between terms

---

## 📋 Quality Checklist (run before declaring done)

- [ ] JSON in chapter.js parses successfully (`JSON.parse` in Node)
- [ ] All 4 (or more) lectures have correct number of beats vs SVG elements / images
- [ ] **SVG beat sync: `data-beat` values can start at any number — the rank-based matching handles gaps. But for best results, use 1, 2, 3, ..., N**
- [ ] **If this is a Maths chapter: add test paper question generators to `js/testpaper.js` `QUESTION_BANK[slug]`**
- [ ] **If this chapter has guided practice: run `python3 /home/z/my-project/scripts/generate_enhancements_cli.py` to generate progressive hints, contextual doubts, and topic tags**
- [ ] **After editing SVGs: re-run `python3 /home/z/my-project/scripts/universal_animations.py` to add animation classes**
- [ ] Notes HTML contains "Before We Begin" vocabulary section at the top
- [ ] Notes HTML contains "Key Notes" with timeline, key leaders table, etc.
- [ ] Practice tab has reveal-answer buttons (count matches what was promised)
- [ ] Real-life scenarios render and advance through beats
- [ ] Guided practice problems accept the expected answers (test with sample inputs)
- [ ] Self-test questions and answers present
- [ ] Chapter registered in `data/catalog.js` with correct `subject` id, `slug`, `dataFile` path, `hasImages` flag, `estimatedTime`
- [ ] **Chapter has a `grade` field in catalog.js** (6, 7, or 8) — without this, the class selector won't show it
- [ ] **Catalog entry has `subtitle` and `description` fields** (required by app.js for rendering)
- [ ] Browser opens `index.html`, chapter appears under its subject when the correct class is selected, all 6 tabs load without errors
- [ ] For SVG chapters: beats advance and reveal SVG elements progressively (beat 1 shows only 1 element, beat 2 shows 2, etc.)
- [ ] For image chapters: images transition correctly as beats advance
- [ ] VLM (vision model) verifies the screenshots look correct
- [ ] README.md updated to mention the new chapter in the chapters table
- [ ] **Notes tab shows the "📝 Key Things to Remember" toolbar at the top, with a working "Print / Export to PDF" button** (added automatically by `renderNotes()` in `js/app.js` — no per-chapter work needed)
- [ ] **Clicking the Print button opens a print-friendly window** with the chapter title in a colored header bar and the full notes content
- [ ] Commit message follows the established format (`feat(<subject>): add <title>`)
- [ ] Push to GitHub successful; latest commit visible via API

---

## 🎯 Worked Examples — chapters in the repo

For reference, the repo contains **24 fully-built chapters** across 7 subjects and 2 grades:

### Class 6 chapters (15)

| Chapter | Subject | Type | What to study |
|---|---|---|---|
| Perimeter and Area | maths | svg | Animated SVG boards for geometric shapes, formulas appearing beat-by-beat |
| Locating Places on the Earth | geography | svg | SVG globe with latitudes/longitudes, compass rose, time zones |
| Oceans and Continents | geography | svg + image | SVG for diagrams + image for world map (per-lecture override) |
| Landforms and Life | geography | svg + image | SVG for mountains/plateaus + image for satellite photo |
| India, That Is Bharat | history | image + svg | Image for maps + SVG for Constitution scroll and word-flow diagram |
| Family and Community | civics | svg | Family trees, community circles, community action stories |
| Grassroots Democracy (3 chapters) | civics | svg | Three organs of government, three-tier pyramid, Panchayati Raj |
| Temperature and its Measurement | physics | svg | Thermometer diagrams, temperature scales, measurement steps |
| Beyond Earth | physics | svg | Stars, constellations, Solar System, Moon phases |
| Methods of Separation | chemistry | svg | Handpicking, winnowing, filtration, evaporation diagrams |
| Mindful Eating | biology | svg | Food components, balanced diet, mindful eating habits |
| Living Creatures | biology | svg | Living vs non-living, characteristics, habitats, life cycles |
| Nature's Treasures | biology | svg | Natural resources, air composition, forests, conservation |

### Class 8 chapters (20)

| Chapter | Subject | Type | What to study |
|---|---|---|---|
| Perimeter and Area | maths | svg | Animated SVG boards with dot-tracing perimeter + tile-filling area |
| The Baudhāyana-Pythagoras Theorem | maths | svg | How to author SVG with `class="el" data-beat` for progressive reveal |
| Fractions in Disguise | maths | svg | Percentages, FDP conversions, profit & loss, compound interest |
| Proportional Reasoning–2 | maths | svg | Ratios, proportions, pie charts, direct/inverse proportions |
| Exploring Geometric Themes | maths | svg | Fractals (Sierpinski), 3D solid views, Euler's formula |
| Tales by Dots and Lines | maths | svg | Mean, median, dot plots, outlier resistance |
| Algebra Play | maths | svg | Think-of-a-number tricks, number pyramids, algebraic proofs |
| Area | maths | svg | Area of rectangles, triangles, parallelograms, trapeziums |
| World Geography: Some Glimpses | geography | globe + image | How to use 3D globe + image-based real-life scenarios |
| **India's Long Road to Independence** | **history** | **svg** | **Enhanced for Alpha-plus students: "How Ideas Travelled" analytical lecture, conceptual depth beats, hand-crafted SVG diagrams** |
| A Journey Through Indian Architecture | history | svg | Pure-SVG chapters with accumulating beat-by-beat diagrams |
| India, That Is Bharat | history | svg | Pure-SVG with etymology tree, map-like layout, Constitution page |
| The Role of the Judiciary | civics | svg | Justice concept, three-tier judiciary, PIL, Lok Adalats |
| Citizenship: Rights and Duties | civics | svg | Six Fundamental Rights, eleven Fundamental Duties |
| Dynamics of Population & Urban Landscape | economics | svg | Demography, population pyramid, demographic dividend, Smart Cities |
| Light: Mirrors and Lenses | physics | svg | The "Class 6-7 Quick Reference" pattern, plus a companion standalone 3D atlas |
| Pressure, Winds, Storms, and Cyclones | physics | svg | Pressure formula, wind formation, cyclones, lightning safety |
| Keeping Time with the Skies | physics | svg | Moon phases, calendars, festivals & astronomy, artificial satellites |
| Particulate Nature of Matter | chemistry | svg | Particle theory, three states, interparticle spacing |
| Elements, Compounds, and Mixtures | chemistry | svg | Mixtures, elements, compounds, minerals |
| Solutes, Solvents, and Solutions | chemistry | svg | Solutions, solubility, saturation, density |
| How Nature Works in Harmony | biology | svg | Habitats, ecosystems, food chains, cascade effect |
| Our Home: Earth | biology | svg | Earth as unique planet, solar system, four spheres |

When in doubt about a convention, look at how the existing chapters do it. For Class 6 SVG patterns, `data/civics/family_community/chapter.js` is a good simple example. For Class 8 SVG patterns, `data/history/india_independence/chapter.js` is the most comprehensive example (13 lectures including "How Ideas Travelled" analytical lecture, 140+ beats, enhanced conceptual depth for Alpha-plus students, "Before We Begin" + "British Administration" + Key Notes + 4 real-life scenarios + 7 guided practice + 15 self-test + 12 practice cards). Note: this chapter is now `type: "svg"` (converted from image-type), with all lectures using hand-crafted or concept-board SVGs with universal animations.

---

## 🏫 Class Selector — Grade Filtering

The home page (`index.html`) includes a **class selector bar** that lets users filter chapters by grade:

```
[Select Class:] [Class 6] [Class 7] [Class 8] [All Classes]
```

- **Default:** Class 6 (stored in `localStorage` as `selectedGrade`)
- **Clicking a button** filters subjects/chapters by the `grade` field in `catalog.js`
- **Subjects with no chapters** for the selected grade are hidden
- **Stats** (subjects/ready/total) update dynamically based on the filter

### How grade filtering works in `app.js`

```javascript
let currentGrade = localStorage.getItem('selectedGrade') || '6';

function filterChaptersByGrade(chapters, grade) {
  if (!chapters) return [];
  if (grade === 'all') return chapters;
  return chapters.filter(ch => String(ch.grade || '8') === grade);
}
```

In `renderHome()`, each subject's chapters are filtered before rendering:
```javascript
const _filteredChapters = filterChaptersByGrade(subject.chapters, currentGrade);
if (_filteredChapters.length === 0) return; // skip subjects with no chapters for this grade
```

### catalog.js format

The catalog uses `window.CATALOG = { subjects: [...] }` (NOT `window.SUBJECTS`). Each chapter entry MUST include:

```javascript
window.CATALOG = {
  subjects: [
    {
      id: 'maths',
      name: 'Mathematics',
      icon: '📐',
      color: '#38bdf8',
      chapters: [
        {
          slug: 'perimeter_area',
          title: 'Perimeter and Area',
          subtitle: 'Chapter 6 · Grade 6',     // shown on home screen
          description: 'Perimeter and area of rectangles...',  // short description
          grade: 6,                            // ⚠️ REQUIRED for class selector
          dataFile: 'data/maths/perimeter_area/chapter.js',
          hasImages: false,
          estimatedTime: '45 min',
          ready: true                          // true = chapter.js exists and works
        }
      ]
    }
  ]
};
```

### CSS for the class selector

Already in `css/style.css` — uses `.class-selector-bar`, `.class-btn`, `.class-btn.active` classes.

---

## 🛠️ Tool Inventory

When invoked inside the Super Z environment, you have access to:

- **Bash** — for git, curl, pdftotext, pdfimages, file, node
- **Read/Write/Edit/MultiEdit** — for editing files
- **Glob/Grep/LS** — for searching files
- **Skill** — for loading specialised skills (e.g., `image-search`, `VLM`, `agent-browser`, `pdf`, `docx`, `xlsx`, `charts`)
- **Task** — for delegating subtasks to specialised subagents (general-purpose, Explore, Plan, full-stack-developer, ppt-expert)
- **TodoWrite/TodoRead** — for tracking progress on multi-step tasks
- **AskUserQuestion** — for clarifying questions BEFORE starting work (MANDATORY for deliverable-creation tasks)
- **Outline** — for setting the deliverable outline before generating content
- **Complete** — for marking Next.js web projects complete (not relevant to this repo)

**Critical tool notes:**
- **`agent-browser`** is the headless browser for visual testing — open the page, take screenshots, click buttons by ref, eval JavaScript, capture console errors
- **`z-ai vision`** (the VLM skill) verifies screenshots render correctly — always run it on at least one screenshot before pushing to GitHub
- The **`pdf` skill** is for generating PDFs from text — for extracting text/images from a PDF, use `pdftotext` and `pdfimages` directly via Bash

---

## 📋 Test Paper System (js/testpaper.js)

A **7th tab** ("📋 Test Paper") appears ONLY for **Maths chapters**. It provides a CBSE-style written exam with:

### Structure (15 questions, 32 marks)
| Section | Type | Questions | Marks Each | Total |
|---------|------|-----------|------------|-------|
| A | MCQ & Very Short Answer | 6 | 1 | 6 |
| B | Short Answer (Type I) | 4 | 2 | 8 |
| C | Short Answer (Type II) | 3 | 3 | 9 |
| D | Long Answer / Application | 1 | 5 | 5 |
| E | Case Study / Word Problem | 1 | 4 | 4 |

### Features
- **45-minute countdown timer** (auto-submits at 0:00, yellow at 10 min, red+pulse at 5 min)
- **Open-ended text areas** for each question (NOT MCQ — students write their answers)
- **Image upload** for answer sheet photo (compressed to max 1200px JPEG 0.7 quality before localStorage)
- **Model answers** shown after submission for self-review
- **Test results recorded to localStorage** (`learning_system_test_results_<email>`) with full question text, student answer, model answer, and uploaded image
- **Parent dashboard integration** — parents see each test attempt with expandable answer sheet image + model answers grouped by section
- **Random question generation** — each attempt gets different values (e.g., different rectangle dimensions, different profit percentages)

### Question Bank
Each Maths chapter has 10 random question generators in `QUESTION_BANK[chapterSlug]`. The `generateTestPaper()` function calls generators round-robin to produce 15 questions, then assigns sections A-E based on position.

### Adding Test Paper to a New Maths Chapter
Add generators to `QUESTION_BANK` in `js/testpaper.js`:
```javascript
'new_chapter_slug': [
  function() {
    // Generate random values
    const a = ri(3, 15), b = ri(3, 15);
    const answer = a * b;
    return {
      type: 'mcq',
      marks: 2,
      question: `Find the area of a rectangle with length ${a} cm and width ${b} cm.`,
      options: [`${answer} cm²`, ...].sort(() => Math.random() - 0.5),
      answer: `${answer} cm²`,
      solution: `Area = length × width = ${a} × ${b} = <strong>${answer} cm²</strong>`
    };
  },
  // ... 9 more generators
]
```

---

## 🎬 Universal Animation System

ALL 169 lectures across all subjects have animated SVGs that play in sync with the narration.

### Animation Classes (by SVG element tag)
| Tag | Class | Effect |
|-----|-------|--------|
| `<text>` | `anim-fade-in` | Fade + slide up |
| `<rect>` | `anim-pop-in` | Scale bounce (0.7→1.08→1) + fade |
| `<line>` | `anim-draw` | Stroke draws itself (dashoffset) |
| `<path>` | `anim-draw` | Stroke draws itself |
| `<circle>` | `anim-pulse-in` | Fade + pulse scale |
| `<polygon>` | `anim-pop-in` | Scale bounce + fade |

### Staggered Timing
Elements within each beat group are staggered by 0.15s via `animation-delay` inline style. The first element appears immediately, the second 0.15s later, etc.

### Animation Restart
`restartSVGAnimations(el)` in `app.js` uses the Web Animations API (`element.getAnimations()`) to cancel and replay all animations when a beat becomes visible:
```javascript
anims.forEach(function(anim) {
  anim.cancel();  // reset to initial state
  anim.play();    // restart from beginning
});
```
This is called in `renderBoard()` every time a beat becomes active — even when navigating back to a previously-seen beat.

### Special Animations (Perimeter & Area chapter)
- **Perimeter dot**: CSS `offset-path` moves a glowing dot along the rectangle boundary
- **Area tiles**: 20 green tiles fill column-by-column with staggered 0.15s delays

### CSS Location
The universal animation CSS is injected inline in each lecture's SVG via a `<style>` tag (see `UNIVERSAL_CSS` in `scripts/universal_animations.py`). The classes are:
- `.anim-fade-in`, `.anim-pop-in`, `.anim-draw`, `.anim-pulse-in`
- `.anim-slide-left`, `.anim-slide-right`
- Plus chapter-specific: `.area-tile`, `.fade-in`, `.draw-line`, `.perim-dot`, `.perim-dot-square`

### Re-running the Animation Script
```bash
python3 /home/z/my-project/scripts/universal_animations.py
```
This is **idempotent** — it strips previous animation classes and re-adds them cleanly. Safe to re-run after editing chapter SVGs.

---

## 🔊 TTS Engine — Sentence Chunking (js/tts.js)

Chrome's `speechSynthesis` has a known bug where utterances longer than ~15 seconds get cut off without firing `onend`. The TTS engine now:

1. **Splits long text into sentence-sized chunks** (~200 chars each) using `chunkText()`
2. **Speaks chunks sequentially** — each chunk's `onend` triggers the next chunk
3. **`onEnd` callback only fires after ALL chunks are spoken**
4. **Safety timer resets per chunk** (generous 6s buffer)

This ensures the narration doesn't get cut off mid-beat, and the beat doesn't advance until the entire narration is complete.

---

## 📐 Rank-Based SVG Beat Matching (js/app.js)

SVG elements are matched to beats by **rank** (position in sorted order), NOT by absolute `data-beat` number. This handles SVGs where:
- `data-beat` starts at 2 (not 1)
- `data-beat` has gaps (e.g., 2,3,4,5,6 for 6 beats)
- `data-beat` has extras (e.g., 8 elements for 7 beats)

**How it works**: `renderBoard()` sorts all `.el` elements by their `data-beat` value, then:
- **Pure-SVG (accumulating)**: shows the first N elements for beat N
- **Hybrid (exclusive)**: shows only the Nth element for beat N

This means the first SVG element always shows at beat 1, regardless of its `data-beat` number.

---

## 🔐 Authentication System (js/auth.js)

### Student Account
- Signup with name, grade, email, password, parent name, parent email, parent phone
- **OTP verification** (dev-mode: OTP shown on screen, 5-min expiry)
- Login with email + password
- Grade is locked to the student's registered grade (class selector hidden)

### Parent Account
- Login from `parent-dashboard.html` with parent email + password
- Sees all students linked to their parent email
- Dashboard shows: chapter progress, practice scores, self-test scores, **test paper attempts with uploaded images + model answers**, proctor logs

### Logout Teardown
`window.App.teardownActiveContent()` in `app.js` is called by `auth.js` logout. It:
1. Stops all lecture playback (timers, TTS, globe viewers)
2. Removes immersive overlay DOM elements
3. Resets chapter tracking state
4. Shows the auth overlay

---

## 🛡️ Proctoring System (js/proctor.js)

### Auto-Proctoring
When a student opens a chapter, proctoring starts automatically:
- **Fullscreen mode** (exits = violation)
- **Tab switch detection** (visibilitychange + blur events)
- **3 warnings** → session terminated on 5th violation
- Violations logged to `learning_system_proctor_logs_<email>`

### Progress Tracking
Tracks in `learning_system_progress_<email>`:
- Chapters visited, time spent per chapter
- Lecture beats completed (e.g., 3/10 beats)
- Practice problems answered/correct
- Self-test questions answered/correct
- Tabs opened

### Parent Dashboard
Shows per-student:
- Summary cards (chapters, time, practice %, self-test %, test papers, violations)
- Chapter progress table
- Test paper attempts (expandable: shows uploaded answer sheet image + model answers grouped by section A-E)
- Proctor violation logs

---

## 🚀 Enhancement Layer (js/enhancements.js)

Three offline-first features that add classroom-like engagement:
progressive hints, contextual doubts, and mastery tracking.
All three work 100% offline (no server, no API calls at runtime).

### 1. Progressive Hints (Guided Practice)

Guided practice problems now show **3 levels of hints** that appear
progressively as the student struggles:

| Trigger | Hint Level | Content |
|---------|-----------|----------|
| After 2 wrong attempts | Level 1 | Concept reminder (don't give away the answer) |
| After 3 wrong attempts | Level 2 | Formula/method (partial solution) |
| After 4 wrong attempts | Level 3 | Nearly complete solution (one step away) |

**Data format** in `chapter.js` guided practice steps:
```javascript
"steps": [
  {
    "prompt": "Find the profit if CP = ₹200 and SP = ₹250.",
    "validate": { "type": "match", "answers": ["50", "₹50", "Rs 50"] },
    "hints": [
      "Hint 1: Profit = Selling Price minus Cost Price",
      "Hint 2: Profit = ₹250 - ₹200 = ?",
      "Hint 3: The answer is ₹50. You spent ₹200 and got ₹250, so you gained ₹50."
    ],
    "explanation": "Profit = SP - CP = 250 - 200 = ₹50"
  }
]
```

Falls back to old single-hint behavior (`step.hint` string) if
`step.hints` array isn't present.

### 2. Contextual Doubts (Lecture Beats)

Each beat in the transcript can have pre-generated FAQs that students
expand by clicking a "💬 Common Questions" button.

**Data format** in `chapter.js` at lecture level:
```javascript
"lectures": [
  {
    "id": "profit_loss",
    "beats": ["Namaste, my little friend! Today we learn about profit...", ...],
    "beatDoubts": [
      {
        "beat": 1,
        "doubts": [
          { "q": "Why is profit calculated on cost price?", "a": "Because CP is your investment..." },
          { "q": "What if SP is less than CP?", "a": "Then it's a loss, not a profit..." }
        ]
      },
      { "beat": 2, "doubts": [...] }
    ]
  }
]
```

The doubt button appears automatically when `beatDoubts` is present.
Clicking expands a panel showing Q&A pairs (click question to reveal
answer). 100% offline — all content pre-generated at build time.

### 3. Mastery Tracking

Tracks per-topic accuracy across guided practice problems and gates
progression based on mastery level.

**Topic tagging** in `chapter.js` guided practice:
```javascript
"guidedPractice": [
  {
    "title": "Profit calculation",
    "topic": "profit_loss",       // ← add this field
    "difficulty": "Easy",
    "steps": [...]
  }
]
```

**Mastery levels** (stored in `learning_system_mastery_<email>`):

| Level | Condition | Badge |
|-------|-----------|-------|
| `untried` | 0 attempts | (none) |
| `struggling` | <50% accuracy after 3+ attempts | 💪 Keep Trying |
| `learning` | 50-79% accuracy | 📖 Learning |
| `mastered` | ≥80% accuracy with ≥3 attempts | ✅ Mastered |

**Progression gate:** If a student has <50% accuracy after 3+ attempts
on a topic, a prompt appears: "💡 You seem to be finding this tricky.
Try reviewing the lecture, then come back."

**Mastery badge** shown next to problem title in guided practice.

### Generating Enhancement Content with LLM

Use `scripts/generate_enhancements_cli.py` to auto-generate hints,
doubts, and topic tags for any chapter:

```bash
# Generate for a specific chapter (modify CHAPTER_PATH in the script)
python3 /home/z/my-project/scripts/generate_enhancements_cli.py
```

The script uses the `z-ai` CLI (free LLM) to:
1. Tag each guided practice problem with a `topic` field
2. Generate 3 progressive hints per guided practice step
3. Generate 2 contextual doubt FAQs per lecture beat

Output is written directly into the chapter.js file. Review the
LLM-generated content before pushing.

**Current coverage:**
- `fractions_in_disguise` (Profit & Loss): 8 topics, 54 hints, 130 doubts

**To add for other chapters:** Copy the script, change `CHAPTER_PATH`,
run. Cost: ~₹0 (free LLM CLI). Time: ~5-10 minutes per chapter.

### Hooks in app.js

The enhancement layer hooks into app.js at 4 points:

| Hook | Location | What it does |
|------|----------|-------------|
| `injectDoubtButton()` | `renderTranscript()` | Adds 💬 button to each beat |
| `showProgressiveHint()` | `gpCheckAnswer()` (wrong branch) | Shows level 1/2/3 hints |
| `recordAttempt(true/false)` | `gpCheckAnswer()` (both branches) | Updates mastery store |
| `renderMasteryBadge()` + `checkGateAndPrompt()` | `gpLoad()` | Shows badge + gate prompt |

All hooks check `if (window.Enhancements)` before calling, so the
system degrades gracefully if `enhancements.js` isn't loaded.

---

## 📝 Final Note — the User's Voice

When the user invokes this prompt, they will say something like:

> "Add a new chapter on <topic> for <grade> students. The PDF is at <URL>. Use the same approach as the existing chapters."

Your job is to:
1. **Read the PDF** and extract its text + images.
2. **Map the content** to 8-12 lectures (or as many as the chapter needs).
3. **Write story-form beats** as if explaining to a 5-7 year old — but DO NOT compromise on content depth.
4. **Include a "Before We Begin" section** explaining 10-15 key terms in story-form.
5. **Add real-life scenarios, guided practice, self-test, practice cards** matching the chapter content.
6. **If the user asks for a "hierarchy" or "chronological list"** — add an SVG diagram + HTML table in the notes section.
7. **If this is a Maths chapter with guided practice:** run `python3 /home/z/my-project/scripts/generate_enhancements_cli.py` (after updating `CHAPTER_PATH` in the script) to auto-generate progressive hints, contextual doubts, and topic tags.
8. **Test in the browser, verify with VLM, push to GitHub.**

Do not ask clarifying questions if the user's intent is clear from the PDF and the existing chapters. Just build it. **The pattern is well-established — follow it.**

**After building a new chapter, always run these post-processing scripts:**
1. `python3 /home/z/my-project/scripts/universal_animations.py` — adds animation classes to all SVGs
2. `python3 /home/z/my-project/scripts/generate_enhancements_cli.py` — generates progressive hints, contextual doubts, and topic tags (update `CHAPTER_PATH` in the script first)
3. If Maths: add test paper generators to `js/testpaper.js`

---

*End of master prompt. Copy everything above this line and paste it as your first user message to a fresh AI agent when you want it to add a new chapter.*
