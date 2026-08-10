// @flow
import { getElement } from '../utils';
import { track } from '../analytics';
type OnCompleteCallback = () => void

export default class Intro {

	introElement: HTMLElement;
	startButtonElement: HTMLElement;
	onCompleteHandler: OnCompleteCallback;

	constructor(callbacks: { onComplete: OnCompleteCallback }) {
		this.onCompleteHandler = callbacks.onComplete;
	}

	onStart = () => {
		this.introElement = getElement('intro');
		this.startButtonElement = getElement('intro-start-button');
		this.startButtonElement.addEventListener('click', this.handleOnStartButtonClicked);
		this.startButtonElement.style.display = 'block';
		// The intro is visible on load; the editor's toolbar clearance
		// (wrapper padding-top) only applies once it hides.
		getElement('root').classList.add('intro-active');
	}

	handleOnStartButtonClicked = () => {
		track('start_app');
		this.onCompleteHandler();
	}

	onHide = () => {
		this.introElement.style.display = 'none';
		// Restores the wrapper's toolbar clearance for the editor.
		getElement('root').classList.remove('intro-active');
	}

	onShow = () => {
		this.introElement.style.display = 'flex';
		getElement('root').classList.add('intro-active');
	}
}
