import "./pages/index.css";
import {
    connectionConfig,
    galleryContainer
} from "./components/utils.js";
import Card from "./components/card.js";
import Api from "./components/api.js";
import Section from "./components/Section.js";
import {PopupWithImage, PopupWithForm}  from "./components/popups.js";

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


Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cards, userData]) => {
        userInfo.setUserInfo(userData);
        userId = userData._id;
        cardsList.renderItems(cards.reverse());

    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`);
    });
/* Просмотр изображения */
const viewPopupImage = new PopupWithImage('.popup_type_img-preview');
viewPopupImage.setEventListeners();


///////-----------
const validationConfig = {
    formSelector: '.popup',
    formPopup: '.popup__form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    activeButtonClass: 'popup__button-save_active',
    inputErrorClass: 'form__input_error',
    errorClass: 'form__input-error-msg_visible',
    //formButtonAvatar: 'formButtonAvatar',
    //profileNameChange: 'profileNameChange'
  };
const popupImgAdd = document.querySelector('#popup_img_add');
const newCardButton = popupImgAdd.querySelector('.popup__button-save');

function renderLoading(isLoading, saveButton) {
    if (isLoading) {
        saveButton.textContent = 'Сохранение...';
    } else {
        saveButton.textContent = 'Сохранить';
    }
  }
const disableButton = (enable, buttonEnable) => {
    buttonEnable.classList.add(enable.inactiveButtonClass);
    buttonEnable.classList.remove(enable.activeButtonClass);
}
document.querySelector('.profile__button-add').addEventListener('click', () => {
    addCardPopup.openPopup();
})
document.querySelector('.profile__avatar').addEventListener('click', () => {
    popupAvatarEdit.openPopup();
})
const addCardPopup = new PopupWithForm({
    elementSelector: '#popup_img_add',
    submitForm: (card) => {
        renderLoading(true,newCardButton);//сохраниение
        api.addCard(card)
        .then((res) => {
            const cardElement = createCard(res);
            cardsList.addItem(cardElement);
            disableButton(validationConfig, newCardButton);
            addCardPopup.closePopup();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            renderLoading(false,newCardButton);
        })  
    }
});
const popupAvatarEdit = new PopupWithForm({
    elementSelector: '#popup_avatar_edit',
    submitForm: (data) => {
        //renderLoading(true,);//сохраниение
        api.editAvatar(data)
        .then((data) => {
            userInfo.setUserInfo({
                avatar: data.avatar
            });
            //disableButton(validationConfig, );
            popupAvatarEdit.closePopup();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            //renderLoading(false,);
        })  
    }
});
//////-------------

