// @flow
import html2canvas from 'html2canvas';
import 'blob.js';

type Options = {
	targetElement: HTMLElement,
	width: number,
	height: number,
	scale: number
}

export default class ImageGenerator {
	static async generate(options: Options) {
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
