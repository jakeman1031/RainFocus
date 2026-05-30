// After `next build` with `output: 'export'`, Next.js writes the static site
// to /out. The RainFocus brief asks for a /build folder containing index.html,
// so this script moves /out → /build (replacing any previous /build).
//
// Asset paths are left ABSOLUTE here — that's what works when the site is
// served from a root (next dev, serve:build, the CodeSandbox preview), and it
// hydrates cleanly. The delivery zip gets a separate, relativized copy so it
// can also be opened straight from the filesystem (see scripts/package.mjs).
//
// Cross-platform via node:fs/promises. On Windows a plain directory rename can
// fail with EPERM/EBUSY when a file watcher (e.g. a running `next dev`) or the
// indexer holds a handle, so we fall back to copy + remove.

import { rm, rename, access, cp } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve } from 'node:path';

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

  console.log('[postbuild] Output ready in /build');
}

main().catch((err) => {
  console.error('[postbuild] Failed:', err);
  process.exit(1);
});
