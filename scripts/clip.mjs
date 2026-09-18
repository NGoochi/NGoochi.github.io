// Compress a screen recording into a small, silent, looping-friendly MP4 inside a week's folder.
//   npm run clip -- ~/Desktop/recording.mov              -> latest week, named after the file
//   npm run clip -- ~/Desktop/recording.mov 3 garage     -> week-3/garage.mp4
// Needs ffmpeg (brew install ffmpeg).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [input, weekArg, nameArg] = process.argv.slice(2);
if (!input || !fs.existsSync(input)) {
  console.error('Usage: npm run clip -- <recording> [week] [name]');
  process.exit(1);
}
const LOG = new URL('../src/content/log/', import.meta.url).pathname;
const weeks = fs.readdirSync(LOG).map((d) => Number(/^week-(\d+)$/.exec(d)?.[1])).filter(Boolean);
const week = Number(weekArg) || Math.max(...weeks);
const name = (nameArg ?? path.parse(input).name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const out = path.join(LOG, `week-${week}`, `${name}.mp4`);
fs.mkdirSync(path.dirname(out), { recursive: true });

execFileSync('ffmpeg', [
  '-loglevel', 'error', '-y', '-i', input,
  '-vf', "scale='min(1600,iw)':-2:flags=lanczos,fps=30,format=yuv420p",
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '26', '-an', '-movflags', '+faststart',
  out,
], { stdio: 'inherit' });

const mb = (fs.statSync(out).size / 1e6).toFixed(1);
console.log(`Wrote ${path.relative(process.cwd(), out)} (${mb} MB). Paste into the post:\n\n![Caption goes here](./${name}.mp4)\n`);
if (mb > 15) console.log('That is big for a web page. Trim it, or keep it under ~20 seconds.');
