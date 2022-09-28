import "./pages/index.css";
import {
    connectionConfig,
    galleryContainer
} from "./components/utils.js";
import Card from "./components/card.js";
import Api from "./components/api.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/popups.js";
import UserInfo from "./components/UserInfo";


const api = new Api(connectionConfig);
let userId;
/* Экземпляр класса пользлователя */
const userInfo = new UserInfo({
    username: '.profile__user-name',
    job: '.profile__user-description',
    avatar: '.profile__image'
});
// Создание карточки 
const createCard = (data) => {
    const card = new Card({
        data: data,
        cardTemplate: '#gallery_template',
        userId: userId,
        openPopupImage: (caption, link) => {
            viewPopupImage.openPopup(caption, link)
        },
        handleDeleteCardClick: (cardId) => {
            api.deleteCard(cardId)
                .then(() => {
                    card.deleteCard();
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        handleSetLike: (cardId) => {
            api.likeCard(cardId)
                .then((data) => {
                    card.handleLikeCard(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        },
        handleUnLike: (cardId) => {
            api.unLikeCard(cardId)
                .then((data) => {
                    card.handleLikeCard(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    });
    const cardElement = card.generateCard();
    return cardElement;

};
const cardsList = new Section({
    renderer: (card) => {
        cardsList.addItem(createCard(card));
    },
}, '.gallery__items');

/* Просмотр изображения */
const viewPopupImage = new PopupWithImage('.popup_type_img-preview');
viewPopupImage.setEventListeners();



Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        cardsList.renderItems(cards.reverse());

    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });