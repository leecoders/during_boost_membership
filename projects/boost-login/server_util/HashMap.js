/**
 * 세션 id를 key로 유저 아이디와 만료시간을 value로 저장할 객체의 클래스
 * Map 구조로 변경할 계획
 */
class HashMap {
  constructor() {
    this.map = new Array();
  }
  /** 삽입 */
  put(key, value) {
    this.map[key] = value;
  }
  /** 탐색 */
  get(key) {
    return this.map[key];
  }
  /** 모든 요소 반환 */
  getAll() {
    return this.map;
  }
  /** 삭제 */
  remove(key) {
    this.map[key] = undefined;
  }
  /** 모든 요소 삭제 */
  clear() {
    this.map = new Array();
  }
  /** 모든 키 반환 */
  getKeys() {
    var keys = new Array();
    for (i in this.map) {
      keys.push(i);
    }
    return keys;
  }
}

module.exports = HashMap;
