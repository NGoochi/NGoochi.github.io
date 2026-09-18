// Markdown conventions for log posts (Sätteri plugins, Astro 7's markdown engine):
//   ![caption](./shot.jpg)            one image on its own line -> <figure> with the caption underneath
//   several images on consecutive lines -> a gallery grid
//   ![caption](./clip.mp4)            a video -> silent looping <video>, served from /media/...
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONTENT_DIR = fileURLToPath(new URL('../content/', import.meta.url));
export const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

/** URL a video next to a markdown file is served from, e.g. /media/log/week-2/clip.mp4 */
export function mediaUrl(markdownFile, relative) {
  const dir = path.relative(CONTENT_DIR, path.dirname(markdownFile));
  return '/media/' + path.posix.join(dir.split(path.sep).join('/'), relative.replace(/^\.\//, ''));
}

/** mdast: turn `![caption](./clip.mp4)` into a <video>. Runs before Astro collects images, so the
 *  URL is made absolute here and Astro's image pipeline never tries to optimise a video. */
export const videoEmbeds = ({ fileURL }) => {
  if (!fileURL) return null;
  const file = fileURLToPath(fileURL);
  return {
    name: 'folio-video',
    image(node, ctx) {
      const url = node.url ?? '';
      if (!VIDEO_EXT.test(url) || /^[a-z]+:|^\//i.test(url)) return;
      ctx.setProperty(node, 'url', mediaUrl(file, decodeURI(url)));
      ctx.setProperty(node, 'data', {
        hName: 'video',
        hProperties: {
          src: mediaUrl(file, decodeURI(url)),
          autoplay: true, muted: true, loop: true, playsInline: true, preload: 'metadata',
          dataCaption: node.alt ?? '',
          ariaLabel: node.alt ?? '',
        },
        hChildren: [],
      });
    },
  };
};

const isMedia = (n) => n.type === 'element' && (n.tagName === 'img' || n.tagName === 'video');
const isBlank = (n) => (n.type === 'text' && !n.value.trim()) || (n.type === 'element' && n.tagName === 'br');
const captionOf = (n) => String(n.properties?.dataCaption ?? n.properties?.alt ?? '').trim();

function figure(media) {
  const caption = captionOf(media);
  const children = [media];
  if (caption) children.push({ type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: caption }] });
  return { type: 'element', tagName: 'figure', properties: { className: ['shot'] }, children };
}

/** hast: a paragraph holding only images/videos becomes a captioned figure, or a gallery of them. */
export const figures = {
  name: 'folio-figures',
  element: {
    filter: ['p'],
    visit(node, ctx) {
      const kids = node.children ?? [];
      const media = kids.filter(isMedia);
      if (!media.length || !kids.every((k) => isMedia(k) || isBlank(k))) return;
      if (media.length === 1) ctx.replaceNode(node, figure(media[0]));
      else ctx.replaceNode(node, {
        type: 'element', tagName: 'div',
        properties: { className: ['gallery', media.length % 3 === 0 ? 'cols-3' : 'cols-2'] },
        children: media.map(figure),
      });
    },
  },
};
