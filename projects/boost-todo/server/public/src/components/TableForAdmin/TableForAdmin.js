import { $ } from "../../utils/util.js";
import { UserBox } from "../UserBox/UserBox.js";
import { fetchAllUsers } from "../../utils/fetchAdmin.js";

class TableForAdmin {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
    this.userBoxArray = [];
    this.setUserBox();
  }

  setUserCounter() {
    $(".user-counter").innerText = this.userBoxArray.length;
  }

  async setUserBox() {
    const users = await fetchAllUsers();
    for (let i = 0; i < users.length; ++i) {
      this.userBoxArray.push(
        new UserBox($(".user-box-container"), i, users[i])
      );
    }
    this.setUserCounter();
  }

  render() {
    this.parentElement.innerHTML = /*html*/ `
      <div class="admin-table-wrapper">
        <div class="admin-table-title-container">
          <span class="user-counter"></span>
          <span class="admin-table-title">사용자 관리</span>
        </div>
        <div class="user-box-container"></div>
      </div>
    `;
  }
}

export { TableForAdmin };
