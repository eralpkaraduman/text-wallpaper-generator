// @flow
// English strings consumed by JS code itself.
//
// NOTE: the English DOM path does ZERO DOM writes — all English UI text lives
// directly in the HTML markup (intro.html, menu.html, etc.). This file exists
// only so that no user-facing string is hardcoded in app JS code: it holds
// the strings the JS itself needs, and serves as the per-key fallback for
// keys missing from other languages' dictionaries.
export default {
  // Set as the editor text when the user downloads without typing anything
  // (onPrepareForImageGeneration). Single line, comma + space.
  'js.editorFallbackText': 'It would be nice, if you typed something',
  // Drawn straight onto the canvas if the editor is somehow still empty at
  // draw time (generateCanvas). Kept as a separate key because this variant
  // historically renders on two lines (embedded newline instead of a space).
  'js.canvasFallbackText': 'It would be nice,\nif you typed something',
};
