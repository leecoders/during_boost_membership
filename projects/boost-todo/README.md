# 멤버십 프로젝트 - 웹할일관리 저장소

## 페이지

### [로그인 페이지](http://106.10.34.142:3000/signin)

- 계정
  - ID : admin / PW : admin
  - ID : normal / PW : normal

### 투두 페이지 : http://106.10.34.142:3000/todo/ + `유저 아이디`

- 쿠키 권한 없으면 접근 불가
- admin은 모든 사용자 페이지 접근 가능
- 회원가입 기능 없음 -> board 가진 사용자는 admin, normal 밖에 없음
  - board 없으면 기능 사용 불가

### [관리자 페이지](http://106.10.34.142:3000/admin)
- 사용자 권한 변경 가능
- 접근 권한 제한 없음

## 디렉토리 구조
[디렉토리 구조](./docs/dir_tree.md)

## 배포

### 개발 환경 실행
- nodemon
```
npm init
npm i
npm i nodemon
npm run start:dev
```
- normal
```
npm init
npm i
npm run start
```

### 추가/수정 필요한 config 파일
- `server/.env` : DB 접속 config (space 없이)
  - HOST=?
  - USER=?
  - PASSWORD=?
  - DATABASE=?
  - SERVER_PORT=?
- `server/public/src/serverConfig/index.js` : 클라이언트 -> 서버 요청 접근 config (문자열, 마지막에 `/` 까지)
  - serverUrl = "http://106.10.34.142:3000/"

## DB

### DB EER

![DB_EER](https://user-images.githubusercontent.com/47619140/66618549-66d13b00-ec14-11e9-9b25-bd4985c20037.png)

## 보드 ,리스트, 카드 데이터 객체화 시나리오

### 가져오기

1. USER_ID에 대한 BOARD 다 가져오기(지금은 1개) -> 하나씩 순회
2. 1번에서 가져온 `BOARD_ID = LIST_BELONG_BOARD`인 LIST_ID 다 가져오기
3. 2번에서 가져온 `LIST_ID = TODO_BELONG_LIST`인 TODO_ID 다 가져오기
4. 1, 2, 3번에서 가져온 데이터 BOARD 기준으로 객체로 묶기

### 보드 데이터 객체 구조
[객체 구조](./docs/board_data_obj.md)
