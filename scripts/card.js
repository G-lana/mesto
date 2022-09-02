export class Card {
  constructor(data, templateSelector, openPopupImage) {
    this._title = data.title;
    this._image = data.image;
    this._openPopupImage = openPopupImage;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__like');
    this._cardImage = this._element.querySelector('.place__image');
    this._deleteButton = this._element.querySelector('.place__delete');
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector('.place__title').textContent = this._title;

    return this._element;
  }
  _handleLikeCard() {
    this._likeButton.classList.toggle('place__like_type_active');
  }
  _handleDeleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._openPopupImage(this._title, this._image);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard();
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCard();
    });
  }
}
