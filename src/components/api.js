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