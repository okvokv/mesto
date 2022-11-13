//Определение констант
const EditBtnElt = document.querySelector('.profile__edit-button');
console.log(EditBtnElt) 

const AddBtnElt = document.querySelector('.profile__add-button');
console.log(AddBtnElt)

const FormElt = document.querySelector('.form');

const OvlElt = document.querySelector('.overlay');
console.log(OvlElt);

const OvlOpndElt = document.querySelector('.overlay_opened');
console.log(OvlOpndElt);

const CloseBtnElt = FormElt.querySelector('.form__close-button');
console.log(CloseBtnElt);

const SubmitBtnElt = document.querySelector('.form__submit-button');
console.log(SubmitBtnElt);

let NameElt = document.querySelector('.profile__title' )
console.log(NameElt)
let DescriptionElt = document.querySelector('.profile__subtitle')
console.log(DescriptionElt)

//let Name = FormElt.querySelector('.form__field')
//console.log(Name)
//let Description = FormElt.querySelector('.form__field')
//console.log(Description)



//Определение функций изменения класса
//добавление класса
let FormOpened = function(){
OvlElt.classList.add('overlay_opened');
};

//удаление класса
let FormClosed = function(){
OvlElt.classList.remove('overlay_opened');
};
	
//Определение функции отправки
//	let FormSubmit(evt) = function (){
//	evt.preventDefault();
//};

//Проверка события нажатия на кнопку редактировать профиль и запуск ф-ии
EditBtnElt.addEventListener('click', FormOpened);

// Открытие формы с плейсхолдерами или с заполненными предыдущими значениями полями (значения .profile__title и .profile__subtitle)

//Если форма открыта, отслеживать событие нажатия на кнопку Сохранить или на кнопку Закрыть
CloseBtnElt.addEventListener('click', FormClosed);
//SubmitBtnElt.addEventListener('click', FormSubmit);

//NameElt.value = ("profile__title").textContent
//DescriptionElt.value = ("profile__subtitle").textContent
// Сохранение введённых данных при нажатии на кнопку "Сохранить" в форме

//Присвоение содержимого полей формы переменным

// Найти элементы, куда должны быть вставлены новые значения
// Получить значение полей Name и Description с помощью value
// Заменить значения с помощью textContent
 
