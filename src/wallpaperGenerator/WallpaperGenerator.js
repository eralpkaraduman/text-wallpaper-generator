import html2canvas from 'html2canvas';
import 'blob.js';

export default class ImageGenerator {
	static async generate(options) {
		const {
			targetElement,
			width,
			height,
			scale
		} = options;

		// console.debug(`Generating wallpaper with options;
		// 	width: ${width}
		// 	height: ${height}
		// 	scale: ${scale}
		// `);

		const canvas = await html2canvas(targetElement, {
			windowWidth: width,
			windowHeight: height,
			width,
			height,
			scale
		});

		return new Promise(resolve => canvas.toBlob(resolve));
	}
}
