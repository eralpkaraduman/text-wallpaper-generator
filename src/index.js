// @flow
import FileSaver from 'file-saver';
import 'flexboxgrid';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import '@fortawesome/fontawesome-free/css/solid.css';
import 'typeface-fira-mono';
import 'normalize.css/normalize.css';
import colors from './colors';

import './index.scss';
import {getElement, insertStyle} from './utils';
import Intro from './intro/Intro';
import Menu from './menu/Menu';
import TextEditor from './textEditor/TextEditor';
import WallpaperGenerator from './wallpaperGenerator/WallpaperGenerator';

const targetElement: HTMLElement = getElement('wallpaper');

let menu: Menu;

const textEditor = new TextEditor({
	onFocused: () => menu.closeAllWindows()
});

const updateSelectionStyles = () => {
	const {textColor, backgroundColor} = menu;
	insertStyle('wallpaper-text-input', 'placeholder', {'color': textColor});
	insertStyle('wallpaper-text-input', 'selection', {'color': backgroundColor, 'background-color': textColor});
};

menu = new Menu({
	onDownloadRequested: () => {
		updateSelectionStyles();
		if (!textEditor.text.length) {
			textEditor.text = '\rIt would be nice,\rif you typed something here.\r';
		}
		
		setTimeout(() => {
			handleOnDownloadWallpaper();
		}, 200);
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
});
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

// TODO: move this into DownloadWindow
const handleOnDownloadWallpaper = async () => {
	const { width, height, scale } = menu;
	const blob = await WallpaperGenerator.generate({
		targetElement,
		width,
		height,
		scale
	});

	const fileNameScale = scale !== 1 ? `@${scale.toString()}` : '';
	const fileName = `textwallpaper.online_${width}x${height}${fileNameScale}.jpg`;
	FileSaver.saveAs(blob, fileName);
};

document.addEventListener('DOMContentLoaded', () => {
	intro.onStart();
});
