---
name: CritRPG
tagline: A Stick RPG 2–style life sim where every texture, model and sound is generated in code.
status: prototype
started: 2026-09-07
stack: [Three.js, Vite, Web Audio API]
cover: ./cover.jpg
coverAlt: Crit City at night, seen from above, with lit shopfronts and street lamps
---

A stick-figure life sim in the spirit of Stick RPG 2. You start in Mum's basement with $150, get a job, train your stats, fight in The Pit, and work up to the hilltop mansion.

There are no image, model or audio files in the project. Textures are painted onto canvases at runtime, the city and characters are built from primitives, and the music and sound effects are synthesised with the Web Audio API.

- **Stats and levels:** strength, intelligence, charisma and dexterity, trained at the gym, university, club and dojo, or on the job.
- **13 jobs** with ten levels each. Promotions need shifts plus the next level's stats, and karma gates some jobs in both directions.
- **Day and night:** a full clock where shifts, training and meals all cost time, and the city's lights and fog change with the hour.
- **The Pit:** five top-down arenas with enemy waves carrying real weapons and armour, and loot that drops.
- **Homes:** five of them, from the basement to the mansion, with eight renovation tracks.

It runs locally with `npm run dev`. It isn't deployed yet.
