import * as utils from '../utils';
import MenuWindow from './MenuWindow';

type TextSizeChangeCallback = (newTextSize: number) => void;

export default class TextSizeWindow extends MenuWindow {
  plusButton: HTMLElement;
  minusButton: HTMLElement;
  textSizeLabel: HTMLInputElement;

  _textSizeChangeCallback: TextSizeChangeCallback;

  _textSize: number;
  set textSize(value: number): void {
    this._textSize = value;
    this._updateTextSizeLabel();
  }

  constructor(
    elementId: string,
    onTextSizeChangeRequested: TextSizeChangeCallback,
  ) {
    super(elementId);
    this._textSizeChangeCallback = onTextSizeChangeRequested;
    this.textSizeLabel = utils.getElement('text-size-window-size-label');
    this.minusButton = utils.getElement('text-size-window-minus-button');
    this.plusButton = utils.getElement('text-size-window-plus-button');

    this.minusButton.addEventListener('click', this._handleOnMinusClicked);
    this.plusButton.addEventListener('click', this._handleOnPlusClicked);
    this.textSizeLabel.addEventListener('change', this._handleOnInputChanged);
  }

  _updateTextSizeLabel = () => {
    this.textSizeLabel.value = String(this._textSize);
  };

  _handleOnMinusClicked = () => {
    this._textSizeChangeCallback(this._textSize - 1);
  };

  _handleOnInputChanged = (event) => {
    const numericValue = parseInt(event.target.value, 10);
    if (!isNaN(numericValue)) {
      this._textSizeChangeCallback(numericValue);
    }
  };

  _handleOnPlusClicked = () => {
    this._textSizeChangeCallback(this._textSize + 1);
  };
}
