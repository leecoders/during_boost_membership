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
