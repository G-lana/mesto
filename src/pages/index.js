import './index.css';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  cardsList,
  popupProfileForm,
  popupCardForm,
  popupProfileOpenButton,
  popupCardOpenButton,
  popupNameInputElement,
  popupJobInputElement,
  items,
  config,
} from '../utils/constants.js';

function createCard(inputsValue) {
  const newCard = new Card(
    { title: inputsValue.title, image: inputsValue.image },
    '.card-template',
    handleCardClick
  );
  return newCard.generateCard();
}

const cardSection = new Section(
  {
    items: items,
    renderer: (item) => cardSection.addItem(createCard(item)),
  },
  cardsList
);
cardSection.renderItems(items);

const userInfo = new UserInfo('.profile__title', '.profile__job');
const editProfilePopup = new PopupWithForm('#editProfile', (inputsValue) => {
  userInfo.setUserInfo(inputsValue.name, inputsValue.job);
});

const addCardPopup = new PopupWithForm('#addCard', (inputsValue) =>
  cardSection.addItem(createCard(inputsValue))
);

const imagePopup = new PopupWithImage('#cardImage');
imagePopup.setEventListeners();

function handleCardClick(title, image) {
  imagePopup.open(title, image);
}

popupProfileOpenButton.addEventListener('click', () => {
  editProfilePopup.open();
  const data = userInfo.getUserInfo();
  popupNameInputElement.value = data.name;
  popupJobInputElement.value = data.job;
  profileFormValidation.resetValidation();
});

popupCardOpenButton.addEventListener('click', () => {
  addCardPopup.open();
  cardFormValidation.resetValidation();
});

addCardPopup.setEventListeners();
editProfilePopup.setEventListeners();

const profileFormValidation = new FormValidator(config, popupProfileForm);
const cardFormValidation = new FormValidator(config, popupCardForm);
profileFormValidation.enableValidation();
cardFormValidation.enableValidation();
