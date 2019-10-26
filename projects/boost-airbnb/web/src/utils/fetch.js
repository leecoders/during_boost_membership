import { fetchUrl } from "../configs/fetch.js";

const fetchCheckCookie = () => {
  return fetch(fetchUrl + "users/check-cookie", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchSignInResult = (id, password) => {
  return fetch(fetchUrl + "users/signin", {
    method: "POST",
    body: JSON.stringify({ id, password }),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchSignUpResult = (id, password, name) => {
  return fetch(fetchUrl + "users/create-user", {
    method: "POST",
    body: JSON.stringify({ id, password, name }),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

const fetchGetRooms = () => {
  return fetch(fetchUrl + "rooms/get-rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include"
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

export {
  fetchCheckCookie,
  fetchSignInResult,
  fetchSignUpResult,
  fetchGetRooms
};
