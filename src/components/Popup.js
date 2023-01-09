export default class Popup {
	constructor(popupType) {
		this._popupType = popupType;
	}

	//реакция на нажатие <Esc>
	_handleEscClose = (event) => {
		if (event.key === 'Escape') this.close()
	};

	//открытие всплывающего окна 
	open() {
		this._popupType.classList.add('popup_opened');
		//проверка нажатия на кнопку <Esc>
		document.addEventListener('keydown', this._handleEscClose);
	};

	//закрытие всплывающего окна
	close() {
		this._popupType.classList.remove('popup_opened');
		//снятие слушателя
		document.removeEventListener('keydown', this._handleEscClose);
	};

	//проверка нажатия на кнопку <Закрыть> и внешнюю часть всплывающего окна
	setEventListeners() {
		this._popupType.addEventListener('click', (event) => {
			if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
				this.close()};
		});
	};

	//setEventListeners() {
	//this._button.addEventListener('click', (event) => {
	//if (event.target.closest('popup_opened') || event.target.classList.contains('popup__close-button')) {
	//this.close();
	//}
	//});
	//};

};