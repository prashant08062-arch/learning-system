/* ============================================================
   CHAPTER DATA — Area
   Subject: Mathematics (Grade 8, Ganita Prakash Part-II Chapter 7)
   ============================================================ */

window.CHAPTER_DATA = {
  "meta": {
    "subject": "maths",
    "slug": "area",
    "title": "Area",
    "subtitle": "Chapter 7 · Ganita Prakash · Grade 8 Part II",
    "chapterNumber": 7,
    "type": "svg",
    "intro": "Master area formulas for rectangles, triangles, parallelograms, and trapeziums. Learn why a parallelogram has the same area as a rectangle and how to derive the trapezium formula."
  },
  "lectures": [
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
  "notes": "<div style=\"background: linear-gradient(135deg, #7c2d12 0%, #9a3412 100%); border: 1px solid #fbbf24; border-radius: 14px; padding: 22px 24px; margin-bottom: 28px;\">\n<h2 style=\"color: #fef3c7; font-size: 22px; margin: 0 0 8px; font-weight: 700;\">📖 Before We Begin — Story-Time Words</h2>\n<p style=\"color: #fef3c7; font-size: 13px; margin: 0 0 16px; line-height: 1.6;\">My young friend, before we explore area, let us learn some special words about measuring regions and shapes. Ready? Let's begin!</p>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #fcd34d; font-size: 16px; margin: 0 0 8px;\">📐 1. Area</h3><p style=\"color: #fef3c7; font-size: 13px; line-height: 1.6; margin: 0;\">The amount of space inside a 2D shape, measured in unit squares (sq cm, sq m). Rectangle = l × w. Triangle = ½ × b × h. Parallelogram = b × h. Trapezium = ½ × (a+b) × h.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #fcd34d; font-size: 16px; margin: 0 0 8px;\">🔺 2. Parallelogram</h3><p style=\"color: #fef3c7; font-size: 13px; line-height: 1.6; margin: 0;\">A quadrilateral with two pairs of parallel sides. Its area equals base × height — same as a rectangle with the same base and perpendicular height. The slanted sides don't change the area!</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #fcd34d; font-size: 16px; margin: 0 0 8px;\">⏢ 3. Trapezium</h3><p style=\"color: #fef3c7; font-size: 13px; line-height: 1.6; margin: 0;\">A quadrilateral with exactly one pair of parallel sides. Area = ½ × (sum of parallel sides) × height. Think of it as 'average width' × height.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #fcd34d; font-size: 16px; margin: 0 0 8px;\">🔲 4. Unit Square</h3><p style=\"color: #fef3c7; font-size: 13px; line-height: 1.6; margin: 0;\">A square with side length 1 unit (e.g. 1 cm). Area is measured by counting how many unit squares fit inside a shape. 1 unit square = 1 sq cm (or 1 cm²).</p></div>\n</div>\n\n<h2>📝 Key Notes — Chapter 7: Area</h2>\n<table class=\"styled-table\">\n<tr><th>Shape</th><th>Formula</th><th>Example</th></tr>\n<tr><td>Rectangle</td><td>length × width</td><td>7 cm × 4 cm = 28 cm²</td></tr>\n<tr><td>Triangle</td><td>½ × base × height</td><td>½ × 7 × 4 = 14 cm²</td></tr>\n<tr><td>Parallelogram</td><td>base × height</td><td>Same as rectangle!</td></tr>\n<tr><td>Trapezium</td><td>½ × (a + b) × height</td><td>Average of parallel sides × height</td></tr>\n</table>\n<div class=\"card tip\"><p><strong>Memory trick:</strong> Rectangle = l×w. Triangle = ½ of rectangle. Parallelogram = same as rectangle (slanted sides don't matter). Trapezium = average width × height = ½(a+b)×h.</p></div>",
  "practice": "<h2>✏️ Practice</h2>\n<div class=\"practice-card\">\n<h3>🧠 Quick Recall</h3>\n<ol>\n<li>Area of a rectangle = ___ × ___. (length × width)</li>\n<li>Area of a triangle = ___ × base × ___. (½ × height)</li>\n<li>Area of a parallelogram = ___ × ___. (base × height)</li>\n<li>Area of a trapezium = ½ × (___ + ___) × height. (a + b)</li>\n<li>A rectangle 12 cm × 5 cm has area ___ sq cm. (60)</li>\n<li>A triangle with base 8 cm and height 6 cm has area ___ sq cm. (24)</li>\n</ol>\n<button class=\"reveal-btn\" onclick=\"this.nextElementSibling.style.display='block';this.style.display='none'\">Reveal Answers</button>\n<div class=\"reveal-answer\" style=\"display:none\"><ol><li>length × width</li><li>½ × height</li><li>base × height</li><li>(a + b)</li><li>60</li><li>24</li></ol></div>\n</div>",
  "realLife": [],
  "guidedPractice": [
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
    }
  ],
  "selfTest": [
    {
      "q": "What 3D shape has a circle as front view and triangles as top and side views?",
      "steps": "Circle from front = circular base. Triangles from top and side = pointed apex → CONE.",
      "answer": "A cone."
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
    }
  ]
};
