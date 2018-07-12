// @flow
import { callOnNextFrame } from './utils';

export default class TextInput {
	_inputElement: HTMLInputElement;
	get inputElement(): HTMLInputElement {
		return this._inputElement;
	}

	constructor(element: HTMLElement, onChange: Function, onFocus: ?Function, onUnfocus: ?Function) {
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
	}
}
