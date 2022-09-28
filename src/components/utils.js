
// @ts-check

/**
 * Модуль содержащий общие константы и функции
 *
 * @module utils
 * @version 0.1
 * @author Оксана
 */

// конфиги
/**
 * Конфиг для соединения с сервером
 * @type {{baseUrl: string, headers: object}}
 */
const connectionConfig = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-14/",
  headers: {
    authorization: "97490d78-0aeb-4bf4-9e55-1aeead76a69d",
    "Content-Type": "application/json"
  }
};


/**
 * Конфиг колбэков для объектов класса Card
 */
const cardCallBackConfig = {
  openFunct: null,
  sendFunct: null,
  removeFunct: null
};

/**
 * Конфиг селекторов для объектов класса Card
 */
const cardSelectorConfig = {
  imageSelect : ".gallery__image",
  captionSelect: ".gallery__item-name",
  likeSelect: ".gallery__button-like",
  counterSelect: ".gallery__like-counter",
  removeSelect: ".gallery__button-delete",
  templateSelect: "#gallery_template"
};


// константы

export {connectionConfig, cardCallBackConfig, cardSelectorConfig};
