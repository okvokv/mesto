export default class Card {
	constructor(cardData, cardTemplate, handleImageClick) {
		this._cardData = cardData;
		this._cardTemplate = cardTemplate;
		this._handleImageClick = handleImageClick;
	}

	//клонирование шаблона
	_cloneTemplate() {
		this._newCard = this._cardTemplate.querySelector('.element').cloneNode(true);
	}

	//заполнение копии шаблона
	_fillNewCard() {
		this._newImage = this._newCard.querySelector('.element__image');
		this._newImageText = this._newCard.querySelector('.element__text');
		this._newImage.src = this._cardData.link
		this._newImage.alt = 'фото: ' + this._cardData.name;
		this._newImageText.textContent = this._cardData.name;
	};

	_toggleIcn = (_icnButton) => {
		_icnButton.classList.toggle('element__icon-button_active');
	}
	//присоединение проверки нажатия на кнопку <Like>
	_setIcnButtonListener() {
		const _icnButton = this._newCard.querySelector('.element__icon-button');
		_icnButton.addEventListener('click', () => this._toggleIcn(_icnButton))
	};

	_deleteCard = (_trashButton) => {
		_trashButton.closest('.element').remove();
	}
	//присоединение проверки нажатия на кнопку <Удалить> 
	_setTrashButtonListener() {
		const _trashButton = this._newCard.querySelector('.element__trash-button');
		_trashButton.addEventListener('click', () => this._deleteCard(_trashButton))
	};

	//присоединение проверки нажатия на картинку
	_setNewImgListener = (_cardData) => {
		this._newImage.addEventListener('click', () =>
			this._handleImageClick(_cardData));
	};

	//установка слушателей
	_setEventListeners(_cardData) {
		this._setIcnButtonListener();
		this._setTrashButtonListener();
		this._setNewImgListener(_cardData);
	}

	//сборка новой карточки
	createNewCard = (_cardData) => {
		this._cardData = _cardData;
		this._cloneTemplate();
		this._fillNewCard();
		this._setEventListeners(_cardData);
		return this._newCard;
	};

}