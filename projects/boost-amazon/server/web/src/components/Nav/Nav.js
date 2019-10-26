import navTemplate from "./template.js";
import { $ } from "../../utils/util.js";

class Nav {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
  }

  render() {
    this.parentElement.innerHTML = navTemplate;
  }
}

export { Nav };
