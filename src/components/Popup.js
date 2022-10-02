export default class Popup {
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
