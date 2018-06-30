// @flow
import 'normalize.css/normalize.css';
import 'font-awesome/scss/font-awesome.scss';
import 'flexboxgrid';
import 'typeface-fira-mono';
import FileSaver from 'file-saver';

import './index.scss';
import {getElement, insertStyle} from './utils';
import Intro from './intro/Intro';
import Menu from './menu/Menu';
import TextEditor from './textEditor/TextEditor';
import WallpaperGenerator from './wallpaperGenerator/WallpaperGenerator';

const targetElement: HTMLElement = getElement('wallpaper');

const handleOnDownloadWallpaper = async () => {
	const { width, height, scale } = menu;
	const blob = await WallpaperGenerator.generate({
		targetElement,
		width,
		height,
		scale
	});

	const fileNameScale = scale !== 1 ? `@${scale}` : '';
	const fileName = `textwallpaper.online_${width}x${height}${fileNameScale}.jpg`;
	FileSaver.saveAs(blob, fileName);
};

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
		handleOnDownloadWallpaper();
	},
	onTextSizeChanged: (newTextSize: Number) => {
		textEditor.textSize = newTextSize;
	},
	onTextColorChanged: (newTextColor: String) => {
		textEditor.textColor = newTextColor;
		updateSelectionStyles();
	},
	onBackgroundColorChanged: (newBackgroundColor: String) => {
		targetElement.style.backgroundColor = newBackgroundColor;
		updateSelectionStyles();
	}
});
menu.onStart();
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
intro.onStart();

