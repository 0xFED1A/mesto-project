"use strict";

// imports
import './pages/index.css';
import {
  renderCard,
  createCard
} from './components/card';

import {
  userName,
  userInfo,
  userAvatar,
  gallery,

  setTextContent
} from './components/utils';

import {
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
  openPopup,
  closePopup,
  savePopupInput,
  closePopupOnClick,
} from './components/modal';

import {
  userFormValidationConfig,
  placeFormValidationConfig,
  avatarFormValidationConfig,

  enableValidation
} from './components/validate';

import {
  getUserInfoFromServer,
  sendUserInfoToServer,
  getCardsFromServer,
  sendCardToSever,
  sendAvatarToServer
} from './components/api';

// profile popup listeners
profilePopupOpen.addEventListener("click", () => {
  getUserInfoFromServer()
    .then(serverData => {
      initializePopupInput(profilePopupUserName, serverData.name);
      initializePopupInput(profilePopupUserInfo, serverData.about);
      setTextContent(profilePopupSaveButton, "Сохранить");
      openPopup(profilePopupElement);
    })
  .catch(() => console.log("Запрос получения информации о пользователе удался"));
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
// mousedown used instead of click to prevent accidental popup
// close while selecting text with mouse inside field
profilePopupElement.addEventListener("mousedown", evt => {
  closePopupOnClick(evt.target);
});

// place popup listeners
placePopupOpen.addEventListener("click", () => {
  initializePopupInput(placePopupPlaceName, "");
  initializePopupInput(placePopupPlaceLink, "");
  openPopup(placePopupElement);
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
placePopupElement.addEventListener("mousedown", evt => {
  closePopupOnClick(evt.target);
});

// preview popup listeners
previewPopupClose.addEventListener("click", () => {
  closePopup(previewPopupElement);
});
previewPopupElement.addEventListener("mousedown", evt => {
  closePopupOnClick(evt.target);
});

// main logic
initialCards.forEach(
  card => renderCard(createCard(card), gallery)
);
enableValidation(userFormValidationConfig);
enableValidation(placeFormValidationConfig);
