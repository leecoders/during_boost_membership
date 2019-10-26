import sectionForAdminTemplate from "./template.js";
import { $ } from "../../utils/util.js";
import { ManageItemPage } from "../../components/ManageItemPage/ManageItemPage.js";
import { ManageUserPage } from "../../components/ManageUserPage/ManageUserPage.js";

class SectionForAdmin {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
  }

  render() {
    this.parentElement.insertAdjacentHTML("beforeend", sectionForAdminTemplate);
    this.manageItemPage = new ManageItemPage($(".admin-container"));
    this.manageUserPage = new ManageUserPage($(".admin-container"));
  }
}

export { SectionForAdmin };
