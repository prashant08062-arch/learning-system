/* ============================================================
   CHAPTER DATA — Exploring Geometric Themes, Tales by Dots
   and Lines, Algebra Play, and Area
   Subject: Mathematics (Grade 8, Ganita Prakash Part-II Ch 4-7)
   ============================================================
   Combined chapter covering 4 NCERT chapters:
   • Ch.4: Exploring Some Geometric Themes (fractals, solids)
   • Ch.5: Tales by Dots and Lines (mean, median, dot plots)
   • Ch.6: Algebra Play (number tricks, pyramids, divisibility)
   • Ch.7: Area (rectangles, triangles, parallelograms, trapeziums)
   Structure follows the Class 6 Civics pattern (concise SVG-based).
   ============================================================ */

window.CHAPTER_DATA = {
  "meta": {
    "subject": "maths",
    "slug": "geometric_themes_area",
    "title": "Exploring Geometric Themes, Tales by Dots and Lines, Algebra Play, and Area",
    "subtitle": "Chapters 4–7 · Ganita Prakash · Grade 8 Part II",
    "chapterNumber": 4,
    "type": "svg",
    "intro": "Explore fractals, visualise solids, discover the mean as a balance point, play with algebra tricks and number pyramids, and master area formulas for rectangles, triangles, parallelograms, and trapeziums — all in one combined chapter covering NCERT Grade 8 Part-II Chapters 4 to 7."
  },
  "lectures": [
    {
      "id": "fractals",
      "label": "4.1 Fractals — Self-Similar Shapes",
      "viewBox": "0 0 600 460",
      "svg": "<defs><linearGradient id=\"fernG\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0%\" stop-color=\"#34d399\"/><stop offset=\"100%\" stop-color=\"#065f46\"/></linearGradient></defs><g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"22\" font-weight=\"700\">FRACTALS</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">Shapes that repeat themselves at smaller and smaller scales</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"150\" y=\"160\" fill=\"#34d399\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\">🌿 Fern</text><path d=\"M 150 350 Q 140 280 145 240 Q 150 200 155 180 Q 140 220 135 260 Q 130 300 150 350\" fill=\"none\" stroke=\"url(#fernG)\" stroke-width=\"3\"/><path d=\"M 145 240 Q 130 230 120 235\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\"/><path d=\"M 145 220 Q 130 210 120 215\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\"/><path d=\"M 150 200 Q 135 190 125 195\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\"/><path d=\"M 155 180 Q 140 170 130 175\" fill=\"none\" stroke=\"#34d399\" stroke-width=\"1.5\"/><text x=\"150\" y=\"380\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\">Each leaf has smaller copies of itself!</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"130\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\">Sierpinski Carpet</text><rect x=\"230\" y=\"150\" width=\"80\" height=\"80\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"270\" y=\"250\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\">Step 0</text><line x1=\"320\" y1=\"190\" x2=\"370\" y2=\"190\" stroke=\"#fbbf24\" stroke-width=\"1.5\" marker-end=\"url(#arrF)\"/><defs><marker id=\"arrF\" markerWidth=\"6\" markerHeight=\"6\" refX=\"3\" refY=\"3\" orient=\"auto\"><polygon points=\"0,0 6,3 0,6\" fill=\"#fbbf24\"/></marker></defs><g transform=\"translate(370,150)\"><rect x=\"0\" y=\"0\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"27\" y=\"0\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"54\" y=\"0\" width=\"26\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"0\" y=\"27\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"27\" y=\"27\" width=\"27\" height=\"27\" fill=\"#0f172a\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"54\" y=\"27\" width=\"26\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"0\" y=\"54\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"27\" y=\"54\" width=\"27\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/><rect x=\"54\" y=\"54\" width=\"26\" height=\"27\" fill=\"none\" stroke=\"#fbbf24\" stroke-width=\"1.5\"/></g><text x=\"410\" y=\"250\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\">Step 1</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <rect x=\"60\" y=\"320\" width=\"480\" height=\"100\" rx=\"8\" fill=\"rgba(56,189,248,0.1)\" stroke=\"#38bdf8\" stroke-width=\"1.5\"/><text x=\"300\" y=\"345\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"700\">Pattern: R_n = 8^n (remaining squares)</text><text x=\"300\" y=\"365\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"12\">Step 0: 1 square · Step 1: 8 · Step 2: 64 · Step 3: 512</text><text x=\"300\" y=\"390\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\">Each step: break into 9, remove center, repeat on remaining 8</text>\n        </g><g class=\"el\" data-beat=\"5\">\n          <text x=\"300\" y=\"440\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"600\">Also: Sierpinski Triangle (from equilateral triangles)</text>\n        </g>",
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
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"22\" font-weight=\"700\">VISUALISING SOLIDS</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">3D shapes from different viewpoints</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"150\" y=\"140\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\">Front View</text><rect x=\"110\" y=\"160\" width=\"80\" height=\"60\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"150\" y=\"240\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\">Square</text><text x=\"300\" y=\"140\" fill=\"#34d399\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\">Top View</text><rect x=\"260\" y=\"160\" width=\"80\" height=\"60\" fill=\"rgba(52,211,153,0.2)\" stroke=\"#34d399\" stroke-width=\"2\"/><text x=\"300\" y=\"240\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\">Square</text><text x=\"450\" y=\"140\" fill=\"#f472b6\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\">Side View</text><rect x=\"410\" y=\"160\" width=\"80\" height=\"60\" fill=\"rgba(244,114,182,0.2)\" stroke=\"#f472b6\" stroke-width=\"2\"/><text x=\"450\" y=\"240\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\">Square</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"290\" fill=\"#a78bfa\" font-size=\"14\" font-weight=\"700\" text-anchor=\"middle\">What 3D shape has all 3 views as squares?</text><text x=\"300\" y=\"315\" fill=\"#fbbf24\" font-size=\"18\" font-weight=\"700\" text-anchor=\"middle\">CUBE! 🔲</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <text x=\"150\" y=\"350\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">Front: Circle</text><circle cx=\"150\" cy=\"380\" r=\"25\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" stroke-width=\"2\"/><text x=\"300\" y=\"350\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">Top: Triangle</text><polygon points=\"280,400 320,400 300,365\" fill=\"rgba(52,211,153,0.2)\" stroke=\"#34d399\" stroke-width=\"2\"/><text x=\"450\" y=\"350\" fill=\"#f472b6\" font-size=\"12\" font-weight=\"700\" text-anchor=\"middle\">Side: Triangle</text><polygon points=\"430,400 470,400 450,365\" fill=\"rgba(244,114,182,0.2)\" stroke=\"#f472b6\" stroke-width=\"2\"/>\n        </g><g class=\"el\" data-beat=\"5\">\n          <text x=\"300\" y=\"430\" fill=\"#a78bfa\" font-size=\"13\" font-weight=\"700\" text-anchor=\"middle\">Front=circle, Top=triangle → CONE! 🔺</text>\n        </g>",
      "beats": [
        "Welcome back! Now let us visualise 3D solids from different viewpoints. Imagine you are looking at a shape from the front, from above, and from the side. Can you guess the 3D shape from these views?",
        "Here is a shape whose front view, top view, and side view are ALL squares. What 3D shape could this be? Think about it — a shape that looks like a square from every direction...",
        "It is a CUBE! A cube has equal length, width, and height — so every view is a perfect square. This is how architects and engineers communicate 3D shapes using 2D drawings.",
        "Now try this one. The front view is a circle. The top view is a triangle. The side view is also a triangle. What could this be? A circle from the front, but triangles from above and the side...",
        "It is a CONE! A cone has a circular base (so the front view is a circle), but its top view and side view are triangles because of the pointed apex. Visualising solids from different views is a key skill in geometry, engineering, and architecture. Ready? Let us turn the page..."
      ]
    },
    {
      "id": "mean_balancing",
      "label": "5.1 The Balancing Act — Mean",
      "viewBox": "0 0 600 460",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"22\" font-weight=\"700\">THE BALANCING ACT</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">Understanding the mean as a balance point</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <line x1=\"100\" y1=\"300\" x2=\"500\" y2=\"300\" stroke=\"#fbbf24\" stroke-width=\"3\"/><circle cx=\"180\" cy=\"290\" r=\"8\" fill=\"#34d399\"/><circle cx=\"220\" cy=\"290\" r=\"8\" fill=\"#34d399\"/><text x=\"200\" y=\"275\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"11\">3</text><circle cx=\"380\" cy=\"290\" r=\"8\" fill=\"#f472b6\"/><text x=\"380\" y=\"275\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"11\">7</text><polygon points=\"295,310 305,310 300,325\" fill=\"#fbbf24\"/><text x=\"300\" y=\"345\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\">Mean = 5</text><text x=\"200\" y=\"355\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\">distance 2</text><text x=\"380\" y=\"355\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\">distance 2</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"390\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"700\">The mean balances the distances on both sides!</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <rect x=\"60\" y=\"400\" width=\"480\" height=\"45\" rx=\"8\" fill=\"rgba(132,204,22,0.1)\" stroke=\"#84cc16\" stroke-width=\"1.5\"/><text x=\"300\" y=\"425\" text-anchor=\"middle\" fill=\"#84cc16\" font-size=\"12\" font-weight=\"700\">Sum of distances LEFT of mean = Sum of distances RIGHT</text>\n        </g>",
      "beats": [
        "Welcome to Tales by Dots and Lines! Today we explore the mean from a new perspective — as a balance point. The mean is not just a formula; it is the centre where the data 'balances'.",
        "Look at two numbers: 3 and 7. Their mean is (3+7)/2 = 5. If we place them on a number line, the mean sits exactly in the middle. The distance from 3 to 5 is 2, and the distance from 5 to 7 is also 2. The mean balances the distances!",
        "This is the key insight: the sum of distances from values BELOW the mean equals the sum of distances from values ABOVE the mean. The mean is the unique point where the total 'pull' from the left equals the total 'pull' from the right.",
        "This balancing property holds for any set of numbers. Try it with 10, 10, 11, 17 — the mean is 12. Distances below: (12-10)+(12-10)+(12-11) = 2+2+1 = 5. Distance above: (17-12) = 5. They balance! Ready? Let us turn the page..."
      ]
    },
    {
      "id": "median_dot_plots",
      "label": "5.2 Median and Dot Plots",
      "viewBox": "0 0 600 460",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"22\" font-weight=\"700\">MEDIAN &amp; DOT PLOTS</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">The middle value when data is sorted</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"300\" y=\"270\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"700\">Data: 4, 7, 9, 12, 15</text><circle cx=\"160\" cy=\"300\" r=\"6\" fill=\"#34d399\"/><text x=\"160\" y=\"285\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">4</text><circle cx=\"230\" cy=\"300\" r=\"6\" fill=\"#34d399\"/><text x=\"230\" y=\"285\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\">7</text><circle cx=\"300\" cy=\"300\" r=\"8\" fill=\"#fbbf24\" stroke=\"#fff\" stroke-width=\"2\"/><text x=\"300\" y=\"285\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"700\">9</text><circle cx=\"370\" cy=\"300\" r=\"6\" fill=\"#f472b6\"/><text x=\"370\" y=\"285\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"10\">12</text><circle cx=\"440\" cy=\"300\" r=\"6\" fill=\"#f472b6\"/><text x=\"440\" y=\"285\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"10\">15</text><text x=\"300\" y=\"330\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\">Median = 9 (middle value)</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"370\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"700\">Adding a new value changes the mean but may not change the median</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <rect x=\"60\" y=\"390\" width=\"480\" height=\"55\" rx=\"8\" fill=\"rgba(167,139,250,0.1)\" stroke=\"#a78bfa\" stroke-width=\"1.5\"/><text x=\"300\" y=\"415\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\" font-weight=\"700\">Mean: sum of distances balanced (sensitive to outliers)</text><text x=\"300\" y=\"435\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\" font-weight=\"700\">Median: middle value (resistant to outliers)</text>\n        </g>",
      "beats": [
        "The median is the middle value when data is sorted. For 5 numbers — 4, 7, 9, 12, 15 — the median is 9, the third value. Half the data is below it, half is above.",
        "Dot plots help us see the median visually. Each dot is a data point. The median is the dot in the middle. For an even number of values, the median is the average of the two middle values.",
        "The mean and median behave differently when new values are added. Adding a very large value pulls the mean up significantly, but the median may barely change. This is why the median is called 'resistant to outliers'.",
        "So remember: the mean is sensitive to extreme values (outliers), while the median is resistant. When a billionaire walks into a room of ordinary people, the mean income jumps — but the median barely moves! Both are useful, but they tell different stories about the data. Ready? Let us turn the page..."
      ]
    },
    {
      "id": "think_of_number",
      "label": "6.2 Think of a Number Tricks",
      "viewBox": "0 0 600 460",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"160\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"20\" font-weight=\"700\">ALGEBRA PLAY</text><text x=\"300\" y=\"190\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">Think of a number... let algebra reveal the magic!</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"100\" y=\"240\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\">Step</text><text x=\"200\" y=\"240\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\">Instruction</text><text x=\"400\" y=\"240\" fill=\"#f472b6\" font-size=\"12\" font-weight=\"700\">Algebra</text><line x1=\"80\" y1=\"250\" x2=\"520\" y2=\"250\" stroke=\"#334155\" stroke-width=\"1\"/><text x=\"100\" y=\"270\" fill=\"#cbd5e1\" font-size=\"11\">1.</text><text x=\"200\" y=\"270\" fill=\"#cbd5e1\" font-size=\"11\">Think of a number</text><text x=\"400\" y=\"270\" fill=\"#f472b6\" font-size=\"12\">x</text><text x=\"100\" y=\"290\" fill=\"#cbd5e1\" font-size=\"11\">2.</text><text x=\"200\" y=\"290\" fill=\"#cbd5e1\" font-size=\"11\">Double it</text><text x=\"400\" y=\"290\" fill=\"#f472b6\" font-size=\"12\">2x</text><text x=\"100\" y=\"310\" fill=\"#cbd5e1\" font-size=\"11\">3.</text><text x=\"200\" y=\"310\" fill=\"#cbd5e1\" font-size=\"11\">Add four</text><text x=\"400\" y=\"310\" fill=\"#f472b6\" font-size=\"12\">2x + 4</text><text x=\"100\" y=\"330\" fill=\"#cbd5e1\" font-size=\"11\">4.</text><text x=\"200\" y=\"330\" fill=\"#cbd5e1\" font-size=\"11\">Divide by 2</text><text x=\"400\" y=\"330\" fill=\"#f472b6\" font-size=\"12\">x + 2</text><text x=\"100\" y=\"350\" fill=\"#cbd5e1\" font-size=\"11\">5.</text><text x=\"200\" y=\"350\" fill=\"#cbd5e1\" font-size=\"11\">Subtract original</text><text x=\"400\" y=\"350\" fill=\"#f472b6\" font-size=\"12\">x + 2 - x = 2</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <rect x=\"150\" y=\"370\" width=\"300\" height=\"50\" rx=\"8\" fill=\"rgba(132,204,22,0.15)\" stroke=\"#84cc16\" stroke-width=\"2\"/><text x=\"300\" y=\"400\" text-anchor=\"middle\" fill=\"#84cc16\" font-size=\"16\" font-weight=\"700\">Answer is always 2! ✨</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <text x=\"300\" y=\"440\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\">No matter what x is — the x cancels out!</text>\n        </g>",
      "beats": [
        "Welcome to Algebra Play! Today we explore 'Think of a Number' tricks — and use algebra to explain why they always work. Think of a number, any number!",
        "Here is the trick: (1) Think of a number — let's call it x. (2) Double it — 2x. (3) Add four — 2x + 4. (4) Divide by 2 — x + 2. (5) Subtract the original number — x + 2 - x = 2. The answer is ALWAYS 2, no matter what number you started with!",
        "That is the magic of algebra! The variable x cancels out perfectly, leaving a constant. No matter what the starting number is — 5, 100, or -3.7 — the answer is always 2. This is why algebra is so powerful: it reveals the hidden structure behind seemingly magical tricks.",
        "Now try designing your own trick! To make the answer 3 instead of 2, change step 3 to 'Add six' (2x + 6, divided by 2 = x + 3, minus x = 3). To make the answer 5, change step 3 to 'Add ten'. You can invent endless tricks using the same algebraic structure. Ready? Let us turn the page..."
      ]
    },
    {
      "id": "number_pyramids",
      "label": "6.3 Number Pyramids",
      "viewBox": "0 0 600 460",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"160\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"20\" font-weight=\"700\">NUMBER PYRAMIDS</text><text x=\"300\" y=\"190\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">Each block = sum of the two blocks below it</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"180\" y=\"250\" fill=\"#fbbf24\" font-size=\"12\">Bottom row:</text><rect x=\"170\" y=\"260\" width=\"40\" height=\"30\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" rx=\"4\"/><text x=\"190\" y=\"280\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\">3</text><rect x=\"220\" y=\"260\" width=\"40\" height=\"30\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" rx=\"4\"/><text x=\"240\" y=\"280\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\">5</text><rect x=\"270\" y=\"260\" width=\"40\" height=\"30\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" rx=\"4\"/><text x=\"290\" y=\"280\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\">7</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"280\" y=\"230\" fill=\"#34d399\" font-size=\"12\">Middle row:</text><rect x=\"195\" y=\"220\" width=\"40\" height=\"30\" fill=\"rgba(52,211,153,0.2)\" stroke=\"#34d399\" rx=\"4\"/><text x=\"215\" y=\"240\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\">8</text><rect x=\"245\" y=\"220\" width=\"40\" height=\"30\" fill=\"rgba(52,211,153,0.2)\" stroke=\"#34d399\" rx=\"4\"/><text x=\"265\" y=\"240\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\">12</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <text x=\"370\" y=\"195\" fill=\"#f472b6\" font-size=\"12\">Top:</text><rect x=\"220\" y=\"180\" width=\"40\" height=\"30\" fill=\"rgba(244,114,182,0.2)\" stroke=\"#f472b6\" rx=\"4\"/><text x=\"240\" y=\"200\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"12\" font-weight=\"700\">20</text>\n        </g><g class=\"el\" data-beat=\"5\">\n          <rect x=\"60\" y=\"310\" width=\"480\" height=\"55\" rx=\"8\" fill=\"rgba(167,139,250,0.1)\" stroke=\"#a78bfa\" stroke-width=\"1.5\"/><text x=\"300\" y=\"335\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\" font-weight=\"700\">Algebraically: if bottom row is a, b, c...</text><text x=\"300\" y=\"355\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"11\">Top = (a+b) + (b+c) = a + 2b + c</text>\n        </g><g class=\"el\" data-beat=\"6\">\n          <text x=\"300\" y=\"410\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\">Try: bottom row x, 1, x → top = 2x + 1 (always odd!)</text><text x=\"300\" y=\"435\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\">Algebra reveals hidden patterns in number pyramids</text>\n        </g>",
      "beats": [
        "Number pyramids are a beautiful puzzle! Each block in the pyramid is the SUM of the two blocks directly below it. Let's see how it works.",
        "Start with the bottom row: 3, 5, 7. The middle row blocks are each the sum of two adjacent bottom blocks: 3+5=8 and 5+7=12.",
        "The top block is the sum of the two middle blocks: 8+12=20. So the pyramid goes: bottom 3, 5, 7 → middle 8, 12 → top 20. Simple!",
        "But here is the algebraic magic. If the bottom row is a, b, c, then the middle row is (a+b) and (b+c). The top is (a+b)+(b+c) = a + 2b + c. This formula works for ANY three numbers!",
        "Try this: put x, 1, x in the bottom row. The top becomes x + 2(1) + x = 2x + 1 — which is ALWAYS an odd number! No matter what x is, the top of this pyramid is odd. Algebra reveals the hidden pattern. Ready? Let us turn the page..."
      ]
    },
    {
      "id": "area_rectangles",
      "label": "7.1 Area of Rectangles & Triangles",
      "viewBox": "0 0 600 460",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"160\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"20\" font-weight=\"700\">AREA</text><text x=\"300\" y=\"190\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">Measuring regions by counting unit squares</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <rect x=\"150\" y=\"220\" width=\"140\" height=\"80\" fill=\"rgba(56,189,248,0.15)\" stroke=\"#38bdf8\" stroke-width=\"2\"/><text x=\"220\" y=\"265\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"14\" font-weight=\"700\">7 × 4</text><text x=\"220\" y=\"285\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"11\">= 28 sq cm</text><text x=\"130\" y=\"235\" fill=\"#94a3b8\" font-size=\"10\">7cm</text><text x=\"220\" y=\"215\" fill=\"#94a3b8\" font-size=\"10\">4cm</text><rect x=\"350\" y=\"220\" width=\"160\" height=\"60\" fill=\"rgba(244,114,182,0.15)\" stroke=\"#f472b6\" stroke-width=\"2\"/><text x=\"430\" y=\"255\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"14\" font-weight=\"700\">8 × 3</text><text x=\"430\" y=\"275\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"11\">= 24 sq cm</text><text x=\"330\" y=\"235\" fill=\"#94a3b8\" font-size=\"10\">8cm</text><text x=\"430\" y=\"215\" fill=\"#94a3b8\" font-size=\"10\">3cm</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"325\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\">Area = length × width</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <polygon points=\"200,350 350,350 275,260\" fill=\"rgba(52,211,153,0.15)\" stroke=\"#34d399\" stroke-width=\"2\"/><text x=\"275\" y=\"340\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\">Triangle</text><text x=\"275\" y=\"375\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"13\" font-weight=\"700\">Area = ½ × base × height</text><text x=\"275\" y=\"395\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\">A diagonal splits a rectangle into 2 equal triangles</text>\n        </g><g class=\"el\" data-beat=\"5\">\n          <text x=\"275\" y=\"430\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\">7×4 rectangle → each triangle = ½ × 28 = 14 sq cm</text>\n        </g>",
      "beats": [
        "Welcome to Area! We measure area by counting the number of unit squares that fit inside a shape. A rectangle of length 7 cm and width 4 cm contains 7 x 4 = 28 unit squares — so its area is 28 square centimetres.",
        "Compare two rectangles: 7x4 = 28 sq cm and 8x3 = 24 sq cm. Even though the second rectangle is longer, it has a smaller area because it is narrower. Area depends on BOTH dimensions: Area = length x width.",
        "Now, what about triangles? A diagonal of a rectangle divides it into two congruent (identical) triangles. So each triangle has HALF the area of the rectangle. Area of a triangle = 1/2 x base x height.",
        "For our 7x4 rectangle, the diagonal creates two triangles each with area 1/2 x 7 x 4 = 14 sq cm. The base is the length of the rectangle, and the height is the width. This works for any triangle — not just those inside rectangles!",
        "So the key formulas are: Rectangle area = length x width. Triangle area = 1/2 x base x height. These two formulas are the foundation for calculating the area of any shape — because any shape can be broken down into rectangles and triangles! Ready? Let us turn the page..."
      ]
    },
    {
      "id": "area_parallelogram_trapezium",
      "label": "7.2 Area of Parallelograms & Trapeziums",
      "viewBox": "0 0 600 460",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"160\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"20\" font-weight=\"700\">AREA: PARALLELOGRAM &amp; TRAPEZIUM</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <polygon points=\"150,280 250,230 350,280 250,330\" fill=\"rgba(56,189,248,0.15)\" stroke=\"#38bdf8\" stroke-width=\"2\"/><text x=\"250\" y=\"285\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"12\" font-weight=\"700\">Parallelogram</text><text x=\"250\" y=\"355\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"700\">Area = base × height</text><line x1=\"150\" y1=\"285\" x2=\"150\" y2=\"330\" stroke=\"#94a3b8\" stroke-width=\"1\" stroke-dasharray=\"3,2\"/><text x=\"135\" y=\"310\" fill=\"#94a3b8\" font-size=\"9\">h</text><text x=\"200\" y=\"345\" fill=\"#94a3b8\" font-size=\"9\">base</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <polygon points=\"380,280 460,240 540,280 540,330 380,330\" fill=\"rgba(52,211,153,0.15)\" stroke=\"#34d399\" stroke-width=\"2\"/><text x=\"460\" y=\"285\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\">Trapezium</text><text x=\"460\" y=\"355\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"700\">Area = ½ × (a + b) × h</text><text x=\"420\" y=\"235\" fill=\"#94a3b8\" font-size=\"9\">a</text><text x=\"500\" y=\"235\" fill=\"#94a3b8\" font-size=\"9\">b</text><line x1=\"380\" y1=\"285\" x2=\"380\" y2=\"330\" stroke=\"#94a3b8\" stroke-width=\"1\" stroke-dasharray=\"3,2\"/><text x=\"365\" y=\"310\" fill=\"#94a3b8\" font-size=\"9\">h</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <rect x=\"60\" y=\"375\" width=\"480\" height=\"60\" rx=\"8\" fill=\"rgba(167,139,250,0.1)\" stroke=\"#a78bfa\" stroke-width=\"1.5\"/><text x=\"300\" y=\"400\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\" font-weight=\"700\">Parallelogram = base × h (same as rectangle!)</text><text x=\"300\" y=\"420\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"11\">Trapezium = ½ × (sum of parallel sides) × height</text>\n        </g>",
      "beats": [
        "Now let us find the area of parallelograms and trapeziums. A parallelogram has two pairs of parallel sides. Its area is the same as a rectangle with the same base and height: Area = base x height. The slanted sides don't matter — only the perpendicular height counts!",
        "A trapezium has exactly ONE pair of parallel sides (called a and b). Its area is the average of the two parallel sides multiplied by the height: Area = 1/2 x (a + b) x h. Think of it as the 'average width' times the height.",
        "Why does this work? You can cut a trapezium into two triangles and add their areas. Triangle 1 has base 'a' and height 'h' → area = 1/2 x a x h. Triangle 2 has base 'b' and height 'h' → area = 1/2 x b x h. Total = 1/2 x (a + b) x h. Algebra confirms the formula!",
        "So the area formulas all connect: Rectangle = l x w. Triangle = 1/2 x b x h. Parallelogram = b x h. Trapezium = 1/2 x (a + b) x h. Each one builds on the previous — and algebra shows us why they all work. Ready? Let us turn the page..."
      ]
    }
  ],
  "notes": "<div style=\"background: linear-gradient(135deg, #0c4a6e 0%, #0e7490 100%); border: 1px solid #38bdf8; border-radius: 14px; padding: 22px 24px; margin-bottom: 28px;\">\n<h2 style=\"color: #bae6fd; font-size: 22px; margin: 0 0 8px; font-weight: 700;\">📖 Before We Begin — Story-Time Words</h2>\n<p style=\"color: #bae6fd; font-size: 13px; margin: 0 0 16px; line-height: 1.6;\">My young friend, before we explore these four exciting maths chapters, let us learn some special words. These words will appear again and again in our stories — fractals, mean, median, algebra, area, and more. Ready? Let's begin!</p>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">🌿 1. Fractal</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A shape that has smaller copies of itself at every scale. Examples: ferns, the Sierpinski Carpet, coastlines. Each part looks like the whole — self-similarity at smaller and smaller scales.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">📊 2. Mean (Arithmetic Mean)</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">The sum of all values divided by the number of values. The mean is a balance point — the sum of distances from values below equals the sum of distances from values above.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">📏 3. Median</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">The middle value when data is sorted. For an odd count, it is the exact middle value. For an even count, it is the average of the two middle values. Resistant to outliers.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">🔢 4. Variable (Algebra)</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A letter (like x, y, or z) that represents an unknown number. In 'Think of a Number' tricks, the variable cancels out, leaving a constant answer — that is the magic of algebra!</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">📐 5. Area</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">The amount of space inside a 2D shape, measured in unit squares (sq cm, sq m). Rectangle = l × w. Triangle = ½ × b × h. Parallelogram = b × h. Trapezium = ½ × (a+b) × h.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">🔺 6. Parallelogram</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A quadrilateral with two pairs of parallel sides. Its area equals base × height — same as a rectangle with the same base and perpendicular height.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">⏢ 7. Trapezium</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A quadrilateral with exactly one pair of parallel sides. Area = ½ × (sum of parallel sides) × height. Think of it as 'average width' × height.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">🔮 8. Self-Similarity</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">When a shape contains smaller copies of itself. Fractals are self-similar at every scale — zoom in and you see the same pattern again. Found in nature: ferns, trees, coastlines.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">🎯 9. Outlier</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A value in a dataset that is much larger or smaller than the others. Outliers pull the MEAN toward themselves but barely affect the MEDIAN. Example: a billionaire in a room of ordinary people.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">🧩 10. Sierpinski Carpet</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A fractal made by: (1) dividing a square into 9, (2) removing the center, (3) repeating on each remaining square. At step n: R_n = 8^n remaining squares. Exponential growth!</p></div>\n</div>\n\n<h2>📝 Key Notes — Chapters 4–7: Geometric Themes, Dots &amp; Lines, Algebra Play, Area</h2>\n\n<h3>Chapter 4: Exploring Some Geometric Themes</h3>\n<table class=\"styled-table\">\n<tr><th>Concept</th><th>Key Idea</th></tr>\n<tr><td><strong>Fractals</strong></td><td>Self-similar shapes — same pattern at smaller scales. Nature: ferns, trees, coastlines.</td></tr>\n<tr><td><strong>Sierpinski Carpet</strong></td><td>Square → 9 parts → remove center → repeat. R_n = 8^n.</td></tr>\n<tr><td><strong>Sierpinski Gasket</strong></td><td>Triangle → 4 parts → remove center → repeat on 3 remaining.</td></tr>\n<tr><td><strong>Visualising Solids</strong></td><td>3D shapes from front, top, and side views. Cube = all squares. Cone = circle + triangles.</td></tr>\n</table>\n\n<h3>Chapter 5: Tales by Dots and Lines</h3>\n<table class=\"styled-table\">\n<tr><th>Measure</th><th>Definition</th><th>Property</th></tr>\n<tr><td><strong>Mean</strong></td><td>Sum ÷ count</td><td>Balance point — distances left = distances right. Sensitive to outliers.</td></tr>\n<tr><td><strong>Median</strong></td><td>Middle value (sorted)</td><td>Resistant to outliers. For even count: average of two middle values.</td></tr>\n</table>\n\n<h3>Chapter 6: Algebra Play</h3>\n<table class=\"styled-table\">\n<tr><th>Trick</th><th>Steps</th><th>Algebra</th><th>Result</th></tr>\n<tr><td>Think of a Number</td><td>Double → +4 → ÷2 → −original</td><td>2x → 2x+4 → x+2 → x+2−x</td><td>= 2</td></tr>\n<tr><td>Number Pyramids</td><td>Each block = sum of two below</td><td>Bottom: a, b, c → Top: a+2b+c</td><td>Formula</td></tr>\n</table>\n\n<h3>Chapter 7: Area</h3>\n<table class=\"styled-table\">\n<tr><th>Shape</th><th>Formula</th><th>Example</th></tr>\n<tr><td>Rectangle</td><td>length × width</td><td>7 cm × 4 cm = 28 cm²</td></tr>\n<tr><td>Triangle</td><td>½ × base × height</td><td>½ × 7 × 4 = 14 cm²</td></tr>\n<tr><td>Parallelogram</td><td>base × height</td><td>Same as rectangle!</td></tr>\n<tr><td>Trapezium</td><td>½ × (a + b) × height</td><td>Average of parallel sides × height</td></tr>\n</table>\n\n<h3>Memory Tricks</h3>\n<div class=\"card tip\">\n<ul>\n<li><strong>Fractals:</strong> \"Self-similar = same at every scale.\" Think fern — each leaf is a mini fern.</li>\n<li><strong>Mean as balance:</strong> \"Mean = seesaw pivot.\" Distances on both sides are equal.</li>\n<li><strong>Algebra tricks:</strong> \"The x cancels!\" That is why the answer is always the same.</li>\n<li><strong>Area formulas:</strong> Rectangle = l×w. Triangle = ½ of rectangle. Parallelogram = same as rectangle. Trapezium = average width × height.</li>\n<li><strong>Number pyramid:</strong> \"Each block = left below + right below.\" Top = a + 2b + c.</li>\n</ul>\n</div>",
  "practice": "<h2>✏️ Practice</h2>\n<div class=\"practice-card\">\n<h3>🧠 Quick Recall</h3>\n<ol>\n<li>A ___ is a shape that contains smaller copies of itself. (fractal)</li>\n<li>In the Sierpinski Carpet, the number of remaining squares at step n is ___. (8ⁿ)</li>\n<li>The ___ is the balance point of data — distances on both sides are equal. (mean)</li>\n<li>The ___ is the middle value when data is sorted. (median)</li>\n<li>In 'Think of a Number' tricks, the variable ___ always cancels out. (x)</li>\n<li>Area of a rectangle = ___ × ___. (length × width)</li>\n<li>Area of a triangle = ___ × base × ___. (½ × height)</li>\n<li>Area of a trapezium = ½ × (___ + ___) × height. (a + b)</li>\n<li>A cone's front view is a ___ and its top view is a ___. (circle, triangle)</li>\n<li>In a number pyramid, each block = ___ of the two blocks below it. (sum)</li>\n</ol>\n<button class=\"reveal-btn\" onclick=\"this.nextElementSibling.style.display='block';this.style.display='none'\">Reveal Answers</button>\n<div class=\"reveal-answer\" style=\"display:none\">\n<ol>\n<li>fractal</li><li>8ⁿ</li><li>mean</li><li>median</li><li>x</li>\n<li>length × width</li><li>½ × base × height</li><li>(a + b)</li>\n<li>circle, triangle</li><li>sum</li>\n</ol>\n</div>\n</div>",
  "realLife": [
    {
      "id": "fractals_nature",
      "title": "🌿 1. Fractals in Nature",
      "viewBox": "0 0 600 400",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"18\" font-weight=\"700\">Fractals are everywhere!</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\">Ferns, trees, coastlines, clouds, lightning, mountains</text><text x=\"300\" y=\"270\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\">Mathematics is the hidden pattern behind nature</text>\n        </g>",
      "beats": [
        "Fractals are not just mathematical curiosities — they are everywhere in nature! The fern has smaller copies of itself as leaves, and those leaves have even smaller copies. Trees branch the same way at every scale: trunk → limb → branch → twig. Coastlines look jagged whether you view them from space or from the beach. Clouds, lightning, mountains, and even blood vessels in your body show fractal patterns. Mathematics is not separate from nature — it IS the hidden pattern behind the beauty of the natural world."
      ]
    },
    {
      "id": "mean_outlier",
      "title": "💰 2. The Billionaire and the Mean",
      "viewBox": "0 0 600 400",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"16\" font-weight=\"700\">9 people earn ₹50,000 each. A billionaire walks in.</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#ef4444\" font-size=\"14\">Mean jumps to ₹10 crore! But median stays at ₹50,000.</text><text x=\"300\" y=\"270\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"13\" font-weight=\"700\">Mean is sensitive to outliers — median is resistant!</text>\n        </g>",
      "beats": [
        "Imagine 9 people in a room, each earning ₹50,000 per month. The mean and median are both ₹50,000. Now a billionaire walks in — earning ₹100 crore per month. The mean income JUMPS to ₹10 crore! But the median stays at ₹50,000 — because the middle value hasn't changed. This is why the median is often a better measure for income data — it is resistant to outliers. The mean tells you about the total, but the median tells you about the typical person."
      ]
    }
  ],
  "guidedPractice": [
    {
      "title": "Think of a Number — what is the answer?",
      "difficulty": "Easy",
      "diffClass": "gp-easy",
      "statement": "Think of a number, double it, add 4, divide by 2, subtract the original. What is the answer?",
      "viewBox": "0 0 800 300",
      "svg": "<g class=\"gel\" data-beat=\"1\"><text x=\"400\" y=\"150\" fill=\"#fbbf24\" font-size=\"14\" text-anchor=\"middle\">x → 2x → 2x+4 → x+2 → x+2-x = 2</text></g>",
      "steps": [
        {
          "prompt": "After doubling x and adding 4, what do we have?",
          "validate": {
            "type": "match",
            "answers": [
              "2x+4",
              "2x + 4"
            ]
          },
          "formatHint": "Example: 2x+4",
          "explanation": "Yes! Double x gives 2x, then add 4 gives 2x+4.",
          "hint": "Double = 2x, then add 4."
        },
        {
          "prompt": "Divide (2x+4) by 2. What do we get?",
          "validate": {
            "type": "match",
            "answers": [
              "x+2",
              "x + 2"
            ]
          },
          "formatHint": "Example: x+2",
          "explanation": "Yes! (2x+4)/2 = x+2. Then subtract x: x+2-x = 2. The answer is always 2!",
          "hint": "Divide each term by 2."
        }
      ],
      "finalAnswer": "The answer is always 2, because x cancels out: x+2-x = 2."
    },
    {
      "title": "Area of a triangle",
      "difficulty": "Easy",
      "diffClass": "gp-easy",
      "statement": "A triangle has base 10 cm and height 6 cm. What is its area?",
      "viewBox": "0 0 800 300",
      "svg": "<g class=\"gel\" data-beat=\"1\"><text x=\"400\" y=\"150\" fill=\"#fbbf24\" font-size=\"14\" text-anchor=\"middle\">Area = ½ × base × height = ½ × 10 × 6</text></g>",
      "steps": [
        {
          "prompt": "What is ½ × 10 × 6?",
          "validate": {
            "type": "pureNum",
            "value": 30
          },
          "formatHint": "Example: 25",
          "explanation": "Yes! ½ × 10 × 6 = 30 sq cm.",
          "hint": "Multiply 10 × 6 = 60, then divide by 2."
        }
      ],
      "finalAnswer": "Area = ½ × 10 × 6 = 30 sq cm."
    },
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
    },
    {
      "title": "Mean as balance — verify distances",
      "difficulty": "Medium",
      "diffClass": "gp-med",
      "statement": "Data: 4, 7, 9, 12, 15. Mean = 9. Verify the distances balance.",
      "viewBox": "0 0 800 300",
      "svg": "<g class=\"gel\" data-beat=\"1\"><text x=\"400\" y=\"150\" fill=\"#fbbf24\" font-size=\"13\" text-anchor=\"middle\">Below: (9-4)+(9-7)+(9-9) = 5+2+0 = 7</text></g><g class=\"gel\" data-beat=\"2\"><text x=\"400\" y=\"180\" fill=\"#34d399\" font-size=\"13\" text-anchor=\"middle\">Above: (12-9)+(15-9) = 3+6 = 9</text></g><g class=\"gel\" data-beat=\"3\"><text x=\"400\" y=\"210\" fill=\"#f472b6\" font-size=\"13\" text-anchor=\"middle\">Wait — 7 ≠ 9! Something is wrong...</text></g>",
      "steps": [
        {
          "prompt": "Sum of distances BELOW 9: (9-4)+(9-7)+(9-9) = ?",
          "validate": {
            "type": "pureNum",
            "value": 7
          },
          "formatHint": "Example: 5",
          "explanation": "Yes! 5+2+0 = 7.",
          "hint": "9-4=5, 9-7=2, 9-9=0. Add them."
        },
        {
          "prompt": "Sum of distances ABOVE 9: (12-9)+(15-9) = ?",
          "validate": {
            "type": "pureNum",
            "value": 9
          },
          "formatHint": "Example: 6",
          "explanation": "Hmm, 7 ≠ 9! Let me check the mean: (4+7+9+12+15)/5 = 47/5 = 9.4, not 9! The correct mean is 9.4. Distances below: 5.4+2.4+0.4=8.2. Above: 2.6+5.6=8.2. They balance!",
          "hint": "Wait — is the mean actually 9? Check: (4+7+9+12+15)/5 = ?"
        }
      ],
      "finalAnswer": "The mean is actually 9.4 (= 47/5). Distances below: 5.4+2.4+0.4 = 8.2. Distances above: 2.6+5.6 = 8.2. They balance!"
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
    },
    {
      "q": "Why is the mean called a 'balance point'?",
      "steps": "Because the sum of distances from values below the mean equals the sum of distances from values above. Like a seesaw balanced at the centre.",
      "answer": "The mean balances distances on both sides — sum below = sum above."
    },
    {
      "q": "Which is more affected by outliers — mean or median?",
      "steps": "The MEAN is sensitive to outliers (a single large value pulls it up). The MEDIAN is resistant — it barely changes.",
      "answer": "The mean is more affected by outliers; the median is resistant."
    },
    {
      "q": "In 'Think of a Number' tricks, why is the answer always the same?",
      "steps": "Because the variable x cancels out through the steps. The algebra simplifies to a constant — the x disappears!",
      "answer": "The variable x cancels out, leaving a constant answer."
    },
    {
      "q": "In a number pyramid, if the bottom row is a, b, c, what is the top value?",
      "steps": "Middle row: (a+b) and (b+c). Top = (a+b)+(b+c) = a + 2b + c.",
      "answer": "Top = a + 2b + c."
    },
    {
      "q": "What is the area of a rectangle with length 12 cm and width 5 cm?",
      "steps": "Area = length × width = 12 × 5 = 60 cm².",
      "answer": "60 cm²"
    },
    {
      "q": "What is the area of a triangle with base 8 cm and height 6 cm?",
      "steps": "Area = ½ × base × height = ½ × 8 × 6 = 24 cm².",
      "answer": "24 cm²"
    },
    {
      "q": "What is the area formula for a trapezium?",
      "steps": "Area = ½ × (a + b) × height, where a and b are the parallel sides.",
      "answer": "½ × (a + b) × h"
    },
    {
      "q": "Why does a parallelogram have the same area formula as a rectangle?",
      "steps": "Because the slanted sides don't change the perpendicular height. You can 'cut and paste' a triangle from one side to the other to form a rectangle with the same base and height.",
      "answer": "The slanted sides don't affect the perpendicular height. Area = base × height, same as rectangle."
    },
    {
      "q": "If bottom row of a pyramid is x, 1, x, what is the top? Is it always odd or even?",
      "steps": "Top = x + 2(1) + x = 2x + 2 = 2(x+1). This is always EVEN (divisible by 2).",
      "answer": "Top = 2x + 2 = 2(x+1). Always even!"
    },
    {
      "q": "How can you make the 'Think of a Number' trick give answer 5 instead of 2?",
      "steps": "Original: double → +4 → ÷2 → subtract original = 2. To get 5: double → +10 → ÷2 → subtract original = 5. Change '+4' to '+10'.",
      "answer": "Change step 3 from 'add 4' to 'add 10': 2x+10 → x+5 → x+5-x = 5."
    }
  ]
};
