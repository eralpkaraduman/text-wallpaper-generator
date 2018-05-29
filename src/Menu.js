import * as utils from './utils';



export default class Menu {
	menuElement = null;
	
	onStart = () => {
		this.menuElement = utils.getElement('menu');
		
		const buttons = {
			'menu-button-color-button': this.handleOnColorButtonClicked,
			'menu-button-text-size-increase': this.handleOnIncreaseFontSizeButtonClicked,
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
		this.menuElement.style.display = 'flex';
	}
	
	onHide = () => {
		this.menuElement.style.display = 'none';
	}
	
	// button handlers

	handleOnColorButtonClicked = () => {
		console.log('OnColorButtonClicked');
	}
	handleOnIncreaseFontSizeButtonClicked = () => {
		console.log('OnIncreaseFontSizeButtonClicked');
	}
	handleOnDecreaseFontSizeButtonClicked = () => {
		console.log('OnDecreaseFontSizeButtonClicked');
	}
	handleOnImageWidthButtonClicked = () => {
		console.log('OnImageWidthButtonClicked');
	}
	handleOnImageHeightButtonClicked = () => {
		console.log('OnImageHeightButtonClicked');
	}
	handleOnDownloadButtonClicked = () => {
		console.log('OnDownloadButtonClicked');
	}
	
}


