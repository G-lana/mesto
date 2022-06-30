const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__job');

const formElement = popupElement.querySelector('.popup__container');
const popupNameInputElement = formElement.querySelector('.popup__input_type_name');
const popupJobInputElement = formElement.querySelector('.popup__input_type_job');

function openPopup() {
    popupElement.classList.add('popup_opened');
    popupNameInputElement.value = profileName.textContent;
    popupJobInputElement.value = profileJob.textContent;
}
function closePopup() {
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
