## [마스터 클래스(DAY1)](./master_class_3.md)

## [마스터 클래스(DAY5)](./master_class_4.md)

## 알게된 내용

### CORS(Cross-Origin Resource Sharing) 이슈
[링크](https://developer.mozilla.org/ko/docs/Web/HTTP/Access_control_CORS)
- 상황 : 프론트엔드, 백엔드를 다른 프로젝트로 분리하고 서로 다른 URL로 관리하도록 했다.
- 이슈 : fetch 요청에 `"Content-Type": "application/json"`의 헤더로 json을 아무리 보내도 서버에서는 `req.body`가 `undefined`가 넘어왔다.
- 이유 : 보안 상의 이유로, 브라우저들은 스크립트 내에서 초기화되는 cross-origin HTTP 요청을 제한한다고 한다.
  - cross-origin HTTP 요청 : 처음 전송되는 리소스의 도메인과 다른 도메인으로부터 리소스가 요청될 경우 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다.
- 해결 : `app.use(cors());` cors라는 미들웨어로 CORS 이슈를 처리해줄 수 있었다.

### 파일 전송 -> 요청(req) 객체가 너무 큰 경우 `Payload Too Large(413)` 에러가 발생한다.

### 파일 객체는 req.file에 담겨 온다.

### multer를 통해 이미지를 받을 때, storage, upload 객체가 추가적으로 필요하다.
- storage를 통해 destination, filename을 설정한 뒤 upload 객체로 넘겨준다.
- filename을 설정하지 않으면 req에서 넘어올 때 base64로 인코딩되어 넘어오기 때문에 확장자가 없는 raw한 데이터가 넘어온다.
- filename을 file.originalname으로 설정하면 확장자까지 붙어서 제대로 저장된다!

### DB) AUTO_INCREMENT
- 디폴트로 1부터 시작한다.
- `insert into TABLE values (?, ?, ?, ?, ?)`할 때, `AUTO_INCREMENT`가 위치한 `column` 자리도 채워주어야 한다.
  - 통상적으로 `null`을 넣음