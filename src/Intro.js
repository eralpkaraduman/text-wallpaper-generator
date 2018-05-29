import {getElement} from './utils';

export default class Intro {
	
	static INTRO_COMPLETED_EVENT = 'INTRO_COMPLETED';
	
	introElement = null;
	startButtonElement = null;
	
	onStart = () => {
		console.log('onStart');
		this.introElement = getElement('intro');
		
		this.startButtonElement = getElement('intro-start-button');
		this.startButtonElement.addEventListener('click', this.handleOnStartButtonClicked);
	}
	
	handleOnStartButtonClicked = () => {
		window.dispatchEvent(new Event(Intro.INTRO_COMPLETED_EVENT));
	}
	
	onHide = () => {
		this.introElement.style.display = 'none';
	}
}
