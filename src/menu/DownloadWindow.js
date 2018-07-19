// @flow
export type GenerateCanvasCallback = () => Promise<HTMLCanvasElement>;
export type GenerateFileNameCallback = () => string;

import 'blob.js';
import * as utils from '../utils';
import MenuWindow from './MenuWindow';
// import FileSaver from 'file-saver';

export default class DownloadWindow extends MenuWindow {

	_downloadButtonElement: HTMLAnchorElement;
	_onGenerateImage: GenerateCanvasCallback;
	_onGenerateFileName: GenerateFileNameCallback;

	constructor(elementId: string, onGenerateImage: GenerateCanvasCallback, onGenerateFileName: GenerateFileNameCallback) {
		super(elementId);
		this._onGenerateImage = onGenerateImage;
		this._onGenerateFileName = onGenerateFileName;
		const buttonElement = utils.getElement('download-window-download-button');
		this._downloadButtonElement = ((buttonElement: any): HTMLAnchorElement);
	}

	async updateImage() {
		const canvas = await this._onGenerateImage();
		this._downloadButtonElement.download = this._onGenerateFileName();
		this._downloadButtonElement.href = canvas.toDataURL('image/jpeg');
	}
	
	onWindowWillOpen(): void {
		super.onWindowWillOpen();
		this.updateImage();
	}

}
