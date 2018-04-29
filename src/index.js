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


