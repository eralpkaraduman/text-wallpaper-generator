const defaultDebounceWait = 50;

export const getElement = (id) => window.document.getElementById(id);

export const kvoIndexed = (anObject) => Object.keys(anObject).map((key, index) => ({
	key, value: anObject[key], index
}));

export const callOnNextFrame = callback => () => window.setTimeout(callback, 0.2);

export function debounce(func, wait = defaultDebounceWait, immediate = false) {
	// based on: https://davidwalsh.name/javascript-debounce-function
	var timeout;
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

export function getStyle(el: HTMLElement, styleProp: String) {
	// based on: https://stackoverflow.com/a/4392968/2172057
	const x = el;
	let y = undefined;
	if (x.currentStyle)
		y = x.currentStyle[styleProp];
	else if (window.getComputedStyle)
		y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
	return y;
}

export function insertStyle(elementId: String, pseudoClass: String, kvo: {String: String}) {
	const stylesheet = document.styleSheets[0];
	const stylesString = `{${kvoIndexed(kvo).map(({key, value}) => `${key}: ${value}`).join('; ')}}`;
	const getlastIndex = () => stylesheet.cssRules.length;
	['', '-moz-', '-webkit-'].forEach(vendorPrefix => {
		try {stylesheet.insertRule(`#${elementId}::${vendorPrefix}${pseudoClass} ${stylesString}`, getlastIndex());} catch(e) {} // eslint-disable-line
	});
}
