export default class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
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
_checkInputValidity = ( inputElement) => {
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
_hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}; 
_toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
        buttonElement.classList.add(this._validationConfig.inactiveButtonClass);
        buttonElement.classList.remove(this._validationConfig.activeButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(this._validationConfig.inactiveButtonClass);
        buttonElement.classList.add(this._validationConfig.activeButtonClass);
        buttonElement.disabled = false;
    }
}; 

_setEventListeners = ( ) => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
    
    this._toggleButtonState(inputList, buttonElement);
    let validator = this;
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            validator._checkInputValidity(inputElement); 
            validator._toggleButtonState(inputList, buttonElement);
        });
    });
};

}
