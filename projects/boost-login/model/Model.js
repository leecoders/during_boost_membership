const { getUuid, getUserInterestsStr } = require("../server_util/util.js");

/**
 * 서버에서 사용할 기능들을 포함하는 모델 객체를 정의한 클래스
 */
class Model {
  /**
   * @param {DB} db 정의한 DB 객체를 넘겨 받음
   * @param {HashMap} hashMapForSsid 정의한 해시맵 객체를 넘겨 받음
   */
  constructor(db, hashMapForSsid) {
    this.db = db;
    this.hashMapForSsid = hashMapForSsid;
  }
  /**
   * 세션 생성: 해시맵에 사용할 key 생성 -> value 지정
   * @param {string} userId
   * @return {string} ssid
   */
  makeAndSaveSsidFromUserId(userId) {
    const ssid = getUuid(userId);
    this.hashMapForSsid.put(ssid, {
      userId: userId,
      expires: new Date(Date.now() + 900000)
    });
    return ssid;
  }

  /**
   * 로그인: 사용자 정보(아이디, 비밀번호) 확인
   * @param {Request} req json 타입으로 받아 express.json() 미들웨어에 의해 파싱
   * @param {Response} res
   * @send {boolean} 해당 유저 탐색 성공, 실패 여부
   */
  isValidUser(req, res) {
    const { userId, userPassword } = req.body;
    const result = this.db.select(
      "USERS",
      "USER_ID",
      `USER_ID="${userId}" AND USER_PASSWORD="${userPassword}"`
    );
    if (!result.length) {
      res.send(false);
      return;
    }
    const ssid = this.makeAndSaveSsidFromUserId(userId);
    res.cookie("ssid", ssid, {
      expires: this.hashMapForSsid.get(ssid).expires,
      httpOnly: true
    });
    res.send(true);
  }

  /**
   * 회원가입: 회원가입 Form에서 값을 넘겨 받아(fetch) DB객체에 데이터 삽입, res 객체에 쿠키 생성하여 응답
   * @param {Request} req json 타입으로 받아 express.json() 미들웨어에 의해 파싱
   * @param {Response} res
   * @send {boolean} 성공, 실패 여부
   */
  addUser(req, res) {
    const {
      userId,
      userPassword,
      userName,
      userYear,
      userMonth,
      userDay,
      userGender,
      userEmail,
      userPhone,
      userInterests
    } = req.body;
    this.db.insert(
      "USERS",
      `("${userId}", "${userPassword}", "${userName}", "${userYear}", "${userMonth}", "${userDay}", "${userGender}", "${userEmail}", "${userPhone}", "${getUserInterestsStr(
        userInterests
      )}")`
    );
    console.log(userId + " 님이 회원가입 하셨습니다.");
    const ssid = this.makeAndSaveSsidFromUserId(userId);
    res.cookie("ssid", ssid, {
      expires: this.hashMapForSsid.get(ssid).expires,
      httpOnly: true
    });
    res.send(true);
  }

  /**
   * 중복확인: 회원가입 Form에서 아이디 blur 이벤트에서 호출됨
   * @param {Request} req json 타입으로 받아 express.json() 미들웨어에 의해 파싱
   * @param {Response} res
   * @send {boolean} 성공, 실패 여부
   */
  checkDuplicate(req, res) {
    const { userId } = req.body;
    const result = this.db.select("USERS", "USER_ID", `USER_ID="${userId}"`);
    if (result.length) res.send(true);
    else res.send(false);
  }

  /**
   * 로그인 없이 메인 페이지로 이동:
   * 로그인 화면 이동한 뒤 브라우저에 쿠키에 ssid가 있고, 세션과 싱크가 맞는지 체크
   * @param {Request} req json 타입으로 받아 express.json() 미들웨어에 의해 파싱
   * @param {Response} res
   * @send {boolean} 성공, 실패 여부
   */
  checkCookie(req, res) {
    if (req.cookies.ssid === undefined) {
      res.send(false);
      return;
    }
    const ssid = req.cookies.ssid;
    const userId =
      this.hashMapForSsid.get(ssid) !== undefined &&
      this.hashMapForSsid.get(ssid).userId;
    if (!ssid || !userId) {
      res.send(false);
      return;
    }
    res.send(true);
  }

  /**
   * 유저 정보 반환
   * @param {Request} req json 타입으로 받아 express.json() 미들웨어에 의해 파싱
   * @param {Response} res
   * @send {object} 유저 정보를 객체에 담아 전송
   */
  getUserInfo(req, res) {
    const ssid = req.cookies.ssid;
    const userId =
      this.hashMapForSsid.get(ssid) !== undefined &&
      this.hashMapForSsid.get(ssid).userId;
    const userInfo = this.db.select("USERS", "*", `USER_ID="${userId}"`)[0];
    if (userInfo) {
      userInfo.USER_PASSWORD = undefined;
      res.send(userInfo);
    }
  }

  /**
   * 유저 이름 반환
   * @param {Request} req json 타입으로 받아 express.json() 미들웨어에 의해 파싱
   * @param {Response} res
   * @send {object} 유저 이름을 객체에 담아 전송
   */
  getUserName(req, res) {
    const ssid = req.cookies.ssid;
    const userId =
      this.hashMapForSsid.get(ssid) !== undefined &&
      this.hashMapForSsid.get(ssid).userId;
    const userInfo = this.db.select("USERS", "*", `USER_ID="${userId}"`)[0];
    res.send({ userName: userInfo.USER_NAME });
  }

  /**
   * 로그아웃: res 객체의 쿠키에 만료 시간을 현재 시간을 주어 바로 삭제되도록 설정,
   * 세션에서도 해당 ssid를 key로 갖는 데이터 삭제
   * @param {Request} req json 타입으로 받아 express.json() 미들웨어에 의해 파싱
   * @param {Response} res
   * @send {boolean} 성공, 실패 여부
   */
  userLogout(req, res) {
    const ssid = req.cookies.ssid;
    this.hashMapForSsid.remove(ssid);
    res.cookie("ssid", ssid, {
      expires: new Date(Date.now()),
      httpOnly: true
    });
    res.send(true);
  }
}
module.exports = {
  Model
};
