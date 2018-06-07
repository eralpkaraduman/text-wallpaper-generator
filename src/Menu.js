import * as utils from './utils';

export default class Menu {
	menuElement = null;
	menuContainerElement = null;
	width = null;
	height = null;
	scale = null;
	color = null;
	menuWindowElement = null;
	
	constructor({onDownloadClicked}) {
		this.handleOnColorButtonClicked = null;
		this.handleOnIncreaseFontSizeButtonClicked = null;
		this.handleOnDecreaseFontSizeButtonClicked = null;
		this.handleOnImageWidthButtonClicked = null;
		this.handleOnImageHeightButtonClicked = null;
		this.handleOnDownloadButtonClicked = onDownloadClicked;
	}
	
	onStart = () => {
		this.menuContainerElement = utils.getElement('menu-container');
		this.menuElement = utils.getElement('menu');
		this.menuWindowElement = utils.getElement('menu-window');

		// initial state
		this.width =  window.screen.width;
		this.height =  window.screen.height;
		this.scale = window.devicePixelRatio;
		
		const textSizeButtonElement = utils.getElement('menu-button-text-size-increase');
		
		const buttons = {
			'menu-button-color-button': this.handleOnColorButtonClicked,
			// 'menu-button-text-size-increase': this.handleOnIncreaseFontSizeButtonClicked,
			'menu-button-text-size-increase': () => this.onToggleMenuWindow(textSizeButtonElement),
			'menu-button-text-size-decrease': this.handleOnDecreaseFontSizeButtonClicked,
			'menu-button-image-size-width': this.handleOnImageWidthButtonClicked,
			'menu-button-image-size-height': this.handleOnImageHeightButtonClicked,
			'menu-button-download': this.handleOnDownloadButtonClicked
		};
		
		
		utils.kvoIndexed(buttons).forEach(({key, value}) => {
			const element = utils.getElement(key);
			element.addEventListener('click', value);
		});
	}
	
	onShow = () => {
		this.menuContainerElement.style.display = 'flex';
	}
	
	onHide = () => {
		this.menuContainerElement.style.display = 'none';
	}
	
	onToggleMenuWindow = (buttonElement) => {
		
		//TODO: deselect all
		buttonElement.classList.remove('active-button');
		
		const active = this.menuElement.classList.contains('menu-active');
		if (active) {
			this.menuElement.classList.remove('menu-active');
			this.menuElement.classList.add('menu');
			this.menuWindowElement.style.display = 'none';
		}
		else {
			this.menuElement.classList.remove('menu');
			this.menuElement.classList.add('menu-active');
			this.menuWindowElement.style.display = 'flex';

			buttonElement.classList.add('active-button');
		}
	}
}


