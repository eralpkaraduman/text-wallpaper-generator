import 'normalize.css/normalize.css';
import 'typeface-fira-mono';
import 'flatui-colors';
import 'flexboxgrid';

import App from './App';
import './index.scss';

const app = new App();
app.onStart();

const image = {format: 'image/jpeg', fileMame: 'wallpaper.jpg'};
let downloadButton = undefined;
const button = document.getElementById('btn-download');
const root = document.getElementById('root');
button.addEventListener('click', () => {
	const targetElement = document.querySelector('#wallpaper');
	app.generateImage(targetElement).then(imageDataUrl => {
		imageDataUrl = imageDataUrl.replace(image.format, 'image/octet-stream');
		downloadButton = document.createElement('a');
		downloadButton.target = '_blank';
		downloadButton.href = imageDataUrl;
		downloadButton.download = image.fileMame;
		var linkText = document.createTextNode('Download 2');
		downloadButton.appendChild(linkText);
		// downloadButton.click();
		root.insertBefore(downloadButton, button);
	});
});

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

const callOnNextFrame = callback => () => window.setTimeout(callback, 0);
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
