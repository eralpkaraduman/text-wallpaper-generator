import { getElement, callOnNextFrame, debounce } from './utils';

export default class TextEditor {

	textInputElement = null;

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
		// if (wallpaperTextInput.value === initialTextValue) {
		// 	wallpaperTextInput.value = '';
		// 	callOnNextFrame(handleOnTextChanged)();
		// }
	});

	handleOnTextInputUnfocus = debounce(() => {
		// const {value} = wallpaperTextInput;
		// if (!value || value.length <= 0) {
		// 	wallpaperTextInput.value = initialTextValue;
		// 	callOnNextFrame(handleOnTextChanged)();
		// }
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
}
