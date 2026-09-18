import { SITE, THEMES } from '../site';

const DAY = 86_400_000;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function weekStart(week: number): Date {
  return new Date(Date.parse(`${SITE.termStart}T00:00:00Z`) + (week - 1) * 7 * DAY);
}

/** "7–13 Sep 2026", or "28 Sep – 4 Oct 2026" across a month boundary. */
export function weekRange(week: number): string {
  const a = weekStart(week);
  const b = new Date(a.getTime() + 6 * DAY);
  const [ad, am, bd, bm, y] = [a.getUTCDate(), MONTHS[a.getUTCMonth()], b.getUTCDate(), MONTHS[b.getUTCMonth()], b.getUTCFullYear()];
  return am === bm ? `${ad}–${bd} ${bm} ${y}` : `${ad} ${am} – ${bd} ${bm} ${y}`;
}

export function weekTheme(week: number, override?: string): string | undefined {
  return override ?? THEMES[week];
}

export const pad = (n: number) => String(n).padStart(2, '0');
