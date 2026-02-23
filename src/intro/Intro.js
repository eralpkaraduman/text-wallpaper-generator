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

		const video = document.getElementById('intro-gif-animation');
		if (video instanceof HTMLVideoElement) {
			video.play().catch(() => {});
		}
	}

	handleOnStartButtonClicked = () => {
		track('start_app');
		this.onCompleteHandler();
	}

	onHide = () => {
		this.introElement.style.display = 'none';
	}

	onShow = () => {
		this.introElement.style.display = 'flex';
	}
}
