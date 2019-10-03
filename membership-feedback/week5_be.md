## 배운 내용

### field, record, table

### table은 객체 단위

### table이 여러 개 필요한 이유?

- 테이블이 커질 수록 데이터의 중복이 많아짐

### 이상 현상(anomaly)

### 정규화

- 이상 현상을 막기 위해 하는 것

### 역정규화

### JOIN은 별다른 알고리즘이 없다면 O(N\*M)의 시간이 걸린다.

### Index와 효과적인 탐색

- Primary Key, Foreign Key 컬럼에는 기본적으로 Index가 자동으로 생성된다.
- Index가 있을 컬럼의 경우 O(log n) 으로 탐색 가능
- Index가 없는 컬럼은 O(n) 시간 소요

### 응답코드 `304`는 클라이언트 로컬에 캐시된 페이지 로드

### express.static 지정 시 디렉토리 찾지 못하는 이슈

- express 미들웨어로 기본 path를 express.static으로 정적 폴더를 지정한 뒤 클라이언트에서 페이지를 띄우면 해당 경로의 파일(html, js)에서 `상대 경로`로 `../`를 통해 처음 연결된 정적 폴더로 부터 더 바깥 디렉토리는 탐색할 수 없다.
- 정적 폴더는 여러 개 지정할 수 있다.

### DB) FK가 위치하는(PK를 참조하는) 테이블은 `CASCADE`를 주어야 한다.

- `CASCADE` : `PK`와 관계된 row가 삭제되었을 때 해당 `PK`를 참조하는 `FK`를 가진 row를 삭제함

### `res.redirect`

- 서버에서 라우터를 통해 처리되는 경로를 줄 수도 있고, 정적 페이지 파일을 찾아 띄울 수도 있다.
- 하지만 후자의 경우 `form`을 통해 전송된 경우에만 페이지를 리로드할 수 있다.
  - 이번 프로젝트의 경우 `fetch`를 통해 결과를 받도록 했기 때문에 페이지 이동은 프론트엔드에서 해주는 수밖에 없다.
  - 서버에서는 `res.send`를 통해 성공 메시지를 넘겨주며 세션에 대한 적절한 처리를 해주는 방법으로 구현하자.

### 세션 삭제 시 nodemon 재시작되는 이슈

- 로그인 -> 쿠키, 세션 생성 -> 세션 강제 삭제(쿠키는 있음) -> 다시 로그인 -> 세션 찾는 과정에서 폴더 변경으로 nodemon이 서버를 재시작함 -> 문제 가능성
- 해결 : nodemon에 ignore를 줄 수 있다. `nodemon.json` 또는 `package.json`에 `nodemonConfig` 속성 추가 -> 파일이 재시작되지 않는다.
  - 공식 문서 : [링크](https://github.com/remy/nodemon)

### 라우터 순서가 중요하다.

1번

```javascript
router.use("/asd", (req, res) => {
  console.log("/asd");
  res.json({ asd: "asd" });
});

router.use("/", (req, res) => {
  console.log("/");
  res.redirect("pages/admin");
});
```

2번

```javascript
router.use("/", (req, res) => {
  console.log("/");
  res.redirect("pages/admin");
});
router.use("/asd", (req, res) => {
  console.log("/asd");
  res.json({ asd: "asd" });
});
```

- 라우터 또한 미들웨어이기 때문에 순서대로 탐색한다.
- 예를 들어, `.../asd`를 검색하는 경우
  - 1번 : 알맞게 `/asd`를 방문
  - 2번 : 둘 다 방문 -> 예상하지 못한 경로 탐색됨

### 라우터에서 url의 마지막 string을 읽어올 수 있다.

- `GET`방식의 `http`요청과 달리 `?` 없이 요청할 수 있다.

```javascript
router.use("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  res.render("todo");
});
```

- 위와 같이 라우터를 정의(`.../todo/leecoders`로 요청을 받도록 의도)한 뒤 `.../todo`까지만 요청하면 라우터가 탐색하지 못한다. -> 에러
