//Определение констант и переменных
const profileElt = document.querySelector('.profile');
const editBtnElt = profileElt.querySelector('.profile__edit-button');
const addBtnElt = profileElt.querySelector('.profile__add-button');

const gridObj = document.querySelector('.elements__grid');

const pupFormNodeList = document.querySelectorAll('.popup');
const pupEditForm = document.querySelector('.popup_type_edit');
const pupAddForm = document.querySelector('.popup_type_add');
const pupImgForm = document.querySelector('.popup_type_img');

const closeBtnEditElt = pupEditForm.querySelector('.popup__close-button');
const closeBtnAddElt = pupAddForm.querySelector('.popup__close-button');
const closeBtnImgElt = pupImgForm.querySelector('.popup__close-button');

let pupImgElt = pupImgForm.querySelector('.popup__image');
let pupImgCaptionElt = pupImgForm.querySelector('.popup__image-caption')

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
	let imgElt = newCard.querySelector('.element__image');
	let captionTextElt = newCard.querySelector('.element__text');
	const icnBtnElt = newCard.querySelector('.element__icon-button');
	const trashBtnElt = newCard.querySelector('.element__trash-button');

	//замена значений 
	imgElt.src = cardLinkElt;
	imgElt.alt = 'фото ' + cardTextElt;
	captionTextElt.textContent = cardTextElt;

	//проверка нажатия на открытие большой картинки
	imgElt.addEventListener('click', () => {
		//замена значений
		pupImgElt.src = imgElt.src;
		pupImgCaptionElt.textContent = imgElt.closest('.element').textContent;
		pupOpened(2);
	});

	icnBtnElt.addEventListener('click', () => {
		icnBtnElt.classList.toggle('element__icon-button_active');
	});

	trashBtnElt.addEventListener('click', () => {
		trashBtnElt.closest('.element').remove();
	});

	gridObj.prepend(newCard);
};

//-------------------------------------------------------------------------
//Форма редактирования профиля
const formEditElt = pupEditForm.querySelector('.form');
let nameElt = formEditElt.querySelector('[name="first"]');
let descriptionElt = formEditElt.querySelector('[name="second"]');

//Форма добавления контента 
const formAddElt = pupAddForm.querySelector('.form');
let captionTextElt = formAddElt.querySelector('[name="first"]');
let linkElt = formAddElt.querySelector('[name="second"]');

//------------------------------------------------------------------------
//Определение функции для закрытия всплывающего окна
const pupFormArr = Array.from(pupFormNodeList);
let pupClosed = function (i) {
	pupFormArr[i].classList.remove('popup_opened');
	return;
};

//Определение функции открытия всплывающего окна 
let pupOpened = function (i) {
	pupFormArr[i].classList.add('popup_opened');
	return;
};

//----------------------------------------------------------------------
//Определение функции открытия всплывающего окна редактирования профиля
let pupEditOpened = function () {
	//заполнение полей
	nameElt.value = prflNameElt.textContent;
	descriptionElt.value = prflDescriptionElt.textContent;
	pupOpened(0);
};

//-------------------------------------------------------------------------
//Определение функции открытия всплывающего окна добавления контента
let pupAddOpened = function () {
	captionTextElt.value = '';
	linkElt.value = '';
	pupOpened(1);
};

//----------------------------------------------------------------------
//Определение функции для открывания большой картинки из картинок в HTML д-те
//let imgsNodeList = document.querySelectorAll('.element__image');
//const imgArr = Array.from(imgsNodeList);
//imgArr.forEach((imgElt, index) => {
//imgElt.addEventListener('click', () => {
//замена значений
//pupImgElt.src = imgElt.src;
//pupImgCaptionElt.textContent = imgElt.closest('.element').textContent;
//pupOpened(2);
//});
//});

//----------------------------------------------------------------------------
//Проверка нажатия на кнопкe <Нравится> и реакция 
//let icnBtnsNodeList = document.querySelectorAll('.element__icon-button');
//const icnBtnsArr = Array.from(icnBtnsNodeList);
//icnBtnsArr.forEach((icnBtnElt, index) => {
//const icnBtnElt = gridObj.querySelector('.element__icon-button');
//icnBtnElt.addEventListener('click', () => {
//icnBtnElt.classList.toggle('element__icon-button_active');
//});
//});

//Проверка нажатия на кнопкe <Удалить> и реакция
//let trashBtnsNodeList = document.querySelectorAll('.element__trash-button');
//const trashBtnsArr = Array.from(trashBtnsNodeList);
//trashBtnsArr.forEach((trashBtnElt, index) => {
//trashBtnElt.addEventListener('click', () => {
//trashBtnElt.closest('.element').remove();
//});
//});

//----------------------------------------------------------------------------
//Определение функции отправки содержания формы редактирования профиля (event eq. submit)
let formEditSubmit = function (event) {
	event.preventDefault();
	// замена значений 
	prflNameElt.textContent = nameElt.value;
	prflDescriptionElt.textContent = descriptionElt.value;
	pupClosed(0);
	//отключить проверку нажатия на кнопку Закрыть и Сохранить
};

//----------------------------------------------------------------------------
//Определение функции отправки содержания формы добавления контента
let formAddSubmit = function (event) {
	event.preventDefault();
	newCardCreate(captionTextElt.value, linkElt.value);
	pupClosed(1);
	//отключить проверку нажатия на кнопку <Закрыть> и <Сохранить>
};

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

//----------------------------------------------------------------------------
//Проверка нажатия на кнопки открытия форм 
editBtnElt.addEventListener('click', pupEditOpened);
addBtnElt.addEventListener('click', pupAddOpened);

//Если форма открыта (проверка открытия формы):
//отключить проверки нажатия на кнопки открытия формы
//editBtnElt.removeEventListener();
//addBtnElt.removeEventListener();

//Проверка нажатия на кнопку <Закрыть>
closeBtnEditElt.addEventListener('click', pupFormArr[0].classList.remove('popup_opened'));
closeBtnAddElt.addEventListener('click', pupFormArr[1].classList.remove('popup_opened'));
closeBtnImgElt.addEventListener('click', pupFormArr[2].classList.remove('popup_opened'));
//Рабочая зона-----------------------------------------------------
//---------------------------------------------------------------------
//Определение функции маркирования картинки

//	const gridElt = document.createElement('li');
	//  gridElt.classList.add('element');

	//	const imgElt = document.createElement('img');
	//	imgElt.classList.add('element__image');
	//	imgElt.textContent = captionTextElt;