import { $, toggleUserClickState } from "../../utils/util.js";

class ListUser {
  constructor(parentElement, userIdx, userId, userName, userGrade) {
    this.parentElement = parentElement;
    this.userIdx = userIdx;
    this.userId = userId;
    this.userName = userName;
    this.userGrade = userGrade;
    this.render();
  }

  render = () => {
    this.parentElement.innerHTML = /*html*/ `
    <div class="user-container" id="user-${this.userIdx}">
        <div class="user-image"></div>
        <div class="user-info">
            <div class="user-id">
                <span class="user-info-title">ID</span>
                <span id="user-id-${this.userIdx}">${this.userId}</span>
            </div>
            <div class="user-name">
                <span class="user-info-title">NAME</span>
                <span id="user-name-${this.userIdx}">${this.userName}</span>
            </div>
            <div class="user-grade">
                <span class="user-info-title">GRADE</span>
                <span id="user-grade-${this.userIdx}">${this.userGrade}</span>
            </div>
        </div>
        <div class="user-grade-button-container">
            <button type="button" class="user-grade-up-button" id="user-grade-up-${this.userIdx}">UP</button>
            <button type="button" class="user-grade-down-button" id="user-grade-down-${this.userIdx}">DOWN</button>
        </div>
    </div>
    `;
  };
}

export { ListUser };
