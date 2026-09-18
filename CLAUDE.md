# Folio

Weekly project log for the coding-agents elective. Astro 7 static site, deployed to https://ngoochi.github.io/ by `.github/workflows/deploy.yml` on push to `main` (repo `NGoochi/NGoochi.github.io`, public).

## Content model

- `src/content/log/week-N/index.md`: one post per course week. Images and clips sit in the same folder. Schema in `src/content.config.ts`. Dates and themes are derived from `week` via `src/site.ts` (week 1 = Mon 7 Sep 2026).
- `src/content/projects/<id>/index.md` + `cover.jpg`: one per app. Posts reference projects by folder id in `projects: []`.
- `npm run new-week` scaffolds a draft; `npm run clip -- <file> [week] [name]` compresses a recording with ffmpeg.

## Markdown conventions (see `src/lib/markdown.mjs`)

- An image alone in a paragraph becomes `figure.shot` with the alt text as its caption. Consecutive images become `.gallery`.
- `![caption](./x.mp4)` becomes a muted, looping `<video>` served from `/media/<path under src/content>`.
- Astro 7 uses Sätteri, not remark/rehype. Plugins are `{ name, <nodeType>(node, ctx) }` objects passed to `satteri({ mdastPlugins, hastPlugins })`. `markdown.remarkPlugins` does nothing here.

## Writing posts for the user

- Posts are first person, in the user's voice. Keep to facts from commits, READMEs and what the user said. Never invent playtest feedback or quotes; leave an HTML comment placeholder instead.
- Screenshots: resize to 2000px wide JPEG (`sips -s format jpeg -s formatOptions 82 -Z 2000 in.png --out out.jpg`). Astro makes the responsive WebP versions.
- Label demo or scripted data honestly (for example the TasteLens shots in week 2 use a scripted demo lens).

## Dev

`npm run dev` (port 4321; launch config `folio` in the IdeasGuy workspace). `npm run build` must pass before pushing.
