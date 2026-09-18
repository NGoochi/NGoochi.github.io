// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import { videoEmbeds, figures } from './src/lib/markdown.mjs';
import folioMedia from './src/lib/media-integration.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://ngoochi.github.io',
  integrations: [folioMedia()],
  devToolbar: { enabled: false },
  // Screenshots are big: generate a srcset so phones don't download 2000px images.
  image: { layout: 'constrained' },
  markdown: {
    processor: satteri({ mdastPlugins: [videoEmbeds], hastPlugins: [figures] }),
  },
});
