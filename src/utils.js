const defaultDebounceWait = 50;

export const getElement = (id) => window.document.getElementById(id);

export const kvoIndexed = (anObject) => Object.keys(anObject).map((key, index) => ({
	key, value: anObject[key], index
}));

export const callOnNextFrame = callback => () => window.setTimeout(callback, 0.2);

export function debounce(func, wait = defaultDebounceWait, immediate = false) {
	// based on: https://davidwalsh.name/javascript-debounce-function
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
