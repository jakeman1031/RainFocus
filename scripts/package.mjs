// Produces the delivery artifacts named per the brief:
//   ../jake-arciniega-rf-ui/       a clean copy of the project (src + build)
//   ../jake-arciniega-rf-ui.zip    the same, zipped
// Heavy/generated folders (node_modules, .next, out, .git) are excluded.
//
// The copied build's asset paths are relativized so a reviewer can open
// build/index.html straight from the filesystem (file://) and still find its
// CSS, fonts, and images. The project's own /build is left untouched (absolute
// paths) so it keeps hydrating cleanly when served at a root.
//
// Run via `npm run package` (which builds first).

import { cp, rm, access, readdir, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve, relative, dirname, join, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const NAME = 'jake-arciniega-rf-ui';
const stage = resolve(root, '..', NAME);
const zip = resolve(root, '..', `${NAME}.zip`);
const stageBuild = resolve(stage, 'build');

const EXCLUDE = new Set(['node_modules', '.next', 'out', '.git']);

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

// `./` for files at the build root, `../` per directory level deeper.
function prefixFor(fileAbs) {
  const relDir = relative(stageBuild, dirname(fileAbs));
  const depth = relDir === '' ? 0 : relDir.split(sep).length;
  return depth === 0 ? './' : '../'.repeat(depth);
}

// Only touches href="" / src="" attributes and CSS url() — never inline-script
// chunk maps — so the relative build still works when served from a root too.
async function relativizeBuild() {
  const files = await walk(stageBuild);
  const htmlAttr = /\b(href|src)=(["'])\/(_next\/|icons\/|images\/)/g;
  const cssUrl = /url\((['"]?)\/(_next\/)/g;

  for (const file of files) {
    const isHtml = file.endsWith('.html');
    const isCss = file.endsWith('.css');
    if (!isHtml && !isCss) continue;

    const prefix = prefixFor(file);
    const original = await readFile(file, 'utf8');
    const updated = isHtml
      ? original.replace(htmlAttr, (_m, attr, q, dir) => `${attr}=${q}${prefix}${dir}`)
      : original.replace(cssUrl, (_m, q, dir) => `url(${q}${prefix}${dir}`);

    if (updated !== original) await writeFile(file, updated);
  }
}

async function main() {
  if (!(await exists(resolve(root, 'build')))) {
    console.error('[package] No /build folder found — run `npm run build` first.');
    process.exit(1);
  }

  await rm(stage, { recursive: true, force: true });
  await rm(zip, { force: true });

  await cp(root, stage, {
    recursive: true,
    filter: (src) => {
      if (src === root) return true;
      const top = src.slice(root.length + 1).split(/[\\/]/)[0];
      return !EXCLUDE.has(top);
    },
  });

  await relativizeBuild();

  // Node has no built-in zip; use PowerShell's Compress-Archive (Windows).
  execFileSync(
    'powershell',
    ['-NoProfile', '-Command', `Compress-Archive -Path '${stage}' -DestinationPath '${zip}' -Force`],
    { stdio: 'inherit' }
  );

  console.log(`[package] Created (build paths relativized for file://):\n  ${stage}\n  ${zip}`);
}

main().catch((err) => {
  console.error('[package] Failed:', err);
  process.exit(1);
});
