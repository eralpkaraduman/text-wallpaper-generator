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
		this._updateUi();
	}

	_height: number;
	set height(value: number) {
		this._height = value;
		this._updateUi();
	}

	_scale: number;
	set scale(value: number) {
		this._scale = value;
		this._updateUi();
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
		this._width = this.getNumberFromInputValue(this._width, stringValue);
		this._requestSizeChangeHandler(this._width, this._height, this._scale);
	}

	onHeightInputChanged() {
		const stringValue = this._heightInput.inputElement.value;
		this._height = this.getNumberFromInputValue(this._height, stringValue);
		this._requestSizeChangeHandler(this._width, this._height, this._scale);
	}

	onScaleInputChanged() {
		const stringValue = this._scaleInput.inputElement.value;
		this._scale = this.getFloatFromInputValue(this._scale, stringValue);
		this._requestSizeChangeHandler(this._width, this._height, this._scale);
	}
	
	_updateUi() {
		this._widthInput.inputElement.value = this.renderNumberValue(this._width);
		this._heightInput.inputElement.value = this.renderNumberValue(this._height);
		this._scaleInput.inputElement.value = this.renderFloatValue(this._scale);
	}
	
	renderNumberValue(value: number): string {
		if (value === null || value === undefined || isNaN(value)) {
			return '';
		}
		else {
			return value.toString();
		}
	}
	
	renderFloatValue(value: number): string {
		if (value === null || value === undefined || isNaN(value)) {
			return '';
		}
		else {
			return value.toFixed(1);
		}
	}
	
	getNumberFromInputValue(initialValue: number, inputValue: string): number {
		if (inputValue === null || inputValue === undefined) {
			return initialValue;
		}
		if (inputValue.length === 0) {
			return initialValue;
		}
		const value = parseInt(inputValue);
		if (isNaN(value)) {
			return initialValue;
		}
		return value;
	}
	
	getFloatFromInputValue(initialValue: number, inputValue: string): number {
		if (inputValue === null || inputValue === undefined) {
			return initialValue;
		}
		if (inputValue.length === 0) {
			return initialValue;
		}
		const value = parseFloat(inputValue);
		if (isNaN(value)) {
			return initialValue;
		}
		return value;
	}
}

