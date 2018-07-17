// @flow
/*opaque*/ type TextInputMaskingMode = string; // Opaque types don't work? https://github.com/gajus/eslint-plugin-flowtype/issues/300

import { callOnNextFrame } from './utils';
import maskInput, { conformToMask } from 'vanilla-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export default class TextInput {
	
	static MASKING_MODE_PIXEL: TextInputMaskingMode = 'MASKING_MODE_PIXEL';
	static MASKING_MODE_SCALE: TextInputMaskingMode = 'MASKING_MODE_SCALE';
	
	static pixelMaskConfig = {
		mask: createNumberMask({
			allowDecimal: false,
			requireDecimal: false,
			includeThousandsSeparator: false,
			allowLeadingZeroes: true,
			suffix: '',
			prefix: ''
		}),
		guide: true,
		keepCharPositions: false
	};
	
	static scaleMaskConfig = {
		mask: createNumberMask({
			allowDecimal: true,
			decimalSymbol: '.',
			requireDecimal: true,
			includeThousandsSeparator: false,
			allowLeadingZeroes: true,
			prefix: '',
			suffix: '',
		}),
		guide: false,
		placeholderChar: '_',
		keepCharPositions: false,
		pipe: (conformedValue: string) => {
			if (conformedValue.slice(-1) === '0') {
				conformedValue = conformedValue.slice(0, -1);
			}
			if (conformedValue.slice(-1) === '.') {
				conformedValue += '0';
			}
			return conformedValue;
		}
	};
	
	_maskingMode: TextInputMaskingMode;
	_maskedInput: any;
	_maskConfig: Object;
	_inputElement: HTMLInputElement;
	
	get value(): number {
		return parseFloat(this._inputElement.value);
	}
	set value(number: number): void {
		const raw = (number || 0).toString();
		const maskArray = this._maskConfig.mask(raw);
		let config = {...this._maskConfig};
		delete config.mask;
		delete config.pipe;
		let { conformedValue } = conformToMask(raw, maskArray, config);
		if (this._maskingMode === TextInput.MASKING_MODE_SCALE) {
			this._inputElement.value = parseFloat(conformedValue).toFixed(1);
		}
		else {
			this._inputElement.value = conformedValue;
		}
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
		
		this._maskingMode = maskingMode;
		if (maskingMode === TextInput.MASKING_MODE_PIXEL) {
			this._maskConfig = TextInput.pixelMaskConfig;
		}
		else if (maskingMode === TextInput.MASKING_MODE_SCALE) {
			this._maskConfig = TextInput.scaleMaskConfig;
		}
		
		this._maskedInput = maskInput({
			...this._maskConfig,
			inputElement: this._inputElement,
		});
	}
}
