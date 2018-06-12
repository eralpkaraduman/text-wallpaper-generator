import { getElement, callOnNextFrame, debounce, getStyle } from './utils';

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
		let linecount = this.textInputElement.value.split('\n').length;
		linecount = Math.max(1, linecount);
		const lineHeight = parseInt(getStyle(this.textInputElement, 'line-height'));
		const heightStyle = `${linecount * lineHeight}px`;
		this.textInputElement.style.height = heightStyle;
	});

	handleOnTextInputFocus = debounce(() => {
		callOnNextFrame(this.handleOnTextChanged)();
	});

	handleOnTextInputUnfocus = debounce(() => {
		callOnNextFrame(this.handleOnTextChanged)();
	});

	onShow = () => {
		this.textInputElement.style.display = 'block';
		callOnNextFrame(this.handleOnTextChanged)();
	}
	
	onHide = () => {
		this.textInputElement.style.display = 'none';
	}

	focus = () => {
		this.textInputElement.focus();
	}
	
	_updateTextSize = () => {
		const fontSizeStyle = `${this._textSize}pt`;
		this.textInputElement.style.fontSize = fontSizeStyle;
		callOnNextFrame(this.handleOnTextChanged)();
	}
}
