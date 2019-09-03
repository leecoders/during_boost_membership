## 알게된 내용

### `select box`는 `-webkit-appearance` 때문에 css 적용이 안되는 부분이 많다..

- `webkit-appearance: none;`, `moz-appearance: none;`를 `select`에 적용하여 해결

### 이미지를 `background`로 넣을 때는 실제 이미지 크기가 작아야 작게 들어간다..

### `const lastDay = new Date(year, i, 0).getDate();`을 통해 현재 월의 마지막 일을 구할 수 있다.

### `clientWidth` 속성으로 실제 box의 너비를 구할 수 있다.

### 상위 태그의 스타일이 지정된 경우 하위 태그의 선택자만으로 CSS를 정의하면 안먹힐 수 있다.

- 상위 태그들까지 선택자로 포함시켜 구체적으로 선택해야 우선순위 더 높아짐

### 이벤트 리스너에 전역변수에 해당하는 값을 사용하면 side-effect 발생한다.

```javascript
let tagCnt = 0;
document.querySelector("#interests").addEventListener("keyup", e => {
    let str = document.querySelector("#interests").value;
    if (e.key === ",") {
      if (str[0] == ",") {
        document.querySelector("#interests").value = "";
        return;
      }
      const nowTagId = tagCnt++;
      str = str.substring(0, str.length - 1);
      document.querySelector("#interests").value = str;
      const tagDom = `<span id="tag-${nowTagId}" class="interest-tag">
                        ${str}
                        <button type="button" id="tag-delete-${nowTagId}"></button>
                      </span>`;
      document
        .querySelector("#interests")
        .insertAdjacentHTML("beforebegin", tagDom);
      document.querySelector("#interests").value = "";
      document
        .querySelector(`#tag-delete-${nowTagId}`)
        .addEventListener("click", () => {
          console.log(nowTagId);
          // const childNode = document.querySelector(`#tag-${nowTagId}`);
          // console.log(childNode);
          document
            .querySelector(`#interests-area`)
            .removeChild(document.querySelector(`#tag-${nowTagId}`));
        });
    }
```

위의 코드에서 `const nowTagId = tagCnt++;` 이 부분 없이 `tagCnt`를 아래에서 계속 사용하게 되면 이벤트 발생 당시의 `tagCnt`를 참조하여 사용하게 된다. 전역변수가 `클로저`로 감싸지지 않는 것이다. `nowTagId`를 만들어서 이벤트 리스너를 정의하면 `클로저`로 만들어지는 것 같다.

### DOM 트리에서 형제 노드 탐색이 가능하다.

[링크](https://zappysound.tistory.com/5) 참조

### 타자 칠 때는 `keydown` 이벤트 직후에 글자가 입력된다.

- event.target.value는 `keydown` 이벤트 이후 갱신된다.
- 화면에 실제로 키 입력이 이루어지는 것이 `keydown` 이후

```javascript
document.querySelector("#interests").addEventListener("keydown", e => {
  if (e.target.value != "") return;
  if (e.key == "Backspace" || e.key == "Delete") {
    const inputDom = document.querySelector("#interests");
    const lastTag = inputDom.previousSibling;
    const lastTagContent = document.querySelector(`#${lastTag.id}-content`)
      .innerText;
    inputDom.value = lastTagContent;
  }
});
```

위의 코드에서 이전 태그의 텍스트를 가져오면 `keydown`이벤트 직후에 `Backspace`가 화면에 입력되면서 한 글자가 지워진다.

### 체크박스는 `vertical-align: middle`로 수직 가운데 정렬 맞추기 힘들다.

- `position: relative;`과 `top: 3px;`으로 미세하게 컨트롤해야 함

### 배경 이미지와 색상을 동시에 사용

`background: #fff url("../img/check.png") no-repeat 50% 50%;`

### selector로 id를 사용할 경우 class보다 탐색 속도가 빠르다.

- class는 별도의 DOM 탐색 알고리즘을 거치지만 id는 캐싱으로 빠르게 탐색할 수 있다.

### js의 customElements를 통해 html에서 사용자 정의 태그를 사용할 수 있다.

### dataset API - HTML 표준

- tag에 없는 속성을 사용할 수 있음
- dataset이 데이터 관리해줌

### 스크롤 끝까지 내려갔는지 체크하기

`textArea.scrollTop + textArea.clientHeight === textArea.scrollHeight`

### css에서 selector로 class 두개 정의하고 사용하기

`<button class="check-agree-button" type="button">동의</button>`와 같이 원래 class가 한 개였으나
`checkAgreeButton.className = "check-agree-button checked";` 처럼 class가 두 개가 된 경우,

```css
.check-agree-button {
  margin: 20px 0 0 0;
  color: #000000;
  width: 30%;
  height: 50px;
  color: #fff;
  font-size: 20px;
  border: none;
  background: #dadada;
}
.check-agree-button.checked {
  background: #08a600;
}
```

위와 같이 두 개의 클래스 이름을 연달아 사용해야 한다. **두 클래스 이름 사이에 공백이 생기면 하위 클래스로 인식해버림!!**

### 버튼 클릭 시 생기는 테두리는 `outline`이라고 한다. 제거하려면 버튼의 css에 `outline: none` 속성을 추가한다.

### tag의 위치값 찾기 : getBoundingClientRect()

- x, y, width, height를 통해 x1, y1, x2, y2 구할 수 있다.

### 모달 팝업 : 새로운 레이어 뜨는 것을 모달 팝업이라고 함

### 이벤트 전파와 버블링

- 전파 : 부모 -> 자식
- 버블링 : 자식 -> 부모
- 모달를 목표로 이벤트를 발생시키면 부모 노드에서도 이벤트가 발생한다..
  - body에 `overflow: hidden`으로 해결할 수 있다. (그래도 뭔가 찝찝함..)

### 요소 가운데 정렬 하기 : `position: absolute` -> `left: 50%`, `margin-left: <요소 절반 크기>`