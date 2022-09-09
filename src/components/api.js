// api

import {
  userCohort,
  userToken,
  serverAddress,
  userPath,
  cardsPath,
  likesPath,
  avatarPath,
} from "./utils";

/**
 * function generates full URL constructing it
 * with serverAddress, userCohort, and passed path
 * @param {string} path - path required for URL constructing
 * @returns {string} - constructed path
 */
function generateFullURL(path) {
  return serverAddress + userCohort + path;
}

/**
 * function retrieves user information from server and 
 * returns promise with it
 * @returns {object} - promise with user info
 */
function getUserInfoFromServer() {
  return fetch(
    generateFullURL(userPath),
    {
      method: "GET",
      headers: {authorization: userToken},
    }
  )
  .then(result => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }); 
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
    generateFullURL(userPath),
    {
      method: "PATCH",
      headers: {authorization: userToken, 'Content-Type': 'application/json'},
      body: JSON.stringify({name: userName, about: userInfo})
    }
  )
  .then(result => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }); 
}

/**
 * function retrieves array of cards from server and 
 * returns promise with it
 * @returns {object} - promise with user array of cards
 */
function getCardsFromServer() {
  return fetch(
    generateFullURL(cardsPath),
    {
      method: "GET",
      headers: {authorization: userToken}
    }
  )
  .then(result => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }); 
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
    generateFullURL(cardsPath),
    {
      method: "POST",
      headers: {authorization: userToken, 'Content-Type': 'application/json'},
      body: JSON.stringify({name: cardName, link: cardLink})
    }
  )
  .then(result => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }); 
}

/**
 * function sends delete request to server with selected card id
 * @param {string} cardId - card to delete
 * @returns {object} - promise with result
 */
function deleteCardFromServer(cardId) {
  return fetch(
    generateFullURL(cardsPath) + "/" + cardId,
    {
      method: "DELETE",
      headers: {authorization: userToken}
    }
  )
  .then(result => {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }); 
}
export {
  getUserInfoFromServer,
  sendUserInfoToServer,
  getCardsFromServer,
  sendCardToSever,
  deleteCardFromServer,
};