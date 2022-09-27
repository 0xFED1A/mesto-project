//@ts-check

/**
 * Модуль содержащий класс Card
 *
 * @module card
 * @version 0.1
 * @author Дмитрий Суртаев
 */

/**
 * Класс Card
 */
export default class Card {
<<<<<<< Updated upstream
    constructor({cardTemplate,openPopup,sendLikeInfoToServer,data,userId,deleteCardFromServer}) 
    {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._userId = userId;
    this._cardOwnerId = data.owner._id;

    this._sendLikeInfoToServer = sendLikeInfoToServer;
    this._deleteCardFromServer = deleteCardFromServer;

    this._cardTemplate = cardTemplate;
    this._element = this._getTemplate();

    this._openPopup = openPopup;
=======
  constructor({data,cardTemplate,openPopupImage,handleDeleteCardClick,sendLikeInfoToServer,userId,deleteCardFromServer}) 
  {
  this._data = data;
  this._name = data.name;
  this._link = data.link;
  this._cardId = data._id;
  this._userId = userId;
  this._cardOwnerId = data.owner._id;
  this._likes = data.likes;
>>>>>>> Stashed changes


  this._handleDeleteCardClick = handleDeleteCardClick;
  this._sendLikeInfoToServer = sendLikeInfoToServer;
  this._deleteCardFromServer = deleteCardFromServer;

<<<<<<< Updated upstream
    }
    _getTemplate() {
      const newCard = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".gallery__item").cloneNode(true);
      return newCard;
    }
   
    // вернёт готовую HTML разметку, т.е. объек класса HTML element, который уже можно
    // отобразить на странице
    generateCard() {
      this._setEventListeners();
      // тут для элемента img лежащего внутри li, добавляется реальный атрибут src
      this._newCardImage.src = this._link;
      // тут для элемента img лежащего внутри li, добавляется реальный атрибут alt
      this._newCardImage.alt = this._name;
      // тут для элемента h2 лежащего внутри li, устанавливается реальный textContnetn
      this._newCardCaption.textContent = this._name;
      // тут в счётчик лайков записывается длинна массива likes
      this._newCardLikesCounter.textContent = this._data.likes.length;
      this._setIsLiked();
=======
  this._cardTemplate = cardTemplate;
  this._element = this._getTemplate();

  this._openPopupImage = openPopupImage;


  this._newCardImage = this._element.querySelector(".gallery__image");
  this._newCardCaption = this._element.querySelector(".gallery__item-name");
  this._newCardLikeButton = this._element.querySelector(".gallery__button-like");
  this._newCardLikesCounter = this._element.querySelector(".gallery__like-counter");
  

  }
  _getTemplate() {
    const newCard = document
    .querySelector(this._cardTemplate)
    .content.querySelector(".gallery__item").cloneNode(true);
    return newCard;
  }
 
 

  _setEventListeners() {
    this._newCardRemoveButton.addEventListener('click', () => {
      this._handleDeleteCardClick(this._cardId);
    })
    this._newCardLikeButton.addEventListener("click", () => this._likeToggle());
    this._newCardImage.addEventListener("click",() => {this._openPopupImage(this._name,this._link);});
  }
   generateCard() {
    
      this._newCardImage.src = this._link; // тут для элемента img лежащего внутри li, добавляется реальный атрибут src
      this._newCardImage.alt = this._name; // тут для элемента img лежащего внутри li, добавляется реальный атрибут alt
      this._newCardCaption.textContent = this._name; // тут для элемента h2 лежащего внутри li, устанавливается реальный textContnet
      this._newCardLikesCounter.textContent = this._data.likes.length; // тут в счётчик лайков записывается длинна массива likes
      this._newCardRemoveButton = this._element.querySelector(".gallery__button-delete"); 
      this._deleteButton();
      this._setEventListeners();
>>>>>>> Stashed changes
      return this._element;
    }

  _deleteButton() {
    if (this._userId !== this._cardOwnerId ) {
      this._newCardRemoveButton.remove();
    }
  }
/*
  _likeToggle() {
    if (!this._newCardLikeButton.classList.contains("gallery__button-like_active")) {
      this._sendLikeInfoToServer(this._cardId)
      .then((res) => {
        this._data = res;
        this._newCardLikesCounter.textContent = res.likes.length;
        this._newCardLikeButton.classList.add("gallery__button-like_active");
      })
      .catch(() => console.log("Запрос изменения состояния лайка не удался"));
    }
    else {
      this._sendLikeInfoToServer(this._cardId)
      .then((res) => {
        this._data = res;
        this._newCardLikesCounter.textContent = res.likes.length;
        this._newCardLikeButton.classList.remove("gallery__button-like_active");
      })
      .catch(() => console.log("Запрос изменения состояния лайка не удался"));
      }
    }

  _setIsLiked() {
    if (this._data.likes.some(elem => elem._id === this._userId)) {
      this._newCardLikeButton.classList.add("gallery__button-like_active");
    }
  }
*/
}

























