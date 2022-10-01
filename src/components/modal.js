class Popup {
  constructor(elementSelector) {
    // cannot instantiate abstract popup
    this._element = document.querySelector(elementSelector);
    this._closeButton = this._element.querySelector(".popup__button-close");
    this._escapeClose = this._closePopupOnEscape.bind(this);
  }

  openPopup() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._escapeClose);
  }

  closePopup() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._escapeClose);
  }

  _closePopupOnEscape(evt) {
    if (evt.key  === "Escape") {
      this.closePopup();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener('click', () => {
      this.closePopup();
    });

    this._element.addEventListener('mousedown', (event) => {
      if (event.target.classList.contains('popup')) {
        this.closePopup();
      }
    });
  }
}
export  class PopupWithImage extends Popup {
  constructor(elementSelector) 
  {
    super(elementSelector);
    this._image = this._element.querySelector(".popup__image");
    this._caption = this._element.querySelector(".popup__item-info");
  }
  openPopup(caption,link) {
    this._image.src = link;
    this._caption.textContent = caption;
    this._image.alt = caption;
    super.openPopup();
  }
}

export  class PopupWithForm extends Popup {
  constructor({elementSelector, submitForm}) {
    super(elementSelector);
    this._submitForm = submitForm;
    //this._openButton = this._element.querySelector(openButtonSelector);
    this._form = this._element.querySelector('.popup__form');
    this._formInputs = Array.from(this._element.querySelectorAll('.form__input'));
    this._setEventListeners();
  }
  _getInputValues() {
    
    this._inputValue = {};
    this._formInputs.forEach((input) => {
        this._inputValue[input.name] = input.value;
    });

    return this._inputValue;
}
  _setEventListeners() {
    super.setEventListeners();
  // this._form.addEventListener("submit",this._submitForm);

    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._submitForm(this._getInputValues());
    });
  }
  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
