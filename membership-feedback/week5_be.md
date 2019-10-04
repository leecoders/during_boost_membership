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

### 불필요한 commit 줄이기

- git commit --amend : 특정 커밋 로그 조작

### Connection Pool

- Oracle에서도 엔터프라이즈 버전에는 커넥션 풀을 자체적으로 지원한다고 자랑할 만큼 중요한 기능이다.
- 미리 여러 개의 커넥션을 만들어두었다가 요청이 올때 반환하는 것(그때마다 만들어 쓰는 것보다 오버헤드가 적다.)

### SQL Injection

- 원하지 않는 쿼리문으로 데이터베이스를
  ![예시](https://user-images.githubusercontent.com/47619140/66185019-f9c02180-e6b8-11e9-8b0e-096fa935689d.png)

### MySQL 메서드 중에 `query`와 `execute`가 있다.

- execute는 자주 사용하는 쿼리문을 캐시해두고 사용하기 때문에 빠르다. (되도록 execute로 쓰는 것이 좋음)
- MySQL이 자체적으로 자주 사용되지 않는 것은 LRU 캐싱을 한다.

### DB insert 성능이 중요하다면 FK를 걸어주지 않는 방법도 있다.

- index를 넣지 않아서 빠르다.
- 하지만 개발자가 전부 검사해주어야 한다. -> 까다로울 수 있다.

### 오브젝트 스토리지

- multer의 대상을 오브젝트 스토리지로 잡으면 서버의 부하를 줄일 수 있다.

## 알게된 내용

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

### 라우터는 경로에 대한 미들웨어를 처리할 수 있는데 여러 개의 미들웨어를 달아줄 수도 있다.

- 파라미터로 미들웨어를 순서대로 여러 개 전달하면 된다.
- 전달한 미들웨어가 호출될 때 자동으로 `req`, `res`, `next`를 파라미터로 받는다.
- 주의할 점은 미들웨어에서 `next()`를 호출해주어야 다음 미들웨어가 호출된다.
