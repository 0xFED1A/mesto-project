

export default class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }
  getUserInfoFromServer() {
    return fetch(
      this._baseUrl + 'users/me',
      {
        method: "GET",
        headers: this._headers
      }
    )
    .then(response => this._getResponseData(response));
  }
  sendUserInfoToServer(userName, userInfo) {
    return fetch(
      this._baseUrl + 'users/me',
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: userName, 
          about: userInfo
        })
      }
    )
    .then(response => this._getResponseData(response));
  }
  getCardsFromServer() {
    return fetch(
      this._baseUrl + 'cards',
      {
        method: "GET",
        headers: this._headers
      }
    )
    .then(response => this._getResponseData(response));
  }
  sendCardToSever(cardName, cardLink) {
    return fetch(
      this._baseUrl + 'cards',
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardName, 
          link: cardLink
        })
      }
    )
    .then(response => this._getResponseData(response));
  }
  deleteCardFromServer(cardId) { /**************** */
    return fetch(
      this._baseUrl + 'cards' + "/" + cardId,
      {
        method: "DELETE",
        headers: this._headers
      }
    )
    .then(response => this._getResponseData(response));
  }
  sendLikeInfoToServer(cardId, isLiked) {/**************** */
    const like = isLiked ? "PUT" : "DELETE";
    return fetch(
      this._baseUrl + 'cards/likes' + "/" + cardId,
      {
        method: like,
        headers: this._headers
      }
    )
    .then(response => this._getResponseData(response));
  }
  sendAvatarToServer(avatarLink) {
    return fetch(
      this._baseUrl + 'users/me/avatar',
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({avatar: avatarLink})
      }
    )
    .then(response => this._getResponseData(response));
  }

}

/*
Api           [+]     Дима
Card          [ ]     Дима
FormValidator  [ ]     Оксана
Section        [ ]
Popup         [ ]     Федор
PopupWithImage 
PopupWithForm
UserInfo
*/