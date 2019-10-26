import headerTemplate from "./template.js";
import { $, toggleUserClickState } from "../../utils/util.js";
import { UserInfoLayer } from "../UserInfoLayer/UserInfoLayer.js";
import { MenuForAdmin } from "../../components/MenuForAdmin/MenuForAdmin.js";
import { Menu } from "../../components/Menu/Menu.js";

class Header {
  constructor(parentElement, pageName) {
    this.parentElement = parentElement;
    this.pageName = pageName;
    this.render();
  }
  setEvent = () => {
    this.userInfoButton.addEventListener("click", () => {
      toggleUserClickState(this.userBubble);
    });
  };
  setMenu = () => {
    if (this.pageName == "admin") {
      this.menuForAdmin = new MenuForAdmin($(".menu-wrapper"));
    } else {
      this.menu = new Menu($(".menu-wrapper"));
    }
  };
  render() {
    this.parentElement.innerHTML = headerTemplate;
    this.userInfoButton = $("#user-button");
    this.userInfoLayer = new UserInfoLayer($(".user-bubble-container"));
    this.userBubble = $(".user-bubble-container");
    this.setMenu();
    this.setEvent();
  }
}

export { Header };
