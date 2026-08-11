// @flow
// Indonesian (id) UI dictionary. Terminology is harvested from the existing
// /id/ static pages for consistency (Generator Wallpaper Teks, Buat
// Wallpaper, Dukung, Contoh Penggunaan, …). Values may contain markup (icon
// <i> tags, anchors) — they are our own build-shipped constants, never user
// input.
//
// Href overrides exist only for pages with an /id/ version (support,
// use-cases, name-wallpaper); other links keep their English targets.
export default {
  'meta.nativeName': 'Indonesia',
  // Intro screen
  'intro.title': 'Generator Wallpaper Teks - Buat Wallpaper Teks Kustom Gratis',
  'intro.subtitle':
    'Ubah teks apa pun menjadi wallpaper indah untuk ponsel atau desktop Anda. Generator wallpaper teks gratis dengan warna kustom.',
  'intro.gifAlt':
    'Demo generator wallpaper teks yang menunjukkan cara membuat wallpaper teks kustom',
  'intro.bullet1':
    'Ketik teks apa pun untuk membuat wallpaper teks kustom Anda (mendukung emoji).',
  'intro.bullet2':
    'Klik <i class="fas fa-file-download button-icon"></i> untuk mengunduh wallpaper teks buatan Anda.',
  'intro.bullet3':
    '<i class="fas fa-text-height button-icon"></i> untuk mengatur ukuran teks.',
  'intro.bullet4':
    '<i class="fas fa-expand-arrows-alt button-icon"></i> untuk mengubah ukuran wallpaper.',
  'intro.bullet5': 'Sesuaikan warna teks dan latar belakang wallpaper Anda.',
  'intro.bullet6':
    'Klik <i class="fas fa-question button-icon"></i> untuk melihat petunjuk ini lagi.',
  'intro.start': 'MULAI',
  'intro.linkName': 'Wallpaper Nama',
  'intro.linkNameHref': '/id/name-wallpaper/',
  'intro.linkIphone': 'Wallpaper iPhone',
  'intro.linkDesktop': 'Wallpaper Desktop',
  'intro.linkHowto': 'Cara Menambahkan Teks',
  'intro.linkUseCases': 'Contoh Penggunaan',
  'intro.linkUseCasesHref': '/id/use-cases/',

  // Menu / download window
  'menu.tapToSave': 'Ketuk gambar di bawah untuk menyimpannya',
  'menu.clickToSave': 'Klik gambar di bawah untuk menyimpannya',
  'menu.creating': 'Membuat wallpaper Anda…',
  'menu.supportAria': 'Dukung proyek ini',
  'menu.resetSize': 'Layar saya',
  'menu.resetSizeAria': 'Atur ulang ke ukuran layar saya',

  // Text editor
  'editor.placeholder': 'Ketik sesuatu…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': 'Dukung',
  'support.aria': 'Dukung proyek ini',
  'support.href': '/id/support/',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': 'Alangkah baiknya, jika Anda mengetik sesuatu',
  'js.canvasFallbackText': 'Alangkah baiknya,\njika Anda mengetik sesuatu',
};
