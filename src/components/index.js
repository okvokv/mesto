import '../pages/index.css';
import UserInfo from '../components/UserInfo.js';
import { initialCards, config } from '../components/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

//кнопки
const profileElt = document.querySelector('.profile');
const profileButton = profileElt.querySelector('.profile__edit-button');
const cardButton = profileElt.querySelector('.profile__add-button');

//таблица карточек
const cardsGrid = document.querySelector('.elements__grid');

//формы
const profileEditForm = document.querySelector('.form_type_edit');
const cardAddForm = document.querySelector('.form_type_add');

//всплывающие окна
const profileEditPopup = document.querySelector('.popup_type_edit');
const cardAddPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_image');

//Классы  -------------------------------------------------------------
//определение класса отображения информации о пользователе
const userInfo = new UserInfo(profileEditForm);

//определение общего класса обработки событий со всплывающими окнами
new Popup();

//определение классов всплывающих окон
const popupWithProfileForm = new PopupWithForm(profileEditPopup, submitProfileForm);
const popupWithCardForm = new PopupWithForm(cardAddPopup, submitCardForm);
const popupWithImage = new PopupWithImage(imagePopup);

//определение класса сборки карточки
const handleImageClick = popupWithImage.handleImageClick;
const newCard = new Card(handleImageClick);

//определение класса добавления карточек
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
	userInfo.getUserInfo();
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
function submitProfileForm() {
	//замена значений в профиле
	userInfo.setUserInfo();
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