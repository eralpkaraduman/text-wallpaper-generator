// @flow
// Japanese (ja) UI dictionary. Terminology is harvested from the existing
// /ja/ static pages for consistency (文字壁紙, 壁紙を作成, 応援する, …).
// Values may contain markup (icon <i> tags, anchors) — they are our own
// build-shipped constants, never user input.
export default {
  // Intro screen
  'intro.title': 'テキスト壁紙ジェネレーター - カスタム文字壁紙を無料で作成',
  'intro.subtitle':
    '好きなテキストをスマホやPC用の美しい壁紙に。カスタムカラー対応の無料テキスト壁紙作成ツールです。',
  'intro.gifAlt': 'カスタム文字壁紙の作り方を示すテキスト壁紙ジェネレーターのデモ',
  'intro.bullet1':
    '好きなテキストを入力してカスタム文字壁紙を作成できます（絵文字対応）。',
  'intro.bullet2':
    '<i class="fas fa-file-download button-icon"></i> をクリックすると、作成した文字壁紙をダウンロードできます。',
  'intro.bullet3':
    '<i class="fas fa-text-height button-icon"></i> で文字サイズを調整できます。',
  'intro.bullet4':
    '<i class="fas fa-expand-arrows-alt button-icon"></i> で壁紙のサイズを変更できます。',
  'intro.bullet5': '文字と背景の色をカスタマイズできます。',
  'intro.bullet6':
    '<i class="fas fa-question button-icon"></i> をクリックすると、この使い方をもう一度表示できます。',
  'intro.start': 'スタート',
  'intro.linkName': '名前壁紙',
  'intro.linkNameHref': '/ja/name-wallpaper/',
  'intro.linkIphone': 'iPhone壁紙',
  'intro.linkIphoneHref': '/ja/iphone-wallpaper-maker/',
  'intro.linkDesktop': 'デスクトップ壁紙',
  'intro.linkHowto': '文字壁紙の作り方',
  'intro.linkHowtoHref': '/ja/how-to-add-text-to-wallpaper/',
  'intro.linkUseCases': '活用事例とサンプル',
  'intro.linkUseCasesHref': '/ja/use-cases/',

  // Menu / download window
  'menu.tapToSave': '下の画像をタップして保存してください',
  'menu.clickToSave': '下の画像をクリックして保存してください',
  'menu.creating': '壁紙を作成しています…',
  'menu.supportAria': 'このプロジェクトを応援する',

  // Text editor
  'editor.placeholder': '何か入力してください…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': '応援する',
  'support.aria': 'このプロジェクトを応援する',
  'support.href': '/ja/support/',

  // Credits footer
  'credits.support': 'このプロジェクトを応援する',
  'credits.useCases': '活用事例とサンプル',
  'credits.useCasesHref': '/ja/use-cases/',
  'credits.openSource':
    'ソースコードは <a target="_blank" rel="noopener" href="https://github.com/eralpkaraduman/text-wallpaper-generator">GitHub</a> で公開しています。',
  'credits.madeWith':
    '<a target="_blank" rel="noopener" href="https://ja.wikipedia.org/wiki/%E3%83%98%E3%83%AB%E3%82%B7%E3%83%B3%E3%82%AD">ヘルシンキ</a>にて <a target="_blank" rel="noopener" href="https://eralpkaraduman.com">Eralp Karaduman</a> が <i class="fas fa-heart"></i> を込めて作りました。',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': '何か入力していただけると嬉しいです',
  'js.canvasFallbackText': '何か入力していただけると嬉しいです',
};
