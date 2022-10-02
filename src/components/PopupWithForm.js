import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
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