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
  profilePopupElement.querySelector(".profile__button-edit");
const profilePopupClose =
  profilePopupElement.querySelector(".popup__button-close");
const profilePopupForm =
  profilePopupElement.querySelector(".popup__form");
const profilePopupUserName =
  profilePopupElement.querySelector(".form__input_user_name");
const profilePopupUserInfo =
  profilePopupElement.querySelector(".form__input_user_description");
const profPopupSaveButton =
  profilePopupElement.querySelector(".popup__button-save");

// place popup
const placePopupElement = page.querySelector("#popup_img_add");
const placePopupOpen =
  placePopupElement.querySelector(".profile__button-add");
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

// popup functions
function openPopup(popupElement) {
  
}

function closePopup(popupElement) {

}

function initializePopupInput(popupInput, inputValue) {

}

function savePopupInput(popupInput, placeToSave) {

}


// place functions
const places = [];

/**
 * function creates empty place object. This object is a template of place card.
 * Ugly hack with "static variable" included
 * @returns {object} - new place object
 */
function createPlace() {
  const placeElementTemplate = page.querySelector("#gallery_template").content;
  const newPlaceElement =
    placeElementTemplate.querySelector(".gallery__item").cloneNode(true);

  // trying to mimic function static variable
  createPlace.idCounter = typeof createPlace.idCounter === "undefined" ?
    0 : ++createPlace.idCounter;

  const newPlaceObject = {
    element: newPlaceElement,
    uniqueId: createPlace.idCounter,
    image: null,
    caption: null,
    like: null,
    remove: null
  };
  return newPlaceObject;
}

/** function runs full cycle of place intialization
 * @param {object} placeObject - object to initialize
 * @param {string} placeName - string which will be used to initialize image
 * and caption
 * @param {string} placeLink - string which will be used to initialize image
 * @returns {object} - fully initialized place object
 */
function initializePlace(placeObject, placeName, placeLink) {
  initializePlaceImage(placeObject, placeName, placeLink);
  initializePlaceCaption(placeObject, placeName, placeLink);
  initializePlaceLike(placeObject);
  initializePlaceRemove(placeObject);
  return placeObject;
}

/**
 * function intializes image of places object
 * @param {object} placeObject - object to initialize
 * @param {string} placeName - string which will be used to initialize image
 * alt attribute
 * @param {string} placeLink - string which will be used to initialize image
 * src attribute
 */
function initializePlaceImage(placeObject, placeName, placeLink) {
  placeObject.image = placeObject.element.querySelector(".gallery__image");
  placeObject.image.src = placeLink;
  placeObject.image.alt = placeName;
  placeObject.image.addEventListener("click", () => {
    initializePopupOpen(previewPopup, [placeName, placeLink]);
  });
  return;
}

/**
 * function intialize text of place object
 * @param {object} placeObject - object to initialize
 * @param {string} placeName - string which will be used to initialize caption
 * text
 */
function initializePlaceCaption(placeObject, placeName) {
  placeObject.caption =
    placeObject.element.querySelector(".gallery__item-name");
  placeObject.caption.textContent = placeName;
  return;
}

/**
 * function initializes like button in place object
 * @param {object} placeObject - object to initialize
 */
function initializePlaceLike(placeObject) {
  placeObject.like = placeObject.element.querySelector(".gallery__button-like");
  placeObject.like.addEventListener("click", () => {
    placeObject.like.classList.toggle("gallery__button-like_active");
  });
  return;
}

/**
 * function intitalizes remove buttoin in place object
 * @param {object} placeObject - object to initialize
 */
function initializePlaceRemove(placeObject) {
  placeObject.remove =
    placeObject.element.querySelector(".gallery__button-delete");
  placeObject.remove.addEventListener("click", () => {
    const placeToRemoveIndex =
      places.findIndex(place => place.uniqueId == placeObject.uniqueId);
    placeObject.element.remove();
    places.splice(placeToRemoveIndex, 1);
  });
  return;
}

/**
 * function inserts intitalized place element in document. It also stores
 * intialized object in array to keep track of this objects
 * @param {object} placeObject - object to initialize
 */
function insertPlace(placeObject) {
  places.push(placeObject);
  gallery.prepend(places[places.length - 1].element);
  return;
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

initialCards.forEach(card =>
  insertPlace(initializePlace(createPlace(), card.name, card.link))
);
