// @flow
import * as utils from '../utils';

type TextSizeChangeCallback = (newTextSize: Number) => void

export default class TextSizeWindow {
	plusButton: HTMLElement;
	minusButton: HTMLElement;
	textSizeLabel: HTMLElement;
	
	_textSizeChangeCallback: TextSizeChangeCallback
	
	_textSize: Number;
	set textSize(value: Number): void {
		this._textSize = value;
		this._updateTextSizeLabel();
	}

	constructor(onTextSizeChangeRequested: TextSizeChangeCallback) {
		this._textSizeChangeCallback = onTextSizeChangeRequested;
		this.textSizeLabel = utils.getElement('text-size-window-size-label');
		this.minusButton = utils.getElement('text-size-window-minus-button');
		this.plusButton = utils.getElement('text-size-window-plus-button');
		
		this.minusButton.addEventListener('click', this._handleOnMinusClicked);
		this.plusButton.addEventListener('click', this._handleOnPlusClicked);
	}
	
	_updateTextSizeLabel = () => {
		this.textSizeLabel.innerText = String(this._textSize);
	}
	
	_handleOnMinusClicked = () => {
		this._textSizeChangeCallback(this._textSize - 1);
	}
	
	_handleOnPlusClicked = () => {
		this._textSizeChangeCallback(this._textSize + 1);
	}
}
