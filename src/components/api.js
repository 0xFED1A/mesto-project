// api
//
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
export {
  getUserInfoFromServer,
};