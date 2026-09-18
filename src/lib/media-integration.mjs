// Videos live next to the markdown that uses them (src/content/log/week-2/clip.mp4) but Astro only
// bundles images. This serves them at /media/... in dev and copies them into the build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONTENT_DIR, VIDEO_EXT } from './markdown.mjs';

const TYPES = { '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime' };

function* videos(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* videos(full);
    else if (VIDEO_EXT.test(entry.name)) yield full;
  }
}

function serve(req, res, next) {
  const rel = decodeURIComponent((req.url ?? '').split('?')[0]).replace(/^\/+/, '');
  const file = path.resolve(CONTENT_DIR, rel);
  if (!file.startsWith(CONTENT_DIR) || !VIDEO_EXT.test(file) || !fs.existsSync(file)) return next();
  const size = fs.statSync(file).size;
  const type = TYPES[path.extname(file).toLowerCase()];
  // Range support: Safari won't play a video without it.
  const m = /bytes=(\d*)-(\d*)/.exec(req.headers.range ?? '');
  if (m) {
    const start = m[1] ? Number(m[1]) : size - Number(m[2]);
    const end = m[1] && m[2] ? Math.min(Number(m[2]), size - 1) : size - 1;
    res.writeHead(206, { 'Content-Type': type, 'Content-Length': end - start + 1, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes' });
    fs.createReadStream(file, { start, end }).pipe(res);
  } else {
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': size, 'Accept-Ranges': 'bytes' });
    fs.createReadStream(file).pipe(res);
  }
}

export default function folioMedia() {
  return {
    name: 'folio-media',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          // Block body on purpose: a function returned from configureServer is treated as a post hook.
          vite: { plugins: [{ name: 'folio-media-dev', configureServer(server) { server.middlewares.use('/media', serve); } }] },
        });
      },
      'astro:build:done': ({ dir, logger }) => {
        const out = fileURLToPath(new URL('media/', dir));
        let n = 0;
        for (const file of videos(CONTENT_DIR)) {
          const dest = path.join(out, path.relative(CONTENT_DIR, file));
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          fs.copyFileSync(file, dest);
          n++;
        }
        if (n) logger.info(`copied ${n} video${n === 1 ? '' : 's'} to /media`);
      },
    },
  };
}
