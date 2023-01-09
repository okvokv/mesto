import Popup from '../components/Popup.js'
export default class PopupWithForm extends Popup {
	constructor(popupType, submitForm) {
		super(popupType);
		this._popupType = popupType;
		this._form = this._popupType.querySelector('.form');
		this._fields = this._form.querySelectorAll('.form__field');
		this._submitForm = submitForm;
	}

	//получение данных из формы
	_getInputValues() {
		this._formData = {};
		this._fields.forEach(field => {
			this._formData[field.name] = field.value
		});
		return this._formData;
	}

	//проверка нажатия на кнопку <Submit>
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (event) => {
			event.preventDefault();
			this._submitForm(this._getInputValues());
		});
	};

	close() {
		this._form.reset();
		super.close();
	}
}