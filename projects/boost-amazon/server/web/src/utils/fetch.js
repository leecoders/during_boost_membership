// const serverUrl = "http://106.10.34.142:3000/";
const serverUrl = "http://localhost:3000/";

const fetchSignInResult = (id, password) => {
  return fetch(serverUrl + "signin/submit", {
    method: "POST",
    body: JSON.stringify({ id, password }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchAllUsers = () => {
  return fetch(serverUrl + "users/all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchGradeChange = (id, destGrade) => {
  return fetch(serverUrl + "users/change-grade", {
    method: "POST",
    body: JSON.stringify({ id, destGrade }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchCheckItemName = name => {
  return fetch(serverUrl + "items/check-item-name", {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchAddItem = (image, name, category, summary) => {
  const formData = new FormData();
  formData.append("item", image);
  formData.append("name", name);
  formData.append("category", category);
  formData.append("summary", summary);
  return fetch(serverUrl + "items/add", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchItemInfoList = categoryName => {
  return fetch(serverUrl + "items/item-info-list", {
    method: "POST",
    body: JSON.stringify({ categoryName }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchDeleteItem = (categoryName, itemName) => {
  return fetch(serverUrl + "items/delete", {
    method: "POST",
    body: JSON.stringify({ categoryName, itemName }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

export {
  fetchSignInResult,
  fetchAllUsers,
  fetchGradeChange,
  fetchCheckItemName,
  fetchAddItem,
  fetchItemInfoList,
  fetchDeleteItem
};
