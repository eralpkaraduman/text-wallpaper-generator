import { getElement, callOnNextFrame, debounce, getStyle } from '../utils';

type OnFocusedCallback = () => void;
type TextEditorCallbacks = {onFocused: OnFocusedCallback};

export default class TextEditor {

	textInputElement = null;
	
	_onFocusedCallback: OnFocusedCallback;

	_textSize: Number;
	set textSize(value: Number): void {
		this._textSize = value;
		this._updateTextSize();
	}
	
	_textColor: String;
	set textColor(value: String): void {
		this._textColor = value;
		this._updateTextColor();
	}

	constructor(callbacks: TextEditorCallbacks) {
		this._onFocusedCallback = callbacks.onFocused;
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
		this._onFocusedCallback();
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
		// const text = this.textInputElement.value || '';
		// this.textInputElement.setSelectionRange(0, text.length);
	}
	
	_updateTextSize = () => {
		const fontSizeStyle = `${this._textSize}pt`;
		this.textInputElement.style.fontSize = fontSizeStyle;
		callOnNextFrame(this.handleOnTextChanged)();
	}
	
	_updateTextColor = () => {
		this.textInputElement.style.color = this._textColor;
		this.textInputElement.style.caretColor = this._textColor;
		
		// const stylesheet = document.styleSheets[0];
		// try {stylesheet.insertRule('::selection {color: red}', 0);} catch(e) {} // eslint-disable-line
		// try {stylesheet.insertRule('::-moz-selection {color: red}', 0);} catch(e) {} // eslint-disable-line
		
		
		
		// stylesheet.insertRule('::-moz-selection {color: red}', 0);
		
	}
}
