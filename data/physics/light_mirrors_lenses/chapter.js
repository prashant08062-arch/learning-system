/* ============================================================
   Light: Mirrors and Lenses — Class 8 Physics Chapter 10
   Rebuilt per master choreography document (2026-10-09).
   - Every narration beat has exactly one SVG group
   - Consolidated <defs> at top of each SVG
   - Photons have <animateMotion>
   - Pulse class implemented in css/style.css
   ============================================================ */
window.CHAPTER_DATA = {
  "meta": {
    "slug": "light_mirrors_lenses",
    "title": "Light: Mirrors and Lenses",
    "subtitle": "Chapter 10 · Grade 8 (with Class 6–7 scaffolding)",
    "subject": "physics",
    "type": "svg",
    "grade": [
      6,
      7,
      8
    ],
    "estimatedTime": "60 min"
  },
  "lectures": [
    {
      "id": "mirrors",
      "label": "10.1 Spherical Mirrors",
      "viewBox": "0 0 1600 900",
      "svg": "<defs>\n  <filter id=\"chalk\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"chalkLine\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"0.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n    <feGaussianBlur stdDeviation=\"4\" result=\"blur\"/>\n    <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <marker id=\"arrowChalk\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#f5f5f0\"/>\n  </marker>\n  <marker id=\"arrowCyan\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#7fdbff\"/>\n  </marker>\n  <marker id=\"arrowPink\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#ff8fab\"/>\n  </marker>\n  <marker id=\"arrowYellow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#fbbf24\"/>\n  </marker>\n</defs>\n<rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n\n<!-- Beat 1: Title -->\n<!-- Beat 1 text is visible by default (opacity:1) to ensure it shows even if\n     the chalkboard timeline doesn't fire on slower browsers or older devices.\n     The timeline will still fire and animate via the transition, but if it\n     doesn't, the user still sees the title instead of a blank screen. -->\n<g class=\"el\" data-beat=\"1\">\n  <text id=\"l1b1-title\" x=\"800\" y=\"120\" text-anchor=\"middle\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"56\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:1\">Spherical Mirrors</text>\n  <text id=\"l1b1-sub\" x=\"800\" y=\"180\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"28\" filter=\"url(#chalk)\" style=\"opacity:1\">Chapter 10 · Light: Mirrors and Lenses</text>\n</g>\n\n<!-- Beat 2: Flat mirror + reflection demo (THE SHOWPIECE) -->\n<g class=\"el\" data-beat=\"2\">\n  <!-- Chalkboard background -->\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <!-- Chalk dust particles (always visible) -->\n  <circle cx=\"300\" cy=\"150\" r=\"2\" fill=\"#f5f5f0\" opacity=\"0.3\"/>\n  <circle cx=\"500\" cy=\"100\" r=\"1.5\" fill=\"#f5f5f0\" opacity=\"0.2\"/>\n  <circle cx=\"900\" cy=\"120\" r=\"2\" fill=\"#f5f5f0\" opacity=\"0.25\"/>\n  <circle cx=\"1200\" cy=\"90\" r=\"1.5\" fill=\"#f5f5f0\" opacity=\"0.2\"/>\n  <circle cx=\"1400\" cy=\"160\" r=\"2\" fill=\"#f5f5f0\" opacity=\"0.3\"/>\n\n  <text id=\"cb-title\" x=\"800\" y=\"80\" text-anchor=\"middle\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"48\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.8s ease\">Mirrors: Flat vs Curved</text>\n\n  <rect id=\"cb-mirror-glass\" x=\"680\" y=\"380\" width=\"80\" height=\"240\" fill=\"rgba(180,220,255,0.10)\" stroke=\"#f5f5f0\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 2s ease\"/>\n  <rect id=\"cb-mirror-silver\" x=\"740\" y=\"380\" width=\"12\" height=\"240\" fill=\"#c0c0c0\" opacity=\"0\" filter=\"url(#chalkLine)\" style=\"transition:opacity 0.6s ease\"/>\n\n  <text id=\"cb-label-glass\" x=\"670\" y=\"510\" text-anchor=\"end\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"24\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">glass</text>\n  <text id=\"cb-label-silver\" x=\"760\" y=\"510\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"24\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">silver / aluminium</text>\n  <text id=\"cb-label-plane\" x=\"720\" y=\"660\" text-anchor=\"middle\" fill=\"#7dd3fc\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">PLANE MIRROR</text>\n\n  <line id=\"cb-ray-incident\" x1=\"420\" y1=\"280\" x2=\"680\" y2=\"480\" stroke=\"#7fdbff\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:400;stroke-dashoffset:400;transition:stroke-dashoffset 1.5s ease\"/>\n\n  <line id=\"cb-normal\" x1=\"500\" y1=\"480\" x2=\"680\" y2=\"480\" stroke=\"#f4d35e\" stroke-width=\"2\" stroke-dasharray=\"8 8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n\n  <line id=\"cb-ray-reflected\" x1=\"680\" y1=\"480\" x2=\"420\" y2=\"680\" stroke=\"#fb923c\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:400;stroke-dashoffset:400;transition:stroke-dashoffset 1.5s ease\"/>\n\n  <text id=\"cb-label-incident\" x=\"450\" y=\"360\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">incident ray</text>\n  <text id=\"cb-label-reflected\" x=\"450\" y=\"620\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">reflected ray</text>\n  <text id=\"cb-label-normal\" x=\"530\" y=\"470\" fill=\"#f4d35e\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">normal</text>\n\n  <text id=\"cb-bounces\" x=\"500\" y=\"750\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"32\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">BOUNCES BACK!</text>\n\n  <path id=\"cb-concave\" d=\"M 1100 350 Q 1000 500 1100 650\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:400;stroke-dashoffset:400;transition:stroke-dashoffset 1.5s ease\"/>\n  <text id=\"cb-label-concave\" x=\"1050\" y=\"520\" text-anchor=\"end\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">concave</text>\n  <text id=\"cb-label-concave2\" x=\"1050\" y=\"548\" text-anchor=\"end\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">curves inward</text>\n\n  <path id=\"cb-convex\" d=\"M 1250 350 Q 1350 500 1250 650\" fill=\"none\" stroke=\"#ff8fab\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:400;stroke-dashoffset:400;transition:stroke-dashoffset 1.5s ease\"/>\n  <text id=\"cb-label-convex\" x=\"1300\" y=\"520\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">convex</text>\n  <text id=\"cb-label-convex2\" x=\"1300\" y=\"548\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">bulges outward</text>\n\n  <text id=\"cb-summary-flat\" x=\"400\" y=\"800\" text-anchor=\"middle\" fill=\"#7dd3fc\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">flat = same size</text>\n  <text id=\"cb-summary-concave\" x=\"800\" y=\"800\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">concave = converging</text>\n  <text id=\"cb-summary-convex\" x=\"1200\" y=\"800\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">convex = diverging</text>\n\n  <!-- Photons (with animateMotion per choreography doc Fix #4) -->\n  <circle id=\"cb-photon-glow\" r=\"8\" fill=\"#7fdbff\" filter=\"url(#glow)\" style=\"opacity:0\">\n    <animateMotion dur=\"3s\" repeatCount=\"indefinite\" begin=\"indefinite\" path=\"M 420 280 L 680 480 L 420 680\"/>\n  </circle>\n  <circle id=\"cb-photon-core\" r=\"4\" fill=\"#ffffff\" filter=\"url(#glow)\" style=\"opacity:0\">\n    <animateMotion dur=\"3s\" repeatCount=\"indefinite\" begin=\"indefinite\" path=\"M 420 280 L 680 480 L 420 680\"/>\n  </circle>\n</g>\n\n<!-- Beat 3: Concave mirror (curves inward) -->\n<g class=\"el\" data-beat=\"3\">\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <path id=\"l1b3-mirror\" d=\"M 500 150 Q 420 300 500 450\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l1b3-label\" x=\"380\" y=\"300\" text-anchor=\"end\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONCAVE</text>\n  <text id=\"l1b3-desc\" x=\"380\" y=\"330\" text-anchor=\"end\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">curves inward</text>\n  <path id=\"l1b3-arrow\" d=\"M 460 300 L 430 300\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"2\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n</g>\n\n<!-- Beat 4: Convex mirror (bulges outward) -->\n<g class=\"el\" data-beat=\"4\">\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <path id=\"l1b4-mirror\" d=\"M 500 150 Q 580 300 500 450\" fill=\"none\" stroke=\"#ff8fab\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l1b4-label\" x=\"620\" y=\"300\" text-anchor=\"start\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONVEX</text>\n  <text id=\"l1b4-desc\" x=\"620\" y=\"330\" text-anchor=\"start\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">bulges outward</text>\n  <path id=\"l1b4-arrow\" d=\"M 540 300 L 570 300\" fill=\"none\" stroke=\"#ff8fab\" stroke-width=\"2\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowPink)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n</g>\n\n<!-- Beat 5: Spoon (concave side) -->\n<g class=\"el\" data-beat=\"5\">\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <ellipse id=\"l1b5-spoon\" cx=\"300\" cy=\"300\" rx=\"60\" ry=\"100\" fill=\"rgba(192,192,192,0.15)\" stroke=\"#cbd5e1\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b5-face\" x=\"300\" y=\"450\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Face upside-down</text>\n  <text id=\"l1b5-type\" x=\"300\" y=\"480\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" font-weight=\"600\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONCAVE (inside)</text>\n</g>\n\n<!-- Beat 6: Spoon (convex side) -->\n<g class=\"el\" data-beat=\"6\">\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <ellipse id=\"l1b6-spoon\" cx=\"300\" cy=\"300\" rx=\"60\" ry=\"100\" fill=\"rgba(192,192,192,0.15)\" stroke=\"#cbd5e1\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b6-face\" x=\"300\" y=\"450\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Tiny face, right-side up</text>\n  <text id=\"l1b6-type\" x=\"300\" y=\"480\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" font-weight=\"600\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONVEX (back)</text>\n</g>\n\n<!-- Beat 7: Three mirror types schematic -->\n<g class=\"el\" data-beat=\"7\">\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <rect id=\"l1b7-box0\" x=\"70\" y=\"200\" width=\"160\" height=\"120\" fill=\"rgba(125,211,252,0.10)\" stroke=\"#7dd3fc\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l1b7-lbl0\" x=\"150\" y=\"250\" text-anchor=\"middle\" fill=\"#7dd3fc\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">PLANE</text>\n  <text id=\"l1b7-desc0\" x=\"150\" y=\"285\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">flat surface</text>\n  <rect id=\"l1b7-box1\" x=\"320\" y=\"200\" width=\"160\" height=\"120\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l1b7-lbl1\" x=\"400\" y=\"250\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONCAVE</text>\n  <text id=\"l1b7-desc1\" x=\"400\" y=\"285\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">curves in</text>\n  <rect id=\"l1b7-box2\" x=\"570\" y=\"200\" width=\"160\" height=\"120\" fill=\"rgba(255,143,171,0.10)\" stroke=\"#ff8fab\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l1b7-lbl2\" x=\"650\" y=\"250\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONVEX</text>\n  <text id=\"l1b7-desc2\" x=\"650\" y=\"285\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">bulges out</text>\n</g>\n\n<!-- Beat 8: Hollow sphere origin -->\n<g class=\"el\" data-beat=\"8\">\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <rect id=\"l1b8-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l1b8-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Slice of hollow sphere</text>\n  <!-- Sphere drawing (choreography Fix: add visual, not just text) -->\n  <circle id=\"l1b8-sphere\" cx=\"400\" cy=\"450\" r=\"80\" fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <path id=\"l1b8-arc\" d=\"M 350 425 Q 400 405 450 425\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l1b8-chord\" x1=\"350\" y1=\"425\" x2=\"450\" y2=\"425\" stroke=\"#94a3b8\" stroke-width=\"1\" stroke-dasharray=\"4 4\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b8-arc-label\" x=\"400\" y=\"395\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">← mirror slice</text>\n</g>\n\n<!-- Beat 9: Schematic representation -->\n<g class=\"el\" data-beat=\"9\">\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <rect id=\"l1b9-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l1b9-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Schematic representation</text>\n  <!-- Three schematic mirror drawings -->\n  <line id=\"l1b9-plane\" x1=\"150\" y1=\"430\" x2=\"250\" y2=\"430\" stroke=\"#7dd3fc\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b9-plane-label\" x=\"200\" y=\"470\" text-anchor=\"middle\" fill=\"#7dd3fc\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">plane</text>\n  <path id=\"l1b9-concave\" d=\"M 360 380 Q 340 430 360 480\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l1b9-concave-back\" x1=\"362\" y1=\"380\" x2=\"372\" y2=\"480\" stroke=\"#94a3b8\" stroke-width=\"2\" stroke-dasharray=\"3 3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b9-concave-label\" x=\"400\" y=\"500\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">concave</text>\n  <path id=\"l1b9-convex\" d=\"M 560 380 Q 580 430 560 480\" fill=\"none\" stroke=\"#ff8fab\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l1b9-convex-back\" x1=\"558\" y1=\"380\" x2=\"548\" y2=\"480\" stroke=\"#94a3b8\" stroke-width=\"2\" stroke-dasharray=\"3 3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b9-convex-label\" x=\"600\" y=\"500\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">convex</text>\n</g>\n\n<!-- Beat 10: Manufacturing + closing teaser (NEW per choreography) -->\n<g class=\"el\" data-beat=\"10\">\n  <rect width=\"1600\" height=\"900\" fill=\"#1f2a24\"/>\n  <rect id=\"l1b10-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l1b10-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Made by grinding, not slicing</text>\n  <!-- 4 manufacturing icons in a row -->\n  <rect id=\"l1b10-icon1\" x=\"100\" y=\"380\" width=\"120\" height=\"80\" fill=\"rgba(125,211,252,0.10)\" stroke=\"#7dd3fc\" stroke-width=\"2\" rx=\"8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b10-icon1-lbl\" x=\"160\" y=\"430\" text-anchor=\"middle\" fill=\"#7dd3fc\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">flat glass</text>\n  <rect id=\"l1b10-icon2\" x=\"240\" y=\"380\" width=\"120\" height=\"80\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" rx=\"8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b10-icon2-lbl\" x=\"300\" y=\"430\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">grind curve</text>\n  <rect id=\"l1b10-icon3\" x=\"380\" y=\"380\" width=\"120\" height=\"80\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"2\" rx=\"8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b10-icon3-lbl\" x=\"440\" y=\"430\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">polish</text>\n  <rect id=\"l1b10-icon4\" x=\"520\" y=\"380\" width=\"120\" height=\"80\" fill=\"rgba(192,192,192,0.10)\" stroke=\"#c0c0c0\" stroke-width=\"2\" rx=\"8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l1b10-icon4-lbl\" x=\"580\" y=\"430\" text-anchor=\"middle\" fill=\"#c0c0c0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">silver coat</text>\n  <text id=\"l1b10-question\" x=\"400\" y=\"540\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"28\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">? What images do they form ?</text>\n</g>\n",
      "beats": [
        "Namaste and welcome, my young scientists, to Chapter 10 of your science book — Light: Mirrors and Lenses. Today we begin a journey into how light bounces and bends, and we will start with mirrors — but not the ordinary mirror in your bathroom! We are going to meet some very special curved mirrors.",
        "Before we start, let me remind you what a mirror is. A mirror is a smooth, shiny surface — usually a piece of glass with a thin coating of metal (like silver or aluminium) on the back. When light hits the smooth surface, it BOUNCES BACK — we call this reflection. That is why you can see yourself in a mirror: light from your face bounces off the mirror and comes back to your eyes. Today, we will look at CURVED mirrors, which behave very differently from the flat mirror in your bathroom.",
        "Meet Meena. During her summer holidays, she visited a science centre with her family. In one corner she noticed a row of unusual, curved mirrors. When she stepped closer and looked into one, her face appeared unusually large. In another mirror, she saw herself upside down! And in yet another, she looked tiny — like a small doll. Meena was puzzled. What was going on?",
        "Let us do an activity right now. Pick up a shiny metallic spoon — every kitchen has one. Hold its curved part — the bowl — close to your face. Look at the inside of the spoon — the part that holds the curry. What do you see? Your face appears upside down! This inward-curving surface — like the inside of a spoon — is called a CONCAVE mirror. The word concave comes from cave — it caves inward.",
        "Now flip the spoon. Look at the back — the part that bulges outward. What do you see now? Your face appears smaller and is right-side up — but tiny! This outward-bulging surface is called a CONVEX mirror. Remember: plane is flat, concave caves inward, convex puffs outward.",
        "So we now have three kinds of mirrors in our toolkit: a PLANE mirror (flat, like a bathroom mirror), a CONCAVE mirror (curves inward, like the inside of a spoon), and a CONVEX mirror (bulges outward, like the back of a spoon). Plane gives same-size images; concave and convex give surprising images — we will explore them in the next lecture.",
        "Now, here is a question: why do curved mirrors behave so differently from flat ones? The answer lies in their shape. A spherical mirror is shaped like a piece cut from a hollow glass sphere — that is why it is called spherical. Concave mirrors curve inward like the inside of that sphere; convex mirrors bulge outward like the outside of that sphere.",
        "When we draw mirrors in our notebook, we use a simple SCHEMATIC REPRESENTATION. A plane mirror is just a straight line. A concave mirror is drawn as a curve bending inward — with a shaded back. A convex mirror is drawn as a curve bulging outward — also with a shaded back. The shaded part is the silver coating; the open side is where light reflects.",
        "Now, a STEP FURTHER. You may wonder — are spherical mirrors made by actually slicing a glass sphere? The answer is no! Spherical mirrors are made by grinding and polishing a flat piece of glass into the desired curve, then coating the back with silver or aluminium. Modern mirrors use vacuum deposition to apply a thin, even layer of metal.",
        "Let me end with a teaser for our next lecture. We now know the shapes of these mirrors. But what kind of IMAGES do they form? Why does a concave mirror sometimes enlarge and sometimes invert? Why does a convex mirror always make things look smaller? Stay tuned for the next lecture — we will discover the answers together!"
      ],
      "timelines": [
        {
          "beat": 1,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l1b1-title"
              ]
            },
            {
              "delay": 500,
              "show": [
                "l1b1-sub"
              ]
            }
          ]
        },
        {
          "beat": 2,
          "steps": [
            {
              "delay": 0,
              "show": [
                "cb-title"
              ]
            },
            {
              "delay": 4000,
              "draw": [
                "cb-mirror-glass"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "cb-mirror-silver"
              ]
            },
            {
              "delay": 7000,
              "show": [
                "cb-label-glass",
                "cb-label-silver",
                "cb-label-plane"
              ]
            },
            {
              "delay": 13000,
              "draw": [
                "cb-ray-incident"
              ]
            },
            {
              "delay": 14000,
              "photon": [
                "cb-photon-glow",
                "cb-photon-core"
              ]
            },
            {
              "delay": 15000,
              "show": [
                "cb-normal"
              ]
            },
            {
              "delay": 16000,
              "draw": [
                "cb-ray-reflected"
              ]
            },
            {
              "delay": 17000,
              "show": [
                "cb-bounces"
              ],
              "pulse": [
                "cb-bounces"
              ]
            },
            {
              "delay": 19000,
              "show": [
                "cb-label-incident",
                "cb-label-reflected",
                "cb-label-normal"
              ]
            },
            {
              "delay": 27000,
              "draw": [
                "cb-concave"
              ]
            },
            {
              "delay": 28000,
              "show": [
                "cb-label-concave",
                "cb-label-concave2"
              ]
            },
            {
              "delay": 29000,
              "draw": [
                "cb-convex"
              ]
            },
            {
              "delay": 30000,
              "show": [
                "cb-label-convex",
                "cb-label-convex2"
              ]
            },
            {
              "delay": 31000,
              "show": [
                "cb-summary-flat",
                "cb-summary-concave",
                "cb-summary-convex"
              ]
            }
          ]
        },
        {
          "beat": 3,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l1b3-mirror"
              ]
            },
            {
              "delay": 6571,
              "show": [
                "l1b3-label"
              ]
            },
            {
              "delay": 13142,
              "show": [
                "l1b3-desc"
              ]
            },
            {
              "delay": 19714,
              "draw": [
                "l1b3-arrow"
              ]
            }
          ]
        },
        {
          "beat": 4,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l1b4-mirror"
              ]
            },
            {
              "delay": 7642,
              "show": [
                "l1b4-label"
              ]
            },
            {
              "delay": 15285,
              "show": [
                "l1b4-desc"
              ]
            },
            {
              "delay": 22928,
              "draw": [
                "l1b4-arrow"
              ]
            }
          ]
        },
        {
          "beat": 5,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l1b5-spoon"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l1b5-face"
              ]
            },
            {
              "delay": 16000,
              "show": [
                "l1b5-type"
              ]
            }
          ]
        },
        {
          "beat": 6,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l1b6-spoon"
              ]
            },
            {
              "delay": 7023,
              "show": [
                "l1b6-face"
              ]
            },
            {
              "delay": 14047,
              "show": [
                "l1b6-type"
              ]
            }
          ]
        },
        {
          "beat": 7,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l1b7-box0"
              ]
            },
            {
              "delay": 2341,
              "show": [
                "l1b7-lbl0"
              ]
            },
            {
              "delay": 4682,
              "show": [
                "l1b7-desc0"
              ]
            },
            {
              "delay": 7023,
              "draw": [
                "l1b7-box1"
              ]
            },
            {
              "delay": 9365,
              "show": [
                "l1b7-lbl1"
              ]
            },
            {
              "delay": 11706,
              "show": [
                "l1b7-desc1"
              ]
            },
            {
              "delay": 14047,
              "draw": [
                "l1b7-box2"
              ]
            },
            {
              "delay": 16388,
              "show": [
                "l1b7-lbl2"
              ]
            },
            {
              "delay": 18730,
              "show": [
                "l1b7-desc2"
              ]
            }
          ]
        },
        {
          "beat": 8,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l1b8-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l1b8-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l1b8-sphere"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l1b8-arc",
                "l1b8-chord"
              ]
            },
            {
              "delay": 14000,
              "show": [
                "l1b8-arc-label"
              ]
            }
          ]
        },
        {
          "beat": 9,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l1b9-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l1b9-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l1b9-plane"
              ]
            },
            {
              "delay": 11000,
              "show": [
                "l1b9-plane-label"
              ]
            },
            {
              "delay": 13000,
              "show": [
                "l1b9-concave",
                "l1b9-concave-back"
              ]
            },
            {
              "delay": 14000,
              "show": [
                "l1b9-concave-label"
              ]
            },
            {
              "delay": 16000,
              "show": [
                "l1b9-convex",
                "l1b9-convex-back"
              ]
            },
            {
              "delay": 17000,
              "show": [
                "l1b9-convex-label"
              ]
            }
          ]
        },
        {
          "beat": 10,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l1b10-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l1b10-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l1b10-icon1"
              ]
            },
            {
              "delay": 11000,
              "show": [
                "l1b10-icon1-lbl"
              ]
            },
            {
              "delay": 13000,
              "show": [
                "l1b10-icon2"
              ]
            },
            {
              "delay": 14000,
              "show": [
                "l1b10-icon2-lbl"
              ]
            },
            {
              "delay": 16000,
              "show": [
                "l1b10-icon3"
              ]
            },
            {
              "delay": 17000,
              "show": [
                "l1b10-icon3-lbl"
              ]
            },
            {
              "delay": 19000,
              "show": [
                "l1b10-icon4"
              ]
            },
            {
              "delay": 20000,
              "show": [
                "l1b10-icon4-lbl"
              ]
            },
            {
              "delay": 25000,
              "show": [
                "l1b10-question"
              ],
              "pulse": [
                "l1b10-question"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "images",
      "label": "10.2 Images in Mirrors",
      "viewBox": "0 0 800 600",
      "svg": "<defs>\n  <filter id=\"chalk\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"chalkLine\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"0.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n    <feGaussianBlur stdDeviation=\"4\" result=\"blur\"/>\n    <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <marker id=\"arrowChalk\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#f5f5f0\"/>\n  </marker>\n  <marker id=\"arrowCyan\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#7fdbff\"/>\n  </marker>\n  <marker id=\"arrowPink\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#ff8fab\"/>\n  </marker>\n  <marker id=\"arrowYellow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#fbbf24\"/>\n  </marker>\n</defs>\n<rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n\n<!-- Beat 1: Title -->\n<g class=\"el\" data-beat=\"1\">\n  <text id=\"l2b1-title\" x=\"400\" y=\"80\" text-anchor=\"middle\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"32\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Images in Mirrors</text>\n  <text id=\"l2b1-sub\" x=\"400\" y=\"120\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">What kind of images do mirrors form?</text>\n</g>\n\n<!-- Beat 2: Setup + Erect/Inverted arrows -->\n<g class=\"el\" data-beat=\"2\">\n  <rect id=\"l2b2-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b2-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Setup: Mirror + Object</text>\n  <!-- Erect/Inverted arrow group (FIX: now properly placed below the box) -->\n  <g id=\"l2b2-arrows-group\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <!-- Object arrow (yellow, pointing up) -->\n    <line x1=\"180\" y1=\"450\" x2=\"180\" y2=\"380\" stroke=\"#fbbf24\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"180\" y=\"470\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" filter=\"url(#chalk)\">object</text>\n    <!-- Erect arrow (green, pointing up) -->\n    <line x1=\"350\" y1=\"450\" x2=\"350\" y2=\"370\" stroke=\"#34d399\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"350\" y=\"470\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" font-weight=\"700\" filter=\"url(#chalk)\">ERECT</text>\n    <text x=\"350\" y=\"490\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">right-side up</text>\n    <!-- Inverted arrow (red, pointing down) -->\n    <line x1=\"550\" y1=\"380\" x2=\"550\" y2=\"450\" stroke=\"#f87171\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowPink)\"/>\n    <text x=\"550\" y=\"470\" text-anchor=\"middle\" fill=\"#f87171\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" font-weight=\"700\" filter=\"url(#chalk)\">INVERTED</text>\n    <text x=\"550\" y=\"490\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">upside down</text>\n  </g>\n</g>\n\n<!-- Beat 3: Concave close - Enlarged -->\n<g class=\"el\" data-beat=\"3\">\n  <rect id=\"l2b3-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b3-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Concave (close): Enlarged</text>\n  <g id=\"l2b3-visual\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <!-- Concave mirror curve -->\n    <path d=\"M 300 380 Q 270 460 300 540\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\"/>\n    <text x=\"290\" y=\"460\" text-anchor=\"end\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">concave</text>\n    <!-- Small object arrow -->\n    <line x1=\"500\" y1=\"540\" x2=\"500\" y2=\"510\" stroke=\"#fbbf24\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"500\" y=\"560\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">object</text>\n    <!-- Large erect image arrow -->\n    <line x1=\"600\" y1=\"540\" x2=\"600\" y2=\"440\" stroke=\"#34d399\" stroke-width=\"5\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"600\" y=\"560\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" font-weight=\"700\" filter=\"url(#chalk)\">ENLARGED</text>\n  </g>\n</g>\n\n<!-- Beat 4: Concave far - Inverted -->\n<g class=\"el\" data-beat=\"4\">\n  <rect id=\"l2b4-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b4-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Concave (far): Inverted</text>\n  <g id=\"l2b4-visual\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <path d=\"M 300 380 Q 270 460 300 540\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\"/>\n    <text x=\"290\" y=\"460\" text-anchor=\"end\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">concave</text>\n    <line x1=\"500\" y1=\"540\" x2=\"500\" y2=\"510\" stroke=\"#fbbf24\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"500\" y=\"560\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">object</text>\n    <!-- Inverted image arrow (pointing DOWN) -->\n    <line x1=\"600\" y1=\"440\" x2=\"600\" y2=\"540\" stroke=\"#f87171\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowPink)\"/>\n    <text x=\"600\" y=\"560\" text-anchor=\"middle\" fill=\"#f87171\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" font-weight=\"700\" filter=\"url(#chalk)\">INVERTED</text>\n  </g>\n</g>\n\n<!-- Beat 5: Convex always diminished -->\n<g class=\"el\" data-beat=\"5\">\n  <rect id=\"l2b5-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b5-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Convex: Always diminished</text>\n  <g id=\"l2b5-visual\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <path d=\"M 300 380 Q 330 460 300 540\" fill=\"none\" stroke=\"#ff8fab\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\"/>\n    <text x=\"320\" y=\"460\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">convex</text>\n    <line x1=\"500\" y1=\"540\" x2=\"500\" y2=\"510\" stroke=\"#fbbf24\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"500\" y=\"560\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">object</text>\n    <!-- Tiny erect image arrow -->\n    <line x1=\"600\" y1=\"540\" x2=\"600\" y2=\"525\" stroke=\"#34d399\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"600\" y=\"560\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" font-weight=\"700\" filter=\"url(#chalk)\">DIMINISHED</text>\n  </g>\n</g>\n\n<!-- Beat 6: Comparison with plane (3-column table) -->\n<g class=\"el\" data-beat=\"6\">\n  <rect id=\"l2b6-box0\" x=\"70\" y=\"200\" width=\"160\" height=\"120\" fill=\"rgba(125,211,252,0.10)\" stroke=\"#7dd3fc\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b6-lbl0\" x=\"150\" y=\"250\" text-anchor=\"middle\" fill=\"#7dd3fc\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">PLANE</text>\n  <text id=\"l2b6-desc0\" x=\"150\" y=\"285\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">same size</text>\n  <rect id=\"l2b6-box1\" x=\"320\" y=\"200\" width=\"160\" height=\"120\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b6-lbl1\" x=\"400\" y=\"250\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONCAVE</text>\n  <text id=\"l2b6-desc1\" x=\"400\" y=\"285\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">enlarged or inverted</text>\n  <rect id=\"l2b6-box2\" x=\"570\" y=\"200\" width=\"160\" height=\"120\" fill=\"rgba(255,143,171,0.10)\" stroke=\"#ff8fab\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b6-lbl2\" x=\"650\" y=\"250\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONVEX</text>\n  <text id=\"l2b6-desc2\" x=\"650\" y=\"285\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">always diminished</text>\n</g>\n\n<!-- Beat 7: Torch reflector -->\n<g class=\"el\" data-beat=\"7\">\n  <rect id=\"l2b7-box\" x=\"200\" y=\"180\" width=\"400\" height=\"100\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b7-name\" x=\"400\" y=\"220\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Torch Reflector</text>\n  <text id=\"l2b7-desc\" x=\"400\" y=\"250\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Concave mirror — parallel beam</text>\n  <g id=\"l2b7-icon\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <rect x=\"350\" y=\"320\" width=\"100\" height=\"50\" rx=\"8\" fill=\"rgba(192,192,192,0.2)\" stroke=\"#cbd5e1\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <path d=\"M 350 345 Q 365 345 365 320 L 365 370 Q 365 345 350 345\" fill=\"rgba(127,219,255,0.3)\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <line x1=\"450\" y1=\"345\" x2=\"600\" y2=\"345\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"525\" y=\"335\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">parallel beam</text>\n  </g>\n</g>\n\n<!-- Beat 8: Dental mirror -->\n<g class=\"el\" data-beat=\"8\">\n  <rect id=\"l2b8-box\" x=\"200\" y=\"180\" width=\"400\" height=\"100\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b8-name\" x=\"400\" y=\"220\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Dental Mirror</text>\n  <text id=\"l2b8-desc\" x=\"400\" y=\"250\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Concave — enlarged view of teeth</text>\n  <g id=\"l2b8-icon\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <line x1=\"350\" y1=\"380\" x2=\"450\" y2=\"320\" stroke=\"#94a3b8\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <circle cx=\"450\" cy=\"320\" r=\"25\" fill=\"rgba(127,219,255,0.2)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <text x=\"510\" y=\"325\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">mirror</text>\n    <path d=\"M 280 320 Q 290 290 320 295 Q 330 295 335 320 Q 330 345 320 345 Q 290 350 280 320 Z\" fill=\"rgba(255,255,255,0.8)\" stroke=\"#f5f5f0\" stroke-width=\"1\" filter=\"url(#chalkLine)\"/>\n    <text x=\"310\" y=\"335\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">tooth</text>\n  </g>\n</g>\n\n<!-- Beat 9: Side-view mirror -->\n<g class=\"el\" data-beat=\"9\">\n  <rect id=\"l2b9-box\" x=\"200\" y=\"180\" width=\"400\" height=\"100\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b9-name\" x=\"400\" y=\"220\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Side-view Mirror</text>\n  <text id=\"l2b9-desc\" x=\"400\" y=\"250\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Convex — wider view of road</text>\n  <g id=\"l2b9-icon\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <rect x=\"300\" y=\"320\" width=\"200\" height=\"60\" rx=\"10\" fill=\"rgba(180,220,255,0.2)\" stroke=\"#ff8fab\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <path d=\"M 320 330 Q 340 360 320 380\" fill=\"none\" stroke=\"#ff8fab\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <text x=\"400\" y=\"358\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">Objects are closer than they appear</text>\n  </g>\n</g>\n\n<!-- Beat 10: Road mirror -->\n<g class=\"el\" data-beat=\"10\">\n  <rect id=\"l2b10-box\" x=\"200\" y=\"180\" width=\"400\" height=\"100\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l2b10-name\" x=\"400\" y=\"220\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Road Mirror</text>\n  <text id=\"l2b10-desc\" x=\"400\" y=\"250\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Convex — safety at intersections</text>\n  <g id=\"l2b10-icon\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <line x1=\"400\" y1=\"400\" x2=\"400\" y2=\"340\" stroke=\"#94a3b8\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <circle cx=\"400\" cy=\"320\" r=\"30\" fill=\"rgba(255,143,171,0.2)\" stroke=\"#ff8fab\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <path d=\"M 300 380 L 350 360\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <path d=\"M 500 380 L 450 360\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"280\" y=\"395\" text-anchor=\"end\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">driver A</text>\n    <text x=\"520\" y=\"395\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">driver B</text>\n  </g>\n</g>\n",
      "beats": [
        "Welcome back, my curious friends! In the last lecture, we met Meena at the science centre and learned the names of three mirror types: plane, concave, and convex. Today we will discover what kind of IMAGES each mirror forms — and why Meena saw herself large, upside-down, and tiny in those curved mirrors.",
        "Place a concave mirror and a convex mirror side by side on a table, with their reflecting surfaces facing you. Place a small toy in front of each. The image you see can be ERECT — that is, right-side up — or INVERTED — upside down. It can be ENLARGED (bigger), DIMINISHED (smaller), or the SAME SIZE as the object. Let us watch what each mirror does.",
        "Look at the CONCAVE mirror, when the object is CLOSE to it. The image you see is ERECT — that is, right-side up — but LARGER than the object itself. Your face appears bigger! This is exactly what Meena saw in the science centre mirror — her face was enlarged.",
        "Now, slowly move the toy AWAY from the concave mirror. Watch what happens! At some point, the image FLIPS. It becomes INVERTED — upside down. So a concave mirror can give either an enlarged erect image (when the object is close) OR an inverted image (when the object is far). That is why concave mirrors are so useful.",
        "Now look at the CONVEX mirror. No matter where you place the object — close or far — the image is ALWAYS ERECT and ALWAYS SMALLER than the object. The convex mirror never enlarges; it always diminishes. That is why Meena looked tiny in the convex mirror at the science centre.",
        "Compare this with the PLANE mirror that you have at home. A plane mirror always forms an image of the SAME SIZE as the object. It is always erect — never inverted. So: plane = same size, concave = enlarged OR inverted, convex = always diminished. Three different mirrors, three different behaviours.",
        "So where do we see these mirrors in our daily life? Let me show you some examples. The reflector inside a TORCH is a CONCAVE mirror — it takes the small light of the bulb and sends out a strong, parallel beam of light, so you can see far in the dark.",
        "When you visit the DENTIST, the doctor uses a small mirror on a stick to look inside your mouth. That is a CONCAVE mirror! It enlarges the image of your teeth, so the dentist can spot tiny cavities. Without this mirror, the dentist would miss small problems.",
        "Now look at the SIDE-VIEW MIRRORS of cars, scooters, and buses. These are CONVEX mirrors. Because they make things look smaller, they fit more of the road into the mirror — you can see a wider view of the traffic behind you. That is why the mirror always says: Objects in mirror are closer than they appear.",
        "CONVEX mirrors are also installed at sharp bends and road intersections, so that drivers from both sides can see each other coming. Because convex mirrors give a wider view, they help prevent accidents at blind corners. So you see, mirrors are everywhere in our daily life — each type chosen for its special property."
      ],
      "timelines": [
        {
          "beat": 1,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l2b1-title"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l2b1-sub"
              ]
            }
          ]
        },
        {
          "beat": 2,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b2-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l2b2-phrase"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l2b2-arrows-group"
              ]
            }
          ]
        },
        {
          "beat": 3,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b3-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l2b3-phrase"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l2b3-visual"
              ]
            }
          ]
        },
        {
          "beat": 4,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b4-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l2b4-phrase"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l2b4-visual"
              ]
            }
          ]
        },
        {
          "beat": 5,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b5-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l2b5-phrase"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l2b5-visual"
              ]
            }
          ]
        },
        {
          "beat": 6,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b6-box0"
              ]
            },
            {
              "delay": 2738,
              "show": [
                "l2b6-lbl0"
              ]
            },
            {
              "delay": 5476,
              "show": [
                "l2b6-desc0"
              ]
            },
            {
              "delay": 8214,
              "draw": [
                "l2b6-box1"
              ]
            },
            {
              "delay": 10952,
              "show": [
                "l2b6-lbl1"
              ]
            },
            {
              "delay": 13690,
              "show": [
                "l2b6-desc1"
              ]
            },
            {
              "delay": 16428,
              "draw": [
                "l2b6-box2"
              ]
            },
            {
              "delay": 19166,
              "show": [
                "l2b6-lbl2"
              ]
            },
            {
              "delay": 21904,
              "show": [
                "l2b6-desc2"
              ]
            }
          ]
        },
        {
          "beat": 7,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b7-box"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l2b7-name"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l2b7-desc"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l2b7-icon"
              ]
            }
          ]
        },
        {
          "beat": 8,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b8-box"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l2b8-name"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l2b8-desc"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l2b8-icon"
              ]
            }
          ]
        },
        {
          "beat": 9,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b9-box"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l2b9-name"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l2b9-desc"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l2b9-icon"
              ]
            }
          ]
        },
        {
          "beat": 10,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l2b10-box"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l2b10-name"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l2b10-desc"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l2b10-icon"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "laws",
      "label": "10.3 Laws of Reflection",
      "viewBox": "0 0 800 600",
      "svg": "<defs>\n  <filter id=\"chalk\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"chalkLine\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"0.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n    <feGaussianBlur stdDeviation=\"4\" result=\"blur\"/>\n    <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <marker id=\"arrowChalk\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#f5f5f0\"/>\n  </marker>\n  <marker id=\"arrowCyan\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#7fdbff\"/>\n  </marker>\n  <marker id=\"arrowPink\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#ff8fab\"/>\n  </marker>\n  <marker id=\"arrowYellow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#fbbf24\"/>\n  </marker>\n</defs>\n<rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n\n<!-- Beat 1: Title -->\n<g class=\"el\" data-beat=\"1\">\n  <text id=\"l3b1-title\" x=\"400\" y=\"80\" text-anchor=\"middle\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"32\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Laws of Reflection</text>\n  <text id=\"l3b1-sub\" x=\"400\" y=\"120\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Why does light bounce the way it does?</text>\n</g>\n\n<!-- Beat 2: Setup + First Diagram -->\n<g class=\"el\" data-beat=\"2\">\n  <line id=\"l3b2-mirror\" x1=\"500\" y1=\"200\" x2=\"500\" y2=\"500\" stroke=\"#f5f5f0\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b2-incident\" x1=\"250\" y1=\"200\" x2=\"500\" y2=\"350\" stroke=\"#7fdbff\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease\"/>\n  <line id=\"l3b2-normal\" x1=\"400\" y1=\"350\" x2=\"500\" y2=\"350\" stroke=\"#f4d35e\" stroke-width=\"2\" stroke-dasharray=\"8 8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b2-reflected\" x1=\"500\" y1=\"350\" x2=\"250\" y2=\"500\" stroke=\"#fb923c\" stroke-width=\"3\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease\"/>\n  <circle id=\"l3b2-photon\" cx=\"500\" cy=\"350\" r=\"6\" fill=\"#fbbf24\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b2-lbl-incident\" x=\"280\" y=\"230\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">incident ray</text>\n  <text id=\"l3b2-lbl-reflected\" x=\"280\" y=\"470\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">reflected ray</text>\n  <text id=\"l3b2-lbl-normal\" x=\"380\" y=\"340\" text-anchor=\"end\" fill=\"#f4d35e\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">normal</text>\n  <text id=\"l3b2-lbl-mirror\" x=\"510\" y=\"350\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">mirror</text>\n</g>\n\n<!-- Beat 3: Reflected Beam Comes Back (uses same diagram; new labels) -->\n<g class=\"el\" data-beat=\"3\">\n  <line id=\"l3b3-mirror\" x1=\"500\" y1=\"200\" x2=\"500\" y2=\"500\" stroke=\"#f5f5f0\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b3-incident\" x1=\"250\" y1=\"200\" x2=\"500\" y2=\"350\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b3-normal\" x1=\"400\" y1=\"350\" x2=\"500\" y2=\"350\" stroke=\"#f4d35e\" stroke-width=\"2\" stroke-dasharray=\"8 8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b3-reflected\" x1=\"500\" y1=\"350\" x2=\"250\" y2=\"500\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <circle id=\"l3b3-photon\" cx=\"500\" cy=\"350\" r=\"6\" fill=\"#fbbf24\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b3-lbl-incident\" x=\"280\" y=\"230\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">incident ray</text>\n  <text id=\"l3b3-lbl-reflected\" x=\"280\" y=\"470\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">reflected ray</text>\n  <text id=\"l3b3-lbl-normal\" x=\"380\" y=\"340\" text-anchor=\"end\" fill=\"#f4d35e\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">normal</text>\n</g>\n\n<!-- Beat 4: Incident vs Reflected Labels -->\n<g class=\"el\" data-beat=\"4\">\n  <rect id=\"l3b4-box\" x=\"100\" y=\"500\" width=\"600\" height=\"80\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l3b4-phrase\" x=\"400\" y=\"545\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Incident Ray vs Reflected Ray</text>\n</g>\n\n<!-- Beat 5: Normal -->\n<g class=\"el\" data-beat=\"5\">\n  <line id=\"l3b5-mirror\" x1=\"500\" y1=\"200\" x2=\"500\" y2=\"500\" stroke=\"#f5f5f0\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b5-incident\" x1=\"250\" y1=\"200\" x2=\"500\" y2=\"350\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b5-normal\" x1=\"400\" y1=\"350\" x2=\"500\" y2=\"350\" stroke=\"#f4d35e\" stroke-width=\"2\" stroke-dasharray=\"8 8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b5-reflected\" x1=\"500\" y1=\"350\" x2=\"250\" y2=\"500\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <circle id=\"l3b5-photon\" cx=\"500\" cy=\"350\" r=\"6\" fill=\"#fbbf24\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b5-lbl-incident\" x=\"280\" y=\"230\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">incident ray</text>\n  <text id=\"l3b5-lbl-reflected\" x=\"280\" y=\"470\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">reflected ray</text>\n  <text id=\"l3b5-lbl-normal\" x=\"380\" y=\"340\" text-anchor=\"end\" fill=\"#f4d35e\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">NORMAL</text>\n</g>\n\n<!-- Beat 6: Angle of incidence (i) - with arc -->\n<g class=\"el\" data-beat=\"6\">\n  <line id=\"l3b6-mirror\" x1=\"500\" y1=\"200\" x2=\"500\" y2=\"500\" stroke=\"#f5f5f0\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b6-incident\" x1=\"250\" y1=\"200\" x2=\"500\" y2=\"350\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b6-normal\" x1=\"400\" y1=\"350\" x2=\"500\" y2=\"350\" stroke=\"#f4d35e\" stroke-width=\"2\" stroke-dasharray=\"8 8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <!-- Arc showing angle i -->\n  <path id=\"l3b6-arc-i\" d=\"M 460 350 A 40 40 0 0 0 478 326\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b6-label-i\" x=\"468\" y=\"332\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">i</text>\n  <rect id=\"l3b6-box\" x=\"150\" y=\"540\" width=\"500\" height=\"50\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b6-phrase\" x=\"400\" y=\"572\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Angle of Incidence (i)</text>\n</g>\n\n<!-- Beat 7: Angle of reflection (r) - with arc + i=r -->\n<g class=\"el\" data-beat=\"7\">\n  <line id=\"l3b7-mirror\" x1=\"500\" y1=\"200\" x2=\"500\" y2=\"500\" stroke=\"#f5f5f0\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b7-incident\" x1=\"250\" y1=\"200\" x2=\"500\" y2=\"350\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b7-normal\" x1=\"400\" y1=\"350\" x2=\"500\" y2=\"350\" stroke=\"#f4d35e\" stroke-width=\"2\" stroke-dasharray=\"8 8\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b7-reflected\" x1=\"500\" y1=\"350\" x2=\"250\" y2=\"500\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <path id=\"l3b7-arc-i\" d=\"M 460 350 A 40 40 0 0 0 478 326\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b7-label-i\" x=\"468\" y=\"332\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">i</text>\n  <path id=\"l3b7-arc-r\" d=\"M 460 350 A 40 40 0 0 1 478 374\" fill=\"none\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b7-label-r\" x=\"468\" y=\"377\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">r</text>\n  <text id=\"l3b7-equals\" x=\"600\" y=\"350\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"32\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">i = r</text>\n  <rect id=\"l3b7-box\" x=\"150\" y=\"540\" width=\"500\" height=\"50\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b7-phrase\" x=\"400\" y=\"572\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Angle of Reflection (r)</text>\n</g>\n\n<!-- Beat 8: Law 1 -->\n<g class=\"el\" data-beat=\"8\">\n  <rect id=\"l3b8-box\" x=\"100\" y=\"200\" width=\"600\" height=\"160\" fill=\"rgba(167,139,250,0.10)\" stroke=\"#a78bfa\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l3b8-num\" x=\"400\" y=\"260\" text-anchor=\"middle\" fill=\"#a78bfa\" font-family=\"'Comic Sans MS', cursive\" font-size=\"28\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">LAW 1 of Reflection</text>\n  <text id=\"l3b8-text\" x=\"400\" y=\"310\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Angle of incidence = Angle of reflection</text>\n  <text id=\"l3b8-formula\" x=\"400\" y=\"340\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"24\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">∠i = ∠r</text>\n</g>\n\n<!-- Beat 9: Same-plane activity -->\n<g class=\"el\" data-beat=\"9\">\n  <rect id=\"l3b9-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l3b9-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Same Plane Activity</text>\n  <g id=\"l3b9-paper\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <rect x=\"200\" y=\"380\" width=\"400\" height=\"160\" fill=\"rgba(251,191,36,0.10)\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <text x=\"400\" y=\"420\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">chart paper (flat on table)</text>\n    <line x1=\"280\" y1=\"450\" x2=\"500\" y2=\"470\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"270\" y=\"455\" text-anchor=\"end\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">incident</text>\n    <line x1=\"500\" y1=\"470\" x2=\"280\" y2=\"510\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"270\" y=\"515\" text-anchor=\"end\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">reflected</text>\n    <line x1=\"500\" y1=\"440\" x2=\"500\" y2=\"500\" stroke=\"#f5f5f0\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <text x=\"510\" y=\"475\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">mirror</text>\n  </g>\n</g>\n\n<!-- Beat 10: Law 2 -->\n<g class=\"el\" data-beat=\"10\">\n  <rect id=\"l3b10-box\" x=\"100\" y=\"200\" width=\"600\" height=\"160\" fill=\"rgba(167,139,250,0.10)\" stroke=\"#a78bfa\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l3b10-num\" x=\"400\" y=\"260\" text-anchor=\"middle\" fill=\"#a78bfa\" font-family=\"'Comic Sans MS', cursive\" font-size=\"28\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">LAW 2 of Reflection</text>\n  <text id=\"l3b10-text\" x=\"400\" y=\"310\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Incident ray, normal, reflected ray</text>\n  <text id=\"l3b10-text2\" x=\"400\" y=\"340\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">— all in the SAME PLANE</text>\n</g>\n\n<!-- Beat 11: Laws apply to all mirrors + i=0 case -->\n<g class=\"el\" data-beat=\"11\">\n  <rect id=\"l3b11-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l3b11-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Laws apply to ALL mirrors</text>\n  <g id=\"l3b11-i0-group\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <line x1=\"500\" y1=\"180\" x2=\"500\" y2=\"540\" stroke=\"#f5f5f0\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <text x=\"510\" y=\"200\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">mirror</text>\n    <line id=\"l3b11-ray-in\" x1=\"500\" y1=\"180\" x2=\"500\" y2=\"360\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <line id=\"l3b11-ray-out\" x1=\"500\" y1=\"360\" x2=\"500\" y2=\"180\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <line x1=\"450\" y1=\"360\" x2=\"550\" y2=\"360\" stroke=\"#f4d35e\" stroke-width=\"2\" stroke-dasharray=\"6 6\" filter=\"url(#chalkLine)\"/>\n    <text x=\"560\" y=\"365\" fill=\"#f4d35e\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">normal</text>\n    <text x=\"400\" y=\"380\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" font-weight=\"700\" filter=\"url(#chalk)\">i = 0, r = 0</text>\n    <text x=\"400\" y=\"400\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">(light retraces its path)</text>\n  </g>\n</g>\n\n<!-- Beat 12: Concave converges -->\n<g class=\"el\" data-beat=\"12\">\n  <rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n  <path id=\"l3b12-mirror\" d=\"M 550 150 Q 470 300 550 450\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b12-mirror-label\" x=\"580\" y=\"300\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">concave</text>\n  <line id=\"l3b12-ray0\" x1=\"100\" y1=\"220\" x2=\"500\" y2=\"300\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease\"/>\n  <line id=\"l3b12-ray1\" x1=\"100\" y1=\"300\" x2=\"500\" y2=\"300\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease\"/>\n  <line id=\"l3b12-ray2\" x1=\"100\" y1=\"380\" x2=\"500\" y2=\"300\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease\"/>\n  <!-- Reflected rays all pass through (300,300) - the focus (FIXED geometry) -->\n  <line id=\"l3b12-refl0\" x1=\"500\" y1=\"300\" x2=\"100\" y2=\"380\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease\"/>\n  <line id=\"l3b12-refl1\" x1=\"500\" y1=\"300\" x2=\"100\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease\"/>\n  <line id=\"l3b12-refl2\" x1=\"500\" y1=\"300\" x2=\"100\" y2=\"220\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\" style=\"stroke-dasharray:500;stroke-dashoffset:500;transition:stroke-dashoffset 1.5s ease\"/>\n  <circle id=\"l3b12-focus\" cx=\"300\" cy=\"300\" r=\"8\" fill=\"#fbbf24\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b12-flabel\" x=\"312\" y=\"295\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">F</text>\n  <text id=\"l3b12-label\" x=\"400\" y=\"520\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONVERGES at F</text>\n</g>\n\n<!-- Beat 13: Burning paper -->\n<g class=\"el\" data-beat=\"13\">\n  <rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n  <!-- Sun icon -->\n  <circle id=\"l3b13-sun\" cx=\"100\" cy=\"100\" r=\"30\" fill=\"#fde047\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b13-sun-label\" x=\"100\" y=\"160\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">sun</text>\n  <path id=\"l3b13-mirror\" d=\"M 550 150 Q 470 300 550 450\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b13-ray0\" x1=\"100\" y1=\"220\" x2=\"500\" y2=\"300\" stroke=\"#fde047\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b13-ray1\" x1=\"100\" y1=\"300\" x2=\"500\" y2=\"300\" stroke=\"#fde047\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b13-ray2\" x1=\"100\" y1=\"380\" x2=\"500\" y2=\"300\" stroke=\"#fde047\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b13-refl0\" x1=\"500\" y1=\"300\" x2=\"100\" y2=\"380\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b13-refl1\" x1=\"500\" y1=\"300\" x2=\"100\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l3b13-refl2\" x1=\"500\" y1=\"300\" x2=\"100\" y2=\"220\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <circle id=\"l3b13-focus\" cx=\"300\" cy=\"300\" r=\"8\" fill=\"#fbbf24\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <!-- Paper with flame + smoke -->\n  <rect id=\"l3b13-paper\" x=\"270\" y=\"290\" width=\"60\" height=\"40\" fill=\"#f5f5f0\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <path id=\"l3b13-flame\" d=\"M 300 290 Q 290 270 300 250 Q 310 270 300 290 Z\" fill=\"#fb923c\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <path id=\"l3b13-smoke\" d=\"M 300 250 Q 295 230 305 220 Q 295 210 300 195\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b13-label\" x=\"400\" y=\"520\" text-anchor=\"middle\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Paper BURNS at the focus!</text>\n</g>\n\n<!-- Beat 14: Closing summary (NEW per choreography) -->\n<g class=\"el\" data-beat=\"14\">\n  <rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n  <rect id=\"l3b14-box\" x=\"100\" y=\"200\" width=\"600\" height=\"200\" fill=\"rgba(167,139,250,0.10)\" stroke=\"#a78bfa\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l3b14-title\" x=\"400\" y=\"240\" text-anchor=\"middle\" fill=\"#a78bfa\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Two Laws of Reflection</text>\n  <text id=\"l3b14-law1\" x=\"400\" y=\"290\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">1. ∠i = ∠r</text>\n  <text id=\"l3b14-law2\" x=\"400\" y=\"320\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">2. incident + normal + reflected — same plane</text>\n  <text id=\"l3b14-teaser\" x=\"400\" y=\"370\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" font-style=\"italic\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Next: Lenses</text>\n</g>\n",
      "beats": [
        "Welcome back, young scientists! In our last lecture, we discovered that concave and convex mirrors form very different kinds of images. But WHY? Why does light bounce the way it does? Today we will discover the two LAWS OF REFLECTION — the rules that govern how light reflects from any mirror, flat or curved.",
        "Let us set up the experiment. You will need: a plane mirror with a stand, a torch, a comb (yes, the kind you comb your hair with), and a sheet of white paper. Place the mirror vertically on the paper. Shine the torch through the comb so you get a thin beam of light. Aim this beam at the mirror. You will see two beams: one going IN to the mirror, and one coming OUT.",
        "Look at the beam of light falling on the mirror. It is a yellow beam coming from the torch. Now look at the reflected beam coming back from the mirror. The two beams are symmetric — like a butterfly's wings. The mirror is the body of the butterfly, and the two beams are its wings.",
        "We need names for these beams. The ray of light that FALLS ON the mirror is called the INCIDENT RAY. The ray of light that BOUNCES BACK from the mirror is called the REFLECTED RAY. The point where the incident ray meets the mirror is called the POINT OF INCIDENCE.",
        "Now we draw this in our notebook. Draw a line for the mirror, then draw the incident ray (with an arrow showing direction) hitting it. Then draw the reflected ray (also with an arrow) leaving it. At the point of incidence, draw a dashed line PERPENDICULAR to the mirror surface. This line is called the NORMAL.",
        "Now we measure angles. The angle between the NORMAL and the INCIDENT RAY is called the ANGLE OF INCIDENCE, written as 'i'. We always measure angles from the normal, NOT from the mirror surface. This is a convention scientists follow worldwide — it makes the laws simpler.",
        "Try this activity many times — change the angle of incidence each time and measure both angles. Write down your readings in a table. You will notice something remarkable: the angle of incidence and the angle of reflection are always EQUAL. If i is 30°, r is also 30°. If i is 45°, r is also 45°.",
        "But there is one more thing to check. When the incident beam falls exactly ALONG the normal — that is, perpendicular to the mirror — then i = 0. What is r? It is also 0! The reflected beam retraces the incident beam's path exactly, going back along the normal.",
        "Now for the second law, we need another activity. Use the same setup, but place a stiff sheet of chart paper flat on the table, in line with the incident ray and the mirror. The reflected beam lies on this sheet. Now lift one side of the sheet, bending it along the mirror line. What happens? The reflected beam VANISHES from the bent side! This shows the reflected beam lies in the same plane as the incident beam.",
        "This shows us something important. The reflected beam lies in the SAME plane as the incident beam — both beams and the normal are in one flat sheet. This is our second Law of Reflection: the incident ray, the normal, and the reflected ray all lie in the same plane.",
        "Now, are these laws only for plane mirrors, or do they also work for spherical mirrors? Yes, the laws of reflection apply to ALL kinds of mirrors — plane, concave, or convex. The angle of incidence equals the angle of reflection at every single point on a curved mirror. That is how curved mirrors form such interesting images.",
        "Send several parallel beams — uncover many slits of the comb — onto a plane mirror. The reflected beams are also parallel; they do not meet. Now send the same parallel beams onto a CONCAVE mirror. The reflected beams get closer — they meet at a point. We say the beams CONVERGE. This meeting point is called the FOCUS, marked F.",
        "Here is a fascinating activity — but it requires supervision. Take a concave mirror and hold it facing the Sun. Hold a small piece of paper in front of the mirror, near the focus. The reflected sunlight converges on the paper, and the paper starts to smoke and burn! This is because all the sun's energy is concentrated at one point — the focus.",
        "So today we learned two powerful laws: the angle of incidence equals the angle of reflection; and the incident ray, normal, and reflected ray all lie in the same plane. We also saw that concave mirrors CONVERGE parallel beams to a focus. In our next lecture, we will move from mirrors to LENSES — objects that bend light instead of bouncing it."
      ],
      "timelines": [
        {
          "beat": 1,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b1-title"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l3b1-sub"
              ]
            }
          ]
        },
        {
          "beat": 2,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b2-mirror"
              ]
            },
            {
              "delay": 4008,
              "draw": [
                "l3b2-incident"
              ]
            },
            {
              "delay": 8017,
              "show": [
                "l3b2-normal"
              ]
            },
            {
              "delay": 12026,
              "draw": [
                "l3b2-reflected"
              ]
            },
            {
              "delay": 16035,
              "show": [
                "l3b2-photon"
              ]
            },
            {
              "delay": 20044,
              "show": [
                "l3b2-lbl-incident"
              ]
            },
            {
              "delay": 24053,
              "show": [
                "l3b2-lbl-reflected"
              ]
            },
            {
              "delay": 28062,
              "show": [
                "l3b2-lbl-normal",
                "l3b2-lbl-mirror"
              ]
            }
          ]
        },
        {
          "beat": 3,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b3-mirror",
                "l3b3-incident",
                "l3b3-normal",
                "l3b3-reflected",
                "l3b3-photon"
              ]
            },
            {
              "delay": 3125,
              "show": [
                "l3b3-lbl-incident"
              ]
            },
            {
              "delay": 6250,
              "show": [
                "l3b3-lbl-reflected"
              ]
            },
            {
              "delay": 9375,
              "show": [
                "l3b3-lbl-normal"
              ]
            }
          ]
        },
        {
          "beat": 4,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l3b4-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l3b4-phrase"
              ]
            }
          ]
        },
        {
          "beat": 5,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b5-mirror",
                "l3b5-incident",
                "l3b5-normal",
                "l3b5-reflected",
                "l3b5-photon"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l3b5-lbl-incident"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l3b5-lbl-reflected"
              ]
            },
            {
              "delay": 16000,
              "show": [
                "l3b5-lbl-normal"
              ]
            }
          ]
        },
        {
          "beat": 6,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b6-mirror",
                "l3b6-incident",
                "l3b6-normal"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l3b6-arc-i",
                "l3b6-label-i"
              ]
            },
            {
              "delay": 8000,
              "draw": [
                "l3b6-box"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l3b6-phrase"
              ]
            }
          ]
        },
        {
          "beat": 7,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b7-mirror",
                "l3b7-incident",
                "l3b7-normal",
                "l3b7-reflected",
                "l3b7-arc-i",
                "l3b7-label-i"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l3b7-arc-r",
                "l3b7-label-r"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l3b7-equals"
              ],
              "pulse": [
                "l3b7-equals"
              ]
            },
            {
              "delay": 12000,
              "draw": [
                "l3b7-box"
              ]
            },
            {
              "delay": 16000,
              "show": [
                "l3b7-phrase"
              ]
            }
          ]
        },
        {
          "beat": 8,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l3b8-box"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l3b8-num"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l3b8-text"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l3b8-formula"
              ],
              "pulse": [
                "l3b8-formula"
              ]
            }
          ]
        },
        {
          "beat": 9,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l3b9-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l3b9-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l3b9-paper"
              ]
            }
          ]
        },
        {
          "beat": 10,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l3b10-box"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l3b10-num"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l3b10-text"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l3b10-text2"
              ],
              "pulse": [
                "l3b10-text2"
              ]
            }
          ]
        },
        {
          "beat": 11,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l3b11-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l3b11-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l3b11-i0-group"
              ]
            }
          ]
        },
        {
          "beat": 12,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b12-mirror",
                "l3b12-mirror-label"
              ]
            },
            {
              "delay": 2935,
              "draw": [
                "l3b12-ray0"
              ]
            },
            {
              "delay": 5871,
              "draw": [
                "l3b12-ray1"
              ]
            },
            {
              "delay": 8807,
              "draw": [
                "l3b12-ray2"
              ]
            },
            {
              "delay": 11742,
              "draw": [
                "l3b12-refl0"
              ]
            },
            {
              "delay": 14678,
              "draw": [
                "l3b12-refl1"
              ]
            },
            {
              "delay": 17614,
              "draw": [
                "l3b12-refl2"
              ]
            },
            {
              "delay": 20550,
              "show": [
                "l3b12-focus"
              ]
            },
            {
              "delay": 23485,
              "show": [
                "l3b12-flabel"
              ]
            },
            {
              "delay": 26421,
              "show": [
                "l3b12-label"
              ]
            }
          ]
        },
        {
          "beat": 13,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b13-sun",
                "l3b13-sun-label",
                "l3b13-mirror"
              ]
            },
            {
              "delay": 3785,
              "show": [
                "l3b13-ray0",
                "l3b13-ray1",
                "l3b13-ray2"
              ]
            },
            {
              "delay": 11357,
              "show": [
                "l3b13-refl0",
                "l3b13-refl1",
                "l3b13-refl2"
              ]
            },
            {
              "delay": 18928,
              "show": [
                "l3b13-focus",
                "l3b13-paper"
              ]
            },
            {
              "delay": 26500,
              "show": [
                "l3b13-flame"
              ]
            },
            {
              "delay": 30000,
              "show": [
                "l3b13-smoke"
              ]
            },
            {
              "delay": 34071,
              "show": [
                "l3b13-label"
              ],
              "pulse": [
                "l3b13-label"
              ]
            }
          ]
        },
        {
          "beat": 14,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l3b14-box"
              ]
            },
            {
              "delay": 2000,
              "show": [
                "l3b14-title"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l3b14-law1"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l3b14-law2"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l3b14-teaser"
              ],
              "pulse": [
                "l3b14-teaser"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "lenses",
      "label": "10.4 Lenses",
      "viewBox": "0 0 800 600",
      "svg": "<defs>\n  <filter id=\"chalk\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"chalkLine\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"0.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n    <feGaussianBlur stdDeviation=\"4\" result=\"blur\"/>\n    <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <marker id=\"arrowChalk\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#f5f5f0\"/>\n  </marker>\n  <marker id=\"arrowCyan\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#7fdbff\"/>\n  </marker>\n  <marker id=\"arrowPink\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#ff8fab\"/>\n  </marker>\n  <marker id=\"arrowYellow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#fbbf24\"/>\n  </marker>\n</defs>\n<rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n\n<!-- Beat 1: Title -->\n<g class=\"el\" data-beat=\"1\">\n  <text id=\"l4b1-title\" x=\"400\" y=\"80\" text-anchor=\"middle\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"32\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Lenses</text>\n  <text id=\"l4b1-sub\" x=\"400\" y=\"120\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Light passes THROUGH, not bounces</text>\n</g>\n\n<!-- Beat 2: Mirror vs Lens comparison -->\n<g class=\"el\" data-beat=\"2\">\n  <rect id=\"l4b2-box\" x=\"150\" y=\"380\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b2-phrase\" x=\"400\" y=\"430\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Mirror vs Lens</text>\n  <!-- Mirror icon on LEFT -->\n  <g id=\"l4b2-mirror-icon\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <rect x=\"100\" y=\"180\" width=\"20\" height=\"120\" fill=\"rgba(192,192,192,0.2)\" stroke=\"#c0c0c0\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <line x1=\"50\" y1=\"220\" x2=\"100\" y2=\"240\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <line x1=\"100\" y1=\"240\" x2=\"50\" y2=\"280\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"110\" y=\"200\" fill=\"#c0c0c0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">MIRROR</text>\n    <text x=\"110\" y=\"320\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">Light BOUNCES back</text>\n  </g>\n  <!-- Lens icon on RIGHT -->\n  <g id=\"l4b2-lens-icon\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <ellipse cx=\"500\" cy=\"240\" rx=\"20\" ry=\"60\" fill=\"rgba(127,219,255,0.2)\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <line x1=\"430\" y1=\"240\" x2=\"480\" y2=\"240\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <line x1=\"520\" y1=\"240\" x2=\"580\" y2=\"220\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <line x1=\"520\" y1=\"240\" x2=\"580\" y2=\"260\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"490\" y=\"200\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">LENS</text>\n    <text x=\"500\" y=\"320\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">Light PASSES THROUGH</text>\n  </g>\n</g>\n\n<!-- Beat 3: Water drop activity (NEW per choreography) -->\n<g class=\"el\" data-beat=\"3\">\n  <rect id=\"l4b3-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b3-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Water drop = tiny magnifying glass</text>\n  <g id=\"l4b3-icon\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <rect x=\"200\" y=\"380\" width=\"400\" height=\"40\" fill=\"rgba(180,220,255,0.15)\" stroke=\"#94a3b8\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <text x=\"400\" y=\"405\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">glass strip</text>\n    <ellipse cx=\"400\" cy=\"380\" rx=\"20\" ry=\"10\" fill=\"rgba(56,189,248,0.4)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <text x=\"400\" y=\"370\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">water drop</text>\n    <text x=\"220\" y=\"460\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">small text</text>\n    <text x=\"500\" y=\"460\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\">ENLARGED!</text>\n  </g>\n</g>\n\n<!-- Beat 4: Magnifying glass = convex lens -->\n<g class=\"el\" data-beat=\"4\">\n  <rect id=\"l4b4-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b4-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Magnifying Glass = Convex Lens</text>\n  <g id=\"l4b4-icon\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <circle cx=\"350\" cy=\"430\" r=\"40\" fill=\"rgba(127,219,255,0.2)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <line x1=\"380\" y1=\"460\" x2=\"430\" y2=\"510\" stroke=\"#94a3b8\" stroke-width=\"5\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\"/>\n    <text x=\"350\" y=\"435\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" font-weight=\"700\" filter=\"url(#chalk)\">+</text>\n    <text x=\"500\" y=\"430\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">small print</text>\n    <text x=\"500\" y=\"450\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\">ENLARGED</text>\n  </g>\n</g>\n\n<!-- Beat 5: Convex lens (thick middle) -->\n<g class=\"el\" data-beat=\"5\">\n  <path id=\"l4b5-lens\" d=\"M 380 200 Q 420 300 380 400 Q 340 300 380 200 Z\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b5-label\" x=\"400\" y=\"450\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONVEX LENS</text>\n  <text id=\"l4b5-desc\" x=\"400\" y=\"475\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">(thick middle)</text>\n</g>\n\n<!-- Beat 6: Concave lens (thick edges) -->\n<g class=\"el\" data-beat=\"6\">\n  <path id=\"l4b6-lens\" d=\"M 380 200 Q 360 300 380 400 Q 420 300 380 200 Z\" fill=\"rgba(255,143,171,0.10)\" stroke=\"#ff8fab\" stroke-width=\"4\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b6-label\" x=\"400\" y=\"450\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONCAVE LENS</text>\n  <text id=\"l4b6-desc\" x=\"400\" y=\"475\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">(thick edges)</text>\n</g>\n\n<!-- Beat 7: Schematic symbols -->\n<g class=\"el\" data-beat=\"7\">\n  <rect id=\"l4b7-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b7-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Schematic Symbols</text>\n  <g id=\"l4b7-visual\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <!-- Convex schematic: vertical line with outward arrows -->\n    <line x1=\"300\" y1=\"400\" x2=\"300\" y2=\"500\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <polygon points=\"300,400 295,415 305,415\" fill=\"#7fdbff\"/>\n    <polygon points=\"300,500 295,485 305,485\" fill=\"#7fdbff\"/>\n    <text x=\"300\" y=\"525\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" font-weight=\"700\" filter=\"url(#chalk)\">convex</text>\n    <!-- Concave schematic: vertical line with inward arrows -->\n    <line x1=\"500\" y1=\"400\" x2=\"500\" y2=\"500\" stroke=\"#ff8fab\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <polygon points=\"300,400 295,385 305,385\" fill=\"#7fdbff\" transform=\"translate(200,0)\"/>\n    <polygon points=\"500,400 495,385 505,385\" fill=\"#ff8fab\"/>\n    <polygon points=\"500,500 495,515 505,515\" fill=\"#ff8fab\"/>\n    <text x=\"500\" y=\"525\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" font-weight=\"700\" filter=\"url(#chalk)\">concave</text>\n  </g>\n</g>\n\n<!-- Beat 8: Light passes through -->\n<g class=\"el\" data-beat=\"8\">\n  <rect id=\"l4b8-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b8-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Light passes through lens</text>\n  <g id=\"l4b8-visual\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <path d=\"M 380 380 Q 420 460 380 540 Q 340 460 380 380 Z\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <text x=\"380\" y=\"465\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">lens</text>\n    <line x1=\"100\" y1=\"430\" x2=\"370\" y2=\"460\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <line x1=\"100\" y1=\"490\" x2=\"370\" y2=\"460\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <line x1=\"390\" y1=\"460\" x2=\"600\" y2=\"460\" stroke=\"#fb923c\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"200\" y=\"420\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">parallel rays</text>\n    <text x=\"500\" y=\"450\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">converge</text>\n  </g>\n</g>\n\n<!-- Beat 9: Convex close - Enlarged -->\n<g class=\"el\" data-beat=\"9\">\n  <rect id=\"l4b9-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b9-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Convex (close): Enlarged</text>\n  <g id=\"l4b9-visual\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <path d=\"M 380 380 Q 420 460 380 540 Q 340 460 380 380 Z\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <line x1=\"450\" y1=\"540\" x2=\"450\" y2=\"500\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"450\" y=\"560\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">object</text>\n    <line x1=\"600\" y1=\"540\" x2=\"600\" y2=\"440\" stroke=\"#34d399\" stroke-width=\"5\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"600\" y=\"560\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" font-weight=\"700\" filter=\"url(#chalk)\">ENLARGED + ERECT</text>\n  </g>\n</g>\n\n<!-- Beat 10: Convex far - Inverted -->\n<g class=\"el\" data-beat=\"10\">\n  <rect id=\"l4b10-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b10-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Convex (far): Inverted</text>\n  <g id=\"l4b10-visual\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <path d=\"M 380 380 Q 420 460 380 540 Q 340 460 380 380 Z\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <line x1=\"450\" y1=\"540\" x2=\"450\" y2=\"510\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"450\" y=\"560\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">object</text>\n    <line x1=\"600\" y1=\"440\" x2=\"600\" y2=\"540\" stroke=\"#f87171\" stroke-width=\"4\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowPink)\"/>\n    <text x=\"600\" y=\"560\" text-anchor=\"middle\" fill=\"#f87171\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" font-weight=\"700\" filter=\"url(#chalk)\">INVERTED</text>\n  </g>\n</g>\n\n<!-- Beat 11: Concave always diminished -->\n<g class=\"el\" data-beat=\"11\">\n  <rect id=\"l4b11-box\" x=\"150\" y=\"220\" width=\"500\" height=\"100\" fill=\"rgba(56,189,248,0.10)\" stroke=\"#38bdf8\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"stroke-dasharray:600;stroke-dashoffset:600;transition:stroke-dashoffset 1.5s ease;opacity:0\"/>\n  <text id=\"l4b11-phrase\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#38bdf8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Concave: Always diminished</text>\n  <g id=\"l4b11-visual\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <path d=\"M 380 380 Q 360 460 380 540 Q 420 460 380 380 Z\" fill=\"rgba(255,143,171,0.10)\" stroke=\"#ff8fab\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <line x1=\"450\" y1=\"540\" x2=\"450\" y2=\"510\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n    <text x=\"450\" y=\"560\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">object</text>\n    <line x1=\"600\" y1=\"540\" x2=\"600\" y2=\"525\" stroke=\"#34d399\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowCyan)\"/>\n    <text x=\"600\" y=\"560\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" font-weight=\"700\" filter=\"url(#chalk)\">DIMINISHED + ERECT</text>\n  </g>\n</g>\n\n<!-- Beat 12: Convex converges parallel beams -->\n<g class=\"el\" data-beat=\"12\">\n  <rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n  <path id=\"l4b12-lens\" d=\"M 380 200 Q 420 300 380 400 Q 340 300 380 200 Z\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l4b12-lens-label\" x=\"380\" y=\"420\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">convex</text>\n  <line id=\"l4b12-ray0\" x1=\"50\" y1=\"220\" x2=\"380\" y2=\"220\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b12-ray1\" x1=\"50\" y1=\"300\" x2=\"380\" y2=\"300\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b12-ray2\" x1=\"50\" y1=\"380\" x2=\"380\" y2=\"380\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b12-refl0\" x1=\"380\" y1=\"220\" x2=\"600\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b12-refl1\" x1=\"380\" y1=\"300\" x2=\"600\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b12-refl2\" x1=\"380\" y1=\"380\" x2=\"600\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <circle id=\"l4b12-focus\" cx=\"600\" cy=\"300\" r=\"8\" fill=\"#fbbf24\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l4b12-flabel\" x=\"612\" y=\"295\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">F</text>\n  <text id=\"l4b12-label\" x=\"400\" y=\"500\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONVEX: CONVERGES</text>\n</g>\n\n<!-- Beat 13: Concave diverges parallel beams -->\n<g class=\"el\" data-beat=\"13\">\n  <rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n  <path id=\"l4b13-lens\" d=\"M 380 200 Q 360 300 380 400 Q 420 300 380 200 Z\" fill=\"rgba(255,143,171,0.10)\" stroke=\"#ff8fab\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l4b13-lens-label\" x=\"380\" y=\"420\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">concave</text>\n  <line id=\"l4b13-ray0\" x1=\"50\" y1=\"220\" x2=\"380\" y2=\"220\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b13-ray1\" x1=\"50\" y1=\"300\" x2=\"380\" y2=\"300\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b13-ray2\" x1=\"50\" y1=\"380\" x2=\"380\" y2=\"380\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b13-refl0\" x1=\"380\" y1=\"220\" x2=\"700\" y2=\"160\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b13-refl1\" x1=\"380\" y1=\"300\" x2=\"700\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b13-refl2\" x1=\"380\" y1=\"380\" x2=\"700\" y2=\"440\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l4b13-label\" x=\"400\" y=\"500\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">CONCAVE: DIVERGES</text>\n</g>\n\n<!-- Beat 14: Burning paper through convex lens -->\n<g class=\"el\" data-beat=\"14\">\n  <rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n  <circle id=\"l4b14-sun\" cx=\"80\" cy=\"100\" r=\"30\" fill=\"#fde047\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l4b14-sun-label\" x=\"80\" y=\"160\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">sun</text>\n  <path id=\"l4b14-lens\" d=\"M 380 200 Q 420 300 380 400 Q 340 300 380 200 Z\" fill=\"rgba(127,219,255,0.10)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b14-ray0\" x1=\"100\" y1=\"220\" x2=\"380\" y2=\"220\" stroke=\"#fde047\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b14-ray1\" x1=\"100\" y1=\"300\" x2=\"380\" y2=\"300\" stroke=\"#fde047\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b14-ray2\" x1=\"100\" y1=\"380\" x2=\"380\" y2=\"380\" stroke=\"#fde047\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b14-refl0\" x1=\"380\" y1=\"220\" x2=\"600\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b14-refl1\" x1=\"380\" y1=\"300\" x2=\"600\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <line id=\"l4b14-refl2\" x1=\"380\" y1=\"380\" x2=\"600\" y2=\"300\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <rect id=\"l4b14-paper\" x=\"570\" y=\"290\" width=\"60\" height=\"40\" fill=\"#f5f5f0\" stroke=\"#fb923c\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <path id=\"l4b14-flame\" d=\"M 600 290 Q 590 270 600 250 Q 610 270 600 290 Z\" fill=\"#fb923c\" filter=\"url(#glow)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <path id=\"l4b14-smoke\" d=\"M 600 250 Q 595 230 605 220 Q 595 210 600 195\" fill=\"none\" stroke=\"#94a3b8\" stroke-width=\"2\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l4b14-label\" x=\"400\" y=\"500\" text-anchor=\"middle\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Paper BURNS at the focus!</text>\n</g>\n\n<!-- Beat 15: Real-life uses of lenses (NEW per choreography) -->\n<g class=\"el\" data-beat=\"15\">\n  <rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n  <rect id=\"l4b15-box\" x=\"100\" y=\"150\" width=\"600\" height=\"80\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l4b15-phrase\" x=\"400\" y=\"200\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Real-life uses of lenses</text>\n  <!-- Eyeglasses -->\n  <g id=\"l4b15-eyeglasses\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <circle cx=\"200\" cy=\"320\" r=\"40\" fill=\"rgba(127,219,255,0.15)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <circle cx=\"290\" cy=\"320\" r=\"40\" fill=\"rgba(127,219,255,0.15)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <line x1=\"240\" y1=\"320\" x2=\"250\" y2=\"320\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n    <text x=\"245\" y=\"400\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">EYEGLASSES</text>\n    <text x=\"245\" y=\"418\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">convex or concave</text>\n  </g>\n  <!-- Camera -->\n  <g id=\"l4b15-camera\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <rect x=\"380\" y=\"290\" width=\"100\" height=\"60\" rx=\"8\" fill=\"rgba(192,192,192,0.2)\" stroke=\"#cbd5e1\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <circle cx=\"430\" cy=\"320\" r=\"20\" fill=\"rgba(127,219,255,0.3)\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <text x=\"430\" y=\"400\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">CAMERA</text>\n    <text x=\"430\" y=\"418\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">convex lens</text>\n  </g>\n  <!-- Telescope -->\n  <g id=\"l4b15-telescope\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <rect x=\"540\" y=\"310\" width=\"120\" height=\"20\" rx=\"5\" fill=\"rgba(192,192,192,0.2)\" stroke=\"#cbd5e1\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <circle cx=\"600\" cy=\"320\" r=\"12\" fill=\"rgba(127,219,255,0.3)\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <text x=\"600\" y=\"400\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">TELESCOPE</text>\n    <text x=\"600\" y=\"418\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">lens combo</text>\n  </g>\n  <!-- Eye -->\n  <g id=\"l4b15-eye\" style=\"opacity:0;transition:opacity 0.6s ease\">\n    <ellipse cx=\"245\" cy=\"510\" rx=\"50\" ry=\"30\" fill=\"rgba(255,255,255,0.2)\" stroke=\"#f5f5f0\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n    <circle cx=\"245\" cy=\"510\" r=\"15\" fill=\"#7fdbff\" filter=\"url(#chalkLine)\"/>\n    <circle cx=\"245\" cy=\"510\" r=\"6\" fill=\"#1f2a24\"/>\n    <text x=\"245\" y=\"565\" text-anchor=\"middle\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">YOUR EYE</text>\n    <text x=\"245\" y=\"582\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">natural convex lens</text>\n  </g>\n</g>\n\n<!-- Beat 16: Closing summary (NEW per choreography) -->\n<g class=\"el\" data-beat=\"16\">\n  <rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n  <rect id=\"l4b16-box\" x=\"100\" y=\"180\" width=\"600\" height=\"240\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"3\" filter=\"url(#chalkLine)\" style=\"opacity:0;transition:opacity 0.6s ease\"/>\n  <text id=\"l4b16-title\" x=\"400\" y=\"220\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"22\" font-weight=\"700\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Chapter Complete!</text>\n  <text id=\"l4b16-line1\" x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#e2e8f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Mirrors REFLECT; lenses REFRACT</text>\n  <text id=\"l4b16-line2\" x=\"400\" y=\"300\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Concave MIRROR converges; convex MIRROR diverges</text>\n  <text id=\"l4b16-line3\" x=\"400\" y=\"330\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Convex LENS converges; concave LENS diverges</text>\n  <text id=\"l4b16-line4\" x=\"400\" y=\"380\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" font-style=\"italic\" filter=\"url(#chalk)\" style=\"opacity:0;transition:opacity 0.6s ease\">Keep exploring, keep questioning!</text>\n</g>\n",
      "beats": [
        "Welcome back, my young scientists! So far, we have studied mirrors — surfaces that REFLECT light, sending it back. Today we will meet a different kind of object: a LENS. A lens does not bounce light back; it lets light pass THROUGH. And as light passes through, the lens BENDS the light. Let us explore this together.",
        "Here is the key difference between a mirror and a lens. A mirror REFLECTS light — light bounces BACK from the shiny surface. You see things IN the mirror. A lens is different: it is TRANSPARENT — light passes THROUGH it. You see things THROUGH the lens, not in it. The lens bends the light as it passes through, and that bending is called REFRACTION.",
        "Let me tell you about a beautiful activity. Take a flat strip of glass or clear plastic — like a transparent ruler. Place a single drop of water on it. Look at the shape of the water drop — it is curved outward, like a tiny dome. This water drop is a tiny LENS. If you look at printed text through this water drop, the text appears ENLARGED! The water drop is acting as a magnifying glass.",
        "Have you seen a MAGNIFYING GLASS? It is a round piece of glass that helps us read very small print. The water drop in our activity worked exactly like a tiny magnifying glass! A magnifying glass is curved outward on both sides — it is thicker in the middle than at the edges. This shape is called a CONVEX lens.",
        "A CONVEX LENS is thicker at the MIDDLE than at the edges — like a magnifying glass, or like two bowls placed base-to-base. The word convex means bulging outward. Convex lenses CONVERGE light — they bring parallel rays of light together to meet at a point called the FOCUS.",
        "A CONCAVE LENS is thicker at the EDGES than at the middle — like two bowls placed rim-to-rim. The word concave means curving inward. Concave lenses DIVERGE light — they spread parallel rays of light apart, as if they were coming from a point behind the lens.",
        "Just like with mirrors, we draw lenses using SCHEMATIC REPRESENTATIONS. A convex lens is drawn as a vertical line with arrows pointing OUTWARD — the arrows remind us it bulges out. A concave lens is drawn as a vertical line with arrows pointing INWARD — the arrows remind us it caves in.",
        "Now, an important difference from mirrors: with a mirror, light bounces back — you see things IN the mirror. With a lens, light passes THROUGH — you see things THROUGH the lens. When you look through a convex lens, the image you see depends on how far the object is from the lens.",
        "Place an object behind a CONVEX lens, close to it, and look through the lens. The object appears ERECT and ENLARGED — just like the magnifying glass. This is why a convex lens is used as a magnifying glass for reading small print or examining tiny things.",
        "Now move the object FAR from the convex lens. As the distance grows, something dramatic happens. The image FLIPS — it becomes INVERTED. The image may also become smaller than the object. This is exactly how a camera lens works — it forms an inverted image on the camera's sensor.",
        "What about the CONCAVE lens? Here is a simple answer: NO MATTER where you place the object — close or far — the image through a concave lens is ALWAYS ERECT and ALWAYS DIMINISHED. The concave lens never enlarges; it always makes things look smaller. That is why it is used in spectacles for people who are short-sighted.",
        "Let us now do an experiment with PARALLEL BEAMS. Use the comb-and-torch setup from the previous lecture. Send parallel beams through a CONVEX lens. The beams CONVERGE — they meet at a point on the other side. This point is called the FOCUS of the convex lens.",
        "Now send the parallel beams through a CONCAVE lens. The beams SPREAD apart — they DIVERGE. This is why a concave lens is also called a DIVERGING lens, and a convex lens is also called a CONVERGING lens. The names tell you exactly what the lens does to light.",
        "Here is a dramatic activity, again under adult supervision. Take a convex lens and hold it facing the sun. Hold a small piece of paper behind the lens, at the focus. The parallel rays of sunlight converge on the paper, and the paper starts to smoke and burn! This is because all the sun's energy is concentrated at one tiny point.",
        "Where do we find lenses in real life? Everywhere! The EYEGLASSES that people wear to see clearly are lenses — convex for some, concave for others. A CAMERA has a convex lens that forms an inverted image on the sensor. A TELESCOPE uses a combination of lenses to see distant stars. Even your own EYE has a natural convex lens inside it!",
        "Today we have completed our journey through Light, Mirrors, and Lenses. We learned about plane, concave, and convex mirrors; the two laws of reflection; and how concave mirrors converge while convex mirrors diverge. We discovered that lenses refract light, with convex lenses converging and concave lenses diverging. The world of light is full of beautiful phenomena — keep exploring, keep questioning!"
      ],
      "timelines": [
        {
          "beat": 1,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l4b1-title"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b1-sub"
              ]
            }
          ]
        },
        {
          "beat": 2,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l4b2-mirror-icon"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l4b2-lens-icon"
              ]
            },
            {
              "delay": 8000,
              "draw": [
                "l4b2-box"
              ]
            },
            {
              "delay": 12000,
              "show": [
                "l4b2-phrase"
              ]
            }
          ]
        },
        {
          "beat": 3,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b3-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b3-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l4b3-icon"
              ]
            }
          ]
        },
        {
          "beat": 4,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b4-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b4-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l4b4-icon"
              ]
            }
          ]
        },
        {
          "beat": 5,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b5-lens"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b5-label"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l4b5-desc"
              ]
            }
          ]
        },
        {
          "beat": 6,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b6-lens"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b6-label"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l4b6-desc"
              ]
            }
          ]
        },
        {
          "beat": 7,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b7-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b7-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l4b7-visual"
              ]
            }
          ]
        },
        {
          "beat": 8,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b8-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b8-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l4b8-visual"
              ]
            }
          ]
        },
        {
          "beat": 9,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b9-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b9-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l4b9-visual"
              ]
            }
          ]
        },
        {
          "beat": 10,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b10-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b10-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l4b10-visual"
              ]
            }
          ]
        },
        {
          "beat": 11,
          "steps": [
            {
              "delay": 0,
              "draw": [
                "l4b11-box"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b11-phrase"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l4b11-visual"
              ]
            }
          ]
        },
        {
          "beat": 12,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l4b12-lens",
                "l4b12-lens-label"
              ]
            },
            {
              "delay": 3000,
              "show": [
                "l4b12-ray0",
                "l4b12-ray1",
                "l4b12-ray2"
              ]
            },
            {
              "delay": 9000,
              "show": [
                "l4b12-refl0",
                "l4b12-refl1",
                "l4b12-refl2"
              ]
            },
            {
              "delay": 15000,
              "show": [
                "l4b12-focus",
                "l4b12-flabel"
              ]
            },
            {
              "delay": 20000,
              "show": [
                "l4b12-label"
              ],
              "pulse": [
                "l4b12-label"
              ]
            }
          ]
        },
        {
          "beat": 13,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l4b13-lens",
                "l4b13-lens-label"
              ]
            },
            {
              "delay": 3000,
              "show": [
                "l4b13-ray0",
                "l4b13-ray1",
                "l4b13-ray2"
              ]
            },
            {
              "delay": 9000,
              "show": [
                "l4b13-refl0",
                "l4b13-refl1",
                "l4b13-refl2"
              ]
            },
            {
              "delay": 15000,
              "show": [
                "l4b13-label"
              ],
              "pulse": [
                "l4b13-label"
              ]
            }
          ]
        },
        {
          "beat": 14,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l4b14-sun",
                "l4b14-sun-label",
                "l4b14-lens"
              ]
            },
            {
              "delay": 4000,
              "show": [
                "l4b14-ray0",
                "l4b14-ray1",
                "l4b14-ray2"
              ]
            },
            {
              "delay": 10000,
              "show": [
                "l4b14-refl0",
                "l4b14-refl1",
                "l4b14-refl2"
              ]
            },
            {
              "delay": 16000,
              "show": [
                "l4b14-paper"
              ]
            },
            {
              "delay": 20000,
              "show": [
                "l4b14-flame"
              ]
            },
            {
              "delay": 24000,
              "show": [
                "l4b14-smoke"
              ]
            },
            {
              "delay": 28000,
              "show": [
                "l4b14-label"
              ],
              "pulse": [
                "l4b14-label"
              ]
            }
          ]
        },
        {
          "beat": 15,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l4b15-box"
              ]
            },
            {
              "delay": 2000,
              "show": [
                "l4b15-phrase"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b15-eyeglasses"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l4b15-camera"
              ]
            },
            {
              "delay": 11000,
              "show": [
                "l4b15-telescope"
              ]
            },
            {
              "delay": 14000,
              "show": [
                "l4b15-eye"
              ]
            }
          ]
        },
        {
          "beat": 16,
          "steps": [
            {
              "delay": 0,
              "show": [
                "l4b16-box"
              ]
            },
            {
              "delay": 2000,
              "show": [
                "l4b16-title"
              ]
            },
            {
              "delay": 5000,
              "show": [
                "l4b16-line1"
              ]
            },
            {
              "delay": 8000,
              "show": [
                "l4b16-line2"
              ]
            },
            {
              "delay": 11000,
              "show": [
                "l4b16-line3"
              ]
            },
            {
              "delay": 14000,
              "show": [
                "l4b16-line4"
              ],
              "pulse": [
                "l4b16-line4"
              ]
            }
          ]
        }
      ]
    }
  ],
  "notes": "\n<div class=\"notes-section\">\n  <h2>📝 Key Things to Remember</h2>\n\n  <h3>Before We Begin — Story-Time Words</h3>\n  <p>Here are 15 key words you will meet in this chapter. Read them once before you start; they will become your friends as you journey through light, mirrors, and lenses.</p>\n  <ol>\n    <li><strong>Mirror</strong> — a smooth, shiny surface that bounces (reflects) light back. Made of glass with a thin metal coating (silver or aluminium) on the back.</li>\n    <li><strong>Lens</strong> — a transparent piece of glass or plastic that bends (refracts) light as it passes through. Used to focus or spread light.</li>\n    <li><strong>Plane mirror</strong> — a flat mirror. Always forms an image of the same size as the object, always erect (right-side up).</li>\n    <li><strong>Concave mirror</strong> — a mirror that curves inward (like the inside of a spoon). Caves in. Converges light to a focus.</li>\n    <li><strong>Convex mirror</strong> — a mirror that bulges outward (like the back of a spoon). Puffs out. Diverges light.</li>\n    <li><strong>Convex lens</strong> — a lens that is thicker in the middle than at the edges. Converges parallel rays to a focus.</li>\n    <li><strong>Concave lens</strong> — a lens that is thinner in the middle than at the edges. Diverges parallel rays.</li>\n    <li><strong>Reflection</strong> — the bouncing of light off a surface. Mirrors reflect light.</li>\n    <li><strong>Refraction</strong> — the bending of light as it passes from one medium to another (e.g., through a lens). Lenses refract light.</li>\n    <li><strong>Incident ray</strong> — the ray of light that FALLS ON a mirror or lens.</li>\n    <li><strong>Reflected ray</strong> — the ray of light that BOUNCES BACK from a mirror.</li>\n    <li><strong>Normal</strong> — an imaginary line drawn perpendicular (at 90°) to the mirror surface at the point of incidence. Angles are measured from this line.</li>\n    <li><strong>Angle of incidence (i)</strong> — the angle between the normal and the incident ray.</li>\n    <li><strong>Angle of reflection (r)</strong> — the angle between the normal and the reflected ray. By Law 1, i = r.</li>\n    <li><strong>Focus (F)</strong> — the point where parallel rays converge after reflecting from a concave mirror or refracting through a convex lens.</li>\n  </ol>\n\n  <h3>Key Notes</h3>\n\n  <h4>Three Types of Mirrors</h4>\n  <table>\n    <tr><th>Mirror</th><th>Shape</th><th>Image Formed</th><th>Example</th></tr>\n    <tr><td>Plane</td><td>Flat</td><td>Same size, erect</td><td>Bathroom mirror</td></tr>\n    <tr><td>Concave</td><td>Curves inward (caves in)</td><td>Enlarged (close) OR inverted (far)</td><td>Torch reflector, dental mirror</td></tr>\n    <tr><td>Convex</td><td>Bulges outward (puffs out)</td><td>Always diminished, erect</td><td>Side-view mirror, road mirror</td></tr>\n  </table>\n\n  <h4>Two Types of Lenses</h4>\n  <table>\n    <tr><th>Lens</th><th>Shape</th><th>Action on Parallel Light</th><th>Real-life use</th></tr>\n    <tr><td>Convex</td><td>Thick middle</td><td>Converges (brings rays together at F)</td><td>Magnifying glass, camera, telescope, your eye</td></tr>\n    <tr><td>Concave</td><td>Thick edges</td><td>Diverges (spreads rays apart)</td><td>Spectacles for short-sightedness</td></tr>\n  </table>\n\n  <h4>Two Laws of Reflection</h4>\n  <ol>\n    <li><strong>Law 1:</strong> The angle of incidence equals the angle of reflection. (∠i = ∠r)</li>\n    <li><strong>Law 2:</strong> The incident ray, the normal, and the reflected ray all lie in the SAME plane.</li>\n  </ol>\n  <p>These laws apply to ALL mirrors — plane, concave, and convex.</p>\n\n  <h4>Quick Reference Card</h4>\n  <ul>\n    <li>Mirror → reflects (bounces back) → see things IN it.</li>\n    <li>Lens → refracts (bends through) → see things THROUGH it.</li>\n    <li>Concave MIRROR → converges (parallel rays meet at F)</li>\n    <li>Convex MIRROR → diverges (parallel rays spread apart)</li>\n    <li>Convex LENS → converges (parallel rays meet at F)</li>\n    <li>Concave LENS → diverges (parallel rays spread apart)</li>\n    <li>∠i = ∠r — measure both angles from the NORMAL, not the mirror surface.</li>\n  </ul>\n\n  <h4>Common Mistakes to Avoid</h4>\n  <ul>\n    <li>Measuring angles from the mirror surface instead of from the normal. ALWAYS measure from the normal (the dashed perpendicular line).</li>\n    <li>Confusing concave (caves IN) with convex (puffs OUT). Remember: cave = inward.</li>\n    <li>Thinking the focus is on the mirror surface. The focus is in front of the mirror (concave) or behind it (convex).</li>\n    <li>Forgetting that the convex mirror ALWAYS makes things smaller — never bigger, never inverted.</li>\n    <li>Confusing REFLECTION (mirrors) with REFRACTION (lenses). Mirrors bounce; lenses bend.</li>\n  </ul>\n\n  <h4>Memory Tricks</h4>\n  <ul>\n    <li>“CONCAVE = CAVES IN, CONVEX = PUFFS OUT” — say it aloud three times.</li>\n    <li>“CONVEX LENS = CONverges” — both start with “con”.</li>\n    <li>“CONCAVE LENS = DISC-CONCERTS” — okay, not great, but it might stick.</li>\n    <li>The normal is like a flagpole sticking straight out of the mirror. Angles are always measured from the flagpole.</li>\n    <li>i and r are like twins — whatever one does, the other does too. i = r always.</li>\n  </ul>\n\n  <h4>Real-Life Examples to Remember</h4>\n  <ul>\n    <li><strong>Torch reflector:</strong> concave mirror — sends out a strong parallel beam.</li>\n    <li><strong>Dentist's mirror:</strong> concave mirror — enlarges the view of teeth.</li>\n    <li><strong>Car side-view mirror:</strong> convex mirror — gives a wider view of the road.</li>\n    <li><strong>Road intersection mirror:</strong> convex mirror — helps drivers see around blind corners.</li>\n    <li><strong>Magnifying glass:</strong> convex lens — enlarges small print.</li>\n    <li><strong>Camera lens:</strong> convex lens — forms an inverted image on the sensor.</li>\n    <li><strong>Telescope:</strong> combination of lenses — magnifies distant objects.</li>\n    <li><strong>Your eye:</strong> contains a natural convex lens — focuses light onto the retina.</li>\n    <li><strong>Eyeglasses:</strong> convex for far-sightedness, concave for short-sightedness.</li>\n  </ul>\n\n  <h4>Safety Note</h4>\n  <p>The \"burning paper with sunlight\" activities (using a concave mirror or convex lens to focus sunlight) can start fires. Always do them outdoors, on a non-flammable surface, with adult supervision, and never look directly at the focused sunbeam — it can damage your eyes.</p>\n</div>\n",
  "practice": "\n<h2>✏️ Practice Problems</h2>\n<p>Try each question first, then click \"Show Answer\" to check.</p>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">1. What is the difference between a mirror and a lens?</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">A mirror REFLECTS light — it bounces light back from a shiny surface. You see things IN a mirror. A lens REFRACTS light — it bends light as the light passes THROUGH it. You see things THROUGH a lens. Mirrors are opaque (with a metal coating); lenses are transparent.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">2. Name the three types of mirrors. Give one real-life example of each.</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">1. Plane mirror — bathroom mirror. 2. Concave mirror — torch reflector, dentist's mirror. 3. Convex mirror — car side-view mirror, road mirror at intersections.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">3. Why does a concave mirror sometimes enlarge and sometimes invert the image?</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">It depends on the distance of the object from the mirror. When the object is CLOSE to the concave mirror, the image is ERECT and ENLARGED. When the object is FAR from the mirror (beyond the focus), the image becomes INVERTED (and may be enlarged, same-size, or diminished depending on the exact position).</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">4. State the two Laws of Reflection.</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">Law 1: The angle of incidence equals the angle of reflection. ∠i = ∠r. Law 2: The incident ray, the normal, and the reflected ray all lie in the same plane.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">5. From which line do we measure the angle of incidence and the angle of reflection — the mirror surface, or the normal?</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">Both angles are measured from the NORMAL — the dashed line drawn perpendicular (at 90°) to the mirror surface at the point of incidence. We do NOT measure from the mirror surface itself.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">6. What happens when an incident ray falls exactly along the normal?</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">When the incident ray falls along the normal, the angle of incidence i = 0. By Law 1, the angle of reflection r = 0 too. The reflected ray retraces the incident ray's path exactly — it goes back along the normal.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">7. What is the focus (F) of a concave mirror?</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">The focus (F) is the point in front of a concave mirror where parallel rays of light CONVERGE (meet) after reflecting off the mirror. It is halfway between the mirror's pole and its centre of curvature.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">8. Why does a convex mirror always give a diminished image?</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">A convex mirror DIVERGES parallel rays — they spread out as if coming from a virtual focus behind the mirror. Because the rays spread out instead of converging, the image formed is always smaller than the object (diminished) and always erect (right-side up), no matter where the object is placed.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">9. Distinguish between a convex lens and a concave lens.</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">Convex lens: thick in the middle, thin at the edges. It CONVERGES parallel rays to a focus. Used in magnifying glasses, cameras, telescopes, and the human eye. Concave lens: thin in the middle, thick at the edges. It DIVERGES parallel rays. Used in spectacles for short-sightedness.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">10. Why are convex mirrors used as side-view mirrors in cars?</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">A convex mirror always gives a diminished (smaller) image, which means it can fit MORE of the road into the mirror's view. The driver sees a wider field of view, reducing blind spots. That is why the mirror always has the warning: \"Objects in mirror are closer than they appear\" — they look smaller, so we underestimate their distance.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">11. What is refraction? How is it different from reflection?</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">Reflection is when light bounces OFF a surface (like a mirror) — the light does not enter the surface, it just turns back. Refraction is when light PASSES THROUGH a medium (like a lens or water) but gets BENT in the process — the light enters and exits, but its direction changes.</div>\n</div>\n\n<div class=\"practice-card\">\n  <div class=\"practice-q\">12. Name three real-life uses of lenses.</div>\n  <button class=\"reveal-btn\">Show Answer</button>\n  <div class=\"practice-a\" style=\"display:none;\">1. Magnifying glass (convex lens) — enlarges small print. 2. Camera (convex lens) — forms an inverted image on the sensor. 3. Telescope (combination of lenses) — magnifies distant stars. 4. Eyeglasses (convex or concave) — correct vision. 5. Human eye (natural convex lens) — focuses light onto the retina.</div>\n</div>\n",
  "realLife": [
    {
      "id": "torch",
      "title": "🔦 Torch Reflector",
      "viewBox": "0 0 800 600",
      "svg": "<defs>\n  <filter id=\"chalk\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"chalkLine\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"0.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n    <feGaussianBlur stdDeviation=\"4\" result=\"blur\"/>\n    <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <marker id=\"arrowChalk\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#f5f5f0\"/>\n  </marker>\n  <marker id=\"arrowCyan\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#7fdbff\"/>\n  </marker>\n  <marker id=\"arrowPink\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#ff8fab\"/>\n  </marker>\n  <marker id=\"arrowYellow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#fbbf24\"/>\n  </marker>\n</defs>\n<rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n<g class=\"el\" data-beat=\"1\">\n  <rect x=\"200\" y=\"220\" width=\"160\" height=\"160\" rx=\"20\" fill=\"rgba(192,192,192,0.2)\" stroke=\"#cbd5e1\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n  <path d=\"M 360 280 Q 380 300 360 320 L 360 280 Z\" fill=\"rgba(127,219,255,0.3)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n  <circle cx=\"280\" cy=\"300\" r=\"15\" fill=\"#fbbf24\" filter=\"url(#glow)\"/>\n  <text x=\"280\" y=\"410\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">torch body</text>\n  <text x=\"400\" y=\"280\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">concave reflector</text>\n  <text x=\"280\" y=\"330\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">bulb at F</text>\n</g>\n<g class=\"el\" data-beat=\"2\">\n  <line x1=\"380\" y1=\"300\" x2=\"650\" y2=\"300\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n  <line x1=\"380\" y1=\"280\" x2=\"650\" y2=\"280\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n  <line x1=\"380\" y1=\"320\" x2=\"650\" y2=\"320\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalkLine)\" marker-end=\"url(#arrowYellow)\"/>\n  <text x=\"500\" y=\"270\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">parallel beam</text>\n</g>\n<g class=\"el\" data-beat=\"3\">\n  <rect x=\"100\" y=\"450\" width=\"600\" height=\"100\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n  <text x=\"400\" y=\"500\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\">Bulb at focus → parallel beam out</text>\n</g>\n",
      "steps": [
        "Here is a torch cut open so you can see inside. The bulb sits at the focus of a concave mirror. The light from the bulb hits the mirror and reflects off as PARALLEL rays — a strong, focused beam that travels far.",
        "Because the bulb is at the focus, all the reflected rays come out parallel. That is why a torch can throw light a long distance in one direction.",
        "This is why torch reflectors are concave mirrors — they convert a small bulb's spreading light into a powerful parallel beam."
      ]
    },
    {
      "id": "dental",
      "title": "🦷 Dental Mirror",
      "viewBox": "0 0 800 600",
      "svg": "<defs>\n  <filter id=\"chalk\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"chalkLine\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"0.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n    <feGaussianBlur stdDeviation=\"4\" result=\"blur\"/>\n    <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <marker id=\"arrowChalk\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#f5f5f0\"/>\n  </marker>\n  <marker id=\"arrowCyan\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#7fdbff\"/>\n  </marker>\n  <marker id=\"arrowPink\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#ff8fab\"/>\n  </marker>\n  <marker id=\"arrowYellow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#fbbf24\"/>\n  </marker>\n</defs>\n<rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n<g class=\"el\" data-beat=\"1\">\n  <line x1=\"200\" y1=\"450\" x2=\"380\" y2=\"300\" stroke=\"#94a3b8\" stroke-width=\"4\" filter=\"url(#chalkLine)\"/>\n  <circle cx=\"380\" cy=\"300\" r=\"40\" fill=\"rgba(127,219,255,0.2)\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n  <text x=\"380\" y=\"230\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">concave mirror</text>\n  <text x=\"200\" y=\"475\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">handle</text>\n</g>\n<g class=\"el\" data-beat=\"2\">\n  <path d=\"M 500 280 Q 510 250 540 255 Q 555 255 560 280 Q 555 305 540 305 Q 510 310 500 280 Z\" fill=\"rgba(255,255,255,0.8)\" stroke=\"#f5f5f0\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n  <text x=\"530\" y=\"335\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">tooth</text>\n</g>\n<g class=\"el\" data-beat=\"3\">\n  <rect x=\"100\" y=\"450\" width=\"600\" height=\"100\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n  <text x=\"400\" y=\"500\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"18\" font-weight=\"700\" filter=\"url(#chalk)\">Concave mirror → enlarged view of teeth</text>\n</g>\n",
      "steps": [
        "When you visit the dentist, the doctor uses a small mirror on a stick to look inside your mouth.",
        "This mirror is a CONCAVE mirror. Because concave mirrors enlarge the image when the object is close, the dentist can see your teeth clearly — even tiny cavities that would be invisible to the naked eye.",
        "Without this mirror, the dentist would miss small problems. The concave mirror is an essential tool in every dentist's kit."
      ]
    },
    {
      "id": "sideview",
      "title": "🚗 Side-view Mirror",
      "viewBox": "0 0 800 600",
      "svg": "<defs>\n  <filter id=\"chalk\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"chalkLine\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"0.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n    <feGaussianBlur stdDeviation=\"4\" result=\"blur\"/>\n    <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <marker id=\"arrowChalk\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#f5f5f0\"/>\n  </marker>\n  <marker id=\"arrowCyan\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#7fdbff\"/>\n  </marker>\n  <marker id=\"arrowPink\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#ff8fab\"/>\n  </marker>\n  <marker id=\"arrowYellow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#fbbf24\"/>\n  </marker>\n</defs>\n<rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n<g class=\"el\" data-beat=\"1\">\n  <rect x=\"250\" y=\"200\" width=\"300\" height=\"80\" rx=\"15\" fill=\"rgba(180,220,255,0.2)\" stroke=\"#ff8fab\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n  <path d=\"M 280 220 Q 320 260 280 280\" fill=\"none\" stroke=\"#ff8fab\" stroke-width=\"3\" filter=\"url(#chalkLine)\"/>\n  <text x=\"400\" y=\"170\" text-anchor=\"middle\" fill=\"#ff8fab\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">CONVEX side-view mirror</text>\n</g>\n<g class=\"el\" data-beat=\"2\">\n  <rect x=\"100\" y=\"350\" width=\"120\" height=\"60\" rx=\"5\" fill=\"rgba(192,192,192,0.3)\" stroke=\"#cbd5e1\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n  <text x=\"160\" y=\"385\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">car</text>\n  <rect x=\"500\" y=\"350\" width=\"80\" height=\"40\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n  <text x=\"540\" y=\"375\" text-anchor=\"middle\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">truck</text>\n  <rect x=\"600\" y=\"360\" width=\"60\" height=\"30\" fill=\"rgba(127,219,255,0.2)\" stroke=\"#7fdbff\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n  <text x=\"630\" y=\"380\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">bike</text>\n  <text x=\"400\" y=\"450\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"13\" filter=\"url(#chalk)\">all visible in convex mirror</text>\n</g>\n<g class=\"el\" data-beat=\"3\">\n  <rect x=\"100\" y=\"500\" width=\"600\" height=\"80\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n  <text x=\"400\" y=\"545\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" font-weight=\"700\" filter=\"url(#chalk)\">Wider view → safer driving</text>\n</g>\n",
      "steps": [
        "Look at the side-view mirrors of cars, scooters, and buses. These are CONVEX mirrors.",
        "Because convex mirrors always give a diminished image, they fit more of the road into the mirror. The driver sees a wider view — including the car, truck, and bike behind, all at once.",
        "That is why the mirror always has the warning: 'Objects in mirror are closer than they appear.' The image looks smaller, so the brain thinks the object is farther away than it really is."
      ]
    },
    {
      "id": "magnifier",
      "title": "🔍 Magnifying Glass",
      "viewBox": "0 0 800 600",
      "svg": "<defs>\n  <filter id=\"chalk\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"chalkLine\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\">\n    <feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\" result=\"noise\"/>\n    <feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"0.8\" xChannelSelector=\"R\" yChannelSelector=\"G\"/>\n  </filter>\n  <filter id=\"glow\" x=\"-50%\" y=\"-50%\" width=\"200%\" height=\"200%\">\n    <feGaussianBlur stdDeviation=\"4\" result=\"blur\"/>\n    <feMerge><feMergeNode in=\"blur\"/><feMergeNode in=\"SourceGraphic\"/></feMerge>\n  </filter>\n  <marker id=\"arrowChalk\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#f5f5f0\"/>\n  </marker>\n  <marker id=\"arrowCyan\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#7fdbff\"/>\n  </marker>\n  <marker id=\"arrowPink\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#ff8fab\"/>\n  </marker>\n  <marker id=\"arrowYellow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n    <path d=\"M0,0 L8,3 L0,6 Z\" fill=\"#fbbf24\"/>\n  </marker>\n</defs>\n<rect width=\"800\" height=\"600\" fill=\"#1f2a24\"/>\n<g class=\"el\" data-beat=\"1\">\n  <circle cx=\"300\" cy=\"300\" r=\"80\" fill=\"rgba(127,219,255,0.2)\" stroke=\"#7fdbff\" stroke-width=\"4\" filter=\"url(#chalkLine)\"/>\n  <line x1=\"360\" y1=\"360\" x2=\"500\" y2=\"500\" stroke=\"#94a3b8\" stroke-width=\"10\" stroke-linecap=\"round\" filter=\"url(#chalkLine)\"/>\n  <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" filter=\"url(#chalk)\">convex lens</text>\n  <text x=\"490\" y=\"540\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">handle</text>\n</g>\n<g class=\"el\" data-beat=\"2\">\n  <text x=\"180\" y=\"450\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"11\" filter=\"url(#chalk)\">small print</text>\n  <text x=\"600\" y=\"300\" fill=\"#fbbf24\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\">ENLARGED!</text>\n  <line x1=\"220\" y1=\"430\" x2=\"600\" y2=\"300\" stroke=\"#fbbf24\" stroke-width=\"2\" stroke-dasharray=\"6 6\" filter=\"url(#chalkLine)\"/>\n</g>\n<g class=\"el\" data-beat=\"3\">\n  <rect x=\"100\" y=\"500\" width=\"600\" height=\"80\" fill=\"rgba(52,211,153,0.10)\" stroke=\"#34d399\" stroke-width=\"2\" filter=\"url(#chalkLine)\"/>\n  <text x=\"400\" y=\"545\" text-anchor=\"middle\" fill=\"#34d399\" font-family=\"'Comic Sans MS', cursive\" font-size=\"16\" font-weight=\"700\" filter=\"url(#chalk)\">Convex lens → magnifies when object is close</text>\n</g>\n",
      "steps": [
        "Here is a magnifying glass. It is a CONVEX lens — a round piece of glass that is thicker in the middle than at the edges.",
        "When you hold a magnifying glass close to small print, the print appears ENLARGED. This is because the convex lens bends the light from the print, making the image on your retina larger than the original object.",
        "Magnifying glasses are used by jewelers, watchmakers, stamp collectors, and anyone who needs to see tiny details clearly."
      ]
    }
  ],
  "guidedPractice": [
    {
      "title": "Identify the Mirror",
      "difficulty": "Easy",
      "diffClass": "gp-easy",
      "topic": "mirror-types",
      "statement": "A mirror curves INWARD, like the inside of a spoon. What type of mirror is it?",
      "viewBox": "0 0 460 540",
      "svg": "<defs>\n  <filter id=\"chalk\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\"/><feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\"/></filter>\n</defs>\n<rect width=\"460\" height=\"540\" fill=\"#1f2a24\"/>\n<g class=\"gel\" data-beat=\"1\">\n  <path d=\"M 280 100 Q 200 270 280 440\" fill=\"none\" stroke=\"#7fdbff\" stroke-width=\"4\" filter=\"url(#chalk)\"/>\n  <text x=\"180\" y=\"270\" text-anchor=\"end\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"20\" font-weight=\"700\" filter=\"url(#chalk)\">?</text>\n</g>",
      "steps": [
        {
          "prompt": "Type the name of this mirror.",
          "validate": {
            "type": "match",
            "answers": [
              "concave",
              "concave mirror"
            ]
          },
          "formatHint": "Example: concave",
          "explanation": "Yes! A mirror that curves INWARD (caves in) is called a CONCAVE mirror.",
          "hint": "Think: cave = inward."
        }
      ],
      "finalAnswer": "Concave mirror."
    },
    {
      "title": "Angle of Reflection",
      "difficulty": "Medium",
      "diffClass": "gp-med",
      "topic": "law-of-reflection",
      "statement": "An incident ray hits a plane mirror with an angle of incidence of 35 degrees. What is the angle of reflection?",
      "viewBox": "0 0 460 540",
      "svg": "<defs>\n  <filter id=\"chalk\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\"/><feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\"/></filter>\n</defs>\n<rect width=\"460\" height=\"540\" fill=\"#1f2a24\"/>\n<g class=\"gel\" data-beat=\"1\">\n  <line x1=\"300\" y1=\"100\" x2=\"300\" y2=\"440\" stroke=\"#f5f5f0\" stroke-width=\"3\" filter=\"url(#chalk)\"/>\n  <text x=\"310\" y=\"270\" fill=\"#f5f5f0\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">mirror</text>\n  <line x1=\"200\" y1=\"170\" x2=\"300\" y2=\"270\" stroke=\"#7fdbff\" stroke-width=\"3\" filter=\"url(#chalk)\"/>\n  <line x1=\"260\" y1=\"270\" x2=\"300\" y2=\"270\" stroke=\"#f4d35e\" stroke-width=\"2\" stroke-dasharray=\"6 6\" filter=\"url(#chalk)\"/>\n  <text x=\"240\" y=\"262\" text-anchor=\"end\" fill=\"#f4d35e\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">normal</text>\n  <text x=\"180\" y=\"200\" text-anchor=\"end\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">i = 35°</text>\n  <text x=\"180\" y=\"340\" text-anchor=\"end\" fill=\"#fb923c\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" filter=\"url(#chalk)\">r = ?</text>\n</g>",
      "steps": [
        {
          "prompt": "Apply Law 1 of Reflection. What is r?",
          "validate": {
            "type": "match",
            "answers": [
              "35",
              "35 degrees",
              "35°"
            ]
          },
          "formatHint": "Example: 35 or 35 degrees or 35°",
          "explanation": "Yes! By Law 1, angle of incidence = angle of reflection. So r = 35°.",
          "hint": "Law 1: ∠i = ∠r. If i = 35°, what is r?"
        }
      ],
      "finalAnswer": "Angle of reflection = 35° (by Law 1: ∠i = ∠r)."
    },
    {
      "title": "Match the Lens to the Image",
      "difficulty": "Medium",
      "diffClass": "gp-med",
      "topic": "lens-types",
      "statement": "A lens is thicker at the middle than at the edges. It CONVERGES parallel rays. What type of lens is it?",
      "viewBox": "0 0 460 540",
      "svg": "<defs>\n  <filter id=\"chalk\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\"/><feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\"/></filter>\n</defs>\n<rect width=\"460\" height=\"540\" fill=\"#1f2a24\"/>\n<g class=\"gel\" data-beat=\"1\">\n  <path d=\"M 230 100 Q 270 270 230 440 Q 190 270 230 100 Z\" fill=\"rgba(127,219,255,0.15)\" stroke=\"#7fdbff\" stroke-width=\"4\" filter=\"url(#chalk)\"/>\n  <text x=\"230\" y=\"490\" text-anchor=\"middle\" fill=\"#7fdbff\" font-family=\"'Comic Sans MS', cursive\" font-size=\"14\" font-weight=\"700\" filter=\"url(#chalk)\">?</text>\n</g>",
      "steps": [
        {
          "prompt": "Type the name of this lens.",
          "validate": {
            "type": "match",
            "answers": [
              "convex",
              "convex lens"
            ]
          },
          "formatHint": "Example: convex",
          "explanation": "Yes! A lens that is thick in the middle and converges light is a CONVEX lens.",
          "hint": "Think: con-verges (convex)."
        }
      ],
      "finalAnswer": "Convex lens."
    },
    {
      "title": "Which Mirror for a Torch?",
      "difficulty": "Medium",
      "diffClass": "gp-med",
      "topic": "mirror-applications",
      "statement": "A torch needs to send out a strong, PARALLEL beam of light. Which type of mirror is used inside the torch?",
      "viewBox": "0 0 460 540",
      "svg": "<defs>\n  <filter id=\"chalk\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\"/><feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\"/></filter>\n</defs>\n<rect width=\"460\" height=\"540\" fill=\"#1f2a24\"/>\n<g class=\"gel\" data-beat=\"1\">\n  <rect x=\"100\" y=\"200\" width=\"120\" height=\"120\" rx=\"20\" fill=\"rgba(192,192,192,0.2)\" stroke=\"#cbd5e1\" stroke-width=\"3\" filter=\"url(#chalk)\"/>\n  <line x1=\"220\" y1=\"260\" x2=\"420\" y2=\"260\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalk)\"/>\n  <line x1=\"220\" y1=\"240\" x2=\"420\" y2=\"240\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalk)\"/>\n  <line x1=\"220\" y1=\"280\" x2=\"420\" y2=\"280\" stroke=\"#fbbf24\" stroke-width=\"3\" filter=\"url(#chalk)\"/>\n  <text x=\"260\" y=\"360\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"12\" filter=\"url(#chalk)\">parallel beam out</text>\n</g>",
      "steps": [
        {
          "prompt": "Type the mirror type used inside a torch.",
          "validate": {
            "type": "match",
            "answers": [
              "concave",
              "concave mirror"
            ]
          },
          "formatHint": "Example: concave",
          "explanation": "Yes! A CONCAVE mirror is used inside a torch. The bulb is placed at the focus, so all reflected rays come out parallel — a strong beam.",
          "hint": "The mirror curves inward. Bulb sits at the focus."
        }
      ],
      "finalAnswer": "Concave mirror (bulb at focus → parallel beam)."
    },
    {
      "title": "Spot the Convex Mirror",
      "difficulty": "Easy",
      "diffClass": "gp-easy",
      "topic": "mirror-applications",
      "statement": "You are driving a car. Which type of mirror do you see on the side-view mirror (the one that says 'Objects in mirror are closer than they appear')?",
      "viewBox": "0 0 460 540",
      "svg": "<defs>\n  <filter id=\"chalk\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.02\" numOctaves=\"3\" seed=\"7\"/><feDisplacementMap in=\"SourceGraphic\" in2=\"noise\" scale=\"1.8\"/></filter>\n</defs>\n<rect width=\"460\" height=\"540\" fill=\"#1f2a24\"/>\n<g class=\"gel\" data-beat=\"1\">\n  <rect x=\"120\" y=\"200\" width=\"220\" height=\"100\" rx=\"20\" fill=\"rgba(180,220,255,0.2)\" stroke=\"#ff8fab\" stroke-width=\"3\" filter=\"url(#chalk)\"/>\n  <text x=\"230\" y=\"260\" text-anchor=\"middle\" fill=\"#94a3b8\" font-family=\"'Comic Sans MS', cursive\" font-size=\"10\" filter=\"url(#chalk)\">Objects are closer than they appear</text>\n</g>",
      "steps": [
        {
          "prompt": "Type the mirror type.",
          "validate": {
            "type": "match",
            "answers": [
              "convex",
              "convex mirror"
            ]
          },
          "formatHint": "Example: convex",
          "explanation": "Yes! Side-view mirrors are CONVEX — they always give a diminished (smaller) image, so they fit a wider view of the road.",
          "hint": "It bulges outward, gives a wider view, makes things look smaller."
        },
        {
          "prompt": "Why does this mirror make things look smaller? Type 'wider view' or 'diminished image'.",
          "validate": {
            "type": "regex",
            "pattern": "(wider view|diminished|smaller)",
            "flags": "i"
          },
          "formatHint": "Example: wider view",
          "explanation": "Yes! Convex mirrors give a diminished image, which fits more of the road into the mirror — a wider view.",
          "hint": "The image is always smaller (diminished)."
        }
      ],
      "finalAnswer": "Convex mirror — always diminished image, wider view of the road."
    }
  ],
  "selfTest": [
    {
      "q": "Name the three types of mirrors. Give one example of each.",
      "a": "1. Plane mirror (flat) — e.g., bathroom mirror. 2. Concave mirror (curves inward) — e.g., torch reflector, dental mirror. 3. Convex mirror (bulges outward) — e.g., car side-view mirror, road mirror at intersections.",
      "hint": "Plane = flat; concave = caves in; convex = puffs out."
    },
    {
      "q": "What does a concave mirror do to parallel rays of light?",
      "a": "A concave mirror CONVERGES parallel rays of light — they meet at a point called the FOCUS (F) in front of the mirror.",
      "hint": "Concave = converges."
    },
    {
      "q": "What does a convex mirror do to parallel rays of light?",
      "a": "A convex mirror DIVERGES parallel rays of light — they spread apart as if coming from a virtual focus behind the mirror.",
      "hint": "Convex = diverges."
    },
    {
      "q": "State the two Laws of Reflection.",
      "a": "Law 1: The angle of incidence equals the angle of reflection (∠i = ∠r). Law 2: The incident ray, the normal, and the reflected ray all lie in the SAME plane.",
      "hint": "One law is about angles; the other is about planes."
    },
    {
      "q": "From which line do we measure the angle of incidence — the mirror surface, or the normal?",
      "a": "We measure the angle of incidence from the NORMAL — the dashed line drawn perpendicular (at 90°) to the mirror surface at the point of incidence.",
      "hint": "It's NOT the mirror surface."
    },
    {
      "q": "What is the difference between reflection and refraction?",
      "a": "Reflection is when light bounces OFF a surface (like a mirror) — the light does not enter the surface. Refraction is when light PASSES THROUGH a medium (like a lens) and gets BENT in the process — the light enters and exits, but its direction changes.",
      "hint": "Mirrors do one; lenses do the other."
    },
    {
      "q": "What is the difference between a convex lens and a concave lens?",
      "a": "A convex lens is thick in the middle and thin at the edges; it CONVERGES parallel rays to a focus. A concave lens is thin in the middle and thick at the edges; it DIVERGES parallel rays.",
      "hint": "Convex = thick middle, converges. Concave = thin middle, diverges."
    },
    {
      "q": "Where is the focus (F) of a concave mirror located?",
      "a": "The focus of a concave mirror is in FRONT of the mirror — halfway between the mirror's pole (centre) and its centre of curvature. Parallel rays converge at this point after reflecting.",
      "hint": "It's in front of the mirror, not on the surface."
    },
    {
      "q": "Why are convex mirrors used as side-view mirrors in cars?",
      "a": "Because convex mirrors always give a diminished (smaller) image, they fit MORE of the road into the mirror's view. The driver sees a wider field, reducing blind spots. The trade-off: things look smaller (and thus farther) than they really are — hence the warning 'Objects in mirror are closer than they appear'.",
      "hint": "Smaller image = wider view = safer driving."
    },
    {
      "q": "Name three real-life uses of lenses.",
      "a": "1. Magnifying glass (convex lens) — enlarges small print. 2. Camera (convex lens) — forms an inverted image on the sensor. 3. Telescope (combination of lenses) — magnifies distant stars. 4. Eyeglasses — convex for far-sightedness, concave for short-sightedness. 5. Human eye — contains a natural convex lens.",
      "hint": "Think of objects that help us see better or capture images."
    }
  ]
};
