/* ============================================================
   CHAPTER DATA — Exploring Some Geometric Themes
   Subject: Mathematics (Grade 8, Ganita Prakash Part-II Chapter 4)
   ============================================================ */

window.CHAPTER_DATA = {
  "meta": {
    "subject": "maths",
    "slug": "exploring_geometric_themes",
    "title": "Exploring Some Geometric Themes",
    "subtitle": "Chapter 4 · Ganita Prakash · Grade 8 Part II",
    "chapterNumber": 4,
    "type": "svg",
    "intro": "Explore fractals — beautiful self-similar shapes from the Sierpinski Carpet to nature's ferns. Then visualise 3D solids from different viewpoints."
  },
  "lectures": [
    {
      "id": "fractals",
      "label": "4.1 Fractals — Self-Similar Shapes",
      "viewBox": "0 0 600 460",
      "svg": "<defs><linearGradient id=\"fernG\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0%\" stop-color=\"#34d399\"/><stop offset=\"100%\" stop-color=\"#065f46\"/></linearGradient></defs><g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"22\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">FRACTALS</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">Shapes that repeat themselves at smaller and smaller scales</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"150\" y=\"160\" fill=\"#34d399\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">🌿 Fern</text><path d=\"M 150 350 Q 140 280 145 240 Q 150 200 155 180 Q 140 220 135 260 Q 130 300 150 350\" fill=\"none\" stroke=\"url(#fernG)\" stroke-width=\"3\" class=\"anim-draw\" style=\"animation-delay: 0.15s\" /><path d=\"M 145 240 Q 130 230 120 235\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\" class=\"anim-draw\" style=\"animation-delay: 0.30s\" /><path d=\"M 145 220 Q 130 210 120 215\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\" class=\"anim-draw\" style=\"animation-delay: 0.45s\" /><path d=\"M 150 200 Q 135 190 125 195\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\" class=\"anim-draw\" style=\"animation-delay: 0.60s\" /><path d=\"M 155 180 Q 140 170 130 175\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\" class=\"anim-draw\" style=\"animation-delay: 0.75s\" /><text x=\"150\" y=\"380\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.90s\">Each leaf has smaller copies of itself!</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"130\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">Sierpinski Carpet</text><rect x=\"230\" y=\"150\" width=\"80\" height=\"80\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"2\" class=\"anim-pop-in\" style=\"animation-delay: 0.15s\" /><text x=\"270\" y=\"250\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\">Step 0</text><line x1=\"320\" y1=\"190\" x2=\"370\" y2=\"190\" stroke=\"#fbbf24\" stroke-width=\"1.5\" marker-end=\"url(#arrF)\" class=\"anim-draw\" style=\"animation-delay: 0.45s\" /><defs><marker id=\"arrF\" markerWidth=\"6\" markerHeight=\"6\" refX=\"3\" refY=\"3\" orient=\"auto\"><polygon points=\"0,0 6,3 0,6\" fill=\"#fbbf24\"/></marker></defs><g transform=\"translate(370,150)\"><rect x=\"0\" y=\"0\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"27\" y=\"0\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"54\" y=\"0\" width=\"26\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"0\" y=\"27\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"27\" y=\"27\" width=\"27\" height=\"27\" fill=\"#0f172a\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"54\" y=\"27\" width=\"26\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"0\" y=\"54\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"27\" y=\"54\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"54\" y=\"54\" width=\"26\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/></g><text x=\"410\" y=\"250\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\"   class=\"anim-fade-in\" style=\"animation-delay: 0.60s\">Step 1</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <rect x=\"60\" y=\"320\" width=\"480\" height=\"100\" rx=\"8\" fill=\"rgba(56,189,248,0.1)\" stroke=\"#38bdf8\" stroke-width=\"1.5\" class=\"anim-pop-in\" style=\"animation-delay: 0.00s\" /><text x=\"300\" y=\"345\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">Pattern: R_n = 8^n (remaining squares)</text><text x=\"300\" y=\"365\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\">Step 0: 1 square · Step 1: 8 · Step 2: 64 · Step 3: 512</text><text x=\"300\" y=\"390\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.45s\">Each step: break into 9, remove center, repeat on remaining 8</text>\n        </g><g class=\"el\" data-beat=\"5\">\n          <text x=\"300\" y=\"440\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"600\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">Also: Sierpinski Triangle (from equilateral triangles)</text>\n        </g>",
      "beats": [
        "Namaste, my young friend! Today we explore fractals — beautiful shapes that repeat themselves at smaller and smaller scales. The fern is a perfect example from nature: each leaf has smaller copies of itself, and those copies have even smaller copies!",
        "The Polish mathematician Sierpinski discovered fractals made from simple shapes. The Sierpinski Carpet starts with a square. Break it into 9 smaller squares, remove the center one. Then repeat on each of the remaining 8 squares — break each into 9, remove the center, and so on forever!",
        "Look at the pattern. At Step 0 we have 1 square. At Step 1 we have 8 remaining squares. At Step 2, each of those 8 gives rise to 8 more — so 8 x 8 = 64. The formula is R_n = 8^n — exponential growth! The number of remaining squares grows incredibly fast.",
        "Sierpinski also made a triangle version — the Sierpinski Gasket. Take an equilateral triangle, join the midpoints to make 4 smaller triangles, remove the center one. Repeat on the 3 remaining triangles. The result is a beautiful self-similar pattern!",
        "Fractals are everywhere in nature — ferns, trees, coastlines, clouds, lightning, mountains. They show us that mathematics is not just numbers on paper — it is the hidden pattern behind the beauty of the natural world. Ready? Let us turn the page..."
      ]
    },
    {
      "id": "visualising_solids",
      "label": "4.2 Visualising Solids",
      "viewBox": "0 0 600 460",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"22\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">VISUALISING SOLIDS</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">3D shapes from different viewpoints</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"150\" y=\"140\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">Front View</text><rect x=\"110\" y=\"160\" width=\"80\" height=\"60\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" stroke-width=\"2\" class=\"anim-pop-in\" style=\"animation-delay: 0.15s\" /><text x=\"150\" y=\"240\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\">Square</text><text x=\"300\" y=\"140\" fill=\"#34d399\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.45s\">Top View</text><rect x=\"260\" y=\"160\" width=\"80\" height=\"60\" fill=\"rgba(52,211,153,0.2)\" stroke=\"#34d399\" stroke-width=\"2\" class=\"anim-pop-in\" style=\"animation-delay: 0.60s\" /><text x=\"300\" y=\"240\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.75s\">Square</text><text x=\"450\" y=\"140\" fill=\"#f472b6\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.90s\">Side View</text><rect x=\"410\" y=\"160\" width=\"80\" height=\"60\" fill=\"rgba(244,114,182,0.2)\" stroke=\"#f472b6\" stroke-width=\"2\" class=\"anim-pop-in\" style=\"animation-delay: 1.05s\" /><text x=\"450\" y=\"240\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 1.20s\">Square</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"290\" fill=\"#a78bfa\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">What 3D shape has all 3 views as squares?</text><text x=\"300\" y=\"315\" fill=\"#fbbf24\" font-size=\"18\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">CUBE! 🔲</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <text x=\"150\" y=\"350\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">Front: Circle</text><circle cx=\"150\" cy=\"380\" r=\"25\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" stroke-width=\"2\" class=\"anim-pulse-in\" style=\"animation-delay: 0.15s\" /><text x=\"300\" y=\"350\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\">Top: Triangle</text><polygon points=\"280,400 320,400 300,365\" fill=\"rgba(52,211,153,0.2)\" stroke=\"#34d399\" stroke-width=\"2\" class=\"anim-pop-in\" style=\"animation-delay: 0.45s\" /><text x=\"450\" y=\"350\" fill=\"#f472b6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.60s\">Side: Triangle</text><polygon points=\"430,400 470,400 450,365\" fill=\"rgba(244,114,182,0.2)\" stroke=\"#f472b6\" stroke-width=\"2\" class=\"anim-pop-in\" style=\"animation-delay: 0.75s\" />\n        </g><g class=\"el\" data-beat=\"5\">\n          <text x=\"300\" y=\"430\" fill=\"#a78bfa\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">Front=circle, Top=triangle → CONE! 🔺</text>\n        </g>",
      "beats": [
        "Welcome back! Now let us visualise 3D solids from different viewpoints. Imagine you are looking at a shape from the front, from above, and from the side. Can you guess the 3D shape from these views?",
        "Here is a shape whose front view, top view, and side view are ALL squares. What 3D shape could this be? Think about it — a shape that looks like a square from every direction...",
        "It is a CUBE! A cube has equal length, width, and height — so every view is a perfect square. This is how architects and engineers communicate 3D shapes using 2D drawings.",
        "Now try this one. The front view is a circle. The top view is a triangle. The side view is also a triangle. What could this be? A circle from the front, but triangles from above and the side...",
        "It is a CONE! A cone has a circular base (so the front view is a circle), but its top view and side view are triangles because of the pointed apex. Visualising solids from different views is a key skill in geometry, engineering, and architecture. Ready? Let us turn the page..."
      ]
    }
  ],
  "notes": "<div style=\"background: linear-gradient(135deg, #064e3b 0%, #065f46 100%); border: 1px solid #34d399; border-radius: 14px; padding: 22px 24px; margin-bottom: 28px;\">\n<h2 style=\"color: #d1fae5; font-size: 22px; margin: 0 0 8px; font-weight: 700;\">📖 Before We Begin — Story-Time Words</h2>\n<p style=\"color: #d1fae5; font-size: 13px; margin: 0 0 16px; line-height: 1.6;\">My young friend, before we explore geometric themes, let us learn some special words about fractals and 3D shapes. Ready? Let's begin!</p>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #6ee7b7; font-size: 16px; margin: 0 0 8px;\">🌿 1. Fractal</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A shape that contains smaller copies of itself at every scale — self-similarity. Examples: ferns, trees, coastlines, the Sierpinski Carpet.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #6ee7b7; font-size: 16px; margin: 0 0 8px;\">🧩 2. Sierpinski Carpet</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A fractal made by: dividing a square into 9, removing the center, repeating on each remaining square. At step n: R_n = 8^n remaining squares.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #6ee7b7; font-size: 16px; margin: 0 0 8px;\">🔺 3. Sierpinski Gasket (Triangle)</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">An equilateral triangle divided into 4, removing the center, repeating on 3 remaining. Self-similar at every scale.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #6ee7b7; font-size: 16px; margin: 0 0 8px;\">🔮 4. Self-Similarity</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">When a shape contains smaller copies of itself. Zoom in and you see the same pattern again. Found in nature: ferns, trees, coastlines, lightning.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #6ee7b7; font-size: 16px; margin: 0 0 8px;\">📐 5. Visualising Solids</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">Looking at a 3D shape from different directions (front, top, side) to identify it. A cube looks like a square from all directions. A cone looks like a circle from the front and triangles from the top and side.</p></div>\n</div>\n\n<h2>📝 Key Notes — Chapter 4: Exploring Some Geometric Themes</h2>\n<h3>Fractals</h3>\n<table class=\"styled-table\">\n<tr><th>Fractal</th><th>How it's made</th><th>Formula</th></tr>\n<tr><td><strong>Sierpinski Carpet</strong></td><td>Square → 9 parts → remove center → repeat on 8 remaining</td><td>R_n = 8^n</td></tr>\n<tr><td><strong>Sierpinski Gasket</strong></td><td>Triangle → 4 parts → remove center → repeat on 3 remaining</td><td>3^n remaining triangles</td></tr>\n</table>\n<h3>Visualising Solids</h3>\n<table class=\"styled-table\">\n<tr><th>3D Shape</th><th>Front View</th><th>Top View</th><th>Side View</th></tr>\n<tr><td>Cube</td><td>Square</td><td>Square</td><td>Square</td></tr>\n<tr><td>Cone</td><td>Circle</td><td>Triangle</td><td>Triangle</td></tr>\n<tr><td>Cylinder</td><td>Rectangle</td><td>Circle</td><td>Rectangle</td></tr>\n</table>\n<div class=\"card tip\"><p><strong>Memory trick:</strong> \"Self-similar = same at every scale.\" Think fern — each leaf is a mini fern. Sierpinski: break, remove center, repeat forever.</p></div>",
  "practice": "<h2>✏️ Practice</h2>\n<div class=\"practice-card\">\n<h3>🧠 Quick Recall</h3>\n<ol>\n<li>A ___ is a shape that contains smaller copies of itself. (fractal)</li>\n<li>In the Sierpinski Carpet, the number of remaining squares at step n is ___. (8ⁿ)</li>\n<li>A cone's front view is a ___ and its top view is a ___. (circle, triangle)</li>\n<li>A cube's front, top, and side views are all ___. (squares)</li>\n<li>___ means the shape looks the same at every scale. (self-similarity)</li>\n</ol>\n<button class=\"reveal-btn\" onclick=\"this.nextElementSibling.style.display='block';this.style.display='none'\">Reveal Answers</button>\n<div class=\"reveal-answer\" style=\"display:none\"><ol><li>fractal</li><li>8ⁿ</li><li>circle, triangle</li><li>squares</li><li>self-similarity</li></ol></div>\n</div>",
  "realLife": [
    {
      "id": "fractals_nature",
      "title": "🌿 1. Fractals in Nature",
      "viewBox": "0 0 600 400",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"18\" font-weight=\"700\">Fractals are everywhere!</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">Ferns, trees, coastlines, clouds, lightning, mountains</text><text x=\"300\" y=\"270\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\">Mathematics is the hidden pattern behind nature</text>\n        </g>",
      "beats": [
        "Fractals are not just mathematical curiosities — they are everywhere in nature! The fern has smaller copies of itself as leaves, and those leaves have even smaller copies. Trees branch the same way at every scale: trunk → limb → branch → twig. Coastlines look jagged whether you view them from space or from the beach. Clouds, lightning, mountains, and even blood vessels in your body show fractal patterns. Mathematics is not separate from nature — it IS the hidden pattern behind the beauty of the natural world."
      ]
    }
  ],
  "guidedPractice": [
    {
      "title": "Sierpinski Carpet — how many squares at step 2?",
      "difficulty": "Medium",
      "diffClass": "gp-med",
      "statement": "In the Sierpinski Carpet, R_n = 8^n. How many remaining squares at step 2?",
      "viewBox": "0 0 800 300",
      "svg": "<g class=\"gel\" data-beat=\"1\"><text x=\"400\" y=\"150\" fill=\"#fbbf24\" font-size=\"14\" text-anchor=\"middle\">R_2 = 8² = ?</text></g>",
      "steps": [
        {
          "prompt": "What is 8² (8 squared)?",
          "validate": {
            "type": "pureNum",
            "value": 64
          },
          "formatHint": "Example: 60",
          "explanation": "Yes! 8² = 64. At step 2, there are 64 remaining squares.",
          "hint": "8 × 8 = ?"
        }
      ],
      "finalAnswer": "R_2 = 8² = 64 remaining squares."
    }
  ],
  "selfTest": [
    {
      "q": "What is a fractal? Give one natural example.",
      "steps": "A shape that contains smaller copies of itself at every scale (self-similarity).<br>Example: fern — each leaf is a smaller copy of the whole fern.",
      "answer": "A fractal is a self-similar shape. Natural example: fern."
    },
    {
      "q": "In the Sierpinski Carpet, what is the formula for the number of remaining squares at step n?",
      "steps": "R_n = 8^n. Step 0: 1, Step 1: 8, Step 2: 64, Step 3: 512.",
      "answer": "R_n = 8^n"
    },
    {
      "q": "What 3D shape has a square as its front, top, and side view?",
      "steps": "All three views are squares → the shape must have equal length, width, and height → it is a CUBE.",
      "answer": "A cube."
    },
    {
      "q": "What 3D shape has a circle as front view and triangles as top and side views?",
      "steps": "Circle from front = circular base. Triangles from top and side = pointed apex → CONE.",
      "answer": "A cone."
    }
  ]
};
