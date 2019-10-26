import { $ } from "../../utils/util.js";

class Todo {
  constructor(parentElement, todo) {
    this.parentElement = parentElement;
    this.todo = todo;
    this.render();
  }

  getElement() {
    return $(`#todo-wrapper-${this.todo.order}`);
  }

  render() {
    this.parentElement.insertAdjacentHTML(
      "beforeend",
      /*html*/ `
      <div id="todo-wrapper-${this.todo.id}" class="todo-wrapper">
        <div class="todo-text-image"></div>
        <div class="todo-content-container">
          <div class="todo-content">${this.todo.content}</div>
          <div class="todo-info-wrapper">
            <span class="added-by">Added by</span>
            <span class="added-by-id">${this.todo.addedBy}</span>
          </div>
        </div>
        <div id="todo-delete-button-${this.todo.id}" class="todo-delete-button"></div>
      </div>
      `
    );
  }
}

export { Todo };
