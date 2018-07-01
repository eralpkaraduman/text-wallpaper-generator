// @flow
import * as utils from '../utils';

type SizeChangeRequestHandler = (width: Number, height: Number) => void;

export default class ImageSizeWindow {
	_requestSizeChangeHandler: SizeChangeRequestHandler;

	constructor(onRequestSizeChange: SizeChangeRequestHandler) {
		this._requestSizeChangeHandler = onRequestSizeChange;
	}
}
