import menuTemplate from "./template.js";
import { $ } from "../../utils/util.js";

class Menu {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
  }

  render = () => {
    this.parentElement.innerHTML = menuTemplate;
  };
}

export { Menu };
