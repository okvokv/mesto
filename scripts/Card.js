export default class Card {
	constructor(cardTextElt, cardLinkElt, cardTemplate, openPopup) {
		this._cardText = cardTextElt;
		this._cardLink = cardLinkElt;
		this._cardTemplate = cardTemplate;
		this._openPopup = openPopup;
	}

	//клонирование шаблона
	_cloneTemplate = () => {
		this._newCard = this._cardTemplate.querySelector('.element').cloneNode(true);
		return this._newCard;
	}

	//заполнение копии шаблона
	_fillNewCard = () => {
		this._newImg = this._newCard.querySelector('.element__image');
		this._newImgText = this._newCard.querySelector('.element__text');

		this._newImg.src = this._cardLink;
		this._newImg.alt = 'фото: ' + this._cardText;
		this._newImgText.textContent = this._cardText;
	};

	//присоединение проверки нажатия на кнопку <Like>
	_setIcnButtonListener = () => {
		this._icnButton = this._newCard.querySelector('.element__icon-button');
		this._icnButton.addEventListener('click', () => {
			this._icnButton.classList.toggle('element__icon-button_active');
		});
	};

	//присоединение проверки нажатия на кнопку <Удалить> 
	_setTrashButtonListener = () => {
		this._trashButton = this._newCard.querySelector('.element__trash-button');
		this._trashButton.addEventListener('click', () => {
			this._newCard.remove();
		});
	};

	//присоединение проверки нажатия на картинку
	_setNewImgListener() {
		const _imagePopup = document.querySelector('.popup_type_img');
		const _popupLargeImage = _imagePopup.querySelector('.popup__image');
		const _largeImageText = _imagePopup.querySelector('.popup__image-caption');

		this._newImg.addEventListener('click', () => {
			//заполнение
			_popupLargeImage.src = this._newImg.src;
			_popupLargeImage.alt = this._newImg.alt;
			_largeImageText.textContent = this._newImgText.textContent;
			this._openPopup(_imagePopup);
		});
	};
//открытие всплывающего окна с большой картинкой

	//сборка новой карточки
	createNewCard = () => {
		this._cloneTemplate();
		this._fillNewCard();
		this._setIcnButtonListener();
		this._setTrashButtonListener();
		this._setNewImgListener();
		return this._newCard;
	};

};
