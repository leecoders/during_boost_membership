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

## 추가적인 피드백

### SPA

- 바닐라로 구현하는 것은 드물다.
- 사용성을 위해서는 앞, 뒤로 가기가 있어야 한다. -> 라우팅이 필요하다. -> 그렇게 의도한 것은 아니다. (회원가입하고 로그인으로 돌아갈 필요?)

### css 클래스, 아이디 네이밍 규칙(컨벤션)

- 현업에서는 미리 정하고 시작한다.
- 의미를 담기 위해 계층을 둔다.
  - `button-...`
- 카멜은 잘 안쓴다.
- `bem`을 검색해보자
- id를 안쓰고 class만 쓰는 곳도 있다.
- id는 js에서 찾아서 써야하는 경우에 사용한다.

### 컴포넌트화

- 리액트에서 다룰 것
- 재사용성
- 사실 바닐라로는 거의 불가능하다..
- html, js, css가 하나의 컴포넌트 묶여있는 구조라 좋다.

### CSS

- 레이아웃이 중요하다.
- 익숙하지 않아서 어려운 것이다..
- preprocess(?)
- 레이아웃 위주로 포트폴리오 사이트 만들어보면 좋다.

### 크롬 개발자 도구를 활용하자.

- breakpoint
- 개발자 도구의 css 변경이 로컬 css 파일에 적용되도록 할 수 있다.
- Filesystem 탭에서 가능하다.

### 렌더링

- DOM을 조작(templating)하여 원하는 곳에 화면을 그려주는 것을 말한다.
- 프론트엔드의 대부분의 작업

### 현업 프론트 개발자는 디버깅 도구로 뭘 쓰는지

- 크롬, 익스플로러, 파이어폭스 등등 다 쓸줄 알아야 한다.
- 크롬을 많이 쓴다. (강력)

### flex

- 장점 : resize 시에 속성들을 option으로 지정하여 처리하기 쉽다.
- 반응형 웹에서 flex 중요하다. css 모르면 어렵다.
- resize 시 변하는 것을 반응형이라고 한다.

### feature list

- 깃헙 이슈 : 현업에서 품질 체크하는 부서에서 깃헙 이슈에 버그를 올리는 용도로 사용된다.
- 꼼꼼하게 작성하고 시작, 잘 관리하는 연습을 하는 것이 중요하다.
- commit log와 close issue를 연결할 수 있다.
- 오픈 소스에서 이슈로 질문남기는 연습하자
- 이슈를 close할 때 시간이 얼마나 걸렸는지 쓰기도 한다.
  - 회고할 때 작업 단위로 얼마나 걸렸는지 알 수 있다.

### 예측

- 경험이 없으니까 구조 잡는 것이 어려운 것
- 회고를 해야 앞으로 예상하기가 좋다.
  - 점점 좋아질 것

### commit log 습관 들이기

- feature 단위, 함수 단위로 나누는 것이 좋다.
  - 그래야 나중에 되돌아갈 때 좋다. (나중에 가서 전에 구현한 내용이 더 좋다고 판단되었을 때)
  - 단위 별로 나눠서 commit되지 않으면 돌아가기 힘들다.
- commit log 컨벤션 규칙 만들고 습관 들이기
  - feat : 피처
  - fix : 버그 수정
  - update, delete, ...
  - 동사형(현재형)으로 많이 씀
  - 필터링하기 좋다.

### 좋은 코드에 대한 조건

- 돌아가는 코드, 변화(사이드 이펙트)에 잘 대응하는 코드, 테스트 가능한 코드
  - 처음부터 변화에 대응하는 코드를 짜는 것이 쉽지는 않다. 하지만 중요하다.
  - 요구사항이 추가되거나 변경되는 경우
  - 기술적으로 변경되는 경우
    - 라이브러리 업데이트
    - 플랫폼 요구사항 변경
- 변화에 대응하는 코드가 힘들면 테스트 가능한 코드를 고려할 수 있다.
  - 테스트는 코드 일부분(함수 단위)를 떼어 내서 테스트 가능해야 한다. (의존성이 높으면 불가능)
- 일관성을 지키는 것이 중요하다. (객체의 형태, css의 크기 단위 등)
  - 어떠한 방법이 좋다가 아니라 일관성 있는 방법을 사용하는 것이 좋다.
  - 유지보수, 다른 사람이 넘겨 받아도 편하다.
- `의도를 나타내는가?` 가 중요하다.
  - 네이밍(디렉토리, 파일, 클래스, 변수, 함수 등)이 특히 중요하다.
  - 함수는 `동사 + 명사` 형태로 해야 의도를 한 번에 파악할 수 있다. (자주 쓰는 것은 `동사`만으로도 괜찮다.)
- return 빨리 하기
  - if 안에 if가 있으면 진작에 return 됐어야 할 코드

### 리팩토링

- 언제 해야 적절한가?
  - 되도록 빨리.. 순간 순간 해주는 것이 좋다.
  - 권장하는 싸이클 : 디버깅 -> 리팩토링 -> ...
    - but, 자신만의 규칙이 있으면 좋다.
    - 절대 미루지는 말 것. 미루다 보면 돌이킬 수 없다.
- 테스트 코드는 리팩토링과 같이 짜는 것
  - 함수 단위 커지면 리팩토링 힘들고 테스트 코드 짜는 것은 거의 불가능...
- 새로운 코드 짜는 것보다 리팩토링이 훨씬 더 의미 있는 일 (그만큼 더 어렵다)
- 리팩토링의 대상은 중복!
  - 같은 코드를 짜고 있다면 리팩토링해야 할 때
  - 중복은 함수 하나로 줄이자

### commonJS vs ES modules

- require, export
- import, export
- 객체 단위 모듈 연동 기능
- 파일을 나눠야 충돌을 줄일 수 있다.
- `ES modules`은 아직 브라우저 지원 범위가 작다. -> webpack이 이것을 도와준다.
- 클래스 단위, 비슷한 기능끼리 분류된 것이 좋다.

### SPA에서는 라우팅이 중요하다.

- History API를 공부하면 좋다!
- js 코드를 넣을 수 있다.
- react, angular 등도 내부에서 History API를 사용한다.

### 브라우저 호환성 확인 방법

- Browser compatibility search
- Caniuse.com

### Template를 분리한 것이 필요하다.

- 템플릿 리터럴로 분리한다.
- 템플릿이 다른 코드 안에 있으면 좋지 않다.

### Arrow function은 콜백에 편하게 쓸 때 좋다.

### 이벤트 등록은 addEventListener

### try catch 는 필수는 아니다.

- 예외가 일어날 만한 부분에는 고민하는 것이 좋다.
- 프론트 코드에서 프론트에서 처리하는 것이 아니라 서버에서 처리하는 것과 같이 다른 부분에서 처리되는 동작에 대해서는 예외가 발생할 수 있기 때문에 추가하는 것이 좋다.

### 콜백함수를 그대로 표현하지 말고 분리하자.

```javascript
el.addEventListener("click", () => {
  ...
});
```

```javascript
const clickHandler = () => {
  ...
}
el.addEventListener("click", clickHandler);
el.addEventListener("input", inputHandler);
el.addEventListener("mousedown", mouseHandler);
```

- 두 번째 방법이 좋다.
- 이벤트를 fire할 때도 필요하다.
- 이벤트 핸들러로 전달하는 콜백을 따로 관리해야 해당 콜백 함수를 테스트할 수 있다.
- 재사용하기도 좋다. (재사용하기 좋은 코드 == 테스트 가능한 코드)

### `classList`를 사용해서 클래스 추가/삭제

- element에 클래스가 여러 개 들어갈 수 있는데 이것을 관리할 수 있는 `classList`가 존재한다.
- add, remove 쉽게 가능

### `createElement` 보다는 `템플릿 리터럴`로 HTML 코드를 넣는다.

- component 단위로 `템플릿 리터럴`로 HTML element 만드는 것이 좋다.

### `util.js`와 같은 이름의 파일은 전혀 다른 프로젝트에도 쓰일 수 있을 정도의 코드를 포함한다.

- 재사용 가능한 코드
- 클래스로 만들 필요는 없고, 필요한 기능들에 대한 함수들로 구성되면 충분하다.
  - util 안에서 함수들 간의 의존성은 없는 것이 좋다.

### 중복 줄이기

```javascript
const ele = document.querySelector("...");
const ele2 = document.querySelector("...");
const ele3 = document.querySelector("...");
const ele4 = document.querySelector("...");
...
```

```javascript
function $(selector) {
  return document.querySelector(selector);
}
const ele = $("...");
const ele2 = $("...");
const ele3 = $("...");
const ele4 = $("...");
```

### if문의 depth 줄이기

- 아니면 return 해버리면 else if 부분이 depth가 1 줄어든다.

### fetch API

### 즉시 실행 함수로 전체를 감싸는 경우 캡슐화(zero 전역변수), 다른 모듈과의 충돌에는 효과적이지만 테스팅이 불가능하다.

- 프레임워크를 쓰면 그러한 코드를 짤 일은 없다.

### 여러 함수들 안에서 문자열이 사용되는 경우가 많으면 문자열도 객체로 밖에 따로 빼서 한 번에 관리할 수도 있다.

- 비슷한 기능 별로 모듈화하면 좋다.

### css 파일도 분리하는 것이 좋다.

### 모델은 데이터를 동적으로 변경시키는 것들을 말한다.

### delegation을 활용한 이벤트 등록에 대해 공부하면 좋다.

- 이벤트 위임
