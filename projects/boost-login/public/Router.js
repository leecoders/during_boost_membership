import { moveSignInPage, moveSignUpPage, moveMainPage } from "./App.js";

const routes = {
  "": function() {
    moveSignInPage();
  },
  "sign-in": function() {
    moveSignInPage();
  },
  "sign-up": function() {
    moveSignUpPage();
  },
  main: function() {
    moveMainPage();
  },
  otherwise() {
    document.body.innerHTML = `${location.hash} Not Found`;
  }
};

function router() {
  const hash = location.hash.replace("#", "");
  (routes[hash] || routes.otherwise)();
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);
