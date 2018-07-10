// @flow
import * as utils from '../utils';

type SizeChangeRequestHandler = (width: number, height: number, scale: number) => void;

export default class ImageSizeWindow {
	_requestSizeChangeHandler: SizeChangeRequestHandler;
	_widthLabelElement: HTMLElement;
	_heightLabelElement: HTMLElement;
	_scaleLabelElement: HTMLElement;
	
	_width: number
	set width(value: number) {
		this._width = value;
		this.updateProperties();
	}
	
	_height: number;
	set height(value: number) {
		this._height = value;
		this.updateProperties();
	}
	
	_scale: number;
	set scale(value: number) {
		this._scale = value;
		this.updateProperties();
	}

	constructor(width: number, height: number, scale: number, onRequestSizeChange: SizeChangeRequestHandler) {
		this._width = width;
		this._height = height;
		this._scale = scale;
		this._requestSizeChangeHandler = onRequestSizeChange;
		this._widthLabelElement = utils.getElement('menu-image-width-label-width');
		this._heightLabelElement = utils.getElement('menu-image-width-label-height');
		this._scaleLabelElement = utils.getElement('menu-image-width-label-scale');
		this.updateProperties();
	}
	
	updateProperties() {
		const toPixelString = value => `${value.toString()}px`;
		this._widthLabelElement.textContent = toPixelString(this._width);
		this._heightLabelElement.textContent = toPixelString(this._height);
		this._scaleLabelElement.textContent = `${this._scale.toPrecision(2).toString()}`;
	}
}
