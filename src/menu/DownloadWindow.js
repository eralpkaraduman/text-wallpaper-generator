// @flow
import * as utils from '../utils';

export default class DownloadWindow {

	downloadButton: HTMLElement;

	constructor(onDownloadRequested: () => void) {
		this.downloadButton = utils.getElement('download-window-download-button');
		this.downloadButton.addEventListener('click', onDownloadRequested);
	}
}
