// @flow
import 'flexboxgrid';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import 'normalize.css/normalize.css';
import colors from './colors';
import html2canvas from 'html2canvas';

import './index.scss';
import { getElement, insertStyle } from './utils';
import Intro from './intro/Intro';
import Menu from './menu/Menu';
import type {MenuCallbacks} from './menu/Menu';
import TextEditor from './textEditor/TextEditor';

const targetElement: HTMLElement = getElement('wallpaper');

let menu: Menu;

const textEditor = new TextEditor({
	onFocused: () => menu.closeAllWindows()
});

const updateSelectionStyles = () => {
	const { textColor, backgroundColor } = menu;
	insertStyle('wallpaper-text-input', 'placeholder', { 'color': textColor });
	insertStyle('wallpaper-text-input', 'selection', { 'color': backgroundColor, 'background-color': textColor });
};

async function generateCanvas(width: number, height: number, scale: number, targetElement: HTMLElement): Promise<HTMLCanvasElement> {
	return await html2canvas(targetElement, {
		windowWidth: width,
		windowHeight: height,
		width,
		height,
		scale
	});
}

const menuCallbacks: MenuCallbacks = {
	onGenerateCanvas: async (width, height, scale) => await generateCanvas(width, height, scale, targetElement),
	onPrepareForImageGeneration: () => {
		if (!textEditor.text.length) {
			textEditor.text = 'It would be nice,\nif you typed something here.';
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
		targetElement.style.backgroundColor = newBackgroundColor;
		updateSelectionStyles();
	},
	onImageSizeChanged: () => {

	}
};

menu = new Menu(menuCallbacks);
menu.onStart({
	width: window.screen.width,
	height: window.screen.height,
	scale: window.devicePixelRatio,
	textSize: 24,
	textColor: colors.silver,
	backgroundColor: colors.wet_asphalt
});

updateSelectionStyles();

textEditor.onStart();
textEditor.textSize = menu.textSize;
textEditor.textColor = menu.textColor;

targetElement.style.backgroundColor = menu.backgroundColor;
targetElement.addEventListener('click', () => menu.closeAllWindows());

const intro = new Intro({
	onComplete: () => {
		intro.onHide();
		menu.onShow();
		textEditor.onShow();
		textEditor.focus();
	}
});

document.addEventListener('DOMContentLoaded', () => {
	intro.onStart();
});

require('offline-plugin/runtime').install();
