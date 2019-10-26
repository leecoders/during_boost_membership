import { $ } from "../../utils/util.js";

class Slide {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.render();
    this.setClickEvent();
  }

  setClickEvent() {
    const slideContainer = $(".slide-container");
    const closeButton = $("#slide-close-button");
    closeButton.addEventListener("click", () => {
      slideContainer.style.right = "-30rem";
    });
  }

  render() {
    this.parentElement.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <div class="slide-wrapper">
        <div class="slide-title-container">
          <span class="slide-menu-icon"></span><span class="slide-menu-name">Menu</span>
          <button id="slide-close-button" type="button"></button>
        </div>
        <div class="slide-title-2-container">
          <span class="slide-menu2-icon"></span><span class="slide-menu2-name">Activity</span>
        </div>
      </div>
    `
    );
  }
}

export { Slide };
