// @flow
import { getElement } from '../utils';
import TextInput from '../TextInput';

type SizeChangeRequestHandler = (width: number, height: number, scale: number) => void;

export default class ImageSizeWindow {
	_requestSizeChangeHandler: SizeChangeRequestHandler;
	_widthInput: TextInput;
	_heightInput: TextInput;
	_scaleInput: TextInput;

	_width: number
	set width(value: number) {
		this._width = value;
		this._widthInput.inputElement.value = this._width.toString();
	}

	_height: number;
	set height(value: number) {
		this._height = value;
		this._heightInput.inputElement.value = this._height.toString();
	}

	_scale: number;
	set scale(value: number) {
		this._scale = value;
		this._scaleInput.inputElement.value = `${this._scale.toPrecision(2).toString()}`;
	}

	constructor(onRequestSizeChange: SizeChangeRequestHandler) {
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
	}

	onWidthInputChanged() {
		const stringValue = this._widthInput.inputElement.value;
		this._width = this.validatedNumberInput(this._width, stringValue);
		this._requestSizeChangeHandler(this._width, this._height, this._scale);
	}

	onHeightInputChanged() {
		const stringValue = this._heightInput.inputElement.value;
		this._height = this.validatedNumberInput(this._height, stringValue);
		this._requestSizeChangeHandler(this._width, this._height, this._scale);
	}

	onScaleInputChanged() {
		const stringValue = this._scaleInput.inputElement.value;
		this._scale = this.validatedNumberInput(this._scale, stringValue);
		this._requestSizeChangeHandler(this._width, this._height, this._scale);
	}
	
	validatedNumberInput(initialValue: number, newStringValue: string): number {
		return parseInt(newStringValue);
	}
}

