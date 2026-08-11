// @flow
// Portuguese (pt) UI dictionary, internationally neutral leaning pt-BR, in
// the você register (friendly tool voice), matching the /pt/ static pages
// (papel de parede com texto, criar papel de parede, Apoiar, …).
// Values may contain markup (icon <i> tags, anchors) — they are our own
// build-shipped constants, never user input.
//
// Href overrides exist only for pages with a /pt/ version (support,
// name-wallpaper); other links keep their English targets.
export default {
  'meta.nativeName': 'Português',
  // Intro screen
  'intro.title':
    'Gerador de Papel de Parede de Texto - Crie papéis de parede com texto grátis',
  'intro.subtitle':
    'Transforme qualquer texto em um lindo papel de parede para o seu celular ou computador. Gerador de papel de parede de texto grátis com cores personalizadas.',
  'intro.gifAlt':
    'Demonstração do gerador de papel de parede de texto: como criar seu próprio papel de parede com texto',
  'intro.bullet1':
    'Digite qualquer texto para criar seu próprio papel de parede (emojis funcionam).',
  'intro.bullet2':
    'Clique em <i class="fas fa-file-download button-icon"></i> para baixar seu papel de parede de texto.',
  'intro.bullet3':
    'Com <i class="fas fa-text-height button-icon"></i> você ajusta o tamanho do texto.',
  'intro.bullet4':
    'Com <i class="fas fa-expand-arrows-alt button-icon"></i> você muda o tamanho do papel de parede.',
  'intro.bullet5':
    'Personalize a cor do texto e do fundo do seu papel de parede.',
  'intro.bullet6':
    'Clique em <i class="fas fa-question button-icon"></i> para ver estas instruções de novo.',
  'intro.start': 'COMEÇAR',
  'intro.linkName': 'Papel de parede com nome',
  'intro.linkNameHref': '/pt/name-wallpaper/',
  'intro.linkIphone': 'Papel de parede para iPhone',
  'intro.linkDesktop': 'Papel de parede para desktop',
  'intro.linkHowto': 'Como adicionar texto a um papel de parede',
  'intro.linkUseCases': 'Exemplos de uso',

  // Menu / download window
  'menu.tapToSave': 'Toque na imagem abaixo para salvá-la',
  'menu.clickToSave': 'Clique na imagem abaixo para salvá-la',
  'menu.creating': 'Criando seu papel de parede…',
  'menu.supportAria': 'Apoie este projeto',
  'menu.resetSize': 'Minha tela',
  'menu.resetSizeAria': 'Redefinir para o tamanho da minha tela',

  // Text editor
  'editor.placeholder': 'Escreva alguma coisa…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': 'Apoiar',
  'support.aria': 'Apoie este projeto',
  'support.href': '/pt/support/',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': 'Seria legal, se você escrevesse alguma coisa',
  'js.canvasFallbackText': 'Seria legal,\nse você escrevesse alguma coisa',
};
