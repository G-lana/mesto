const editForm = {
  form: '.popup__form[name="editForm"]',
  input: '.popup__input',
  errorInput: 'popup__input_type_error',
  inputErrorText: 'popup__input-error_active',
  button: '.popup__button',
  buttonInvalid: 'popup__button_invalid',
};
const addForm = {
  form: '.popup__form[name="addForm"]',
  input: '.popup__input',
  errorInput: 'popup__input_type_error',
  inputErrorText: 'popup__input-error_active',
  button: '.popup__button',
  buttonInvalid: 'popup__button_invalid',
};

function enableValidation(config) {
  const form = document.querySelector(config.form);
  form.addEventListener('input', (event) => handleFormInput(event, config));
}

function handleFormInput(event, config) {
  event.preventDefault();
  const input = event.target;
  const form = event.currentTarget;
  const isValid = input.checkValidity();
  if (!isValid) {
    showInputError(input, config);
  } else {
    hideInputError(input, config);
  }
  setSubmitButtonState(form, config);
}

function showInputError(input, config) {
  const errorElement = input.nextElementSibling;
  input.classList.add(config.errorInput);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.inputErrorText);
}

function hideInputError(input, config) {
  const errorElement = input.nextElementSibling;
  input.classList.remove(config.errorInput);
  errorElement.textContent = '';
  errorElement.classList.remove(config.inputErrorText);
}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.button);
  const isValid = form.checkValidity();
  if (isValid) {
    button.removeAttribute('disabled');
    button.classList.remove(config.buttonInvalid);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(config.buttonInvalid);
  }
}

function clearInputError(modalId) {
  let config;
  if (modalId === 'editProfile') {
    config = editForm;
  } else if (modalId === 'addCard') {
    config = addForm;
  } else {
    return;
  }
  const inputList = Array.from(document.querySelectorAll(config.input));
  inputList.forEach((input) => {
    hideInputError(input, config);
  });
}

enableValidation(editForm);
enableValidation(addForm);
