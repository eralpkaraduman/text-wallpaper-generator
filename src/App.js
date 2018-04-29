import html2canvas from 'html2canvas';

class App {
	onStart() {
		// TODO: put some code here
	}

	generateImage(element, format = 'image/png') {
		return new Promise((resolve) => {
			html2canvas(element).then(canvas => {
				resolve(canvas.toDataURL(format));
			});
		});
	}
}

export default App;