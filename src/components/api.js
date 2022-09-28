export default class Api {
  constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
  }

  _checkResponse(res) {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  }

  // Получение карточек
  getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
              headers: this._headers
          })
          .then(res => this._checkResponse(res));
  }

  // Добавление новой карточки 
  addCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
              method: 'POST',
              headers: this._headers,
              body: JSON.stringify({
                  name: data.name,
                  link: data.link
              })
          })
          .then(res => this._checkResponse(res));
  }

  // Удаление карточки
  deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
              method: 'DELETE',
              headers: this._headers
          })
          .then(res => this._checkResponse(res));
  }

  // Лайк карточки
  likeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
              method: 'PUT',
              headers: this._headers
          })
          .then(res => this._checkResponse(res));
  }

  // Удаление лайка
  unLikeCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
              method: 'DELETE',
              headers: this._headers
          })
          .then(res => this._checkResponse(res));
  }

  // Получение информации о пользователе с сервера
  getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
              headers: this._headers
          })
          .then(res => this._checkResponse(res));
  }

  // Редактирование информации о пользователе через попап
  updateUserData(data) {
      return fetch(`${this._baseUrl}/users/me`, {
              method: 'PATCH',
              headers: this._headers,
              body: JSON.stringify({
                  name: data.username,
                  about: data.job
              })
          })
          .then(res => this._checkResponse(res));
  }

  // Редактирование аватара 
  editAvatar(data) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
              method: 'PATCH',
              headers: this._headers,
              body: JSON.stringify({
                  avatar: data.avatar
              })
          })
          .then(res => this._checkResponse(res));
  }
}