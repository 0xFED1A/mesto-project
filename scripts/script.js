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
const profilePopupForm =
  profilePopupElement.querySelector(".popup__form");
const profilePopupUserName =
  profilePopupElement.querySelector(".form__input_user_name");
const profilePopupUserInfo =
  profilePopupElement.querySelector(".form__input_user_description");
const profilePopupSaveButton =
  profilePopupElement.querySelector(".popup__button-save");

// place popup
const placePopupElement = page.querySelector("#popup_img_add");
const placePopupOpen =
  page.querySelector(".profile__button-add");
const placePopupClose =
  placePopupElement.querySelector(".popup__button-close");
const placePopupForm =
  placePopupElement.querySelector(".popup__form");
const placePopupPlaceName =
  placePopupElement.querySelector(".form__input_place_name");
const placePopupPlaceLink = 
  placePopupElement.querySelectorAll(".form__input_place_link");
const placePopupUploadButton =
  placePopupElement.querySelector(".popup__button-save");

// preview popup
const previewPopupElement = page.querySelector("#popup_img_preview");
const previewPopupClose =
  previewPopupElement.querySelector(".popup__button-close");
const previewPopupImage =
  previewPopupElement.querySelector(".popup__image");
const previewPopupCaption =
  previewPopupElement.querySelector(".popup__item-info");

// profile popup listeners
profilePopupOpen.addEventListener("click", () => {
  initializePopupInput(profilePopupUserName, userName.textContent);
  initializePopupInput(profilePopupUserInfo, userInfo.textContent);
  openPopup(profilePopupElement);
  return;
});
profilePopupClose.addEventListener("click", () => {
  closePopup(profilePopupElement);
  return;
});
profilePopupForm.addEventListener("submit", event => {
  event.preventDefault();
  return;
});
profilePopupSaveButton.addEventListener("click", event => {
  event.preventDefault();
  savePopupInput(profilePopupUserName, userName);
  savePopupInput(profilePopupUserInfo, userInfo);
  closePopup(profilePopupElement);
  return;
});

// place popup listeners
placePopupOpen.addEventListener("click", () => {
  initializePopupInput(placePopupPlaceName, "");
  initializePopupInput(placePopupPlaceLink, "");
  openPopup(placePopupElement);
  return;
});
placePopupClose.addEventListener("click", () => {
  closePopup(placePopupElement);
  return;
});
placePopupForm.addEventListener("submit", event => {
  event.preventDefault();
  return;
});
placePopupUploadButton.addEventListener("click", event => {
  event.preventDefault();
  const newCard = 
    createCard(placePopupPlaceName.value, placePopupPlaceLink.value);
  renderCard(newCard, gallery);
  closePopup(placePopupElement);
  return;
});

// preview popup listeners
previewPopupClose.addEventListener("click", () => {
  closePopup(previewPopupElement);
});

// popup functions
/**
 * function adds class "popup_opened" to popup element
 * @param {object} popupElement - element to attach class
 */
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  return;
}

/**
 * function removes class "popup_opened" from popup element
 * @param {object} popupElement - element to remove class
 */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  return;
}

/**
 * function intializes value of passed input element with passed string
 * @param {object} popupInput - input element to intialize
 * @param {string} inputValue - string wich will be used for intialization
 */
function initializePopupInput(popupInput, inputValue) {
  popupInput.value = inputValue;
  return;
}

/**
 * function saves input values in passed elements .textContent property
 * @param {object} popupInput - input element to save value from
 * @param {object} placeToSave - element to save to
 */
function savePopupInput(popupInput, placeToSave) {
  placeToSave.textContent = popupInput.value;
  return;
}

// place functions
function createCard(placeName, placeLink) {

}

function renderCard(placeElement) {

}

// main logic
popups.forEach(popup => initializePopup(popup));

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
