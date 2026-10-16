// Renders every ```mermaid fence under content/ to a PNG beside its Markdown
// file, named diagram-<hash>.png. layouts/section.rss.xml looks the image up
// by the same hash, so feed readers (which can't run Mermaid) get a picture.
//
// The hash covers the diagram source only: editing a diagram yields a new
// file, and images no longer referenced by any fence are deleted.
//
// Usage: node scripts/render-mermaid.mjs   (from anywhere)
import { createHash } from 'node:crypto';
import { readdir, readFile, rm, access } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = join(root, 'content');
const mermaidLib = join(root, 'scripts/node_modules/mermaid/dist/mermaid.min.js');

// Keep in sync with the hash in layouts/section.rss.xml.
const normalize = (src) => src.replaceAll('\r\n', '\n').trim();
const hashOf = (src) =>
  createHash('sha256').update(normalize(src)).digest('hex').slice(0, 12);

const BACKGROUND = '#f4f4f5'; // opaque: readers can't pick a light/dark variant
const FONT = 'DejaVu Sans, Arial, sans-serif';

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const exists = (path) => access(path).then(() => true, () => false);

// dir -> Map(hash -> source)
const wanted = new Map();
const existing = new Map(); // dir -> [diagram-*.png file names]
for await (const path of walk(contentDir)) {
  const dir = dirname(path);
  const name = path.slice(dir.length + 1);
  if (/^diagram-[0-9a-f]{12}\.png$/.test(name)) {
    existing.set(dir, [...(existing.get(dir) ?? []), name]);
  } else if (name.endsWith('.md')) {
    const text = await readFile(path, 'utf8');
    for (const [, src] of text.matchAll(/^```mermaid[ \t]*\r?\n([\s\S]*?)^```/gm)) {
      const map = wanted.get(dir) ?? new Map();
      map.set(hashOf(src), normalize(src));
      wanted.set(dir, map);
    }
  }
}

const todo = [];
for (const [dir, map] of wanted) {
  for (const [hash, src] of map) {
    if (!(await exists(join(dir, `diagram-${hash}.png`)))) todo.push({ dir, hash, src });
  }
}

let browser;
if (todo.length) {
  browser = await chromium.launch();
  const lib = await readFile(mermaidLib, 'utf8');
  for (const { dir, hash, src } of todo) {
    const page = await browser.newPage({ deviceScaleFactor: 2 });
    await page.setContent(
      `<body style="margin:0;background:${BACKGROUND}">` +
        `<div id="frame" style="display:inline-block;padding:16px;background:${BACKGROUND}">` +
        `<pre class="mermaid" id="diagram"></pre></div></body>`,
    );
    await page.addScriptTag({ content: lib });
    await page.evaluate(
      async ({ src, font }) => {
        const el = document.getElementById('diagram');
        el.textContent = src;
        mermaid.initialize({ startOnLoad: false, theme: 'default', fontFamily: font });
        await mermaid.run({ nodes: [el] });
      },
      { src, font: FONT },
    );
    const out = join(dir, `diagram-${hash}.png`);
    await page.locator('#frame').screenshot({ path: out });
    await page.close();
    console.log(`rendered ${out.slice(root.length + 1)}`);
  }
  await browser.close();
}

// Remove images whose diagram no longer exists in the post.
for (const [dir, names] of existing) {
  const keep = wanted.get(dir) ?? new Map();
  for (const name of names) {
    if (!keep.has(name.slice(8, 20))) {
      await rm(join(dir, name));
      console.log(`removed ${join(dir, name).slice(root.length + 1)}`);
    }
  }
}

if (!todo.length) console.log('diagram images up to date');
