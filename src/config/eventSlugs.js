// Short, easy-to-share slugs mapped to the full event names stored in the DB.
// Update this whenever events change from year to year.
export const EVENT_SLUGS = {
  promptarena2026: 'PROMPT ARENA - Prompt Engineering',
  visioncraft2026: 'VISION CRAFT - Prompt to Website',
  cypera2026: 'CYPHRA - Debugging',
  vestigealibi2026: 'VESTIGE ALIBI - Crime Investigation',
  synthsteel2026: 'SYNTH & STEEL - Idea Presentation',
  obsidiantrail2026: 'THE OBSIDIAN TRAIL - Treasure Hunt',
  memora2026: 'MEMORA - Meme Creation'
};

// Reverse lookup: full event name -> slug, used to build links to the
// coordinator view from the main admin panel.
export const EVENT_NAME_TO_SLUG = Object.fromEntries(
  Object.entries(EVENT_SLUGS).map(([slug, name]) => [name, slug])
);
