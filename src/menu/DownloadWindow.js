// @flow
export type GenerateCanvasCallback = () => Promise<HTMLCanvasElement>;
export type GenerateFileNameCallback = () => string;

import 'blob.js';
import * as utils from '../utils';
import MenuWindow from './MenuWindow';
import { track } from '../analytics';
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
    this._anchorElement.addEventListener('click', this.onDownloadClick);
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

  _shareFile: ?File;

  async updateImage() {
    const canvas = await this._onGenerateImage();
    const fileName = this._onGenerateFileName();
    const dataUrl = canvas.toDataURL('image/jpeg');

    // Native share path (iOS "Save Image" → Photos): prepare the image as a
    // File; used from the click handler when the browser supports it.
    this._shareFile = null;
    if (typeof File === 'function' && canvas.toBlob) {
      canvas.toBlob((blob) => {
        if (blob) {
          this._shareFile = new File([blob], fileName, { type: 'image/jpeg' });
        }
      }, 'image/jpeg');
    }

    // Set aspect ratio based on canvas dimensions
    const aspectRatio = canvas.width / canvas.height;
    this._imageElement.style.aspectRatio = aspectRatio.toString();

    this._imageElement.src = dataUrl;
    this._imageElement.alt = fileName;
    this._anchorElement.href = dataUrl;
    this._anchorElement.setAttribute('download', fileName);

    // Track wallpaper generation
    const textElement = utils.getElement('wallpaper-text-input');
    const text = textElement.innerText || '';
    track('generate_wallpaper', {
      width: canvas.width,
      height: canvas.height,
      text: text,
      textLength: text.length,
    });
  }

  clearImage() {
    this._imageElement.src = '';
    this._imageElement.alt = '';
    this._imageElement.style.opacity = '0.0';
    this._anchorElement.classList.remove('ready');
    this._activityIndicatorElement.style.display = 'block';
  }

  onDownloadClick = (event: Event) => {
    track('download_wallpaper');
    // On phones, prefer the native share sheet — it offers "Save Image"
    // straight into the photo library on iOS/Android. Desktop keeps the
    // instant file download (a share dialog would be a detour there), and
    // so does any browser without file sharing or a secure context.
    const nav: any = navigator;
    const file = this._shareFile;
    if (
      utils.isMobile() &&
      file &&
      nav.canShare &&
      nav.canShare({ files: [file] }) &&
      nav.share
    ) {
      event.preventDefault();
      nav.share({ files: [file] }).catch(() => {
        // User dismissed the sheet or share failed — nothing to do; the
        // download anchor remains available on the next tap.
      });
    }
  };

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
