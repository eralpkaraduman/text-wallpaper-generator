#!/usr/bin/env node
/**
 * Updates static HTML pages to use shared analytics.js instead of inline scripts.
 *
 * What it does:
 * 1. Finds all static HTML files in use-cases/ and localized folders
 * 2. Replaces the inline analytics block with a single script reference
 *
 * Run: node scripts/update-analytics.js
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

// Directories containing static HTML files
const STATIC_DIRS = [
  'use-cases',
  'zh',
  'ja',
  'de',
  'tr',
  'id'
];

// Find all HTML files in a directory recursively
function findHtmlFiles(dir) {
  const files = [];

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.html')) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

// Replace inline analytics with shared script
function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already updated
  if (content.includes('/shared/analytics.js')) {
    console.log(`  SKIP: ${path.relative(SRC_DIR, filePath)} (already updated)`);
    return false;
  }

  // Pattern to match the full analytics block:
  // <!-- Analytics -->
  // <script src="https://analytics.ahrefs.com/..."></script>
  // <script defer src="https://umami..."></script>
  // <script async src="https://www.googletagmanager.com/..."></script>
  // <script>
  //   window.dataLayer = ...
  // </script>
  const analyticsPattern = /\s*<!-- Analytics -->\s*\n\s*<script src="https:\/\/analytics\.ahrefs\.com\/analytics\.js"[^>]*><\/script>\s*\n\s*<script defer src="https:\/\/umami[^>]*><\/script>\s*\n\s*<script async src="https:\/\/www\.googletagmanager\.com[^>]*><\/script>\s*\n\s*<script>\s*\n\s*window\.dataLayer[^<]*<\/script>/;

  if (!analyticsPattern.test(content)) {
    console.log(`  WARN: ${path.relative(SRC_DIR, filePath)} (analytics block not found or already changed)`);
    return false;
  }

  // Replace with single script reference
  content = content.replace(
    analyticsPattern,
    '\n\n    <!-- Analytics -->\n    <script src="/shared/analytics.js"></script>'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  OK: ${path.relative(SRC_DIR, filePath)}`);
  return true;
}

// Main
console.log('Updating static HTML files to use shared analytics.js...\n');

let totalFiles = 0;
let updatedFiles = 0;

for (const dir of STATIC_DIRS) {
  const dirPath = path.join(SRC_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory not found: ${dir}`);
    continue;
  }

  console.log(`Processing ${dir}/`);
  const htmlFiles = findHtmlFiles(dirPath);
  totalFiles += htmlFiles.length;

  for (const file of htmlFiles) {
    if (updateHtmlFile(file)) {
      updatedFiles++;
    }
  }
  console.log('');
}

console.log(`\nDone! Updated ${updatedFiles}/${totalFiles} files.`);
