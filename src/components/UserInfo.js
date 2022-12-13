export default class UserInfo {
  constructor({ profileName, profileJob, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileJob = document.querySelector(profileJob);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }
  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
  getUserAvatar() {
    return this._profileAvatar.src;
  }
  setUserAvatar(link) {
    this._profileAvatar.src = link;
  }
}
