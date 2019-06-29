// @flow
import 'flexboxgrid';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import 'normalize.css/normalize.css';
import colors from './colors';
import html2canvas from 'html2canvas';
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

import './main.scss';
import { getElement, insertStyle, getBody } from './utils';
import Intro from './intro/Intro';
import Menu from './menu/Menu';
import type { MenuCallbacks } from './menu/Menu';
import TextEditor from './textEditor/TextEditor';

let menu: Menu;
const wallpaperElement: HTMLElement = getElement('wallpaper');

const textEditor = new TextEditor({
  onFocused: () => menu.closeAllWindows(),
});

const updateSelectionStyles = () => {
  const { textColor, backgroundColor } = menu;
  const textColorWitghTransparency = `${textColor}55`;
  insertStyle('wallpaper-text-input', 'placeholder', {
    color: textColorWitghTransparency,
  });
  insertStyle('wallpaper-text-input', '-webkit-input-placeholder', {
    color: textColorWitghTransparency,
  });
  insertStyle('wallpaper-text-input', 'selection', {
    color: backgroundColor,
    'background-color': textColor,
  });
};

async function generateCanvas(
  width: number,
  height: number,
  scale: number,
  targetElement: HTMLElement,
): Promise<HTMLCanvasElement> {
  return await html2canvas(targetElement, {
    windowWidth: width,
    windowHeight: height,
    width,
    height,
    scale,
  });
}

const menuCallbacks: MenuCallbacks = {
  onGenerateCanvas: async (width, height, scale) =>
    await generateCanvas(width, height, scale, getElement('wallpaper')),
  onPrepareForImageGeneration: () => {
    if (!textEditor.text.length) {
      textEditor.text = 'It would be nice,\nif you typed something';
    }
  },
  onTextSizeChanged: (newTextSize: number) => {
    textEditor.textSize = newTextSize;
  },
  onTextColorChanged: (newTextColor: string) => {
    textEditor.textColor = newTextColor;
    updateSelectionStyles();
  },
  onBackgroundColorChanged: (newBackgroundColor: string) => {
    wallpaperElement.style.backgroundColor = newBackgroundColor;
    getBody().style.backgroundColor = newBackgroundColor;
    updateSelectionStyles();
  },
  onImageSizeChanged: () => {},
  onInfoButtonClicked: () => {
    intro.onShow();
    menu.resetStyles();
    menu.closeAllWindows();
    menu.onHide();
    textEditor.onHide();
  },
};

menu = new Menu(menuCallbacks);
menu.onStart({
  width: window.screen.width,
  height: window.screen.height,
  scale: window.devicePixelRatio || 1,
  textSize: 24,
  textColor: colors.flat_clouds,
  backgroundColor: colors.mac_7,
});

updateSelectionStyles();

textEditor.onStart();
textEditor.textSize = menu.textSize;
textEditor.textColor = menu.textColor;

wallpaperElement.style.backgroundColor = menu.backgroundColor;
wallpaperElement.addEventListener('click', () => menu.closeAllWindows());

const intro = new Intro({
  onComplete: () => {
    intro.onHide();
    menu.onShow();
    textEditor.onShow();
    textEditor.focus();
  },
});

document.addEventListener('DOMContentLoaded', () => {
  intro.onStart();
});
