import { $ } from "../../utils/util.js";

class Header {
  constructor(parentElement, pageName) {
    this.parentElement = parentElement;
    this.pageName = pageName;
    this.render();
    this.menubutton = $("#menu-button");
    if (pageName !== "admin") this.setClickEvent(); // 관리자 페이지 -> 슬라이드 막음
  }

  setClickEvent() {
    this.menubutton.addEventListener("click", () => {
      const slideContainer = $(".slide-container");
      $(".body-area").style.zIndex = "100";
      slideContainer.style.right = "0rem";
    });
  }

  render() {
    this.parentElement.innerHTML = /*html*/ `
      <span>TODO</span>
      <div class="menu-button-wrapper">
          <button id="menu-button" type="button"></button>
      </div>
    `;
  }
}

export { Header };
