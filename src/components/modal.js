// modal

import { page } from "./utils";

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

// avatar popup
const avatarPopupElement = page.querySelector("#popup_avatar_edit");
const avatarPopupOpen = page.querySelector(".profile__avatar");
const avatarPopupClose =
  avatarPopupElement.querySelector(".popup__button-close");
const avatarPopupForm = document.forms.user_avatar;
const avatarPopupImageLink = document.forms.user_avatar.avatar_link;
const avatarPopupUploadButton = document.forms.user_avatar.avatar_save;

// popup functions
/**
 * function adds class "popup_opened" to popup element
 * @param {object} popupElement - element to attach class
 */
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEscape);
}

/**
 * function removes class "popup_opened" from popup element
 * @param {object} popupElement - element to remove class
 */
function closePopup(popupElement) {
  popupElement.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEscape);
}

/**
 * function removes class "popup_opened" from popup element
 * on mousedown event 
 * @param {object} popupElement - element to remove class
 */
function closePopupOnClick(popupElement) {
  popupElement.classList.contains("popup") ? closePopup(popupElement) : null;
}


/**
 * function removes class "popup_opened" from popup element
 * on pressing escape key. Unlike others, this function takes
 * keyboard event as argument, not popup window
 * @param {object} evt - keyboard event
 */
function closePopupOnEscape(evt) {
  if (evt.key && evt.key === "Escape") {
    const currentOpenedPopup = document.querySelector(".popup_opened");
    closePopup(currentOpenedPopup);
  }
}

/**
 * function initializes value of passed input element with passed string,
 * then function triggers input event to trigger validation process
 * @param {object} popupInput - input element to initialize
 * @param {string} inputValue - string which will be used for initialization
 */
function initializePopupInput(popupInput, inputValue) {
  popupInput.value = inputValue;
  popupInput.dispatchEvent(new Event("input", {bobbles: true}));
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

export {
  profilePopupElement,
  profilePopupOpen,
  profilePopupClose,
  profilePopupForm,
  profilePopupUserName,
  profilePopupUserInfo,
  profilePopupSaveButton,

  placePopupElement,
  placePopupOpen,
  placePopupClose,
  placePopupForm,
  placePopupPlaceName,
  placePopupPlaceLink,
  placePopupUploadButton,

  previewPopupElement,
  previewPopupClose,

  avatarPopupElement,
  avatarPopupOpen,
  avatarPopupClose,
  avatarPopupForm,
  avatarPopupImageLink,
  avatarPopupUploadButton,

  initializePopupInput,
  initializePopupImage,
  initializePopupCaption,
  previewPopupCaption,
  previewPopupImage,
  openPopup,
  closePopup,
  savePopupInput,
  closePopupOnClick,
};
