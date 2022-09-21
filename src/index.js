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
  /*
  userFormValidationConfig,
  placeFormValidationConfig,
  avatarFormValidationConfig,*/
  disableButton,
  enableValidation
} from './components/validate';

import {
  sendUserInfoToServer,
  sendCardToSever,
  sendAvatarToServer,
  getUserInfoFromServer
} from './components/api';

// profile popup listeners
profilePopupOpen.addEventListener("click", () => {
  //initializePopupInput(profilePopupUserName, userName.textContent);  //удалить
  //initializePopupInput(profilePopupUserInfo, userInfo.textContent);  //удалить
  openPopup(profilePopupElement);
});
profilePopupClose.addEventListener("click", () => {
  closePopup(profilePopupElement);
});



// main logic
userData
  .then(serverData => {
    userName.textContent = serverData.name;
    userInfo.textContent = serverData.about;
    profilePopupUserName.value = serverData.name;
    profilePopupUserInfo.value =serverData.about;
    console.log(userName.textContent)
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

profilePopupForm.addEventListener("submit", event => {
  event.preventDefault();
  setTextContent(profilePopupSaveButton, "Сохранение...");
  userName.textContent = profilePopupUserName.value;  //
  userInfo.textContent = profilePopupUserInfo.value;  //
  sendUserInfoToServer(profilePopupUserName.value, profilePopupUserInfo.value)
    .then(() => {
      disableButton(validationConfig, profilePopupSaveButton)
      //savePopupInput(profilePopupUserName, userName);
      //savePopupInput(profilePopupUserInfo, userInfo);
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
  //initializePopupInput(placePopupPlaceName, "");  //удалить
  //initializePopupInput(placePopupPlaceLink, "");  //удалить
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
      disableButton(validationConfig, placePopupUploadButton)
      const newCard = createCard(cardData);
      placePopupPlaceName.value = '';
      placePopupPlaceLink.value = '';
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
  //initializePopupInput(avatarPopupImageLink, "");   //удалить
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
      disableButton(validationConfig, avatarPopupUploadButton)
      userAvatar.src = serverData.avatar;
      closePopup(avatarPopupElement);
      avatarPopupImageLink.value = '';
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






const validationConfig = {
  formSelector: '.popup',
  formPopup: '.popup__form',
  inputSelector: '.form__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  activeButtonClass: 'popup__button-save_active',
  inputErrorClass: 'form__input_error',
  errorClass: 'form__input-error-msg_visible',
  //formButtonAvatar: 'formButtonAvatar',
  //profileNameChange: 'profileNameChange'
};
/*
enableValidation(userFormValidationConfig);
enableValidation(placeFormValidationConfig);
enableValidation(avatarFormValidationConfig);
*/
const avatarFormValidationConfig = document.querySelector('#popup_avatar_edit');
const placeFormValidationConfig = document.querySelector('#popup_img_add');
const userFormValidationConfig = document.querySelector('#popup_profile_edit');
/*
const userFormValidation = new FormValidator(validationConfig, userFormValidationConfig);
userFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validationConfig, placeFormValidationConfig);
placeFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationConfig, avatarFormValidationConfig);
avatarFormValidation.enableValidation();*/
enableValidation(validationConfig); 
/*
enableValidation(validationConfig, userFormValidationConfig);
enableValidation(validationConfig, placeFormValidationConfig);
enableValidation(validationConfig, avatarFormValidationConfig);
*/

