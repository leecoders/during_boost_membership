# 멤버십 프로젝트 - 로그인과 회원가입 저장소

## heroku 배포 url : [링크](https://boostcamp-leecoders.herokuapp.com)

## [체크 리스트](https://www.notion.so/leecoders/bda6dbe167824582924e9d5ea97699f9?v=8207bf6120fd428198f2476583b2dde3)

## 폴더 및 파일 설명

### 폴더

- `public` : front-end에서 사용되는 css, html, js, 페이지 라우터를 담는 폴더
- `public/bootstrap` : 로그인 화면 디자인을 위한 부트스트랩 라이브러리 폴더
- `public/img` : 버튼, 체크박스 등의 UI 디자인을 위한 이미지 폴더
- `public/template` : SPA에 렌더링할 HTML 부분을 파일로 저장하여 관리하는 폴더
- `public/util` : back-end와 통신할 fetch.js, validation 체크, 기타 필요한 기능적인 함수를 분리해서 관리하는 폴더
- `model` : 서버에서 사용되는 기능들을 담는 모델 클래스를 담는 폴더
- `routes` : 라우팅과 관련된 코드를 분리해서 담고있는 폴더
- `server_util` : 서버에서 사용되는 부수적인 기능을 담당하는 util과 함께 DB 클래스, HashMap 클래스 파일을 담는 폴더
- `views` : pug 템플릿을 담고있는 폴더
- `bin` : API 서버를 실행시킬 www 파일을 담는 폴더

### 파일

#### front-end

- (현재 사용되지 않음)`App.html` : SPA의 single page가 되는 부분
  -> `index.pug`로 변환되어 사용함
- `App.js` : SPA의 렌더링, 이벤트 리스너 정의를 포함하는 부분
  - 추가로, 이벤트 리스너, 이벤트 핸들러를 파일로 분리하고, 엘리먼트 JS로 그리는 부분을 템플릿 리터럴로 모듈화해야 할 것
- `App.css` : SPA의 single page인 App.html에 위치하는 모든 엘리먼트, 노드들의 디자인을 담당하는 부분
  - 좀 더 나눠야 하는 것인지 고민해봐야 함
  - 한 파일에 위치하여 복잡해진 부분을 최소하기 위해 selector를 class 이름 부터 최대한 순차적으로 작성하였음
  - 엘리먼트, 노드 순서로 css를 구성하기 위해 노력했음
- `Main.css` : App.js에서 그려준 메인 페이지만을 디자인하기 위해 사용되는 파일
- `Router.js` : App.html위에서 URL 변경 시(첫 로딩, hashchange 이벤트) 해당 URL에 맞는 페이지로 front-end를 위한 라우팅 파일
- `fetch.js` : front-end에서 back-end와 실제로 비동기 통신이 이루어지는 fetch 함수들을 담고있는 파일

#### back-end

- `model/Model.js` : 서버의 주요 기능들을 담당하며 DB, HashMap 객체를 관리하는 모델 객체
- `model/ss62.db` : better-sqlite3 데이터베이스의 실체가 되는 파일
- `server_util/HashMap.js` : ssid를 key로, 유저 아이디, 만료시간을 value로 저장하여 관리할 객체를 클래스로 정의한 파일
- `server_util/util.js` : ssid 생성, 관심사를 배열->문자열로 변환하는 등의 back-end의 부수적인 기능을 담당하는 함수들을 담는 파일
- `server_util/datebase.js` : DB를 관리하는 객체를 class로 정의한 파일
  - 사용한 모듈 : better-sqlite3
  - DB class API
    - `string` type만 사용하는 것으로 한다.
    - `create(table, columns)`
      - columns는 괄호 안에 `,`를 구분자로 각 column을 공백을 기준으로 `[column_name, column_type]`을 전달한다.
      - `column_name`에 `"`는 없어도 된다.
      - 예시
        ```javascript
        db.create("users", "(name TEXT, age INTEGER)");
        ```
    - `drop(table)`
    - `insert(table, columns)`
      - column은 괄호 안에 `,`를 구분자로 각 column을 입력한다.
      - column 개수가 같아야 한다.
      - `TEXT`(문자열) type은 `"`로 감싸서 입력해야 한다.
      - 예시
        ```javascript
        db.insert("users",`("age", 123)`);`
        ```
    - `delete(table, condition)`
      - 예시
        ```javascript
        db.delete("users", `age=123`);
        ```
    - `select(table, column, [condition])`
      - column에는 검색하고자 하는 column을 입력한다.
      - condition에는 `column이름=찾으려는 값` 형태로 입력한다.
        - 찾으려는 값은 문자열인 경우 `"`로 감싸서 입력해야 한다.
      - condition이 여러 조건으로 이루어진 경우 AND 등의 SQL 문법으로 구분한다.
      - 예시
        ```javascript
        db.select("USERS", "USER_ID", `USER_YEAR=${userYear}`); // 숫자의 경우 `"`로 감싸지 않아도 되지만 이 API에서는 TEXT 타입만 사용하므로 숫자는 사용되지 않는 것으로 한다.
        db.select("USERS", "USER_ID", `USER_ID="${userId}"`);
        ```
- `views/index.pug` : SPA의 틀(엘리먼트를 동적으로 끼우기 위한 몸통 역할)이 되는 부분을 템플릿 엔진으로 html을 그려주는 파일
- `routes/index.js` : url 첫 요청시 index.pug를 라우팅
- `routes/mains.js` : 메인 페이지의 기능들을 라우팅
- `routes/signIns.js` : 로그인 페이지의 기능들을 라우팅
- `routes/signUps.js` : 회원가입 페이지의 기능들을 라우팅
- `app.js`
  - 순서 : DB, HashMap 생성 -> Model 생성 -> 라우터에 Model 전달 -> 미들웨어 지정 -> 오류 페이지 지정
  - 모듈화 대상 : 미들웨어로 사용될 함수 `checkSession()` -> 미들웨어 늘어나면 파일로 분리할 계획
- `www` : API 서버 실행 파일로 포트 번호 등을 지정

## Feedback

### [Front-end](./fe_feedback.md)

### [Back-end](./be_feedback.md)

## day5 피어세션

- 패럴렉스 스크롤
- 약관 동의 이슈 : 스크롤 끝까지 내려도 동의 안되는 경우 있음 -> 범위 어느정도 넘어가면 활성화시키면 될 듯
- 라우터 화살표 함수 없이 콜백으로 함수 바로 전달해도 되는데 쓸데 없이 중첩됨

```javascript
router.use("/check-cookie", (req, res) => {
  model.checkCookie(req, res);
});
```

```javascript
router.use("/check-cookie", model.checkCookie(req, res));
```
