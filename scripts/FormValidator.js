export default class FormValidator {
	constructor(form, config) {
		this._form = form;
		this._config = config;
		this._fields = [...this._form.querySelectorAll(this._config.formField)];
		this._button = this._form.querySelector(this._config.formSubmitBtn);
	}

	//включение видимости сообщения об ошибке
	_showErrorMessage(_field) {
		//this._errorSpan.classList.add(this._config.errorMessVisible);
		//подчеркнуть и вывести в форму браузерное сообщение об ошибке
		_field.classList.add(this._config.formFieldError);
		this._errorSpan.textContent = _field.validationMessage;
	};

	//выключение видимости сообщения об ошибке
	_hideErrorMessage(_field) {
		//this._errorSpan.classList.remove(this._config.errorMessVisible);
		//сброс подчёркивания и сообщения об ошибке
		_field.classList.remove(this._config.formFieldError);
		this._errorSpan.textContent = '';
	};

	//определение валидности поля и включение/выключение сообщения об ошибке
	_determineFieldValidity(_field) {
		if (_field.validity.valid) {
			this._hideErrorMessage(_field);
		} else {
			this._showErrorMessage(_field);
		}
	};

	//определение валидности формы в целом
	_determineFormValidity(_field) {
		return this._fields.every(_field => {
			return _field.validity.valid;
		});
	};

	//удаление предыдущих сообщений об ошибке при открытии формы
	delFormErrorMessages() {
			this._fields.forEach(_field => {
			this._errorSpan = this._form.querySelector(`#${_field.name}-error`);
			this._hideErrorMessage(_field);
		});
	};

	//сделать кнопку активной
	_enableSubmitButton() {
		this._button.removeAttribute('disabled', true);
		this._button.classList.remove(this._config.formSubmitBtnDisabled);
	}

	//отключить кнопку
	disableSubmitButton() {
		this._button.setAttribute('disabled', true);
		this._button.classList.add(this._config.formSubmitBtnDisabled);
	}

	//переключение состояния кнопки <Сохранить>
	_toggleButtonState() {
		if (this._determineFormValidity()) {
			this._enableSubmitButton();
		} else {
			this.disableSubmitButton();
		};
	};

	//агрегатор методов
	enableFormValidation() {
		//установка проверки валидности ввода		
		this._fields.forEach(_field => {
			_field.addEventListener('input', () => {
				this._errorSpan = this._form.querySelector(`#${_field.name}-error`);
				//определить валидность поля
				this._determineFieldValidity(_field);
				//переключение состояния кнопки
				this._toggleButtonState();
			});
		});
	};

}
