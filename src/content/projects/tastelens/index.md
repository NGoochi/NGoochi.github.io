---
name: TasteLens
tagline: Pinterest and Miro, but not crap. A taste trainer that learns your eye from quick A/B picks.
status: in progress
started: 2026-09-17
repoPrivate: true
stack: [React, TypeScript, CLIP via transformers.js, Supabase, Vercel]
cover: ./cover.jpg
coverAlt: TasteLens comparing two buildings side by side, a stadium against a concrete tower
---

A taste trainer for designers. You're shown two images at a time and pick one with the arrow keys, about three seconds a decision. A small model learns what you're drawn to and puts it in words you can read, correct and export.

- **Everything runs in the browser.** CLIP embeddings come from transformers.js (a one-off model download that then stays cached), preferences are fitted with a Bradley–Terry model, and each next pair is chosen to be as informative as possible.
- **An honest score.** The Test screen predicts your pick before you make it. The headline accuracy counts only randomly chosen pairs, and it's plotted between a coin flip and your own self-consistency ceiling.
- **A library that grows.** Every 40 comparisons, your current likes and dislikes become searches across Wikimedia Commons, Unsplash and Pexels. New images are kept only if they'll sharpen the lens.
- **Accounts and sync are optional,** via Supabase with row-level security. Signed out, nothing leaves the device.
