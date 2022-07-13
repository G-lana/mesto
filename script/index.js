const popupElement = document.querySelectorAll('.popup');
const popupEditCloseButtonElement = document.querySelector('#close_editProfile');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');

const formElement = document.querySelectorAll('.popup__container');
const popupNameInputElement = document.querySelector('.popup__input_type_name');
const popupJobInputElement = document.querySelector('.popup__input_type_job');

const popupAddButtonElement = document.querySelector('.profile__add-button');
const popupAddCloseButtonElement = document.querySelector('#close_addCard');
const popupTitleInputElement = document.querySelector('.popup__input_type_title');
const popupLinkInputElement = document.querySelector('.popup__input_type_link');

const popupCardImage = document.querySelector('.popup__image');
const popupCardImageCaption = document.querySelector('.popup__caption');
const popupImageClose = document.querySelector('#close_popup-image');

const cardsList = document.querySelector('.places');



function openPopup(index) {
  popupElement[index].classList.add('popup_opened');
  popupNameInputElement.value = profileName.textContent;
  popupJobInputElement.value = profileJob.textContent;
};
function closePopup(index) {
  popupElement[index].classList.remove('popup_opened');
};

popupOpenButtonElement.addEventListener('click', () => openPopup(0));
popupAddButtonElement.addEventListener('click', () => openPopup(1));
popupEditCloseButtonElement.addEventListener('click', () => closePopup(0));
popupAddCloseButtonElement.addEventListener('click', () => closePopup(1));
popupImageClose.addEventListener('click', () => closePopup(2));



function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInputElement.value; 
    profileJob.textContent = popupJobInputElement.value;
    closePopup(0);
}
formElement[0].addEventListener('submit', formSubmitHandler);



function createCard(name, link) {
  const template = document.querySelector('.card-template').content.querySelector('.place').cloneNode(true);
  template.querySelector('.place__title').textContent = name;
  template.querySelector('.place__image').src = link;
  template.querySelector('.place__image').alt = name;

  template.querySelector('.place__delete').addEventListener('click', () => {template.remove(); });
  template.querySelector('.place__like').addEventListener('click', event => { event.target.classList.toggle('place__like_type_active');});
  template.querySelector('.place__image').addEventListener('click', function(){
    openPopup(2);
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardImageCaption.textContent = name;
  });

  cardsList.prepend(template);
}

function addEventListeners() {

  formElement[1].addEventListener('submit', function(event) {
    event.preventDefault();
  createCard(popupTitleInputElement.value, popupLinkInputElement.value);

  closePopup(1);
  })
}
function createInitialCards() {
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

  initialCards.forEach (element => createCard(element.name, element.link));
  };


addEventListeners();
createInitialCards()