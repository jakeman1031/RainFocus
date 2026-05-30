// Produces the delivery artifacts named per the brief:
//   ../jake-arciniega-rf-ui/       a clean copy of the project (src + build)
//   ../jake-arciniega-rf-ui.zip    the same, zipped
// Heavy/generated folders (node_modules, .next, out, .git) are excluded.
// Run via `npm run package` (which builds first).

import { cp, rm, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { resolve, sep } from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const NAME = 'jake-arciniega-rf-ui';
const stage = resolve(root, '..', NAME);
const zip = resolve(root, '..', `${NAME}.zip`);

const EXCLUDE = new Set(['node_modules', '.next', 'out', '.git']);

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
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

  // Node has no built-in zip; use PowerShell's Compress-Archive (Windows).
  execFileSync(
    'powershell',
    ['-NoProfile', '-Command', `Compress-Archive -Path '${stage}' -DestinationPath '${zip}' -Force`],
    { stdio: 'inherit' }
  );

  console.log(`[package] Created:\n  ${stage}\n  ${zip}`);
}

main().catch((err) => {
  console.error('[package] Failed:', err);
  process.exit(1);
});
