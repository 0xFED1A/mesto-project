// api

import {
  config,
  userPath,
  cardsPath,
  likesPath,
  avatarPath,
} from "./utils";

/**
 * function parses response from server
 * @param {object} response - response from server
 * @param {object} - promise
 */
function getResponseData(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка: ${response.status}`);
  }
}

/**
 * function retrieves user information from server and 
 * returns promise with it
 * @returns {object} - promise with user info
 */
 function getUserInfoFromServer() {
  return fetch(
    config.baseUrl + userPath,
    {
      method: "GET",
      headers: config.headers
    }
  )
  .then(response => getResponseData(response));
}

/**
 * function sends user information to server and 
 * returns promise with new user info
 * @param {string} userName - username
 * @param {string} userInfo - brief user description
 * @returns {object} - promise with user info
 */
function sendUserInfoToServer(userName, userInfo) {
  return fetch(
    config.baseUrl + userPath,
    {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({name: userName, about: userInfo})
    }
  )
  .then(response => getResponseData(response));
}

/**
 * function retrieves array of cards from server and 
 * returns promise with it
 * @returns {object} - promise with user array of cards
 */
function getCardsFromServer() {
  return fetch(
    config.baseUrl + cardsPath,
    {
      method: "GET",
      headers: config.headers
    }
  )
  .then(response => getResponseData(response));
}

/**
 * function sends new card data to server and returns promise
 * with new card data
 * @param {string} cardName - card name
 * @param {string} cardLink - URL to card image
 * @returns {object} - promise with card data
 */
function sendCardToSever(cardName, cardLink) {
  return fetch(
    config.baseUrl + cardsPath,
    {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({name: cardName, link: cardLink})
    }
  )
  .then(response => getResponseData(response));
}

/**
 * function sends delete request to server with selected card id
 * @param {string} cardId - card to delete
 * @returns {object} - promise with result
 */
function deleteCardFromServer(cardId) {
  return fetch(
    config.baseUrl + cardsPath + "/" + cardId,
    {
      method: "DELETE",
      headers: config.headers
    }
  )
  .then(response => getResponseData(response));
}

/**
 * function sends user like to server for particular card
 * @param {string} cardId - card to like
 * @param {boolean} isLiked - true if liked, false if unliked
 * @returns {object} - promise with result
 */
function sendLikeInfoToServer(cardId, isLiked) {
  const like = isLiked ? "PUT" : "DELETE";
  return fetch(
    config.baseUrl + likesPath + "/" + cardId,
    {
      method: like,
      headers: config.headers
    }
  )
  .then(response => getResponseData(response));
}

/**
 * function sends link to user avatar to server
 * @param {string} avatarLink - link to new avatar
 * @returns {object} - promise with result
 */
function sendAvatarToServer(avatarLink) {
  return fetch(
    config.baseUrl + avatarPath,
    {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({avatar: avatarLink})
    }
  )
  .then(response => getResponseData(response));
}

export {
  getUserInfoFromServer,
  sendUserInfoToServer,
  getCardsFromServer,
  sendCardToSever,
  deleteCardFromServer,
  sendLikeInfoToServer,
  sendAvatarToServer
};
