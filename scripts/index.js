//Определение констант и переменных
//кнопки
const profileElt = document.querySelector('.profile');
const editBtnElt = profileElt.querySelector('.profile__edit-button');
const addBtnElt = profileElt.querySelector('.profile__add-button');

const gridObj = document.querySelector('.elements__grid');

//всплывающие окна
const pupEdit = document.querySelector('.popup_type_edit');
const pupAdd = document.querySelector('.popup_type_add');
const pupImg = document.querySelector('.popup_type_img');

//кнопки <Закрыть>
const closeBtnsNodeList = document.querySelectorAll('.popup__close-button');

const pupImgElt = pupImg.querySelector('.popup__image');
const pupImgCptnElt = pupImg.querySelector('.popup__image-caption')

//получение значений для заполнения формы
let prflNameElt = profileElt.querySelector('.profile__title');
let prflDescriptionElt = profileElt.querySelector('.profile__subtitle');

const cardTemplate = document.querySelector('.cardTemplate').content;

//Массив карточек для таблицы
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
const createNewCard = function (cardTextElt, cardLinkElt) {

	const newCard = cardTemplate.querySelector('.element').cloneNode(true);
	const imgElt = newCard.querySelector('.element__image');
	const cptnTextElt = newCard.querySelector('.element__text');
	const icnBtnElt = newCard.querySelector('.element__icon-button');
	const trashBtnElt = newCard.querySelector('.element__trash-button');

	//заполнение 
	imgElt.src = cardLinkElt;
	imgElt.alt = 'фото: ' + cardTextElt;
	cptnTextElt.textContent = cardTextElt;

	//проверка нажатия на открытие большой картинки
	imgElt.addEventListener('click', () => {
		//заполнение
		pupImgElt.src = cardLinkElt;
		pupImgElt.alt = imgElt.alt;
		pupImgCptnElt.textContent = cardTextElt;

		openPup(pupImg);
	});
	//проверка нажатия на кнопку <Like>
	icnBtnElt.addEventListener('click', () => {
		icnBtnElt.classList.toggle('element__icon-button_active');
	});
	//проверка нажатия на кнопку <Удалить> 
	trashBtnElt.addEventListener('click', () => {
		trashBtnElt.closest('.element').remove();
	});
	return newCard;
};

//Определение функции добавления карточки в таблицу
const addCard = function (cardTextElt, cardLinkElt) {
	const newCard = createNewCard(cardTextElt, cardLinkElt);
	gridObj.prepend(newCard);
};

//-------------------------------------------------------------------------
//Форма редактирования профиля
const editFormElt = document.forms["EditForm"];
let nameElt = editFormElt.querySelector('[name="first"]');
let descriptionElt = editFormElt.querySelector('[name="second"]');

//Форма добавления контента 
const addFormElt = document.forms["AddForm"];
let cptnTextElt = addFormElt.querySelector('[name="first"]');
let linkElt = addFormElt.querySelector('[name="second"]');

//------------------------------------------------------------------------
//Определение функции открытия всплывающего окна 
function openPup(pupType) {
	pupType.classList.add('popup_opened');
	//проверка нажатия на кнопку <Закрыть>
	closeBtnsNodeList.forEach((closeBtnElt, index) => {
		const pupType = closeBtnElt.closest('.popup');
		closeBtnElt.addEventListener('click', () => {
			shutPup(pupType);
		});
	});
	//editBtnElt.removeEventListener();
	//addBtnElt.removeEventListener();
};
//Определение функции для закрытия всплывающего окна
function shutPup(pupType) {
	pupType.classList.remove('popup_opened');
	closeBtnsNodeList.forEach((closeBtnElt, index) => {
	//closeBtnElt.removeEventListener();
	});
};
//----------------------------------------------------------------------------
//Определение функции отправки содержания формы редактирования профиля (event eq. submit)
const submitEditForm = function (event) {
	event.preventDefault();
	// замена значений 
	prflNameElt.textContent = nameElt.value;
	prflDescriptionElt.textContent = descriptionElt.value;
	shutPup(pupEdit);
	//отключить проверку нажатия на кнопку Закрыть и Сохранить
};

//----------------------------------------------------------------------------
//Определение функции отправки содержания формы добавления контента
const submitAddForm = function (event) {
	event.preventDefault();
	addCard(cptnTextElt.value, linkElt.value);
	event.target.reset();
	shutPup(pupAdd);
};

//Определение функции добавления карточек из массива
initialCards.reverse().forEach((cardElt, index) => {
	const cardTextElt = cardElt.name;
	const cardLinkElt = cardElt.link;
	addCard(cardTextElt, cardLinkElt);
});

//----------------------------------------------------------------------------
//Проверка нажатия на кнопки открытия форм 
editBtnElt.addEventListener('click', () => {
	nameElt.value = prflNameElt.textContent;
	descriptionElt.value = prflDescriptionElt.textContent;
	openPup(pupEdit);
});

addBtnElt.addEventListener('click', () => {
	openPup(pupAdd);
});

//-----------------------------------------------------------------------------
//Проверка нажатия на кнопку <Сохранить>
editFormElt.addEventListener('submit', submitEditForm);
addFormElt.addEventListener('submit', submitAddForm);
//event.target.setAttribute('disabled', true); сделать кнопку неактивной