import { $ } from "../../utils/util.js";

class Modal {
  constructor(parentElement, message, listId) {
    this.parentElement = parentElement;
    this.message = message;
    this.render();
    this.setClickEvent();
    $(".outside").style.display = "block";
    $("body").style.overflow = "hidden";
  }

  getElement() {
    return $(".modal-wrapper");
  }

  setClickEvent() {
    $(".button-container").addEventListener("click", () => {
      $(".outside").style.display = "none";
      $("body").style.overflow = "scroll";
      this.getElement().remove();
    });
  }

  render() {
    this.parentElement.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <div class="modal-wrapper">
          <div class="message-container">${this.message}</div>
          <div class="button-container">${"확인"}</div>
      </div>
    `
    );
  }
}

export { Modal };
