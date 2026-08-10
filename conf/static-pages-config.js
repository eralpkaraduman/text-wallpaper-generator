/**
 * Generates HtmlWebpackPlugin configurations for all static pages.
 *
 * This module:
 * 1. Finds all HTML files in use-cases/, root landing folders (ROOT_PAGES) and localized folders
 * 2. Determines language, path, and template variables for each
 * 3. Returns array of HtmlWebpackPlugin instances
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SRC_DIR = path.join(__dirname, '..', 'src');

// Single source of truth for the Stripe payment link used by all support pages
// (referenced in templates as p.stripeDonateUrl).
const STRIPE_DONATE_URL = 'https://donate.stripe.com/8x200k3RJdl7b5L5xrgYU00';

// Single source of truth for the project's GitHub repository
// (referenced in templates as p.githubRepoUrl).
const GITHUB_REPO_URL = 'https://github.com/eralpkaraduman/text-wallpaper-generator';

// Absolute URL of the social preview image used by og:image / twitter:image
// on every static page (referenced in templates as p.ogImageUrl).
const OG_IMAGE_URL = 'https://textwallpaper.com/shared/og-image.png';

// Display labels for the language navigation, keyed like availableLangUrls.
// zhHant deliberately has NO entry: it is an hreflang-only alias of /zh/ and
// must not appear in the visible lang-nav (templates skip keys missing here).
const LANG_LABELS = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  de: 'Deutsch',
  tr: 'Türkçe',
  id: 'Indonesia',
};

// Root-level English landing/static page folders (each contains an index.html).
// Discovery is glob-based, so folders listed here that don't exist yet are
// simply skipped until their index.html appears in src/.
// Localized versions (src/<lang>/<folder>/index.html) are picked up by the
// existing per-language globs in findStaticPages().
const ROOT_PAGES = [
  'name-wallpaper',
  'iphone-wallpaper-maker',
  'desktop-wallpaper-maker',
  'how-to-add-text-to-wallpaper',
  'wallpaper-maker',
  'text-screensaver',
  'support',
];

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
 * Generate lang URLs for languages whose source file actually exists on disk.
 *
 * Like getLangUrls, but an entry is only present when the translation exists:
 *   en       -> src/<basePath>/index.html
 *   others   -> src/<lang>/<basePath>/index.html
 * Special case: when the zh version exists, a `zhHant` entry is added pointing
 * at the SAME /zh/ URL, so templates can emit hreflang="zh-Hant" as an extra
 * alternate for Traditional Chinese readers (no separate zh-Hant pages exist).
 *
 * HEAD-BLOCK CONTRACT for landing/static pages (what every page template
 * should emit, driven by these params):
 *   - <link rel="canonical"> from the page's OWN absolute URL
 *     (https://textwallpaper.com + availableLangUrls[activeLang]).
 *   - One <link rel="alternate" hreflang="..."> per entry in
 *     availableLangUrls ONLY (never langUrls — that lists all site languages
 *     whether or not a translation exists). Map keys to hreflang codes:
 *     zh -> "zh-Hans", zhHant -> "zh-Hant", others verbatim.
 *   - <link rel="alternate" hreflang="x-default"> -> the English URL.
 * langUrls (all languages, existence not checked) is kept for backward
 * compatibility; new pages should prefer availableLangUrls.
 *
 * HOW TEMPLATES ACCESS PARAMS: html-webpack-plugin 2.x does NOT support
 * bare template variables (its fallback lodash loader only unwraps
 * compilation/webpack/webpackConfig/htmlWebpackPlugin). Access params as:
 *   <%= htmlWebpackPlugin.options.templateParameters.activeLang %>
 *   <% var p = htmlWebpackPlugin.options.templateParameters; %>
 *   <% Object.keys(p.availableLangUrls).forEach(function (lang) { ... }); %>
 * The `templateParameters` option name matches html-webpack-plugin v3+, so
 * a future plugin upgrade would additionally enable bare <%= activeLang %>.
 * Note: pages listed here are ALSO copied raw by CopyWebpackPlugin
 * (webpack.common.js); the HtmlWebpackPlugin-processed output wins in dist
 * (verified), so EJS in these pages is always rendered.
 */
function getAvailableLangUrls(basePath) {
  const available = {};
  for (const lang of Object.keys(LANG_CONFIG)) {
    const sourcePath =
      lang === 'en'
        ? path.join(SRC_DIR, basePath, 'index.html')
        : path.join(SRC_DIR, lang, basePath, 'index.html');
    if (fs.existsSync(sourcePath)) {
      available[lang] = lang === 'en' ? basePath : '/' + lang + basePath;
    }
  }
  // zh-Hant alternate points at the same Simplified /zh/ URL
  if (available.zh) {
    available.zhHant = available.zh;
  }
  return available;
}

/**
 * Find all static HTML pages
 */
function findStaticPages() {
  const patterns = [
    'use-cases/**/index.html',
    ...ROOT_PAGES.map(folder => `${folder}/index.html`),
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
    const availableLangUrls = getAvailableLangUrls(basePath);
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
        availableLangUrls: availableLangUrls,
        stripeDonateUrl: STRIPE_DONATE_URL,
        githubRepoUrl: GITHUB_REPO_URL,
        ogImageUrl: OG_IMAGE_URL,
        langLabels: LANG_LABELS,
      },
    });
  });
}

module.exports = {
  generateStaticPagePlugins,
  findStaticPages,
  LANG_CONFIG,
  ROOT_PAGES,
};
