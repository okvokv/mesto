//Определение констант и переменных
//кнопки
const profileElt = document.querySelector('.profile');
const editButton = profileElt.querySelector('.profile__edit-button');
const addButton = profileElt.querySelector('.profile__add-button');

const cardsGrid = document.querySelector('.elements__grid');

//всплывающие окна
const popups = document.querySelectorAll('.popup')
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_add');
const imagePopup = document.querySelector('.popup_type_img');

const popupLargeImage = imagePopup.querySelector('.popup__image');
const largeImageText = imagePopup.querySelector('.popup__image-caption');

//получение значений для заполнения формы редактирования профиля
const userName = profileElt.querySelector('.profile__title');
const userDescription = profileElt.querySelector('.profile__subtitle');

const cardTemplate = document.querySelector('.cardTemplate').content;

//------------------------------------------------------------------------------
//Функция создания новой карточки
function createNewCard(cardTextElt, cardLinkElt) {
	const newCard = cardTemplate.querySelector('.element').cloneNode(true);
	const newImg = newCard.querySelector('.element__image');
	const newImgText = newCard.querySelector('.element__text');
	const icnButton = newCard.querySelector('.element__icon-button');
	const trashButton = newCard.querySelector('.element__trash-button');
	//заполнение 
	newImg.src = cardLinkElt;
	newImg.alt = 'фото: ' + cardTextElt;
	newImgText.textContent = cardTextElt;

	//присоединение проверки нажатия на кнопку <Like>
	icnButton.addEventListener('click', (event) => {
		event.target.classList.toggle('element__icon-button_active');
	});

	//присоединение проверки нажатия на кнопку <Удалить> 
	trashButton.addEventListener('click', (event) => {
		event.target.closest('.element').remove();
	});

	//присоединение проверки нажатия на картинку
	newImg.addEventListener('click', (event) => {
		//заполнение
		popupLargeImage.src = event.target.src;
		popupLargeImage.alt = event.target.alt;
		const elementElt = event.target.closest('.element')
		const elementText = elementElt.querySelector('.element__text');
		largeImageText.textContent = elementText.textContent;
		openPopup(imagePopup);
	});
	return newCard;
};

//Функция добавления карточки в таблицу
function addNewCard(cardTextElt, cardLinkElt) {
	newCard = createNewCard(cardTextElt, cardLinkElt);
	cardsGrid.prepend(newCard);
};

//-------------------------------------------------------------------------
//Форма редактирования профиля
const editProfileForm = document.forms.editForm;
const inputName = editProfileForm.querySelector('.form__field_type_name');
const inputDescription = editProfileForm.querySelector('.form__field_type_description');

//Форма добавления контента 
const addCardForm = document.forms.addForm;
const inputCardName = addCardForm.querySelector('.form__field_type_cardname');
const inputCardLink = addCardForm.querySelector('.form__field_type_cardlink');

//-----------------------------------------------------------------------
//Функция реакции на нажатие <Esc>
function checkEscState(event) {
	if (event.key === 'Escape') {
		shutPopup();
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
function shutPopup() {
	document.querySelector('.popup_opened').classList.remove('popup_opened');
	//снятие слушателя
	document.removeEventListener('keydown', checkEscState);
};

//------------------------------------------------------------------------------
//Проверка нажатия на кнопку редактировать профиль 
editButton.addEventListener('click', (event) => {
	//автозаполнение полей формы из профиля 
	inputName.value = userName.textContent;
	inputDescription.value = userDescription.textContent;
	openPopup(editProfilePopup);
});

//Проверка нажатия на кнопку добавления контента
addButton.addEventListener('click', (event) => {
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
	shutPopup();
};

//функция отправки содержания формы добавления контента
function submitAddForm(event) {
	event.preventDefault();
	//добавить карточку
	addNewCard(inputCardName.value, inputCardLink.value);
	//сброс полей
	event.target.reset();
	shutPopup();
};

//----------------------------------------------------------------------------
//проверка нажатия на кнопку <Закрыть> и внешнюю часть всплывающего окна
popups.forEach((popupType, index) => {
	const popupCloseButton = popupType.querySelector('.popup__close-button');
	popupType.addEventListener('click', (event) => {
		if ((event.target === event.currentTarget) || (event.target === popupCloseButton) || (event.target === popupLargeImage)) {
			shutPopup();
		};
	});
});

//проверка нажатия на кнопку <Сохранить>
editProfileForm.addEventListener('submit', submitEditForm);
addCardForm.addEventListener('submit', submitAddForm);

//-----------------------------------------------------------------------------
//Функция добавления карточек из массива
initialCards.reverse().forEach((cardElt, index) => {
	addNewCard(cardElt.name, cardElt.link);
});