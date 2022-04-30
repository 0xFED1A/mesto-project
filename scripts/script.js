"use strict";

// globals
const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const userName = profile.querySelector(".profile__user-name");
const userInfo = profile.querySelector(".profile__user-description");
const gallery = page.querySelector(".gallery__items");

// profile popup
const profilePopupElement = page.querySelector("#popup_profile_edit");
const profilePopup = {
  popup: profilePopupElement,
  open: profile.querySelector(".profile__button-edit"),
  close: profilePopupElement.querySelector(".popup__button-close"),
  form: profilePopupElement.querySelector(".popup__form"),
  userName: profilePopupElement.querySelectorAll(".form__input")[0],
  userInfo: profilePopupElement.querySelectorAll(".form__input")[1],
  save: profilePopupElement.querySelector(".popup__button-save")
};

// place popup
const placePopupElement = page.querySelector("#popup_img_add");
const placePopup = {
  popup: placePopupElement,
  open: profile.querySelector(".profile__button-add"),
  close: placePopupElement.querySelector(".popup__button-close"),
  form: placePopupElement.querySelector(".popup__form"),
  placeName: placePopupElement.querySelectorAll(".form__input")[0],
  placeLink: placePopupElement.querySelectorAll(".form__input")[1],
  upload: placePopupElement.querySelector(".popup__button-save")
};

// preview popup
const previewPopupElement = page.querySelector("#popup_img_preview");
const previewPopup = {
  popup: previewPopupElement,
  close: previewPopupElement.querySelector(".popup__button-close"),
  image: previewPopupElement.querySelector(".popup__image"),
  caption: previewPopupElement.querySelector(".popup__item-info")
};

const popups = [profilePopup, placePopup, previewPopup];

// popup functions

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
        //TODO:
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

/**
 * function intializes image of places object
 * @param {object} placeObject - obect to initialize
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
 * @param {object} placeObject - obect to initialize
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
 * @param {object} placeObject - obect to initialize
 */
function initializePlaceLike(placeObject) {
  placeObject.like = placeObject.element.querySelector(".gallery__button-like");
  placeObject.like.addEventListener("click", () => {
    placeObject.like.classList.toggle("gallery__button-like_active");
  });
  return;
}
