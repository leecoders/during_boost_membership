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

### `draggable="true"` 시 드래깅되는 이미지 없애기

- 고스트 이미지(?)를 사용하여 안보이게 한다.

```javascript
const box = document.querySelector(".box");
box.addEventListener("dragstart", e => {
  console.log("start");
  var img = new Image();
  img.src =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=";
  e.dataTransfer.setDragImage(img, 0, 0);
});
```

### react에서 input 태그에 value를 state로 지정하게 되면 직접 input 값을 변경할 수 없는 문제가 있다.

- `value={state}`의 state가 변경되지 않기 때문이다.
- 해결 : `value`를 지정할 때는 `onChange`에서 `setState`로 state를 변경해주어야 한다.

### Moment.js와 Date 객체의 차이

참고 : [링크](https://webinformation.tistory.com/95)

- Moment.js는 자바스크립트에서 날짜 형식의 데이터를 파싱, 유효성 체크, 조작, 화면에 출력을 쉽게 할 수 있도록 도와주는 라이브러리
- 물론 Vanilla.js 만을 이용해서 날짜를 표현할 수 있지만, 솔직히 아주 불편한 것은 기본이고 코드 또한 길어진다. (javascript에서 날짜 형식을 표현하거나 파싱을 하려면 매우 귀찮다.)
- 또한 Time zone을 지원한다!
