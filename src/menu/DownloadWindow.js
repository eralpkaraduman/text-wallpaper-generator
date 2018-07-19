// @flow
export type GenerateCanvasCallback = () => Promise<HTMLCanvasElement>;
export type GenerateFileNameCallback = () => string;

import 'blob.js';
import * as utils from '../utils';
import MenuWindow from './MenuWindow';
// import FileSaver from 'file-saver';

export default class DownloadWindow extends MenuWindow {

	_downloadButtonElement: HTMLAnchorElement;
	_imageElement: HTMLImageElement;
	_onGenerateImage: GenerateCanvasCallback;
	_onGenerateFileName: GenerateFileNameCallback;

	constructor(elementId: string, onGenerateImage: GenerateCanvasCallback, onGenerateFileName: GenerateFileNameCallback) {
		super(elementId);
		this._onGenerateImage = onGenerateImage;
		this._onGenerateFileName = onGenerateFileName;
		const buttonElement = utils.getElement('download-window-download-button');
		this._downloadButtonElement = ((buttonElement: any): HTMLAnchorElement);
		const imageElement = utils.getElement('download-window-image');
		this._imageElement = ((imageElement: any): HTMLImageElement);
	}

	async updateImage() {
		const canvas = await this._onGenerateImage();
		const fileName = this._onGenerateFileName();
		this._downloadButtonElement.download = this._onGenerateFileName();
		const dataUrl = canvas.toDataURL('image/jpeg');
		this._downloadButtonElement.href = dataUrl;
		this._imageElement.src = dataUrl;
		this._imageElement.alt = fileName;
	}
	
	onWindowWillOpen(): void {
		super.onWindowWillOpen();
		this.updateImage();
	}

}
