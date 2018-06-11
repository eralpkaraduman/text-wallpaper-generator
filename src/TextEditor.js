import { getElement, callOnNextFrame, debounce } from './utils';

export default class TextEditor {

	textInputElement = null;
	
	_textSize: Number;
	set textSize(value: Number): void {
		this._textSize = value;
		this._updateTextSize();
	}

	constructor() {
	}

	onStart = () => {
		this.textInputElement = getElement('wallpaper-text-input');
		const {
			textInputElement,
			handleOnTextChanged,
			handleOnTextInputFocus,
			handleOnTextInputUnfocus
		} = this;
		
		textInputElement.addEventListener('change', handleOnTextChanged, false);
		textInputElement.addEventListener('cut', callOnNextFrame(handleOnTextChanged), false);
		textInputElement.addEventListener('paste', callOnNextFrame(handleOnTextChanged), false);
		textInputElement.addEventListener('drop', callOnNextFrame(handleOnTextChanged), false);
		textInputElement.addEventListener('keydown', callOnNextFrame(handleOnTextChanged), false);
		textInputElement.addEventListener('keyup', callOnNextFrame(handleOnTextChanged), false);
		textInputElement.addEventListener('keypress', callOnNextFrame(handleOnTextChanged), false);
		textInputElement.addEventListener('focus', handleOnTextInputFocus, false);
		textInputElement.addEventListener('blur', handleOnTextInputUnfocus, false);
		textInputElement.addEventListener('focusout', handleOnTextInputUnfocus, false);
		textInputElement.addEventListener('touchleave', handleOnTextInputUnfocus, false);
		textInputElement.addEventListener('touchcancel', handleOnTextInputUnfocus, false);
	}

	handleOnTextChanged = debounce(() => {
		this.textInputElement.style.height = 'auto';
		this.textInputElement.style.height = this.textInputElement.scrollHeight + 'px';
	});

	handleOnTextInputFocus = debounce(() => {
		callOnNextFrame(this.handleOnTextChanged)();
	});

	handleOnTextInputUnfocus = debounce(() => {
		callOnNextFrame(this.handleOnTextChanged)();
	});

	onShow = () => {
		this.textInputElement.style.display = 'block';
	}
	
	onHide = () => {
		this.textInputElement.style.display = 'none';
	}

	focus = () => {
		this.textInputElement.focus();
	}
	
	_updateTextSize = () => {
		const fontSizeText = `${this._textSize}px`;
		this.textInputElement.style.fontSize = fontSizeText;
		callOnNextFrame(this.handleOnTextChanged)();
	}
}
