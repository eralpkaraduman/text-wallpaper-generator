/**
 * Generates HtmlWebpackPlugin configurations for all static pages.
 *
 * This module:
 * 1. Finds all HTML files in use-cases/ and localized folders
 * 2. Determines language, path, and template variables for each
 * 3. Returns array of HtmlWebpackPlugin instances
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.join(__dirname, '..', 'src');

// Language configs with their home links and footer text
const LANG_CONFIG = {
  en: { homeLink: '/', footerText: 'Free Text Wallpaper Generator' },
  zh: { homeLink: '/zh/', footerText: '免费文字壁纸生成器' },
  ja: { homeLink: '/ja/', footerText: '無料テキスト壁紙ジェネレーター' },
  de: { homeLink: '/de/', footerText: 'Kostenloser Text-Hintergrundbild-Generator' },
  tr: { homeLink: '/tr/', footerText: 'Ücretsiz Metin Duvar Kağıdı Oluşturucu' },
  id: { homeLink: '/id/', footerText: 'Generator Wallpaper Teks Gratis' },
};

/**
 * Detect language from file path
 * /use-cases/motivation/ -> 'en'
 * /zh/use-cases/motivation/ -> 'zh'
 */
function detectLang(relativePath) {
  const match = relativePath.match(/^(zh|ja|de|tr|id)\//);
  return match ? match[1] : 'en';
}

/**
 * Get the base path without language prefix
 * /zh/use-cases/motivation/ -> /use-cases/motivation/
 */
function getBasePath(relativePath, lang) {
  if (lang === 'en') return '/' + relativePath;
  return '/' + relativePath.replace(new RegExp(`^${lang}/`), '');
}

/**
 * Generate lang URLs for a given base path
 */
function getLangUrls(basePath) {
  return {
    en: basePath,
    zh: '/zh' + basePath,
    ja: '/ja' + basePath,
    de: '/de' + basePath,
    tr: '/tr' + basePath,
    id: '/id' + basePath,
  };
}

/**
 * Find all static HTML pages
 */
function findStaticPages() {
  const patterns = [
    'use-cases/**/index.html',
    'zh/**/index.html',
    'ja/**/index.html',
    'de/**/index.html',
    'tr/**/index.html',
    'id/**/index.html',
  ];

  const pages = [];
  for (const pattern of patterns) {
    const files = glob.sync(pattern, { cwd: SRC_DIR });
    pages.push(...files);
  }
  return pages;
}

/**
 * Generate HtmlWebpackPlugin instances for all static pages
 */
function generateStaticPagePlugins() {
  const pages = findStaticPages();

  return pages.map(relativePath => {
    const lang = detectLang(relativePath);
    const basePath = getBasePath(relativePath.replace('/index.html', '/'), lang);
    const langUrls = getLangUrls(basePath);
    const langConfig = LANG_CONFIG[lang];

    return new HtmlWebpackPlugin({
      template: relativePath,
      filename: relativePath,
      inject: false,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      // Template variables available in EJS
      templateParameters: {
        activeLang: lang,
        homeLink: langConfig.homeLink,
        footerText: langConfig.footerText,
        langUrls: langUrls,
      },
    });
  });
}

module.exports = {
  generateStaticPagePlugins,
  findStaticPages,
  LANG_CONFIG,
};
