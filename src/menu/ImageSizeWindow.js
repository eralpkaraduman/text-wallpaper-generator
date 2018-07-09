// @flow
import * as utils from '../utils';

type SizeChangeRequestHandler = (width: Number, height: Number, scale: Number) => void;

export default class ImageSizeWindow {
	_requestSizeChangeHandler: SizeChangeRequestHandler;
	_widthLabelElement: HTMLElement;
	_heightLabelElement: HTMLElement;
	_scaleLabelElement: HTMLElement;
	
	_width: Number
	set width(value: Number) {
		this._width = value;
		this.updateProperties();
	}
	
	_height: Number;
	set height(value: Number) {
		this._height = value;
		this.updateProperties();
	}
	
	_scale: Number;
	set scale(value: Number) {
		this._scale = value;
		this.updateProperties();
	}

	constructor(width: Number, height: Number, scale: Number, onRequestSizeChange: SizeChangeRequestHandler) {
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
