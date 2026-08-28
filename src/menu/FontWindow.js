// @flow
import * as utils from '../utils';
import { getFonts } from '../fonts';
import type { FontOption } from '../fonts';
import MenuWindow from './MenuWindow';

type FontChangeRequestHandler = string => void;

export default class FontWindow extends MenuWindow {
  _fontId: string;
  set fontId(value: string) {
    this._fontId = value;
    this.setFontButtonSelected(this._fontId);
  }

  _fontButtonElements: Array<{ font: FontOption, element: HTMLElement }>;
  _containerElement: HTMLElement;
  _handleOnRequestFontChange: FontChangeRequestHandler;

  constructor(
    elementId: string,
    containerElementId: string,
    onRequestFontChange: FontChangeRequestHandler,
  ) {
    super(elementId);
    this._handleOnRequestFontChange = onRequestFontChange;

    this._containerElement = utils.getElement(containerElementId);

    this._fontButtonElements = getFonts().map((font: FontOption) => ({
      font,
      element: this.createFontButton(font),
    }));
    this._fontButtonElements.forEach(({ font, element }) => {
      this._containerElement.appendChild(element);
      element.addEventListener('click', () =>
        this.handleOnFontButtonClicked(font.id),
      );
    });
  }

  createFontButton(font: FontOption) {
    const buttonElement = document.createElement('a');
    buttonElement.setAttribute('href', 'javascript:undefined');
    buttonElement.className = 'font-button';

    const labelElement = document.createElement('span');
    labelElement.className = 'font-button-label';
    labelElement.style.fontFamily = font.cssFontFamily;
    labelElement.textContent = font.label;

    buttonElement.appendChild(labelElement);

    return buttonElement;
  }

  handleOnFontButtonClicked = (fontId: string) => {
    this._handleOnRequestFontChange(fontId);
  };

  setFontButtonSelected(selectedFontId: string) {
    this._fontButtonElements.forEach(({ font, element }) => {
      if (font.id === selectedFontId) {
        element.classList.add('active-button');
      } else {
        element.classList.remove('active-button');
      }
    });
  }
}
