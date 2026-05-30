// After `next build` with `output: 'export'`, Next.js writes the static site
// to /out. The RainFocus brief asks for a /build folder containing index.html,
// so this script moves /out → /build (replacing any previous /build), then
// rewrites absolute asset paths to relative ones so build/index.html can be
// opened directly from the filesystem (file://) and still find its CSS, fonts,
// and images.
//
// Cross-platform via node:fs/promises. On Windows a plain directory rename can
// fail with EPERM/EBUSY when a file watcher (e.g. a running `next dev`) or the
// indexer holds a handle, so we fall back to copy + remove.

import { rm, rename, access, cp, readdir, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve, relative, dirname, join, sep } from 'node:path';

const root = process.cwd();
const outDir = resolve(root, 'out');
const buildDir = resolve(root, 'build');

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
  const relDir = relative(buildDir, dirname(fileAbs));
  const depth = relDir === '' ? 0 : relDir.split(sep).length;
  return depth === 0 ? './' : '../'.repeat(depth);
}

// Make _next / public asset references relative so the page renders from file://.
// Only touches href="" / src="" attributes and CSS url() — NOT inline-script
// chunk maps, which must stay root-absolute so the served build keeps working.
async function relativizeAssets() {
  const files = await walk(buildDir);
  const htmlAttr = /\b(href|src)=(["'])\/(_next\/|icons\/|images\/)/g;
  const cssUrl = /url\((['"]?)\/(_next\/)/g;

  for (const file of files) {
    const isHtml = file.endsWith('.html');
    const isCss = file.endsWith('.css');
    if (!isHtml && !isCss) continue;

    const prefix = prefixFor(file);
    const original = await readFile(file, 'utf8');
    let updated = original;

    if (isHtml) {
      updated = updated.replace(htmlAttr, (_m, attr, quote, dir) => `${attr}=${quote}${prefix}${dir}`);
    } else {
      updated = updated.replace(cssUrl, (_m, quote, dir) => `url(${quote}${prefix}${dir}`);
    }

    if (updated !== original) await writeFile(file, updated);
  }
}

async function main() {
  if (!(await exists(outDir))) {
    console.error(
      `[postbuild] Expected ${outDir} to exist after \`next build\`. ` +
        'Did the static export run? Check next.config.mjs has `output: "export"`.'
    );
    process.exit(1);
  }

  if (await exists(buildDir)) {
    await rm(buildDir, { recursive: true, force: true });
  }

  try {
    await rename(outDir, buildDir);
  } catch (err) {
    // A directory rename can fail on Windows if something holds a handle on the
    // folder (commonly a running dev server's watcher). Copy + remove instead.
    if (['EPERM', 'EBUSY', 'ENOTEMPTY', 'EXDEV'].includes(err.code)) {
      await cp(outDir, buildDir, { recursive: true });
      await rm(outDir, { recursive: true, force: true });
    } else {
      throw err;
    }
  }

  await relativizeAssets();

  console.log('[postbuild] Output ready in /build (asset paths relativized for file://)');
}

main().catch((err) => {
  console.error('[postbuild] Failed:', err);
  process.exit(1);
});
