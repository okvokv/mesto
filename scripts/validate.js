//Валидация форм
const config = (
  {
    formElt: '.form',
    formField: '.form__field',
    errorMessage: '.form__error-message',
    errorMessVisible: 'form__error-message_visible',
    submitBtnElt: '.form__submit-button',
    submitBtnEltDisabled: 'form__submit-button_disabled'
  }
);

//Функция добавления класса видимости сообщения об ошибке
function showErrorMessage(field, error, config) {
  //error.classList.add(config.errorMessVisible);
  //подчеркнуть и вывести в форму браузерное сообщение об ошибке
  field.style.borderBottom = '1px solid rgba(248, 4, 4, 1)';
  error.textContent = field.validationMessage;
};

//Функция удаления класса видимости сообщения об ошибке
function hideErrorMessage(field, error, config) {
  //error.classList.remove(config.errorMessVisible);
  //сброс подчёркивания и сообщения об ошибке
  field.style.borderBottom = '1px solid rgba(0, 0, 0, 0.2)';
  error.textContent = '';
};

//Функция проверки валидности поля
function checkFieldValidity(field, error) {
  if (field.validity.valid) {
    hideErrorMessage(field, error, config);
  } else {
    showErrorMessage(field, error, config);
  }
};

//Функция проверки валидности формы
function checkFormValidity(fields) {
  return fields.every((field) => {
    return field.validity.valid
  });
};

//Функция смены состояния кнопки <Сохранить>
function setSubmitBtnState(button, fields, config) {
  if (checkFormValidity(fields)) {
    button.removeAttribute('disabled', true);
    button.classList.remove(config.submitBtnEltDisabled);
  } else {
    button.setAttribute('disabled', true);
    button.classList.add(config.submitBtnEltDisabled);
  };
};

//Функция включения проверки
function enableValidation(config) {
  const forms = [...document.querySelectorAll(config.formElt)];
  forms.forEach(form => {
    const fields = [...form.querySelectorAll(config.formField)];
    const button = form.querySelector(config.submitBtnElt);
    //проверка валидности ввода
    fields.forEach(field => {
      field.addEventListener('input', () => {
        const errorPlace = form.querySelector(`#${field.name}-error`);
        checkFieldValidity(field, errorPlace);
        setSubmitBtnState(button, fields, config);
      });
    });
  });
};

enableValidation(config);