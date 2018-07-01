// @flow
import * as utils from '../utils';
import colors from '../colors';
import DownloadWindow from './DownloadWindow';
import TextSizeWindow from './TextSizeWindow';
import ColorWindow from './ColorWindow';

type MenuCallbacks = {
	onDownloadRequested: () => void,
	onTextSizeChanged: (Number) => void,
	onTextColorChanged: (String) => void,
	onBackgroundColorChanged: (String) => void,
	onImageSizeChanged: (width: Number, height: Number) => void
};

type ButtonElements = {
	textColor: HTMLElement,
	backgroundColor: HTMLElement,
	textSize: HTMLElement,
	imageSize: HTMLElement,
	download: HTMLElement
}

type EditorElements = {
	textColor: HTMLElement,
	backgroundColor: HTMLElement,
	textSize: HTMLElement,
	imageSize: HTMLElement,
	download: HTMLElement
}

export default class Menu {
	menuElement: HTMLElement;
	menuContainerElement: HTMLElement;
	menuWindowElement: HTMLElement;
	menuTextColorButtonColorRectangleElement: HTMLElement;
	menuBackgroundColorButtonColorRectangleElement: HTMLElement;

	textSize: Number;
	width: Number;
	height: Number;
	scale: Number;
	backgroundColor: string;
	textColor: string;

	buttonElements: ButtonElements;
	editorElements: EditorElements;
	
	scale: Number;
	textColor: string;

	buttonElements: ButtonElements;
	editorElements: EditorElements;

	menuWindows = {
		download: DownloadWindow,
		textSize: TextSizeWindow,
		textColor: ColorWindow,
		backgroundColor: ColorWindow
	}

	callbacks: MenuCallbacks

	constructor(callbacks: MenuCallbacks) {
		this.buttonElements = {};
		this.editorElements = {};
		this.callbacks = callbacks;
	}

	onStart = () => {
		// initial state
		this.width = window.screen.width;
		this.height = window.screen.height;
		this.scale = window.devicePixelRatio;
		this.textSize = 24;
		this.textColor = colors.flat_ui_colors.silver;
		this.backgroundColor = colors.flat_ui_colors.wet_asphalt;

		this.menuContainerElement = utils.getElement('menu-container');
		this.menuElement = utils.getElement('menu');
		this.menuWindowElement = utils.getElement('menu-window');
		this.menuTextColorButtonColorRectangleElement = utils.getElement('menu-button-text-color-rectangle-color');
		this.menuBackgroundColorButtonColorRectangleElement = utils.getElement('menu-button-background-color-rectangle-color');

		const { buttonElements, editorElements } = this;
		buttonElements.textColor = utils.getElement('menu-button-text-color');
		buttonElements.backgroundColor = utils.getElement('menu-button-background-color');
		buttonElements.textSize = utils.getElement('menu-button-text-size');
		buttonElements.imageSize = utils.getElement('menu-button-image-size');
		buttonElements.download = utils.getElement('menu-button-download');

		editorElements.textColor = utils.getElement('menu-editor-text-color');
		editorElements.backgroundColor = utils.getElement('menu-editor-background-color');
		editorElements.textSize = utils.getElement('menu-editor-text-size');
		editorElements.imageSize = utils.getElement('menu-editor-image-size');
		editorElements.download = utils.getElement('menu-editor-download');

		const setClickHandler = (buttonElement, editorElement) =>
			buttonElement.addEventListener('click', () => this.onToggleMenuWindow(buttonElement, editorElement));

		setClickHandler(buttonElements.textColor, editorElements.textColor);
		setClickHandler(buttonElements.backgroundColor, editorElements.backgroundColor);
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
		
		const backgroundColorWindow = new ColorWindow(
			'background-color-window-color-buttons-container',
			this._handleOnBackgroundColorChangeRequested
		);
		backgroundColorWindow.color = this.backgroundColor;
		this.menuBackgroundColorButtonColorRectangleElement.style.backgroundColor = this.backgroundColor;

		this.menuWindows = {
			download: new DownloadWindow(this.callbacks.onDownloadRequested),
			textSize: textSizeWindow,
			textColor: textColorWindow,
			backgroundColor: backgroundColorWindow
		};
	}

	onShow = () => {
		this.menuContainerElement.style.display = 'flex';
	}

	onHide = () => {
		this.menuContainerElement.style.display = 'none';
	}

	closeAllWindows = () => {
		utils.kvoIndexed(this.buttonElements).forEach(({ value }: { value: HTMLElement }) =>
			value.classList.remove('active-button')
		);

		utils.kvoIndexed(this.editorElements).forEach(({ value }: { value: HTMLElement }) =>
			value.style.display = 'none'
		);
	}

	_handleOnTextSizeChangeRequested = (newTextSize: Number) => {
		this.textSize = newTextSize;
		this.menuWindows.textSize.textSize = this.textSize;
		this.callbacks.onTextSizeChanged(this.textSize);
	}

	_handleOnTextColorChangeRequested = (newTextColor: String) => {
		this.textColor = newTextColor;
		this.menuWindows.textColor.color = this.textColor;
		this.menuTextColorButtonColorRectangleElement.style.backgroundColor = this.textColor;
		this.callbacks.onTextColorChanged(this.textColor);
		this.onToggleMenuWindow(
			this.buttonElements.textColor,
			this.editorElements.textColor,
			false
		);
	}
	
	_handleOnBackgroundColorChangeRequested = (newBackgrundColor: String) => {
		this.backgroundColor = newBackgrundColor;
		this.menuWindows.backgroundColor.color = this.backgroundColor;
		this.menuBackgroundColorButtonColorRectangleElement.style.backgroundColor = this.backgroundColor;
		this.callbacks.onBackgroundColorChanged(this.backgroundColor);
		this.onToggleMenuWindow(
			this.buttonElements.backgroundColor,
			this.editorElements.backgroundColor,
			false
		);
	}

	onToggleMenuWindow = (buttonElement: Object, editorElement: Object, shouldMenuOpen: Boolean = null) => {
		if (shouldMenuOpen == null) {
			const isMenuOpen = this.menuElement.classList.contains('menu-active');
			const buttonWasActive = buttonElement.classList.contains('active-button');
			shouldMenuOpen = !isMenuOpen;
			if (!buttonWasActive) {
				shouldMenuOpen = true;
			}
		}

		this.closeAllWindows();

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
