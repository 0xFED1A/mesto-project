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
  placePopupElement.querySelector(".form__input_place_link");
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

// card functions
/**
 * function creates new card. It generates card element from templaete and
 * itializes it children elements values with passed args
 * @param {string} cardName - string which contains card name
 * @param {string} cardLink - string which contains card link
 * @returns {object} - created and intialized card element
 */
function createCard(cardName, cardLink) {
  const cardTemplate = gallery.querySelector("#gallery_template").content;
  const newCard = cardTemplate.querySelector(".gallery__item").cloneNode(true);

  const newCardImage = newCard.querySelector(".gallery__image");
  newCardImage.src = cardLink;
  newCardImage.alt = cardName;
  newCardImage.addEventListener("click", () => {
    openPopup(previewPopupElement);
  });

  const newCardCaption = newCard.querySelector(".gallery__item-name");
  newCardCaption.textContent = cardName;

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
  return;
}

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

// main logic
initialCards.forEach(card => renderCard(createCard(card.name, card.link), gallery));
