// @flow
// Turkish (tr) UI dictionary, formal register (siz) matching the existing
// /tr/ static pages (Yazı Duvar Kağıdı Oluşturucu, Destek, Kullanım
// Alanları, …), from which the terminology is harvested. Values may contain
// markup (icon <i> tags, anchors) — they are our own build-shipped
// constants, never user input.
//
// Href overrides exist only for pages with a /tr/ version (support,
// use-cases, name-wallpaper); other links keep their English targets.
export default {
  'meta.nativeName': 'Türkçe',
  // Intro screen
  'intro.title':
    'Yazı Duvar Kağıdı Oluşturucu - Ücretsiz Özel Yazılı Duvar Kağıdı Oluşturun',
  'intro.subtitle':
    'Dilediğiniz yazıyı telefonunuz veya bilgisayarınız için güzel bir duvar kağıdına dönüştürün. Özel renk destekli ücretsiz yazı duvar kağıdı oluşturma aracı.',
  'intro.gifAlt':
    'Özel yazılı duvar kağıdı oluşturmayı gösteren yazı duvar kağıdı oluşturucu tanıtımı',
  'intro.bullet1':
    'Dilediğiniz yazıyı yazarak kendi özel duvar kağıdınızı oluşturun (emoji desteklenir).',
  'intro.bullet2':
    'Oluşturduğunuz duvar kağıdını indirmek için <i class="fas fa-file-download button-icon"></i> simgesine tıklayın.',
  'intro.bullet3':
    '<i class="fas fa-text-height button-icon"></i> ile yazı boyutunu ayarlayabilirsiniz.',
  'intro.bullet4':
    '<i class="fas fa-expand-arrows-alt button-icon"></i> ile duvar kağıdının boyutlarını değiştirebilirsiniz.',
  'intro.bullet5': 'Yazı ve arka plan renklerini özelleştirebilirsiniz.',
  'intro.bullet6':
    'Bu kullanım talimatlarını tekrar görmek için <i class="fas fa-question button-icon"></i> simgesine tıklayın.',
  'intro.start': 'BAŞLA',
  'intro.linkName': 'İsim Duvar Kağıdı',
  'intro.linkNameHref': '/tr/name-wallpaper/',
  'intro.linkIphone': 'iPhone Duvar Kağıdı',
  'intro.linkDesktop': 'Masaüstü Duvar Kağıdı',
  'intro.linkHowto': 'Duvar Kağıdına Yazı Ekleme',
  'intro.linkUseCases': 'Kullanım Alanları ve Örnekler',
  'intro.linkUseCasesHref': '/tr/use-cases/',

  // Menu / download window
  'menu.tapToSave': 'Kaydetmek için aşağıdaki görsele dokunun',
  'menu.clickToSave': 'Kaydetmek için aşağıdaki görsele tıklayın',
  'menu.creating': 'Duvar kağıdınız oluşturuluyor…',
  'menu.supportAria': 'Bu projeye destek ol',

  // Text editor
  'editor.placeholder': 'Bir şeyler yazın…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': 'Destek',
  'support.aria': 'Bu projeye destek ol',
  'support.href': '/tr/support/',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': 'Bir şeyler yazsanız, ne güzel olurdu',
  'js.canvasFallbackText': 'Bir şeyler yazsanız,\nne güzel olurdu',
};
