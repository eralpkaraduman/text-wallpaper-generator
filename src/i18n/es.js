// @flow
// Spanish (es) UI dictionary, neutral international Spanish in the informal
// tú register (friendly tool voice), matching the /es/ static pages
// (fondo de pantalla de texto, crear fondo de pantalla, Apoyar, …).
// Values may contain markup (icon <i> tags, anchors) — they are our own
// build-shipped constants, never user input.
//
// Href overrides exist only for pages with an /es/ version (support,
// name-wallpaper); other links keep their English targets.
export default {
  'meta.nativeName': 'Español',
  // Intro screen
  'intro.title':
    'Generador de Fondos de Pantalla de Texto - Crea fondos con texto gratis',
  'intro.subtitle':
    'Convierte cualquier texto en un bonito fondo de pantalla para tu móvil u ordenador. Generador de fondos de pantalla de texto gratis con colores personalizados.',
  'intro.gifAlt':
    'Demostración del generador de fondos de pantalla de texto: cómo crear tu propio fondo con texto',
  'intro.bullet1':
    'Escribe cualquier texto para crear tu propio fondo de pantalla (los emojis funcionan).',
  'intro.bullet2':
    'Haz clic en <i class="fas fa-file-download button-icon"></i> para descargar tu fondo de pantalla de texto.',
  'intro.bullet3':
    'Con <i class="fas fa-text-height button-icon"></i> ajustas el tamaño del texto.',
  'intro.bullet4':
    'Con <i class="fas fa-expand-arrows-alt button-icon"></i> cambias el tamaño del fondo de pantalla.',
  'intro.bullet5':
    'Personaliza el color del texto y del fondo de tu fondo de pantalla.',
  'intro.bullet6':
    'Haz clic en <i class="fas fa-question button-icon"></i> para volver a ver estas instrucciones.',
  'intro.start': 'EMPEZAR',
  'intro.linkName': 'Fondo con tu nombre',
  'intro.linkNameHref': '/es/name-wallpaper/',
  'intro.linkIphone': 'Fondo para iPhone',
  'intro.linkDesktop': 'Fondo para escritorio',
  'intro.linkHowto': 'Cómo añadir texto a un fondo',
  'intro.linkUseCases': 'Ejemplos de uso',

  // Menu / download window
  'menu.tapToSave': 'Toca la imagen de abajo para guardarla',
  'menu.clickToSave': 'Haz clic en la imagen de abajo para guardarla',
  'menu.creating': 'Creando tu fondo de pantalla…',
  'menu.supportAria': 'Apoya este proyecto',
  'menu.resetSize': 'Mi pantalla',
  'menu.resetSizeAria': 'Restablecer al tamaño de mi pantalla',

  // Text editor
  'editor.placeholder': 'Escribe algo…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': 'Apoyar',
  'support.aria': 'Apoya este proyecto',
  'support.href': '/es/support/',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': 'Estaría bien que escribieras algo',
  'js.canvasFallbackText': 'Estaría bien\nque escribieras algo',
};
