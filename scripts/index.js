import { Card } from './card.js';
import { FormValidator } from './formValidator.js';

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
    closePopup(evt.currentTarget);
  }
}

function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

popupProfileOpenButton.addEventListener('click', () => {
  popupNameInputElement.value = profileName.textContent;
  popupJobInputElement.value = profileJob.textContent;
  openPopup(popupProfile);
  profileFormValidation.handleStartingValidation();
});
popupCardOpenButton.addEventListener('click', () => {
  openPopup(popupCard);
  CardFormValidation.handleStartingValidation();
});

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => {
    closePopup(popup);
  });
  popup.addEventListener('mousedown', (evt) => closePopupByOverlay(evt));
});

function openPopupImage(title, image) {
  popupCardImage.src = image;
  popupCardImage.alt = title;
  popupCardImageCaption.textContent = title;
  openPopup(popupImage);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupNameInputElement.value;
  profileJob.textContent = popupJobInputElement.value;
  closePopup(popupProfile);
}
popupProfileForm.addEventListener('submit', handleProfileFormSubmit);

function generateCard(item) {
  const card = new Card(item, '.card-template', openPopupImage);
  return card.generateCard();
}

function submitPopupCardForm(evt) {
  evt.preventDefault();
  cardsList.prepend(
    generateCard({
      title: popupCardTitleInput.value,
      image: popupCardLinkInput.value,
    })
  );
  closePopup(popupCard);
  evt.target.reset();
}

popupCardForm.addEventListener('submit', submitPopupCardForm);

const items = [
  {
    title: 'Архыз',
    image:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    title: 'Кабардино-Балкария',
    image:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    title: 'Домбай',
    image:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    title: 'Карачаево-Черкессия',
    image:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    title: 'Ингушетия',
    image:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    title: 'Дагестан',
    image:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

items.forEach((cardElement) => {
  cardsList.prepend(generateCard(cardElement));
});

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorInputClass: 'popup__input_type_error',
  inputErrorTextClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__button',
  buttonInvalidClass: 'popup__button_invalid',
  buttonValidClass: 'popup__button_valid',
};

const profileFormValidation = new FormValidator(config, popupProfileForm);
const cardFormValidation = new FormValidator(config, popupCardForm);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
