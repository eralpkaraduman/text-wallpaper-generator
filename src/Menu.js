// @flow
import * as utils from './utils';
import colors from './colors';
import DownloadWindow from './menu/DownloadWindow';
import TextSizeWindow from './menu/TextSizeWindow';
import ColorWindow from './menu/ColorWindow';

type MenuCallbacks = {
	onDownloadRequested: () => void,
	onTextSizeChanged: (Number) => void,
	onTextColorChanged: (String) => void
};

export default class Menu {
	menuElement: HTMLElement;
	menuContainerElement: HTMLElement;
	menuWindowElement: HTMLElement;
	menuTextColorButtonColorRectangleElement: HTMLElement;

	textSize: Number;
	width: Number;
	height: Number;
	scale: Number;
	color: Number;
	textColor: String;

	buttonElements: {
		color: HTMLElement,
		textSize: HTMLElement,
		imageSize: HTMLElement,
		download: HTMLElement
	}

	editorElements = {
		color: HTMLElement,
		textSize: HTMLElement,
		imageSize: HTMLElement,
		download: HTMLElement
	};
	
	menuWindows = {
		download: DownloadWindow,
		textSize: TextSizeWindow,
		textColor: ColorWindow
	}
	
	callbacks: MenuCallbacks
	
	constructor(callbacks: MenuCallbacks) {
		this.callbacks = callbacks;
	}

	onStart = () => {
		// initial state
		this.width = window.screen.width;
		this.height = window.screen.height;
		this.scale = window.devicePixelRatio;
		this.textSize = 24;
		this.textColor = colors.flat_ui_colors.silver;

		this.menuContainerElement = utils.getElement('menu-container');
		this.menuElement = utils.getElement('menu');
		this.menuWindowElement = utils.getElement('menu-window');
		this.menuTextColorButtonColorRectangleElement = utils.getElement('menu-button-text-color-rectangle-color');

		this.buttonElements = {
			color: utils.getElement('menu-button-text-color'),
			textSize: utils.getElement('menu-button-text-size'),
			imageSize: utils.getElement('menu-button-image-size'),
			download: utils.getElement('menu-button-download')
		};

		this.editorElements = {
			color: utils.getElement('menu-editor-color'),
			textSize: utils.getElement('menu-editor-text-size'),
			imageSize: utils.getElement('menu-editor-image-size'),
			download: utils.getElement('menu-editor-download')
		};

		const { buttonElements, editorElements } = this;

		const setClickHandler = (buttonElement, editorElement) =>
			buttonElement.addEventListener('click', () => this.onToggleMenuWindow(buttonElement, editorElement));

		setClickHandler(buttonElements.color, editorElements.color);
		setClickHandler(buttonElements.textSize, editorElements.textSize);
		setClickHandler(buttonElements.imageSize, editorElements.imageSize);
		setClickHandler(buttonElements.download, editorElements.download);
		
		const textSizeWindow = new TextSizeWindow(this._handleOnTextSizeChangeRequested);
		textSizeWindow.textSize = this.textSize;
		
		const textColorWindow = new ColorWindow(
			'text-color-window-color-buttons-container',
			this._handleOnTextColorChangeRequested
		);
		textColorWindow.color = this.textColor;
		this.menuTextColorButtonColorRectangleElement.style.backgroundColor = this.textColor;
		
		this.menuWindows = {
			download: new DownloadWindow(this.callbacks.onDownloadRequested),
			textSize: textSizeWindow,
			textColor: textColorWindow
		};
	}

	onShow = () => {
		this.menuContainerElement.style.display = 'flex';
	}

	onHide = () => {
		this.menuContainerElement.style.display = 'none';
	}
	
	_handleOnTextSizeChangeRequested = (newTextSize: Number) => {
		this.textSize = newTextSize;
		this.menuWindows.textSize.textSize = this.textSize;
		this.callbacks.onTextSizeChanged(this.textSize);
	}
	
	_handleOnTextColorChangeRequested = (newTextColor: String) => {
		this.textColor = newTextColor;
		this.menuWindows.textColor.color = newTextColor;
		this.menuTextColorButtonColorRectangleElement.style.backgroundColor = this.textColor;
		this.callbacks.onTextColorChanged(this.textColor);
	}

	onToggleMenuWindow = (buttonElement: Object, editorElement: Object) => {
		const isMenuOpen = this.menuElement.classList.contains('menu-active');
		const buttonWasActive = buttonElement.classList.contains('active-button');
		let shouldMenuOpen = !isMenuOpen;
		if (!buttonWasActive) {
			shouldMenuOpen = true;
		}

		utils.kvoIndexed(this.buttonElements).forEach(({ value }: { value: HTMLElement }) =>
			value.classList.remove('active-button')
		);

		utils.kvoIndexed(this.editorElements).forEach(({ value }: { value: HTMLElement }) =>
			value.style.display = 'none'
		);

		if (shouldMenuOpen) {
			this.menuElement.classList.remove('menu');
			this.menuElement.classList.add('menu-active');
			this.menuWindowElement.style.display = 'flex';

			buttonElement.classList.add('active-button');
			editorElement.style.display = 'flex';
		}
		else {
			this.menuElement.classList.remove('menu-active');
			this.menuElement.classList.add('menu');
			this.menuWindowElement.style.display = 'none';
		}
	}
}
