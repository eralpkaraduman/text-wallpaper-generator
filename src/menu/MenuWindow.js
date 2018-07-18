import * as utils from '../utils';

export default class MenuWindow {
	_element: HTMLElement;
	_elementId: string;
	constructor(elementId: string) {
		this._elementId = elementId;
		this._element = utils.getElement(this._elementId);
	}
	
	open() {
		this.onWindowWillOpen();
		this._element.style.display = 'flex';
	}
	
	close() {
		this._element.style.display = 'none';
		this.onWindowDidClose();
	}
	
	onWindowWillOpen(): void {}
	onWindowDidClose(): void {}
}
