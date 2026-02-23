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
			video.muted = true;
			video.setAttribute('muted', '');
			video.playsInline = true;

			const source = video.querySelector('source');
			if (source && source.src) {
				fetch(source.src)
					.then(res => res.blob())
					.then(blob => {
						video.src = URL.createObjectURL(blob);
						video.load();
						video.play().catch(() => {});
					})
					.catch(() => {
						video.play().catch(() => {});
					});
			} else {
				video.play().catch(() => {});
			}
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
