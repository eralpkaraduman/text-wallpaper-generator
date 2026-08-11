// @flow
import { getElement, callOnNextFrame } from '../utils';
import autosize from 'autosize';

type OnFocusedCallback = () => void;
type TextEditorCallbacks = { onFocused: OnFocusedCallback };

export default class TextEditor {
  textInputElement: HTMLTextAreaElement;
  textInputContainerElement: HTMLElement;
  wallpaperElement: HTMLElement;

  _onFocusedCallback: OnFocusedCallback;

  _textSize: number;
  set textSize(value: number): void {
    this._textSize = value;
    this._updateTextSize();
  }

  _textColor: string;
  set textColor(value: string): void {
    this._textColor = value;
    this._updateTextColor();
  }

  set text(value: string): void {
    // The contenteditable renders without `white-space: pre-wrap`, so a plain
    // textContent assignment would collapse '\n' into spaces. Build the same
    // structure the editor produces while typing — text nodes separated by
    // <br> — so multi-line values render as real line breaks and innerText
    // (used by the canvas export) still reads them back as '\n'. Only DOM
    // text nodes are created, so the value can never be parsed as HTML.
    this.textInputElement.textContent = '';
    value.split('\n').forEach((line, index) => {
      if (index > 0) {
        this.textInputElement.appendChild(document.createElement('br'));
      }
      if (line.length > 0) {
        this.textInputElement.appendChild(document.createTextNode(line));
      }
    });
  }

  get text(): string {
    return this.textInputElement.textContent;
  }

  constructor(callbacks: TextEditorCallbacks) {
    this._onFocusedCallback = callbacks.onFocused;
  }

  onStart = () => {
    this.textInputElement = ((getElement(
      'wallpaper-text-input',
    ): any): HTMLTextAreaElement);
    this.wallpaperElement = getElement('wallpaper');
    this.textInputElement.addEventListener(
      'focus',
      this.handleOnTextInputFocus,
      false,
    );
    this.textInputElement.addEventListener(
      'click',
      () => this.textInputElement.focus(),
      false,
    );
    // Clear whitespace-only content on blur so the :empty placeholder shows
    this.textInputElement.addEventListener(
      'blur',
      () => {
        if (!this.text.trim()) {
          this.textInputElement.textContent = '';
        }
      },
      false,
    );
    autosize(this.textInputElement);
  };

  handleOnTextInputFocus = () => {
    this._onFocusedCallback();
  };

  onShow = () => {
    this.wallpaperElement.classList.remove('hidden');
    this.textInputElement.style.display = 'inline-block';
  };

  onHide = () => {
    this.wallpaperElement.classList.add('hidden');
    this.textInputElement.style.display = 'none';
  };

  focus = () => {
    const { textInputElement } = this;
    textInputElement.focus();
    callOnNextFrame(() => {
      textInputElement.scrollIntoView({
        behavior: 'smooth',
        // $FlowFixMe
        block: 'center',
        inline: 'center',
      });
    });
  };

  _updateTextColor = () => {
    this.textInputElement.style.color = this._textColor;
    // $FlowFixMe
    this.textInputElement.style.caretColor = this._textColor;
  };

  _updateTextSize = () => {
    const fontSizeStyle = `${this._textSize.toString()}pt`;
    this.textInputElement.style.fontSize = fontSizeStyle;
    this.textInputElement.dispatchEvent(new Event('input')); // Hack, forces autosize to trigger update
  };
}
