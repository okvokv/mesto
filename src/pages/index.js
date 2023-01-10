import './index.css';                              
import { initialCards, config } from '../utils/constants.js';         //---//
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

//кнопки
const profileElt = document.querySelector('.profile');
const profileButton = profileElt.querySelector('.profile__edit-button');
const cardButton = profileElt.querySelector('.profile__add-button');

const userName = profileElt.querySelector('.profile__title');
const userDescription = profileElt.querySelector('.profile__subtitle');

//шаблон
const cardTemplate = document.querySelector('.card-template').content;

//таблица карточек
const cardsGrid = document.querySelector('.elements__grid');

//формы
const profileEditForm = document.querySelector('.form_type_edit');
const inputName = profileEditForm.querySelector('.form__field_type_name');
const inputDescription = profileEditForm.querySelector('.form__field_type_description');
const cardAddForm = document.querySelector('.form_type_add');

//всплывающие окна
const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

//Классы  -------------------------------------------------------------
//включение класса отображения информации о пользователе
const userInfo = new UserInfo(userName, userDescription);

//включение классов всплывающих окон
const popupWithProfileForm = new PopupWithForm(profileEditPopup, submitProfileForm);
const popupWithCardForm = new PopupWithForm(cardAddPopup, submitCardForm);
const popupWithImage = new PopupWithImage(imagePopup);

//включение класса сборки карточки
const cardData = {};
const handleImageClick = popupWithImage.handleImageClick;
const newCard = new Card(cardData, cardTemplate, handleImageClick)

//включение класса добавления карточек
const items = initialCards;
const renderer = newCard.createNewCard;
const section = new Section(items, renderer, cardsGrid);
//добавление карточек из массива на страницу
section.addItems();

//включение отображения валидности форм
const profileEditFormValdation = new FormValidator(profileEditForm, config);
profileEditFormValdation.enableFormValidation();

const cardAddFormValidation = new FormValidator(cardAddForm, config);
cardAddFormValidation.enableFormValidation();

//------------------------------------------------------------------------------
//проверка нажатия на кнопку редактировать профиль 
profileButton.addEventListener('click', () => {
	//автозаполнение полей формы из профиля 
	const userData = userInfo.getUserInfo(); 
	inputName.value = userData.name;
	inputDescription.value = userData.description;
	//удаление предыдущих сообщений об ошибке
	profileEditFormValdation.delFormErrorMessages();
	//отключить кнопку <Сохранить>
	profileEditFormValdation.disableSubmitButton();
	//открыть окно с формой
	popupWithProfileForm.open();
});

//проверка нажатия на кнопку добавления контента
cardButton.addEventListener('click', () => {
	//отключить кнопку <Сохранить>
	cardAddFormValidation.disableSubmitButton();
	//открыть окно с формой
	popupWithCardForm.open();
});

//проверка нажатия на кнопку <Закрыть> и <Сохранить>
popupWithProfileForm.setEventListeners();
popupWithCardForm.setEventListeners();
popupWithImage.setEventListeners();

//отправка содержания формы редактирования профиля
function submitProfileForm(formData) {
	//замена значений в профиле
	//userInfo.setUserInfo();
	userName.textContent = formData.name;
	userDescription.textContent = formData.description;
	//закрыть окно с формой
	popupWithProfileForm.close();
};

//отправка содержания формы добавления контента
function submitCardForm(formData) {
	const item = { name: formData.cardName, link: formData.cardLink }
	//создать и добавить карточку в таблицу
	section.addItem(item);
	//закрыть окно с формой
	popupWithCardForm.close();
};