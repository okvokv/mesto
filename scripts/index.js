//Определение констант
const editBtnElt = document.querySelector('.profile__edit-button');

const pupElt = document.querySelector('.popup');
const pupOpndElt = document.querySelector('.popup_opened');

const formElt = document.querySelector('.form');

const closeBtnElt = formElt.querySelector('.form__close-button');
const submitBtnElt = formElt.querySelector('.form__submit-button');

let nameElt = document.querySelector('.profile__title')
let descriptionElt = document.querySelector('.profile__subtitle')

let fieldTop = formElt.querySelector(".form__field-name");
let fieldBtm = formElt.querySelector(".form__field-description");

//Определение функци добавления класса для открытия окна
let pupOpened = function () {
	pupElt.classList.add('popup_opened');
	//задание значений полей Name и Description с помощью value
	fieldTop.value = nameElt.textContent;
	fieldBtm.value = descriptionElt.textContent;
	console.log(fieldTop.textContent);
};

//Определение функции удаления класса для закрытия окна
let pupClosed = function () {
	pupElt.classList.remove('popup_opened');
};

//Определение функции отправки
let formSubmit = function () {
	preventDefault();
	// замена значений 
	nameElt.textContent = fieldTop.value;
	descriptionElt.textContent = fieldBtm.value;
};

//Проверка события нажатия на кнопку редактировать профиль и запуск ф-ии
editBtnElt.addEventListener('click', pupOpened), { once: true };
//Если форма открыта, отключить отслеживание нажатия на кнопку Редактировать, отслеживать событие нажатия на кнопку Сохранить или на кнопку Закрыть
//editBtnElt.removeEventListener();
closeBtnElt.addEventListener('click', pupClosed);
submitBtnElt.addEventListener('click', formSubmit);

