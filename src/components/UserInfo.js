export default class UserInfo {
	constructor(profileEditForm) {
		const _profileElt = document.querySelector('.profile');
		this._userName = _profileElt.querySelector('.profile__title');
		this._userDescription = _profileElt.querySelector('.profile__subtitle');

		this._profileEditForm = profileEditForm;
		this._inputName = this._profileEditForm.querySelector('.form__field_type_name');
		this._inputDescription = this._profileEditForm.querySelector('.form__field_type_description');
	}

	//получение данных пользователя из профиля в форму
	getUserInfo() {
		this._inputName.value = this._userName.textContent;
		this._inputDescription.value = this._userDescription.textContent;
	}

	//запись данных пользователя из формы в профиль
	setUserInfo() {
		this._userName.textContent = this._inputName.value;
		this._userDescription.textContent = this._inputDescription.value;
	}

}