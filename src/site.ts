// Site-wide settings. Edit these, not the layouts.
export const SITE = {
  title: 'Folio',
  author: 'Nick',
  description: 'A weekly log of small apps built with coding agents: what shipped, what broke, what is next.',
  github: 'https://github.com/NGoochi',
  // Monday of week 1. Every week's dates are counted from here.
  termStart: '2026-09-07',
};

// Course themes by week, from the elective schedule. A post can override with `theme:`.
export const THEMES: Record<number, string> = {
  1: 'Making Games with Coding Agents',
  2: 'Minimum Viable Products',
  3: 'Starting a Company',
  4: 'Iteration',
  5: 'Automation',
  6: 'Launch',
};
