<<<<<<< Updated upstream
// @ts-check

/**
 * Модуль предназначающийся для отправки запросов на сервер,
 * и получения ответов от него
 *
 * @module api
 * @version 0.1
 * @author Дмитрий Суртаев
 */

/**
 * Класс Api содержит методы для взаимодействия с сервером
 */
export default class Api {
  /**
   *  Конструктор класса Api. В качестве аргумента принимает конфиг
   *  содержащий два свойства:
   *   baseUrl - строковый url для соединения с сервером
   *   headers - объект, содержащий заголовки authorization и content-type
   *
   * @constructor
   * @param {{baseUrl: string, headers: Object}} connectionConfig - конфиг
   */
  constructor({baseUrl, headers}) {
    /**
     * @private
     * @property {string} _baseUrl - url для соединения с сервером
     */
    this._baseUrl = baseUrl;
    /**
     * @private
     * @property {object} _headers - объект с заголовками auth и content-type
     */
    this._headers = headers;
  }

  /**
   * Приватный метод класса Api отвечающий за обработку ответа от сервера
   * В качестве аргумента принимает объект Response с ответом от сервера. Если
   * статус промиса положительный, возвращается JSON версия ответа, иначе
   * возвращается сообщение об ошибке
   *
   * @private
   * @property {Function} _getResponseData - метод обработки запроса к серверу
   * @param {Response} response - ответ полученный от сервера
   * @returns {Promise} - возвращает обработанный ответ
   */
  _getResponseData(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}`);
    }
  }

  /**
   * Публичный метод класса Api отвечающий за получение информации о 
   * пользователе от сервера
   *
   * @property {Function} getUserInfoFromServer - получение инфо о пользователе
   * @returns {Promise} - JSON версия ответа, или статус ошибки
   */
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

  /**
   * Публичный метод класса Api отвечающий за отправку информации о 
   * пользователе на сервер
   *
   * @property {Function} sendUserInfoToServer - отправка инфо о пользователе
   * @param {string} userName - строка с именем пользователя
   * @param {string} userInfo - строка с описанием пользователя
   * @returns {Promise} - JSON версия ответа, или возвращается статус ошибки
   */
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

  /**
   * Публичный метод класса Api отвечающий за получение 
   * данных о карточках от сервера
   *
   * @property {Function} getCardsFromServer - получение инфо о карточках
   * @returns {Promise} - JSON версия ответа, или статус ошибки
   */
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

  /**
   * Публичный метод класса Api отвечающий за отправку карточки на сервер
   *
   * @property {Function} sendCardToSever - отправка карточки
   * @param {string} cardName - строка с именем карточки
   * @param {string} cardLink - строка с url изображения карточки
   * @returns {Promise} - JSON версия ответа, или возвращается статус ошибки
   */
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

  /**
   * Публичный метод класса Api отвечающий за удаление картоки с сервера
   *
   * @property {Function} deleteCardFromServer - удаление карточки
   * @param {string} cardId - строка с id карточки
   * @returns {Promise} - JSON версия ответа, или возвращается статус ошибки
   */
  deleteCardFromServer(cardId) {
    return fetch(
      this._baseUrl + 'cards' + "/" + cardId,
      {
        method: "DELETE",
        headers: this._headers
      }
    )
    .then(response => this._getResponseData(response));
  }

  /**
   * Публичный метод класса Api отвечающий за отправку информации о лайке
   * на сервер
   *
   * @property {Function} sendLikeInfoToServer - отправка инфо о лайке
   * @param {string} cardId - строка с id карточки
   * @param {boolean} isLiked - true устанавливает лайк, false удаляет
   * @returns {Promise} - JSON версия ответа, или возвращается статус ошибки
   */
  sendLikeInfoToServer(cardId, isLiked) {
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

  /**
   * Публичный метод класса Api отвечающий за отправку аватара на сервер
   *
   * @property {Function} sendAvatarToServer - отправка аватара
   * @param {string} avatarLink - строка с url аватара
   * @returns {Promise} - JSON версия ответа, или возвращается статус ошибки
   */
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
=======
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
>>>>>>> Stashed changes
