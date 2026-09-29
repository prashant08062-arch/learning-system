/* ============================================================
   CATALOG — Master list of subjects and chapters
   ============================================================
   To add a new chapter:
     1. Create a folder: data/<subject>/<chapter_slug>/
     2. Add a chapter.js file in that folder defining the chapter data
     3. Add the chapter to the appropriate subject below
     4. (Optional) Add an images/ subfolder with reference images

   The chapter.js file must define a global variable:
     window.CHAPTER_DATA = { ... };

   See data/maths/baudhayana_pythagoras/chapter.js for an example.
   ============================================================ */

window.CATALOG = {
  subjects: [
    {
      id: 'maths',
      name: 'Mathematics',
      icon: '📐',
      color: '#38bdf8',
      chapters: [
        {
          slug: 'baudhayana_pythagoras',
          title: 'The Baudhāyana–Pythagoras Theorem',
          subtitle: 'Chapter 2 · Ganita Prakash · Grade 8 Part II',
          description: 'Doubling squares, √2, the main theorem a² + b² = c², Baudhāyana triples, Fermat\'s Last Theorem, and the Līlāvatī lotus problem.',
          dataFile: 'data/maths/baudhayana_pythagoras/chapter.js',
          hasImages: false,
          estimatedTime: '45 min'
        },
        {
          slug: 'fractions_in_disguise',
          title: 'Fractions in Disguise',
          subtitle: 'Chapter 1 · Ganita Prakash · Grade 8 Part II',
          description: 'Discover percentages — fractions wearing a clever disguise! Covers FDP conversions, percentage of a quantity, mental-math tricks, percentage increase/decrease, profit & loss, discounts & taxes, simple vs compound interest, depreciation, and the surprising truth about compound discounts (30% + 20% ≠ 50%!). Story-form narration with 10 lectures, 4 real-life scenarios, 8 guided-practice problems, 14 self-test questions, and a 15-term Before-We-Begin vocabulary section.',
          dataFile: 'data/maths/fractions_in_disguise/chapter.js',
          hasImages: false,
          estimatedTime: '75 min'
        }
      ]
    },
    {
      id: 'geography',
      name: 'Geography',
      icon: '🌍',
      color: '#34d399',
      chapters: [
        {
          slug: 'world_geography',
          title: 'World Geography: Some Glimpses',
          subtitle: 'Chapter 1 · India and the World: Land and the People · Grade 8 Part 2',
          description: 'A whirlwind tour of the Earth\'s landforms and water bodies — from the oceans to the continents, with real maps and satellite images.',
          dataFile: 'data/geography/world_geography/chapter.js',
          hasImages: true,
          estimatedTime: '60 min'
        }
      ]
    },
    {
      id: 'history',
      name: 'History',
      icon: '📜',
      color: '#fbbf24',
      chapters: [
        {
          slug: 'india_independence',
          title: 'India\'s Long Road to Independence',
          subtitle: 'Chapter 2 · Exploring Society: India and Beyond · Grade 8 Part 2',
          description: 'A long, true story of how India became free — from the Royal Proclamation of 1858 to the Independence and Partition of 1947. Told in story-form for little listeners (5-7 year olds), with a \'Before We Begin\' story-time vocabulary section. 12 lectures covering 200 years of history, with 25 figures extracted from the original textbook PDF.',
          dataFile: 'data/history/india_independence/chapter.js',
          hasImages: true,
          estimatedTime: '90 min'
        }
      ]
    },
    {
      id: 'civics',
      name: 'Civics',
      icon: '⚖️',
      color: '#a78bfa',
      chapters: []
    },
    {
      id: 'economics',
      name: 'Economics',
      icon: '💰',
      color: '#fb923c',
      chapters: []
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: '⚛️',
      color: '#f472b6',
      chapters: [
        {
          slug: 'light_mirrors_lenses',
          title: 'Light: Mirrors and Lenses',
          subtitle: 'Chapter 10 · Curiosity — Textbook of Science for Grade 8',
          description: 'Spherical mirrors and lenses — image formation, the two laws of reflection, converging/diverging behaviour. Animated SVG ray diagrams + a 3D mirror-and-lens viewer make every Grade 8 concept crystal-clear even for Class 6–7 students.',
          dataFile: 'data/physics/light_mirrors_lenses/chapter.js',
          hasImages: false,
          estimatedTime: '50 min'
        },
        {
          slug: 'pressure_winds_storms_cyclones',
          title: 'Pressure, Winds, Storms, and Cyclones',
          subtitle: 'Chapter 6 · Curiosity — Textbook of Science for Grade 8',
          description: 'Discover how pressure shapes our world — from broad bag straps to cyclones. Covers the formula P = F/A, liquid pressure, atmospheric pressure, wind formation (high → low pressure), sea & land breezes, high-speed winds and reduced pressure (why roofs blow off), thunderstorms, lightning safety, and cyclones (eye, formation, destruction, IMD tracking). Story-form narration with 10 lectures, 4 real-life scenarios (Megha & Pawan bags, fishermen breezes, roof blow-off, Cyclone Amphan 2020), 8 guided-practice problems, 14 self-test questions, 12 practice cards, and a 15-term Before-We-Begin vocabulary section.',
          dataFile: 'data/physics/pressure_winds_storms_cyclones/chapter.js',
          hasImages: false,
          estimatedTime: '75 min'
        }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '🧪',
      color: '#22d3ee',
      chapters: []
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: '🧬',
      color: '#84cc16',
      chapters: [
        {
          slug: 'how_nature_works_in_harmony',
          title: 'How Nature Works in Harmony',
          subtitle: 'Chapter 12 · Curiosity — Textbook of Science for Grade 8',
          description: 'Discover how every part of nature is connected — from a single fish in a pond to the great mangrove forests that protect our coasts from cyclones. Covers habitats (biotic & abiotic), populations, communities, ecosystems, producers/consumers/decomposers, food chains, trophic levels, food webs, three types of interactions (mutualism/commensalism/parasitism), the cascade effect (Indian bullfrog ban), Sundarbans mangroves vs Cyclone Amphan 2020, elephant corridors, and sustainable farming. Story-form narration with 10 lectures, 4 real-life scenarios, 8 guided-practice problems, 14 self-test questions, 12 practice cards, and a 15-term Before-We-Begin vocabulary section.',
          dataFile: 'data/biology/how_nature_works_in_harmony/chapter.js',
          hasImages: false,
          estimatedTime: '75 min'
        }
      ]
    }
  ]
};
