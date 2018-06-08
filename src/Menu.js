// @flow
import * as utils from './utils';
import DownloadWindow from './menu/DownloadWindow';

type MenuCallbacks = {
	onDownloadRequested: () => void,
};

export default class Menu {
	menuElement: HTMLElement;
	menuContainerElement: HTMLElement;
	menuWindowElement: HTMLElement;
	width: Number;
	height: Number;
	scale: Number;
	color: Number;

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
		download: DownloadWindow
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

		this.menuContainerElement = utils.getElement('menu-container');
		this.menuElement = utils.getElement('menu');
		this.menuWindowElement = utils.getElement('menu-window');

		this.buttonElements = {
			color: utils.getElement('menu-button-color'),
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
		
		this.menuWindows = {
			download: new DownloadWindow(this.callbacks.onDownloadRequested)
		};
	}

	onShow = () => {
		this.menuContainerElement.style.display = 'flex';
	}

	onHide = () => {
		this.menuContainerElement.style.display = 'none';
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
