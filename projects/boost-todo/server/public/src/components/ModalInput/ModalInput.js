import { $ } from "../../utils/util.js";
import {
  fetchUpdateListName,
  fetchUpdateBoardName
} from "../../utils/fetchTodo.js";

class ModalInput {
  constructor(parentElement, targetComponent, message, title, isBoard) {
    this.parentElement = parentElement;
    this.targetComponent = targetComponent;
    this.message = message;
    this.title = title;
    this.isBoard = isBoard;
    this.render();
    this.setInputChangeEvent();
    this.setUpdateButtonClickEvent();
    this.setCloseButtonClickEvent();
  }

  getElement() {
    return $(".modal-input-wrapper");
  }

  setInputChangeEvent() {
    $(".input-area").value = this.targetComponent.name;
    $(".input-area").addEventListener("keyup", e => {
      if (e.target.value.length > 48)
        e.target.value = e.target.value.substring(0, 48);
    });
  }

  setCloseButtonClickEvent() {
    $(".input-close-button").addEventListener("click", () => {
      $(".outside").style.visibility = "hidden";
      this.getElement().remove();
    });
  }

  setUpdateButtonClickEvent() {
    $(".input-update-button").addEventListener("click", () => {
      if (!!this.isBoard) this.updateBoardTitle();
      else this.updateListTitle();
    });
    $(".input-area").addEventListener("keyup", e => {
      if (e.key === "Enter") {
        if (!!this.isBoard) this.updateBoardTitle();
        else this.updateListTitle();
      }
    });
  }

  async updateBoardTitle() {
    const title = $(".input-area").value;
    if (!title.trim()) return;
    const result = await fetchUpdateBoardName(this.targetComponent.id, title);
    if (result.message !== "success") {
      console.log(result.message);
      return;
    }
    this.title.innerText =
      title.length > 24 ? title.substring(0, 24) + "..." : title;
    this.targetComponent.name = title;
    $(".outside").style.visibility = "hidden";
    this.getElement().remove();
  }

  async updateListTitle() {
    const title = $(".input-area").value;
    if (!title.trim()) return;
    const result = await fetchUpdateListName(this.targetComponent.id, title);
    if (result.message !== "success") {
      console.log(result.message);
      return;
    }
    this.title.innerText =
      title.length > 16 ? title.substring(0, 16) + "..." : title;
    this.targetComponent.name = title;
    $(".outside").style.visibility = "hidden";
    this.getElement().remove();
  }

  render() {
    this.parentElement.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <div class="modal-input-wrapper">
        <div class="input-title-container">
            <span class="input-title-wrapper">Edit title</span>
            <span class="input-close-button"></span>
        </div>
        <div class="input-message-container">
            ${this.message}
        </div>
        <div class="input-input-container">
            <input class="input-area"></input>
        </div>
        <div class="input-update-button">Update</div>
      </div>
    `
    );
  }
}

export { ModalInput };
