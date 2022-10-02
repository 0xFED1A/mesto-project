export default class Card {

  constructor({
      data,
      cardTemplate,
      openPopupImage,
      handleDeleteCardClick,
      handleSetLike,
      handleUnLike,
      userId,
      deleteCardFromServer
  }) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._cardId = data._id;
      this._userId = userId;
      this._cardOwnerId = data.owner._id;
      this._likes = data.likes;



      this._handleDeleteCardClick = handleDeleteCardClick;
      this._handleSetLike = handleSetLike;
      this._handleUnLike = handleUnLike;

      this._deleteCardFromServer = deleteCardFromServer;

      this._cardTemplate = cardTemplate;
      this._element = this._getTemplate();

      this._openPopupImage = openPopupImage;


      this._newCardImage = this._element.querySelector(".gallery__image");
      this._newCardCaption = this._element.querySelector(".gallery__item-name");
      this._newCardLikeButton = this._element.querySelector(".gallery__button-like");
      this._newCardLikesCounter = this._element.querySelector(".gallery__like-counter");
  }

  // получение шаблона карточки
  _getTemplate() {
      const newCard = document
          .querySelector(this._cardTemplate)
          .content.querySelector(".gallery__item").cloneNode(true);
      return newCard;
  }
  // удаление карточки
  deleteCard() {
      this._element.remove();
      this._element = null;
  }
  // слушатели
  _setEventListeners() {
      this._newCardImage.addEventListener("click", () => {
          this._openPopupImage(this._name, this._link)
      })
      this._newCardRemoveButton.addEventListener('click', () => {
          this._handleDeleteCardClick(this._cardId);
      })
      this._newCardLikeButton.addEventListener('click', () => {
          if (this._newCardLikeButton.classList.contains('gallery__button-like_active')) {
              this._handleUnLike(this._cardId);
          } else {
              this._handleSetLike(this._cardId);
          }
      })

  }
  // генерация карточки
  generateCard() {
      this._newCardImage.src = this._link; // тут для элемента img лежащего внутри li, добавляется реальный атрибут src
      this._newCardImage.alt = this._name; // тут для элемента img лежащего внутри li, добавляется реальный атрибут alt
      this._newCardCaption.textContent = this._name; // тут для элемента h2 лежащего внутри li, устанавливается реальный textContnet
      this._newCardLikesCounter.textContent = this._data.likes.length; // тут в счётчик лайков записывается длинна массива likes
      this._newCardRemoveButton = this._element.querySelector(".gallery__button-delete");
      this._deleteButton();
      this._setIsLiked();
      this._setEventListeners();
      return this._element;
  }
  // проверка на владельца карточки (убрать кнопку удаления)
  _deleteButton() {
      if (this._userId !== this._cardOwnerId) {
          this._newCardRemoveButton.remove();
      }
  }

  // проверка, стоит ли лайк
  _setIsLiked() {
      if (this._likes.some((user) => {
              return this._userId === user._id;
          })) {
          this._newCardLikeButton.classList.add('gallery__button-like_active');
      }
  }
  // поставить/убрать лайк
  handleLikeCard(data) {
      this._likes = data.likes;
      this._newCardLikesCounter.textContent = this._likes.length;
      this._newCardLikeButton.classList.toggle('gallery__button-like_active');
  }
}