// @flow
import { getElement } from '../utils';
import TextInput from '../TextInput';
import MenuWindow from './MenuWindow';

type UpdateRequestedHandler = () => void;
type SizeChangeRequestHandler = (
  width: number,
  height: number,
  scale: number,
) => void;

export default class ImageSizeWindow extends MenuWindow {
  _requestSizeChangeHandler: SizeChangeRequestHandler;
  _updateRequestedHandler: UpdateRequestedHandler;
  _widthInput: TextInput;
  _heightInput: TextInput;
  _scaleInput: TextInput;

  set width(value: number) {
    this._widthInput.value = value;
  }

  set height(value: number) {
    this._heightInput.value = value;
  }

  set scale(value: number) {
    this._scaleInput.value = value;
  }

  constructor(
    elementId: string,
    onRequestSizeChange: SizeChangeRequestHandler,
    onUpdateRequested: UpdateRequestedHandler,
  ) {
    super(elementId);
    this._requestSizeChangeHandler = onRequestSizeChange;
    this._updateRequestedHandler = onUpdateRequested;
    this._widthInput = new TextInput(
      getElement('menu-image-size-label-width'),
      TextInput.MASKING_MODE_PIXEL,
      this.handleOnInputChanged,
    );
    this._heightInput = new TextInput(
      getElement('menu-image-size-label-height'),
      TextInput.MASKING_MODE_PIXEL,
      this.handleOnInputChanged,
    );
    this._scaleInput = new TextInput(
      getElement('menu-image-size-label-scale'),
      TextInput.MASKING_MODE_SCALE,
      this.handleOnInputChanged,
    );
  }

  onWindowWillOpen(): void {
    super.onWindowWillOpen();
    this._updateRequestedHandler();
  }

  onWindowDidClose(): void {
    super.onWindowDidClose();
    this._updateRequestedHandler();
  }

  handleOnInputChanged = () =>
    this._requestSizeChangeHandler(
      this._widthInput.value,
      this._heightInput.value,
      this._scaleInput.value,
    );

  renderNumberValue(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    } else {
      return value.toString();
    }
  }

  renderFloatValue(value: number): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '';
    } else {
      return value.toFixed(1);
    }
  }

  getNumberFromInputValue(initialValue: number, inputValue: string): number {
    if (inputValue === null || inputValue === undefined) {
      return initialValue;
    }
    if (inputValue.length === 0) {
      return initialValue;
    }
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      return initialValue;
    }
    return value;
  }

  getFloatFromInputValue(initialValue: number, inputValue: string): number {
    if (inputValue === null || inputValue === undefined) {
      return initialValue;
    }
    if (inputValue.length === 0) {
      return initialValue;
    }
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      return initialValue;
    }
    return value;
  }
}
