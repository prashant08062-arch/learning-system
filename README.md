# Learning System — Multi-Subject Interactive Modules

A scalable, single-page web application for interactive learning across **8 subjects**: Mathematics, Geography, History, Civics, Economics, Physics, Chemistry, and Biology.

This repository also includes **two standalone 3D atlases** — one for physics (mirrors & lenses) and one for geography (water bodies).

## Quick Start

1. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).
2. Click a subject card to expand it and see available chapters.
3. Click a chapter to launch the interactive learning module.
4. Or click one of the two yellow **"🚀 Launch 3D Atlas →"** buttons below the subject grid to open a 3D atlas in a new tab.

No server required — runs entirely from the file system.

## Chapters Currently Available

| Subject | Chapter | Grade | Type |
|---------|---------|-------|------|
| 🧮 Mathematics | The Baudhāyana–Pythagoras Theorem | 8 (sub-lectures 2.1–2.2 also work for Class 7) | SVG |
| 🌍 Geography | World Geography: Some Glimpses | 6–8 | Image |
| ⚛️ **Physics** | **Light: Mirrors and Lenses** | **8** (with Class 6–7 scaffolding) | SVG |
| 🌊 3D Water Body Atlas | 15 animated geography terms | 6–8 | Three.js (standalone) |
| 🔬 **3D Mirror & Lens Atlas** | **10 interactive physics scenes** | 6–8 | Three.js (standalone) |

For a pedagogical review of Maths, Geography, and Physics chapters against the NCERT Class 6–7 syllabus, please see **`CLASS_6_7_SUITABILITY.md`**.

## What's in the Physics Chapter — *Light: Mirrors and Lenses* (Grade 8, enhanced for Class 6-7)

Based on NCERT Curiosity Grade 8 Science Chapter 10. The Grade 8 content is **preserved verbatim** — every concept the textbook covers is still there. Around it, we added layered scaffolding so Class 6-7 students can access the same concepts.

### Layered scaffolding for Class 6-7 access

1. **3D Mirror & Lens Atlas** (`mirrors_lenses_3d_atlas.html`) — 10 interactive Three.js scenes:
   - Plane mirror, Concave mirror, Convex mirror
   - Convex lens, Concave lens
   - Laws of reflection (with animated rays)
   - Burning paper with concave mirror (with flames + smoke)
   - Burning paper with convex lens
   - Dentist's mirror (concave, close-up)
   - Side-view mirror (convex, in a car)

   Each scene has:
   - A "👶 In one line (for Class 6-7)" simple summary at the top
   - The formal Grade 8 definition
   - A real-world example
   - A "What to watch in 3D" activity prompt
   - Animated light rays (yellow = incident, orange = reflected)
   - Labels, color legend, on-screen text

2. **Class 6-7 Quick Reference** — A 18-row glossary table at the top of the Notes tab. Every technical term (concave, convex, converge, diverge, focus, incident, normal, lateral inversion, etc.) is explained in ONE LINE with a real-world example.

3. **Additional SVG elements** in each lecture showing intermediate visual states:
   - Lecture 1: Side-by-side spoon analogy (inside = concave, back = convex)
   - Lecture 2: Erect vs Inverted arrow comparison clearly labeled
   - Lecture 3: The special "angle = 0" case (light retraces its path)
   - Lecture 4: Mirror vs Lens comparison (bounce back vs pass through)

4. **Additional beats** with simple analogies:
   - Lecture 1 beat 2: "What is a mirror?" — explains reflection before introducing curved mirrors
   - Lecture 4 beat 2: "Mirror = bounce back vs Lens = pass through" — contrasts the two before going into types

### 4 SVG-animated lectures (50 narrated beats)

1. **10.1 Spherical Mirrors** (10 beats) — spoon activity, concave vs convex, schematic representations, hollow-sphere origin
2. **10.2 Images in Mirrors** (10 beats) — close vs far, real-life uses (torch, dental, side-view, road-safety)
3. **10.3 Laws of Reflection** (14 beats) — incident ray, reflected ray, normal, angle of incidence, angle of reflection, Law 1 (i = r), Law 2 (coplanar), parallel beams, burning paper
4. **10.4 Lenses** (16 beats) — water-drop lens, convex vs concave, viewing through lenses, converging/diverging, eyeglasses/camera/eye

### 4 real-life SVG scenarios
- 🚗 Why Objects in the Mirror Are Closer Than They Appear
- 🦷 How the Dentist Sees Inside Your Mouth
- ☀️ Burning Paper with Sunlight — Solar Concentrators
- 🔍 Why a Magnifying Glass Makes Letters Bigger

### Practice material
- 5 guided-practice problems with step-by-step answer validation
- 8 practice cards with reveal-answer buttons
- 10 self-test questions with worked-out answers

## What's in the 3D Water Body Atlas

A standalone HTML page (`water_body_atlas.html`) that visualises **15 water-body terms** as animated 3D scenes using Three.js (loaded from CDN). Designed for classroom projection.

**Coastal inlets:** Sea, Gulf, Bay, Strait, Canal
**Ocean floor:** Trench, Ridge, Reef, Atoll
**Land–water:** Isthmus, Peninsula, Cape, Delta, Estuary, Lagoon

Each scene animates the activity: ships threading through straits, lock gates opening in canals, submersibles descending trenches, magma rising from ridges, coral swaying with fish, and more.

## System Architecture

```
learning_system/
├── index.html                  # Main entry point (home screen + chapter screen + two atlas launchers)
├── water_body_atlas.html       # Standalone 3D Water Body Atlas (Three.js)
├── mirrors_lenses_3d_atlas.html # Standalone 3D Mirror & Lens Atlas (Three.js) — NEW
├── CLASS_6_7_SUITABILITY.md    # Pedagogical review + enhancement approach
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
    ├── physics/light_mirrors_lenses/chapter.js    ← Grade 8 + Class 6-7 scaffolding
    ├── history/, civics/, economics/, chemistry/, biology/   (empty — add here)
```

## How to Add a New Chapter

### Step 1: Create the chapter folder
```
data/<subject>/<chapter_slug>/
```

### Step 2: Create the `chapter.js` file
Inside that folder, create `chapter.js` defining `window.CHAPTER_DATA`. See the physics chapter (`data/physics/light_mirrors_lenses/chapter.js`) for a complete working example with the layered scaffolding pattern.

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
- 🌊 **3D Water Body Atlas** — 15 animated geography terms
- 🔬 **3D Mirror & Lens Atlas** — 10 interactive physics scenes with simple analogies for Class 6-7

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
