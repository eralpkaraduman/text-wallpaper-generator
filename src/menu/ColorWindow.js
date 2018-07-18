// @flow
import * as utils from '../utils';
import {getColors} from '../colors';
import MenuWindow from './MenuWindow';

type ColorChangeRequestHandler = string => void;

export default class ColorWindow extends MenuWindow {
	_color: string;
	set color(value: string) {
		this._color = value;
		this.setColorButtonSelected(this._color);
	}
	
	_colorButtonElements: Array<{color:string, element:HTMLElement}>;
	_containerElement: HTMLElement;
	_handleOnRequestColorChange: ColorChangeRequestHandler;

	constructor(elementId: string, containerElementId: string, onRequestColorChange: ColorChangeRequestHandler) {
		super(elementId);
		this._handleOnRequestColorChange = onRequestColorChange;
		
		this._containerElement = utils.getElement(containerElementId);
		
		this._colorButtonElements = getColors().map((color: string) => ({
			color,
			element: this.createColorButton(color)
		}));
		this._colorButtonElements.forEach(({color, element}) => {
			this._containerElement.appendChild(element);
			element.addEventListener('click', () => this.handleOnColorButtonClicked(color));
		});
	}

	createColorButton(color: string) {
		const buttonElement = document.createElement('a');
		buttonElement.setAttribute('href', 'javascript:undefined');

		const colorRectElement = document.createElement('div');
		colorRectElement.className = 'colorRectangle';
		colorRectElement.style.backgroundColor = color;

		buttonElement.appendChild(colorRectElement);

		return buttonElement;
	}

	handleOnColorButtonClicked = (color: string) => {
		this._handleOnRequestColorChange(color);
	}
	
	setColorButtonSelected(selectorColor: string) {
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
