import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the build can be opened directly from build/index.html.
  output: 'export',

  // Required for `output: 'export'` if <Image /> is used.
  images: { unoptimized: true },

  // Adds a trailing slash so relative asset paths resolve under file://.
  trailingSlash: true,

  // Pin the workspace root so Next.js doesn't drift up to a parent dir
  // when an unrelated package-lock.json exists higher in the tree.
  turbopack: {
    root: __dirname,
  },

  // Let SCSS files `@use 'variables' as *;` without typing the full path.
  // `loadPaths` is the modern Dart Sass option; `includePaths` is the legacy
  // alias. Some sass-loader versions only forward one or the other, so set both.
  sassOptions: {
    loadPaths: [path.join(__dirname, 'styles')],
    includePaths: [path.join(__dirname, 'styles')],
  },
};

export default nextConfig;
