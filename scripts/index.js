//Определение констант
const editBtnElt = document.querySelector('.profile__edit-button');

const pupElt = document.querySelector('.popup');

const closeBtnElt = pupElt.querySelector('.popup__close-button');

const formElt = document.querySelector('.form');

let nameElt = document.querySelector('.profile__title')
let descriptionElt = document.querySelector('.profile__subtitle')

let fieldTop = formElt.querySelector('.form__field_name');
let fieldBtm = formElt.querySelector('.form__field_description');

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

//Определение функции отправки
let formSubmit = function () {
	preventDefault();
	// замена значений 
	nameElt.textContent = fieldTop.value;
	descriptionElt.textContent = fieldBtm.value;
	console.log('Отправка!')
};

//Проверка события нажатия на кнопку редактировать профиль и запуск ф-ии
editBtnElt.addEventListener('click', pupOpened);
//Если форма открыта, отключить отслеживание нажатия на кнопку Редактировать, отслеживать событие нажатия на кнопку Сохранить или на кнопку Закрыть
//editBtnElt.removeEventListener();
closeBtnElt.addEventListener('click', pupClosed);
formElt.addEventListener('submit', formSubmit);