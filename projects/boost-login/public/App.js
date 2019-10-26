import signInBody from "../template/signInBody.js";
import signUpBody from "../template/signUpBody.js";
import agreeText from "../template/agreeText.js";
import mainBody from "../template/mainBody.js";
import outsideUnderLayer from "../template/outsideUnderLayer.js";
import userBubbleLayer from "../template/userBubbleLayer.js";
import {
  fetchSignUpResult,
  fetchSignInResult,
  fetchIsCookieAlreadyValidResult,
  fetchUserInfo,
  fetchUserName,
  fetchLogout
} from "../util/fetch.js";
import {
  checkId,
  checkDuplicate,
  checkPassword,
  checkYear,
  checkDay,
  checkEmail,
  checkPhone,
  checkInterests,
  checkValidation
} from "../util/checkValidation.js";
import {
  deleteFromUserInfo,
  deleteTag,
  closeAllLayer,
  closeLayer,
  isOutSideOfLayer,
  stopParentsScroll,
  initPageSetting
} from "../util/util.js";

document.body.addEventListener("mouseup", e => {
  const layer = document.querySelector(".layer");
  if (layer === null) return;
  const boundingRect = layer.getBoundingClientRect();
  const x1 = boundingRect.x;
  const y1 = boundingRect.y;
  const x2 = x1 + boundingRect.width;
  const y2 = y1 + boundingRect.height;
  if (isOutSideOfLayer(e.x, e.y, x1, y1, x2, y2)) {
    closeLayer(layer);
  }
});

const signUpUser = async userInfo => {
  const signUpResult = await fetchSignUpResult(userInfo);
  if (signUpResult === true) window.location = "#main";
  // 회원 가입 실패(에러) 처리 필요
};

const moveMainPage = async () => {
  document.body.innerHTML = mainBody;
  document.body.style.background = "#fff";
  document.querySelector("#year").innerHTML = new Date().getFullYear();
  const mainContainer = document.querySelector(".main-container");
  const mainSection = document.querySelector("#main-section");
  const footer = document.querySelector("footer");
  const userButton = document.querySelector("#user-button");
  const showNavButton = document.querySelector("#show-nav-button");
  let isLayerOn = false;
  const userName = await fetchUserName();
  if (userName == "error") {
    window.location = "#sign-in";
  }
  document.querySelector("#user-name-area").innerText = `${userName}`;
  userButton.addEventListener("click", () => {
    if (isLayerOn) {
      const userBubble = document.querySelector(".bubble-container");
      closeAllLayer(mainContainer);
      mainContainer.insertAdjacentHTML("beforeend", outsideUnderLayer);
      mainContainer.insertAdjacentHTML("beforeend", userBubbleLayer);
      stopParentsScroll(userBubble);
      const userInfoButton = document.querySelector("#user-info-button");
      const logoutButton = document.querySelector("#logout-button");
      logoutButton.addEventListener("click", async () => {
        const result = await fetchLogout();
        if (result) window.location = "#sign-in";
      });
      userInfoButton.addEventListener("click", async () => {
        const userInfo = await fetchUserInfo();
        if (userInfo == "error") {
          window.location = "#sign-in";
        }
      });
    }
  });
  userButton.addEventListener("mousedown", () => {
    const userBubble = document.querySelector(".bubble-container");
    if (userBubble) isLayerOn = false;
    else isLayerOn = true;
  });
  mainSection.style.top = "350px"; // 이상하게 초기값 안주면 값이 비어있음.. (css에서 설정했는데?)
  showNavButton.addEventListener("click", () => {
    if (mainSection.style.top == "0px") {
      // down
      mainSection.classList.remove("up");
      mainSection.classList.add("down");
      mainSection.style.top = "350px"; // 여기도 마지막 to 값 지정안하면 다시 원상복구됨
      footer.classList.remove("up");
      footer.classList.add("down");
      footer.style.bottom = "-150px";
      setTimeout(() => {
        showNavButton.classList.remove("up");
        showNavButton.classList.add("down");
      }, 500);
    } else {
      // up
      mainSection.classList.remove("down");
      mainSection.classList.add("up");
      mainSection.style.top = "0px";
      footer.classList.remove("down");
      footer.classList.add("up");
      footer.style.bottom = "200px";
      setTimeout(() => {
        showNavButton.classList.remove("down");
        showNavButton.classList.add("up");
      }, 500);
    }
  });
};

const moveSignInPage = async () => {
  initPageSetting();
  const isCookieAlreadyValid = await fetchIsCookieAlreadyValidResult();
  if (isCookieAlreadyValid == true) {
    window.location = "#main";
    return;
  }
  const body = document.querySelector("body");
  body.innerHTML = signInBody;
  document.querySelector(".sign-up-button").addEventListener("click", () => {
    window.location = "#sign-up";
  });

  document
    .querySelector("#sign-in-button")
    .addEventListener("click", async () => {
      const signInId = document.querySelector("#sign-in-id").value;
      const signInPassword = document.querySelector("#sign-in-password").value;
      let message = "";
      if (signInId == "") message = "아이디를 입력해주세요.";
      else if (signInPassword == "") message = "비밀번호를 입력해주세요.";
      else {
        const result = await fetchSignInResult(signInId, signInPassword);
        if (!result) message = "아이디 또는 비밀번호를 확인해주세요.";
      }
      if (message == "") {
        window.location = "#main";
        return;
      }

      let validateCheckLayer = document.querySelector(".validate-check-layer");
      if (validateCheckLayer !== null) return; // 중복 방지
      const section = document.querySelector("section");
      closeAllLayer(section);
      const validateCheckArea = document.createElement("div");
      const titleArea = document.createElement("div");
      const buttonArea = document.createElement("div");
      const okButton = document.createElement("button");
      validateCheckLayer = document.createElement("div");
      validateCheckLayer.style.top = "20%";
      validateCheckLayer.style.left = "50%";
      validateCheckLayer.style.marginLeft = "-180px";
      validateCheckLayer.className = "validate-check-layer layer";
      validateCheckArea.id = "validate-check-area";
      titleArea.id = "validate-title-area";
      titleArea.innerHTML = `<h3>${message}</h3>`;
      okButton.id = "validate-ok-button";
      okButton.innerText = "확인";
      section.insertAdjacentHTML("beforeend", outsideUnderLayer);
      section.appendChild(validateCheckLayer);
      validateCheckArea.appendChild(titleArea);
      buttonArea.appendChild(okButton);
      validateCheckArea.appendChild(buttonArea);
      validateCheckLayer.appendChild(validateCheckArea);
      stopParentsScroll(validateCheckLayer);

      document
        .querySelector("#validate-ok-button")
        .addEventListener("click", () => {
          closeLayer(validateCheckLayer);
        });
    });
};

const moveSignUpPage = () => {
  const body = document.querySelector("body");
  body.innerHTML = signUpBody;
  let id, password, passwordCheck, year, month, day, gender, email, phone;
  let tagCnt = 0,
    lastTagId = 0;
  let scrollToBottomOnce = false;
  let userInfo = {
    userId: undefined,
    userPassword: undefined,
    userName: undefined,
    userYear: undefined,
    userMonth: undefined,
    userDay: undefined,
    userGender: undefined,
    userEmail: undefined,
    userPhone: undefined,
    userInterests: [],
    userPasswordCheck: undefined,
    userInterestsOver2: undefined,
    userAgree: undefined
  };

  document.querySelector("#id").addEventListener("blur", async e => {
    id = e.target.value;
    const idMessage = document.querySelector("#id-message");
    if (!checkId(id)) {
      idMessage.innerHTML = `<span style="color:red">5~20자의 영문 소문자, 숫자와 특수기호(-), (_) 만 사용 가능합니다.</span>`;
      userInfo.userId = undefined;
      return;
    }
    if (await checkDuplicate(id)) {
      idMessage.innerHTML = `<span style="color:red">이미 사용중인 아이디입니다.</span>`;
      userInfo.userId = undefined;
      userInfo.userIdCheck = undefined;
      return;
    }
    idMessage.innerHTML = `<span style="color:#08a600">사용 가능한 아이디입니다.</span>`;
    userInfo.userId = id;
    userInfo.userIdCheck = true;
  });

  document.querySelector("#password").addEventListener("blur", e => {
    document.querySelector("#password-check").value = "";
    document.querySelector("#password-check-message").innerHTML = "";
    userInfo.userPasswordCheck = undefined;
    password = e.target.value;
    const message = checkPassword(password);
    if (message == "안전한 비밀번호입니다.") {
      document.querySelector(
        "#password-message"
      ).innerHTML = `<span style="color:#08a600">${message}</span>`;
    } else {
      userInfo.userPassword = undefined;
      document.querySelector(
        "#password-message"
      ).innerHTML = `<span style="color:red">${message}</span>`;
    }
  });

  document.querySelector("#password-check").addEventListener("blur", e => {
    passwordCheck = e.target.value;
    if (password == passwordCheck) {
      document.querySelector(
        "#password-check-message"
      ).innerHTML = `<span style="color:#08a600">비밀번호가 일치합니다.</span>`;
      if (password == passwordCheck) {
        userInfo.userPasswordCheck = true;
        userInfo.userPassword = password;
      } else {
        userInfo.userPasswordCheck = undefined;
        userInfo.userPassword = undefined;
      }
    } else {
      userInfo.userPasswordCheck = undefined;
      document.querySelector(
        "#password-check-message"
      ).innerHTML = `<span style="color:red">비밀번호가 일치하지 않습니다.</span>`;
    }
  });

  document.querySelector("#year").addEventListener("blur", e => {
    year = e.target.value;
    const message = checkYear(year);
    document.querySelector(
      "#birth-message"
    ).innerHTML = `<span style="color:red">${message}</span>`;
    if (message == "") {
      userInfo.userYear = year;
    } else {
      userInfo.userYear = undefined;
    }
  });
  document.querySelector("#month").addEventListener("change", e => {
    month = e.target.value;
    userInfo.userMonth = month;
    const message = checkDay(year, month, day);
    document.querySelector(
      "#birth-message"
    ).innerHTML = `<span style="color:red">${message}</span>`;
  });
  document.querySelector("#day").addEventListener("blur", e => {
    day = e.target.value;
    const message = checkDay(year, month, day);
    document.querySelector(
      "#birth-message"
    ).innerHTML = `<span style="color:red">${message}</span>`;
    if (message == "") {
      userInfo.userDay = day;
    } else {
      userInfo.userDay = undefined;
    }
  });
  document.querySelector("#gender").addEventListener("blur", e => {
    gender = e.target.value;
    if (gender == "") userInfo.userGender = undefined;
    else userInfo.userGender = gender;
  });
  document.querySelector("#email").addEventListener("blur", e => {
    email = e.target.value;
    const message = checkEmail(email);
    document.querySelector(
      "#email-message"
    ).innerHTML = `<span style="color:red">${message}</span>`;
    if (message == "") {
      userInfo.userEmail = email;
    } else {
      userInfo.userEmail = undefined;
    }
  });
  document.querySelector("#phone").addEventListener("blur", e => {
    phone = e.target.value;
    const message = checkPhone(phone);
    document.querySelector(
      "#phone-message"
    ).innerHTML = `<span style="color:red">${message}</span>`;
    if (message == "") {
      userInfo.userPhone = phone;
    } else {
      userInfo.userPhone = undefined;
    }
  });
  document.querySelector("#interests").addEventListener("keyup", e => {
    let str = document.querySelector("#interests").value;
    if (e.key == "," || e.key == "Enter") {
      if (str[0] == "," || str == "") {
        document.querySelector("#interests").value = "";
        return;
      }
      if (str.length > 20) str = str.substring(0, 20) + "...";
      const nowTagId = lastTagId++;
      tagCnt++;
      if (e.key == ",") str = str.substring(0, str.length - 1);
      document.querySelector("#interests").value = str;
      const tagDom = `<span id="tag-${nowTagId}" class="interest-tag">
                        <span id="tag-${nowTagId}-content">${str}</span>
                        <button type="button" class="tag-delete-button" id="tag-delete-${nowTagId}">x</button>
                      </span>`;
      userInfo.userInterests.push(str);
      document
        .querySelector("#interests")
        .insertAdjacentHTML("beforebegin", tagDom);
      document.querySelector("#interests").value = "";
      document
        .querySelector(`#tag-delete-${nowTagId}`)
        .addEventListener("click", () => {
          tagCnt--;
          const targetTagsContent = document.querySelector(
            `#tag-${nowTagId}-content`
          ).innerText;
          deleteFromUserInfo(userInfo, targetTagsContent);
          deleteTag(`#tag-${nowTagId}`);
        });
    }
    const virtualDom = document.createElement("div");
    virtualDom.innerHTML = str;
    virtualDom.id = "virtual-dom";
    virtualDom.style.display = "inline-block";
    virtualDom.style.width = "auto";
    document.querySelector("body").appendChild(virtualDom);
    const virtualDomWidth = virtualDom.clientWidth;
    const maxWidth = document.querySelector(".interests-area").clientWidth - 30; // 30은 패딩
    const nextWidth =
      virtualDomWidth + 14 > maxWidth ? maxWidth : virtualDomWidth + 14;
    document.querySelector("#interests").style.width = `${nextWidth}px`;
    document.querySelector("body").removeChild(virtualDom);
  });

  document.querySelector("#interests").addEventListener("keydown", e => {
    if (e.target.value != "") return;
    if (e.key == "Backspace" || e.key == "Delete") {
      const inputDom = document.querySelector("#interests");
      const previousTag = inputDom.previousSibling;
      if (!previousTag.id) return; // 왼쪽에 태그가 없을 때 id는 undefined
      const previousTagContent = document.querySelector(
        `#${previousTag.id}-content`
      ).innerText;
      inputDom.value = previousTagContent + "!"; // keydown 이후 한 글자 지워지는 것을 방지
      tagCnt--;
      deleteFromUserInfo(userInfo, previousTagContent);
      deleteTag(`#${previousTag.id}`);
    }
  });

  document.querySelector(".interests-area").addEventListener("click", () => {
    document.querySelector("#interests").focus();
  });
  document.querySelector("#interests").addEventListener("blur", () => {
    const message = checkInterests(tagCnt);
    document.querySelector(
      "#interests-message"
    ).innerHTML = `<span style="color:red">${message}</span>`;
    if (message == "") {
      userInfo.userInterestsOver2 = true;
    } else {
      userInfo.userInterestsOver2 = undefined;
    }
  });
  document.querySelector("#agree-checkbox").addEventListener("click", () => {
    const checkbox = document.querySelector("#agree-checkbox");
    checkbox.checked = !checkbox.checked; // 체크박스 직접 제어 제한시킴
  });
  document.querySelector("#agree-button").addEventListener("click", () => {
    let agreeLayer = document.querySelector(".agree-layer");
    if (document.querySelector("#agree-checkbox").checked === true) return; // 동의 되었으면 다시 약관창 제한
    if (agreeLayer !== null) return; // "동의합니다" 클릭 시 중복 레이어 방지
    const section = document.querySelector("section");
    closeAllLayer(section);
    const checkbox = document.querySelector("#agree-checkbox");
    const closeButton = document.createElement("button");
    const agreeArea = document.createElement("div");
    const titleArea = document.createElement("div");
    const textArea = document.createElement("div");
    const buttonArea = document.createElement("div");
    agreeLayer = document.createElement("div");
    agreeLayer.className = "agree-layer layer";
    agreeArea.id = "agree-area";
    closeButton.id = "close-button";
    closeButton.type = "button";
    closeButton.innerText = "x";
    titleArea.innerHTML = `<h3>개인정보 수집 및 이용에 대한 안내</h3>`;
    titleArea.id = "title-area";
    textArea.innerHTML = agreeText;
    textArea.id = "text-area";
    buttonArea.innerHTML = `<button class="check-agree-button" type="button">동의</button>`;
    section.insertAdjacentHTML("beforeend", outsideUnderLayer);
    section.appendChild(agreeLayer);
    agreeLayer.appendChild(closeButton);
    agreeLayer.appendChild(agreeArea);
    agreeArea.appendChild(titleArea);
    agreeArea.appendChild(textArea);
    agreeArea.appendChild(buttonArea);
    stopParentsScroll(agreeLayer);

    closeButton.addEventListener("click", () => {
      closeLayer(agreeLayer);
    });

    textArea.addEventListener("scroll", () => {
      if (
        textArea.scrollTop + textArea.clientHeight ===
        textArea.scrollHeight
      ) {
        if (!scrollToBottomOnce) {
          scrollToBottomOnce = true;
          const checkAgreeButton = document.querySelector(
            ".check-agree-button"
          );
          checkAgreeButton.className += " checked";
          checkAgreeButton.addEventListener("click", () => {
            checkbox.checked = true;
            userInfo.userAgree = true;
            closeLayer(agreeLayer);
          });
        }
      }
    });
  });

  document.querySelector("#reset-button").addEventListener("click", () => {
    let resetCheckLayer = document.querySelector(".reset-check-layer");
    if (resetCheckLayer !== null) return; // 중복 방지
    const section = document.querySelector("section");
    closeAllLayer(section);
    const resetCheckArea = document.createElement("div");
    const titleArea = document.createElement("div");
    const buttonArea = document.createElement("div");
    const okButton = document.createElement("button");
    const closeButton = document.createElement("button");
    resetCheckLayer = document.createElement("div");
    resetCheckLayer.className = "reset-check-layer layer";
    resetCheckArea.id = "reset-check-area";
    titleArea.id = "reset-title-area";
    titleArea.innerHTML = "<h3>모든 내용을 새로 작성하시겠습니까?</h3>";
    closeButton.id = "reset-close-button";
    closeButton.innerText = "취소";
    okButton.id = "reset-ok-button";
    okButton.innerText = "확인";
    section.insertAdjacentHTML("beforeend", outsideUnderLayer);
    section.appendChild(resetCheckLayer);
    resetCheckArea.appendChild(titleArea);
    buttonArea.appendChild(closeButton);
    buttonArea.appendChild(okButton);
    resetCheckArea.appendChild(buttonArea);
    resetCheckLayer.appendChild(resetCheckArea);
    stopParentsScroll(resetCheckLayer);

    closeButton.addEventListener("click", () => {
      closeLayer(resetCheckLayer);
    });
    okButton.addEventListener("click", () => {
      closeLayer(resetCheckLayer);
      window.location = "#sign-in";
      window.location = "#sign-up";
    });
  });

  document.querySelector("#submit-button").addEventListener("click", () => {
    userInfo.userName = document.querySelector("#name").value;
    userInfo.userName = userInfo.userName == "" ? undefined : userInfo.userName;
    const message = checkValidation(userInfo);
    if (message == "") {
      // 성공
      signUpUser(userInfo);
      return;
    }
    let validateCheckLayer = document.querySelector(".validate-check-layer");
    if (validateCheckLayer !== null) return; // 중복 방지
    const section = document.querySelector("section");
    closeAllLayer(section);
    const validateCheckArea = document.createElement("div");
    const titleArea = document.createElement("div");
    const buttonArea = document.createElement("div");
    const okButton = document.createElement("button");
    validateCheckLayer = document.createElement("div");
    validateCheckLayer.className = "validate-check-layer layer";
    validateCheckArea.id = "validate-check-area";
    titleArea.id = "validate-title-area";
    titleArea.innerHTML = `<h3>${message}</h3>`;
    okButton.id = "validate-ok-button";
    okButton.innerText = "확인";
    section.insertAdjacentHTML("beforeend", outsideUnderLayer);
    section.appendChild(validateCheckLayer);
    validateCheckArea.appendChild(titleArea);
    buttonArea.appendChild(okButton);
    validateCheckArea.appendChild(buttonArea);
    validateCheckLayer.appendChild(validateCheckArea);
    stopParentsScroll(validateCheckLayer);

    document
      .querySelector("#validate-ok-button")
      .addEventListener("click", () => {
        closeLayer(validateCheckLayer);
      });
  });
};

export { moveSignInPage, moveSignUpPage, moveMainPage };
