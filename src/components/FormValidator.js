export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._errorInputClass = config.errorInputClass;
    this._inputErrorTextClass = config.inputErrorTextClass;
    this._submitButtonSelector = config.submitButtonSelector;
    this._buttonInvalidClass = config.buttonInvalidClass;
    this._buttonValidClass = config.buttonValidClass;
    this._formElement = formElement;
  }
  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._setSubmitButtonState();

    this._inputsList.forEach((formInput) => {
      this._hideInputError(formInput);
    });
  }

  _setEventListeners() {
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._formButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._setSubmitButtonState();
    this._inputsList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkInputValidity(formInput);
        this._setSubmitButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputsList.some((formInput) => {
      return !formInput.validity.valid;
    });
  }

  _checkInputValidity(formInput) {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
    this._setSubmitButtonState();
  }
  _showInputError(formInput) {
    this._errorElement = this._formElement.querySelector(
      `.${formInput.name}-error`
    );
    this._errorElement.textContent = formInput.validationMessage;
    this._errorElement.classList.add(this._inputErrorTextClass);
    formInput.classList.add(this._errorInputClass);
  }
  _hideInputError(formInput) {
    this._errorElement = this._formElement.querySelector(
      `.${formInput.name}-error`
    );
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._inputErrorTextClass);
    formInput.classList.remove(this._errorInputClass);
  }
  _setSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this._formButton.setAttribute('disabled', true);
      this._formButton.classList.add(this._buttonInvalidClass);
    } else {
      this._formButton.removeAttribute('disabled');
      this._formButton.classList.remove(this._buttonInvalidClass);
    }
  }
}
