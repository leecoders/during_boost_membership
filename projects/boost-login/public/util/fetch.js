const fetchSignInResult = (userId, userPassword) => {
  return fetch("/sign-ins/sign-in", {
    method: "POST",
    body: JSON.stringify({ userId, userPassword }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response) // true or false
    .catch(error => "error");
};

const fetchSignUpResult = userInfo => {
  return fetch("/sign-ups/sign-up", {
    method: "POST",
    body: JSON.stringify(userInfo),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response) // true or false
    .catch(error => "error");
};

const fetchCheckDuplicateResult = userId => {
  return fetch("/sign-ups/check-duplicate", {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => response) // true or false
    .catch(error => "error");
};

const fetchIsCookieAlreadyValidResult = () => {
  return fetch("/sign-ins/check-cookie", {
    method: "POST"
  })
    .then(res => res.json())
    .then(response => response) // true or false
    .catch(error => "error");
};

const fetchUserInfo = () => {
  return fetch("/mains/user-info", {
    method: "POST"
  })
    .then(res => res.json())
    .then(response => response) // true or false
    .catch(error => "error");
};

const fetchUserName = () => {
  return fetch("/mains/user-name", {
    method: "POST"
  })
    .then(res => res.json())
    .then(response => response.userName) // string
    .catch(error => "error");
};

const fetchLogout = () => {
  return fetch("/mains/logout", {
    method: "POST"
  })
    .then(res => res.json())
    .then(response => response) // true or false
    .catch(error => "error");
};

export {
  fetchSignInResult,
  fetchSignUpResult,
  fetchCheckDuplicateResult,
  fetchIsCookieAlreadyValidResult,
  fetchUserInfo,
  fetchUserName,
  fetchLogout
};
