// @flow
const defaultDebounceWait = 50;

export function getElement(id: string): HTMLElement {
	return window.document.getElementById(id);
}

export function kvoIndexed(anObject: Object): Array<{key: string, value: any, index: number}> {
	return Object.keys(anObject).map((key, index) => ({
		key, value: anObject[key], index
	}));
}

export function objForEach(anObject: Object, func: (value: any) => void) {
	Object.keys(anObject).forEach(key => func(anObject[key]));
}

export const callOnNextFrame = (callback: Function) => () => window.setTimeout(callback, 0.2);

export function debounce(func: Function, wait: number = defaultDebounceWait, immediate: boolean = false) {
	// based on: https://davidwalsh.name/javascript-debounce-function
	let timeout: any;
	return function () {
		var context = this, args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

export function getStyle(el: HTMLElement, styleProp: string) {
	// based on: https://stackoverflow.com/a/4392968/2172057
	const x: HTMLElement = el;
	let y = undefined;
	// if (x.currentStyle)
	// 	y = x.currentStyle[styleProp];
	// else if (window.getComputedStyle)
	y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
	return y;
}

export function insertStyle(elementId: string, pseudoClass: string, kvo: Object) {
	const stylesheet: any = document.styleSheets[0];
	const stylesString = `{${kvoIndexed(kvo).map(({ key, value }) => `${key}: ${value}`).join('; ')}}`;
	const getlastIndex = () => stylesheet.cssRules.length;
	['', '-moz-', '-webkit-'].forEach(vendorPrefix => {
		try { stylesheet.insertRule(`#${elementId}::${vendorPrefix}${pseudoClass} ${stylesString}`, getlastIndex()); } catch (e) { } // eslint-disable-line
	});
}
