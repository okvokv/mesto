//Определение констант и переменных
//кнопки
const profileElt = document.querySelector('.profile');
const editBtnElt = profileElt.querySelector('.profile__edit-button');
const addBtnElt = profileElt.querySelector('.profile__add-button');

const cardsGrid = document.querySelector('.elements__grid');

//всплывающие окна
const popups = document.querySelectorAll('.popup')
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_img');

const imagePopup = popupImage.querySelector('.popup__image');
const imageText = popupImage.querySelector('.popup__image-caption')

//получение значений для заполнения формы редактирования профиля
const userName = profileElt.querySelector('.profile__title');
const userDescription = profileElt.querySelector('.profile__subtitle');

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
		imagePopup.src = event.target.src;
		imagePopup.alt = event.target.alt;
		const elementElt = event.target.closest('.element')
		const elementText = elementElt.querySelector('.element__text');
		imageText.textContent = elementText.textContent;
		openPopup(popupImage);
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
const formEditProfile = document.forms.editForm;
const inputName = formEditProfile.querySelector('.form__field_type_name');
const inputDescription = formEditProfile.querySelector('.form__field_type_description');

//Форма добавления контента 
const formAddCard = document.forms.addForm;
const inputCardName = formAddCard.querySelector('.form__field_type_cardname');
const inputCardLink = formAddCard.querySelector('.form__field_type_cardlink');

//-----------------------------------------------------------------------
//Функция реакции на нажатие <Esc>
function checkEscState(event) {
	if (event.key === 'Escape') {
		popupType = document.querySelector('.popup_opened');
		shutPopup(popupType);
	};
};

//-----------------------------------------------------------------------
//Функция открытия всплывающего окна 
function openPopup(popupType) {
	popupType.classList.add('popup_opened');
	//проверка нажатия на кнопку <Esc>
	document.addEventListener('keydown', checkEscState);
};

//Функция закрытия всплывающего окна
function shutPopup(popupType) {
	popupType.classList.remove('popup_opened');
	//снятие слушателя
	document.removeEventListener('keydown', checkEscState);
};

//------------------------------------------------------------------------------
//Проверка нажатия на кнопку редактировать профиль 
editBtnElt.addEventListener('click', (event) => {
	//автозаполнение полей формы из профиля 
	inputName.value = userName.textContent;
	inputDescription.value = userDescription.textContent;
	openPopup(popupEditProfile);
});

//Проверка нажатия на кнопку добавления контента
addBtnElt.addEventListener('click', (event) => {
	openPopup(popupAddCard);
});

//-----------------------------------------------------------------------------
//Для всплывающих окон
//функция отправки содержания формы редактирования профиля (event eq. submit)
function submitEditForm(event) {
	event.preventDefault();
	//замена значений 
	userName.textContent = inputName.value;
	userDescription.textContent = inputDescription.value;
	shutPopup(popupEditProfile);
};

//функция отправки содержания формы добавления контента
function submitAddForm(event) {
	event.preventDefault();
	//добавить карточку
	addCard(inputCardName.value, inputCardLink.value);
	//сброс полей
	event.target.reset();
	shutPopup(popupAddCard);
};

//----------------------------------------------------------------------------
//проверка нажатия на кнопку <Закрыть> и внешнюю часть всплывающего окна
popups.forEach((popupType, index) => {
	popupType.addEventListener('click', (event) => {
		if ((event.target === event.currentTarget) || (event.target === popupType.querySelector('.popup__close-button'))) {
			shutPopup(popupType);
		};
	});
});

//проверка нажатия на кнопку <Сохранить>
formEditProfile.addEventListener('submit', submitEditForm);
formAddCard.addEventListener('submit', submitAddForm);

//-----------------------------------------------------------------------------
//Функция добавления карточек из массива
initialCards.reverse().forEach((cardElt, index) => {
	addCard(cardElt.name, cardElt.link);
});