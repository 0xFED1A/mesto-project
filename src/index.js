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

  confirmPopupElement,
  confirmPopupClose,
  confirmPopupButton,

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
  let saveStatus = "";
  setTextContent(profilePopupSaveButton, "Сохранение...");
  sendUserInfoToServer(profilePopupUserName.value, profilePopupUserInfo.value)
    .then(() => {
      savePopupInput(profilePopupUserName, userName);
      savePopupInput(profilePopupUserInfo, userInfo);
      saveStatus = "Сохранено";
    })
    .catch(() => {
      saveStatus = "Ошибка";
      console.log("Запрос на сохранение информации о пользователе не удался");
    })
    .finally(() => {
      setTextContent(profilePopupSaveButton, saveStatus);
      closePopup(profilePopupElement);
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
  setTextContent(placePopupUploadButton, "Сохранить");
  openPopup(placePopupElement);
});
placePopupClose.addEventListener("click", () => {
  closePopup(placePopupElement);
});
placePopupForm.addEventListener("submit", event => {
  event.preventDefault();
  let saveStatus = "";
  setTextContent(placePopupUploadButton, "Сохранение...");
  sendCardToSever(placePopupPlaceName.value, placePopupPlaceLink.value)
    .then(cardData => {
      getUserInfoFromServer().
        then(userData => {
          cardData.userId = userData._id;
          const newCard = createCard(cardData);
          renderCard(newCard, gallery);
          saveStatus = "Сохранено";
        })
        .catch(() => 
          console.log("Запрос получения информации о пользователе удался")
        );
    })
    .catch(() => {
      saveStatus = "Ошибка";
      console.log("Запрос на создание карточки не удался");
    })
    .finally(() => {
      setTextContent(placePopupUploadButton, saveStatus);
      closePopup(placePopupElement);
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

// confirm popup listeners
confirmPopupClose.addEventListener("click", event => {
  closePopup(confirmPopupElement);
});
confirmPopupElement.addEventListener("mousedown", evt => {
  closePopupOnClick(evt.target);
});

//avatar popup listeners
avatarPopupOpen.addEventListener("click", () => {
  getUserInfoFromServer()
    .then(serverData => {
      initializePopupInput(avatarPopupImageLink, serverData.avatar);
      setTextContent(avatarPopupUploadButton, "Сохранить");
      openPopup(avatarPopupElement);
    })
    .catch(() => 
      console.log("Запрос получения информации о пользователе удался")
    );
});
avatarPopupClose.addEventListener("click", () => {
  closePopup(avatarPopupElement);
});
avatarPopupForm.addEventListener("submit", event => {
  event.preventDefault();
  let saveStatus = "";
  setTextContent(avatarPopupUploadButton, "Сохраненине...");
  sendAvatarToServer(avatarPopupImageLink.value)
    .then(serverData => {
      userAvatar.src = serverData.avatar;
      saveStatus = "Сохранено";
    })
    .catch(() =>  {
      saveStatus = "Ошибка";
      console.log("Запрос на отправку аватара пользователя не удался");
    })
    .finally(() => {
      setTextContent(avatarPopupUploadButton, saveStatus);
      closePopup(avatarPopupElement);
    });
});
avatarPopupElement.addEventListener("mousedown", evt => {
  closePopupOnClick(evt.target);
});


// main logic
getUserInfoFromServer()
  .then(serverData => {
    userName.textContent = serverData.name;
    userInfo.textContent = serverData.about;
    userAvatar.setAttribute("src", serverData.avatar);
  })
  .catch(() => console.log("Запрос получения информации о пользователе удался"));

getCardsFromServer()
  .then(cards => {
    getUserInfoFromServer()
      .then(userData => {
        cards = cards.reverse();
        cards.forEach(card => {
          card.userId = userData._id;
          renderCard(createCard(card),gallery);
        });
      }).catch(() => console.log("Запрос получения информации о пользователе удался"));
  })
  .catch(() => console.log("Запрос получения массива карточек не удался"));

enableValidation(userFormValidationConfig);
enableValidation(placeFormValidationConfig);
enableValidation(avatarFormValidationConfig);
