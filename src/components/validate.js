//validate

/**
 * function selects error span below input field and
 * returns it to caller
 * @param {object} form - form where we looking for error span
  *@param {object} input - input field connected to error span
 * @returns {object} - found error span
 */
function getErrorSpan(form, input) {
  return form.querySelector(`.${input.name}-error`);
}

/**
 * function shows error text inside error span. It also applies
 * error style for input field
 * @param {object} form - form where we looking for error span
  *@param {object} input - input field connected to error span
  *@param {string} errorMessage - error message to display inside span
  *@param {string} inputClass - class which indicates error for input field
  *@param {string} errorClass - class which indicates error for span
 */
function showInputError(form, input, errorMessage, inputClass, errorClass) {
  const errorSpan = getErrorSpan(form, input);
  input.classList.add(inputClass);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(errorClass);
}

/**
 * function hides error text inside error span. It also removes
 * error style for input field
 * @param {object} form - form where we looking for error span
  *@param {object} input - input field connected to error span
  *@param {string} inputClass - class which indicates error for input field
  *@param {string} errorClass - class which indicates error for span
 */
function hideInputError(form, input, inputClass, errorClass) {
  const errorSpan = getErrorSpan(form, input);
  input.classList.remove(inputClass);
  errorSpan.classList.remove(errorClass);
  errorSpan.textContent = "";
}

/**
 * function which checks all form inputs for validity. If any input is
 * invalid, it returns true, otherwise it returns false
 * @param {array} inputs - array of form inputs to check
 * @returns {boolean} - true if any invalid, false if all valid
 */
function hasInvalidInput(inputs) {
  return inputs.some(input => !input.validity.valid);
}

/**
 * function checks if passed input valid. Depending on input validity,
 * it calls function, that changes styles for input field, and contents
 * of error span connected with particular input
 * @param {object} form - form, required to pass to other functions
  *@param {object} input - input to check validity
  *@param {string} inputClass - class which indicates error for input field
  *@param {string} errorClass - class which indicates error for span
 */
function isValid(form, input, inputClass, errorClass) {
  input.validity.patternMismatch ?
    input.setCustomValidity(input.dataset.errorMessage) : input.setCustomValidity("");
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, inputClass, errorClass);
  } else {
    hideInputError(form, input, inputClass, errorClass);
  }
}

/**
 * function toggles styles and "disabled" attribute of passed button. Button is
 * disabled if any input inside form is invalid. Otherwise, it is enabled
 * @param {array} inputs - array of form inputs to check
 * @param {object} button - button element to toggle
 * @param {string} buttonClass - class which indicates disabled button
 */
function toggleButtonState(inputs, button, buttonClass) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(buttonClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(buttonClass);
    button.removeAttribute("disabled");
  }
}

/**
 * function adds event listeners for popup elements which needs validation.
 * @param {object} elems - object which contains such fields as:
 *   form - popup form,
 *   inputs - array of popup input fields,
 *   button - submit button inside popup
 * @param {object} classes - object which contains such fields as:
 *   buttonClass - string with name of disabled button class,
 *   inputClass - string with name of invalid input class,
 *   errorClass - string with name of error span class
 */
function setEventListeners(elems, classes) {
  elems.form.addEventListener("submit", evt => evt.preventDefault());
  // reset span error on every popup open
  toggleButtonState(elems.inputs, elems.button, classes.buttonClass);
  elems.inputs.forEach(input => {
    // reset input error on every popup open
    isValid(elems.form, input, classes.inputClass, classes.errorClass);
    input.addEventListener('input', () => {
      isValid(elems.form, input, classes.inputClass, classes.errorClass);
      toggleButtonState(elems.inputs, elems.button, classes.buttonClass);
    });
  });
}

/**
 * main validation function. It takes validation configuration objects
 * and initiates validation
 * @param {object} config - configuration object
 */
function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  const elems = {
    form: form,
    inputs: Array.from(form.querySelectorAll(config.inputSelector)), 
    button: form.querySelector(config.submitButtonSelector)
  };
  const classes = {
    buttonClass: config.inactiveButtonClass,
    inputClass: config.inputErrorClass,
    errorClass: config.errorClass
  };
  setEventListeners(elems, classes);
}

//validation configs
const userFormValidationConfig = {
  formSelector: '#user_info',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error-msg_visible'
};
const placeFormValidationConfig = {
  formSelector: '#place_info',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error-msg_visible'
};

export {
  userFormValidationConfig,
  placeFormValidationConfig,
  enableValidation
};
