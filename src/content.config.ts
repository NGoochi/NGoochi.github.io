import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every entry is a folder holding index.md plus its images and clips; the folder name is the id.
const folderId = ({ entry }: { entry: string }) => entry.split('/')[0];

const projects = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/projects', generateId: folderId }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      tagline: z.string(),
      status: z.enum(['live', 'prototype', 'in progress', 'paused', 'retired']),
      started: z.coerce.date(),
      site: z.url().optional(),
      repo: z.url().optional(),
      /** The repo exists but isn't public: shows "private repo" instead of a link. */
      repoPrivate: z.boolean().default(false),
      stack: z.array(z.string()).default([]),
      cover: image().optional(),
      coverAlt: z.string().default(''),
    }),
});

const log = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/log', generateId: folderId }),
  schema: ({ image }) =>
    z.object({
      week: z.number().int().min(1),
      title: z.string(),
      summary: z.string(),
      /** Defaults to the course theme for this week (src/site.ts). */
      theme: z.string().optional(),
      projects: z.array(reference('projects')).default([]),
      cover: image().optional(),
      coverAlt: z.string().default(''),
      /** Drafts show in `npm run dev` but are left out of the published site. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, log };
