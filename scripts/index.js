//Определение констант и переменных
//кнопки
const profileElt = document.querySelector('.profile');
const editBtnElt = profileElt.querySelector('.profile__edit-button');
const addBtnElt = profileElt.querySelector('.profile__add-button');

const cardsGrid = document.querySelector('.elements__grid');

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

//------------------------------------------------------------------------------
//Функция создания новой карточки
function createNewCard(cardTextElt, cardLinkElt) {
	const newCard = cardTemplate.querySelector('.element').cloneNode(true);
	const newImgElt = newCard.querySelector('.element__image');
	const newTextElt = newCard.querySelector('.element__text');
	const icnBtnElt = newCard.querySelector('.element__icon-button');
	const trashBtnElt = newCard.querySelector('.element__trash-button');
	//заполнение 
	newImgElt.src = cardLinkElt;
	newImgElt.alt = 'фото: ' + cardTextElt;
	newTextElt.textContent = cardTextElt;

	//присоединение проверки нажатия на кнопку <Like>
	icnBtnElt.addEventListener('click', (event) => {
		event.target.classList.toggle('element__icon-button_active');
	});

	//присоединение проверки нажатия на кнопку <Удалить> 
	trashBtnElt.addEventListener('click', (event) => {
		event.target.closest('.element').remove();
	});

	//присоединение проверки нажатия на картинку
	newImgElt.addEventListener('click', (event) => {
		//заполнение
		pupImgElt.src = event.target.src;
		pupImgElt.alt = event.target.alt;
		const elementElt = event.target.closest('.element')
		const imgTextElt = elementElt.querySelector('.element__text');
		pupImgTextElt.textContent = imgTextElt.textContent;
		openPopup(pupImg);
	});
	return newCard;
};

//Функция добавления карточки в таблицу
function addCard(cardTextElt, cardLinkElt) {
	newCard = createNewCard(cardTextElt, cardLinkElt);
	cardsGrid.prepend(newCard);
};

//-------------------------------------------------------------------------
//Форма редактирования профиля
const editFormElt = document.forms.editForm;
const nameElt = editFormElt.elements.first;
const descriptionElt = editFormElt.elements.second;
const submitBtnEdElt = editFormElt.querySelector('.form__submit-button');

//Форма добавления контента 
const addFormElt = document.forms.addForm;
const textElt = addFormElt.elements.third;
const linkElt = addFormElt.elements.fourth;
const submitBtnAdElt = addFormElt.querySelector('.form__submit-button');

//-----------------------------------------------------------------------
//Функция реакции на нажатие <Esc>
function checkEscState(event, popupType) {
	if (event.key === 'Escape') {
		shutPopup(popupType);
	};
};

//function controlKey();
//------------------------------------------------------------------------
//Функция открытия всплывающего окна 
function openPopup(popupType) {
	popupType.classList.add('popup_opened');
	//проверка нажатия на кнопку <Esc>
	const controlKey = (event) => checkEscState(event, popupType);
	document.addEventListener('keydown', controlKey);
};

//Функция закрытия всплывающего окна
function shutPopup(popupType) {
	popupType.classList.remove('popup_opened');
	//снятие слушателя
	document.removeEventListener('keydown', controlKey);
};

//------------------------------------------------------------------------------
//Проверка нажатия на кнопку редактировать профиль 
editBtnElt.addEventListener('click', (event) => {
	//автозаполнение полей формы из профиля 
	nameElt.value = prflNameElt.textContent;
	descriptionElt.value = prflDescriptionElt.textContent;
	openPopup(pupEdit);
});

//Проверка нажатия на кнопку добавления контента
addBtnElt.addEventListener('click', (event) => {
	openPopup(pupAdd);
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
pupNodeList.forEach((popupType, index) => {
	popupType.addEventListener('click', (event) => {
		if ((event.target === event.currentTarget) || (event.target === popupType.querySelector('.popup__close-button')) || (event.target === pupImgElt)) {
			shutPopup(popupType);
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