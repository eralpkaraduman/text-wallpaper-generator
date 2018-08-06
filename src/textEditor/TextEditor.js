// @flow
import { getElement, callOnNextFrame, debounce, getStyle } from '../utils';

type OnFocusedCallback = () => void;
type TextEditorCallbacks = {onFocused: OnFocusedCallback};

export default class TextEditor {

	textInputElement: HTMLTextAreaElement;
	textInputContainerElement: HTMLElement;
	
	_onFocusedCallback: OnFocusedCallback;

	_textSize: number;
	set textSize(value: number): void {
		this._textSize = value;
		this._updateTextSize();
	}
	
	_textColor: string;
	set textColor(value: string): void {
		this._textColor = value;
		this._updateTextColor();
	}
	
	set text(value: string): void {
		this.textInputElement.value = value;
		this.handleOnTextChanged();
	}
	
	get text(): string {
		return this.textInputElement.value;
	}

	constructor(callbacks: TextEditorCallbacks) {
		this._onFocusedCallback = callbacks.onFocused;
	}

	onStart = () => {
		this.textInputElement = ((getElement('wallpaper-text-input'): any): HTMLTextAreaElement);
		
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
		const lineCount = Math.max(this.text.split('\n').length, 1);
		const lineHeight = parseFloat(getStyle(this.textInputElement, 'line-height') || 0);
		const textInputElementHeight = Math.ceil(lineCount * lineHeight);
		this.textInputElement.style.height = `${textInputElementHeight}px`;
	});

	handleOnTextInputFocus = debounce(() => {
		this._onFocusedCallback();
		callOnNextFrame(this.handleOnTextChanged)();
	});

	handleOnTextInputUnfocus = debounce(() => {
		callOnNextFrame(this.handleOnTextChanged)();
	});

	onShow = () => {
		this.textInputElement.style.display = 'inline-block';
		callOnNextFrame(this.handleOnTextChanged)();
	}
	
	onHide = () => {
		this.textInputElement.style.display = 'none';
	}

	focus = () => {
		const { textInputElement } = this;
		textInputElement.focus();
		callOnNextFrame(() => {
			textInputElement.scrollIntoView({
				behavior: 'smooth',
				// $FlowFixMe
				block: 'center',
				inline: 'center'
			});
		});
	}
	
	_updateTextSize = () => {
		const fontSizeStyle = `${this._textSize.toString()}pt`;
		this.textInputElement.style.fontSize = fontSizeStyle;
		callOnNextFrame(this.handleOnTextChanged)();
	}
	
	_updateTextColor = () => {
		this.textInputElement.style.color = this._textColor;
		// $FlowFixMe
		this.textInputElement.style.caretColor = this._textColor; 
	}
}
