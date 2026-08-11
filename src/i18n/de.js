// @flow
// German (de) UI dictionary, formal register (Sie) matching the existing /de/
// static pages ("Erstellen Sie eigene Wallpaper", Unterstützen, …), from
// which the terminology is harvested. Values may contain markup (icon <i>
// tags, anchors) — they are our own build-shipped constants, never user input.
//
// Href overrides exist only for pages with a /de/ version (support,
// use-cases, how-to-add-text-to-wallpaper, name-wallpaper); other links keep
// their English targets.
export default {
  'meta.nativeName': 'Deutsch',
  // Intro screen
  'intro.title':
    'Text-Hintergrund-Generator - Kostenlos eigene Text-Wallpaper erstellen',
  'intro.subtitle':
    'Verwandeln Sie beliebigen Text in schöne Wallpaper für Handy oder Desktop. Kostenloser Text-Hintergrund-Generator mit eigenen Farben.',
  'intro.gifAlt':
    'Demo des Text-Hintergrund-Generators: So erstellen Sie eigene Text-Wallpaper',
  'intro.bullet1':
    'Geben Sie beliebigen Text ein, um Ihr eigenes Text-Wallpaper zu erstellen (Emojis werden unterstützt).',
  'intro.bullet2':
    'Klicken Sie auf <i class="fas fa-file-download button-icon"></i>, um Ihr persönliches Text-Wallpaper herunterzuladen.',
  'intro.bullet3':
    'Mit <i class="fas fa-text-height button-icon"></i> passen Sie die Textgröße an.',
  'intro.bullet4':
    'Mit <i class="fas fa-expand-arrows-alt button-icon"></i> ändern Sie die Wallpaper-Größe.',
  'intro.bullet5':
    'Passen Sie Text- und Hintergrundfarbe Ihres Wallpapers an.',
  'intro.bullet6':
    'Klicken Sie auf <i class="fas fa-question button-icon"></i>, um diese Anleitung erneut anzuzeigen.',
  'intro.start': 'START',
  'intro.linkName': 'Namens-Wallpaper',
  'intro.linkNameHref': '/de/name-wallpaper/',
  'intro.linkIphone': 'iPhone-Wallpaper',
  'intro.linkDesktop': 'Desktop-Wallpaper',
  'intro.linkHowto': 'Text zum Wallpaper hinzufügen',
  'intro.linkHowtoHref': '/de/how-to-add-text-to-wallpaper/',
  'intro.linkUseCases': 'Anwendungsfälle & Beispiele',
  'intro.linkUseCasesHref': '/de/use-cases/',

  // Menu / download window
  'menu.tapToSave': 'Tippen Sie auf das Bild unten, um es zu speichern',
  'menu.clickToSave': 'Klicken Sie auf das Bild unten, um es zu speichern',
  'menu.creating': 'Ihr Wallpaper wird erstellt…',
  'menu.supportAria': 'Dieses Projekt unterstützen',

  // Text editor
  'editor.placeholder': 'Geben Sie etwas Text ein…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': 'Unterstützen',
  'support.aria': 'Dieses Projekt unterstützen',
  'support.href': '/de/support/',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': 'Es wäre schön, wenn Sie etwas schreiben würden',
  'js.canvasFallbackText': 'Es wäre schön,\nwenn Sie etwas schreiben würden',
};
