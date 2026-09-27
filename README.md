# 🎓 Learning System — Multi-Subject Interactive Modules

An offline-capable, browser-based learning system for Grade 8 students (NCERT Curiosity textbook).

## 📦 What's Inside

This repository contains a self-contained HTML/JS/CSS learning system with interactive chapters for:

| Subject | Chapter | Description |
|---------|---------|-------------|
| 🧮 Mathematics | The Baudhāyana–Pythagoras Theorem | Doubling squares, √2, the main theorem a² + b² = c² |
| 🌍 Geography | World Geography: Some Glimpses | Earth's landforms and water bodies, with 3D globe + satellite images |
| ⚛️ **Physics** | **Light: Mirrors and Lenses** *(new!)* | **Spherical mirrors, image formation, laws of reflection, convex/concave lenses — with animated SVG ray diagrams** |
| 🌊 **Water Body Atlas** | **3D Animated Reference** *(new!)* | **15 water-body terms (Sea, Gulf, Bay, Strait, Canal, Trench, Ridge, Reef, Atoll, Isthmus, Peninsula, Cape, Delta, Estuary, Lagoon) — animated 3D scenes with Three.js** |

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

## 🌊 Water Body Atlas — 3D Animated Reference

A standalone interactive page (`water_body_atlas.html`) that visualises 15 water-body terms as animated 3D scenes using Three.js (loaded from CDN). Designed for classroom projection.

**Terms covered** — grouped by category:

| Coastal inlets | Ocean floor | Land–water |
|---|---|---|
| Sea, Gulf, Bay, Strait, Canal | Trench, Ridge, Reef, Atoll | Isthmus, Peninsula, Cape, Delta, Estuary, Lagoon |

**What's animated (not just shown)**:
- **Strait** — two cargo ships threading between two landmasses in opposite directions, smoke rising
- **Canal** — lock gates opening & closing, ship rising/lowering through the chambers
- **Trench** — submersible descending the V-shape, depth markers for sea level / Mt. Everest / 11,000 m
- **Ridge** — magma particles rising from the rift, plates-spreading arrows pulsing
- **Reef** — coral branches swaying, fish circling, sunlight rays through water
- **Atoll** — waves crashing on the outer ring while the inner lagoon stays calm
- **Delta** — flow particles descending the main river then splitting into distributaries
- **Estuary** — freshwater (light blue) and seawater (green) mixing with a tidal cycle
- **Lagoon** — choppy waves outside, gentle ripples inside, barrier island absorbing the sea's energy
- **Cape** — rotating lighthouse beam
- **Peninsula** — wave whitecaps on three sides
- **Isthmus** — two ships sailing the long way around while a canal cut saves the detour

Each term has: 3D scene + on-screen labels + colour legend + info panel (definition, real-world example, "what to watch" activity prompt, and a comparison table).

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
├── index.html              # App shell (home + chapter screens + atlas launcher)
├── water_body_atlas.html   # ← NEW: standalone 3D Water Body Atlas (Three.js)
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
│   └── physics/light_mirrors_lenses/chapter.js   # ← NEW (Physics)
└── assets/                 # Earth textures for geography chapter
```

## ➕ Adding a New Chapter

1. Create a folder: `data/<subject>/<chapter_slug>/`
2. Add a `chapter.js` file that sets `window.CHAPTER_DATA = { ... };`
3. Register the chapter in `data/catalog.js`

Each `chapter.js` supports six tabs (Lecture, Key Notes, Practice, Real Life, Guided Practice, Self-Test) and three rendering modes (`svg`, `image`, or `globe`).

## 📜 License

The learning system code is MIT-licensed. Textbook excerpts remain the property of their respective publishers and are used here for educational purposes under fair use.
