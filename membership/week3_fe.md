## 알게된 내용

### lazy loading : 이미지 로딩 딜레이 이슈 해결 방법 중 하나

### 처음부터 모듈화하면 어렵다. 전체적으로 쉽게 만들어 놓고 리팩토링 과정에서 모듈화하자.

### Promise 패턴에서 then은 바로 실행된다. then의 콜백이 resolved된 후에 실행되는 것

### transition end? translate3d?

### ele.children을 통해 자식 엘리먼트들을 배열로 얻을 수 있다.

### cloneNode()를 통해 엘리먼트를 복제할 수 있고, cloneNode(true)를 통해 하위 엘리먼트들 까지 전부 복사할 수 있다.

### 클래스 메서드에 get, set 함수 사용하면 함수 호출 없이 사용할 수 있다(?)

### setInterval은 실행 직후에 id를 반환한다.

### box 엘리먼트 가운데 정렬 하기 위해 상위 box 엘리먼트에 flex, `justify-content: center;`를 주면 화면 가로 방향으로 줄어들었을 때 좌우 overflow가 똑같이 생김(왼쪽 overflow는 스크롤도 안됨.. 그냥 범위 넘어가버림)

- 해결책 : `margin: 0 auto;`를 주면 가운데 정렬 + 왼쪽 overflow 방지 효과 있음

### CSS의 background에 이미지 url을 JS에서 동적으로 넣을 때, background-size는 그 다음에 넣어야 한다. (순서가 중요)

```javascript
setImage = () => {
  this.parentElement.style.background = `${this.cardColor} url("${this.cardImageSrc}") no-repeat 29% 50%`;
  this.parentElement.style.backgroundSize = `85rem 50rem`;
};
```

- css 파일에서 background-size를 따로 넣어주면 background를 지정한 순간 이전 속성이 사라져서(왜 그런지는 모르곘지만) 아래처럼 된다.
  ![broken_css](https://user-images.githubusercontent.com/47619140/65154519-9c946100-da66-11e9-822f-ccdd5c462ac5.png)

### element.children은 자식 요소에 대한 `HTMLCollection` 타입을 반환하고 `children[index]`를 통해 접근할 수 있지만 `Array` 타입이 아니기 때문에 forEach 등의 배열 프로토타입 메서드는 사용할 수 없다.
