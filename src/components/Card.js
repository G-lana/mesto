export class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._title = data.title;
    this._image = data.image;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleCardClick = handleCardClick;
    this._templateSelector = templateSelector;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }

  _fillLike() {
    this._likeButton.classList.add('place__like_type_active');
  }
  _removeLike() {
    this._likeButton.classList.remove('place__like_type_active');
  }

  deleteCard() {
    this._element.remove();
  }
  _handleImageClick() {
    this._handleCardClick(this._title, this._image);
  }
  isLiked() {
    const userLikedCard = this._likes.find((user) => user._id === this._userId);
    return userLikedCard;
  }
  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCounter.textContent = this._likes.length;

    if (this.isLiked()) {
      this._fillLike();
    } else {
      this._removeLike();
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleImageClick(this._title, this._image);
    });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this._id);
    });
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this._id);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__like');
    this._cardImage = this._element.querySelector('.place__image');
    this._deleteButton = this._element.querySelector('.place__delete');
    this._likeCounter = this._element.querySelector('.place__like-counter');
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this.setLikes(this._likes);

    if (this._userId !== this._ownerId) {
      this._deleteButton.style.display = 'none';
    }

    this._element.querySelector('.place__title').textContent = this._title;

    return this._element;
  }
}
