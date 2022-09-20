class Popup {
  constructor(elementSelector, closeButtonSelector) {
    // cannot instantiate abstract popup
    if (this.constructor.name == "Popup") {
      return;
    }
    this._element = document.querySelector(elementSelector);
    this._closeButton = this._element.querySelector(closeButtonSelector);
    this._cssClassOpened = cssClassOpened;
  }

  openPopup() {
    this._element.classList.add(".popup_opened");
    document.addEventListener("keydown", this.closeOnEscape);
  }

  closePopup() {
    this._element.classList.remove(".popup_opened");
    document.removeEventListener("keydown", this.closeOnEscape);
  }

  closePopupOnEscape(evt) {
    if (evt.key && evt.key === "Escape") {
      this.closePopup();
    }
  }
  const closeByOverlayClick = (evt) => {
    if (evt.currentTarget === evt.target) {
        closePopup(evt.currentTarget);
    };
}
  closePopupOnClick()
}

class PopupWithImage extends Popup {
  constructor({
    elementSelector,
    closeButtonSelector,
    imageSelector,
    captionSelector
  }) {
    super(elementSelector, closeButtonSelector);
    this._image = this._element.querySelector(imageSelector);
    this._caption = this._element.querySelector(captionSelector);
  }
}

class PopupWithForm extends Popup {
  constructor({
    elementSelector, 
    closeButtonSelector,
    openButtonSelector,
    formSelector, 
    formInputSelector,             // may wary
  }) {
    super(elementSelector, closeButtonSelector);
    this._openButton = this._element.querySelector(openButtonSelector);
    this._form = this._element.querySelector(formSelector);
    this._formInputs = Array.from(this._element.querySelectorAll(formInputSelector));
  }

  _initializePopupInput(popupInput, inputValue) {
    popupInput.value = inputValue;
    popupInput.dispatchEvent(new Event("input", {bubbles: true}));
  }

  initializePopupInputs(config) {
    this._formInputs.forEach(input => {
      this._initializePopupInput(input, config[input.name]);
    })
  }
}