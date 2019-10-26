import { $, findAncestorsElement } from "../../utils/util.js";
import {
  fetchBoardsByUserId,
  fetchListsByBoardId,
  fetchTodosByListId,
  fetchSortListOrder,
  fetchTodoBelongList,
  fetchAddColumn
} from "../../utils/fetchTodo.js";
import { ModalInput } from "../ModalInput/ModalInput.js";
import { List } from "../List/List.js";

class Section {
  constructor(parentElement, userId) {
    this.parentElement = parentElement;
    this.userId = userId;
    this.dragTarget;
    this.boardsData; // 보드 데이터 객체 배열(현재는 길이 1)
    // 현재 유저 당 보드 1개 -> 추후 여러 개 보드 선택하는 기능 추가 예정
    this.init();
  }
  async init() {
    this.render();
    await this.setBoardsData();
    this.setLists();
    this.setTodoDragEvent();
    this.setListMouseEnterEvent();
    this.setTodoMouseEnterEvent();
    this.setListAddButtonClickEvent();
    this.setBoardTitleClickEvent();
  }

  async setBoardsData() {
    const result = await fetchBoardsByUserId(this.userId);
    if (result.message !== "success") {
      // 에러
      console.log(result.message);
      return;
    }
    this.boardsData = Array.prototype.map.call(result.data, board => {
      return {
        id: board.BOARD_ID,
        name: board.BOARD_NAME,
        writable: board.BOARD_WRITE_PERMISSION,
        readable: board.BOARD_READ_PERMISSION,
        lists: []
      };
    });
    for (const board of this.boardsData) {
      board.lists = await this.setListsData(board.id);
    }
  }

  async setListsData(boardId) {
    const result = await fetchListsByBoardId(boardId);
    if (result.message !== "success") {
      // 에러
      console.log(result.message);
      return;
    }
    const listsData = Array.prototype.map.call(result.data, list => {
      return {
        id: list.LIST_ID,
        name: list.LIST_NAME,
        todos: []
      };
    });
    for (const list of listsData) {
      list.todos = await this.setTodosData(list.id);
    }
    return listsData;
  }

  async setTodosData(listId) {
    const result = await fetchTodosByListId(listId);
    if (result.message !== "success") {
      // 에러
      console.log(result.message);
      return;
    }
    return Array.prototype.map.call(result.data, todo => {
      return {
        id: todo.TODO_ID,
        order: todo.TODO_ORDER,
        content: todo.TODO_CONTENT,
        addedBy: todo.TODO_ADDED_BY
      };
    });
  }

  async updateTodoBelongList() {
    const result = await fetchTodoBelongList(
      +this.todo.id.split("wrapper-")[1],
      this.boardsData[0].lists[this.listEnd].id // 보드 추가 시 수정 대상
    );
    if (result.message !== "success") {
      console.log(result.message);
      return;
    }
  }

  async addColumn() {
    const result = await fetchAddColumn(this.boardsData[0].id); // 보드 추가 시 수정 대상
    if (result.message !== "success") {
      console.log(result.message);
      return;
    }
    const listObj = {
      id: result.data.id,
      name: result.data.name,
      todos: []
    };
    this.boardsData[0].lists.push(listObj); // 보드 추가 시 수정 대상
    this.listArray.push(
      new List(
        $(".list-container"),
        this.listArray.length,
        listObj,
        this.userId
      )
    );
  }

  async sortListTodos() {
    const listStartTodoIdArray = this.getTodoIdArray(this.listStart);
    const listEndTodoIdArray = this.getTodoIdArray(this.listEnd);
    const result = await fetchSortListOrder(
      listStartTodoIdArray,
      listEndTodoIdArray
    );
    if (result.message !== "success") {
      console.log(result.message);
      return;
    }
  }

  setLists(board) {
    // 현재는 유저 당 보드 1개 -> 업데이트 예정
    if (!this.boardsData) return;
    board = this.boardsData[0];
    this.listArray = [];
    for (let i = 0; i < board.lists.length; ++i) {
      this.listArray.push(
        new List($(".list-container"), i, board.lists[i], this.userId)
      );
    }
  }

  getTodoIdArray(listNum) {
    const todoContainer = $(`#todo-container-${listNum}`);
    return Array.prototype.map.call(todoContainer.children, todo => {
      return +todo.id.split("wrapper-")[1];
    });
  }

  changeListCounterAfterMove() {
    $(`#todo-counter-${this.listStart}`).innerText--;
    $(`#todo-counter-${this.listEnd}`).innerText++;
  }

  setTodoMouseEnterEvent() {
    Array.prototype.forEach.call(
      document.querySelectorAll(".todo-wrapper"),
      todo => {
        todo.addEventListener("mousemove", e => {
          if (!this.dragTarget) return;
          if (todo === this.todo) return; // this.todo(드래그 source)가 이벤트를 받으면 안됨
          const todoContainer = todo.parentNode;
          const mouseY = e.clientY;
          const top = todo.getBoundingClientRect().top;
          const bottom = todo.getBoundingClientRect().bottom;
          this.todo.remove();
          if (mouseY - top > bottom - mouseY) {
            if (!!todo.nextElementSibling) {
              todoContainer.insertBefore(this.todo, todo.nextElementSibling);
            } else {
              todoContainer.appendChild(this.todo);
            }
          } else {
            todoContainer.insertBefore(this.todo, todo);
          }
        });
      }
    );
  }

  setListMouseEnterEvent() {
    if (!this.listArray) return;
    this.listArray.forEach((list, idx) => {
      $(`#todo-container-${idx}`).addEventListener("mouseenter", e => {
        if (!this.dragTarget) return;
        const target = e.target;
        this.todo.remove(); // 지워도 변수에 DOM이 남아있다!
        target.appendChild(this.todo); // 그래서 재사용 가능! (또 remove하면 참조가 남아서 또 지워짐!)
      });
    });
  }

  setTodoDragEvent() {
    $("body").addEventListener("mousedown", e => {
      // 변경 시작 시점
      if (this.dragTarget) return;
      if (e.target.className === "todo-delete-button") return;
      const target = e.target;
      const todo = findAncestorsElement(target, "todo-wrapper");
      if (todo.className !== "todo-wrapper") return;
      const todoX = todo.getBoundingClientRect().x;
      const todoY = todo.getBoundingClientRect().y;
      this.dragStartX = e.clientX; // 마우스 시작 좌표
      this.dragStartY = e.clientY;
      this.dragTodoX = todoX;
      this.dragTodoY = todoY - 7.5; // margin-top 보정(left는 auto라서 안잡힘)
      this.dragTarget = todo.cloneNode(true);
      this.dragTarget.style.left = this.dragTodoX + "px";
      this.dragTarget.style.top = this.dragTodoY + "px";
      this.dragTarget.classList.add("dragging");
      this.todo = todo;
      this.listStart = findAncestorsElement(target, "todo-container").id.split(
        "container-"
      )[1];
      todo.style.opacity = "0.5";
      $("body").appendChild(this.dragTarget);
    });
    $("body").addEventListener("mousemove", e => {
      if (!this.dragTarget) return;
      const relativeX = e.clientX - this.dragStartX;
      const relativeY = e.clientY - this.dragStartY;
      this.dragTarget.style.left = this.dragTodoX + relativeX + "px";
      this.dragTarget.style.top = this.dragTodoY + relativeY + "px";
      e.stopPropagation();
      e.preventDefault();
    });
    $("body").addEventListener("mouseup", async e => {
      // 변경 완료 시점
      if (!this.dragTarget) return;
      this.todo.style.opacity = "1";
      this.dragTarget.remove();
      this.dragTarget = undefined;
      this.listEnd = findAncestorsElement(this.todo, "todo-container").id.split(
        "container-"
      )[1];
      await this.updateTodoBelongList();
      this.changeListCounterAfterMove();
      this.sortListTodos();
    });
  }

  setListAddButtonClickEvent() {
    $(".section-list-add-container").addEventListener("click", () => {
      this.addColumn();
    });
  }

  setBoardTitleClickEvent() {
    $(".board-title").innerText =
      this.boardsData[0].name.length > 24
        ? this.boardsData[0].name.substring(0, 24) + "..."
        : this.boardsData[0].name;
    $(".board-title").addEventListener("click", () => {
      $(".outside").style.visibility = "visible";
      $("body").style.overflowX = "hidden";
      this.modalInput = new ModalInput(
        $(".outside"),
        this.boardsData[0],
        "Board name",
        $(".board-title"),
        "board"
      );
    });
  }

  render() {
    this.parentElement.innerHTML = /*html*/ `
      <div class="section-container">
        <div class="section-title-container">
          <span class="board-title">
            투두 타이틀
          </span>
        </div>
        <div class="list-container">
        </div>
      </div>
      <div class="section-list-add-container">
        <span class="plus-icon"></span><span>Add column</span></div>
    `;
  }
}

export { Section };
