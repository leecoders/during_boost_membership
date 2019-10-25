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

참고 : [공식 문서](https://momentjs.com/)
참고 : [링크](https://webinformation.tistory.com/95)

- Moment.js는 자바스크립트에서 날짜 형식의 데이터를 파싱, 유효성 체크, 조작, 화면에 출력을 쉽게 할 수 있도록 도와주는 라이브러리
- 물론 Vanilla.js 만을 이용해서 날짜를 표현할 수 있지만, 솔직히 아주 불편한 것은 기본이고 코드 또한 길어진다. (javascript에서 날짜 형식을 표현하거나 파싱을 하려면 매우 귀찮다.)
- 또한 Time zone(시간대), locale(지역별 표기법) 설정을 지원한다!

```javascript
import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");
```

위와 같은 코드를 추가한다.

### react에서 함수형 컴포넌트에서 최상단 function은 `async` -> error

### react에서 `useEffect`를 `async` -> error

- fetch data를 받아오기 위해 시도했으나.. 실패
- 해결책 : 즉시 실행 함수로 감싸서 처리한다.

```javascript
useEffect(() => {
  (async () => {
    const result = await fetchCheckCookie();
  })();
}, [signinState]);
```

### reace에서 setState를 실행하더라도 react가 알아서 state가 변경되었을 때만 리렌더링 하도록 최적화되어 있다.

- 하지만!! state가 객체인 경우 js에서 객체는 레퍼런스 비교이기 때문에 전과 후의 객체의 내용이 같더라도 react가 같은 객체로 판단하지 못한다.
- 해결 : `JSON.stringify()`를 통해 비교해서 객체 내부 값이 달라졌을 때만 setState를 호출하도록 해야한다.

### (고민) 서버에서 객체 10만 개에 대한 데이터를 DB(`select * from Rooms`)에서 클라이언트 까지 가져와서 클라이언트에서 필터링해서 쓰기(물론 리액트에서 처음 마운트할 때만 가져와서 state로 저장해두고 더 이상의 요청은 없다는 가정) vs 필터링된 결과가 필요할 때마다 DB에 대한 조건을 걸어 필요한 데이터만 불러오기

- lazy loading과 관련된 이슈
  - lazy rendering(처음 다 가져와서 부분적으로 렌더링) vs real lazy loading(필요한 만큼만 fetch)

### react에서 let, const 같은 일반 변수는 리렌더링 시 사라질 수 있어서 일시적으로 필요한 경우가 아니라면 쓰지 않는 것이 좋다.

## 배운 내용

### 재사용 컴포넌트를 꼭 해야할 필요는 없다.

- 설계 단계에서 생각하기 쉽지 않음
- 리팩토링 과정에서 공통 분모를 찾아서 만드는 방법도 있다.

### react에서 최적화의 90% 이상은 렌더링을 줄이는 것이다.

### react에서는 단위 테스트를 컴포넌트 단위로 테스트를 고려해보자
