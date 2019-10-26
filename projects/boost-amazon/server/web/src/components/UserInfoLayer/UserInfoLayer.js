import userInfoLayerTemplate from "./template.js";
import { $, closeLayer } from "../../utils/util.js";
import { SectionForAdmin } from "../SectionForAdmin/SectionForAdmin.js";

class UserInfoLayer {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
  }

  setEvent = () => {
    this.loginButton.addEventListener("click", () => {
      if (location.pathname != "/") {
        location.href = "../signin";
        return;
      }
      location.href = "src/pages/signin";
      closeLayer($(".layer-on"));
    });
    this.mainPageButton.addEventListener("click", () => {
      if (location.pathname != "/") {
        location.href = "../../../";
      }
      closeLayer($(".layer-on"));
    });
    this.adminPageButton.addEventListener("click", () => {
      if (location.pathname != "/src/pages/admin/") {
        location.href = "src/pages/admin";
      }
      closeLayer($(".layer-on"));
    });
  };

  render() {
    this.parentElement.innerHTML = userInfoLayerTemplate;
    this.loginButton = $("#login-button");
    this.logoutButton = $("#logout-button");
    this.adminPageButton = $("#admin-page-button");
    this.mainPageButton = $("#main-page-button");
    this.userInfoButton = $("#user-info-button");
    this.section = $("section");
    this.setEvent();
  }
}

export { UserInfoLayer };
