// @flow
import * as utils from '../utils';
import MenuWindow from './MenuWindow';

export default class DownloadWindow extends MenuWindow {

	downloadButton: HTMLElement;

	constructor(elementId: string, onDownloadRequested: () => void) {
		super(elementId);
		this.downloadButton = utils.getElement('download-window-download-button');
		this.downloadButton.addEventListener('click', onDownloadRequested);
	}
}
