import 'normalize.css/normalize.css';
import 'flatui-colors';
import 'flexboxgrid';
import 'typeface-fira-mono';
import 'blob.js';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
import './index.scss';

// UTILS
const callOnNextFrame = callback => () => window.setTimeout(callback, 0);


// IMAGE GENERATION
let imageOptions = { format: 'image/jpeg', fileName: 'wallpaper.jpg' };
let html2canvasOptions = {
	windowWidth: 1920,
	windowHeght: 1080
};

function downloadCanvas(canvas) {
	canvas.toBlob(blob => FileSaver.saveAs(blob, imageOptions.fileName));
}

function downloadImage() {
	const targetElement = document.querySelector('#wallpaper');
	html2canvas(targetElement, html2canvasOptions)
		.then(canvas => downloadCanvas(canvas));
}

window.onDownloadImage = downloadImage;


// TEXT INPUT
const wallpaperTextInput = document.getElementById('wallpaper-text-input');

wallpaperTextInput.value =
`TEXT WALLPAPER GENERATOR!✨
=========================== 

Perfect for writing notes and reminders,
or server info like IP's and URL's.

BUT HOW? 🤔
=========== 
Change this text,
Select text color and size,
Select background color and size,
Click DOWNLOAD button above!`;

function handleOnTextChanged() {
	wallpaperTextInput.style.height = 'auto';
	wallpaperTextInput.style.height = wallpaperTextInput.scrollHeight + 'px';
}
wallpaperTextInput.addEventListener('change', handleOnTextChanged, false);
wallpaperTextInput.addEventListener('cut', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('paste', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('drop', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('keydown', callOnNextFrame(handleOnTextChanged), false);
handleOnTextChanged();
