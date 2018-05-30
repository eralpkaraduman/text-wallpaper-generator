import {getElement} from './utils';

export default class Intro {
	
	introElement = null;
	startButtonElement = null;
	onCompleteHandler = null;
	
	
	
	
	constructor({onComplete}) {
		this.onCompleteHandler = onComplete;
		
	}
	
	onStart = () => {
		this.introElement = getElement('intro');
		
		this.startButtonElement = getElement('intro-start-button');
		this.startButtonElement.addEventListener('click', this.handleOnStartButtonClicked);
	}
	
	handleOnStartButtonClicked = () => {
		this.onCompleteHandler();
	}
	
	onHide = () => {
		this.introElement.style.display = 'none';
	}
}
