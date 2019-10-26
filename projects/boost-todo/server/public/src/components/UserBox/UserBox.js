import { $ } from "../../utils/util.js";
import { fetchChangeGrade } from "../../utils/fetchAdmin.js";

class UserBox {
  constructor(parentElement, userIdx, userInfo) {
    this.parentElement = parentElement;
    this.userIdx = userIdx;
    this.userInfo = userInfo;
    this.render();
    this.setGrade();
    this.setSelectEvent();
  }

  setSelectEvent() {
    this.selectBox.addEventListener("change", async e => {
      const targetGrade = e.target.value;
      const result = await fetchChangeGrade(this.userInfo.USER_ID, targetGrade);
    });
  }

  setGrade() {
    this.selectBox = $("#select-user-permission-" + this.userIdx);
    const selectLength = this.selectBox.options.length;
    for (let i = 0; i < selectLength; ++i) {
      if (this.userInfo.USER_GRADE === this.selectBox.options[i].value) {
        this.selectBox.selectedIndex = i;
      }
    }
  }

  render() {
    this.parentElement.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <div id="user-box-${this.userIdx}" class="user-box-wrapper">
        <span class="user-image-wrapper"></span>
        <div class="user-info-container">
          <span class="user-info-wrapper first"><span>ID </span>${this.userInfo.USER_ID}</span>
          <span class="user-info-wrapper"><span>NAME </span>${this.userInfo.USER_NAME}</span>
          <span class="user-info-wrapper">
            <span>GRADE </span>
            <select id="select-user-permission-${this.userIdx}" class="select-user-permission">
              <option value="admin">admin</option>
              <option value="normal">normal</option>
            </select>
          </span>
        </div>
      </div>
    `
    );
  }
}

export { UserBox };
