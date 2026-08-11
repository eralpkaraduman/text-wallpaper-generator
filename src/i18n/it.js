// @flow
// Italian (it) UI dictionary, informal tu register (friendly tool voice),
// matching the /it/ static pages (sfondo con testo, creare uno sfondo,
// Sostieni, …).
// Values may contain markup (icon <i> tags, anchors) — they are our own
// build-shipped constants, never user input.
//
// Href overrides exist only for pages with an /it/ version (support,
// name-wallpaper); other links keep their English targets.
export default {
  'meta.nativeName': 'Italiano',
  // Intro screen
  'intro.title':
    'Generatore di Sfondi con Testo - Crea sfondi con testo gratis',
  'intro.subtitle':
    'Trasforma qualsiasi testo in un bellissimo sfondo per il tuo telefono o computer. Generatore di sfondi con testo gratis con colori personalizzati.',
  'intro.gifAlt':
    'Dimostrazione del generatore di sfondi con testo: come creare il tuo sfondo con testo',
  'intro.bullet1':
    'Scrivi qualsiasi testo per creare il tuo sfondo (le emoji funzionano).',
  'intro.bullet2':
    'Clicca su <i class="fas fa-file-download button-icon"></i> per scaricare il tuo sfondo con testo.',
  'intro.bullet3':
    'Con <i class="fas fa-text-height button-icon"></i> regoli la dimensione del testo.',
  'intro.bullet4':
    'Con <i class="fas fa-expand-arrows-alt button-icon"></i> cambi la dimensione dello sfondo.',
  'intro.bullet5':
    'Personalizza il colore del testo e dello sfondo del tuo wallpaper.',
  'intro.bullet6':
    'Clicca su <i class="fas fa-question button-icon"></i> per rivedere queste istruzioni.',
  'intro.start': 'INIZIA',
  'intro.linkName': 'Sfondo con il tuo nome',
  'intro.linkNameHref': '/it/name-wallpaper/',
  'intro.linkIphone': 'Sfondo per iPhone',
  'intro.linkDesktop': 'Sfondo per desktop',
  'intro.linkHowto': 'Come aggiungere testo a uno sfondo',
  'intro.linkUseCases': 'Esempi di utilizzo',

  // Menu / download window
  'menu.tapToSave': 'Tocca l\'immagine qui sotto per salvarla',
  'menu.clickToSave': 'Clicca sull\'immagine qui sotto per salvarla',
  'menu.creating': 'Creazione del tuo sfondo…',
  'menu.supportAria': 'Sostieni questo progetto',
  'menu.resetSize': 'Il mio schermo',
  'menu.resetSizeAria': 'Ripristina alla dimensione del mio schermo',

  // Text editor
  'editor.placeholder': 'Scrivi qualcosa…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': 'Sostieni',
  'support.aria': 'Sostieni questo progetto',
  'support.href': '/it/support/',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': 'Sarebbe bello, se scrivessi qualcosa',
  'js.canvasFallbackText': 'Sarebbe bello,\nse scrivessi qualcosa',
};
