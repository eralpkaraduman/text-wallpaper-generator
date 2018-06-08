// @flow
import 'normalize.css/normalize.css';
import 'font-awesome/scss/font-awesome.scss';
import 'flatui-colors';
import 'flexboxgrid';
import 'typeface-fira-mono';
import FileSaver from 'file-saver';

import './index.scss';
import Intro from './Intro';
import Menu from './Menu';
import TextEditor from './TextEditor';
import WallpaperGenerator from './WallpaperGenerator';

const menu: Menu = new Menu({
	onDownloadRequested: handleOnDownloadWallpaper
});

const textEditor = new TextEditor();

const intro = new Intro({
	onComplete: () => {
		intro.onHide();
		menu.onShow();
		textEditor.onShow();
		textEditor.focus();
	}
});

intro.onStart();
menu.onStart();
textEditor.onStart();

const handleOnDownloadWallpaper = async () => {
	const targetElement = document.querySelector('#wallpaper');
	
	const {width, height, scale} = menu;

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
