//Определение констант и переменных
const editBtnElt = document.querySelector('.profile__edit-button');

const pupElt = document.querySelector('.popup');

const closeBtnElt = pupElt.querySelector('.popup__close-button');

let formElt = document.querySelector('.form');
let fieldTop = formElt.querySelector('[name="Name"]');
let fieldBtm = formElt.querySelector('[name="Description"]');

let nameElt = document.querySelector('.profile__title');
let descriptionElt = document.querySelector('.profile__subtitle');

//Определение функци добавления класса для открытия окна
let pupOpened = function () {
	pupElt.classList.add('popup_opened');
	//задание значений полей Name и Description с помощью value
	fieldTop.value = nameElt.textContent;
	fieldBtm.value = descriptionElt.textContent;
};

//Определение функции удаления класса для закрытия окна
let pupClosed = function () {
	pupElt.classList.remove('popup_opened');
};

//Определение функции отправки (аргумент - submit  вместо event)
let formSubmit = function (event) {
	event.preventDefault();
	// замена значений 
	nameElt.textContent = fieldTop.value;
	descriptionElt.textContent = fieldBtm.value;
	pupClosed();
};

//Проверка события нажатия на кнопку редактировать профиль и запуск ф-ии
editBtnElt.addEventListener('click', pupOpened);
//Если форма открыта, отключить отслеживание нажатия на кнопку Редактировать, отслеживать событие нажатия на кнопку Сохранить или на кнопку Закрыть
//editBtnElt.removeEventListener();
closeBtnElt.addEventListener('click', pupClosed);
formElt.addEventListener('submit', formSubmit);