// card

import { gallery } from "./utils";

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
  newCardLikeButton.addEventListener("click", () => {
    newCardLikeButton.classList.toggle("gallery__button-like_active");
  });

  const newCardRemoveButton = newCard.querySelector(".gallery__button-delete");
  newCardRemoveButton.addEventListener("click", () => {
    newCard.remove();
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

export {initialCards, createCard, renderCard};
