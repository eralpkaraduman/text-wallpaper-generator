// @flow
type TextInputMaskingMode = string;

import { callOnNextFrame } from './utils';
import InputMask from 'inputmask';

export default class TextInput {
	
	static MASKING_MODE_INTEGER: TextInputMaskingMode = 'MASKING_MODE_INTEGER';
	static MASKING_MODE_FLOAT: TextInputMaskingMode = 'MASKING_MODE_FLOAT';
	
	_inputElement: HTMLInputElement;
	get inputElement(): HTMLInputElement {
		return this._inputElement;
	}

	constructor(element: HTMLElement, maskingMode: TextInputMaskingMode, onChange: Function, onFocus: ?Function, onUnfocus: ?Function) {
		this._inputElement = (element: any);
		
		// onChange = debounce(() => onChange());
		this._inputElement.addEventListener('change', onChange, false);
		this._inputElement.addEventListener('cut', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('paste', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('drop', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('keydown', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('keyup', callOnNextFrame(onChange), false);
		this._inputElement.addEventListener('keypress', callOnNextFrame(onChange), false);
		if (onFocus) {
			// onFocus = debounce(() => onFocus && onFocus());
			this._inputElement.addEventListener('focus', onFocus, false);
		}
		if (onUnfocus) {
			// onUnfocus = debounce(() => onUnfocus && onUnfocus());
			this._inputElement.addEventListener('blur', onUnfocus, false);
			this._inputElement.addEventListener('focusout', onUnfocus, false);
			this._inputElement.addEventListener('touchleave', onUnfocus, false);
			this._inputElement.addEventListener('touchcancel', onUnfocus, false);
		}
		
		if (maskingMode === TextInput.MASKING_MODE_INTEGER) {
			InputMask().mask(this._inputElement);
		}
		else if (maskingMode === TextInput.MASKING_MODE_FLOAT) {
			InputMask().mask(this._inputElement);
		}
	}
}
