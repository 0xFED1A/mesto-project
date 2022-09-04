"use strict";

// globals
const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const userName = profile.querySelector(".profile__user-name");
const userInfo = profile.querySelector(".profile__user-description");
const gallery = page.querySelector(".gallery__items");

// profile popup
const profilePopupElement = page.querySelector("#popup_profile_edit");
const profilePopupOpen = 
  page.querySelector(".profile__button-edit");
const profilePopupClose =
  profilePopupElement.querySelector(".popup__button-close");
const profilePopupForm = document.forms.user_info;
const profilePopupUserName = document.forms.user_info.user_name;
const profilePopupUserInfo = document.forms.user_info.user_description;
const profilePopupSaveButton = document.forms.user_info.user_submit;

// place popup
const placePopupElement = page.querySelector("#popup_img_add");
const placePopupOpen =
  page.querySelector(".profile__button-add");
const placePopupClose =
  placePopupElement.querySelector(".popup__button-close");
const placePopupForm = document.forms.place_info;
const placePopupPlaceName = document.forms.place_info.place_name;
const placePopupPlaceLink = document.forms.place_info.place_link;
const placePopupUploadButton = document.forms.place_info.place_submit;

// preview popup
const previewPopupElement = page.querySelector("#popup_img_preview");
const previewPopupClose =
  previewPopupElement.querySelector(".popup__button-close");
const previewPopupImage =
  previewPopupElement.querySelector(".popup__image");
const previewPopupCaption =
  previewPopupElement.querySelector(".popup__item-info");

// data for intial cards
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// popup functions
/**
 * function adds class "popup_opened" to popup element
 * @param {object} popupElement - element to attach class
 */
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscape);
}

/**
 * function removes class "popup_opened" from popup element
 * @param {object} popupElement - element to remove class
 */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscape);
}

/**
 * function initializes value of passed input element with passed string
 * @param {object} popupInput - input element to initialize
 * @param {string} inputValue - string which will be used for initialization
 */
function initializePopupInput(popupInput, inputValue) {
  popupInput.value = inputValue;
}

/**
 * function initializes content of preview popup image with passed args
 * @param {object} popupImage - popup image element for initialization
 * @param {string} src - string which will be used to initialize src attribute
 * @param {string} alt - string which will be used to initialize alt attribute
 */
function initializePopupImage(popupImage, src, alt) {
  popupImage.src = src;
  popupImage.alt = alt;
}

/**
 * function initializes text content of preview popup caption with passed arg
 * @param {object} popupCaption - popup cation element for intialization
  *@param {string} text - string which will be displayed in caption
  */
function initializePopupCaption(popupCaption, text) {
  popupCaption.textContent = text;
}

/**
 * function saves input values in passed elements .textContent property
 * @param {object} popupInput - input element to save value from
 * @param {object} placeToSave - element to save to
 */
function savePopupInput(popupInput, placeToSave) {
  placeToSave.textContent = popupInput.value;
}

// card functions
/**
 * function creates new card. It generates card element from templaete and
 * itializes it children elements values with passed args
 * @param {object} cardData - object wich contains data for card creation
 * @returns {object} - created and initialized card element
 */
function createCard(cardData) {
  const cardTemplate = gallery.querySelector("#gallery_template").content;
  const newCard = cardTemplate.querySelector(".gallery__item").cloneNode(true);

  const newCardImage = newCard.querySelector(".gallery__image");
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;
  newCardImage.addEventListener("click", () => {
    initializePopupImage(previewPopupImage, cardData.link, cardData.name);
    initializePopupCaption(previewPopupCaption, cardData.name);
    openPopup(previewPopupElement);
  });

  const newCardCaption = newCard.querySelector(".gallery__item-name");
  newCardCaption.textContent = cardData.name;

  const newCardLikeButton = newCard.querySelector(".gallery__button-like");
  newCardLikeButton.addEventListener("click", () => {
    newCardLikeButton.classList.toggle("gallery__button-like_active");
  });

  const newCardRemoveButton = newCard.querySelector(".gallery__button-delete");
  newCardRemoveButton.addEventListener("click", () => {
    newCard.remove();
  });
  return newCard;
}

/**
 * function prepends card to card container element 
 * @param {object} card - card to add to container
 * @param {object} cardContainer - container for cards
 */
function renderCard(card, cardContainer) {
  cardContainer.prepend(card);
}

//validation functions

function getErrorSpan(form, input) {
  return form.querySelector(`.${input.name}-error`);
}

function showInputError(form, input, errorMessage, inputClass, errorClass) {
  const errorSpan = getErrorSpan(form, input);
  input.classList.add(inputClass);
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add(errorClass);
}

function hideInputError(form, input, inputClass, errorClass) {
  const errorSpan = getErrorSpan(form, input);
  input.classList.remove(inputClass);
  errorSpan.classList.remove(errorClass);
  errorSpan.textContent = "&nbsp;";
}

function hasInvalidInput(inputs) {
  return inputs.some(input => !input.validity.valid);
}

function isValid(form, input, inputClass, errorClass) {
  if (!input.validity.valid) {
    input.validity.patternMismatch ?
      input.setCustomValidity(input.dataset.errorMessage) : input.setCustomValidity("");
    showInputError(form, input, input.validationMessage, inputClass, errorClass);
  } else {
    hideInputError(form, input, inputClass, errorClass);
  }
}

function toggleButtonState(inputs, button, buttonClass) {
  if (hasInvalidInput(inputs)) {
    button.classList.add(buttonClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(buttonClass);
    button.removeAttribute("disabled");
  }
}

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


// profile popup listeners
profilePopupOpen.addEventListener("click", () => {
  initializePopupInput(profilePopupUserName, userName.textContent);
  initializePopupInput(profilePopupUserInfo, userInfo.textContent);
  openPopup(profilePopupElement);
  enableValidation(userFormValidationConfig);
});
profilePopupClose.addEventListener("click", () => {
  closePopup(profilePopupElement);
});
profilePopupForm.addEventListener("submit", event => {
  event.preventDefault();
  savePopupInput(profilePopupUserName, userName);
  savePopupInput(profilePopupUserInfo, userInfo);
});
profilePopupSaveButton.addEventListener("click", () => {
  closePopup(profilePopupElement);
});

// place popup listeners
placePopupOpen.addEventListener("click", () => {
  initializePopupInput(placePopupPlaceName, "");
  initializePopupInput(placePopupPlaceLink, "");
  openPopup(placePopupElement);
  enableValidation(placeFormValidationConfig);
});
placePopupClose.addEventListener("click", () => {
  closePopup(placePopupElement);
});
placePopupForm.addEventListener("submit", event => {
  event.preventDefault();
  const newCard = 
    createCard({name: placePopupPlaceName.value, link: placePopupPlaceLink.value});
  renderCard(newCard, gallery);
});
placePopupUploadButton.addEventListener("click", () => {
  closePopup(placePopupElement);
});
function closeOnEscape(evt) {
  const currentOpenedPopup = document.querySelector(".popup_opened");
  if (evt.key.toLowerCase() === "escape" && currentOpenedPopup) {
    currentOpenedPopup.classList.remove("popup_opened");
  }
}

// preview popup listeners
previewPopupClose.addEventListener("click", () => {
  closePopup(previewPopupElement);
});

// main logic
initialCards.forEach(
  card => renderCard(createCard(card), gallery)
);
