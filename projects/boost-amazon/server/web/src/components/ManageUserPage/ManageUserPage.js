import manageUserPageTemplate from "./template.js";
import { ListUser } from "../../components/ListUser/ListUser.js";
import { $ } from "../../utils/util.js";
import { fetchAllUsers, fetchGradeChange } from "../../utils/fetch.js";

class ManageUserPage {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.listUserEleArray = [];
    this.gradeInfo = ["bronze", "silver", "gold", "admin"];
    this.gradeIdxByGrade = {
      bronze: 0,
      silver: 1,
      gold: 2,
      admin: 3
    };
    this.render();
  }

  changeGradeUp = async idx => {
    const userId = this.usersInfo[idx].USER_ID;
    const userGrade = this.usersInfo[idx].USER_GRADE;
    const destGradeIdx = this.gradeIdxByGrade[userGrade] + 1;
    if (userGrade == "admin") return;
    const destGrade = this.gradeInfo[destGradeIdx];
    await fetchGradeChange(userId, destGrade);
    $(`#user-grade-${idx}`).innerText = destGrade;
    this.usersInfo[idx].USER_GRADE = destGrade;
  };

  changeGradeDown = async idx => {
    const userId = this.usersInfo[idx].USER_ID;
    const userGrade = this.usersInfo[idx].USER_GRADE;
    const destGradeIdx = this.gradeIdxByGrade[userGrade] - 1;
    if (userGrade == "bronze") return;
    const destGrade = this.gradeInfo[destGradeIdx];
    await fetchGradeChange(userId, destGrade);
    $(`#user-grade-${idx}`).innerText = destGrade;
    this.usersInfo[idx].USER_GRADE = destGrade;
  };

  setUserList = () => {
    for (let i = 0; i < this.listLength; ++i) {
      this.userListContainer.insertAdjacentHTML(
        "beforeend",
        /*html*/ `<div id="user-list-${i}" class="user-list"></div>`
      );
      this.listUserEleArray.push(
        new ListUser(
          $(`#user-list-${i}`),
          i,
          this.usersInfo[i].USER_ID,
          this.usersInfo[i].USER_NAME,
          this.usersInfo[i].USER_GRADE
        )
      );
    }
  };

  setUsersInfo = async () => {
    const results = await fetchAllUsers();
    console.log(results);
    if (results.message == "success") {
      this.usersInfo = results.data;
      this.listLength = results.data.length;
    } else {
      // 에러 처리
    }
  };

  setEvent = () => {
    this.userListContainer.addEventListener("click", async e => {
      if (e.target.className == "user-grade-up-button") {
        const targetIdx = e.target.id.split("up-")[1];
        await this.changeGradeUp(targetIdx);
      }
      if (e.target.className == "user-grade-down-button") {
        const targetIdx = e.target.id.split("down-")[1];
        await this.changeGradeDown(targetIdx);
      }
    });
  };

  async render() {
    this.parentElement.insertAdjacentHTML("beforeend", manageUserPageTemplate);
    this.userListContainer = $(".user-list-container");
    await this.setUsersInfo();
    this.setUserList();
    this.setEvent();
  }
}

export { ManageUserPage };
