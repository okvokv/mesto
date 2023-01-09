import Popup from '../components/Popup.js';
export default class PopupWithImage extends Popup {
	constructor(popupType) {
		super(popupType);
		this._popupType = popupType;
		this._largeImage = this._popupType.querySelector('.popup__image');
		this._largeImageText = this._popupType.querySelector('.popup__image-text');
	}

	handleImageClick = (_item) => {
		//заполнение
		this._largeImage.src = _item.link;
		this._largeImage.alt = _item.name;
		this._largeImageText.textContent = _item.name;
		super.open();
	}

}