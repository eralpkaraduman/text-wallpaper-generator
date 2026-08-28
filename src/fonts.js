// @flow
// Same fallback stack as $default_font in main.scss, duplicated here the way
// colors.js/colors.scss already duplicate color values across JS and SCSS.
const SYSTEM_FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export type FontOption = {
  id: string,
  label: string,
  cssFontFamily: string,
};

// Bundled fonts cover Latin + Latin Extended glyphs only (see
// src/assets/fonts and the @font-face rules in main.scss). Each stack falls
// back to the OS font list, so any character missing from the bundled font
// (CJK, Arabic, ...) still renders correctly via per-character font fallback.
const fonts: Array<FontOption> = [
  { id: 'system', label: 'System', cssFontFamily: SYSTEM_FONT_STACK },
  { id: 'inter', label: 'Inter', cssFontFamily: `'Inter', ${SYSTEM_FONT_STACK}` },
  {
    id: 'playfair-display',
    label: 'Playfair Display',
    cssFontFamily: `'Playfair Display', ${SYSTEM_FONT_STACK}`,
  },
  { id: 'poppins', label: 'Poppins', cssFontFamily: `'Poppins', ${SYSTEM_FONT_STACK}` },
  {
    id: 'roboto-slab',
    label: 'Roboto Slab',
    cssFontFamily: `'Roboto Slab', ${SYSTEM_FONT_STACK}`,
  },
  { id: 'caveat', label: 'Caveat', cssFontFamily: `'Caveat', ${SYSTEM_FONT_STACK}` },
  {
    id: 'courier-prime',
    label: 'Courier Prime',
    cssFontFamily: `'Courier Prime', ${SYSTEM_FONT_STACK}`,
  },
];

export function getFonts(): Array<FontOption> {
  return fonts;
}

export const DEFAULT_FONT_ID = 'system';
