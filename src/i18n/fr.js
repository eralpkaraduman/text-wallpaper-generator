// @flow
// French (fr) UI dictionary, standard French in the formal vous register
// (polite tool voice), matching the /fr/ static pages (fond d'écran texte,
// créer un fond d'écran, Soutenir, …).
// Values may contain markup (icon <i> tags, anchors) — they are our own
// build-shipped constants, never user input.
//
// Href overrides exist only for pages with a /fr/ version (support,
// name-wallpaper); other links keep their English targets.
export default {
  'meta.nativeName': 'Français',
  // Intro screen
  'intro.title':
    'Générateur de Fond d\'Écran Texte - Créez des fonds d\'écran avec texte gratuitement',
  'intro.subtitle':
    'Transformez n\'importe quel texte en un beau fond d\'écran pour votre téléphone ou votre ordinateur. Générateur de fond d\'écran texte gratuit avec couleurs personnalisées.',
  'intro.gifAlt':
    'Démonstration du générateur de fond d\'écran texte : comment créer votre propre fond d\'écran avec texte',
  'intro.bullet1':
    'Écrivez n\'importe quel texte pour créer votre propre fond d\'écran (les emojis fonctionnent).',
  'intro.bullet2':
    'Cliquez sur <i class="fas fa-file-download button-icon"></i> pour télécharger votre fond d\'écran texte.',
  'intro.bullet3':
    'Avec <i class="fas fa-text-height button-icon"></i>, ajustez la taille du texte.',
  'intro.bullet4':
    'Avec <i class="fas fa-expand-arrows-alt button-icon"></i>, changez la taille du fond d\'écran.',
  'intro.bullet5':
    'Personnalisez la couleur du texte et du fond de votre fond d\'écran.',
  'intro.bullet6':
    'Cliquez sur <i class="fas fa-question button-icon"></i> pour revoir ces instructions.',
  'intro.start': 'COMMENCER',
  'intro.linkName': 'Fond d\'écran avec prénom',
  'intro.linkNameHref': '/fr/name-wallpaper/',
  'intro.linkIphone': 'Fond d\'écran pour iPhone',
  'intro.linkDesktop': 'Fond d\'écran pour ordinateur',
  'intro.linkHowto': 'Comment ajouter du texte à un fond d\'écran',
  'intro.linkUseCases': 'Exemples d\'utilisation',

  // Menu / download window
  'menu.tapToSave': 'Touchez l\'image ci-dessous pour l\'enregistrer',
  'menu.clickToSave': 'Cliquez sur l\'image ci-dessous pour l\'enregistrer',
  'menu.creating': 'Création de votre fond d\'écran…',
  'menu.supportAria': 'Soutenez ce projet',

  // Text editor
  'editor.placeholder': 'Écrivez quelque chose…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': 'Soutenir',
  'support.aria': 'Soutenez ce projet',
  'support.href': '/fr/support/',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': 'Ce serait bien, si vous écriviez quelque chose',
  'js.canvasFallbackText': 'Ce serait bien,\nsi vous écriviez quelque chose',
};
