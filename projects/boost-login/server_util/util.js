const uuidv1 = require("uuid/v1");

/**
 * 유저 아이디를 입력 받아 ssid로 사용할 uuid 값을 반환
 * @param {string} userId
 */
const getUuid = userId => {
  return uuidv1(userId);
};

/**
 * 회원가입 양식에서 관심사 부분을 배열로 입력받아 구분자 ,를 포함한 문자열로 반환하는 함수
 * @param {Array} userInterests
 */
const getUserInterestsStr = userInterests => {
  let ret = "" + userInterests[0];
  for (let i = 1; i < userInterests.length; ++i) ret += "," + userInterests[i];
  return ret;
};

module.exports = { getUuid, getUserInterestsStr };
