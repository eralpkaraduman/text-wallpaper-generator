// @flow
import 'flexboxgrid';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import 'normalize.css/normalize.css';
import colors from './colors';
import DICTIONARIES from './i18n/strings';
// Removed html2canvas - now using off-screen canvas approach
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

// iOS Safari viewport height fix
function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);

import './main.scss';
import { getElement, insertStyle, getBody } from './utils';
import { track } from './analytics';
import Intro from './intro/Intro';
import Menu from './menu/Menu';
import type { MenuCallbacks } from './menu/Menu';
import TextEditor from './textEditor/TextEditor';

let menu: Menu;
const wallpaperElement: HTMLElement = getElement('wallpaper');

const textEditor = new TextEditor({
  onFocused: () => menu.closeAllWindows(),
});

const updateThemeColor = (backgroundColor: string) => {
  // Update the main theme-color meta tag
  const themeColorMeta = document.querySelector('meta[name="theme-color"]:not([media])');
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', backgroundColor);
  }
  
  // Update both dark and light mode theme-color meta tags to match the selected color
  const darkThemeColorMeta = document.querySelector('meta[name="theme-color"][media*="dark"]');
  const lightThemeColorMeta = document.querySelector('meta[name="theme-color"][media*="light"]');
  
  if (darkThemeColorMeta) {
    darkThemeColorMeta.setAttribute('content', backgroundColor);
  }
  if (lightThemeColorMeta) {
    lightThemeColorMeta.setAttribute('content', backgroundColor);
  }
};

const updateSelectionStyles = () => {
  const { textColor, backgroundColor } = menu;
  const textColorWitghTransparency = `${textColor}55`;
  insertStyle('wallpaper-text-input', 'placeholder', {
    color: textColorWitghTransparency,
  });
  insertStyle('wallpaper-text-input', '-webkit-input-placeholder', {
    color: textColorWitghTransparency,
  });
  insertStyle('wallpaper-text-input', 'selection', {
    color: backgroundColor,
    'background-color': textColor,
  });
};

// Removed fnIgnoreElements - no longer needed without html2canvas

async function generateCanvas(
  width: number,
  height: number,
  scale: number,
): Promise<HTMLCanvasElement> {
  // Create off-screen canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Set dimensions with scale
  canvas.width = width * scale;
  canvas.height = height * scale;
  
  // Get text content and styling
  const textElement = getElement('wallpaper-text-input');
  const text = textElement.innerText || t('js.canvasFallbackText');
  const backgroundColor = menu.backgroundColor;
  const textColor = menu.textColor;
  
  // Copy font style from the original element
  const computedStyle = window.getComputedStyle(textElement);
  const fontFamily = computedStyle.fontFamily;
  const fontWeight = computedStyle.fontWeight;
  const fontStyle = computedStyle.fontStyle;
  const fontSize = menu.textSize * scale;
  
  // Draw background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Set text properties using copied font style
  ctx.fillStyle = textColor;
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Handle multi-line text
  const lines = text.split('\n');
  const lineHeight = fontSize * 1.2; // Standard line height multiplier
  const totalTextHeight = lines.length * lineHeight;
  const startY = (canvas.height - totalTextHeight) / 2 + lineHeight / 2;
  
  // Draw each line
  lines.forEach((line, index) => {
    const y = startY + (index * lineHeight);
    ctx.fillText(line, canvas.width / 2, y);
  });
  
  return canvas;
}

// Download hint: a bouncing arrow under the download button, visible once
// the user has typed something, gone for good after they click download.
let downloadHintDismissed = false;
const updateDownloadHint = () => {
  const hintElement = getElement('download-hint');
  const menuRowElement = getElement('menu');
  const editorVisible = !wallpaperElement.classList.contains('hidden');
  const menuPanelOpen = menuRowElement.classList.contains('menu-active');
  const show =
    !downloadHintDismissed &&
    editorVisible &&
    !menuPanelOpen &&
    textEditor.text.trim().length > 0;
  hintElement.style.display = show ? 'block' : 'none';
};

const menuCallbacks: MenuCallbacks = {
  onGenerateCanvas: async (width, height, scale) =>
    await generateCanvas(width, height, scale),
  onPrepareForImageGeneration: () => {
    if (!textEditor.text.length) {
      textEditor.text = t('js.editorFallbackText');
    }
  },
  onTextSizeChanged: (newTextSize: number) => {
    textEditor.textSize = newTextSize;
  },
  onTextColorChanged: (newTextColor: string) => {
    textEditor.textColor = newTextColor;
    updateSelectionStyles();
  },
  onBackgroundColorChanged: (newBackgroundColor: string) => {
    wallpaperElement.style.backgroundColor = newBackgroundColor;
    getBody().style.backgroundColor = newBackgroundColor;
    updateThemeColor(newBackgroundColor);
    updateSelectionStyles();
  },
  onImageSizeChanged: () => {},
  onInfoButtonClicked: () => {
    track('info_button');
    intro.onShow();
    menu.resetStyles();
    menu.closeAllWindows();
    menu.onHide();
    textEditor.onHide();
    updateDownloadHint();
  },
};

// Landing pages deep-link presets, e.g. /?w=3840&h=2160&bg=000000&fg=FFFFFF.
// Explicit w/h are exact output pixels, so scale must stay 1 for them.
const urlParams = new URLSearchParams(window.location.search);
const presetSize = (name: string): number | null => {
  const value = parseInt(urlParams.get(name), 10);
  return value >= 16 && value <= 16384 ? value : null;
};
const presetColor = (name: string): string | null => {
  const value = urlParams.get(name);
  return value && /^[0-9a-fA-F]{6}$/.test(value) ? `#${value}` : null;
};
const presetWidth = presetSize('w');
const presetHeight = presetSize('h');

// ?lang= — runtime UI language. Whitelist is exactly the dictionary keys,
// validated like the presets above: absent/unknown/malformed/empty values all
// resolve to English, and a bad lang can't affect presets or vice versa.
// 'en' IS a dictionary key (it holds the strings JS itself consumes), but the
// English path performs zero DOM writes — English UI text is already baked
// into the HTML markup — so the swap loops below run only for non-English.
const langCode = (urlParams.get('lang') || '').toLowerCase();
const lang: string = DICTIONARIES[langCode] ? langCode : 'en';
const dict = DICTIONARIES[lang];
if (lang !== 'en') {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = dict[el.getAttribute('data-i18n')];
    // Missing key → skip, leaving the English markup in place.
    if (value != null) el.innerHTML = value; // own bundled constants, never user input
  });
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    // e.g. data-i18n-attr="aria-label:support.aria,href:support.href"
    el.getAttribute('data-i18n-attr').split(',').forEach((pair) => {
      const [attr, key] = pair.split(':');
      if (dict[key] != null) el.setAttribute(attr, dict[key]);
    });
  });
}
// Strings consumed by JS code, with per-key fallback to English (en.js).
const t = (key: string): string =>
  dict[key] != null ? dict[key] : DICTIONARIES.en[key];

// Floating language switcher, visible over both intro and editor: a collapsed
// pill showing the current language that expands to the alternatives. Each
// link rewrites only the `lang` query key, so presets survive switching.
const langHref = (code: string): string => {
  const query = new URLSearchParams(window.location.search);
  if (code === 'en') {
    query.delete('lang');
  } else {
    query.set('lang', code);
  }
  const queryString = query.toString();
  return queryString ? `/?${queryString}` : '/';
};
const langSwitcherElement = getElement('floating-lang-switcher');
const langToggleButton = document.createElement('button');
langToggleButton.type = 'button';
langToggleButton.innerHTML = '<i class="fas fa-globe button-icon"></i>';
langToggleButton.appendChild(
  document.createTextNode(dict['meta.nativeName']),
);
langToggleButton.addEventListener('click', () => {
  langSwitcherElement.classList.toggle('open');
  track('language_switcher_toggle');
});
const langOptionsElement = document.createElement('div');
langOptionsElement.className = 'lang-options';
Object.keys(DICTIONARIES).forEach((code) => {
  if (code === lang) return;
  const optionLink = document.createElement('a');
  optionLink.href = langHref(code);
  optionLink.textContent = DICTIONARIES[code]['meta.nativeName'];
  optionLink.setAttribute('data-umami-event', 'language-switch');
  optionLink.setAttribute('data-umami-event-lang', code);
  langOptionsElement.appendChild(optionLink);
});
langSwitcherElement.appendChild(langToggleButton);
langSwitcherElement.appendChild(langOptionsElement);

menu = new Menu(menuCallbacks);
menu.onStart({
  width: presetWidth || window.screen.width,
  height: presetHeight || window.screen.height,
  scale: presetWidth && presetHeight ? 1 : window.devicePixelRatio || 1,
  textSize: 24,
  textColor: presetColor('fg') || colors.flat_clouds,
  backgroundColor: presetColor('bg') || colors.mac_7,
});

updateSelectionStyles();

textEditor.onStart();
textEditor.textSize = menu.textSize;
textEditor.textColor = menu.textColor;

textEditor.textInputElement.addEventListener('input', updateDownloadHint);
getElement('menu-button-download').addEventListener('click', () => {
  downloadHintDismissed = true;
  updateDownloadHint();
});
// Panels opening/closing under the toolbar change what the hint may overlap
getElement('menu').addEventListener('click', () =>
  setTimeout(updateDownloadHint, 0),
);

wallpaperElement.style.backgroundColor = menu.backgroundColor;
// The body carries a hardcoded #2D2D2D inline style that only coincides with
// the default background; a ?bg= preset diverges from it, so sync it here too.
getBody().style.backgroundColor = menu.backgroundColor;
updateThemeColor(menu.backgroundColor);
wallpaperElement.addEventListener('click', () => menu.closeAllWindows());

const intro = new Intro({
  onComplete: () => {
    intro.onHide();
    menu.onShow();
    textEditor.onShow();
    textEditor.focus();
  },
});

document.addEventListener('DOMContentLoaded', () => {
  intro.onStart();
});
