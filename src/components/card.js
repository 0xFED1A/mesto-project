export default class Card {
  constructor(cardTemplate,openPopup,sendLikeInfoToServer,data,userId,deleteCardFromServer) 
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


    this._newCardImage = this._element.querySelector(".gallery__image");
    this._newCardCaption = this._element.querySelector(".gallery__item-name");
    this._newCardLikeButton = this._element.querySelector(".gallery__button-like");
    this._newCardLikesCounter = this._element.querySelector(".gallery__like-counter");
    this._newCardRemoveButton = this._element.querySelector(".gallery__button-delete");

    }
    _getTemplate() {
      const newCard = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".gallery__item").cloneNode(true);
      return newCard;
    }
    
    generateCard() {
      this._setEventListeners();
      this._newCardImage.src = this._name;
      this._newCardImage.alt = this._link;
      this._newCardLikesCounter.textContent = this._data.likes.length;
      this._setIsLiked();
      return this._element;
    }

    _setEventListeners() {
      if (this._cardOwnerId === this._userId) {
        this._newCardRemoveButton.classList.add(".gallery__button-delete");
        this._newCardRemoveButton.addEventListener("click", () =>
          this._deleteButton()
        );
      }
  
      this._newCardLikeButton.addEventListener("click", () => this._likeToggle());
  
      this._element
        .querySelector(".gallery__image")
        .addEventListener("click", this._openPopup);
    }
    
    _deleteButton() {
      const data = {
        card: this._element,
        cardId: this._cardId,
      };
      this._deleteCard(data);
    }

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

}

























