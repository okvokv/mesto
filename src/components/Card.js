export default class Card {
	constructor(handleImageClick) {
		this._cardTemplate = document.querySelector('.card-template').content;
		this._handleImageClick = handleImageClick;
	}

	//клонирование шаблона
	_cloneTemplate = () => {
		this._newCard = this._cardTemplate.querySelector('.element').cloneNode(true);
	}

	//заполнение копии шаблона
	_fillNewCard = () => {
		this._newImage = this._newCard.querySelector('.element__image');
		this._newImageText = this._newCard.querySelector('.element__text');
		this._newImage.src = this._item.link;
		this._newImage.alt = 'фото: ' + this._item.name;
		this._newImageText.textContent = this._item.name;
	};

	//присоединение проверки нажатия на кнопку <Like>
	_setIcnButtonListener = () => {
		const _icnButton = this._newCard.querySelector('.element__icon-button');
		_icnButton.addEventListener('click', () => _icnButton.classList.toggle('element__icon-button_active'))
	};

	//присоединение проверки нажатия на кнопку <Удалить> 
	_setTrashButtonListener = () => {
		const _trashButton = this._newCard.querySelector('.element__trash-button');
		_trashButton.addEventListener('click', () => {
			_trashButton.closest('.element').remove();
		})
	};

	//присоединение проверки нажатия на картинку
	_setNewImgListener = (_item) => {
		this._newImage.addEventListener('click', () => this._handleImageClick(_item))
	};

	//сборка новой карточки
	createNewCard = (_item) => {
		this._item = _item;
		this._cloneTemplate();
		this._fillNewCard();
		this._setIcnButtonListener();
		this._setTrashButtonListener();
		this._setNewImgListener(_item);
		return this._newCard;
	};

}