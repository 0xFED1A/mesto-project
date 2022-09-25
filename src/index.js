"use strict";
import dd from '../test1.js';
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

  userData,
  cardsData,

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
  sendUserInfoToServer,
  sendCardToSever,
  sendAvatarToServer
} from './components/api';


console.log('gfdgsfdg');
// profile popup listeners
profilePopupOpen.addEventListener("click", () => {
  initializePopupInput(profilePopupUserName, userName.textContent);
  initializePopupInput(profilePopupUserInfo, userInfo.textContent);
  openPopup(profilePopupElement);
});
profilePopupClose.addEventListener("click", () => {
  closePopup(profilePopupElement);
});
profilePopupForm.addEventListener("submit", event => {
  event.preventDefault();
  setTextContent(profilePopupSaveButton, "Сохранение...");
  sendUserInfoToServer(profilePopupUserName.value, profilePopupUserInfo.value)
    .then(() => {
      savePopupInput(profilePopupUserName, userName);
      savePopupInput(profilePopupUserInfo, userInfo);
      closePopup(profilePopupElement);
    })
    .catch(() => {
      console.log("Запрос на сохранение информации о пользователе не удался");
    })
    .finally(() => {
      setTextContent(profilePopupSaveButton, "Сохранить");
    });
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
  setTextContent(placePopupUploadButton, "Создание...");
  sendCardToSever(placePopupPlaceName.value, placePopupPlaceLink.value)
    .then(cardData => {
      const newCard = createCard(cardData);
      renderCard(newCard, gallery);
      closePopup(placePopupElement);
    })
    .catch(() => {
      console.log("Запрос на создание карточки не удался");
    })
    .finally(() => {
      setTextContent(placePopupUploadButton, "Создать");
    });
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

//avatar popup listeners
avatarPopupOpen.addEventListener("click", () => {
  initializePopupInput(avatarPopupImageLink, "");
  openPopup(avatarPopupElement);
});
avatarPopupClose.addEventListener("click", () => {
  closePopup(avatarPopupElement);
});
avatarPopupForm.addEventListener("submit", event => {
  event.preventDefault();
  setTextContent(avatarPopupUploadButton, "Сохраненине...");
  sendAvatarToServer(avatarPopupImageLink.value)
    .then(serverData => {
      userAvatar.src = serverData.avatar;
      closePopup(avatarPopupElement);
    })
    .catch(() =>  {
      console.log("Запрос на отправку аватара пользователя не удался");
    })
    .finally(() => {
      setTextContent(avatarPopupUploadButton, "Сохранить");
    });
});
avatarPopupElement.addEventListener("mousedown", evt => {
  closePopupOnClick(evt.target);
});

// main logic
userData
  .then(serverData => {
    userName.textContent = serverData.name;
    userInfo.textContent = serverData.about;
    userAvatar.src = serverData.avatar;
  })
  .catch(() => console.log("Запрос на получение данных о пользователе не удался"));

Promise.all([
  userData,
  cardsData
])
  .then(serverData => {
    const cards = serverData[1].reverse();
    cards.forEach(card => {
      card.userId = serverData[0]._id;
      renderCard(createCard(card), gallery);
    });
  })
.catch(() => console.log("Запрос на получение данных о карточках не удался"));

enableValidation(userFormValidationConfig);
enableValidation(placeFormValidationConfig);
enableValidation(avatarFormValidationConfig);
