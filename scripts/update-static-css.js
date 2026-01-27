#!/usr/bin/env node
/**
 * Updates static HTML pages to use shared CSS instead of inline styles.
 *
 * What it does:
 * 1. Finds all static HTML files in use-cases/ and localized folders (zh/, ja/, de/, tr/, id/)
 * 2. Replaces inline <style>...</style> with <link rel="stylesheet" href="/shared/static-pages.css">
 * 3. Preserves the <meta name="theme-color"> tag
 *
 * Run: node scripts/update-static-css.js
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

// Replace inline styles with CSS link
function updateHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already updated
  if (content.includes('/shared/static-pages.css')) {
    console.log(`  SKIP: ${path.relative(SRC_DIR, filePath)} (already updated)`);
    return false;
  }

  // Pattern to match: <meta name="theme-color" content="..."> followed by <style>...</style>
  // We want to keep theme-color and replace the style block
  const stylePattern = /(\s*<meta\s+name="theme-color"\s+content="[^"]*"\s*\/?>\s*)\n\s*<style>[\s\S]*?<\/style>/;

  if (!stylePattern.test(content)) {
    console.log(`  WARN: ${path.relative(SRC_DIR, filePath)} (no style block found)`);
    return false;
  }

  // Replace with theme-color + CSS link
  content = content.replace(
    stylePattern,
    '$1\n    <link rel="stylesheet" href="/shared/static-pages.css">'
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  OK: ${path.relative(SRC_DIR, filePath)}`);
  return true;
}

// Main
console.log('Updating static HTML files to use shared CSS...\n');

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
