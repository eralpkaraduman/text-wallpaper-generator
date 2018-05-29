export const getElement = (id) => window.document.getElementById(id);

export const kvoIndexed = (anObject) => Object.keys(anObject).map((key, index) => ({
	key, value: anObject[key], index
}));
