<<<<<<< Updated upstream
// @ts-check

/**
 * Модуль содержащий общие константы и функции
 *
 * @module utils
 * @version 0.1
 * @author Оксана
 */

// конфиги
/**
 * Конфиг для соединения с сервером
 * @type {{baseUrl: string, headers: object}}
 */
const connectionConfig = {
=======
// connection configs
const connectionConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14/",
  headers: {
    authorization: "97490d78-0aeb-4bf4-9e55-1aeead76a69d",
    "Content-Type": "application/json"
  }
};
const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const userName = profile.querySelector(".profile__user-name");
const userInfo = profile.querySelector(".profile__user-description");
const userAvatar = profile.querySelector(".profile__image");
const gallery = page.querySelector(".gallery__items");
export { connectionConfig,gallery };

/*
// utils

import { getUserInfoFromServer, getCardsFromServer } from "./api";

// document variables



// connection configs
const config = {
>>>>>>> Stashed changes
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14/",
  headers: {
    authorization: "97490d78-0aeb-4bf4-9e55-1aeead76a69d",
    "Content-Type": "application/json"
  }
};

<<<<<<< Updated upstream
/**
 * Конфиг колбэков для объектов класса Card
 */
const cardCallBackConfig = {
  openFunct: null,
  sendFunct: null,
  removeFunct: null
};

/**
 * Конфиг селекторов для объектов класса Card
 */
const cardSelectorConfig = {
  imageSelect : ".gallery__image",
  captionSelect: ".gallery__item-name",
  likeSelect: ".gallery__button-like",
  counterSelect: ".gallery__like-counter",
  removeSelect: ".gallery__button-delete",
  templateSelect: "#gallery_template"
};


// константы

export {connectionConfig, cardCallBackConfig, cardSelectorConfig};
=======


// connection paths
const userPath = "users/me";
const cardsPath = "cards";
const likesPath = "cards/likes";
const avatarPath = "users/me/avatar";

// promises
const userData = getUserInfoFromServer();
const cardsData = getCardsFromServer();

/** function sets text content of passed elemend with passed text
 * @param {object} element - object to set text
 * @param {string} text - text to set
function setTextContent(element, text) {
  element.textContent = text;
}

export {
  page,
  profile,
  userName,
  userInfo,
  userAvatar,
  gallery,

  config,
  userPath,
  cardsPath,
  likesPath,
  avatarPath,

  userData,
  cardsData,

  setTextContent
};
*/
>>>>>>> Stashed changes
