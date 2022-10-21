import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open(title, image) {
    super.open();
    this._popupImage.setAttribute('src', image);
    this._popupImage.setAttribute('alt', title);
    this._popupCaption.textContent = title;
  }
}
