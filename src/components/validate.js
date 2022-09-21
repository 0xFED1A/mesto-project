const showInputError = (formElement,inputElement, errorMessage, enable) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`); 
    inputElement.classList.add(enable.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(enable.errorClass);
};
  const hideInputError = (formElement, inputElement, enable) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`); 
    inputElement.classList.remove(enable.inputErrorClass);
    errorElement.classList.remove(enable.errorClass);
    errorElement.textContent = '';
};
const checkInputValidity = (formElement, inputElement, enable) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, enable);
    } else {
        hideInputError(formElement, inputElement, enable);
    }
};
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}; 
export const toggleButtonState = (inputList, buttonElement, enable) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(enable.inactiveButtonClass);
        buttonElement.classList.remove(enable.activeButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(enable.inactiveButtonClass);
        buttonElement.classList.add(enable.activeButtonClass);
        buttonElement.disabled = false;
    }
}; 
export const disableButton = (enable, buttonEnable) => {
    buttonEnable.classList.add(enable.inactiveButtonClass);
    buttonEnable.classList.remove(enable.activeButtonClass);
}
const setEventListeners = (formElement, enable) => {
    const inputList = Array.from(formElement.querySelectorAll(enable.inputSelector));
    const buttonElement = formElement.querySelector(enable.submitButtonSelector);
    
    toggleButtonState(inputList, buttonElement, enable);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
           checkInputValidity(formElement, inputElement, enable); 
           toggleButtonState(inputList, buttonElement, enable);
        });
    });
};
export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(validationConfig.formPopup));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, validationConfig);
        });
    });
};