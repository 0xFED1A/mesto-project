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
/**
 * function runs full cycle of popup intitalization
 * @param {object} popupObject - object for intitalization
 */
function initializePopup(popupObject) {
  initializePopupOpen(popupObject);
  initializePopupClose(popupObject);
  initializePopupForm(popupObject);
  initializePopupInputs(popupObject);
  initializePopupSubmit(popupObject);
  return;
}

/**
 * function return one of three available popup object types
 * @param {object} popupObject - popup object to get type
 * @returns {string} - type of popup object
 */
function getPopupType(popupObject) {
  const popupTypes = ["add", "edit", "preview"];
  return popupTypes.find(popupType => popupObject.popup.id.includes(popupType));
}

/**
 * function intitalizes popup open property: attaches event listeners
 * on open element if needed and calls popup input initialization if needed
 * @param {object} popupObject - object for initialization
 * @param {array} previewPopupData - array of data required for preview popup
 * initialization
 */
function initializePopupOpen(popupObject, previewPopupData = null) {
  const popupType = getPopupType(popupObject);
  switch (popupType) {
    case "add":
    case "edit":
      popupObject.open.addEventListener("click", () => {
        initializePopupInputs(popupObject);
        popupObject.popup.classList.add("popup_opened");
      });
      break;
    case "preview":
      if (previewPopupData) {
        popupObject.caption.textContent = previewPopupData[0];
        popupObject.image.alt = previewPopupData[0];
        popupObject.image.src = previewPopupData[1];
        popupObject.popup.classList.add("popup_opened");
      }
      break;
  }
  return;
}

/**
 * function initializes popup close element: it adds event listener on close
 * button
 * @param {object} popupObject - object for intitalization
 */
function initializePopupClose(popupObject) {
  popupObject.close.addEventListener("click", () => {
    popupObject.popup.classList.remove("popup_opened");
  });
  return;
}

/**
 * function initialize popup form element: it attaches evenet listener to it,
 * and prevent form from default behaviour
 * @param {object} popupObject - object for initialization
 */
function initializePopupForm(popupObject) {
  const popupType = getPopupType(popupObject);
  switch (popupType) {
    case "add":
    case "edit":
      popupObject.form.addEventListener("submit", event => {
        event.preventDefault();
      });
      break;
  }
  return;
}

/**
 * function initializes popup inputs. It sets itput values to required
 * data, or clears inputs
 * @param {object} popupObject - object for intitalization
 */
function initializePopupInputs(popupObject) {
  const popupType = getPopupType(popupObject);
  switch (popupType) {
    case "edit":
      popupObject.userName.value = userName.textContent;
      popupObject.userInfo.value = userInfo.textContent;
      break;
    case "add":
      popupObject.placeName.value = "";
      popupObject.placeLink.value = "";
      break;
  }
  return;
}

/**
 * function initializes popup submit element. It attaches event listener to
 * submit button and prevents default behaviour. It also saves input values
 * @param {object} popupObject - object for intitalization
 */
function initializePopupSubmit(popupObject) {
  const popupType = getPopupType(popupObject);
  switch (popupType) {
    case "edit":
      popupObject.save.addEventListener("click", event => {
        event.preventDefault();
        userName.textContent = popupObject.userName.value;
        userInfo.textContent = popupObject.userInfo.value;
        popupObject.popup.classList.remove("popup_opened");
      });
      break;
    case "add":
      popupObject.upload.addEventListener("click", event => {
        event.preventDefault();
        const newPlace = createPlace();
        initializePlace(
          newPlace, popupObject.placeName.value, popupObject.placeLink.value
        );
        insertPlace(newPlace);
        popupObject.popup.classList.remove("popup_opened");
      });
      break;
  }
  return;
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
