// utils

import { getUserInfoFromServer, getCardsFromServer } from "./api";

// document variables
const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const userName = profile.querySelector(".profile__user-name");
const userInfo = profile.querySelector(".profile__user-description");
const userAvatar = profile.querySelector(".profile__image");
const gallery = page.querySelector(".gallery__items");

// connection configs
const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14/",
  headers: {
    authorization: "97490d78-0aeb-4bf4-9e55-1aeead76a69d",
    "Content-Type": "application/json"
  }
};

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
 */
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
