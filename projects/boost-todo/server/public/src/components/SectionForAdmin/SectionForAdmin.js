import { $ } from "../../utils/util.js";
import { TableForAdmin } from "../TableForAdmin/TableForAdmin.js";

class SectionForAdmin {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
    this.table = new TableForAdmin($(".admin-table-container"));
  }

  render() {
    this.parentElement.innerHTML = /*html*/ `
      <div class="admin-container">
        <div class="admin-table-container"></div>
      </div>
    `;
  }
}

export { SectionForAdmin };
