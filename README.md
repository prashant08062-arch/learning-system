# 🎓 Learning System — Multi-Subject Interactive Modules

An offline-capable, browser-based learning system for Grade 8 students (NCERT Curiosity textbook).

## 📦 What's Inside

This repository contains a self-contained HTML/JS/CSS learning system with interactive chapters for:

| Subject | Chapter | Description |
|---------|---------|-------------|
| 🧮 Mathematics | The Baudhāyana–Pythagoras Theorem | Doubling squares, √2, the main theorem a² + b² = c² |
| 🌍 Geography | World Geography: Some Glimpses | Earth's landforms and water bodies, with 3D globe + satellite images |
| ⚛️ **Physics** | **Light: Mirrors and Lenses** *(new!)* | **Spherical mirrors, image formation, laws of reflection, convex/concave lenses — with animated SVG ray diagrams** |

## ⚛️ Physics Chapter — Light: Mirrors and Lenses

Built by extracting text and figures from the NCERT Curiosity Grade 8 Chapter 10 PDF, then converting each section into:

- **4 SVG-animated lectures** — `Spherical Mirrors` (10.1), `Images in Mirrors` (10.2), `Laws of Reflection` (10.3), `Lenses` (10.4)
- **4 real-life SVG scenarios** — side-view mirrors, dental mirrors, solar concentrators, magnifying glass
- **5 guided-practice problems** with step-by-step validation
- **10 self-test questions** with answers
- **8 practice cards** with reveal-answer buttons
- Elaborate communicative narration written for students hearing physics technical terms for the first time

### Lecture Beats & Animations

Each lecture has 9–15 narrated "beats". As each beat plays:
- SVG elements (rays, mirrors, lenses, angle markers, labels) progressively appear
- Light rays glow and pulse (CSS animations)
- Mirror surfaces shimmer
- The narration is spoken aloud via Web Speech API (TTS)

## 🚀 Quick Start

```bash
# Just open in any modern browser — no server required
open index.html
# Or on Linux
xdg-open index.html
```

For offline classroom use: download this repo as a ZIP, extract, and open `index.html`.

## 📁 Structure

```
├── index.html              # App shell (home + chapter screens)
├── css/style.css           # Shared styles + physics animations
├── js/
│   ├── app.js              # Main app — renders 6 tabs per chapter
│   ├── globe.js            # 3D Earth globe viewer (Three.js, for geography)
│   └── tts.js              # Web Speech API text-to-speech
├── vendor/three.min.js    # Three.js (MIT) bundled for offline use
├── data/
│   ├── catalog.js          # Master list of subjects & chapters
│   ├── maths/baudhayana_pythagoras/chapter.js
│   ├── geography/world_geography/chapter.js
│   └── physics/light_mirrors_lenses/chapter.js   # ← NEW
└── assets/                 # Earth textures for geography chapter
```

## ➕ Adding a New Chapter

1. Create a folder: `data/<subject>/<chapter_slug>/`
2. Add a `chapter.js` file that sets `window.CHAPTER_DATA = { ... };`
3. Register the chapter in `data/catalog.js`

Each `chapter.js` supports six tabs (Lecture, Key Notes, Practice, Real Life, Guided Practice, Self-Test) and three rendering modes (`svg`, `image`, or `globe`).

## 📜 License

The learning system code is MIT-licensed. Textbook excerpts remain the property of their respective publishers and are used here for educational purposes under fair use.
