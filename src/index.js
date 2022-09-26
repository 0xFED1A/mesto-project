"use strict";
import "./pages/index.css";

import { 
  connectionConfig,
  cardCallBackConfig,
  cardSelectorConfig
} from "./components/utils.js";

import {
  PopupWithImage,
  PopupWithForm
} from "./components/popups.js";

import Api from "./components/api.js";
import Card from "./components/card.js";
import Section from "./components/Section.js";

// инициализация попаов
const previewPopup = new PopupWithImage();
/*
        const avatarPopup = new PopupWithForm();
        const placePopup = new PopupWithForm();
        const userPopup = new PopupWithForm();
*/

// получение информации от сервера
const api = new Api(connectionConfig);
const cardsData = new api.getCardsFromServer();
const userData = new api.getUserInfoFromServer();

// инициализация конфигов
cardCallBackConfig.openFunct = previewPopup.getOpenFunct();
cardCallBackConfig.removeFunct = api.getRemoveFunct();
cardCallBackConfig.sendFunct = api.getSendFunct();

// создаём карточки
Promise.all([cardsData, userData])
  .then(serverResponce =>)

  .catch()


 
 
const createCard = (data) => {
  const card = new Card({
    data: data,
    cardTemplate: '#gallery_template',
  });
  const cardElement = card.generateCard();
  return cardElement;
};





const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
},
}, '.gallery__items');
console.log(cardsList);


Promise.all([api.getCardsFromServer()])
  .then(cards => {
    cardsList.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

/*
cardsData
  .then(response => {
    const cardsArray = [];
    response.forEach(cardsDataItem => {
      const cardConfig = {
        cardTemplate: "#gallery_template",
        openPopup: () => {console.log("popup opened")},
        sendLikeInfoToServer: () => {console.log("like has been sent")},
        data: cardsDataItem,
        userId: "user name",
        deleteCardFromServer: () => {console.log("card deleted")}
      }
      const card = new Card(cardConfig);
      cardsArray.push(card);
    });
    section.renderCard(cardsArray);
  })
  .catch(err => console.log(err));
console.log(cardsData);
  
const dd = api.sendCardToSever[name];
  console.log(dd);*/
