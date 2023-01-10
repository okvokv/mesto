export default class UserInfo {
	constructor(userName, userDescription) {
		this._userName = userName;
		this._userDescription = userDescription;
		}
	//-------------------------------------------------------------------------------

	//получение данных пользователя из профиля в форму
	getUserInfo() {
		this._userData = {
			name: this._userName.textContent,
			description: this._userDescription.textContent
		};
		return this._userData;
	}

	//запись данных пользователя из формы в профиль
	setUserInfo(_userData) {
		this._userName.textContent = _userData.name;
		this._userDescription.textContent = _userData.description;
	}

}