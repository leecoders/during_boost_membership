## [마스터 클래스(DAY1)](./master_class_1.md)

## [마스터 클래스(DAY5)](./master_class_2.md)

## 알게된 내용

### ele.children을 통해 자식 엘리먼트들을 배열로 얻을 수 있다.

### cloneNode()를 통해 엘리먼트를 복제할 수 있고, cloneNode(true)를 통해 하위 엘리먼트들 까지 전부 복사할 수 있다.

### 클래스 메서드에 get, set 함수 사용하면 함수 호출 없이 사용할 수 있다(?)

### setInterval은 실행 직후에 id를 반환한다.

### box 엘리먼트 가운데 정렬 하기 위해 상위 box 엘리먼트에 flex, `justify-content: center;`를 주면 화면 가로 방향으로 줄어들었을 때 좌우 overflow가 똑같이 생김(왼쪽 overflow는 스크롤도 안됨.. 그냥 범위 넘어가버림)

- 해결책 : `margin: 0 auto;`를 주면 가운데 정렬 + 왼쪽 overflow 방지 효과 있음

### CSS의 background에 이미지 url을 JS에서 동적으로 넣을 때, background-size는 그 다음에 넣어야 한다. (순서가 중요)

```javascript
setImage = () => {
  this.parentElement.style.background = `${this.cardColor} url("${this.cardimage_objs}") no-repeat 29% 50%`;
  this.parentElement.style.backgroundSize = `85rem 50rem`;
};
```

- css 파일에서 background-size를 따로 넣어주면 background를 지정한 순간 이전 속성이 사라져서(왜 그런지는 모르곘지만) 아래처럼 된다.
  ![broken_css](https://user-images.githubusercontent.com/47619140/65154519-9c946100-da66-11e9-822f-ccdd5c462ac5.png)

### element.children은 자식 요소에 대한 `HTMLCollection` 타입을 반환하고 `children[index]`를 통해 접근할 수 있지만 `Array` 타입이 아니기 때문에 forEach 등의 배열 프로토타입 메서드는 사용할 수 없다.

### CSS) 화면에서 안보이게 하기
1. `display: none;` : 아예 사라지게 하는 것. 보이지도 않고 해당 공간도 존재하지 않게 됨
2. `visibility: hidden;` : 보이지만 않고 해당 공간은 존재. width와 height값을 주었다면 그만큼 공간은 존재하게 됨
- `display: none;`의 반대를 JS에서 설정하기 위해
  - inline element일 경우 `inline`
  - block element일 경우 `block`