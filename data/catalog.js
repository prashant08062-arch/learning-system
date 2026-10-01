/* ============================================================
   CATALOG — registers all chapters in the learning system
   Supports grade/class filtering (Class 6, 7, 8, or All)
   ============================================================
   Each chapter entry:
     subject     : must match a subject id below
     slug        : must match the folder name data/<subject>/<slug>/
     title       : display title
     chapterNo   : chapter number
     grade       : 6, 7, or 8 (used for class filtering)
     dataFile    : path to chapter.js
     hasImages   : true if chapter has an images/ subfolder
     estimatedTime : approximate study time
     ready       : true when chapter has content built
   ============================================================ */

window.SUBJECTS = [
  {
    id: 'maths',
    name: 'Mathematics',
    icon: '∑',
    color: '#38bdf8',
    blurb: 'Numbers, shapes, theorems, and proofs — the language of the universe.',
    chapters: [
      {
        slug: 'perimeter_area',
        title: 'Perimeter and Area',
        chapterNumber: 6,
        grade: 6,
        dataFile: 'data/maths/perimeter_area/chapter.js',
        hasImages: false,
        estimatedTime: '45 min',
        ready: true
      },
      {
        slug: 'baudhayana_pythagoras',
        title: 'The Baudhāyana–Pythagoras Theorem',
        chapterNumber: 2,
        grade: 8,
        dataFile: 'data/maths/baudhayana_pythagoras/chapter.js',
        hasImages: false,
        estimatedTime: '45 min',
        ready: false
      },
      {
        slug: 'fractions_in_disguise',
        title: 'Fractions in Disguise',
        chapterNumber: 1,
        grade: 8,
        dataFile: 'data/maths/fractions_in_disguise/chapter.js',
        hasImages: false,
        estimatedTime: '75 min',
        ready: false
      },
      {
        slug: 'proportional_reasoning_2',
        title: 'Proportional Reasoning–2',
        chapterNumber: 3,
        grade: 8,
        dataFile: 'data/maths/proportional_reasoning_2/chapter.js',
        hasImages: false,
        estimatedTime: '70 min',
        ready: false
      }
    ]
  },
  {
    id: 'geography',
    name: 'Geography',
    icon: '🌐',
    color: '#34d399',
    blurb: 'Lands, climates, rivers, and the living Earth.',
    chapters: [
      {
        slug: 'locating_places',
        title: 'Locating Places on the Earth',
        chapterNumber: 1,
        grade: 6,
        dataFile: 'data/geography/locating_places/chapter.js',
        hasImages: false,
        estimatedTime: '45 min',
        ready: true
      },
      {
        slug: 'oceans_continents',
        title: 'Oceans and Continents',
        chapterNumber: 2,
        grade: 6,
        dataFile: 'data/geography/oceans_continents/chapter.js',
        hasImages: true,
        estimatedTime: '40 min',
        ready: true
      },
      {
        slug: 'landforms_life',
        title: 'Landforms and Life',
        chapterNumber: 3,
        grade: 6,
        dataFile: 'data/geography/landforms_life/chapter.js',
        hasImages: true,
        estimatedTime: '50 min',
        ready: true
      },
      {
        slug: 'world_geography',
        title: 'World Geography: Some Glimpses',
        chapterNumber: 1,
        grade: 8,
        dataFile: 'data/geography/world_geography/chapter.js',
        hasImages: true,
        estimatedTime: '60 min',
        ready: false
      }
    ]
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    color: '#fbbf24',
    blurb: 'The tapestry of the past — kingdoms, peoples, ideas, and the long road to today.',
    chapters: [
      {
        slug: 'india_bharat',
        title: 'India, That Is Bharat',
        chapterNumber: 5,
        grade: 6,
        dataFile: 'data/history/india_bharat/chapter.js',
        hasImages: true,
        estimatedTime: '40 min',
        ready: true
      },
      {
        slug: 'india_independence',
        title: 'India\'s Long Road to Independence',
        chapterNumber: 2,
        grade: 8,
        dataFile: 'data/history/india_independence/chapter.js',
        hasImages: true,
        estimatedTime: '60 min',
        ready: false
      }
    ]
  },
  {
    id: 'civics',
    name: 'Civics',
    icon: '⚖',
    color: '#f472b6',
    blurb: 'Government, rights, citizenship — how we live together.',
    chapters: [
      {
        slug: 'family_community',
        title: 'Family and Community',
        chapterNumber: 9,
        grade: 6,
        dataFile: 'data/civics/family_community/chapter.js',
        hasImages: false,
        estimatedTime: '40 min',
        ready: true
      },
      {
        slug: 'grassroots_governance',
        title: 'Grassroots Democracy \u2013 Part 1: Governance',
        chapterNumber: 10,
        grade: 6,
        dataFile: 'data/civics/grassroots_governance/chapter.js',
        hasImages: false,
        estimatedTime: '45 min',
        ready: true
      },
      {
        slug: 'rural_local_government',
        title: 'Grassroots Democracy \u2013 Part 2: Rural Local Government',
        chapterNumber: 11,
        grade: 6,
        dataFile: 'data/civics/rural_local_government/chapter.js',
        hasImages: false,
        estimatedTime: '40 min',
        ready: true
      },
      {
        slug: 'urban_local_government',
        title: 'Grassroots Democracy \u2013 Part 3: Urban Local Government',
        chapterNumber: 12,
        grade: 6,
        dataFile: 'data/civics/urban_local_government/chapter.js',
        hasImages: false,
        estimatedTime: '40 min',
        ready: true
      }
    ]
  },
  {
    id: 'economics',
    name: 'Economics',
    icon: '₹',
    color: '#a78bfa',
    blurb: 'Money, markets, work, and the choices that shape our daily lives.',
    chapters: []
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛',
    color: '#22d3ee',
    blurb: 'Motion, energy, light, and the rules that govern matter.',
    chapters: [
      {
        slug: 'temperature_measurement',
        title: 'Temperature and its Measurement',
        chapterNumber: 7,
        grade: 6,
        dataFile: 'data/physics/temperature_measurement/chapter.js',
        hasImages: false,
        estimatedTime: '40 min',
        ready: true
      },
      {
        slug: 'beyond_earth',
        title: 'Beyond Earth',
        chapterNumber: 12,
        grade: 6,
        dataFile: 'data/physics/beyond_earth/chapter.js',
        hasImages: false,
        estimatedTime: '45 min',
        ready: true
      },
      {
        slug: 'light_mirrors_lenses',
        title: 'Light: Mirrors and Lenses',
        chapterNumber: 10,
        grade: 8,
        dataFile: 'data/physics/light_mirrors_lenses/chapter.js',
        hasImages: false,
        estimatedTime: '50 min',
        ready: false
      },
      {
        slug: 'pressure_winds_storms_cyclones',
        title: 'Pressure, Winds, Storms, and Cyclones',
        chapterNumber: 6,
        grade: 8,
        dataFile: 'data/physics/pressure_winds_storms_cyclones/chapter.js',
        hasImages: false,
        estimatedTime: '50 min',
        ready: false
      }
    ]
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    icon: '⚗',
    color: '#fb923c',
    blurb: 'Elements, atoms, reactions — the science of substance.',
    chapters: [
      {
        slug: 'separation_methods',
        title: 'Methods of Separation in Everyday Life',
        chapterNumber: 9,
        grade: 6,
        dataFile: 'data/chemistry/separation_methods/chapter.js',
        hasImages: false,
        estimatedTime: '45 min',
        ready: true
      }
    ]
  },
  {
    id: 'biology',
    name: 'Biology',
    icon: '🧬',
    color: '#a3e635',
    blurb: 'Life in all its forms — cells, organisms, ecosystems, evolution.',
    chapters: [
      {
        slug: 'mindful_eating',
        title: 'Mindful Eating: A Path to a Healthy Body',
        chapterNumber: 3,
        grade: 6,
        dataFile: 'data/biology/mindful_eating/chapter.js',
        hasImages: false,
        estimatedTime: '40 min',
        ready: true
      },
      {
        slug: 'living_creatures',
        title: 'Living Creatures: Exploring their Characteristics',
        chapterNumber: 10,
        grade: 6,
        dataFile: 'data/biology/living_creatures/chapter.js',
        hasImages: false,
        estimatedTime: '45 min',
        ready: true
      },
      {
        slug: 'natures_treasures',
        title: "Nature's Treasures",
        chapterNumber: 11,
        grade: 6,
        dataFile: 'data/biology/natures_treasures/chapter.js',
        hasImages: false,
        estimatedTime: '45 min',
        ready: true
      },
      {
        slug: 'how_nature_works_in_harmony',
        title: 'How Nature Works in Harmony',
        chapterNumber: 12,
        grade: 8,
        dataFile: 'data/biology/how_nature_works_in_harmony/chapter.js',
        hasImages: false,
        estimatedTime: '50 min',
        ready: false
      },
      {
        slug: 'our_home_earth',
        title: 'Our Home: Earth, a Unique Life Sustaining Planet',
        chapterNumber: 13,
        grade: 8,
        dataFile: 'data/biology/our_home_earth/chapter.js',
        hasImages: false,
        estimatedTime: '50 min',
        ready: false
      }
    ]
  }
];
