import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    constructor(elementSelector) 
    {
      super(elementSelector);
      this._image = this._element.querySelector(".popup__image");
      this._caption = this._element.querySelector(".popup__item-info");
    }
    openPopup(caption,link) {
      this._image.src = link;
      this._caption.textContent = caption;
      this._image.alt = caption;
      super.openPopup();
    }
  }