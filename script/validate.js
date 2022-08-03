const editForm = {
  form: '.popup__form[name="editForm"]',
  input: '.popup__input',
  button: '.popup__button',
  buttonInvalid: 'popup__button_invalid',
};
const addForm = {
  form: '.popup__form[name="addForm"]',
  input: '.popup__input',
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
    showInputError(input);
  } else {
    hideInputError(input);
  }
  setSubmitButtonState(form, config);
}

function showInputError(input) {
  const errorElement = input.nextElementSibling;
  input.classList.add('popup__input_type_error');
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add('popup__input-error_active');
}

function hideInputError(input) {
  const errorElement = input.nextElementSibling;
  input.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__input-error_active');
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
  let inputSelector;
  if (modalId === 'editProfile') {
    inputSelector = editForm.input;
  } else if (modalId === 'addCard') {
    inputSelector = addForm.input;
  } else {
    return;
  }
  const inputList = Array.from(document.querySelectorAll(inputSelector));

  inputList.forEach((input) => {
    hideInputError(input);
  });
}

enableValidation(editForm);
enableValidation(addForm);
