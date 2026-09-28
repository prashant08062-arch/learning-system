# 🎓 Master Prompt — Adding New Chapters to the Learning-System Repository

> **Purpose:** This is a complete, self-contained brief that lets ANY AI agent (with or without prior memory of this sandbox) add a new chapter to the existing `learning-system` GitHub repository. It captures every convention, code pattern, narration style, and testing protocol established across multiple sessions of work.
>
> **Copy-paste this entire document as your first user message to a fresh AI agent when you want it to add a new chapter.**

---

## 🎯 Your Mission

You are adding a new chapter to an existing multi-subject interactive learning system hosted on GitHub. The system is a self-contained, browser-based HTML/JS/CSS app for Grade 6-8 students. Each chapter lives in its own `data/<subject>/<chapter_slug>/chapter.js` file.

The end deliverable is always:
1. A new `chapter.js` file that defines `window.CHAPTER_DATA = { ... }` following the schema below.
2. An updated `data/catalog.js` that registers the new chapter.
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
├── README.md                        # Documents all chapters
├── CLASS_6_7_SUITABILITY.md         # Pedagogical review
├── css/style.css                    # Shared styles + subject-specific animations
├── js/
│   ├── app.js                       # Renders 6 tabs per chapter
│   ├── globe.js                     # Three.js Earth viewer (for geography chapter)
│   └── tts.js                       # Web Speech API text-to-speech
├── vendor/three.min.js              # Three.js r128 (MIT) bundled locally
├── data/
│   ├── catalog.js                   # ← EDIT THIS to register new chapters
│   ├── maths/baudhayana_pythagoras/chapter.js
│   ├── geography/world_geography/chapter.js (+ images/)
│   ├── history/india_independence/chapter.js (+ images/)  ← example for image-type
│   ├── physics/light_mirrors_lenses/chapter.js             ← example for svg-type
│   ├── civics/, economics/, chemistry/, biology/           ← empty, ready for chapters
├── water_body_atlas.html            # Standalone 3D atlas (Three.js, geography)
└── mirrors_lenses_3d_atlas.html     # Standalone 3D atlas (Three.js, physics)
```

**Subjects defined in `catalog.js`:** maths, geography, history, civics, economics, physics, chemistry, biology — each with an icon and a colour. To add a brand-new subject, edit the `subjects` array in `data/catalog.js`.

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
| Math, physics, chemistry (diagrammatic) | `"svg"` | `viewBox` + `svg` (with `class="el" data-beat="N"` elements) | `viewBox` + `svg` |
| History, biology (photos, paintings) | `"image"` | `images: [...]` array | `images: [...]` array |
| Geography with 3D Earth | `"globe"` | `beatLocations: [...]` (keys into `meta.locations`) + optional `beatImages` | `images: [...]` array |

**IMPORTANT**: For image-type chapters, real-life scenarios MUST also use `images: [...]` arrays — NOT `svg`. The app.js determines this based on `meta.type === 'image' || 'globe'` for both lectures and real-life scenarios.

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

If the user asks for an interactive 3D atlas alongside the chapter (similar to the existing `water_body_atlas.html` and `mirrors_lenses_3d_atlas.html`), build a self-contained HTML file using Three.js r128 from CDN:

- **Layout:** Sidebar (term buttons) + 3D viewport (canvas) + Info panel (definition, example, "what to watch in 3D")
- **Three.js r128 gotchas:**
  - No `THREE.Geometry` — use `THREE.BufferGeometry().setFromPoints([...])`
  - No `THREE.CapsuleGeometry` — provide a shim or use scaled spheres
  - `MeshStandardMaterial` instead of `MeshPhysicalMaterial` (no `transmission`/`thickness`)
  - `LineDashedMaterial` requires `line.computeLineDistances()` on the Line object, not the geometry
- **Each term has a `SCENE_BUILDERS[termKey] = function(root) {...}` that builds a `THREE.Group`**
- **Each term has a `TERMS[termKey]` object with:** name, pronounce, definition, example, activity prompt, "In one line (for Class 6-7)" simple summary, labels array
- **Each term has a `LEGENDS[termKey]` object** with color swatches
- **Animation loop** uses `requestAnimationFrame`, applies smooth camera rotation, and calls `currentSceneRoot.userData.updater(dt, t)` for scene-specific animations
- **Orbit controls** implemented manually: mousedown (rotate), wheel (zoom), right-drag (pan), touch support
- **Error handling:** wrap `initEngine()` in try/catch; wrap each `builder(currentSceneRoot)` call in try/catch so one bad scene doesn't break the others

Add a launcher button on the home screen (`index.html`) below the existing subject grid:
```html
<div style="margin: 0 auto 16px; max-width: 760px; padding: 18px 22px; background: linear-gradient(135deg, #...); border-radius: 14px; ...">
  <a href="<atlas_filename>.html" target="_blank" style="background: #fbbf24; color: #0a1326; ...">🚀 Launch 3D Atlas →</a>
</div>
```

---

## 📋 Quality Checklist (run before declaring done)

- [ ] JSON in chapter.js parses successfully (`JSON.parse` in Node)
- [ ] All 4 (or more) lectures have correct number of beats vs SVG elements / images
- [ ] Notes HTML contains "Before We Begin" vocabulary section at the top
- [ ] Notes HTML contains "Key Notes" with timeline, key leaders table, etc.
- [ ] Practice tab has reveal-answer buttons (count matches what was promised)
- [ ] Real-life scenarios render and advance through beats
- [ ] Guided practice problems accept the expected answers (test with sample inputs)
- [ ] Self-test questions and answers present
- [ ] Chapter registered in `data/catalog.js` with correct `subject` id, `slug`, `dataFile` path, `hasImages` flag, `estimatedTime`
- [ ] Browser opens `index.html`, chapter appears under its subject, all 6 tabs load without errors
- [ ] For SVG chapters: beats advance and reveal SVG elements progressively
- [ ] For image chapters: images transition correctly as beats advance
- [ ] VLM (vision model) verifies the screenshots look correct
- [ ] README.md updated to mention the new chapter in the chapters table
- [ ] **Notes tab shows the "📝 Key Things to Remember" toolbar at the top, with a working "Print / Export to PDF" button** (added automatically by `renderNotes()` in `js/app.js` — no per-chapter work needed)
- [ ] **Clicking the Print button opens a print-friendly window** with the chapter title in a colored header bar and the full notes content
- [ ] Commit message follows the established format (`feat(<subject>): add <title>`)
- [ ] Push to GitHub successful; latest commit visible via API

---

## 🎯 Worked Example — the existing chapters in the repo

For reference, the repo contains 4 fully-built chapters you should study before building your own:

| Chapter | Subject | Type | What to study |
|---|---|---|---|
| The Baudhāyana-Pythagoras Theorem | maths | svg | How to author SVG with `class="el" data-beat"` for progressive reveal |
| World Geography: Some Glimpses | geography | globe + image | How to use 3D globe + image-based real-life scenarios |
| **India's Long Road to Independence** | **history** | **image** | **The "Before We Begin" pattern, story-form narration, supplementary hierarchy + Viceroy timeline sections** |
| Light: Mirrors and Lenses | physics | svg | The "Class 6-7 Quick Reference" pattern, plus a companion standalone 3D atlas |

When in doubt about a convention, look at how the existing `data/history/india_independence/chapter.js` does it — it's the most comprehensive example (12 lectures, 140 beats, "Before We Begin" + "British Administration" + Key Notes + 4 real-life scenarios + 7 guided practice + 15 self-test + 12 practice cards + 25 images).

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
7. **Test in the browser, verify with VLM, push to GitHub.**

Do not ask clarifying questions if the user's intent is clear from the PDF and the existing chapters. Just build it. **The pattern is well-established — follow it.**

---

*End of master prompt. Copy everything above this line and paste it as your first user message to a fresh AI agent when you want it to add a new chapter.*
