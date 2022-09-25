export default class UserInfo {
    constructor({userName, userInfo}) {
        this._name =  userName;
        this._job = userInfo;
    }
    getUserInfo() {
        const infoUser = {
            name: this._name.textContent,
            job: this._job.textContent,
        };
        return infoUser;
    }
    setUserInfo(infoUser) {
        this._name.textContent = infoUser.name;
        this._job.textContent = infoUser.about; 
    }
}