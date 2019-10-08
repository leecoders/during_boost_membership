## 알게된 내용

### CSS) 박스 엘리먼트에 `z-index`를 주면 안에 위치하는 엘리먼트들의 `z-index`는 상속된다.

- 그러므로 해당 박스 엘리먼트 외부에 더 높은 `z-index`를 갖는 요소가 있다면 자식 엘리먼트에 아무리 더 높은 `z-index`를 주더라도 아무 효과 없다.

### CSS) `overflow-x`, `overflow-y` 속성을 통해 가로, 세로에 대해 따로 처리할 수 있다.

### CSS) `min-width`, `min-height` 속성을 통해 동적으로 변하는(예를 들어 textarea)에 대해 최소 크기를 지정할 수 있다.

### CSS) drag & drop 구현 시 원래 위치의 element의 왼쪽 상단 자리에 복사하기

- `getBoundingClientRect().x`와 `getBoundingClientRect().y`를 통해 절대 좌표를 구할 수 있다.
- 새로 복사하려는 element 또한 왼쪽 상단을 기준으로 만들어진다.
- 여기서 주의해야 할 점은 element에 `margin`이 있을 때, 기준 좌표를 기준으로 `margin`이 먹는다.
  - `margin` 만큼 보정하던지 `margin`을 빼던지 하면 된다.

### HTML, CSS) 폰트를 CSS에만 추가한다고 되는 것이 아니다.

- [구글 웹 폰트](https://fonts.google.com/)에서 HTML 헤더에 CDN으로 추가해야 CSS에서 적용할 수 있다.
- 로컬에는 캐시로 폰트가 남아서 적용되는 것일 뿐!
