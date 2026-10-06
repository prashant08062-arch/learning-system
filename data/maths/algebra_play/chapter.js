/* ============================================================
   CHAPTER DATA — Algebra Play
   Subject: Mathematics (Grade 8, Ganita Prakash Part-II Chapter 6)
   ============================================================ */

window.CHAPTER_DATA = {
  "meta": {
    "subject": "maths",
    "slug": "algebra_play",
    "title": "Algebra Play",
    "subtitle": "Chapter 6 · Ganita Prakash · Grade 8 Part II",
    "chapterNumber": 6,
    "type": "svg",
    "intro": "Play with algebra! Discover why 'Think of a Number' tricks always work (the x cancels out), and explore number pyramids where each block is the sum of two below."
  },
  "lectures": [
    {
      "id": "think_of_number",
      "label": "6.2 Think of a Number Tricks",
      "viewBox": "0 0 600 460",
      "svg": "<style>\n/* === UNIVERSAL ANIMATION SYSTEM === */\n/* Applied to all lectures across all subjects */\n\n/* Fade-in for text elements */\n.anim-fade-in {\n  opacity: 0;\n  animation: anim-fade 0.5s ease forwards;\n}\n@keyframes anim-fade {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n/* Pop-in for rectangles and boxes */\n.anim-pop-in {\n  opacity: 0;\n  transform-origin: center;\n  animation: anim-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n}\n@keyframes anim-pop {\n  0% { opacity: 0; transform: scale(0.7); }\n  60% { opacity: 1; transform: scale(1.08); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n/* Draw for lines and paths (stroke draws itself) */\n.anim-draw {\n  stroke-dasharray: 1000;\n  stroke-dashoffset: 1000;\n  animation: anim-draw-line 0.8s ease forwards;\n}\n@keyframes anim-draw-line {\n  to { stroke-dashoffset: 0; }\n}\n\n/* Pulse-in for circles and key points */\n.anim-pulse-in {\n  opacity: 0;\n  animation: anim-pulse-in-anim 0.5s ease forwards;\n}\n@keyframes anim-pulse-in-anim {\n  0% { opacity: 0; transform: scale(0); }\n  50% { opacity: 1; transform: scale(1.3); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n/* Slide-in from left */\n.anim-slide-left {\n  opacity: 0;\n  animation: anim-slide-l 0.5s ease forwards;\n}\n@keyframes anim-slide-l {\n  from { opacity: 0; transform: translateX(-20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n/* Slide-in from right */\n.anim-slide-right {\n  opacity: 0;\n  animation: anim-slide-r 0.5s ease forwards;\n}\n@keyframes anim-slide-r {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n/* Staggered delays (applied via inline style) */\n/* Uses animation-delay set by the Python script */\n</style>\n\n\n\n\n<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"160\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"20\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\"><text x=\"300\" y=\"190\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"100\" y=\"240\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\"><text x=\"200\" y=\"240\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\"><text x=\"400\" y=\"240\" fill=\"#f472b6\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\"><line x1=\"80\" y1=\"250\" x2=\"520\" y2=\"250\" stroke=\"#334155\" stroke-width=\"1\" class=\"anim-draw\" style=\"animation-delay: 0.45s\" /><text x=\"100\" y=\"270\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.60s\"><text x=\"200\" y=\"270\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.75s\"><text x=\"400\" y=\"270\" fill=\"#f472b6\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 0.90s\"><text x=\"100\" y=\"290\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 1.05s\"><text x=\"200\" y=\"290\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 1.20s\"><text x=\"400\" y=\"290\" fill=\"#f472b6\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 1.35s\"><text x=\"100\" y=\"310\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 1.50s\"><text x=\"200\" y=\"310\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 1.65s\"><text x=\"400\" y=\"310\" fill=\"#f472b6\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 1.80s\"><text x=\"100\" y=\"330\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 1.95s\"><text x=\"200\" y=\"330\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 2.10s\"><text x=\"400\" y=\"330\" fill=\"#f472b6\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 2.25s\"><text x=\"100\" y=\"350\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 2.40s\"><text x=\"200\" y=\"350\" fill=\"#cbd5e1\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 2.55s\"><text x=\"400\" y=\"350\" fill=\"#f472b6\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 2.70s\">\n        </g><g class=\"el\" data-beat=\"3\">\n          <rect x=\"150\" y=\"370\" width=\"300\" height=\"50\" rx=\"8\" fill=\"rgba(132,204,22,0.15)\" stroke=\"#84cc16\" stroke-width=\"2\" class=\"anim-pop-in\" style=\"animation-delay: 0.00s\" /><text x=\"300\" y=\"400\" text-anchor=\"middle\" fill=\"#84cc16\" font-size=\"16\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">\n        </g><g class=\"el\" data-beat=\"4\">\n          <text x=\"300\" y=\"440\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">\n        </g>",
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
      "svg": "<style>\n/* === UNIVERSAL ANIMATION SYSTEM === */\n/* Applied to all lectures across all subjects */\n\n/* Fade-in for text elements */\n.anim-fade-in {\n  opacity: 0;\n  animation: anim-fade 0.5s ease forwards;\n}\n@keyframes anim-fade {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n/* Pop-in for rectangles and boxes */\n.anim-pop-in {\n  opacity: 0;\n  transform-origin: center;\n  animation: anim-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;\n}\n@keyframes anim-pop {\n  0% { opacity: 0; transform: scale(0.7); }\n  60% { opacity: 1; transform: scale(1.08); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n/* Draw for lines and paths (stroke draws itself) */\n.anim-draw {\n  stroke-dasharray: 1000;\n  stroke-dashoffset: 1000;\n  animation: anim-draw-line 0.8s ease forwards;\n}\n@keyframes anim-draw-line {\n  to { stroke-dashoffset: 0; }\n}\n\n/* Pulse-in for circles and key points */\n.anim-pulse-in {\n  opacity: 0;\n  animation: anim-pulse-in-anim 0.5s ease forwards;\n}\n@keyframes anim-pulse-in-anim {\n  0% { opacity: 0; transform: scale(0); }\n  50% { opacity: 1; transform: scale(1.3); }\n  100% { opacity: 1; transform: scale(1); }\n}\n\n/* Slide-in from left */\n.anim-slide-left {\n  opacity: 0;\n  animation: anim-slide-l 0.5s ease forwards;\n}\n@keyframes anim-slide-l {\n  from { opacity: 0; transform: translateX(-20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n/* Slide-in from right */\n.anim-slide-right {\n  opacity: 0;\n  animation: anim-slide-r 0.5s ease forwards;\n}\n@keyframes anim-slide-r {\n  from { opacity: 0; transform: translateX(20px); }\n  to { opacity: 1; transform: translateX(0); }\n}\n\n/* Staggered delays (applied via inline style) */\n/* Uses animation-delay set by the Python script */\n</style>\n\n\n\n\n<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"160\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"20\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\"><text x=\"300\" y=\"190\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"180\" y=\"250\" fill=\"#fbbf24\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\"><rect x=\"170\" y=\"260\" width=\"40\" height=\"30\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" rx=\"4\" class=\"anim-pop-in\" style=\"animation-delay: 0.15s\" /><text x=\"190\" y=\"280\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\"><rect x=\"220\" y=\"260\" width=\"40\" height=\"30\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" rx=\"4\" class=\"anim-pop-in\" style=\"animation-delay: 0.45s\" /><text x=\"240\" y=\"280\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.60s\"><rect x=\"270\" y=\"260\" width=\"40\" height=\"30\" fill=\"rgba(251,191,36,0.2)\" stroke=\"#fbbf24\" rx=\"4\" class=\"anim-pop-in\" style=\"animation-delay: 0.75s\" /><text x=\"290\" y=\"280\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.90s\">\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"280\" y=\"230\" fill=\"#34d399\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\"><rect x=\"195\" y=\"220\" width=\"40\" height=\"30\" fill=\"rgba(52,211,153,0.2)\" stroke=\"#34d399\" rx=\"4\" class=\"anim-pop-in\" style=\"animation-delay: 0.15s\" /><text x=\"215\" y=\"240\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\"><rect x=\"245\" y=\"220\" width=\"40\" height=\"30\" fill=\"rgba(52,211,153,0.2)\" stroke=\"#34d399\" rx=\"4\" class=\"anim-pop-in\" style=\"animation-delay: 0.45s\" /><text x=\"265\" y=\"240\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.60s\">\n        </g><g class=\"el\" data-beat=\"4\">\n          <text x=\"370\" y=\"195\" fill=\"#f472b6\" font-size=\"12\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\"><rect x=\"220\" y=\"180\" width=\"40\" height=\"30\" fill=\"rgba(244,114,182,0.2)\" stroke=\"#f472b6\" rx=\"4\" class=\"anim-pop-in\" style=\"animation-delay: 0.15s\" /><text x=\"240\" y=\"200\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\">\n        </g><g class=\"el\" data-beat=\"5\">\n          <rect x=\"60\" y=\"310\" width=\"480\" height=\"55\" rx=\"8\" fill=\"rgba(167,139,250,0.1)\" stroke=\"#a78bfa\" stroke-width=\"1.5\"   /><text x=\"300\" y=\"335\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\" font-weight=\"700\"  ><text x=\"300\" y=\"355\" text-anchor=\"middle\" fill=\"#cbd5e1\" font-size=\"11\"  >\n        </g><g class=\"el\" data-beat=\"6\">\n          <text x=\"300\" y=\"410\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\"><text x=\"300\" y=\"435\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">\n        </g>",
      "beats": [
        "Number pyramids are a beautiful puzzle! Each block in the pyramid is the SUM of the two blocks directly below it. Let's see how it works.",
        "Start with the bottom row: 3, 5, 7. The middle row blocks are each the sum of two adjacent bottom blocks: 3+5=8 and 5+7=12.",
        "The top block is the sum of the two middle blocks: 8+12=20. So the pyramid goes: bottom 3, 5, 7 → middle 8, 12 → top 20. Simple!",
        "But here is the algebraic magic. If the bottom row is a, b, c, then the middle row is (a+b) and (b+c). The top is (a+b)+(b+c) = a + 2b + c. This formula works for ANY three numbers!",
        "Try this: put x, 1, x in the bottom row. The top becomes x + 2(1) + x = 2x + 1 — which is ALWAYS an odd number! No matter what x is, the top of this pyramid is odd. Algebra reveals the hidden pattern. Ready? Let us turn the page..."
      ]
    }
  ],
  "notes": "<div style=\"background: linear-gradient(135deg, #581c87 0%, #6b21a8 100%); border: 1px solid #a78bfa; border-radius: 14px; padding: 22px 24px; margin-bottom: 28px;\">\n<h2 style=\"color: #ddd6fe; font-size: 22px; margin: 0 0 8px; font-weight: 700;\">📖 Before We Begin — Story-Time Words</h2>\n<p style=\"color: #ddd6fe; font-size: 13px; margin: 0 0 16px; line-height: 1.6;\">My young friend, before we play with algebra, let us learn some special words about variables, tricks, and pyramids. Ready? Let's begin!</p>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #c4b5fd; font-size: 16px; margin: 0 0 8px;\">🔢 1. Variable (Algebra)</h3><p style=\"color: #e9d5ff; font-size: 13px; line-height: 1.6; margin: 0;\">A letter (like x, y, or z) that represents an unknown number. In 'Think of a Number' tricks, the variable cancels out, leaving a constant answer — that is the magic of algebra!</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #c4b5fd; font-size: 16px; margin: 0 0 8px;\">🪄 2. 'Think of a Number' Trick</h3><p style=\"color: #e9d5ff; font-size: 13px; line-height: 1.6; margin: 0;\">A sequence of arithmetic steps (double, add, divide, subtract) applied to a secret number. Algebra shows that the variable always cancels out, so the answer is the same constant regardless of the starting number.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #c4b5fd; font-size: 16px; margin: 0 0 8px;\">🔺 3. Number Pyramid</h3><p style=\"color: #e9d5ff; font-size: 13px; line-height: 1.6; margin: 0;\">A pyramid of numbers where each block equals the sum of the two blocks directly below it. If the bottom row is a, b, c, the top = a + 2b + c.</p></div>\n</div>\n\n<h2>📝 Key Notes — Chapter 6: Algebra Play</h2>\n<h3>'Think of a Number' Tricks</h3>\n<table class=\"styled-table\">\n<tr><th>Step</th><th>Instruction</th><th>Algebra</th></tr>\n<tr><td>1</td><td>Think of a number</td><td>x</td></tr>\n<tr><td>2</td><td>Double it</td><td>2x</td></tr>\n<tr><td>3</td><td>Add four</td><td>2x + 4</td></tr>\n<tr><td>4</td><td>Divide by 2</td><td>x + 2</td></tr>\n<tr><td>5</td><td>Subtract original</td><td>x + 2 − x = <strong>2</strong></td></tr>\n</table>\n<h3>Number Pyramids</h3>\n<table class=\"styled-table\">\n<tr><th>Bottom Row</th><th>Middle Row</th><th>Top</th><th>Pattern</th></tr>\n<tr><td>a, b, c</td><td>(a+b), (b+c)</td><td>a + 2b + c</td><td>General formula</td></tr>\n<tr><td>x, 1, x</td><td>(x+1), (1+x)</td><td>2x + 2</td><td>Always even!</td></tr>\n</table>\n<div class=\"card tip\"><p><strong>Memory trick:</strong> \"The x cancels!\" That is why the answer is always the same. For pyramids: \"Each block = left below + right below.\" Top = a + 2b + c.</p></div>",
  "practice": "<h2>✏️ Practice</h2>\n<div class=\"practice-card\">\n<h3>🧠 Quick Recall</h3>\n<ol>\n<li>In 'Think of a Number' tricks, the variable ___ always cancels out. (x)</li>\n<li>If the steps are: double → +4 → ÷2 → subtract original, the answer is ___. (2)</li>\n<li>To make the answer 5, change 'add 4' to 'add ___'. (10)</li>\n<li>In a number pyramid, each block = ___ of the two blocks below it. (sum)</li>\n<li>If bottom row is a, b, c, the top = ___. (a + 2b + c)</li>\n</ol>\n<button class=\"reveal-btn\" onclick=\"this.nextElementSibling.style.display='block';this.style.display='none'\">Reveal Answers</button>\n<div class=\"reveal-answer\" style=\"display:none\"><ol><li>x</li><li>2</li><li>10</li><li>sum</li><li>a + 2b + c</li></ol></div>\n</div>",
  "realLife": [],
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
    }
  ],
  "selfTest": [
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
