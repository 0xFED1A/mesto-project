import "./pages/index.css";
import {
    connectionConfig,
} from "./components/Utils/utils.js";
import Card from "./components/card.js";
import Api from "./components/api.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo";
import {
    newCardButton,
    avatarButton,
    profileButton,
    formInputName,
    formInputDescription,
    avatarFormValidationConfig,
    placeFormValidationConfig,
    userFormValidationConfig,
    validationConfig
} from "./components/Utils/constants.js";



const api = new Api(connectionConfig);
let userId;

// Экземпляр класса пользлователя
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
            viewPopupImage.openPopup(caption, link);
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
function renderLoading(isLoading, saveButton) {
    if (isLoading) {
        saveButton.textContent = 'Сохранение...';
    } else {
        saveButton.textContent = 'Сохранить';
    }
}

document.querySelector('.profile__button-add').addEventListener('click', () => {
    placeFormValidation.toggleButtonState();
    addCardPopup.openPopup();

})
document.querySelector('.profile__avatar').addEventListener('click', () => {
    avatarFormValidation.toggleButtonState();
    popupAvatarEdit.openPopup();
})
document.querySelector('.profile__button-edit').addEventListener('click', () => {
    userFormValidation.toggleButtonState();
    popupProfileEdit.openPopup();
    const user = userInfo.getUserInfo();
    formInputName.value = user.username;
    formInputDescription.value = user.job;
});
const addCardPopup = new PopupWithForm({
    elementSelector: '#popup_img_add',
    submitForm: (card) => {
        renderLoading(true, newCardButton); //сохраниение
        api.addCard(card)
            .then((res) => {
                const cardElement = createCard(res);
                cardsList.addItem(cardElement);
                addCardPopup.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, newCardButton);
            })
    }
});
const popupAvatarEdit = new PopupWithForm({
    elementSelector: '#popup_avatar_edit',
    submitForm: (data) => {
        renderLoading(true, avatarButton); //сохраниение
        api.editAvatar(data)
            .then((data) => {
                userInfo.setUserInfo({
                    avatar: data.avatar,
                    name: data.name,
                    about: data.about
                });
                popupAvatarEdit.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, avatarButton);
            })
    }
});

const popupProfileEdit = new PopupWithForm({
    elementSelector: '#popup_profile_edit',
    submitForm: (data) => {
        renderLoading(true, profileButton); //сохраниение
        api.updateUserData(data)

            .then((data) => {
                userInfo.setUserInfo({
                    avatar: data.avatar,
                    name: data.name,
                    about: data.about
                });
                popupProfileEdit.closePopup();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                renderLoading(false, profileButton);
            })
    }
});

// валидация
const userFormValidation = new FormValidator(validationConfig, userFormValidationConfig);
userFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validationConfig, placeFormValidationConfig);
placeFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationConfig, avatarFormValidationConfig);
avatarFormValidation.enableValidation();