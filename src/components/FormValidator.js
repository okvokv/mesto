export default class FormValidator {
	constructor(form, config) {
		this._form = form;
		this._config = config;
		this._fields = [...this._form.querySelectorAll(this._config.formField)];
		this._button = this._form.querySelector(this._config.formSubmitBtn);
	}

	//включение видимости сообщения об ошибке
	_showErrorMessage() {
		this._errorSpan = this._form.querySelector(`#${this._field.name}-error`);
		//вывести в форму браузерное сообщение об ошибке и подчёркивание
		//this._errorSpan.classList.add(this._config.errorMessVisible);
		this._errorSpan.textContent = this._field.validationMessage;
		this._field.classList.add(this._config.formFieldError);
	};

	//выключение видимости сообщения об ошибке
	_hideErrorMessage() {
		this._errorSpan = this._form.querySelector(`#${this._field.name}-error`);
		//сброс сообщения об ошибке и подчёркивания
		//this._errorSpan.classList.remove(this._config.errorMessVisible);
		this._errorSpan.textContent = '';
		this._field.classList.remove(this._config.formFieldError);
	};

	//определение валидности поля и включение/выключение сообщения об ошибке
	_determineFieldValidity() {
		this._field.validity.valid ?
			this._hideErrorMessage() :
			this._showErrorMessage();
	};

	//определение валидности формы в целом
	_determineFormValidity() {
		return this._fields.every(_field => {
			return _field.validity.valid;
		});
	};

	//удаление предыдущих сообщений об ошибке при открытии формы
	delFormErrorMessages() {
		this._fields.forEach(_field => {
			this._field = _field;
			this._hideErrorMessage();
		});
	};

	//сделать кнопку активной
	_enableSubmitButton() {
		this._button.disabled = 0;
		this._button.classList.remove(this._config.formSubmitBtnDisabled);
	}

	//отключить кнопку
	disableSubmitButton() {
		this._button.disabled = 1;
		this._button.classList.add(this._config.formSubmitBtnDisabled);
	}

	//переключение состояния кнопки <Сохранить>
	_toggleButtonState() {
		this._determineFormValidity() ?
			this._enableSubmitButton() :
			this.disableSubmitButton();
	};

	//агрегатор методов
	enableFormValidation() {
		//установка проверки валидности ввода		
		this._fields.forEach(_field => {
			_field.addEventListener('input', () => {
				this._field = _field;
				//определить валидность поля
				this._determineFieldValidity();
				//переключение состояния кнопки
				this._toggleButtonState();
			});
		});
	};

}