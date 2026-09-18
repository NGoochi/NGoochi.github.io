import { getCollection, type CollectionEntry } from 'astro:content';

/** Published log entries, newest week first. Drafts only appear in `npm run dev`. */
export async function getWeeks(): Promise<CollectionEntry<'log'>[]> {
  const all = await getCollection('log', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.week - a.data.week);
}

export async function getProjects(): Promise<CollectionEntry<'projects'>[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.started.getTime() - b.data.started.getTime());
}

export const weekHref = (entry: CollectionEntry<'log'>) => `/log/${entry.id}/`;
export const projectHref = (id: string) => `/projects/${id}/`;
