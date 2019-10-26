import { $, isOutSideOfLayerClicked } from "../../utils/util.js";
import { fetchSignInResult } from "../../utils/fetchSignin.js";
import { Modal } from "../../components/Modal/Modal.js";
import { serverUrl } from "../../serverConfig/index.js";

const alertFailure = () => {
  const message = "입력한 정보를 다시 확인해주세요.";
  const modal = new Modal($(".body-area"), message).getElement();
};

const tryLogin = async () => {
  const id = $("#id").value;
  const password = $("#password").value;
  const loginResult = await fetchSignInResult(id, password);
  if (loginResult === "success") {
    // 정보 확인 후 수동으로 submit(SPA식.. 변경 필요)
    const form = $(".sign-in-form");
    form.setAttribute("method", "post");
    form.setAttribute("action", serverUrl + "signin/signin");
    form.submit();
    return;
  } else {
    // fetch를 통해 빠른 알림(SPA식.. 변경 필요)
    alertFailure();
    console.log(loginResult);
  }
};

const loginButton = $("#sign-in-button");
const inputPassword = $("#password");
loginButton.addEventListener("click", async () => {
  tryLogin();
});

inputPassword.addEventListener("keydown", async e => {
  if (e.key == "Enter") {
    tryLogin();
  }
});

$("body").addEventListener("click", e => {
  const layer = $(".modal-wrapper");
  if (!layer) return;
  if (isOutSideOfLayerClicked(layer, e)) {
    layer.remove();
    $(".outside").style.display = "none";
    $("body").style.overflow = "scroll";
  }
});
