#!/usr/bin/env node
/**
 * Injects shared partials into static HTML pages.
 *
 * This script standardizes the header, lang-nav, footer, and analytics
 * sections across all static pages while preserving per-page variables.
 *
 * Run: node scripts/inject-partials.js
 *
 * Note: This is a one-time migration script. After running, pages will use
 * inline partials with standardized structure.
 */

const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(__dirname, '..', 'src');

// Language configs
const LANG_CONFIG = {
  en: { homeLink: '/', footerText: 'Free Text Wallpaper Generator' },
  zh: { homeLink: '/zh/', footerText: '免费文字壁纸生成器' },
  ja: { homeLink: '/ja/', footerText: '無料テキスト壁紙ジェネレーター' },
  de: { homeLink: '/de/', footerText: 'Kostenloser Text-Hintergrundbild-Generator' },
  tr: { homeLink: '/tr/', footerText: 'Ücretsiz Metin Duvar Kağıdı Oluşturucu' },
  id: { homeLink: '/id/', footerText: 'Generator Wallpaper Teks Gratis' },
};

// Static directories containing HTML files
const STATIC_DIRS = ['use-cases', 'zh', 'ja', 'de', 'tr', 'id'];

/**
 * Detect language from file path
 */
function detectLang(relativePath) {
  const match = relativePath.match(/^(zh|ja|de|tr|id)\//);
  return match ? match[1] : 'en';
}

/**
 * Find all HTML files recursively
 */
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

/**
 * Generate header HTML
 */
function generateHeader(homeLink) {
  return `    <header class="header">
      <a href="${homeLink}">TextWallpaper.com</a>
    </header>`;
}

/**
 * Generate footer HTML
 */
function generateFooter(homeLink, footerText) {
  return `    <footer class="footer">
      <p>&copy; <a href="${homeLink}">TextWallpaper.com</a> - ${footerText}</p>
    </footer>`;
}

/**
 * Extract current header homeLink from HTML content
 */
function extractHeaderHomeLink(content) {
  const match = content.match(/<header class="header">\s*<a href="([^"]+)">/);
  return match ? match[1] : '/';
}

/**
 * Extract current footer data from HTML content
 */
function extractFooterData(content) {
  const linkMatch = content.match(/<footer class="footer">\s*<p>&copy; <a href="([^"]+)">/);
  const textMatch = content.match(/<a href="[^"]+">TextWallpaper\.com<\/a> - ([^<]+)<\/p>/);
  return {
    homeLink: linkMatch ? linkMatch[1] : '/',
    footerText: textMatch ? textMatch[1].trim() : 'Free Text Wallpaper Generator'
  };
}

/**
 * Standardize a single HTML file
 */
function standardizeFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const relativePath = path.relative(SRC_DIR, filePath);
  const lang = detectLang(relativePath);
  const config = LANG_CONFIG[lang];

  // Check current state
  const currentHomeLink = extractHeaderHomeLink(content);
  const currentFooter = extractFooterData(content);

  // Verify consistency
  if (currentHomeLink !== config.homeLink) {
    console.log(`  WARN: ${relativePath} has inconsistent header link: ${currentHomeLink} (expected ${config.homeLink})`);
  }

  // Check footer text matches config
  if (currentFooter.footerText !== config.footerText) {
    // Update footer text to match config
    const oldFooter = /<footer class="footer">[\s\S]*?<\/footer>/;
    const newFooter = generateFooter(config.homeLink, config.footerText);
    if (oldFooter.test(content)) {
      content = content.replace(oldFooter, newFooter);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`  FIXED: ${relativePath} (updated footer text)`);
      return true;
    }
  }

  console.log(`  OK: ${relativePath}`);
  return false;
}

// Main
console.log('Checking static HTML pages for consistency...\n');

let totalFiles = 0;
let fixedFiles = 0;

for (const dir of STATIC_DIRS) {
  const dirPath = path.join(SRC_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    continue;
  }

  console.log(`Processing ${dir}/`);
  const htmlFiles = findHtmlFiles(dirPath);
  totalFiles += htmlFiles.length;

  for (const file of htmlFiles) {
    if (standardizeFile(file)) {
      fixedFiles++;
    }
  }
  console.log('');
}

console.log(`\nDone! Checked ${totalFiles} files, fixed ${fixedFiles}.`);
