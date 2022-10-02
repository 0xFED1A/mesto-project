export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
        this._buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    }
    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(this._formElement.querySelectorAll(this._validationConfig.formPopup));
        fieldsetList.forEach((fieldSet) => {
            this._setEventListeners(fieldSet);
        });
    };


_showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`); 
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationConfig.errorClass);
};
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`); 
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    errorElement.classList.remove(this._validationConfig.errorClass);
    errorElement.textContent = '';
};
_checkInputValidity = (inputElement) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        this._showInputError( inputElement, inputElement.validationMessage);
    } else {
        this._hideInputError(inputElement);
    }
};
_hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}; 
toggleButtonState = () => {
    if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        this._buttonElement.classList.remove(this._validationConfig.activeButtonClass);
        this._buttonElement.disabled = true;
    } else {
        this._buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        this._buttonElement.classList.add(this._validationConfig.activeButtonClass);
        this._buttonElement.disabled = false;
    }
}; 

_setEventListeners = () => {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement); 
            this.toggleButtonState();
        });
    });
};

}
