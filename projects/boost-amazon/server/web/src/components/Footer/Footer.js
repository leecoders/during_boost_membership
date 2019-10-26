import footerTemplate from "./template.js";
import { $ } from "../../utils/util.js";

class Footer {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
  }

  render() {
    this.parentElement.innerHTML = footerTemplate;
  }
}

export { Footer };
