import 'normalize.css/normalize.css';
import 'flatui-colors';
import 'flexboxgrid';
import 'typeface-fira-mono';
import 'blob.js';
import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';
import './index.scss';

// UTILS
const callOnNextFrame = callback => () => window.setTimeout(callback, 0.2);

// debounce function based on: https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}


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
const initialTextValue = 
`
textwallpaper.online
TEXT WALLPAPER GENERATOR!✨
 =========================== 

Perfect for writing notes and reminders,
or server info like IP's and URL's.

BUT HOW? 🤔
 =========== 
Change this text,
Select text color and size,
Select background color and size,
Click DOWNLOAD button above!`;

wallpaperTextInput.value = initialTextValue;
const defaultDebounceWait = 50;

const handleOnTextChanged = debounce(() => {
	wallpaperTextInput.style.height = 'auto';
	wallpaperTextInput.style.height = wallpaperTextInput.scrollHeight + 'px';
}, defaultDebounceWait);

const handleOnTextInputFocus = debounce(() => {
	if (wallpaperTextInput.value === initialTextValue) {
		wallpaperTextInput.value = '';
		callOnNextFrame(handleOnTextChanged)();
	}
}, defaultDebounceWait);

const handleOnTextInputUnfocus = debounce(() => {
	const {value} = wallpaperTextInput;
	if (!value || value.length <= 0) {
		wallpaperTextInput.value = initialTextValue;
		callOnNextFrame(handleOnTextChanged)();
	}
}, defaultDebounceWait);

wallpaperTextInput.addEventListener('change', handleOnTextChanged, false);
wallpaperTextInput.addEventListener('cut', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('paste', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('drop', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('keydown', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('keyup', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('keypress', callOnNextFrame(handleOnTextChanged), false);
wallpaperTextInput.addEventListener('focus', handleOnTextInputFocus, false);
wallpaperTextInput.addEventListener('blur', handleOnTextInputUnfocus, false);
wallpaperTextInput.addEventListener('focusout', handleOnTextInputUnfocus, false);
wallpaperTextInput.addEventListener('touchleave', handleOnTextInputUnfocus, false);
wallpaperTextInput.addEventListener('touchcancel', handleOnTextInputUnfocus, false);
handleOnTextChanged();
