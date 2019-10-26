import { serverUrl } from "../serverConfig/index.js";

const fetchUserInfo = () => {
  return fetch(serverUrl + "todo/user-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchBoardsByUserId = userId => {
  return fetch(serverUrl + "todo/get-boards", {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchListsByBoardId = boardId => {
  return fetch(serverUrl + "todo/get-lists", {
    method: "POST",
    body: JSON.stringify({ boardId }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchTodosByListId = listId => {
  return fetch(serverUrl + "todo/get-todos", {
    method: "POST",
    body: JSON.stringify({ listId }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchAddTodo = (order, content, addedBy, todoBelongList) => {
  return fetch(serverUrl + "todo/add-todo", {
    method: "POST",
    body: JSON.stringify({ order, content, addedBy, todoBelongList }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchDeleteTodo = todoId => {
  return fetch(serverUrl + "todo/delete-todo", {
    method: "POST",
    body: JSON.stringify({ todoId }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchSortListOrder = (listStartTodoIdArray, listEndTodoIdArray) => {
  return fetch(serverUrl + "todo/sort-list-order", {
    method: "POST",
    body: JSON.stringify({
      listStartTodoIdArray,
      listEndTodoIdArray
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchTodoBelongList = (todoId, listEndId) => {
  return fetch(serverUrl + "todo/update-todo-belong-list", {
    method: "POST",
    body: JSON.stringify({
      todoId,
      listEndId
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchAddColumn = boardId => {
  return fetch(serverUrl + "todo/add-column", {
    method: "POST",
    body: JSON.stringify({ boardId }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchUpdateListName = (listId, title) => {
  return fetch(serverUrl + "todo/update-list-name", {
    method: "POST",
    body: JSON.stringify({ listId, title }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchUpdateBoardName = (boardId, title) => {
  return fetch(serverUrl + "todo/update-board-name", {
    method: "POST",
    body: JSON.stringify({ boardId, title }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

export {
  fetchUserInfo,
  fetchBoardsByUserId,
  fetchListsByBoardId,
  fetchTodosByListId,
  fetchAddTodo,
  fetchDeleteTodo,
  fetchSortListOrder,
  fetchTodoBelongList,
  fetchAddColumn,
  fetchUpdateListName,
  fetchUpdateBoardName
};
