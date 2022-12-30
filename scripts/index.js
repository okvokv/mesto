import { initialCards, config } from './constants.js'
import Card from './Card.js'
import FormValidator from './FormValidator.js'

//Определение констант и переменных
//кнопки
const profileElt = document.querySelector('.profile');
const profileButton = profileElt.querySelector('.profile__edit-button');
const cardButton = profileElt.querySelector('.profile__add-button');

const cardsGrid = document.querySelector('.elements__grid');

//всплывающие окна
const popups = document.querySelectorAll('.popup')
const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');
const popupLargeImage = imagePopup.querySelector('.popup__image');
const largeImageText = imagePopup.querySelector('.popup__image-text');

const cardTemplate = document.querySelector('.cardTemplate').content;

//получение значений для заполнения формы редактирования профиля
const userName = profileElt.querySelector('.profile__title');
const userDescription = profileElt.querySelector('.profile__subtitle');

//-------------------------------------------------------------------------
//Форма редактирования профиля
const profileEditForm = document.querySelector('.form_type_edit') //---//
const inputName = profileEditForm.querySelector('.form__field_type_name');
const inputDescription = profileEditForm.querySelector('.form__field_type_description');

//Форма добавления контента 
const cardAddForm = document.querySelector('.form_type_add') //---//
const inputCardName = cardAddForm.querySelector('.form__field_type_cardname');
const inputCardLink = cardAddForm.querySelector('.form__field_type_cardlink');

//------------------------------------------------------------------------
//включение отображения валидности форм
const profileEditFormValdation = new FormValidator(profileEditForm, config);
profileEditFormValdation.enableFormValidation();

const cardAddFormValidation = new FormValidator(cardAddForm, config);
cardAddFormValidation.enableFormValidation();

//-----------------------------------------------------------------------
//Функция реакции на нажатие <Esc>
function checkEscState(event) {
	if (event.key === 'Escape') {
		const popupType = document.querySelector('.popup_opened');
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
profileButton.addEventListener('click', () => {
	//автозаполнение полей формы из профиля 
	inputName.value = userName.textContent;
	inputDescription.value = userDescription.textContent;
	//удаление предыдущих сообщений об ошибке
	profileEditFormValdation.delFormErrorMessages(); //---//
	//отключить кнопку <Сохранить>
	profileEditFormValdation.disableSubmitButton(); //---//
	openPopup(profileEditPopup);
});

//Проверка нажатия на кнопку добавления контента
cardButton.addEventListener('click', () => {
	//отключить кнопку <Сохранить>
	cardAddFormValidation.disableSubmitButton(); //---//
	openPopup(cardAddPopup);
});

//Для всплывающих окон:    ------------------------------------------------------ 
//функция отправки содержания формы редактирования профиля (event eq. submit)
function submitEditForm(event) {
	event.preventDefault();
	//замена значений 
	userName.textContent = inputName.value;
	userDescription.textContent = inputDescription.value;
	shutPopup(profileEditPopup);
};

//функция отправки содержания формы добавления контента
function submitAddForm(event) {
	event.preventDefault();
	//добавить карточку
	addNewCard(inputCardName.value, inputCardLink.value);
	//сброс полей
	event.target.reset();
	shutPopup(cardAddPopup);
};

//проверка нажатия на кнопку <Закрыть> и внешнюю часть всплывающего окна
popups.forEach((popupType, index) => {
	popupType.addEventListener('click', (event) => {
		if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
			shutPopup(popupType);
			//сброс полей формы доб. контента через 5 мин.
		};
	});
});

//проверка нажатия на кнопку <Сохранить>
profileEditForm.addEventListener('submit', submitEditForm);
cardAddForm.addEventListener('submit', submitAddForm);

//-----------------------------------------------------------------------------
//Функция добавления карточки в таблицу
function addNewCard(cardTextElt, cardLinkElt, innerArr = false) {
	//обращение к классу создания новой карточки
	const newCard = new Card(cardTextElt, cardLinkElt, cardTemplate, popupLargeImage, largeImageText, imagePopup, openPopup).createNewCard();
	//добавление
	innerArr ? cardsGrid.append(newCard) : cardsGrid.prepend(newCard);
};

//Функция чтения карточек из массива и добавление в таблицу 
initialCards.forEach((cardElt, index) => {
	addNewCard(cardElt.name, cardElt.link, true);
});