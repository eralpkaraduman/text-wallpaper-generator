// @flow
// Simplified Chinese (zh) UI dictionary. Terminology is harvested from the
// existing /zh/ static pages for consistency (文字壁纸, 开始创建壁纸, 支持,
// 使用场景与示例, …). Values may contain markup (icon <i> tags, anchors) —
// they are our own build-shipped constants, never user input.
//
// Href overrides exist only for pages with a /zh/ version (support,
// use-cases); other links keep their English targets.
export default {
  'meta.nativeName': '中文',
  // Intro screen
  'intro.title': '文字壁纸生成器 - 免费创建自定义文字壁纸',
  'intro.subtitle':
    '将任意文字变成手机或电脑上的精美壁纸。免费的文字壁纸生成工具，支持自定义颜色。',
  'intro.gifAlt': '演示如何创建自定义文字壁纸的文字壁纸生成器动画',
  'intro.bullet1': '输入任意文字，创建你的自定义文字壁纸（支持表情符号）。',
  'intro.bullet2':
    '点击 <i class="fas fa-file-download button-icon"></i> 下载你的专属文字壁纸。',
  'intro.bullet3':
    '<i class="fas fa-text-height button-icon"></i> 用于调整文字大小。',
  'intro.bullet4':
    '<i class="fas fa-expand-arrows-alt button-icon"></i> 用于更改壁纸尺寸。',
  'intro.bullet5': '自定义文字和背景颜色。',
  'intro.bullet6':
    '点击 <i class="fas fa-question button-icon"></i> 可再次查看这些使用说明。',
  'intro.start': '开始',
  'intro.linkName': '名字壁纸',
  'intro.linkIphone': 'iPhone壁纸',
  'intro.linkDesktop': '电脑壁纸',
  'intro.linkHowto': '壁纸添加文字教程',
  'intro.linkUseCases': '使用场景与示例',
  'intro.linkUseCasesHref': '/zh/use-cases/',

  // Menu / download window
  'menu.tapToSave': '点按下方图片即可保存',
  'menu.clickToSave': '点击下方图片即可保存',
  'menu.creating': '正在生成壁纸…',
  'menu.supportAria': '支持这个项目',

  // Text editor
  'editor.placeholder': '输入一些文字…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': '支持',
  'support.aria': '支持这个项目',
  'support.href': '/zh/support/',

  // Credits footer
  'credits.support': '支持这个项目',
  'credits.useCases': '使用场景与示例',
  'credits.useCasesHref': '/zh/use-cases/',
  'credits.openSource':
    '源代码托管在 <a target="_blank" rel="noopener" href="https://github.com/eralpkaraduman/text-wallpaper-generator">GitHub</a>。',
  'credits.madeWith':
    '由 <a target="_blank" rel="noopener" href="https://eralpkaraduman.com">Eralp Karaduman</a> 在<a target="_blank" rel="noopener" href="https://zh.wikipedia.org/wiki/%E8%B5%AB%E5%B0%94%E8%BE%9B%E5%9F%BA">赫尔辛基</a>用 <i class="fas fa-heart"></i> 制作。',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': '如果你能输入点什么就好了',
  'js.canvasFallbackText': '如果你能输入点什么就好了',
};
