// @flow
export type GenerateCanvasCallback = () => Promise<HTMLCanvasElement>;
export type GenerateFileNameCallback = () => string;

import 'blob.js';
import * as utils from '../utils';
import MenuWindow from './MenuWindow';
// import FileSaver from 'file-saver';

export default class DownloadWindow extends MenuWindow {
  _downloadButtonElement: HTMLAnchorElement;
  _imageElement: HTMLImageElement;
  _anchorElement: HTMLElement;
  _activityIndicatorElement: HTMLElement;
  _onGenerateImage: GenerateCanvasCallback;
  _onGenerateFileName: GenerateFileNameCallback;
  _mobileInfoTextElement: HTMLElement;
  _desktopInfoTextElement: HTMLElement;
  _progresInfoTextElement: HTMLElement;

  constructor(
    elementId: string,
    onGenerateImage: GenerateCanvasCallback,
    onGenerateFileName: GenerateFileNameCallback,
  ) {
    super(elementId);
    this._onGenerateImage = onGenerateImage;
    this._onGenerateFileName = onGenerateFileName;
    const imageElement = utils.getElement('download-window-image');
    this._imageElement = ((imageElement: any): HTMLImageElement);
    this._imageElement.addEventListener('load', this.onImageLoaded);
    this._anchorElement = utils.getElement('download-window-anchor');
    this._activityIndicatorElement = utils.getElement(
      'image-activity-indicator-container',
    );
    this._mobileInfoTextElement = utils.getElement(
      'download-window-info-text-mobile',
    );
    this._desktopInfoTextElement = utils.getElement(
      'download-window-info-text-desktop',
    );
    this._progresInfoTextElement = utils.getElement(
      'download-window-info-text-progress',
    );
  }

  async updateImage() {
    const canvas = await this._onGenerateImage();
    const fileName = this._onGenerateFileName();
    const dataUrl = canvas.toDataURL('image/jpeg');
    
    // Set aspect ratio based on canvas dimensions
    const aspectRatio = canvas.width / canvas.height;
    this._imageElement.style.aspectRatio = aspectRatio.toString();
    
    this._imageElement.src = dataUrl;
    this._imageElement.alt = fileName;
    this._anchorElement.href = dataUrl;
    this._anchorElement.setAttribute('download', fileName);
  }

  clearImage() {
    this._imageElement.src = '';
    this._imageElement.alt = '';
    this._imageElement.style.opacity = '0.0';
    this._anchorElement.classList.remove('ready');
    this._activityIndicatorElement.style.display = 'block';
  }

  onImageLoaded = () => {
    if (utils.isMobile()) {
      this._mobileInfoTextElement.style.display = 'block';
    } else {
      this._desktopInfoTextElement.style.display = 'block';
    }
    this._progresInfoTextElement.style.display = 'none';
    this._imageElement.style.opacity = '1.0';
    this._anchorElement.classList.add('ready');
    this._activityIndicatorElement.style.display = 'none';
  };

  onWindowWillOpen(): void {
    this._mobileInfoTextElement.style.display = 'none';
    this._desktopInfoTextElement.style.display = 'none';
    this._progresInfoTextElement.style.display = 'block';
    super.onWindowWillOpen();
    this.updateImage();
  }

  onWindowDidClose(): void {
    super.onWindowDidClose();
    this.clearImage();
  }
}
