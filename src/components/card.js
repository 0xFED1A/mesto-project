// card

import { gallery, userData } from "./utils";

import { sendLikeInfoToServer } from "./api";

import {
  initializePopupImage,
  previewPopupImage,
  initializePopupCaption,
  previewPopupCaption,
  openPopup,
  previewPopupElement
} from "./modal";

import { deleteCardFromServer } from "./api";

// card functions
/**
 * function creates new card. It generates card element from templaete and
 * itializes it children elements values with passed args
 * @param {object} cardData - object wich contains data for card creation
 * @returns {object} - created and initialized card element
 */

function createCard(cardData) {
  const cardTemplate = gallery.querySelector("#gallery_template").content;
  const newCard = cardTemplate.querySelector(".gallery__item").cloneNode(true);

  const newCardImage = newCard.querySelector(".gallery__image");
  newCardImage.src = cardData.link;
  newCardImage.alt = cardData.name;

  newCardImage.addEventListener("click", () => {
    initializePopupImage(previewPopupImage, cardData.link, cardData.name);
    initializePopupCaption(previewPopupCaption, cardData.name);
    openPopup(previewPopupElement);
  });

  const newCardCaption = newCard.querySelector(".gallery__item-name");
  newCardCaption.textContent = cardData.name;

  const newCardLikeButton = newCard.querySelector(".gallery__button-like");
  const newCardLikesCounter = newCard.querySelector(".gallery__like-counter");
  // check if user allreayd liked this card
  userData
    .then(serverData => {
      cardData.likes.some(liker => liker._id == serverData._id) ?
        newCardLikeButton.classList.add("gallery__button-like_active") :
        newCardLikeButton.classList.remove("gallery__button-like_active");
    })
    .catch(() => console.log("Не удался запрос к информации о пользователе"));

  newCardLikesCounter.textContent = cardData.likes.length;
  newCardLikeButton.addEventListener("click", () => {
    const isLiked = 
      newCardLikeButton.classList.contains("gallery__button-like_active");
    sendLikeInfoToServer(cardData._id, !isLiked)
      .then(serverData => {
        newCardLikesCounter.textContent = String(serverData.likes.length); 
        newCardLikeButton.classList.toggle("gallery__button-like_active");
      })
      .catch(() => console.log("Запрос изменения состояния лайка не удался"));
  });

  const newCardRemoveButton = newCard.querySelector(".gallery__button-delete");
  userData.then(serverData => {
    cardData.owner._id !== serverData._id ?
      newCardRemoveButton.remove() :
      newCardRemoveButton.addEventListener("click", () => {
        deleteCardFromServer(cardData._id)
          .then(() => newCard.remove())
          .catch(() => console.log("Запрос удаление карточки не удался"));
      });
  });
  return newCard;
}

/**
 * function prepends card to card container element 
 * @param {object} card - card to add to container
 * @param {object} cardContainer - container for cards
 */
function renderCard(card, cardContainer) {
  cardContainer.prepend(card);
}

export {createCard, renderCard};
