import 'normalize.css/normalize.css';
import 'font-awesome/scss/font-awesome.scss';
import 'flatui-colors';
import 'flexboxgrid';
import 'typeface-fira-mono';
import 'blob.js';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
import './index.scss';
import Intro from './Intro';
import Menu from './Menu';
import TextEditor from './TextEditor';

// IMAGE GENERATION

let imageOptions = { format: 'image/jpeg', fileName: 'wallpaper.jpg' };
let html2canvasOptions = {
	windowWidth: window.screen.width,
	windowHeight: window.screen.height,
	scale: window.devicePixelRatio
};

function downloadCanvas(canvas) {
	canvas.toBlob(blob => FileSaver.saveAs(blob, imageOptions.fileName));
}

function downloadImage() {
	const targetElement = document.querySelector('#wallpaper');
	html2canvas(targetElement, html2canvasOptions)
		.then(canvas => downloadCanvas(canvas));
}

// BEGIN
const menu = new Menu({
	onDownloadClicked: () => {
		downloadImage();
	}
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
