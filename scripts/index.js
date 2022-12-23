import Card from './Card.js'
import { initialCards, config } from './constants.js'
import FormValidator from './FormValidator.js'

//Определение констант и переменных
//кнопки
const profileElt = document.querySelector('.profile');
const buttonEditProfile = profileElt.querySelector('.profile__edit-button');
const buttonAddCard = profileElt.querySelector('.profile__add-button');

const cardsGrid = document.querySelector('.elements__grid');

//всплывающие окна
const popups = document.querySelectorAll('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_img');
const popupLargeImage = imagePopup.querySelector('.popup__image');
const largeImageText = imagePopup.querySelector('.popup__image-caption');

const cardTemplate = document.querySelector('.cardTemplate').content;

//получение значений для заполнения формы редактирования профиля
const userName = profileElt.querySelector('.profile__title');
const userDescription = profileElt.querySelector('.profile__subtitle');

//-------------------------------------------------------------------------
//Форма редактирования профиля
const editProfileForm = document.querySelector('.form_type_edit') //---//
const inputName = editProfileForm.querySelector('.form__field_type_name');
const inputDescription = editProfileForm.querySelector('.form__field_type_description');

//Форма добавления контента 
const addCardForm = document.querySelector('.form_type_add') //---//
const inputCardName = addCardForm.querySelector('.form__field_type_cardname');
const inputCardLink = addCardForm.querySelector('.form__field_type_cardlink');

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
buttonEditProfile.addEventListener('click', (event) => {
	//автозаполнение полей формы из профиля 
	inputName.value = userName.textContent;
	inputDescription.value = userDescription.textContent;
	const formValidation = new FormValidator(editProfileForm, config).enableFormValidation();
	openPopup(editProfilePopup);
});

//Проверка нажатия на кнопку добавления контента
buttonAddCard.addEventListener('click', (event) => {
	const formValidation = new FormValidator(addCardForm, config).
		enableFormValidation()
	openPopup(addCardPopup);
});

//Для всплывающих окон:
//-----------------------------------------------------------------------------
//функция отправки содержания формы редактирования профиля (event eq. submit)
function submitEditForm(event) {
	event.preventDefault();
	//замена значений 
	userName.textContent = inputName.value;
	userDescription.textContent = inputDescription.value;
	shutPopup(editProfilePopup);
};

//функция отправки содержания формы добавления контента
function submitAddForm(event) {
	event.preventDefault();
	//добавить карточку
	addNewCard(inputCardName.value, inputCardLink.value);
	//сброс полей
	event.target.reset();
	shutPopup(addCardPopup);
};

//----------------------------------------------------------------------------
//проверка нажатия на кнопку <Закрыть> и внешнюю часть всплывающего окна
popups.forEach((popupType, index) => {
	popupType.addEventListener('click', (event) => {
		if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close-button')) {
			shutPopup(popupType);
		};
	});
});

//проверка нажатия на кнопку <Сохранить>
editProfileForm.addEventListener('submit', submitEditForm);
addCardForm.addEventListener('submit', submitAddForm);

//-----------------------------------------------------------------------------
//Функция добавления карточки в таблицу
function addNewCard(cardTextElt, cardLinkElt, innerArr = false) {
	//обращение к классу  создания новой карточки
	const newCard = new Card(cardTextElt, cardLinkElt, cardTemplate, openPopup, imagePopup, popupLargeImage, largeImageText).createNewCard();
	innerArr ? cardsGrid.append(newCard) : cardsGrid.prepend(newCard);
};

//Функция чтения карточек из массива
initialCards.forEach((cardElt, index) => {
	addNewCard(cardElt.name, cardElt.link, true);
});