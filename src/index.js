// @flow
import 'normalize.css/normalize.css';
import 'font-awesome/scss/font-awesome.scss';
import 'flexboxgrid';
import 'typeface-fira-mono';
import FileSaver from 'file-saver';

import './index.scss';
import {getElement} from './utils';
import Intro from './Intro';
import Menu from './Menu';
import TextEditor from './TextEditor';
import WallpaperGenerator from './WallpaperGenerator';

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

const textEditor = new TextEditor();

const menu: Menu = new Menu({
	onDownloadRequested: () => {
		handleOnDownloadWallpaper();
	},
	onTextSizeChanged: (newTextSize: Number) => {
		textEditor.textSize = newTextSize;
	},
	onTextColorChanged: (newTextColor: String) => {
		textEditor.textColor = newTextColor;
	},
	onBackgroundColorChanged: (newBackgroundColor: String) => {
		targetElement.style.backgroundColor = newBackgroundColor;
	}
});
menu.onStart();

textEditor.onStart();
textEditor.textSize = menu.textSize;
textEditor.textColor = menu.textColor;

targetElement.style.backgroundColor = menu.backgroundColor;

const intro = new Intro({
	onComplete: () => {
		intro.onHide();
		menu.onShow();
		textEditor.onShow();
		textEditor.focus();
	}
});
intro.onStart();

