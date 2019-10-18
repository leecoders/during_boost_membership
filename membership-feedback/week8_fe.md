## 알게된 내용

### react의 styled component에서는 정적 이미지 파일을 url로 바로 가져다 쓸 수 없다.

- `import`한 뒤 사용해야 한다.

```javascript
import logo from "../assets/images/logo.png";
...
const Logo = styled.div`
...
background: url(${logoImage}) no-repeat 50% 50%;
`
```

### cross-env

- 코드 내에서 파일 경로 지정을 쉽게 할 수 있다.

## 배운 내용

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
