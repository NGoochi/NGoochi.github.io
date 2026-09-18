# Folio

A weekly project log, live at **https://ngoochi.github.io/**. Every post is a Markdown file; pushing to `main` rebuilds and publishes the site (about a minute).

## Writing a week

```sh
npm run new-week        # creates src/content/log/week-N/index.md as a draft
npm run dev             # preview at http://localhost:4321 (drafts show here, not on the live site)
```

Everything for a week lives in its folder:

```
src/content/log/week-3/
  index.md              the post
  garage.jpg            screenshots, next to the post
  demo.mp4              clips too
```

In the post:

| You write | You get |
| --- | --- |
| `![Caption](./shot.jpg)` on its own line | a full-width screenshot with the caption underneath |
| two or three images on consecutive lines (no blank line between) | a side-by-side gallery |
| `![Caption](./demo.mp4)` | a silent, looping video |
| `![Caption](../week-1/old.jpg)` | an image from another week (before/after) |
| `<!-- note to self -->` | nothing (hidden) |

Delete `draft: true` from the top of the file when it's ready, then commit and push.

### Clips

Screen recordings are huge. Compress one straight into the latest week's folder:

```sh
npm run clip -- ~/Desktop/recording.mov                # -> week-N/recording.mp4
npm run clip -- ~/Desktop/recording.mov 3 garage-tour  # -> week-3/garage-tour.mp4
```

It prints the line to paste into the post. Keep clips short (under about 20 seconds).

## The top of a post

```yaml
week: 3                     # dates and the course theme are worked out from this
title: Naming the company
summary: One or two sentences for the contents page.
projects: [tastelens]       # folder names in src/content/projects
cover: ./garage.jpg         # contents-page thumbnail and link preview
coverAlt: What the cover shows
theme: Something else       # optional: overrides the course theme for the week
draft: true                 # optional: hides it from the live site
```

## Adding a project

Make a folder in `src/content/projects/` with an `index.md` and a `cover.jpg`:

```yaml
name: TasteLens
tagline: One line.
status: live                # live | prototype | in progress | paused | retired
started: 2026-09-17
site: https://…             # optional: the "Try it live" button
repo: https://github.com/…  # optional: the "Source" button
repoPrivate: true           # optional: shows "Source not public" instead
stack: [React, Supabase]
cover: ./cover.jpg
coverAlt: What the cover shows
```

The text below the frontmatter becomes the project page. Each project page lists every week that tags it.

## Site settings

`src/site.ts` holds the site title, the first Monday of the course (`termStart`), and the course themes by week.

## How it's built

Astro 7 with its default Markdown engine (Sätteri). Two small plugins in `src/lib/markdown.mjs` turn image-only paragraphs into figures and galleries, and `.mp4` links into videos. `src/lib/media-integration.mjs` serves those videos in dev and copies them into the build. `.github/workflows/deploy.yml` builds on every push to `main` and publishes to GitHub Pages.
