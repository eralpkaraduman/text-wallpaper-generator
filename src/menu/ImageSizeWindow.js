// @flow
import { getElement, callOnNextFrame } from '../utils';

type SizeChangeRequestHandler = (width: number, height: number, scale: number) => void;

export default class ImageSizeWindow {
	_requestSizeChangeHandler: SizeChangeRequestHandler;
	_widthInput: TextInput;
	_heightInput: TextInput;
	_scaleInput: TextInput;

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
		this._widthInput = new TextInput(
			getElement('menu-image-size-label-width'),
			() => this.onWidthInputChanged()
		);
		this._heightInput = new TextInput(
			getElement('menu-image-size-label-height'),
			() => this.onHeightInputChanged()
		);
		this._scaleInput = new TextInput(
			getElement('menu-image-size-label-scale'),
			() => this.onScaleInputChanged()
		);
		this.updateProperties();
	}

	updateProperties() {
		const toPixelString = value => `${value.toString()}px`;
		this._widthInput.inputElement.value = toPixelString(this._width);
		this._heightInput.inputElement.value = toPixelString(this._height);
		this._scaleInput.inputElement.value = `${this._scale.toPrecision(2).toString()}`;
	}
	
	onWidthInputChanged() {
		const {value} = this._widthInput.inputElement;
		console.log({width: value});
	}

	onHeightInputChanged() {
		const { value } = this._heightInput.inputElement;
		console.log({ height: value });
	}

	onScaleInputChanged() {
		const { value } = this._scaleInput.inputElement;
		console.log({ scale: value });
	}
}


class TextInput {
	_inputElement: HTMLInputElement;
	get inputElement(): HTMLInputElement {
		return this._inputElement;
	}

	constructor(element: HTMLElement, onChange: Function, onFocus: ?Function, onUnfocus: ?Function) {
		this._inputElement = (element: any);
		this._inputElement.addEventListener('change', onChange, false);
		this._inputElement.addEventListener('cut', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('paste', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('drop', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('keydown', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('keyup', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('keypress', callOnNextFrame(onChange), false);
		if (onFocus) {
			this._inputElement.addEventListener('focus', onFocus, false);
		}
		if (onUnfocus) {
			this._inputElement.addEventListener('blur', onUnfocus, false);
			this._inputElement.addEventListener('focusout', onUnfocus, false);
			this._inputElement.addEventListener('touchleave', onUnfocus, false);
			this._inputElement.addEventListener('touchcancel', onUnfocus, false);
		}
	}
}
