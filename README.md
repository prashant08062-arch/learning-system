# Learning System — Multi-Subject Interactive Modules

A scalable, single-page web application for interactive learning across **8 subjects**: Mathematics, Geography, History, Civics, Economics, Physics, Chemistry, and Biology.

This repository also includes a standalone **3D Water Body Atlas** for geography lessons.

## Quick Start

1. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
2. Click a subject card to expand it and see available chapters.
3. Click a chapter to launch the interactive learning module.
4. Or click the yellow **"🚀 Launch 3D Atlas →"** button below the subject grid to open the Water Body Atlas in a new tab.

No server required — runs entirely from the file system.

## Chapters Currently Available

| Subject | Chapter | Grade | Type |
|---------|---------|-------|------|
| 🧮 Mathematics | The Baudhāyana–Pythagoras Theorem | 8 (sub-lectures 2.1–2.2 also work for Class 7) | SVG |
| 🌍 Geography | World Geography: Some Glimpses | 6–8 | Image |
| ⚛️ **Physics** | **Light, Shadows and Reflections** | **6** (also good revision for Class 7) | SVG |
| 🌊 Water Body Atlas | 3D Animated Reference | 6–8 | Three.js (standalone) |

For a pedagogical review of Maths, Geography, and Physics chapters against the NCERT Class 6–7 syllabus, please see **`CLASS_6_7_SUITABILITY.md`**.

## What's in the Physics Chapter — *Light, Shadows and Reflections*

Built for Class 6 students who are encountering physics technical terms for the first time. Based on NCERT Curiosity Grade 6 Science Chapter 11.

### 4 SVG-animated lectures (29 narrated beats)
1. **11.1 Sources of Light** — Sun, stars, fireflies (natural) vs bulb, torch, candle (artificial); light travels in straight lines (3-cardboard experiment)
2. **11.2 Materials Around Us** — transparent / translucent / opaque with everyday examples
3. **11.3 Shadows** — how shadows form, why size changes with distance, why morning shadows are long and noon shadows are short
4. **11.4 Mirrors and Reflection** — plane mirror, incident/reflected ray, image properties, lateral inversion (with the AMBULANCE example)

### 4 real-life SVG scenarios
- 📷 The Pinhole Camera — how a tiny hole makes an upside-down picture
- 🔭 The Periscope — how submariners see above the water (two 45° mirrors)
- 🎭 Shadow Puppets — telling stories with light and hands
- ☀️ Solar Cookers — cooking food with sunlight and a curved mirror

### Practice material
- 5 guided-practice problems with step-by-step answer validation
- 8 practice cards with reveal-answer buttons
- 11 self-test questions with worked-out answers

### Pedagogical style
- All narration in **simple, conversational English** suitable for an 11–12 year old
- Technical terms are **defined when first introduced** (e.g., "translucent = lets some light through, but blurry")
- Hands-on activities use only household items (spoon, torch, cardboard, hand)
- Concepts build incrementally — no algebra, no trigonometry, no formal "laws" yet

## What's in the 3D Water Body Atlas

A standalone HTML page (`water_body_atlas.html`) that visualises **15 water-body terms** as animated 3D scenes using Three.js (loaded from CDN). Designed for classroom projection.

**Coastal inlets:** Sea, Gulf, Bay, Strait, Canal
**Ocean floor:** Trench, Ridge, Reef, Atoll
**Land–water:** Isthmus, Peninsula, Cape, Delta, Estuary, Lagoon

Each scene animates the activity: ships threading through straits, lock gates opening in canals, submersibles descending trenches, magma rising from ridges, coral swaying with fish, and more.

## System Architecture

```
learning_system/
├── index.html                  # Main entry point (home screen + chapter screen + atlas launcher)
├── water_body_atlas.html       # Standalone 3D Water Body Atlas (Three.js)
├── CLASS_6_7_SUITABILITY.md    # Pedagogical review of all chapters
├── css/
│   └── style.css               # All styles (shared across all chapters + physics light-ray animations)
├── js/
│   ├── tts.js                  # Text-to-Speech engine (shared)
│   ├── globe.js                # 3D Earth globe viewer (for geography chapter)
│   └── app.js                  # Main application logic (shared)
├── vendor/
│   └── three.min.js            # Three.js (MIT) bundled for offline use
└── data/
    ├── catalog.js              # Master list of subjects & chapters (REGISTER HERE)
    ├── maths/baudhayana_pythagoras/chapter.js
    ├── geography/world_geography/chapter.js (+ images/ subfolder)
    ├── physics/light_shadows_reflections/chapter.js    ← Class 6 chapter
    ├── history/, civics/, economics/, chemistry/, biology/   (empty — add here)
```

## How to Add a New Chapter

### Step 1: Create the chapter folder
```
data/<subject>/<chapter_slug>/
```

### Step 2: Create the `chapter.js` file
Inside that folder, create `chapter.js` defining `window.CHAPTER_DATA`. See the physics chapter (`data/physics/light_shadows_reflections/chapter.js`) for a complete working example. The structure is:

```javascript
window.CHAPTER_DATA = {
  meta: {
    subject: 'physics',
    slug: 'light_shadows_reflections',
    title: 'Light, Shadows and Reflections',
    subtitle: 'Chapter 11 · Curiosity — Textbook of Science for Grade 6',
    chapterNumber: 11,
    type: 'svg',        // 'svg', 'image', or 'globe'
    intro: 'Brief description shown on the home screen'
  },
  lectures: [
    {
      id: 'sources',
      label: '11.1 Sources of Light',
      viewBox: '0 0 800 600',
      svg: '<g class="el" data-beat="1">...</g>',
      beats: ["Beat 1 narration...", "Beat 2 narration..."]
    }
  ],
  notes: '<h2>📝 Key Notes</h2><p>...</p>',
  practice: '<h2>✏️ Practice</h2><div class="practice-card">...</div>',
  realLife: [
    { id: 'pinhole', title: '📷 ...', viewBox: '0 0 700 600', svg: '...', beats: [...] }
  ],
  guidedPractice: [
    {
      title: 'Identify the Material',
      difficulty: 'Easy',
      diffClass: 'gp-easy',
      statement: '...',
      steps: [
        { prompt: '...', validate: { type: 'match', answers: ['translucent'] },
          formatHint: '...', explanation: '...', hint: '...' }
      ],
      finalAnswer: '...'
    }
  ],
  selfTest: [
    { q: 'Question?', steps: 'Step-by-step answer', answer: 'Short answer' }
  ]
};
```

### Step 3: Register the chapter in `data/catalog.js`
Add the chapter to the appropriate subject's `chapters` array.

### Done!
Refresh `index.html` — your new chapter will appear under its subject.

## Validation types for Guided Practice

| Type | Description | Example |
|------|-------------|---------|
| `match` | Match against a list of accepted answers | `{ type: 'match', answers: ['india', 'india is larger'] }` |
| `regex` | Match a regular expression | `{ type: 'regex', pattern: '^1526', flags: 'i' }` |
| `pureNum` | Match a pure number | `{ type: 'pureNum', value: 25 }` |
| `numUnit` | Match number + unit | `{ type: 'numUnit', value: 5, unit: 'cm\\|centimeter' }` |
| `formula` | Match a math formula (auto-normalized) | `{ type: 'formula', forms: ['a^2+b^2=c^2', 'c^2=a^2+b^2'] }` |

## Chapter types

- **`svg`** — Use for math, physics, chemistry (diagrammatic). The `svg` field contains SVG markup; elements with `class="el" data-beat="N"` appear at beat N.
- **`image`** — Use for geography, history, biology (photos, maps). The `images` array lists image files; one image is shown per beat (distributed evenly).
- **`globe`** — Use for geography chapters that need a 3D Earth. Each lecture has a `globe-container` div; the GlobeViewer (Three.js) renders it.

## Features

- 🎓 **6 tabs per chapter**: Lecture, Key Notes, Practice, Real Life, Guided Practice, Self-Test
- 🔊 **Text-to-Speech narration** with speed control and voice selection
- 🎬 **Animated lectures** with synchronized SVG elements or images
- ✏️ **Interactive guided practice** with answer validation and hints
- 🌍 **Real-life scenarios** with step-by-step narration
- 🧪 **Self-test** with reveal-answer buttons
- 📱 **Fully responsive** — works on desktop, tablet, and mobile
- 🎯 **Multi-section lectures** — only one sub-lecture visible at a time
- 🌈 **Color-coded subjects** — each subject has its own accent color
- 🌊 **Standalone 3D Water Body Atlas** — 15 animated geography terms

## Adding New Subjects

To add a new subject (e.g., "Computer Science"), just add it to the `subjects` array in `data/catalog.js`:

```javascript
{
  id: 'computer_science',
  name: 'Computer Science',
  icon: '💻',
  color: '#22d3ee',
  chapters: []
}
```

Then create the folder `data/computer_science/` and start adding chapters.

## Browser Compatibility

Tested on:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

Requires JavaScript enabled. Uses Web Speech API for TTS (supported in all modern browsers).
