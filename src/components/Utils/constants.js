const popupImgAdd = document.querySelector('#popup_img_add');
const newCardButton = popupImgAdd.querySelector('.popup__button-save');
const popupAvatar = document.querySelector('#popup_avatar_edit');
const avatarButton = popupAvatar.querySelector('.popup__button-save');
const popupProfile = document.querySelector('#popup_profile_edit');
const profileButton = popupProfile.querySelector('.popup__button-save');
const formInputName = document.querySelector('.form__input_user-name');
const formInputDescription = document.querySelector('.form__input_user-description');

const avatarFormValidationConfig = document.querySelector('#popup_avatar_edit');
const placeFormValidationConfig = document.querySelector('#popup_img_add');
const userFormValidationConfig = document.querySelector('#popup_profile_edit');

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

export {popupImgAdd,newCardButton,popupAvatar,avatarButton,popupProfile,profileButton,
    formInputName,formInputDescription,avatarFormValidationConfig,placeFormValidationConfig,userFormValidationConfig,validationConfig};
