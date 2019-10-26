import menuForAdminTemplate from "./template.js";
import { $ } from "../../utils/util.js";

class MenuForAdmin {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
  }

  setEvent = () => {
    $(".manage-user-container").style.visibility = "visible"; // 유저 페이지를 default로 보여줌
    $(".manage-item-container").style.visibility = "hidden";
    this.manageUserMenu.addEventListener("click", () => {
      $(".manage-item-container").style.visibility = "hidden";
      $(".manage-user-container").style.visibility = "visible";
      window.scrollTo(0, 0);
    });
    this.manageItemMenu.addEventListener("click", () => {
      $(".manage-item-container").style.visibility = "visible";
      $(".manage-user-container").style.visibility = "hidden";
      window.scrollTo(0, 0);
    });
  };

  render = () => {
    this.parentElement.innerHTML = menuForAdminTemplate;
    this.manageUserMenu = $(".manage-user-menu");
    this.manageItemMenu = $(".manage-item-menu");
    this.setEvent();
  };
}

export { MenuForAdmin };
