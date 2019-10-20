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

### input 태그의 type을 `number`로 하면 숫자 또는 `+`, `-`, `.`만을 입력 받을 수 있다.

- 하지만 `+`, `-`, `.` 또한 쓸모 없는데.. 해결 방법을 찾아봐야 함
- (추가) `e`도 입력된다..

### input 태그의 type을 `number`로 했을 때 input 안에 up, down 버튼이 생긴다.

- 제거하는 법 : 전역 css 파일에 아래 코드를 추가해준다.

```css
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```
