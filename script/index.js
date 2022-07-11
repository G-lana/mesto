const popupElement = document.querySelectorAll('.popup');
const popupCloseButtonElement = document.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');

const formElement = document.querySelectorAll('.popup__container');
const popupNameInputElement = document.querySelector('.popup__input_type_name');
const popupJobInputElement = document.querySelector('.popup__input_type_job');

const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupTitleInputElement = document.querySelector('.popup__input_type_title');
const popupLinkInputElement = document.querySelector('.popup__input_type_link');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Кабардино-Балкария',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Домбай',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Карачаево-Черкессия',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Ингушетия',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Дагестан',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function openPopup(index) {
  popupElement[index].classList.add('popup_opened');
  popupNameInputElement.value = profileName.textContent;
  popupJobInputElement.value = profileJob.textContent;
};
function closePopup() {
  popupElement.classList.remove('popup_opened');
}
popupOpenButtonElement.addEventListener('click', () => openPopup(0));
popupAddButtonElement.addEventListener('click', () => openPopup(1));
popupCloseButtonElement.addEventListener('click', () => closePopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInputElement.value; 
    profileJob.textContent = popupJobInputElement.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
