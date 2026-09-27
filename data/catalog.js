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
      chapters: []
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
          description: 'Meet spherical mirrors and lenses — image formation, the two laws of reflection, converging/diverging behaviour, and how a torch reflector, a dentist\'s mirror, a magnifying glass, and a solar cooker all work.',
          dataFile: 'data/physics/light_mirrors_lenses/chapter.js',
          hasImages: false,
          estimatedTime: '50 min'
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
      chapters: []
    }
  ]
};
