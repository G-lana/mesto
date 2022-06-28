const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__job');

let formElement = popupElement.querySelector('.popup__container');
let popupNameInputElement = formElement.querySelector('.popup__name');
let popupJobInputElement = formElement.querySelector('.popup__job');

const openPopup = function () {
    popupElement.classList.add('popup_opened');
    popupNameInputElement.value = profileName.textContent;
    popupJobInputElement.value = profileJob.textContent;
}
const closePopup = function () {
    popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = popupNameInputElement.value; 
    profileJob.textContent = popupJobInputElement.value;
    closePopup();
}
formElement.addEventListener('submit', formSubmitHandler);
