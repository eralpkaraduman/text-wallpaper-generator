// @flow
// Korean (ko) UI dictionary, polite 해요체 register (friendly tool voice),
// matching the /ko/ static pages (텍스트 배경화면, 배경화면 만들기, 후원하기, …).
// Values may contain markup (icon <i> tags, anchors) — they are our own
// build-shipped constants, never user input.
//
// Href overrides exist only for pages with a /ko/ version (support,
// name-wallpaper); other links keep their English targets.
export default {
  'meta.nativeName': '한국어',
  // Intro screen
  'intro.title': '텍스트 배경화면 생성기 - 글자로 배경화면을 무료로 만들어요',
  'intro.subtitle':
    '어떤 글자든 휴대폰과 컴퓨터를 위한 예쁜 배경화면으로 바꿔 보세요. 색상을 자유롭게 고를 수 있는 무료 텍스트 배경화면 생성기예요.',
  'intro.gifAlt':
    '텍스트 배경화면 생성기 데모: 나만의 텍스트 배경화면을 만드는 방법',
  'intro.bullet1':
    '아무 글자나 입력해서 나만의 배경화면을 만들어요 (이모지도 돼요).',
  'intro.bullet2':
    '<i class="fas fa-file-download button-icon"></i>를 누르면 텍스트 배경화면이 다운로드돼요.',
  'intro.bullet3':
    '<i class="fas fa-text-height button-icon"></i>로 글자 크기를 조절해요.',
  'intro.bullet4':
    '<i class="fas fa-expand-arrows-alt button-icon"></i>로 배경화면 크기를 바꿔요.',
  'intro.bullet5': '글자 색과 배경 색을 원하는 대로 바꿀 수 있어요.',
  'intro.bullet6':
    '<i class="fas fa-question button-icon"></i>를 누르면 이 설명을 다시 볼 수 있어요.',
  'intro.start': '시작하기',
  'intro.linkName': '이름 배경화면',
  'intro.linkNameHref': '/ko/name-wallpaper/',
  'intro.linkIphone': '아이폰 배경화면',
  'intro.linkDesktop': '데스크톱 배경화면',
  'intro.linkHowto': '배경화면에 글자 넣는 방법',
  'intro.linkUseCases': '활용 예시',

  // Menu / download window
  'menu.tapToSave': '아래 이미지를 탭해서 저장하세요',
  'menu.clickToSave': '아래 이미지를 클릭해서 저장하세요',
  'menu.creating': '배경화면을 만들고 있어요…',
  'menu.supportAria': '이 프로젝트를 후원해 주세요',

  // Text editor
  'editor.placeholder': '무언가 적어 보세요…',

  // Floating support button (label/aria/href; href also used by the menu
  // heart button and the credits support link)
  'support.label': '후원하기',
  'support.aria': '이 프로젝트를 후원해 주세요',
  'support.href': '/ko/support/',

  // Strings consumed by JS code (see en.js for the two variants)
  'js.editorFallbackText': '무언가 적어 주시면 좋겠어요',
  'js.canvasFallbackText': '무언가 적어 주시면\n좋겠어요',
};
