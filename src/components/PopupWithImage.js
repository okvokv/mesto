import Popup from '../components/Popup.js';
export default class PopupWithImage extends Popup {
	constructor(popupType) {
		super(popupType);
		this._popupType = popupType;
		this._largeImage = this._popupType.querySelector('.popup__image');
		this._largeImageText = this._popupType.querySelector('.popup__image-text');
	}

	handleImageClick = (_cardData) => {
		//заполнение
		this._largeImage.src = _cardData.link;
		this._largeImage.alt = _cardData.name;
		this._largeImageText.textContent = _cardData.name;
		super.open();
	}

}