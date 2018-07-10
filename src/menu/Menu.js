// @flow
import * as utils from '../utils';
import DownloadWindow from './DownloadWindow';
import TextSizeWindow from './TextSizeWindow';
import ImageSizeWindow from './ImageSizeWindow';
import ColorWindow from './ColorWindow';

type OnDownloadRequested = () => void;
type OnTextSizeChanged = (number) => void;
type OnTextColorChanged = (string) => void;
type OnBackgroundColorChanged = (string) => void;
type OnImageSizeChanged = (width: number, height: number) => void;
type MenuCallbacks = {
	onDownloadRequested: OnDownloadRequested,
	onTextSizeChanged: OnTextSizeChanged,
	onTextColorChanged: OnTextColorChanged,
	onBackgroundColorChanged: OnBackgroundColorChanged,
	onImageSizeChanged: OnImageSizeChanged
};
type Options = {
	textSize: number,
	width: number,
	height: number,
	scale: number,
	backgroundColor: string,
	textColor: string
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

	textSize: number;
	width: number;
	height: number;
	scale: number;
	backgroundColor: string;
	textColor: string;

	buttonElements: ButtonElements;
	editorElements: EditorElements;

	scale: number;
	textColor: string;

	menuWindows: {
		download: DownloadWindow,
		textSize: TextSizeWindow,
		imageSize: ImageSizeWindow,
		textColor: ColorWindow,
		backgroundColor: ColorWindow
	}

	callbacks: MenuCallbacks

	constructor(callbacks: MenuCallbacks) {
		this.callbacks = callbacks;
	}

	onStart(options: Options) {
		this.width = options.width;
		this.height = options.height;
		this.scale = options.scale;
		this.textSize = options.textSize;
		this.textColor = options.textColor;
		this.backgroundColor = options.backgroundColor;

		this.menuContainerElement = utils.getElement('menu-container');
		this.menuElement = utils.getElement('menu');
		this.menuWindowElement = utils.getElement('menu-window');
		this.menuTextColorButtonColorRectangleElement = utils.getElement('menu-button-text-color-rectangle-color');
		this.menuBackgroundColorButtonColorRectangleElement = utils.getElement('menu-button-background-color-rectangle-color');

		this.buttonElements = {
			textColor: utils.getElement('menu-button-text-color'),
			backgroundColor: utils.getElement('menu-button-background-color'),
			textSize: utils.getElement('menu-button-text-size'),
			imageSize: utils.getElement('menu-button-image-size'),
			download: utils.getElement('menu-button-download')
		};

		this.editorElements = {
			textColor: utils.getElement('menu-editor-text-color'),
			backgroundColor: utils.getElement('menu-editor-background-color'),
			textSize: utils.getElement('menu-editor-text-size'),
			imageSize: utils.getElement('menu-editor-image-size'),
			download: utils.getElement('menu-editor-download')
		};

		const setClickHandler = (buttonElement, editorElement) =>
			buttonElement.addEventListener('click', () => this.onToggleMenuWindow(buttonElement, editorElement));

		setClickHandler(this.buttonElements.textColor, this.editorElements.textColor);
		setClickHandler(this.buttonElements.backgroundColor, this.editorElements.backgroundColor);
		setClickHandler(this.buttonElements.textSize, this.editorElements.textSize);
		setClickHandler(this.buttonElements.imageSize, this.editorElements.imageSize);
		setClickHandler(this.buttonElements.download, this.editorElements.download);

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

		const imageSizeWindow = new ImageSizeWindow(
			this.width,
			this.height,
			this.scale,
			this._handleOnImageSizeChanged
		);

		this.menuWindows = {
			download: new DownloadWindow(this.callbacks.onDownloadRequested),
			textSize: textSizeWindow,
			imageSize: imageSizeWindow,
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

	_handleOnTextSizeChangeRequested = (newTextSize: number) => {
		this.textSize = newTextSize;
		this.menuWindows.textSize.textSize = this.textSize;
		this.callbacks.onTextSizeChanged(this.textSize);
	}

	_handleOnTextColorChangeRequested = (newTextColor: string) => {
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

	_handleOnImageSizeChanged = (/*width: number, height: number, scale: number*/) => {
		// console.log({ width, height, scale });
	}

	_handleOnBackgroundColorChangeRequested = (newBackgrundColor: string) => {
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

	onToggleMenuWindow = (buttonElement: Object, editorElement: Object, shouldMenuOpen: ?boolean = null) => {
		if (shouldMenuOpen == null) {
			const isMenuOpen: boolean = this.menuElement.classList.contains('menu-active');
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
