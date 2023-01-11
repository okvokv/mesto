export default class Section {
	constructor(items, renderer, container) {
		this._items = items;
		this._renderer = renderer
		this._container = container;
	}

	//чтение данных карточек из массива, сборка элемента и добавление в таблицу
	addItems() {
		this._items.forEach((_item, index) => {
			this.addItem(_item, true)
		});
	}

	//добавление карточки в таблицу
	addItem(_cardData, _innerArr = false) {
		//сборка 
		const _newCard = this._renderer(_cardData);
		//добавление в таблицу
		_innerArr ?
			this._container.append(_newCard) :
			this._container.prepend(_newCard);
	};

}