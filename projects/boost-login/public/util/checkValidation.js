import { includeSpecial } from "./util.js";
import { fetchCheckDuplicateResult } from "./fetch.js";

const checkId = id => {
  if (!(5 <= id.length && id.length <= 20)) {
    return false;
  }
  for (let i = 0; i < id.length; ++i) {
    if (
      !(
        ("a" <= id[i] && id[i] <= "z") ||
        ("0" <= id[i] && id[i] <= "9") ||
        id[i] === "-" ||
        id[i] === "_"
      )
    ) {
      return false;
    }
  }
  return true;
};

const checkDuplicate = async id => {
  return await fetchCheckDuplicateResult(id);
};

const checkPassword = password => {
  let resultCheckLength,
    resultCheckNumber,
    resultCheckCapital,
    resultCheckSpecial;
  resultCheckLength = resultCheckNumber = resultCheckCapital = resultCheckSpecial = false;
  if (8 <= password.length && password.length <= 16) {
    resultCheckLength = true;
  }

  Array.from(password).forEach(c => {
    if ("0" <= c && c <= "9") resultCheckNumber = true;
    if ("A" <= c && c <= "Z") resultCheckCapital = true;
  });
  resultCheckSpecial = includeSpecial(password);
  if (!resultCheckLength) return "8자 이상 16자 이하로 입력해주세요.";
  if (!resultCheckNumber) return "숫자를 최소 1자 이상 포함해주세요.";
  if (!resultCheckCapital) return "영문 대문자를 최소 1자 이상 포함해주세요.";
  if (!resultCheckSpecial) return "특수문자를 최소 1자 이상 포함해주세요.";
  return "안전한 비밀번호입니다.";
};

const checkYear = year => {
  const nowYear = new Date().getFullYear();
  if (year.length !== 4) return "태어난 년도 4자리를 정확하게 입력하세요.";
  if (nowYear - year + 1 < 15) return "만 14세 이상만 가입 가능합니다.";
  if (nowYear - year + 1 >= 100) return "정말이세요?";
  return "";
};

const checkDay = (year, month, day) => {
  const lastDay = new Date(year, month, 0).getDate();
  if (month != "" && 1 <= day && day <= lastDay) return "";
  return "태어난 날짜를 다시 확인해주세요.";
};

const checkEmail = email => {
  const idxOfFirstSeparater = email.indexOf("@");
  const idxOfSecondSeparater = email.indexOf(".");

  if (
    idxOfFirstSeparater < 1 ||
    idxOfSecondSeparater < 1 ||
    idxOfFirstSeparater > idxOfSecondSeparater ||
    idxOfSecondSeparater - idxOfFirstSeparater === 1 ||
    idxOfSecondSeparater + 1 === email.length
  ) {
    return "이메일 주소를 다시 확인해주세요.";
  }
  return "";
};

const checkPhone = phone => {
  const resultCheckOnlyNumber = !/[^0-9]/g.test(phone);
  if (
    !(10 <= phone.length && phone.length <= 11) ||
    phone.substring(0, 3) != "010" ||
    !resultCheckOnlyNumber
  ) {
    return "형식에 맞지 않는 번호입니다.";
  }
  return "";
};

const checkInterests = tagCnt => {
  if (tagCnt < 3) return "3개 이상의 관심사를 입력하세요.";
  else return "";
};

const checkValidation = userInfo => {
  if (userInfo.userId === undefined) return "아이디를 확인해주세요.";
  if (userInfo.userPassword === undefined) return "비밀번호를 확인해주세요.";
  if (userInfo.userPasswordCheck === undefined)
    return "비밀번호를 재확인해주세요.";
  if (userInfo.userName === undefined) return "이름을 확인해주세요.";
  if (
    userInfo.userYear === undefined ||
    userInfo.userMonth === undefined ||
    userInfo.userDay === undefined
  )
    return "생년월일을 확인해주세요.";
  if (userInfo.userGender === undefined) return "성별을 확인해주세요.";
  if (userInfo.userEmail === undefined) return "이메일을 확인해주세요.";
  if (userInfo.userPhone === undefined) return "휴대전화 번호를 확인해주세요.";
  if (userInfo.userInterestsOver2 === undefined)
    return "관심사를 확인해주세요.";
  if (userInfo.userAgree === undefined) return "약관에 동의해주세요.";
  return "";
};

export {
  checkId,
  checkDuplicate,
  checkPassword,
  checkYear,
  checkDay,
  checkEmail,
  checkPhone,
  checkInterests,
  checkValidation
};
