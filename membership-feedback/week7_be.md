## 배운 내용

### 멘탈 관리가 중요해, 즐겨라

### 이번주는 sequelize가 핵심!

### Batch Job

### JWT 기반 인증 -> session 대체 가능

### 검색 기능

- elastic search (DB 구현보다 빠를 수도 있다.)

### GraphQL, Apollo

- React 와 잘 어울림

### JWT

- 임의 변조가 불가능하다.
- ex) admin인지 아닌지 등의 권한 -> 쿠키에 담으면 안됨(쿠키는 클라이언트에서 변조가 가능함)
- 디코딩해서 읽을 수는 있지만 변조가 불가능하기 때문에 사용한다!
- JWT를 통한 회원가입, 로그인, 로그아웃 등의 인증을 구현해도 괜찮은가?
- 장점
  - 세션, 세션 DB 없이 클라이언트에 전부 저장하면 된다.
- 운영 상의 장점
  - 웹 서버가 여러 대가 되어도 세션 공유를 신경쓰지 않아도 된다. -> 개발하기 쉽다.
- 저장 방식
  - 쿠키가 무난하게 많이 사용된다.
- 인증 방식
  - 설정을 마쳤다면 모든 요청에 토큰이 담겨올 것이다.
- 만료
- DB에 있는 값과 토큰이 다를 때 어떻게 처리할 것인가?

### Sequelize

- 공식 문서 정리 잘 되어있다. [링크](https://sequelize.org/master/manual/getting-started)

### Transaction

#### Lost Update Problem

- Lock 없이 트랜잭션을 동시에 실행
- 두 개의 트랜잭션이 동시에 한 아이템의 데이터를 변경했을 때 발생하는 문제점
- 트랜잭션을 지원하는 데이터베이스에서는 발생하면 안됨

#### 트랜잭션에서 발생할 수 있는 문제

- (p1)Dirty Read Problem : 한 트랜잭션에서 변경한 값을 다른 트랜잭션에서 읽을 때 발생하는 문제
- (p2)Non-repeatable Read Problem : 한 트랜잭션에서 같은 값을 두 번 읽었을 때 각각 다른 값이 읽히는 경우
- (p3)Phantom Read Problem : 주로 통계나 분석, aggregation function 등을 수행하는 쿼리에서 잘못된 값이 들어오는 경우

#### Transaction Isolation Level

![Transaction Isolation Level](https://user-images.githubusercontent.com/47619140/66735132-795fa480-eea0-11e9-8ecb-9aedf3aa550c.png)

1. READ UNCOMMITTED : 속도는 엄청 빨라짐
2. READ COMMITTED
3. REPEATABLE READ
4. SERIALIZABLE : 느리지만 어떤 문제도 발생하지 않음

- Isolation Level 확인 및 변경

```sql
SELECT @@GLOBAL.transaction_isolation, @@transaction_isolation;
SET GLOBAL transaction_isolation='REPEATABLE-READ';
SET SESSION transaction_isolation='SERIALIZABLE';
```

- MySQL default: Repeatable Read

### Sequelize CLI를 사용하여 User API 만들기

- [참고](https://velog.io/@jeff0720/Sequelize-CLI%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EC%97%AC-%EA%B0%84%EB%8B%A8%ED%95%9C-User-API-%EB%A7%8C%EB%93%A4%EA%B8%B0-vdjpb8nl0k)

#### ORM

- ORM이란 객체를 관계형 DB에 매핑해 DB의 기능들을 추상적으로 사용할 수 있게 해준다.
- 장점
  - 비즈니스 로직에 집중할 수 있다.
  - 특정 데이터베이스에 대한 종속성이 사라져 데이터베이스가 바뀌는 상황에도 유연하게 대처할 수 있다.
  - 데이터베이스 마이그레이션을 쉽게 할 수 있다.
- 단점
  - Raw Query를 사용하는것 보다 성능이 떨어진다.
- Sequelize는 Node.js에서 사용할 수 있는 ORM이다.

#### Sequelize CLI(The Sequelize command line interface)

- 명령어를 통해 데이터베이스 작업을 할 수 있는 툴이다.

#### MySQL에 Sequelize 적용해보기

- sequelize, sequelize-cli, mysql2 설치
  - 글로벌 설치 시 `sequelize ~` 명령 가능
  - 로컬 설치 시 `./node_modules/.bin/sequelize ~`로 명령해야 함
- Sequelize CLI 초기화 : `sequelize init`
  - config, migration, models, seeders 폴더 생성
    - config : db에 연결하여 Sequelize를 생성하기 위한 설정 폴더
    - migration : 코드 -> 테이블의 실제 생성을 위한 마이그레이션 파일들이 위치하는 폴더
    - models : `index.js`가 `config`의 설정값을 읽어 Sequelize를 생성한 뒤 db 모델(테이블)들의 정보를 로딩하는 역할, `index.js`와 함께 각 모델(테이블)들에 대한 파일들도 위치함
    - seeders : 초기 정적 데이터 생성을 위한 시드 관리 파일들이 위치함
- `config.json`에 db 연결 정보 설정
- Sequelize CLI 모델(테이블) 정의 : `sequelize model:generate --name User --attributes userId:string,userPassword:string,userName:string`
  - migrations, models에 정의한 모델 관련 파일 생성
    - migrations : 마이그레이션을 위한 모델(테이블) 정의 파일 생성됨 (**id, createAt, updateAt 필드가 자동 생성되며 id는 Sequelize가 필수적으로 사용하는 값으로 지우면 안됨. 나머지는 실제 테이블 생성을 위해 정의하는 코드 부분이므로 수정해서 사용**)
    - models : 모델 생성 시 정의했던 부분으로 Sequelize가 `index.js`를 읽을 때 로딩됨
- 마이그레이션 : `sequelize db:migrate`
  - 실제 테이블 생성됨
  - 정의는 단수, 실제 테이블은 복수형으로 생성됨
    - ex) `User`로 정의 -> `Users` 테이블이 생성됨
- Sequelize CLI Seed 정의 : `sequelize seed:generate --name userData`
  - seeders 폴더에 파일 생성 -> 삽입할 row 지정
- Seed 생성 : `sequelize db:seed:all`
- API 정의 후 사용
  - `models.User.findAll()`
  - `models.User.create({userID: '유저ID', password: '유저PW'})`
  - `models.User.update({password: '새로운 유저PW'}, {where: {userID: '유저ID'}})`
  - `models.User.destroy({where: {userID: '유저ID'}})`

### 안전하게 JWT를 저장하는 방법

- 결론 : 안전하게 사용하려면 토큰 방식을 쓰지 말아야 한다..
  - 하지만 https로 서비스하거나 최신 프레임워크가 잡아주기 때문에 쓰지 말아야 할 이유도 없다.
  - 간단한 용도로 사용하기에는 좋다.
- localStorage : XSS에 취약
- Cookie : CSRF에 취약
- 보완할 수 있는 방법
  - http-only로 보완 : JS 코드에서 변조가 불가능
  - secure Cookie로 보완 : https에서 만들어진 쿠키를 http에서 읽을 수 없다.
  - 하지만 취약점은 조금은 가지고 있다..
- 토큰의 종류
  - refresh token : access token을 발급 받는 용도로 쓰임
    - OAuth에서는 절차 상 refresh token이 필요하지만 사용하지 않는 서비스도 많다.
    - client side에 저장할 필요가 없다.
  - access token : 접근을 위한 용도

### 샤딩(Sharding)

- 같은 테이블 스키마를 가진 데이터를 다수의 데이터베이스에 분산하여 저장하는 방법을 의미한다.

### ORM을 사용할 때는 JS 스럽게 네이밍을 카멜케이스로!

### JWT

참고 : [링크](https://victorydntmd.tistory.com/116)

- JWT는 사용자 정보를 JSON 객체에 담아 이를 암호화하고 해싱 작업을 거쳐 문자열 토큰을 생성하는 기술이다.
- 클라이언트는 이 토큰을 HTTP Header에 추가하여 요청을 보냄으로써 사용자 인증을 얻게된다.
- 장점 : 서버 부하를 일으키지 않으며, 해싱을 통해 데이터의 무결성을 보장하는 인증 방식이다.
- 사용 예시 : 로그인 시 권한을 담은 JWT를 생성하여 브라우저에 넘겨주고, 이후에 추가적인 API 요청이 있을 때 토큰에 권한이 있는지 체크하는 기능을 고려할 수 있다.
  - 세션의 기능을 JWT로 대신할 수 있는 것
  - 흐름
    - 사용자가 로그인을 하면 토큰을 생성해서 브라우저의 쿠키에 보관한다.
    - 이 사용자가 어떤 API를 호출했을 때, 토큰이 있는지 확인해서 올바른 토큰이 있을 경우 API를 실행하고, 그렇지 않으면 실행하지 않는다.
- 비밀키 모듈 생성

```javascript
const jwtObj = {};
jwtObj.secret = "secret";
module.exports = jwtObj;
```

- 로그인 요청 - 토큰 생성(`sign()`)

```javascript
const jwt = require("jsonwebtoken");
const secretObj = require("../config/jwt");
...

    const token = jwt.sign({
            name: "leecoders"
        },
        secretObj.secret,
        {
            expires: "5m"
        });
    ...
    res.cookie("user", token);
    res.json(...);
```

- 토큰 확인하기(`verify()`)

```javascript
...
const token = req.cookies.user;
const decoded = jwt.verify(token, secretObj.secret);
if(decoded){
    res.send("권한이 있어서 API 수행 가능")
}
else{
    res.send("권한이 없습니다.")
}
```

### CORS 이슈

- fetch로 post요청을 위해 fe, be를 다른 서버(다른 url을 가짐)에 배포하고 fetch 요청이 이루어지기 때문에 cors 처리를 위해 모듈이 필요했다.
  - 성공!
- 그러나 쿠키가 req, res를 통해 전송되지 않는 문제가 있다.
- 일단 fetch 옵션으로 `credentials: "include"`를 추가해야 했다.
  - cors 에러 발생!
- be단에서 cors에 옵션으로 fetch 요청을 하는 fe 서버를 whitelist에 추가해야 했다.

(cors 옵션 모듈 파일 생성)

```javascript
const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

module.exports = corsOptions;
```

(cors에 옵션을 설정)

```javascript
const cors = require("cors");
const corsOptions = require("./config/cors.js");
...
app.use(cors(corsOptions));
```
