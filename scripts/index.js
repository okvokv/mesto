//Определение констант и переменных
const profileElt = document.querySelector('.profile');
const editBtnElt = profileElt.querySelector('.profile__edit-button');
const addBtnElt = profileElt.querySelector('.profile__add-button');

let gridObj = document.querySelector('.elements__grid');
let imgElt = gridObj.querySelector('.element__image');
let icnBtnElt = gridObj.querySelector('.element__icon-button');
const trashBtnElt = gridObj.querySelector('.element__trash-button');


const pupEditForm = document.querySelector('.popup__window_type_edit');
const pupAddForm = document.querySelector('.popup__window_type_add');
const pupImgForm = document.querySelector('.popup__window_type_img');

let pupImgElt = pupImgForm.querySelector('.popup__image');
let pupImgCaptionElt = pupImgForm.querySelector('.popup__image-caption')

const closeBtnEditElt = pupEditForm.querySelector('.popup__close-button');
const closeBtnAddElt = pupAddForm.querySelector('.popup__close-button');
const closeBtnImgElt = pupImgForm.querySelector('.popup__close-button');

//получение значений для заполнения формы
let prflNameElt = document.querySelector('.profile__title');
let prflDescriptionElt = document.querySelector('.profile__subtitle');

const cardTemplate = document.querySelector('.cardTemplate').content;

//-------------------------------------------------------------------------
//Загрузка дополнительных карточек в таблицу
const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

//Определение функции создания новой карточки
let newCardCreate = function (cardTextElt, cardLinkElt) {
	let newCard = cardTemplate.querySelector('.element').cloneNode(true);
	//замена значений 
	newCard.querySelector('.element__image').src = cardLinkElt;
	newCard.querySelector('.element__image').alt = 'фото ' + cardTextElt;
	newCard.querySelector('.element__text').textContent = cardTextElt;

	gridObj.prepend(newCard);

	imgEltClck();
	icnBtnClck();
	trashBtnClck();
	return newCard;
};

//-------------------------------------------------------------------------
//Форма редактирования профиля
let formEditElt = pupEditForm.querySelector('.form');
let nameElt = formEditElt.querySelector('[name="first"]');
let descriptionElt = formEditElt.querySelector('[name="second"]');

//Форма добавления контента 
let formAddElt = pupAddForm.querySelector('.form');
let captionTextElt = formAddElt.querySelector('[name="first"]');
let linkElt = formAddElt.querySelector('[name="second"]');

//----------------------------------------------------------------------
//Определение функции для открывания большой картинки
let imgEltClck = function () {
	let imgsNodeList = document.querySelectorAll('.element__image');
	const imgArr = Array.from(imgsNodeList);
	imgArr.forEach((imgElt, index) => {
		imgElt.addEventListener('click', () => {
			//замена значений
			pupImgElt.src = imgElt.src;
			pupImgCaptionElt.textContent = imgElt.closest('.element').textContent;
			pupImgForm.classList.add('popup_opened');
		});
	});
};
imgEltClck();

//Определение функции для закрытия большой картинки
let pupImgClosed = function () {
	pupImgForm.classList.remove('popup_opened');
};

//----------------------------------------------------------------------------
//Проверка нажатия на кнопкe <Нравится> и реакция 
let icnBtnClck = function () {
	let icnBtnsNodeList = document.querySelectorAll('.element__icon-button');
	const icnBtnsArr = Array.from(icnBtnsNodeList);
	icnBtnsArr.forEach((icnBtnElt, index) => {
		icnBtnElt.addEventListener('click', () => {
			icnBtnElt.classList.toggle('element__icon-button_active');
		});
	});
};
icnBtnClck();

//Проверка нажатия на кнопкe <Удалить> и реакция
let trashBtnClck = function () {
	let trashBtnsNodeList = document.querySelectorAll('.element__trash-button');
	const trashBtnsArr = Array.from(trashBtnsNodeList);
	trashBtnsArr.forEach((trashBtnElt, index) => {
		trashBtnElt.addEventListener('click', () => {
			trashBtnElt.closest('.element').remove();
		});
	});
};
trashBtnClck();

//---------------------------------------------------------------------
//Определение функции открытия всплывающего окна редактирования профиля
let pupEditOpened = function () {
	pupEditForm.classList.add('popup_opened');
	//задание содержания полей формы 
	fieldEditFirst.value = nameElt.textContent;
	fieldEditSecond.value = descriptionElt.textContent;
};

//Определение функции закрытия всплывающего окна редактирования профиля
let pupEditClosed = function () {
	pupEditForm.classList.remove('popup_opened');
};
//-------------------------------------------------------------------------

//Определение функции открытия всплывающего окна добавления контента
let pupAddOpened = function () {
	pupAddForm.classList.add('popup_opened');
};

//Определение функции закрытия всплывающего окна добавления контента
let pupAddClosed = function () {
	pupAddForm.classList.remove('popup_opened');
};

//----------------------------------------------------------------------------
//Определение функции отправки содержания формы редактирования профиля (event eq. submit)
let formEditSubmit = function (event) {
	event.preventDefault();
	// замена значений 
	prflNameElt.textContent = nameElt.value;
	prflDescriptionElt.textContent = descriptionElt.value;
	pupEditClosed();

	//отключить проверку нажатия на кнопку Закрыть и Сохранить
};

//----------------------------------------------------------------------------
//Определение функции отправки содержания формы добавления контента
let formAddSubmit = function (event) {
	event.preventDefault();
	newCardCreate(captionTextElt.value, linkElt.value);
	pupAddClosed();
	//отключить проверку нажатия на кнопку <Закрыть> и <Сохранить>

};

//----------------------------------------------------------------------------
//Проверка нажатия на кнопки открытия форм 
editBtnElt.addEventListener('click', pupEditOpened);
addBtnElt.addEventListener('click', pupAddOpened);

//Если форма открыта (проверка открытия формы): 
//отключить проверки нажатия на кнопки открытия формы 
//editBtnElt.removeEventListener();
//addBtnElt.removeEventListener();

//----------------------------------------------------------------------------
//проверка нажатия на кнопку <Закрыть>
closeBtnEditElt.addEventListener('click', pupEditClosed);
closeBtnAddElt.addEventListener('click', pupAddClosed);
closeBtnImgElt.addEventListener('click', pupImgClosed);


//-----------------------------------------------------------------------------
//проверка нажатия на кнопку <Сохранить>
formEditElt.addEventListener('submit', formEditSubmit);
formAddElt.addEventListener('submit', formAddSubmit);
//event.target.setAttribute('disabled', true); сделать кнопку неактивной

//-----------------------------------------------------------------------

//Определение функции добавления карточек из списка
initialCards.reverse().forEach((newCard, index) => {
	cardTextElt = initialCards[index].name;
	cardLinkElt = initialCards[index].link;
	newCardCreate(cardTextElt, cardLinkElt);
	return newCard;
});

//Рабочая зона-----------------------------------------------------
//---------------------------------------------------------------------
//Определение функции маркирования картинки
//let icnBtnFilled = function () {
//	icnBtnElt.classList.closest('element__icon-button').toggle('element__icon-button_active')
//};

//Определение функции удаления картинки
//let imgDel = function () {
//	let gridElt = trashBtnElt.closest('.element').remove();
//};

//	const gridElt = document.createElement('li');
	//  gridElt.classList.add('element');

	//	let trashBtnElt = document.createElement('button');
	//	trashBtnElt.classList.add('element__trash-button');

	//	const imgElt = document.createElement('img');
	//	imgElt.classList.add('element__image');
	//	imgElt.textContent = captionTextElt;

	//	const divElt = document.createElement('div');
	//  divElt.classList.add('element__caption');

	//	const captionTextElt = document.createElement('h2');
	//	captionTextElt.classList.add('element__text');

	//	let icnBtnElt = document.createElement('button');
	//	icnBtnElt.classList.add('element__icon-button');