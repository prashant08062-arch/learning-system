/* CATALOG — Master list of subjects and chapters
   Supports grade/class filtering (Class 6, 7, 8, or All) */

window.CATALOG = {
  subjects: [
    {
      id: 'maths',
      name: 'Mathematics',
      icon: '📐',
      color: '#38bdf8',
      chapters: [
        { slug: 'perimeter_area', title: 'Perimeter and Area', subtitle: 'Chapter 6 · Grade 6', description: 'Perimeter and area of rectangles, squares, triangles, and regular polygons.', grade: 6, dataFile: 'data/maths/perimeter_area/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'baudhayana_pythagoras', title: 'The Baudhāyana–Pythagoras Theorem', subtitle: 'Chapter 2 · Grade 8', description: 'Doubling squares, √2, the main theorem a² + b² = c², Baudhāyana triples.', grade: 8, dataFile: 'data/maths/baudhayana_pythagoras/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'fractions_in_disguise', title: 'Fractions in Disguise', subtitle: 'Chapter 1 · Grade 8', description: 'Percentages — fractions in disguise! FDP conversions, profit & loss, interest.', grade: 8, dataFile: 'data/maths/fractions_in_disguise/chapter.js', hasImages: false, estimatedTime: '75 min', ready: true },
        { slug: 'proportional_reasoning_2', title: 'Proportional Reasoning–2', subtitle: 'Chapter 3 · Grade 8', description: 'Ratios, proportions, pie charts, direct and inverse proportions.', grade: 8, dataFile: 'data/maths/proportional_reasoning_2/chapter.js', hasImages: false, estimatedTime: '70 min', ready: true },
        { slug: 'exploring_geometric_themes', title: 'Exploring Some Geometric Themes', subtitle: 'Chapter 4 · Grade 8', description: 'Fractals (Sierpinski Carpet/Gasket, R_n = 8^n), visualising 3D solids from front/top/side views.', grade: 8, dataFile: 'data/maths/exploring_geometric_themes/chapter.js', hasImages: false, estimatedTime: '30 min', ready: true },
        { slug: 'tales_by_dots_and_lines', title: 'Tales by Dots and Lines', subtitle: 'Chapter 5 · Grade 8', description: 'Mean as a balance point, median, dot plots, and outlier resistance.', grade: 8, dataFile: 'data/maths/tales_by_dots_and_lines/chapter.js', hasImages: false, estimatedTime: '30 min', ready: true },
        { slug: 'algebra_play', title: 'Algebra Play', subtitle: 'Chapter 6 · Grade 8', description: 'Think of a Number tricks (x cancels), number pyramids (a+2b+c), algebraic proofs.', grade: 8, dataFile: 'data/maths/algebra_play/chapter.js', hasImages: false, estimatedTime: '30 min', ready: true },
        { slug: 'area', title: 'Area', subtitle: 'Chapter 7 · Grade 8', description: 'Area of rectangles, triangles, parallelograms, and trapeziums — all formulas with derivations.', grade: 8, dataFile: 'data/maths/area/chapter.js', hasImages: false, estimatedTime: '30 min', ready: true }
      ]
    },
    {
      id: 'geography',
      name: 'Geography',
      icon: '🌍',
      color: '#34d399',
      chapters: [
        { slug: 'locating_places', title: 'Locating Places on the Earth', subtitle: 'Chapter 1 · Grade 6', description: 'Maps, globes, latitudes, longitudes, and time zones.', grade: 6, dataFile: 'data/geography/locating_places/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'oceans_continents', title: 'Oceans and Continents', subtitle: 'Chapter 2 · Grade 6', description: 'The five oceans, seven continents, marine life, and islands.', grade: 6, dataFile: 'data/geography/oceans_continents/chapter.js', hasImages: true, estimatedTime: '40 min', ready: true },
        { slug: 'landforms_life', title: 'Landforms and Life', subtitle: 'Chapter 3 · Grade 6', description: 'Mountains, plateaus, plains and how they shape life.', grade: 6, dataFile: 'data/geography/landforms_life/chapter.js', hasImages: true, estimatedTime: '50 min', ready: true },
        { slug: 'world_geography', title: 'World Geography: Some Glimpses', subtitle: 'Chapter 1 · Grade 8', description: 'Earth\'s landforms and water bodies with real maps and satellite images.', grade: 8, dataFile: 'data/geography/world_geography/chapter.js', hasImages: true, estimatedTime: '60 min', ready: true }
      ]
    },
    {
      id: 'history',
      name: 'History',
      icon: '📜',
      color: '#fbbf24',
      chapters: [
        { slug: 'india_bharat', title: 'India, That Is Bharat', subtitle: 'Chapter 5 · Grade 6', description: 'The many names of India — from Sapta Sindhava to the Constitution.', grade: 6, dataFile: 'data/history/india_bharat/chapter.js', hasImages: true, estimatedTime: '40 min', ready: true },
        { slug: 'india_independence', title: 'India\'s Long Road to Independence', subtitle: 'Chapter 2 · Grade 8', description: 'From 1858 to 1947 — 200 years of India\'s freedom struggle.', grade: 8, dataFile: 'data/history/india_independence/chapter.js', hasImages: true, estimatedTime: '60 min', ready: true },
        { slug: 'indian_architecture', title: 'A Journey Through Indian Architecture', subtitle: 'Chapter 4 · Grade 8', description: 'Indian architecture from Indus Valley cities to stupas, temples, Indo-Islamic monuments, and Lutyens\' Delhi.', grade: 8, dataFile: 'data/history/indian_architecture/chapter.js', hasImages: false, estimatedTime: '50 min', ready: true }
      ]
    },
    {
      id: 'civics',
      name: 'Civics',
      icon: '⚖',
      color: '#f472b6',
      chapters: [
        { slug: 'family_community', title: 'Family and Community', subtitle: 'Chapter 9 · Grade 6', description: 'Types of families, roles, values, and community action.', grade: 6, dataFile: 'data/civics/family_community/chapter.js', hasImages: false, estimatedTime: '40 min', ready: true },
        { slug: 'grassroots_governance', title: 'Grassroots Democracy – Part 1: Governance', subtitle: 'Chapter 10 · Grade 6', description: 'Governance, three organs of government, three tiers, democracy.', grade: 6, dataFile: 'data/civics/grassroots_governance/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'rural_local_government', title: 'Grassroots Democracy – Part 2: Rural Local Government', subtitle: 'Chapter 11 · Grade 6', description: 'Panchayati Raj — Gram Panchayat, Panchayat Samiti, Zila Parishad.', grade: 6, dataFile: 'data/civics/rural_local_government/chapter.js', hasImages: false, estimatedTime: '40 min', ready: true },
        { slug: 'urban_local_government', title: 'Grassroots Democracy – Part 3: Urban Local Government', subtitle: 'Chapter 12 · Grade 6', description: 'Municipal Corporations, wards, and urban governance.', grade: 6, dataFile: 'data/civics/urban_local_government/chapter.js', hasImages: false, estimatedTime: '40 min', ready: true },
        { slug: 'role_of_judiciary', title: 'The Role of the Judiciary in Our Society', subtitle: 'Chapter 4 · Grade 8', description: 'Justice, three-tier judiciary, Public Interest Litigation, Lok Adalats, and independence of judiciary.', grade: 8, dataFile: 'data/civics/role_of_judiciary/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'citizenship_rights_duties', title: 'Citizenship: Rights and Duties', subtitle: 'Chapter 5 · Grade 8', description: 'Citizenship, six Fundamental Rights, eleven Fundamental Duties, and being a good citizen.', grade: 8, dataFile: 'data/civics/citizenship_rights_duties/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true }
      ]
    },
    {
      id: 'economics',
      name: 'Economics',
      icon: '₹',
      color: '#a78bfa',
      chapters: [
        { slug: 'population_urban', title: 'Dynamics of Population & India\'s Urban Landscape', subtitle: 'Chapters 6-7 · Grade 8', description: 'Demography, census, birth/death rates, population pyramid, demographic dividend, urbanisation, and Smart Cities.', grade: 8, dataFile: 'data/economics/population_urban/chapter.js', hasImages: false, estimatedTime: '55 min', ready: true }
      ]
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: '⚛',
      color: '#22d3ee',
      chapters: [
        { slug: 'temperature_measurement', title: 'Temperature and its Measurement', subtitle: 'Chapter 7 · Grade 6', description: 'What is temperature, thermometers, scales, and measurement.', grade: 6, dataFile: 'data/physics/temperature_measurement/chapter.js', hasImages: false, estimatedTime: '40 min', ready: true },
        { slug: 'beyond_earth', title: 'Beyond Earth', subtitle: 'Chapter 12 · Grade 6', description: 'Stars, constellations, the Solar System, Moon, and space exploration.', grade: 6, dataFile: 'data/physics/beyond_earth/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'light_mirrors_lenses', title: 'Light: Mirrors and Lenses', subtitle: 'Chapter 10 · Grade 8', description: 'Spherical mirrors, lenses, image formation, laws of reflection.', grade: 8, dataFile: 'data/physics/light_mirrors_lenses/chapter.js', hasImages: false, estimatedTime: '50 min', ready: true },
        { slug: 'pressure_winds_storms_cyclones', title: 'Pressure, Winds, Storms, and Cyclones', subtitle: 'Chapter 6 · Grade 8', description: 'Pressure, wind formation, cyclones, and lightning safety.', grade: 8, dataFile: 'data/physics/pressure_winds_storms_cyclones/chapter.js', hasImages: false, estimatedTime: '50 min', ready: true },
        { slug: 'keeping_time_skies', title: 'Keeping Time with the Skies', subtitle: 'Chapter 11 · Grade 8', description: 'Moon phases, calendars (lunar/solar/luni-solar), festivals & astronomy, artificial satellites.', grade: 8, dataFile: 'data/physics/keeping_time_skies/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true }
      ]
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '⚗',
      color: '#fb923c',
      chapters: [
        { slug: 'separation_methods', title: 'Methods of Separation in Everyday Life', subtitle: 'Chapter 9 · Grade 6', description: 'Handpicking, threshing, winnowing, sieving, filtration, evaporation.', grade: 6, dataFile: 'data/chemistry/separation_methods/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'particulate_nature_matter', title: 'Particulate Nature of Matter', subtitle: 'Chapter 7 · Grade 8', description: 'Particle theory, three states of matter, interparticle spacing, temperature & motion.', grade: 8, dataFile: 'data/chemistry/particulate_nature_matter/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'elements_compounds_mixtures', title: 'Elements, Compounds, and Mixtures', subtitle: 'Chapter 8 · Grade 8', description: 'Mixtures (homo/heterogeneous), elements, compounds, minerals.', grade: 8, dataFile: 'data/chemistry/elements_compounds_mixtures/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'solutes_solvents_solutions', title: 'Solutes, Solvents, and Solutions', subtitle: 'Chapter 9 · Grade 8', description: 'Solutions, solubility, saturation, gas solubility, density, floating & sinking.', grade: 8, dataFile: 'data/chemistry/solutes_solvents_solutions/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true }
      ]
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: '🧬',
      color: '#a3e635',
      chapters: [
        { slug: 'mindful_eating', title: 'Mindful Eating: A Path to a Healthy Body', subtitle: 'Chapter 3 · Grade 6', description: 'Food variety, nutrients, balanced diet, and mindful eating habits.', grade: 6, dataFile: 'data/biology/mindful_eating/chapter.js', hasImages: false, estimatedTime: '40 min', ready: true },
        { slug: 'living_creatures', title: 'Living Creatures: Exploring their Characteristics', subtitle: 'Chapter 10 · Grade 6', description: 'What makes something living, characteristics, plants, habitats.', grade: 6, dataFile: 'data/biology/living_creatures/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'natures_treasures', title: "Nature's Treasures", subtitle: 'Chapter 11 · Grade 6', description: 'Natural resources, air, water, forests, and conservation.', grade: 6, dataFile: 'data/biology/natures_treasures/chapter.js', hasImages: false, estimatedTime: '45 min', ready: true },
        { slug: 'how_nature_works_in_harmony', title: 'How Nature Works in Harmony', subtitle: 'Chapter 12 · Grade 8', description: 'Habitats, ecosystems, food chains, and interactions in nature.', grade: 8, dataFile: 'data/biology/how_nature_works_in_harmony/chapter.js', hasImages: false, estimatedTime: '50 min', ready: true },
        { slug: 'our_home_earth', title: 'Our Home: Earth, a Unique Life Sustaining Planet', subtitle: 'Chapter 13 · Grade 8', description: 'Earth as a unique planet, solar system, atmosphere, and sustainability.', grade: 8, dataFile: 'data/biology/our_home_earth/chapter.js', hasImages: false, estimatedTime: '50 min', ready: true }
      ]
    }
  ]
};
