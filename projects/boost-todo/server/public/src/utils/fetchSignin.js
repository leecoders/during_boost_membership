import { serverUrl } from "../serverConfig/index.js";

const fetchSignInResult = (userId, userPassword) => {
  return fetch(serverUrl + "signin/find-user", {
    method: "POST",
    body: JSON.stringify({ userId, userPassword }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response)
    .catch(error => "error");
};

export { fetchSignInResult };
