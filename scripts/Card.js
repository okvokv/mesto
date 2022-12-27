export default class Card {
	constructor(cardTextElt, cardLinkElt, cardTemplate, popupLargeImage, largeImageText, imagePopup, openPopup) {
		this._cardText = cardTextElt;
		this._cardLink = cardLinkElt;
		this._cardTemplate = cardTemplate;
		this._popupLargeImage = popupLargeImage;
		this._largeImageText = largeImageText;
		this._imagePopup = imagePopup;
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

	//присоединение проверки нажатия на картинку и кнопку <Удалить> 
	_setNewImgListener() {
		this._newImg.addEventListener('click', () => {
			//заполнение
			this._popupLargeImage.src = this._newImg.src;
			this._popupLargeImage.alt = this._newImg.alt;
			this._largeImageText.textContent = this._newImgText.textContent;

			this._openPopup(this._imagePopup);
		});
	};

	//сборка новой карточки
	createNewCard = (_newCard) => {
		this._cloneTemplate();
		this._fillNewCard();
		this._setIcnButtonListener();
		this._setTrashButtonListener();
		this._setNewImgListener();
		return this._newCard;
	};

}
