"use strict";

// globals
const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const userName = profile.querySelector(".profile__user-name");
const userInfo = profile.querySelector(".profile__user-description");

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
 * Function return one of three available popup object types
 * @param {object} popupObject - popup object to get type
 * @returns {string} - type of popup object
 */
function getPopupType(popupObject) {
  const popupTypes = ["add", "edit", "preview"];
  return popupTypes.find(popupType => popupObject.popup.id.includes(popupType));
}

/**
 * Function intitalizes popup open property: attaches event listeners
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
}

function initializePopupInputs(popupObject) {

}
