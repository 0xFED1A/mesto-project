// utils

// document variables
const page = document.querySelector(".page");
const profile = page.querySelector(".profile");
const userName = profile.querySelector(".profile__user-name");
const userInfo = profile.querySelector(".profile__user-description");
const userAvatar = profile.querySelector(".profile__image");
const gallery = page.querySelector(".gallery__items");

// connection variables
const userCohort = "plus-cohort-14/";
const userToken = "97490d78-0aeb-4bf4-9e55-1aeead76a69d";
const serverAddress = "https://nomoreparties.co/v1/";

const userPath = "users/me";
const cardsPath = "cards";
const likesPath = "cards/likes";
const avatarPath = "users/me/avatar";

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

  userCohort,
  userToken,
  serverAddress,
  userPath,
  cardsPath,
  likesPath,
  avatarPath,

  setTextContent
};
