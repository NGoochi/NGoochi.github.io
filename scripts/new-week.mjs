// npm run new-week            -> scaffolds the next week's folder
// npm run new-week -- 5       -> scaffolds week 5
import fs from 'node:fs';
import path from 'node:path';

const LOG = new URL('../src/content/log/', import.meta.url).pathname;
const existing = fs.readdirSync(LOG).map((d) => Number(/^week-(\d+)$/.exec(d)?.[1])).filter(Boolean);
const week = Number(process.argv[2]) || Math.max(0, ...existing) + 1;
const dir = path.join(LOG, `week-${week}`);

if (fs.existsSync(path.join(dir, 'index.md'))) {
  console.error(`week-${week} already exists: ${dir}`);
  process.exit(1);
}
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(
  path.join(dir, 'index.md'),
  `---
week: ${week}
title: Week ${week}
summary: One or two sentences for the contents page.
projects: []            # ids of folders in src/content/projects, e.g. [bot-fighter]
# cover: ./cover.jpg    # thumbnail on the contents page
draft: true             # hidden from the live site until you delete this line
---

## Shipped

What went out this week, with links.

<!-- Screenshots and clips go in this folder, then: ![Caption goes here](./screenshot.jpg) -->

## Feedback

Who tested it, what they said, what changed because of it.

## Post-mortem

What worked, what didn't, what felt clunky.

## Next
`,
);
console.log(`Created src/content/log/week-${week}/index.md. Drop screenshots and clips into the same folder.`);
