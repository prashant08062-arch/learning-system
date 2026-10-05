/* ============================================================
   LEARNING SYSTEM — Full-Length Test Paper Engine
   ============================================================
   This file provides:
     1. A QUESTION BANK with random question generators for
        each Maths chapter (8 chapters)
     2. A test-taking UI that generates a random test paper
        each time, collects answers, scores them, and shows
        detailed step-by-step solutions
     3. A recording system that saves every test attempt to
        localStorage so parents can review them in the
        Parent Dashboard

   Storage keys:
     - learning_system_test_results_<uid> : array of test attempts
   ============================================================ */

(function() {
'use strict';

// ============================================================
// UTILITY: random integer in [min, max]
// ============================================================
function ri(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function rc(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// Pick N distinct items from an array
function pickN(arr, n) {
  const copy = arr.slice();
  const result = [];
  for (let i = 0; i < n && copy.length > 0; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy[idx]);
    copy.splice(idx, 1);
  }
  return result;
}

// ============================================================
// QUESTION BANK — one entry per Maths chapter slug
// Each entry is an array of question GENERATOR functions.
// Each generator returns:
//   { question, answer, solution (HTML), type, marks }
// ============================================================

const QUESTION_BANK = {

  // ----------------------------------------------------------
  // Chapter 1: Perimeter and Area (Grade 6)
  // ----------------------------------------------------------
  'perimeter_area': [
    // Q1: Rectangle perimeter
    function() {
      const l = ri(8, 25), w = ri(4, 18);
      const p = 2 * (l + w);
      return {
        type: 'mcq',
        marks: 2,
        question: `A rectangle has length ${l} cm and width ${w} cm. What is its perimeter?`,
        options: [`${p} cm`, `${l + w} cm`, `${l * w} cm`, `${2 * l * w} cm`].sort(() => Math.random() - 0.5),
        answer: `${p} cm`,
        solution: `Perimeter of a rectangle = 2 × (length + width)<br>
          = 2 × (${l} + ${w})<br>
          = 2 × ${l + w}<br>
          = <strong>${p} cm</strong>`
      };
    },
    // Q2: Square area
    function() {
      const s = ri(6, 20);
      const a = s * s;
      return {
        type: 'mcq',
        marks: 2,
        question: `A square has side ${s} cm. What is its area?`,
        options: [`${a} cm²`, `${4 * s} cm`, `${s + s} cm²`, `${2 * s} cm²`].sort(() => Math.random() - 0.5),
        answer: `${a} cm²`,
        solution: `Area of a square = side × side<br>
          = ${s} × ${s}<br>
          = <strong>${a} cm²</strong>`
      };
    },
    // Q3: Triangle area
    function() {
      const b = ri(8, 20), h = ri(5, 15);
      const a = (b * h) / 2;
      return {
        type: 'mcq',
        marks: 3,
        question: `A triangle has base ${b} cm and height ${h} cm. Find its area.`,
        options: [`${a} cm²`, `${b * h} cm²`, `${(b + h) / 2} cm²`, `${2 * b * h} cm²`].sort(() => Math.random() - 0.5),
        answer: `${a} cm²`,
        solution: `Area of a triangle = ½ × base × height<br>
          = ½ × ${b} × ${h}<br>
          = ½ × ${b * h}<br>
          = <strong>${a} cm²</strong>`
      };
    },
    // Q4: Regular polygon perimeter
    function() {
      const sides = rc([3, 4, 5, 6, 8]);
      const side = ri(3, 12);
      const p = sides * side;
      const names = {3: 'equilateral triangle', 4: 'square', 5: 'regular pentagon', 6: 'regular hexagon', 8: 'regular octagon'};
      return {
        type: 'mcq',
        marks: 3,
        question: `A ${names[sides]} has each side of length ${side} cm. Find its perimeter.`,
        options: [`${p} cm`, `${side * 2} cm`, `${side + sides} cm`, `${p / 2} cm`].sort(() => Math.random() - 0.5),
        answer: `${p} cm`,
        solution: `Perimeter of a regular polygon = number of sides × length of one side<br>
          = ${sides} × ${side}<br>
          = <strong>${p} cm</strong>`
      };
    },
    // Q5: Word problem — fencing
    function() {
      const l = ri(15, 40), w = ri(10, 30);
      const rate = rc([8, 10, 12, 15, 20]);
      const p = 2 * (l + w);
      const cost = p * rate;
      return {
        type: 'mcq',
        marks: 4,
        question: `A rectangular field is ${l} m long and ${w} m wide. A fence is to be put around it at ₹${rate} per metre. What is the total cost of fencing?`,
        options: [`₹${cost}`, `₹${p * rate * 2}`, `₹${l * w * rate}`, `₹${(l + w) * rate}`].sort(() => Math.random() - 0.5),
        answer: `₹${cost}`,
        solution: `Step 1: Find the perimeter of the field<br>
          Perimeter = 2 × (length + width) = 2 × (${l} + ${w}) = 2 × ${l + w} = ${p} m<br><br>
          Step 2: Find the cost of fencing<br>
          Cost = Perimeter × Rate = ${p} × ${rate} = <strong>₹${cost}</strong>`
      };
    },
    // Q6: Parallelogram area
    function() {
      const b = ri(10, 25), h = ri(5, 15);
      const a = b * h;
      return {
        type: 'mcq',
        marks: 3,
        question: `A parallelogram has base ${b} cm and height ${h} cm. Find its area.`,
        options: [`${a} cm²`, `${(b * h) / 2} cm²`, `${b + h} cm²`, `${2 * (b + h)} cm²`].sort(() => Math.random() - 0.5),
        answer: `${a} cm²`,
        solution: `Area of a parallelogram = base × height<br>
          = ${b} × ${h}<br>
          = <strong>${a} cm²</strong>`
      };
    },
    // Q7: Trapezium area
    function() {
      const a = ri(8, 16), b = ri(4, 12), h = ri(5, 14);
      const area = ((a + b) / 2) * h;
      return {
        type: 'mcq',
        marks: 4,
        question: `A trapezium has parallel sides of ${a} cm and ${b} cm, and the distance between them is ${h} cm. Find its area.`,
        options: [`${area} cm²`, `${a + b + h} cm²`, `${(a + b) * h} cm²`, `${((a + b) / 2)} cm²`].sort(() => Math.random() - 0.5),
        answer: `${area} cm²`,
        solution: `Area of a trapezium = ½ × (sum of parallel sides) × height<br>
          = ½ × (${a} + ${b}) × ${h}<br>
          = ½ × ${a + b} × ${h}<br>
          = ${(a + b) / 2} × ${h}<br>
          = <strong>${area} cm²</strong>`
      };
    },
    // Q8: Circle circumference
    function() {
      const r = ri(5, 20);
      const c = (2 * 22 * r) / 7;
      const cDec = (c).toFixed(2);
      return {
        type: 'mcq',
        marks: 3,
        question: `Find the circumference of a circle with radius ${r} cm. (Use π = 22/7)`,
        options: [`${cDec} cm`, `${(22 * r * r) / 7} cm`, `${r * r} cm`, `${2 * r} cm`].sort(() => Math.random() - 0.5),
        answer: `${cDec} cm`,
        solution: `Circumference = 2πr = 2 × (22/7) × ${r}<br>
          = (44/7) × ${r}<br>
          = ${44 * r} / 7<br>
          = <strong>${cDec} cm</strong>`
      };
    },
    // Q9: Circle area
    function() {
      const r = ri(7, 21);
      const a = (22 * r * r) / 7;
      return {
        type: 'mcq',
        marks: 3,
        question: `Find the area of a circle with radius ${r} cm. (Use π = 22/7)`,
        options: [`${a} cm²`, `${2 * 22 * r / 7} cm²`, `${r * 2} cm²`, `${44 * r / 7} cm²`].sort(() => Math.random() - 0.5),
        answer: `${a} cm²`,
        solution: `Area = πr² = (22/7) × ${r}²<br>
          = (22/7) × ${r * r}<br>
          = ${22 * r * r} / 7<br>
          = <strong>${a} cm²</strong>`
      };
    },
    // Q10: Combined shape
    function() {
      const l = ri(10, 20), w = ri(6, 14);
      const rectArea = l * w;
      const r = ri(3, Math.min(5, Math.floor(w / 2)));
      const circleArea = (22 * r * r) / 7;
      const combined = rectArea - Math.round(circleArea);
      return {
        type: 'mcq',
        marks: 5,
        question: `A rectangular field is ${l} m × ${w} m. A circular pond of radius ${r} m is dug inside it. Find the area of the remaining field. (Use π = 22/7)`,
        options: [`${combined} m²`, `${rectArea} m²`, `${Math.round(circleArea)} m²`, `${combined + 5} m²`].sort(() => Math.random() - 0.5),
        answer: `${combined} m²`,
        solution: `Step 1: Area of the rectangle = ${l} × ${w} = ${rectArea} m²<br><br>
          Step 2: Area of the circular pond = πr² = (22/7) × ${r}² = (22/7) × ${r * r} = ${circleArea.toFixed(2)} m² ≈ ${Math.round(circleArea)} m²<br><br>
          Step 3: Remaining area = ${rectArea} − ${Math.round(circleArea)} = <strong>${combined} m²</strong>`
      };
    }
  ],

  // ----------------------------------------------------------
  // Chapter 2: Baudhāyana-Pythagoras Theorem (Grade 8)
  // ----------------------------------------------------------
  'baudhayana_pythagoras': [
    // Q1: Find hypotenuse
    function() {
      const a = ri(3, 15), b = ri(3, 15);
      const c2 = a * a + b * b;
      const c = Math.sqrt(c2);
      const cRound = c.toFixed(2);
      return {
        type: 'mcq',
        marks: 3,
        question: `In a right triangle, the two legs are ${a} cm and ${b} cm. Find the hypotenuse (to 2 decimal places).`,
        options: [`${cRound} cm`, `${(a + b).toFixed(2)} cm`, `${Math.sqrt(a * b).toFixed(2)} cm`, `${(a * b).toFixed(2)} cm`].sort(() => Math.random() - 0.5),
        answer: `${cRound} cm`,
        solution: `By the Baudhāyana–Pythagoras theorem:<br>
          c² = a² + b²<br>
          c² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c2}<br>
          c = √${c2} = <strong>${cRound} cm</strong>`
      };
    },
    // Q2: Find a leg
    function() {
      const a = ri(3, 12), c = ri(a + 2, a + 15);
      const b2 = c * c - a * a;
      const b = Math.sqrt(b2);
      const bRound = b.toFixed(2);
      return {
        type: 'mcq',
        marks: 4,
        question: `In a right triangle, the hypotenuse is ${c} cm and one leg is ${a} cm. Find the other leg (to 2 decimal places).`,
        options: [`${bRound} cm`, `${(c - a).toFixed(2)} cm`, `${(c + a).toFixed(2)} cm`, `${Math.sqrt(c * a).toFixed(2)} cm`].sort(() => Math.random() - 0.5),
        answer: `${bRound} cm`,
        solution: `By the Baudhāyana–Pythagoras theorem:<br>
          c² = a² + b²<br>
          ${c}² = ${a}² + b²<br>
          ${c * c} = ${a * a} + b²<br>
          b² = ${c * c} − ${a * a} = ${b2}<br>
          b = √${b2} = <strong>${bRound} cm</strong>`
      };
    },
    // Q3: Is it a right triangle?
    function() {
      const sets = [
        [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25],
        [4, 5, 6], [3, 5, 7], [6, 8, 11], [5, 7, 9]
      ];
      const [a, b, c] = rc(sets);
      const isRight = (a * a + b * b === c * c);
      return {
        type: 'mcq',
        marks: 3,
        question: `A triangle has sides ${a}, ${b}, ${c}. Is it a right triangle?`,
        options: [`Yes, because ${a}² + ${b}² = ${c}²`, `No, because ${a}² + ${b}² ≠ ${c}²`, `Cannot be determined`, `Yes, because all sides are different`].sort(() => Math.random() - 0.5),
        answer: isRight ? `Yes, because ${a}² + ${b}² = ${c}²` : `No, because ${a}² + ${b}² ≠ ${c}²`,
        solution: `Check: ${a}² + ${b}² = ${a * a} + ${b * b} = ${a * a + b * b}<br>
          ${c}² = ${c * c}<br>
          ${a * a + b * b} ${isRight ? '=' : '≠'} ${c * c}<br>
          ${isRight ? 'So it IS a right triangle.' : 'So it is NOT a right triangle.'}`
      };
    },
    // Q4: Baudhāyana triple
    function() {
      const a = ri(2, 10);
      const triples = [
        [a, a, a * Math.sqrt(2).toFixed(3)],
      ];
      // Simple: use (3,4,5) multiples
      const k = ri(2, 7);
      return {
        type: 'mcq',
        marks: 3,
        question: `Which of the following is a Baudhāyana (Pythagorean) triple?`,
        options: [`(${3*k}, ${4*k}, ${5*k})`, `(${3*k}, ${4*k}, ${6*k})`, `(${2*k}, ${3*k}, ${4*k})`, `(${3*k}, ${5*k}, ${7*k})`].sort(() => Math.random() - 0.5),
        answer: `(${3*k}, ${4*k}, ${5*k})`,
        solution: `A Baudhāyana triple (a, b, c) satisfies a² + b² = c².<br>
          Check (${3*k}, ${4*k}, ${5*k}):<br>
          ${3*k}² + ${4*k}² = ${(3*k)**2} + ${(4*k)**2} = ${(3*k)**2 + (4*k)**2}<br>
          ${5*k}² = ${(5*k)**2}<br>
          ${(3*k)**2 + (4*k)**2} = ${(5*k)**2} ✓<br>
          So (${3*k}, ${4*k}, ${5*k}) is a Baudhāyana triple (it's ${k} times the basic triple 3, 4, 5).`
      };
    },
    // Q5: Diagonal of rectangle
    function() {
      const l = ri(8, 20), w = ri(5, 15);
      const d2 = l * l + w * w;
      const d = Math.sqrt(d2);
      const dRound = d.toFixed(2);
      return {
        type: 'mcq',
        marks: 4,
        question: `A rectangle has length ${l} cm and width ${w} cm. Find the length of its diagonal (to 2 decimal places).`,
        options: [`${dRound} cm`, `${(l + w).toFixed(2)} cm`, `${(l * w).toFixed(2)} cm`, `${Math.sqrt(l * w).toFixed(2)} cm`].sort(() => Math.random() - 0.5),
        answer: `${dRound} cm`,
        solution: `The diagonal of a rectangle forms a right triangle with the length and width as legs.<br>
          By the Baudhāyana–Pythagoras theorem:<br>
          diagonal² = length² + width²<br>
          d² = ${l}² + ${w}² = ${l * l} + ${w * w} = ${d2}<br>
          d = √${d2} = <strong>${dRound} cm</strong>`
      };
    },
    // Q6: √2 approximation
    function() {
      return {
        type: 'mcq',
        marks: 3,
        question: `The Baudhāyana approximation for √2 is 1 + 1/3 + 1/(3·4) − 1/(3·4·34). What value does this give (to 4 decimal places)?`,
        options: ['1.4142', '1.4143', '1.4145', '1.5000'].sort(() => Math.random() - 0.5),
        answer: '1.4142',
        solution: `Baudhāyana's approximation:<br>
          1 + 1/3 + 1/(3·4) − 1/(3·4·34)<br>
          = 1 + 0.3333 + 0.0833 − 0.00245<br>
          = 1.4142 (to 4 decimal places)<br>
          The actual value of √2 = 1.41421356...<br>
          This is accurate to 5 decimal places — found in India over 2500 years before Pythagoras!`
      };
    },
    // Q7: Doubling a square
    function() {
      const s = ri(4, 12);
      const newSide = s * Math.sqrt(2);
      const nsRound = newSide.toFixed(2);
      return {
        type: 'mcq',
        marks: 4,
        question: `A square has side ${s} cm. A new square is made with DOUBLE the area. What is the side of the new square? (Use √2 ≈ 1.414)`,
        options: [`${nsRound} cm`, `${s * 2} cm`, `${s} cm`, `${(s * 1.5).toFixed(2)} cm`].sort(() => Math.random() - 0.5),
        answer: `${nsRound} cm`,
        solution: `Area of original square = ${s}² = ${s * s} cm²<br>
          Area of new square = 2 × ${s * s} = ${2 * s * s} cm²<br>
          Side of new square = √${2 * s * s} = ${s}√2<br>
          = ${s} × 1.414<br>
          = <strong>${nsRound} cm</strong><br><br>
          This is the Baudhāyana method of doubling a square, from the Śulba Sūtra.`
      };
    },
    // Q8: Word problem — ladder
    function() {
      const h = ri(8, 15);
      const d = ri(3, 8);
      const ladder2 = h * h + d * d;
      const ladder = Math.sqrt(ladder2);
      const lRound = ladder.toFixed(2);
      return {
        type: 'mcq',
        marks: 5,
        question: `A ladder is leaning against a wall. The foot of the ladder is ${d} m from the wall, and it reaches ${h} m up the wall. Find the length of the ladder (to 2 decimal places).`,
        options: [`${lRound} m`, `${(h + d).toFixed(2)} m`, `${(h - d).toFixed(2)} m`, `${Math.sqrt(h * d).toFixed(2)} m`].sort(() => Math.random() - 0.5),
        answer: `${lRound} m`,
        solution: `The ladder, wall, and ground form a right triangle.<br>
          By the Baudhāyana–Pythagoras theorem:<br>
          ladder² = height² + distance²<br>
          = ${h}² + ${d}²<br>
          = ${h * h} + ${d * d}<br>
          = ${ladder2}<br>
          ladder = √${ladder2} = <strong>${lRound} m</strong>`
      };
    },
    // Q9: Isosceles right triangle
    function() {
      const a = ri(4, 12);
      const c2 = 2 * a * a;
      const c = Math.sqrt(c2);
      const cRound = c.toFixed(2);
      return {
        type: 'mcq',
        marks: 3,
        question: `An isosceles right triangle has equal sides of length ${a}. Find the hypotenuse (to 2 decimal places).`,
        options: [`${cRound}`, `${(a * 2).toFixed(2)}`, `${(a * 1.5).toFixed(2)}`, `${Math.sqrt(a).toFixed(2)}`].sort(() => Math.random() - 0.5),
        answer: cRound,
        solution: `For an isosceles right triangle with legs a:<br>
          c² = a² + a² = 2a²<br>
          c = a√2<br>
          c² = 2 × ${a}² = 2 × ${a * a} = ${c2}<br>
          c = √${c2} = ${a}√2 = <strong>${cRound}</strong>`
      };
    },
    // Q10: Verify theorem
    function() {
      const a = ri(5, 12), b = ri(5, 12);
      const c2 = a * a + b * b;
      const c = Math.sqrt(c2);
      const cRound = c.toFixed(2);
      return {
        type: 'mcq',
        marks: 5,
        question: `A right triangle has legs ${a} cm and ${b} cm. Verify the Baudhāyana–Pythagoras theorem and find the hypotenuse.`,
        options: [`${cRound} cm`, `${(a + b)} cm`, `${(a * b)} cm`, `${Math.abs(a - b)} cm`].sort(() => Math.random() - 0.5),
        answer: `${cRound} cm`,
        solution: `<strong>Verification of the Baudhāyana–Pythagoras theorem:</strong><br><br>
          Given: a = ${a} cm, b = ${b} cm<br><br>
          LHS: a² + b² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c2}<br><br>
          Therefore c² = ${c2}, so c = √${c2} = <strong>${cRound} cm</strong><br><br>
          The theorem is verified: ${a}² + ${b}² = ${c2} = c²`
      };
    }
  ],

  // ----------------------------------------------------------
  // Chapter 3: Fractions in Disguise (Percentages, Grade 8)
  // ----------------------------------------------------------
  'fractions_in_disguise': [
    // Q1: Percentage of a quantity
    function() {
      const pct = rc([10, 15, 20, 25, 30, 40, 50, 75]);
      const num = rc([200, 300, 400, 500, 600, 800, 1000, 1200, 1500]);
      const ans = (pct / 100) * num;
      return {
        type: 'mcq',
        marks: 2,
        question: `Find ${pct}% of ${num}.`,
        options: [`${ans}`, `${ans * 2}`, `${num / pct}`, `${num - ans}`].sort(() => Math.random() - 0.5),
        answer: `${ans}`,
        solution: `${pct}% of ${num} = (${pct}/100) × ${num}<br>
          = ${pct / 100} × ${num}<br>
          = <strong>${ans}</strong>`
      };
    },
    // Q2: Convert fraction to percentage
    function() {
      const denom = rc([4, 5, 8, 10, 20, 25]);
      const num = ri(1, denom - 1);
      const pct = (num / denom) * 100;
      return {
        type: 'mcq',
        marks: 2,
        question: `Convert the fraction ${num}/${denom} to a percentage.`,
        options: [`${pct}%`, `${pct * 2}%`, `${(num * denom)}%`, `${(100 - pct)}%`].sort(() => Math.random() - 0.5),
        answer: `${pct}%`,
        solution: `To convert a fraction to a percentage, multiply by 100:<br>
          ${num}/${denom} = (${num}/${denom}) × 100%<br>
          = ${num * 100 / denom}%<br>
          = <strong>${pct}%</strong>`
      };
    },
    // Q3: Profit calculation
    function() {
      const cp = rc([100, 150, 200, 250, 300, 400, 500]);
      const profitPct = rc([10, 15, 20, 25, 30]);
      const profit = (profitPct / 100) * cp;
      const sp = cp + profit;
      return {
        type: 'mcq',
        marks: 4,
        question: `A shopkeeper buys an item for ₹${cp} and sells it at a profit of ${profitPct}%. Find the selling price.`,
        options: [`₹${sp}`, `₹${cp}`, `₹${profit}`, `₹${sp + 10}`].sort(() => Math.random() - 0.5),
        answer: `₹${sp}`,
        solution: `Profit = ${profitPct}% of Cost Price<br>
          = (${profitPct}/100) × ${cp}<br>
          = ₹${profit}<br><br>
          Selling Price = CP + Profit = ${cp} + ${profit} = <strong>₹${sp}</strong>`
      };
    },
    // Q4: Loss calculation
    function() {
      const cp = rc([200, 300, 400, 500, 600, 800, 1000]);
      const lossPct = rc([5, 10, 15, 20, 25]);
      const loss = (lossPct / 100) * cp;
      const sp = cp - loss;
      return {
        type: 'mcq',
        marks: 4,
        question: `An article is bought for ₹${cp} and sold at a loss of ${lossPct}%. Find the selling price.`,
        options: [`₹${sp}`, `₹${cp}`, `₹${loss}`, `₹${sp - 10}`].sort(() => Math.random() - 0.5),
        answer: `₹${sp}`,
        solution: `Loss = ${lossPct}% of Cost Price<br>
          = (${lossPct}/100) × ${cp}<br>
          = ₹${loss}<br><br>
          Selling Price = CP − Loss = ${cp} − ${loss} = <strong>₹${sp}</strong>`
      };
    },
    // Q5: Simple Interest
    function() {
      const p = rc([1000, 2000, 3000, 5000, 8000, 10000]);
      const r = rc([5, 8, 10, 12, 15]);
      const t = rc([1, 2, 3, 4, 5]);
      const si = (p * r * t) / 100;
      return {
        type: 'mcq',
        marks: 5,
        question: `Find the simple interest on ₹${p} at ${r}% per annum for ${t} years.`,
        options: [`₹${si}`, `₹${si + p}`, `₹${si * 2}`, `₹${p * r}`].sort(() => Math.random() - 0.5),
        answer: `₹${si}`,
        solution: `Simple Interest = (P × R × T) / 100<br>
          = (${p} × ${r} × ${t}) / 100<br>
          = ${p * r * t} / 100<br>
          = <strong>₹${si}</strong>`
      };
    },
    // Q6: Find CP from SP and profit%
    function() {
      const cp = rc([100, 200, 300, 400, 500]);
      const profitPct = rc([10, 20, 25]);
      const sp = cp * (1 + profitPct / 100);
      return {
        type: 'mcq',
        marks: 5,
        question: `An item is sold for ₹${sp} at a profit of ${profitPct}%. Find the cost price.`,
        options: [`₹${cp}`, `₹${sp}`, `₹${sp - cp}`, `₹${cp + 50}`].sort(() => Math.random() - 0.5),
        answer: `₹${cp}`,
        solution: `Selling Price = CP × (1 + profit%/100)<br>
          ${sp} = CP × (1 + ${profitPct}/100)<br>
          ${sp} = CP × ${1 + profitPct / 100}<br>
          CP = ${sp} / ${1 + profitPct / 100}<br>
          CP = <strong>₹${cp}</strong>`
      };
    },
    // Q7: Percentage increase
    function() {
      const oldVal = rc([100, 200, 300, 400, 500]);
      const incPct = rc([10, 15, 20, 25]);
      const inc = (incPct / 100) * oldVal;
      const newVal = oldVal + inc;
      return {
        type: 'mcq',
        marks: 4,
        question: `The price of an item increases from ₹${oldVal} to ₹${newVal}. Find the percentage increase.`,
        options: [`${incPct}%`, `${incPct * 2}%`, `${100 - incPct}%`, `${oldVal / 10}%`].sort(() => Math.random() - 0.5),
        answer: `${incPct}%`,
        solution: `Increase = New − Old = ${newVal} − ${oldVal} = ₹${inc}<br><br>
          % Increase = (Increase / Old) × 100<br>
          = (${inc} / ${oldVal}) × 100<br>
          = <strong>${incPct}%</strong>`
      };
    },
    // Q8: Convert decimal to percentage
    function() {
      const dec = rc([0.25, 0.5, 0.75, 0.1, 0.2, 0.4, 0.6, 0.8]);
      const pct = dec * 100;
      return {
        type: 'mcq',
        marks: 2,
        question: `Convert ${dec} to a percentage.`,
        options: [`${pct}%`, `${pct / 10}%`, `${pct * 10}%`, `${100 - pct}%`].sort(() => Math.random() - 0.5),
        answer: `${pct}%`,
        solution: `To convert a decimal to a percentage, multiply by 100:<br>
          ${dec} × 100 = <strong>${pct}%</strong>`
      };
    },
    // Q9: Discount
    function() {
      const mp = rc([200, 400, 500, 800, 1000, 1200, 1500]);
      const discPct = rc([10, 15, 20, 25, 30]);
      const disc = (discPct / 100) * mp;
      const sp = mp - disc;
      return {
        type: 'mcq',
        marks: 4,
        question: `A shirt is marked at ₹${mp}. A discount of ${discPct}% is given. Find the selling price after discount.`,
        options: [`₹${sp}`, `₹${mp}`, `₹${disc}`, `₹${sp + 50}`].sort(() => Math.random() - 0.5),
        answer: `₹${sp}`,
        solution: `Discount = ${discPct}% of Marked Price<br>
          = (${discPct}/100) × ${mp} = ₹${disc}<br><br>
          Selling Price = MP − Discount = ${mp} − ${disc} = <strong>₹${sp}</strong>`
      };
    },
    // Q10: Compound fraction FDP
    function() {
      const num = ri(1, 5), denom = rc([4, 5, 8, 10, 20]);
      const pct = (num / denom) * 100;
      const dec = num / denom;
      return {
        type: 'mcq',
        marks: 5,
        question: `Convert ${num}/${denom} to decimal AND percentage.`,
        options: [`${dec} and ${pct}%`, `${pct} and ${dec}%`, `${dec} and ${pct * 10}%`, `${dec * 10} and ${pct}%`].sort(() => Math.random() - 0.5),
        answer: `${dec} and ${pct}%`,
        solution: `${num}/${denom} = ${num} ÷ ${denom} = ${dec} (decimal)<br>
          To get percentage: ${dec} × 100 = <strong>${pct}%</strong>`
      };
    }
  ],

  // ----------------------------------------------------------
  // Chapter 4: Proportional Reasoning-2 (Grade 8)
  // ----------------------------------------------------------
  'proportional_reasoning_2': [
    // Q1: Ratio simplification
    function() {
      const a = ri(6, 30), b = ri(6, 30);
      const g = gcd(a, b);
      return {
        type: 'mcq',
        marks: 2,
        question: `Simplify the ratio ${a} : ${b}.`,
        options: [`${a / g} : ${b / g}`, `${a * 2} : ${b * 2}`, `${b / g} : ${a / g}`, `${a + b} : ${a}`].sort(() => Math.random() - 0.5),
        answer: `${a / g} : ${b / g}`,
        solution: `To simplify ${a} : ${b}, divide both by their GCD.<br>
          GCD(${a}, ${b}) = ${g}<br>
          ${a} ÷ ${g} = ${a / g}<br>
          ${b} ÷ ${g} = ${b / g}<br>
          Simplified ratio = <strong>${a / g} : ${b / g}</strong>`
      };
    },
    // Q2: Proportion
    function() {
      const a = ri(2, 10), b = ri(2, 10), c = ri(3, 15);
      const d = (b * c) / a;
      return {
        type: 'mcq',
        marks: 3,
        question: `If ${a} : ${b} = ${c} : x, find x.`,
        options: [`${d}`, `${(a * c) / b}`, `${a + b + c}`, `${c - a}`].sort(() => Math.random() - 0.5),
        answer: `${d}`,
        solution: `In a proportion, product of means = product of extremes<br>
          ${a} × x = ${b} × ${c}<br>
          ${a}x = ${b * c}<br>
          x = ${b * c} / ${a} = <strong>${d}</strong>`
      };
    },
    // Q3: Direct proportion
    function() {
      const a = ri(3, 10), b = ri(20, 50), c = ri(5, 15);
      const d = (b * c) / a;
      return {
        type: 'mcq',
        marks: 4,
        question: `If ${a} pens cost ₹${b}, find the cost of ${c} pens (direct proportion).`,
        options: [`₹${d.toFixed(2)}`, `₹${(a * c / b).toFixed(2)}`, `₹${(b + c).toFixed(2)}`, `₹${(b / c).toFixed(2)}`].sort(() => Math.random() - 0.5),
        answer: `₹${d.toFixed(2)}`,
        solution: `In direct proportion: if more pens, more cost.<br>
          ${a} pens → ₹${b}<br>
          ${c} pens → ₹x<br><br>
          x = (${b} × ${c}) / ${a} = ${b * c} / ${a} = <strong>₹${d.toFixed(2)}</strong>`
      };
    },
    // Q4: Inverse proportion
    function() {
      const a = ri(4, 10), days1 = ri(6, 20), b = ri(8, 16);
      const days2 = (a * days1) / b;
      return {
        type: 'mcq',
        marks: 4,
        question: `If ${a} workers can complete a job in ${days1} days, how many days will ${b} workers take? (Inverse proportion)`,
        options: [`${days2.toFixed(1)} days`, `${(a * b / days1).toFixed(1)} days`, `${(days1 + b).toFixed(1)} days`, `${(days1 - a).toFixed(1)} days`].sort(() => Math.random() - 0.5),
        answer: `${days2.toFixed(1)} days`,
        solution: `In inverse proportion: more workers, fewer days.<br>
          Workers × Days = constant<br>
          ${a} × ${days1} = ${b} × x<br>
          x = (${a} × ${days1}) / ${b} = ${a * days1} / ${b} = <strong>${days2.toFixed(1)} days</strong>`
      };
    },
    // Q5: Percentage to ratio
    function() {
      const pct = rc([20, 25, 30, 40, 50, 60, 75]);
      const rem = 100 - pct;
      const g = gcd(pct, rem);
      return {
        type: 'mcq',
        marks: 3,
        question: `Convert ${pct}% to a ratio in simplest form.`,
        options: [`${pct / g} : ${rem / g}`, `${pct} : 100`, `${rem / g} : ${pct / g}`, `${pct / g} : ${g}`].sort(() => Math.random() - 0.5),
        answer: `${pct / g} : ${rem / g}`,
        solution: `${pct}% = ${pct}/100<br>
          Simplify by dividing by GCD(${pct}, 100) = ${gcd(pct, 100)}<br>
          = ${(pct / gcd(pct, 100))} / ${(100 / gcd(pct, 100))}<br>
          Hmm — actually let me compute this properly.<br>
          ${pct}% = ${pct}/100<br>
          GCD(${pct}, 100) = ${gcd(pct, 100)}<br>
          = <strong>${pct / gcd(pct, 100)} : ${100 / gcd(pct, 100)}</strong> (in simplest form)`
      };
    },
    // Q6: Pie chart angle
    function() {
      const pct = rc([15, 20, 25, 30, 40, 50]);
      const angle = (pct / 100) * 360;
      return {
        type: 'mcq',
        marks: 3,
        question: `In a pie chart, what angle represents ${pct}% of the total?`,
        options: [`${angle}°`, `${pct}°`, `${360 - angle}°`, `${pct * 4}°`].sort(() => Math.random() - 0.5),
        answer: `${angle}°`,
        solution: `Full circle = 360°<br>
          ${pct}% of 360° = (${pct}/100) × 360°<br>
          = ${pct * 360 / 100}°<br>
          = <strong>${angle}°</strong>`
      };
    },
    // Q7: Unitary method
    function() {
      const n = ri(5, 12), cost = ri(50, 200) * n, m = ri(3, 8);
      const one = cost / n;
      const newCost = one * m;
      return {
        type: 'mcq',
        marks: 4,
        question: `If ${n} books cost ₹${cost}, find the cost of ${m} books.`,
        options: [`₹${newCost}`, `₹${cost * m}`, `₹${cost / m}`, `₹${(cost + m)}`].sort(() => Math.random() - 0.5),
        answer: `₹${newCost}`,
        solution: `Cost of ${n} books = ₹${cost}<br>
          Cost of 1 book = ${cost} / ${n} = ₹${one}<br>
          Cost of ${m} books = ${one} × ${m} = <strong>₹${newCost}</strong>`
      };
    },
    // Q8: Speed-distance-time
    function() {
      const speed = rc([40, 50, 60, 70, 80]);
      const time = rc([2, 3, 4, 5]);
      const dist = speed * time;
      return {
        type: 'mcq',
        marks: 4,
        question: `A car travels at ${speed} km/h for ${time} hours. Find the distance covered.`,
        options: [`${dist} km`, `${(speed / time).toFixed(2)} km`, `${(speed + time)} km`, `${(dist * 2)} km`].sort(() => Math.random() - 0.5),
        answer: `${dist} km`,
        solution: `Distance = Speed × Time<br>
          = ${speed} × ${time}<br>
          = <strong>${dist} km</strong>`
      };
    },
    // Q9: Mean of numbers
    function() {
      const nums = [];
      for (let i = 0; i < 5; i++) nums.push(ri(10, 30));
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = sum / 5;
      return {
        type: 'mcq',
        marks: 3,
        question: `Find the mean of: ${nums.join(', ')}.`,
        options: [`${mean}`, `${sum}`, `${nums[0]}`, `${mean * 2}`].sort(() => Math.random() - 0.5),
        answer: `${mean}`,
        solution: `Mean = (Sum of all values) / (Number of values)<br>
          Sum = ${nums.join(' + ')} = ${sum}<br>
          Number of values = ${nums.length}<br>
          Mean = ${sum} / ${nums.length} = <strong>${mean}</strong>`
      };
    },
    // Q10: Compound ratio
    function() {
      const a = ri(2, 6), b = ri(3, 8), c = ri(4, 10), d = ri(5, 12);
      const compoundNum = a * c;
      const compoundDen = b * d;
      const g = gcd(compoundNum, compoundDen);
      return {
        type: 'mcq',
        marks: 5,
        question: `Find the compound ratio of ${a}:${b} and ${c}:${d}.`,
        options: [`${compoundNum / g} : ${compoundDen / g}`, `${a * c} : ${b * d} (un-simplified)`, `${a + c} : ${b + d}`, `${a * d} : ${b * c}`].sort(() => Math.random() - 0.5),
        answer: `${compoundNum / g} : ${compoundDen / g}`,
        solution: `Compound ratio of ${a}:${b} and ${c}:${d}<br>
          = (${a} × ${c}) : (${b} × ${d})<br>
          = ${compoundNum} : ${compoundDen}<br>
          Simplify by GCD(${compoundNum}, ${compoundDen}) = ${g}<br>
          = <strong>${compoundNum / g} : ${compoundDen / g}</strong>`
      };
    }
  ],

  // ----------------------------------------------------------
  // Chapter 5: Exploring Geometric Themes (Grade 8)
  // ----------------------------------------------------------
  'exploring_geometric_themes': [
    // Q1: Sierpinski Carpet iteration count
    function() {
      const n = ri(1, 5);
      const removed = Math.pow(8, n);
      return {
        type: 'mcq',
        marks: 3,
        question: `In the Sierpinski Carpet, how many small squares are removed at iteration ${n}? (R_n = 8^n)`,
        options: [`${removed}`, `${Math.pow(9, n)}`, `${Math.pow(3, n)}`, `${n * 8}`].sort(() => Math.random() - 0.5),
        answer: `${removed}`,
        solution: `In the Sierpinski Carpet, each iteration removes 8 small squares from each remaining square.<br>
          R_n = 8^n<br>
          R_${n} = 8^${n} = <strong>${removed}</strong>`
      };
    },
    // Q2: Front view of a solid
    function() {
      return {
        type: 'mcq',
        marks: 4,
        question: `A cube is placed on a table. When viewed from the FRONT, what shape do you see?`,
        options: ['Square', 'Triangle', 'Circle', 'Rectangle (not square)'].sort(() => Math.random() - 0.5),
        answer: 'Square',
        solution: `A cube has 6 square faces. When viewed from the front (perpendicular to one face),<br>
          you see one square face.<br>
          Answer: <strong>Square</strong>`
      };
    },
    // Q3: Top view of cylinder
    function() {
      return {
        type: 'mcq',
        marks: 3,
        question: `A cylinder is standing upright on its circular base. What shape is the TOP view?`,
        options: ['Circle', 'Rectangle', 'Triangle', 'Square'].sort(() => Math.random() - 0.5),
        answer: 'Circle',
        solution: `A cylinder standing upright has a circular top.<br>
          Looking down from above, you see the circular top face.<br>
          Answer: <strong>Circle</strong>`
      };
    },
    // Q4: Side view of cone
    function() {
      return {
        type: 'mcq',
        marks: 3,
        question: `A cone is standing on its circular base. What is the SIDE view?`,
        options: ['Triangle', 'Circle', 'Rectangle', 'Square'].sort(() => Math.random() - 0.5),
        answer: 'Triangle',
        solution: `A cone has a circular base and tapers to a point.<br>
          Looking from the side, you see a triangle shape.<br>
          Answer: <strong>Triangle</strong>`
      };
    },
    // Q5: Number of faces on a cube
    function() {
      return {
        type: 'mcq',
        marks: 2,
        question: `How many faces does a cube have?`,
        options: ['6', '4', '8', '12'].sort(() => Math.random() - 0.5),
        answer: '6',
        solution: `A cube has 6 square faces (top, bottom, front, back, left, right).<br>
          Answer: <strong>6 faces</strong>`
      };
    },
    // Q6: Sierpinski Gasket
    function() {
      const n = ri(1, 4);
      const triangles = Math.pow(3, n);
      return {
        type: 'mcq',
        marks: 4,
        question: `In the Sierpinski Gasket (Triangle), how many small triangles remain after iteration ${n}?`,
        options: [`${triangles}`, `${Math.pow(4, n)}`, `${Math.pow(2, n)}`, `${n * 3}`].sort(() => Math.random() - 0.5),
        answer: `${triangles}`,
        solution: `In the Sierpinski Gasket, each iteration keeps 3 smaller triangles from each parent triangle.<br>
          Number of triangles after n iterations = 3^n<br>
          After ${n} iteration(s) = 3^${n} = <strong>${triangles}</strong>`
      };
    },
    // Q7: Vertices, edges, faces of a cube
    function() {
      return {
        type: 'mcq',
        marks: 3,
        question: `How many vertices does a cube have?`,
        options: ['8', '6', '12', '4'].sort(() => Math.random() - 0.5),
        answer: '8',
        solution: `A cube has 8 vertices (corners) — 4 on the top face and 4 on the bottom face.<br>
          Answer: <strong>8 vertices</strong>`
      };
    },
    // Q8: Edges of a cube
    function() {
      return {
        type: 'mcq',
        marks: 3,
        question: `How many edges does a cube have?`,
        options: ['12', '8', '6', '4'].sort(() => Math.random() - 0.5),
        answer: '12',
        solution: `A cube has 12 edges — 4 on top, 4 on bottom, and 4 vertical.<br>
          Answer: <strong>12 edges</strong>`
      };
    },
    // Q9: Euler's formula verification
    function() {
      return {
        type: 'mcq',
        marks: 5,
        question: `Verify Euler's formula V − E + F = 2 for a cube. What is V − E + F?`,
        options: ['2', '0', '4', '6'].sort(() => Math.random() - 0.5),
        answer: '2',
        solution: `For a cube:<br>
          V (vertices) = 8<br>
          E (edges) = 12<br>
          F (faces) = 6<br><br>
          V − E + F = 8 − 12 + 6 = <strong>2</strong><br><br>
          Euler's formula holds: V − E + F = 2 ✓`
      };
    },
    // Q10: Fractal self-similarity
    function() {
      return {
        type: 'mcq',
        marks: 4,
        question: `What does "self-similarity" mean in a fractal?`,
        options: [
          'The shape looks similar at different scales of magnification',
          'The shape is the same as another shape',
          'The shape has only one size',
          'The shape is symmetric about a line'
        ].sort(() => Math.random() - 0.5),
        answer: 'The shape looks similar at different scales of magnification',
        solution: `Self-similarity means the shape looks similar at ANY scale of magnification.<br>
          If you zoom into a small part of a fractal, it looks like the whole fractal.<br>
          Examples: Sierpinski Carpet, Sierpinski Gasket, Koch Snowflake, coastline of Norway.<br>
          Answer: <strong>The shape looks similar at different scales of magnification</strong>`
      };
    }
  ],

  // ----------------------------------------------------------
  // Chapter 6: Tales by Dots and Lines (Grade 8)
  // ----------------------------------------------------------
  'tales_by_dots_and_lines': [
    // Q1: Mean calculation
    function() {
      const nums = [];
      for (let i = 0; i < 6; i++) nums.push(ri(5, 25));
      const sum = nums.reduce((a, b) => a + b, 0);
      const mean = sum / 6;
      const meanRound = mean.toFixed(2);
      return {
        type: 'mcq',
        marks: 3,
        question: `Find the mean of: ${nums.join(', ')}.`,
        options: [`${meanRound}`, `${sum}`, `${nums[0]}`, `${(mean * 2).toFixed(2)}`].sort(() => Math.random() - 0.5),
        answer: meanRound,
        solution: `Mean = (Sum) / (Count)<br>
          Sum = ${nums.join(' + ')} = ${sum}<br>
          Count = 6<br>
          Mean = ${sum} / 6 = <strong>${meanRound}</strong>`
      };
    },
    // Q2: Median (odd count)
    function() {
      const nums = [];
      for (let i = 0; i < 5; i++) nums.push(ri(5, 30));
      nums.sort((a, b) => a - b);
      const median = nums[2];
      return {
        type: 'mcq',
        marks: 3,
        question: `Find the median of: ${nums.join(', ')}.`,
        options: [`${median}`, `${nums[0]}`, `${nums[4]}`, `${(nums[0] + nums[4]) / 2}`].sort(() => Math.random() - 0.5),
        answer: `${median}`,
        solution: `First, arrange in order: ${nums.join(', ')} (already sorted)<br>
          Count = 5 (odd), so median = middle value = 3rd value<br>
          Median = <strong>${median}</strong>`
      };
    },
    // Q3: Median (even count)
    function() {
      const nums = [];
      for (let i = 0; i < 6; i++) nums.push(ri(5, 30));
      nums.sort((a, b) => a - b);
      const median = (nums[2] + nums[3]) / 2;
      return {
        type: 'mcq',
        marks: 4,
        question: `Find the median of: ${nums.join(', ')}.`,
        options: [`${median}`, `${nums[0]}`, `${nums[5]}`, `${(nums[2] + nums[3])}`].sort(() => Math.random() - 0.5),
        answer: `${median}`,
        solution: `First, arrange in order: ${nums.join(', ')}<br>
          Count = 6 (even), so median = average of 3rd and 4th values<br>
          = (${nums[2]} + ${nums[3]}) / 2<br>
          = ${nums[2] + nums[3]} / 2 = <strong>${median}</strong>`
      };
    },
    // Q4: Range
    function() {
      const nums = [];
      for (let i = 0; i < 5; i++) nums.push(ri(5, 40));
      const max = Math.max(...nums);
      const min = Math.min(...nums);
      const range = max - min;
      return {
        type: 'mcq',
        marks: 2,
        question: `Find the range of: ${nums.join(', ')}.`,
        options: [`${range}`, `${max}`, `${min}`, `${max + min}`].sort(() => Math.random() - 0.5),
        answer: `${range}`,
        solution: `Range = Maximum − Minimum<br>
          Maximum = ${max}<br>
          Minimum = ${min}<br>
          Range = ${max} − ${min} = <strong>${range}</strong>`
      };
    },
    // Q5: Outlier effect on mean
    function() {
      const nums = [10, 12, 14, 11, 13];
      const meanWithout = (10 + 12 + 14 + 11 + 13) / 5;
      const outlier = ri(40, 80);
      const numsWith = nums.concat([outlier]);
      const meanWith = (10 + 12 + 14 + 11 + 13 + outlier) / 6;
      return {
        type: 'mcq',
        marks: 5,
        question: `The values are 10, 12, 14, 11, 13. The mean is ${meanWithout}. If we add ${outlier} to the data, what is the new mean?`,
        options: [`${meanWith.toFixed(2)}`, `${meanWithout}`, `${outlier}`, `${(meanWithout + outlier).toFixed(2)}`].sort(() => Math.random() - 0.5),
        answer: `${meanWith.toFixed(2)}`,
        solution: `Original mean = ${meanWithout}<br>
          Add outlier ${outlier}:<br>
          New sum = ${10 + 12 + 14 + 11 + 13} + ${outlier} = ${60 + outlier}<br>
          New count = 6<br>
          New mean = ${60 + outlier} / 6 = <strong>${meanWith.toFixed(2)}</strong><br><br>
          The outlier pulled the mean UP, away from the typical values.<br>
          The MEDIAN would be more resistant to this outlier.`
      };
    },
    // Q6: Dot plot interpretation
    function() {
      return {
        type: 'mcq',
        marks: 4,
        question: `In a dot plot, what does each dot represent?`,
        options: ['One data value', 'The mean', 'The range', 'A category'].sort(() => Math.random() - 0.5),
        answer: 'One data value',
        solution: `In a dot plot, each dot represents ONE data value (one observation).<br>
          Dots are stacked above a number line at the position of the value.<br>
          Answer: <strong>One data value</strong>`
      };
    },
    // Q7: Mean as balance point
    function() {
      return {
        type: 'mcq',
        marks: 4,
        question: `What does it mean to say "the mean is the balance point" of a data set?`,
        options: [
          'The sum of deviations above the mean equals the sum of deviations below',
          'The mean is in the middle of the data',
          'Half the data is above the mean',
          'The mean equals the median'
        ].sort(() => Math.random() - 0.5),
        answer: 'The sum of deviations above the mean equals the sum of deviations below',
        solution: `The mean is the "balance point" of the data — like the center of mass of a seesaw.<br>
          If you put weights (data values) on a number line,<br>
          the mean is the point where the line balances.<br>
          This means: total distance of values ABOVE mean = total distance of values BELOW mean.<br>
          Answer: <strong>The sum of deviations above the mean equals the sum of deviations below</strong>`
      };
    },
    // Q8: Mode
    function() {
      const nums = [5, 7, 8, 7, 9, 7, 6];
      return {
        type: 'mcq',
        marks: 3,
        question: `Find the mode of: ${nums.join(', ')}.`,
        options: ['7', '5', '9', '6'].sort(() => Math.random() - 0.5),
        answer: '7',
        solution: `Mode = the value that appears MOST often.<br>
          Count: 5(×1), 6(×1), 7(×3), 8(×1), 9(×1)<br>
          7 appears 3 times — more than any other value.<br>
          Mode = <strong>7</strong>`
      };
    },
    // Q9: Median resistance
    function() {
      return {
        type: 'mcq',
        marks: 4,
        question: `Why is the median more "resistant" to outliers than the mean?`,
        options: [
          'The median only depends on the middle value(s), not on how extreme the outliers are',
          'The median ignores all data',
          'The median is always 0',
          'The median equals the mean'
        ].sort(() => Math.random() - 0.5),
        answer: 'The median only depends on the middle value(s), not on how extreme the outliers are',
        solution: `The median is the MIDDLE value when data is sorted.<br>
          Even if an outlier is very large or very small, it only affects ONE end of the sorted list.<br>
          The middle value(s) stay roughly the same.<br>
          The MEAN, however, is affected by EVERY value — so an outlier pulls it strongly.<br>
          Answer: <strong>The median only depends on the middle value(s), not on how extreme the outliers are</strong>`
      };
    },
    // Q10: Construct a dot plot
    function() {
      const nums = [];
      for (let i = 0; i < 8; i++) nums.push(ri(1, 6));
      const max = Math.max(...nums);
      return {
        type: 'mcq',
        marks: 5,
        question: `A dice is rolled 8 times with results: ${nums.join(', ')}. What is the highest value shown on the dot plot?`,
        options: [`${max}`, `${Math.min(...nums)}`, `${nums.reduce((a, b) => a + b, 0) / 8}`, `${nums.length}`].sort(() => Math.random() - 0.5),
        answer: `${max}`,
        solution: `A dot plot shows each value as a dot above the number line.<br>
          The highest dot will be above the maximum value rolled.<br>
          Maximum value in the data = <strong>${max}</strong>`
      };
    }
  ],

  // ----------------------------------------------------------
  // Chapter 7: Algebra Play (Grade 8)
  // ----------------------------------------------------------
  'algebra_play': [
    // Q1: Think of a number
    function() {
      const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
      // (a*x + b) - (a*x + c) ... let's keep it simple
      return {
        type: 'mcq',
        marks: 3,
        question: `Think of a number x. Double it, add ${b}, then subtract ${2 * 0 + b}. What is the result? (in terms of x)`,
        options: ['2x', 'x', 'x + ' + b, '0'].sort(() => Math.random() - 0.5),
        answer: '2x',
        solution: `Let the number be x.<br>
          Step 1: Double it → 2x<br>
          Step 2: Add ${b} → 2x + ${b}<br>
          Step 3: Subtract ${b} → 2x + ${b} − ${b} = 2x<br>
          Result = <strong>2x</strong><br><br>
          Notice: the ${b} cancels out! The result doesn't depend on ${b} — it's always 2x.`
      };
    },
    // Q2: Number pyramid
    function() {
      const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
      const top = a + 2 * b + c;
      return {
        type: 'mcq',
        marks: 4,
        question: `In a number pyramid, the bottom row is ${a}, ${b}, ${c}. Each block above is the sum of the two blocks below it. Find the top block.`,
        options: [`${top}`, `${a + b + c}`, `${a * b * c}`, `${a + b * 2 + c}`].sort(() => Math.random() - 0.5),
        answer: `${top}`,
        solution: `Bottom row: ${a}, ${b}, ${c}<br>
          Middle row: ${a + b}, ${b + c}<br>
          Top: (${a + b}) + (${b + c}) = ${a + b + b + c} = ${a} + 2×${b} + ${c} = <strong>${top}</strong><br><br>
          Notice: the middle number b is used TWICE!`
      };
    },
    // Q3: Simplify expression
    function() {
      const a = ri(2, 9), b = ri(2, 9);
      return {
        type: 'mcq',
        marks: 3,
        question: `Simplify: ${a}x + ${b}x`,
        options: [`${a + b}x`, `${a * b}x`, `${a - b}x`, `${a + b}`].sort(() => Math.random() - 0.5),
        answer: `${a + b}x`,
        solution: `When adding like terms (same variable x), add the coefficients:<br>
          ${a}x + ${b}x = (${a} + ${b})x = <strong>${a + b}x</strong>`
      };
    },
    // Q4: Solve linear equation
    function() {
      const a = ri(2, 9), b = ri(2, 9);
      const x = ri(1, 10);
      const c = a * x + b;
      return {
        type: 'mcq',
        marks: 4,
        question: `Solve for x: ${a}x + ${b} = ${c}`,
        options: [`${x}`, `${(c - b) / a}`, `${c - a}`, `${(c + b) / a}`].sort(() => Math.random() - 0.5),
        answer: `${x}`,
        solution: `${a}x + ${b} = ${c}<br>
          Subtract ${b} from both sides:<br>
          ${a}x = ${c} − ${b} = ${c - b}<br>
          Divide both sides by ${a}:<br>
          x = ${c - b} / ${a} = <strong>${x}</strong>`
      };
    },
    // Q5: Think of a number — result is constant
    function() {
      return {
        type: 'mcq',
        marks: 5,
        question: `Think of a number x. Multiply by 3, add 6, then divide by 3, then subtract the original number. What is the result?`,
        options: ['2', 'x', '0', '6'].sort(() => Math.random() - 0.5),
        answer: '2',
        solution: `Step 1: Multiply by 3 → 3x<br>
          Step 2: Add 6 → 3x + 6<br>
          Step 3: Divide by 3 → (3x + 6) / 3 = x + 2<br>
          Step 4: Subtract x → (x + 2) − x = 2<br>
          Result = <strong>2</strong><br><br>
          The x cancels out! The result is ALWAYS 2, regardless of the starting number.`
      };
    },
    // Q6: Distributive property
    function() {
      const a = ri(2, 9), b = ri(2, 9), c = ri(2, 9);
      return {
        type: 'mcq',
        marks: 3,
        question: `Expand: ${a}(x + ${b})`,
        options: [`${a}x + ${a * b}`, `${a}x + ${b}`, `${a + b}x`, `${a * b}x`].sort(() => Math.random() - 0.5),
        answer: `${a}x + ${a * b}`,
        solution: `Using the distributive property: a(b + c) = ab + ac<br>
          ${a}(x + ${b}) = ${a}·x + ${a}·${b} = <strong>${a}x + ${a * b}</strong>`
      };
    },
    // Q7: Solve two-step equation
    function() {
      const a = ri(2, 6), b = ri(1, 10), c = ri(2, 6);
      const x = ri(1, 8);
      const rhs = a * x + b * c;
      return {
        type: 'mcq',
        marks: 5,
        question: `Solve for x: ${a}x + ${b * c} = ${rhs} (Hint: ${b * c} = ${b} × ${c})`,
        options: [`${x}`, `${(rhs) / a}`, `${rhs - a}`, `${(rhs - b * c) + a}`].sort(() => Math.random() - 0.5),
        answer: `${x}`,
        solution: `${a}x + ${b * c} = ${rhs}<br>
          Subtract ${b * c} from both sides:<br>
          ${a}x = ${rhs} − ${b * c} = ${rhs - b * c}<br>
          Divide by ${a}:<br>
          x = ${rhs - b * c} / ${a} = <strong>${x}</strong>`
      };
    },
    // Q8: Algebraic identity
    function() {
      const a = ri(2, 9), b = ri(2, 9);
      return {
        type: 'mcq',
        marks: 4,
        question: `Expand: (x + ${a})(x + ${b})`,
        options: [`x² + ${a + b}x + ${a * b}`, `x² + ${a * b}x + ${a + b}`, `x² + ${a + b}`, `2x + ${a + b}`].sort(() => Math.random() - 0.5),
        answer: `x² + ${a + b}x + ${a * b}`,
        solution: `Using FOIL method:<br>
          (x + ${a})(x + ${b}) = x·x + x·${b} + ${a}·x + ${a}·${b}<br>
          = x² + ${b}x + ${a}x + ${a * b}<br>
          = x² + (${a} + ${b})x + ${a * b}<br>
          = <strong>x² + ${a + b}x + ${a * b}</strong>`
      };
    },
    // Q9: Number puzzle
    function() {
      const x = ri(2, 9);
      const result = 3 * x - x + 4;
      return {
        type: 'mcq',
        marks: 4,
        question: `I think of a number, triple it, subtract the original number, then add 4. The result is ${result}. What is the number?`,
        options: [`${x}`, `${result / 2}`, `${result - 4}`, `${result + 1}`].sort(() => Math.random() - 0.5),
        answer: `${x}`,
        solution: `Let the number be x.<br>
          Triple it: 3x<br>
          Subtract original: 3x − x = 2x<br>
          Add 4: 2x + 4 = ${result}<br>
          2x = ${result} − 4 = ${result - 4}<br>
          x = ${result - 4} / 2 = <strong>${x}</strong>`
      };
    },
    // Q10: Pattern recognition
    function() {
      const a = ri(2, 5);
      const terms = [a, a * 2, a * 3, a * 4];
      return {
        type: 'mcq',
        marks: 5,
        question: `Find the next term in the pattern: ${terms.join(', ')}, ?`,
        options: [`${a * 5}`, `${a * 4 + 1}`, `${a + 5}`, `${a * 5 * 2}`].sort(() => Math.random() - 0.5),
        answer: `${a * 5}`,
        solution: `Pattern: ${a}, ${a * 2}, ${a * 3}, ${a * 4}, ...<br>
          Each term = ${a} × (term number)<br>
          Term 1: ${a} × 1 = ${a}<br>
          Term 2: ${a} × 2 = ${a * 2}<br>
          Term 3: ${a} × 3 = ${a * 3}<br>
          Term 4: ${a} × 4 = ${a * 4}<br>
          Term 5: ${a} × 5 = <strong>${a * 5}</strong>`
      };
    }
  ],

  // ----------------------------------------------------------
  // Chapter 8: Area (Grade 8)
  // ----------------------------------------------------------
  'area': [
    // Q1: Rectangle area
    function() {
      const l = ri(6, 20), w = ri(4, 15);
      return {
        type: 'mcq',
        marks: 2,
        question: `Find the area of a rectangle with length ${l} cm and width ${w} cm.`,
        options: [`${l * w} cm²`, `${2 * (l + w)} cm`, `${l + w} cm²`, `${l * w} cm`].sort(() => Math.random() - 0.5),
        answer: `${l * w} cm²`,
        solution: `Area of rectangle = length × width<br>
          = ${l} × ${w}<br>
          = <strong>${l * w} cm²</strong>`
      };
    },
    // Q2: Triangle area
    function() {
      const b = ri(8, 20), h = ri(5, 15);
      const a = (b * h) / 2;
      return {
        type: 'mcq',
        marks: 3,
        question: `Find the area of a triangle with base ${b} cm and height ${h} cm.`,
        options: [`${a} cm²`, `${b * h} cm²`, `${b + h} cm²`, `${(b * h) / 4} cm²`].sort(() => Math.random() - 0.5),
        answer: `${a} cm²`,
        solution: `Area of triangle = ½ × base × height<br>
          = ½ × ${b} × ${h}<br>
          = ½ × ${b * h}<br>
          = <strong>${a} cm²</strong>`
      };
    },
    // Q3: Parallelogram area
    function() {
      const b = ri(8, 20), h = ri(5, 15);
      return {
        type: 'mcq',
        marks: 3,
        question: `Find the area of a parallelogram with base ${b} cm and height ${h} cm.`,
        options: [`${b * h} cm²`, `${(b * h) / 2} cm²`, `${2 * (b + h)} cm`, `${b + h} cm²`].sort(() => Math.random() - 0.5),
        answer: `${b * h} cm²`,
        solution: `Area of parallelogram = base × height<br>
          = ${b} × ${h}<br>
          = <strong>${b * h} cm²</strong>`
      };
    },
    // Q4: Trapezium area
    function() {
      const a = ri(8, 15), b = ri(5, 12), h = ri(5, 12);
      const area = ((a + b) / 2) * h;
      return {
        type: 'mcq',
        marks: 4,
        question: `Find the area of a trapezium with parallel sides ${a} cm and ${b} cm, and height ${h} cm.`,
        options: [`${area} cm²`, `${(a + b) * h} cm²`, `${a + b + h} cm²`, `${((a + b) / 2)} cm²`].sort(() => Math.random() - 0.5),
        answer: `${area} cm²`,
        solution: `Area of trapezium = ½ × (sum of parallel sides) × height<br>
          = ½ × (${a} + ${b}) × ${h}<br>
          = ½ × ${a + b} × ${h}<br>
          = ${(a + b) / 2} × ${h}<br>
          = <strong>${area} cm²</strong>`
      };
    },
    // Q5: Circle area
    function() {
      const r = ri(7, 21);
      const a = (22 * r * r) / 7;
      return {
        type: 'mcq',
        marks: 4,
        question: `Find the area of a circle with radius ${r} cm. (Use π = 22/7)`,
        options: [`${a} cm²`, `${2 * 22 * r / 7} cm²`, `${r * r} cm²`, `${44 * r / 7} cm²`].sort(() => Math.random() - 0.5),
        answer: `${a} cm²`,
        solution: `Area of circle = πr²<br>
          = (22/7) × ${r}²<br>
          = (22/7) × ${r * r}<br>
          = <strong>${a} cm²</strong>`
      };
    },
    // Q6: Rhombus area (using diagonals)
    function() {
      const d1 = ri(8, 20), d2 = ri(6, 16);
      const area = (d1 * d2) / 2;
      return {
        type: 'mcq',
        marks: 4,
        question: `Find the area of a rhombus with diagonals ${d1} cm and ${d2} cm.`,
        options: [`${area} cm²`, `${d1 * d2} cm²`, `${(d1 + d2)} cm²`, `${(d1 + d2) / 2} cm²`].sort(() => Math.random() - 0.5),
        answer: `${area} cm²`,
        solution: `Area of rhombus = ½ × d₁ × d₂  (where d₁, d₂ are diagonals)<br>
          = ½ × ${d1} × ${d2}<br>
          = ½ × ${d1 * d2}<br>
          = <strong>${area} cm²</strong>`
      };
    },
    // Q7: Area of composite shape (rectangle + triangle)
    function() {
      const l = ri(10, 20), w = ri(6, 12), h = ri(4, 8);
      const rectArea = l * w;
      const triArea = (l * h) / 2;
      const total = rectArea + triArea;
      return {
        type: 'mcq',
        marks: 5,
        question: `A shape is made of a rectangle (${l} × ${w}) with a triangle on top (base ${l}, height ${h}). Find the total area.`,
        options: [`${total} cm²`, `${rectArea} cm²`, `${triArea} cm²`, `${rectArea * 2} cm²`].sort(() => Math.random() - 0.5),
        answer: `${total} cm²`,
        solution: `Step 1: Area of rectangle = ${l} × ${w} = ${rectArea} cm²<br><br>
          Step 2: Area of triangle = ½ × base × height = ½ × ${l} × ${h} = ${triArea} cm²<br><br>
          Step 3: Total area = ${rectArea} + ${triArea} = <strong>${total} cm²</strong>`
      };
    },
    // Q8: Area between two shapes
    function() {
      const l = ri(12, 20), w = ri(8, 14);
      const innerL = ri(4, 8), innerW = ri(3, 6);
      const outer = l * w;
      const inner = innerL * innerW;
      const diff = outer - inner;
      return {
        type: 'mcq',
        marks: 5,
        question: `A rectangle (${l} × ${w}) has a smaller rectangle (${innerL} × ${innerW}) cut out of it. Find the area of the remaining shape.`,
        options: [`${diff} cm²`, `${outer} cm²`, `${inner} cm²`, `${outer + inner} cm²`].sort(() => Math.random() - 0.5),
        answer: `${diff} cm²`,
        solution: `Step 1: Area of outer rectangle = ${l} × ${w} = ${outer} cm²<br><br>
          Step 2: Area of inner rectangle (cut out) = ${innerL} × ${innerW} = ${inner} cm²<br><br>
          Step 3: Remaining area = ${outer} − ${inner} = <strong>${diff} cm²</strong>`
      };
    },
    // Q9: Cost of painting
    function() {
      const l = ri(8, 15), w = ri(6, 12);
      const rate = rc([5, 10, 15, 20]);
      const area = l * w;
      const cost = area * rate;
      return {
        type: 'mcq',
        marks: 5,
        question: `Find the cost of painting a wall ${l} m × ${w} m at ₹${rate} per m².`,
        options: [`₹${cost}`, `₹${area}`, `₹${cost * 2}`, `₹${l * rate}`].sort(() => Math.random() - 0.5),
        answer: `₹${cost}`,
        solution: `Step 1: Area of wall = ${l} × ${w} = ${area} m²<br><br>
          Step 2: Cost = Area × Rate = ${area} × ${rate} = <strong>₹${cost}</strong>`
      };
    },
    // Q10: Derive area of triangle from parallelogram
    function() {
      return {
        type: 'mcq',
        marks: 4,
        question: `A parallelogram has base 12 cm and height 8 cm. A triangle is formed by drawing a diagonal. What is the area of the triangle?`,
        options: ['48 cm²', '96 cm²', '24 cm²', '12 cm²'].sort(() => Math.random() - 0.5),
        answer: '48 cm²',
        solution: `Step 1: Area of parallelogram = base × height = 12 × 8 = 96 cm²<br><br>
          Step 2: A diagonal of a parallelogram divides it into TWO equal triangles.<br>
          So each triangle has half the area of the parallelogram.<br><br>
          Area of triangle = 96 / 2 = <strong>48 cm²</strong>`
      };
    }
  ]

};

// Helper: GCD
function gcd(a, b) {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a || 1;
}

// ============================================================
// TEST PAPER GENERATION
// ============================================================

// Section structure: A(1m×6) + B(2m×4) + C(3m×3) + D(5m×1) + E(4m×1) = 15 questions, 32 marks
const SECTIONS = [
  { id: 'A', label: 'Section A — Multiple Choice & Very Short Answer', marks: 1, count: 6 },
  { id: 'B', label: 'Section B — Short Answer Questions (Type I)',    marks: 2, count: 4 },
  { id: 'C', label: 'Section C — Short Answer Questions (Type II)',   marks: 3, count: 3 },
  { id: 'D', label: 'Section D — Long Answer / Application Question', marks: 5, count: 1 },
  { id: 'E', label: 'Section E — Case Study / Word Problem',          marks: 4, count: 1 }
];

function generateTestPaper(chapterSlug) {
  const bank = QUESTION_BANK[chapterSlug];
  if (!bank || bank.length === 0) return null;

  // Total questions needed = 15 (6+4+3+1+1)
  // We call generators round-robin to produce 15 distinct questions.
  // Since each generator uses random values, calling it twice
  // produces different questions.
  const questions = [];
  for (let i = 0; i < 15; i++) {
    const gen = bank[i % bank.length];
    const q = gen();
    q.generatorIndex = i % bank.length;
    questions.push(q);
  }

  // Assign sections based on the SECTIONS config
  let qIdx = 0;
  let qNum = 1;
  SECTIONS.forEach(sec => {
    for (let i = 0; i < sec.count; i++) {
      const q = questions[qIdx];
      q.section = sec.id;
      q.sectionLabel = sec.label;
      q.marks = sec.marks;  // override marks to match section
      q.number = qNum++;
      qIdx++;
    }
  });

  return questions;
}

// ============================================================
// TEST RECORDING (localStorage)
// ============================================================

const TEST_RESULTS_KEY_PREFIX = 'learning_system_test_results_';

function getTestResults(uid) {
  try {
    const raw = localStorage.getItem(TEST_RESULTS_KEY_PREFIX + uid);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveTestResult(uid, result) {
  const results = getTestResults(uid);
  results.push(result);
  // Keep only the last 50 test attempts to avoid bloat
  if (results.length > 50) results.shift();
  localStorage.setItem(TEST_RESULTS_KEY_PREFIX + uid, JSON.stringify(results));
}

// ============================================================
// TEST UI RENDERING
// ============================================================

function renderTestPaperTab(chapterData) {
  const container = document.getElementById('testpaperContent');
  if (!container) return;

  const slug = chapterData.meta.slug;
  const bank = QUESTION_BANK[slug];

  if (!bank) {
    container.innerHTML = `
      <div style="padding:40px;text-align:center;color:#64748b;font-size:14px;">
        <div style="font-size:32px;margin-bottom:12px;">📋</div>
        <p>Test paper is not yet available for this chapter.</p>
        <p style="font-size:12px;margin-top:8px;">Available for: Perimeter &amp; Area, Baudhāyana-Pythagoras, Fractions in Disguise, Proportional Reasoning-2, Exploring Geometric Themes, Tales by Dots and Lines, Algebra Play, Area</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="testpaper-intro">
      <h2>📋 Full-Length Test Paper</h2>
      <p>${chapterData.meta.title}</p>
      <div class="testpaper-structure">
        <div class="testpaper-struct-row"><span class="testpaper-struct-sec">A</span> Multiple Choice &amp; Very Short Answer <span class="testpaper-struct-marks">1 × 6 = 6</span></div>
        <div class="testpaper-struct-row"><span class="testpaper-struct-sec">B</span> Short Answer (Type I) <span class="testpaper-struct-marks">2 × 4 = 8</span></div>
        <div class="testpaper-struct-row"><span class="testpaper-struct-sec">C</span> Short Answer (Type II) <span class="testpaper-struct-marks">3 × 3 = 9</span></div>
        <div class="testpaper-struct-row"><span class="testpaper-struct-sec">D</span> Long Answer / Application <span class="testpaper-struct-marks">5 × 1 = 5</span></div>
        <div class="testpaper-struct-row"><span class="testpaper-struct-sec">E</span> Case Study / Word Problem <span class="testpaper-struct-marks">4 × 1 = 4</span></div>
        <div class="testpaper-struct-total">Total: 15 questions · 32 marks</div>
      </div>
      <div class="testpaper-info">
        <span>⏱ No time limit</span>
        <span>🎲 Randomized each attempt</span>
        <span>📊 Solutions recorded for parents</span>
      </div>
      <button class="testpaper-start-btn" id="testpaperStartBtn">🚀 Start Test</button>
    </div>
  `;

  document.getElementById('testpaperStartBtn').addEventListener('click', function() {
    startTest(chapterData);
  });
}

function startTest(chapterData) {
  const container = document.getElementById('testpaperContent');
  const slug = chapterData.meta.slug;
  const questions = generateTestPaper(slug);

  if (!questions) {
    container.innerHTML = '<p>Could not generate test.</p>';
    return;
  }

  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);

  // Group questions by section for rendering
  const sections = [];
  let currentSection = null;
  questions.forEach(q => {
    if (!currentSection || currentSection.id !== q.section) {
      currentSection = { id: q.section, label: q.sectionLabel, marks: q.marks, questions: [] };
      sections.push(currentSection);
    }
    currentSection.questions.push(q);
  });

  let html = `
    <div class="testpaper-active">
      <div class="testpaper-header">
        <h2>📋 ${chapterData.meta.title} — Test Paper</h2>
        <div class="testpaper-meta">
          <span>${questions.length} questions</span>
          <span>Total: ${totalMarks} marks</span>
        </div>
      </div>
      <form id="testpaperForm">
  `;

  let qCounter = 0;
  sections.forEach(sec => {
    html += `<div class="testpaper-section-header">
      <span class="testpaper-section-id">Section ${sec.id}</span>
      <span class="testpaper-section-label">${sec.label.replace(/^Section [A-E] — /, '')}</span>
      <span class="testpaper-section-marks">${sec.marks} × ${sec.questions.length} = ${sec.marks * sec.questions.length} marks</span>
    </div>`;
    sec.questions.forEach(q => {
      html += `<div class="testpaper-question" data-qnum="${q.number}">
        <div class="testpaper-q-header">
          <span class="testpaper-q-num">Q${q.number}</span>
          <span class="testpaper-q-marks">[${q.marks} mark${q.marks > 1 ? 's' : ''}]</span>
        </div>
        <div class="testpaper-q-text">${q.question}</div>
        <div class="testpaper-options">
  `;
      q.options.forEach((opt, oi) => {
        html += `<label class="testpaper-option">
          <input type="radio" name="q${qCounter}" value="${escapeAttr(opt)}" />
          <span>${escapeHtml(opt)}</span>
        </label>`;
      });
      html += `</div></div>`;
      qCounter++;
    });
  });

  html += `
      <div class="testpaper-submit-area">
        <button type="submit" class="testpaper-submit-btn">✓ Submit Test</button>
      </div>
    </form>
  </div>`;

  container.innerHTML = html;

  document.getElementById('testpaperForm').addEventListener('submit', function(e) {
    e.preventDefault();
    gradeTest(chapterData, questions);
  });
}

function gradeTest(chapterData, questions) {
  const container = document.getElementById('testpaperContent');
  const form = document.getElementById('testpaperForm');

  let correct = 0;
  let earnedMarks = 0;
  const totalMarks = questions.reduce((s, q) => s + q.marks, 0);
  const results = [];

  questions.forEach((q, i) => {
    const selected = form.querySelector(`input[name="q${i}"]:checked`);
    const studentAnswer = selected ? selected.value : '(no answer)';
    const isCorrect = studentAnswer === q.answer;
    if (isCorrect) {
      correct++;
      earnedMarks += q.marks;
    }
    results.push({
      number: q.number,
      section: q.section,
      sectionLabel: q.sectionLabel,
      question: q.question,
      studentAnswer: studentAnswer,
      correctAnswer: q.answer,
      isCorrect: isCorrect,
      marks: q.marks,
      solution: q.solution
    });
  });

  const pct = Math.round((earnedMarks / totalMarks) * 100);

  // Save to localStorage for parent review
  const user = window.Auth ? window.Auth.getCurrentUser() : null;
  // Use email as the uid (students don't have an `id` field — email is unique)
  const uid = user ? user.email : 'unknown';
  const testRecord = {
    timestamp: new Date().toISOString(),
    studentEmail: uid,
    studentName: user ? user.name : 'Unknown',
    grade: user ? user.grade : '—',
    chapterSlug: chapterData.meta.slug,
    chapterTitle: chapterData.meta.title,
    subject: chapterData.meta.subject || 'maths',
    totalQuestions: questions.length,
    correctAnswers: correct,
    totalMarks: totalMarks,
    earnedMarks: earnedMarks,
    percentage: pct,
    results: results
  };
  saveTestResult(uid, testRecord);

  // Track in proctor progress
  if (window.Proctor && window.Proctor.trackTestPaper) {
    window.Proctor.trackTestPaper(chapterData.meta.slug, correct, questions.length, pct);
  }

  // Show results
  let html = `
    <div class="testpaper-result">
      <div class="testpaper-score-banner ${pct >= 80 ? 'excellent' : pct >= 60 ? 'good' : pct >= 40 ? 'average' : 'poor'}">
        <div class="testpaper-score-pct">${pct}%</div>
        <div class="testpaper-score-detail">${correct} / ${questions.length} correct · ${earnedMarks} / ${totalMarks} marks</div>
        <div class="testpaper-score-label">${pct >= 80 ? '🌟 Excellent!' : pct >= 60 ? '👍 Good job!' : pct >= 40 ? '📖 Keep practicing' : '💪 Needs more practice'}</div>
      </div>
      <div class="testpaper-solutions">
        <h3>📝 Detailed Solutions</h3>
  `;

  // Group results by section for display
  const sectionsMap = {};
  results.forEach(r => {
    const sid = r.section || 'A';
    if (!sectionsMap[sid]) sectionsMap[sid] = [];
    sectionsMap[sid].push(r);
  });
  const sectionIds = Object.keys(sectionsMap).sort();
  sectionIds.forEach(sid => {
    const secQuestions = sectionsMap[sid];
    const secLabel = secQuestions[0].sectionLabel || ('Section ' + sid);
    const secMarks = secQuestions[0].marks;
    html += `<div class="testpaper-sol-section-header">
      <span class="testpaper-sol-section-id">Section ${sid}</span>
      <span class="testpaper-sol-section-label">${secLabel.replace(/^Section [A-E] — /, '')}</span>
      <span class="testpaper-sol-section-marks">${secMarks} × ${secQuestions.length} = ${secMarks * secQuestions.length} marks</span>
    </div>`;
    secQuestions.forEach(r => {
      html += `
        <div class="testpaper-solution-card ${r.isCorrect ? 'correct' : 'incorrect'}">
          <div class="testpaper-sol-header">
            <span class="testpaper-sol-num">Q${r.number}</span>
            <span class="testpaper-sol-marks">[${r.marks} mark${r.marks > 1 ? 's' : ''}]</span>
            <span class="testpaper-sol-result">${r.isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
          </div>
          <div class="testpaper-sol-question">${r.question}</div>
          <div class="testpaper-sol-answers">
            <div class="testpaper-sol-row"><strong>Your answer:</strong> <span class="${r.isCorrect ? 'ans-correct' : 'ans-wrong'}">${escapeHtml(r.studentAnswer)}</span></div>
            ${!r.isCorrect ? `<div class="testpaper-sol-row"><strong>Correct answer:</strong> <span class="ans-correct">${escapeHtml(r.correctAnswer)}</span></div>` : ''}
          </div>
          <div class="testpaper-sol-steps">
            <strong>Solution:</strong><br>
            ${r.solution}
          </div>
        </div>
      `;
    });
  });

  html += `
      </div>
      <div class="testpaper-actions">
        <button class="testpaper-retake-btn" id="testpaperRetakeBtn">🔄 Retake Test (New Questions)</button>
      </div>
    </div>
  `;

  container.innerHTML = html;

  document.getElementById('testpaperRetakeBtn').addEventListener('click', function() {
    startTest(chapterData);
  });
}

// ============================================================
// HELPERS
// ============================================================

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/'/g, '&#39;');
}

// ============================================================
// PUBLIC API
// ============================================================

window.TestPaper = {
  render: renderTestPaperTab,
  generate: generateTestPaper,
  getResults: getTestResults,
  saveResult: saveTestResult,
  QUESTION_BANK: QUESTION_BANK
};

})();
