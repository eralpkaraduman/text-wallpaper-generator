// @flow
import * as utils from '../utils';
import {getColors} from '../colors';

type ColorChangeRequestHandler = (String) => void;

export default class ColorWindow {
	_color: String;
	set color(value: String) {
		this._color = value;
		this.setColorButtonSelected(this._color);
	}
	
	_colorButtonElements: Array<{color:String, element:HTMLElement}>;
	_containerElement: HTMLElement;
	_handleOnRequestColorChange: ColorChangeRequestHandler;

	constructor(containerElementId: String, onRequestColorChange: ColorChangeRequestHandler) {
		this._handleOnRequestColorChange = onRequestColorChange;
		
		this._containerElement = utils.getElement(containerElementId);
		
		this._colorButtonElements = getColors('flat_ui_colors').map((color: String) => ({
			color,
			element: this.createColorButton(color)
		}));
		this._colorButtonElements.forEach(({color, element}) => {
			this._containerElement.appendChild(element);
			element.addEventListener('click', () => this.handleOnColorButtonClicked(color));
		});
	}

	createColorButton(color: String) {
		const buttonElement = document.createElement('a');
		buttonElement.setAttribute('href', 'javascript:undefined');

		const colorRectElement = document.createElement('div');
		colorRectElement.className = 'colorRectangle';
		colorRectElement.style.backgroundColor = color;

		buttonElement.appendChild(colorRectElement);

		return buttonElement;
	}

	handleOnColorButtonClicked = (color: String) => {
		this._handleOnRequestColorChange(color);
	}
	
	setColorButtonSelected(selectorColor: String) {
		this._colorButtonElements.forEach(({color, element}) => {
			if (color === selectorColor) {
				element.classList.add('active-button');
			}
			else {
				element.classList.remove('active-button');
			}
		});
	}
}
