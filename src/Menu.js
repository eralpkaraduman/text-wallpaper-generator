import * as utils from './utils';



export default class Menu {
	menuElement = null;
	
	constructor({onDownloadClicked}) {
		this.handleOnColorButtonClicked = null;
		this.handleOnIncreaseFontSizeButtonClicked = null;
		this.handleOnDecreaseFontSizeButtonClicked = null;
		this.handleOnImageWidthButtonClicked = null;
		this.handleOnImageHeightButtonClicked = null;
		this.handleOnDownloadButtonClicked = onDownloadClicked;
	}
	
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
}


