export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  errorInputClass: 'popup__input_type_error',
  inputErrorTextClass: 'popup__input-error_active',
  submitButtonSelector: '.popup__button',
  buttonInvalidClass: 'popup__button_invalid',
  buttonValidClass: 'popup__button_valid',
};

export const cardsList = document.querySelector('.places');
export const popupProfileForm = document.querySelector('#editProfileForm');
export const popupCardForm = document.querySelector('#addCardForm');
export const popupAvatarForm = document.querySelector('#profileAvatar');
export const popupDeleteCard = document.querySelector('#deletionConfirmation');
export const popupAvatarOpenButton = document.querySelector(
  '.profile__avatar-button'
);
export const popupProfileOpenButton = document.querySelector(
  '.profile__edit-button'
);
export const popupCardOpenButton = document.querySelector(
  '.profile__add-button'
);
export const popupNameInputElement = document.querySelector(
  '.popup__input_type_name'
);
export const popupJobInputElement = document.querySelector(
  '.popup__input_type_job'
);
