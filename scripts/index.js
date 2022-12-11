//Определение констант и переменных
//кнопки
const profileElt = document.querySelector('.profile');
const editBtnElt = profileElt.querySelector('.profile__edit-button');
const addBtnElt = profileElt.querySelector('.profile__add-button');

const gridObj = document.querySelector('.elements__grid');

//всплывающие окна
const pupNodeList = document.querySelectorAll('.popup')
const pupEdit = document.querySelector('.popup_type_edit');
const pupAdd = document.querySelector('.popup_type_add');
const pupImg = document.querySelector('.popup_type_img');

const pupImgElt = pupImg.querySelector('.popup__image');
const pupImgTextElt = pupImg.querySelector('.popup__image-caption')

//получение значений для заполнения формы редактирования профиля
const prflNameElt = profileElt.querySelector('.profile__title');
const prflDescriptionElt = profileElt.querySelector('.profile__subtitle');

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

//------------------------------------------------------------------------------
//Функция создания новой карточки
function createNewCard(cardTextElt, cardLinkElt) {
	const newCard = cardTemplate.querySelector('.element').cloneNode(true);
	const newImgElt = newCard.querySelector('.element__image');
	const newTextElt = newCard.querySelector('.element__text');
	//заполнение 
	newImgElt.src = cardLinkElt;
	newImgElt.alt = 'фото: ' + cardTextElt;
	newTextElt.textContent = cardTextElt;
	return newCard;
};

//Функция добавления карточки в таблицу
function addCard(cardTextElt, cardLinkElt) {
	newCard = createNewCard(cardTextElt, cardLinkElt);
	gridObj.prepend(newCard);
};

//-------------------------------------------------------------------------
//Форма редактирования профиля
const editFormElt = document.editForm;
const nameElt = editFormElt.first;
const descriptionElt = editFormElt.second;
const submitBtnEdElt = editFormElt.querySelector('.form__submit-button');
//автозаполнение полей формы из профиля 
nameElt.value = prflNameElt.textContent;
descriptionElt.value = prflDescriptionElt.textContent;


//Форма добавления контента 
const addFormElt = document.addForm;
const textElt = addFormElt.third;
const linkElt = addFormElt.fourth;
const submitBtnAdElt = addFormElt.querySelector('.form__submit-button');

//-----------------------------------------------------------------------
//Функция реакции на нажатие <Esc>
function checkEscState(event, pupType) {
	if (event.key === 'Escape') {
		shutPopup(pupType);
	};
};
//------------------------------------------------------------------------
//Функция открытия всплывающего окна 
function openPopup(pupType) {
	pupType.classList.add('popup_opened');
	//проверка нажатия на кнопку <Esc>
	//const controlKey = (event) => checkEscState(event, pupType);
	//document.addEventListener('keydown', controlKey);
};

//Функция закрытия всплывающего окна
function shutPopup(pupType) {
	pupType.classList.remove('popup_opened');
	//снятие слушателя
	//document.removeEventListener('keydown', controlKey);
};

//------------------------------------------------------------------------------
//Проверка нажатия на кнопки
document.addEventListener('click', (event) => {
	//нажатие на кнопку <Like>
	if (event.target.classList.contains('element__icon-button')) {
		event.target.classList.toggle('element__icon-button_active');
	};
	//нажатие на кнопку <Удалить>
	if (event.target.classList.contains('element__trash-button')) {
		event.target.closest('.element').remove();
	};
	//нажатие на картинку
	if (event.target.classList.contains('element__image')) {
		//заполнение
		pupImgElt.src = event.target.src;
		pupImgElt.alt = event.target.alt;
		const elementElt = event.target.closest('.element')
		const imgTextElt = elementElt.querySelector('.element__text');
		pupImgTextElt.textContent = imgTextElt.textContent;
		openPopup(pupImg);
	};
	//нажатие на кнопку редактировать профиль 
	if (event.target.classList.contains('profile__edit-button')) {
		openPopup(pupEdit);
	};
	//нажатие на кнопку добавления контента
	if (event.target.classList.contains('profile__add-button')) {
		openPopup(pupAdd);
	};
});

//-----------------------------------------------------------------------------
//Для всплывающих окон
//функция отправки содержания формы редактирования профиля (event eq. submit)
function submitEditForm(event) {
	event.preventDefault();
	// замена значений 
	prflNameElt.textContent = nameElt.value;
	prflDescriptionElt.textContent = descriptionElt.value;
	shutPopup(pupEdit);
};

//функция отправки содержания формы добавления контента
function submitAddForm(event) {
	event.preventDefault();
	//добавить карточку
	addCard(textElt.value, linkElt.value);
	//сброс полей
	event.target.reset();
	shutPopup(pupAdd);
};

//----------------------------------------------------------------------------
//проверка нажатия на кнопку <Закрыть> и внешнюю часть всплывающего окна
pupNodeList.forEach((pupType, index) => {
	pupType.addEventListener('click', (event) => {
		if ((event.target === event.currentTarget) || (event.target === pupType.querySelector('.popup__close-button')) || (event.target === pupImgElt)) {
			shutPopup(pupType);
		};
	});
});

//проверка нажатия на кнопку <Сохранить>
editFormElt.addEventListener('submit', submitEditForm);
addFormElt.addEventListener('submit', submitAddForm);

//-----------------------------------------------------------------------------
//Функция добавления карточек из массива
initialCards.reverse().forEach((cardElt, index) => {
	addCard(cardElt.name, cardElt.link);
});