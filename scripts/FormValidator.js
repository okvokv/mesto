export default class FormValidator {
	constructor(form, config) {
		this._form = form;
		this._config = config;
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
	_determineFormValidity() {
		return this._fields.every(_field => {
			return _field.validity.valid;
		});
	};

	//переключение состояния кнопки <Сохранить>
	_setSubmitBtnState() {
		if (this._determineFormValidity()) {
			this._button.removeAttribute('disabled', true);
			this._button.classList.remove(this._config.submitBtnEltDisabled);
		} else {
			this._button.setAttribute('disabled', true);
			this._button.classList.add(this._config.submitBtnEltDisabled);
		};
	};

	//агрегатор методов
	enableFormValidation() {
		this._fields = [...this._form.querySelectorAll(this._config.formField)];
		this._button = this._form.querySelector(this._config.submitBtnElt);
		//установка начальных параметров кнопки
		this._button.setAttribute('disabled', true);
		this._button.classList.add(this._config.submitBtnEltDisabled);

		this._fields.forEach(_field => {
			//установка начальных параметров поля
			_field.classList.remove(this._config.formFieldError);
			const _errorSpan = this._form.querySelector(`#${_field.name}-error`);
			if (this._form.name === "editForm"){ 
			_errorSpan.textContent = ''};
			//установка проверки валидности ввода
			_field.addEventListener('input', () => {
				this._errorSpan = this._form.querySelector(`#${_field.name}-error`);
				//определить валидность поля
				this._determineFieldValidity(_field);
				//переключение состояния кнопки
				this._setSubmitBtnState();
			});
		});
	};

}
