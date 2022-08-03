const popupElements = document.querySelectorAll('.popup');
const popupProfile = document.querySelector('#editProfile');
const popupCard = document.querySelector('#addCard');
const popupImage = document.querySelector('#cardImage');

const formElements = document.querySelectorAll('.popup__container');
const popupProfileForm = document.querySelector('#editProfileForm');
const popupCardForm = document.querySelector('#addCardForm');

const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');
const popupNameInputElement = document.querySelector('.popup__input_type_name');
const popupJobInputElement = document.querySelector('.popup__input_type_job');

const popupCardTitleInput = document.querySelector('.popup__input_type_title');
const popupCardLinkInput = document.querySelector('.popup__input_type_link');

const popupCardImage = document.querySelector('.popup__image');
const popupCardImageCaption = document.querySelector('.popup__caption');

const cardsList = document.querySelector('.places');

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  document.addEventListener('click', closePopupByOverlay);
  clearInputError(popupElement.id);
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  document.removeEventListener('click', closePopupByOverlay);
}

popupProfileOpenButton.addEventListener('click', () => {
  popupNameInputElement.value = profileName.textContent;
  popupJobInputElement.value = profileJob.textContent;
  openPopup(popupProfile);
});
popupCardOpenButton.addEventListener('click', () => {
  popupCardTitleInput.value = '';
  popupCardLinkInput.value = '';
  openPopup(popupCard);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    console.log(button.id);
    clearInputError(button.id);
    closePopup(popup);
  });
  popup.addEventListener('click', (evt) => closePopupByOverlay(evt));
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInputElement.value;
  profileJob.textContent = popupJobInputElement.value;
  closePopup(popupProfile);
}
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

function getCard(name, link) {
  const cardElement = document
    .querySelector('.card-template')
    .content.querySelector('.place')
    .cloneNode(true);
  cardElement.querySelector('.place__title').textContent = name;
  const cardImage = cardElement.querySelector('.place__image');
  cardImage.src = link;
  cardImage.alt = name;
  cardElement.querySelector('.place__delete').addEventListener('click', () => {
    cardElement.remove();
  });
  cardElement
    .querySelector('.place__like')
    .addEventListener('click', (event) => {
      event.target.classList.toggle('place__like_type_active');
    });

  cardImage.addEventListener('click', function () {
    openPopup(popupImage);
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardImageCaption.textContent = name;
  });

  return cardElement;
}

function createCard(name, link) {
  const template = getCard(name, link);
  cardsList.prepend(template);
}

popupCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  createCard(popupCardTitleInput.value, popupCardLinkInput.value);
  event.target.reset();
  closePopup(popupCard);
});

function createInitialCards() {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
      name: 'Кабардино-Балкария',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
      name: 'Домбай',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
      name: 'Карачаево-Черкессия',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
      name: 'Ингушетия',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
      name: 'Дагестан',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
  ];

  initialCards.forEach((element) => createCard(element.name, element.link));
}

createInitialCards();
