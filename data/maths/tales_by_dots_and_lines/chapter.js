/* ============================================================
   CHAPTER DATA — Tales by Dots and Lines
   Subject: Mathematics (Grade 8, Ganita Prakash Part-II Chapter 5)
   ============================================================ */

window.CHAPTERS = window.CHAPTERS || {}; window.CHAPTERS['tales_by_dots_and_lines'] = {
  "meta": {
    "subject": "maths",
    "slug": "tales_by_dots_and_lines",
    "title": "Tales by Dots and Lines",
    "subtitle": "Chapter 5 · Ganita Prakash · Grade 8 Part II",
    "chapterNumber": 5,
    "type": "svg",
    "intro": "Discover the mean as a balance point and the median as a resistant measure. Learn how outliers affect data through dot plots."
  },
  "lectures": [
    {
      "id": "mean_balancing",
      "label": "5.1 The Balancing Act — Mean",
      "viewBox": "0 0 600 460",
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"22\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">THE BALANCING ACT</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">Understanding the mean as a balance point</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <line x1=\"100\" y1=\"300\" x2=\"500\" y2=\"300\" stroke=\"#fbbf24\" stroke-width=\"3\" class=\"anim-draw\" style=\"animation-delay: 0.00s\" /><circle cx=\"180\" cy=\"290\" r=\"8\" fill=\"#34d399\" class=\"anim-pulse-in\" style=\"animation-delay: 0.15s\" /><circle cx=\"220\" cy=\"290\" r=\"8\" fill=\"#34d399\" class=\"anim-pulse-in\" style=\"animation-delay: 0.30s\" /><text x=\"200\" y=\"275\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.45s\">3</text><circle cx=\"380\" cy=\"290\" r=\"8\" fill=\"#f472b6\" class=\"anim-pulse-in\" style=\"animation-delay: 0.60s\" /><text x=\"380\" y=\"275\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"11\"   class=\"anim-fade-in\" style=\"animation-delay: 0.75s\">7</text><polygon points=\"295,310 305,310 300,325\" fill=\"#fbbf24\" class=\"anim-pop-in\" style=\"animation-delay: 0.90s\" /><text x=\"300\" y=\"345\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 1.05s\">Mean = 5</text><text x=\"200\" y=\"355\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\"   class=\"anim-fade-in\" style=\"animation-delay: 1.20s\">distance 2</text><text x=\"380\" y=\"355\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"10\"   class=\"anim-fade-in\" style=\"animation-delay: 1.35s\">distance 2</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"390\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">The mean balances the distances on both sides!</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <rect x=\"60\" y=\"400\" width=\"480\" height=\"45\" rx=\"8\" fill=\"rgba(132,204,22,0.1)\" stroke=\"#84cc16\" stroke-width=\"1.5\" class=\"anim-pop-in\" style=\"animation-delay: 0.00s\" /><text x=\"300\" y=\"425\" text-anchor=\"middle\" fill=\"#84cc16\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">Sum of distances LEFT of mean = Sum of distances RIGHT</text>\n        </g>",
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
      "svg": "<g class=\"el\" data-beat=\"1\">\n          <text x=\"300\" y=\"200\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"22\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">MEDIAN &amp; DOT PLOTS</text><text x=\"300\" y=\"230\" text-anchor=\"middle\" fill=\"#94a3b8\" font-size=\"13\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">The middle value when data is sorted</text>\n        </g><g class=\"el\" data-beat=\"2\">\n          <text x=\"300\" y=\"270\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"13\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">Data: 4, 7, 9, 12, 15</text><circle cx=\"160\" cy=\"300\" r=\"6\" fill=\"#34d399\" class=\"anim-pulse-in\" style=\"animation-delay: 0.15s\" /><text x=\"160\" y=\"285\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\">4</text><circle cx=\"230\" cy=\"300\" r=\"6\" fill=\"#34d399\" class=\"anim-pulse-in\" style=\"animation-delay: 0.45s\" /><text x=\"230\" y=\"285\" text-anchor=\"middle\" fill=\"#34d399\" font-size=\"10\"   class=\"anim-fade-in\" style=\"animation-delay: 0.60s\">7</text><circle cx=\"300\" cy=\"300\" r=\"8\" fill=\"#fbbf24\" stroke=\"#fff\" stroke-width=\"2\" class=\"anim-pulse-in\" style=\"animation-delay: 0.75s\" /><text x=\"300\" y=\"285\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"11\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.90s\">9</text><circle cx=\"370\" cy=\"300\" r=\"6\" fill=\"#f472b6\" class=\"anim-pulse-in\" style=\"animation-delay: 1.05s\" /><text x=\"370\" y=\"285\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"10\"   class=\"anim-fade-in\" style=\"animation-delay: 1.20s\">12</text><circle cx=\"440\" cy=\"300\" r=\"6\" fill=\"#f472b6\" class=\"anim-pulse-in\" style=\"animation-delay: 1.35s\" /><text x=\"440\" y=\"285\" text-anchor=\"middle\" fill=\"#f472b6\" font-size=\"10\"   class=\"anim-fade-in\" style=\"animation-delay: 1.50s\">15</text><text x=\"300\" y=\"330\" text-anchor=\"middle\" fill=\"#fbbf24\" font-size=\"14\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 1.65s\">Median = 9 (middle value)</text>\n        </g><g class=\"el\" data-beat=\"3\">\n          <text x=\"300\" y=\"370\" text-anchor=\"middle\" fill=\"#38bdf8\" font-size=\"13\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.00s\">Adding a new value changes the mean but may not change the median</text>\n        </g><g class=\"el\" data-beat=\"4\">\n          <rect x=\"60\" y=\"390\" width=\"480\" height=\"55\" rx=\"8\" fill=\"rgba(167,139,250,0.1)\" stroke=\"#a78bfa\" stroke-width=\"1.5\" class=\"anim-pop-in\" style=\"animation-delay: 0.00s\" /><text x=\"300\" y=\"415\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.15s\">Mean: sum of distances balanced (sensitive to outliers)</text><text x=\"300\" y=\"435\" text-anchor=\"middle\" fill=\"#a78bfa\" font-size=\"12\" font-weight=\"700\"   class=\"anim-fade-in\" style=\"animation-delay: 0.30s\">Median: middle value (resistant to outliers)</text>\n        </g>",
      "beats": [
        "The median is the middle value when data is sorted. For 5 numbers — 4, 7, 9, 12, 15 — the median is 9, the third value. Half the data is below it, half is above.",
        "Dot plots help us see the median visually. Each dot is a data point. The median is the dot in the middle. For an even number of values, the median is the average of the two middle values.",
        "The mean and median behave differently when new values are added. Adding a very large value pulls the mean up significantly, but the median may barely change. This is why the median is called 'resistant to outliers'.",
        "So remember: the mean is sensitive to extreme values (outliers), while the median is resistant. When a billionaire walks into a room of ordinary people, the mean income jumps — but the median barely moves! Both are useful, but they tell different stories about the data. Ready? Let us turn the page..."
      ]
    }
  ],
  "notes": "<div style=\"background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); border: 1px solid #38bdf8; border-radius: 14px; padding: 22px 24px; margin-bottom: 28px;\">\n<h2 style=\"color: #bae6fd; font-size: 22px; margin: 0 0 8px; font-weight: 700;\">📖 Before We Begin — Story-Time Words</h2>\n<p style=\"color: #bae6fd; font-size: 13px; margin: 0 0 16px; line-height: 1.6;\">My young friend, before we explore data through dots and lines, let us learn some special words about mean, median, and dot plots. Ready? Let's begin!</p>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">📊 1. Mean (Arithmetic Mean)</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">The sum of all values divided by the number of values. The mean is a balance point — the sum of distances from values below equals the sum of distances from values above.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">📏 2. Median</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">The middle value when data is sorted. For an odd count, it is the exact middle value. For an even count, it is the average of the two middle values. Resistant to outliers.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">🎯 3. Outlier</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A value in a dataset that is much larger or smaller than the others. Outliers pull the MEAN toward themselves but barely affect the MEDIAN. Example: a billionaire in a room of ordinary people.</p></div>\n<div style=\"background: rgba(15, 23, 42, 0.5); border-radius: 10px; padding: 16px 18px; margin-bottom: 12px;\"><h3 style=\"color: #7dd3fc; font-size: 16px; margin: 0 0 8px;\">🔴 4. Dot Plot</h3><p style=\"color: #e0f2fe; font-size: 13px; line-height: 1.6; margin: 0;\">A visual representation of data where each dot represents one data point on a number line. Dot plots help us see the spread, centre, and outliers of data at a glance.</p></div>\n</div>\n\n<h2>📝 Key Notes — Chapter 5: Tales by Dots and Lines</h2>\n<table class=\"styled-table\">\n<tr><th>Measure</th><th>Definition</th><th>Property</th></tr>\n<tr><td><strong>Mean</strong></td><td>Sum ÷ count</td><td>Balance point — distances left = distances right. Sensitive to outliers.</td></tr>\n<tr><td><strong>Median</strong></td><td>Middle value (sorted)</td><td>Resistant to outliers. For even count: average of two middle values.</td></tr>\n</table>\n<div class=\"card tip\"><p><strong>Memory trick:</strong> \"Mean = seesaw pivot\" (distances on both sides are equal). \"Median = middle of the line\" (just find the center dot when sorted). Outlier pulls mean but not median.</p></div>",
  "practice": "<h2>✏️ Practice</h2>\n<div class=\"practice-card\">\n<h3>🧠 Quick Recall</h3>\n<ol>\n<li>The ___ is the balance point of data — distances on both sides are equal. (mean)</li>\n<li>The ___ is the middle value when data is sorted. (median)</li>\n<li>Which is more affected by outliers — mean or median? (mean)</li>\n<li>The mean of 3 and 7 is ___. (5)</li>\n<li>If a billionaire joins a group, the ___ barely changes but the ___ jumps. (median, mean)</li>\n</ol>\n<button class=\"reveal-btn\" onclick=\"this.nextElementSibling.style.display='block';this.style.display='none'\">Reveal Answers</button>\n<div class=\"reveal-answer\" style=\"display:none\"><ol><li>mean</li><li>median</li><li>mean</li><li>5</li><li>median, mean</li></ol></div>\n</div>",
  "realLife": [
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
      "q": "Why is the mean called a 'balance point'?",
      "steps": "Because the sum of distances from values below the mean equals the sum of distances from values above. Like a seesaw balanced at the centre.",
      "answer": "The mean balances distances on both sides — sum below = sum above."
    },
    {
      "q": "Which is more affected by outliers — mean or median?",
      "steps": "The MEAN is sensitive to outliers (a single large value pulls it up). The MEDIAN is resistant — it barely changes.",
      "answer": "The mean is more affected by outliers; the median is resistant."
    }
  ]
};
