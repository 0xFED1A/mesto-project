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
    openPopup(previewPopup);
  });

  const newCardCaption = newCard.querySelector("gallery__item-name");
  newCardCaption.textContent = cardName;

  const newCardLikeButton = newCard.querySelector("gallery__button-like");
  newCardLikeButton.addEventListener("click", () => {
    newCardLikeButton.classList.toggle("gallery__button-like_active");
  });

  const newCardRemoveButton = newCard.querySelector("gallery__button-delete");
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
