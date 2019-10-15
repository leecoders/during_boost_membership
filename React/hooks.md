# React Hooks

- 참고
  - [velog](https://velog.io/@velopert/react-hooks#3.-usecontext)
  - [humanscape-tech](https://medium.com/humanscape-tech/hooks-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-usestate-useeffect-811636d1035e)
  - [벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/basic/16-useEffect.html)

## 알게된 내용

- Hooks는 리액트 v16.8 에 새로 도입된 기능으로서, 함수형 컴포넌트에서도 상태 관리를 할 수 있는 `useState`, 그리고 렌더링 직후 작업을 설정하는 `useEffect` 등의 기능등을 제공하여 기존의 `함수형 컴포넌트`에서 할 수 없었던 다양한 작업을 할 수 있게 해준다.

### useState

- useState 는 가장 기본적인 Hook으로서, 함수형 컴포넌트에서도 가변적인 상태를 지니고 있을 수 있게 해준다. 함수형 컴포넌트에서 상태를 관리해야 할 때 사용할 수 있다.

```javascript
import React, { useState } from "react";
const Counter = () => {
  const [value, setValue] = useState(0); // value의 초기값으로 0을 지정
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b> 입니다.
      </p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};
```

- `useState()`는 배열을 반환한다.
  - 첫 번째, state 값
  - 두 번째, state를 설정(또는 업데이트)하는 함수
- `useState()`에는 state 값의 초기 설정값을 전달할 수 있다.
- 컴포넌트 안에서 여러 개의 state가 필요하다면 `useState()`를 여러 번 쓰면 된다.
- **`useState()`가 호출되면 화면은 리렌더링된다.**

### useEffect

- `useEffect`는 리액트 컴포넌트가 렌더링 될 때마다 특정 작업을 수행하도록 설정 할 수 있는 Hook으로서, 클래스형 컴포넌트의 `componentDidMount` 와 `componentDidUpdate`, `componentWillUnmount` 를 합친 형태로 보아도 무방하다.
- 클래스 컴포넌트에 제공되었던 `componentDidMount` 등의 Life Cycle API를 `useEffect`로 사용할 수 있다.
  - Life Cycle API에서 우리가 수행했던 API 요청, DOM 조작 등이 side effect이기 때문에, useEffect라는 이름의 API가 되었다.
- (참고) useEffect 함수는 state 변수를 하나만 관리하는것이 좋다. 즉 여러개의 useEffect 함수를 사용하는것을 추천해주고 있다.

```javascript
import React, { useState, useEffect } from 'react';

const Info = () => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  useEffect(() => { // 렌더링될 때마다 실행됨
    console.log('렌더링이 완료되었습니다!');
    console.log({
      name,
      nickname
    });
  });

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeNickname = e => {
    setNickname(e.target.value);
  };

  return (
    (...)
  );
};

export default Info;
```

- 인자로 콜백 함수를 전달한다.

#### 마운트될 때만 실행되도록 하고 싶을 때(가장 처음 렌더링 될 때만 실행되고 업데이트 할 경우에는 실행 할 필요가 없는 경우), `useEffect()`의 두 번째 인자로 빈 배열 `[]`을 넘겨주면 된다.

```javascript
useEffect(() => {
  console.log("마운트 될 때만 실행됩니다.");
}, []); // 왜일까?
```

#### 특정 값이 업데이트 될 때만 실행되도록 하고 싶을 때

- 두 번째 파라미터인 inputs를 통해 특정한 state 값이 update 되었을 때만 effect가 실행되도록 설정할 수 있다.
  - 특정 state 값을 배열에 포함시켜 넘기면 해당 state 값이 변경되었을 때만 effect가 실행된다.
  - 그러므로 빈 배열을 넘기면 마운트될 때만 effect가 실행된다.
- 두 번째 파라미터를 비우면 `*`를 뜻한다. (항상 실행)

```javascript
useEffect(() => {
  console.log(name);
}, [name]); // 아하!
```

#### useEffect의 뒷정리(clean up)하기

> 주로, 마운트 시에 하는 작업들은 다음과 같은 사항들이 있습니다.
>
> - props 로 받은 값을 컴포넌트의 로컬 상태로 설정
> - 외부 API 요청 (REST API 등)
> - 라이브러리 사용 (D3, Video.js 등...)
> - setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

> 그리고 언마운트 시에 하는 작업들은 다음과 같은 사항이 있습니다.
>
> - setInterval, setTimeout 을 사용하여 등록한 작업들(clearInterval, clearTimeout) clear 하기
> - 라이브러리 인스턴스 제거

```javascript
useEffect(() => {
  console.log("effect"); // 매 update 마다 실행됨
  console.log(name);
  return () => {
    console.log("cleanup"); // 매 update 직전 or 컴포넌트가 사라질 때만 실행됨
    console.log(name);
  };
});
```

- `useEffect()`안에서 함수를 `return`하면
  - 새로운 값으로 업데이트 되기 직전에 실행된다. (업데이트되기 직전의 값이 cleanup 함수 내에서 유효하다.)
  - 컴포넌트가 사라질 때 실행된다.
- **컴포넌트가 언마운트될 때만 cleanup 함수를 실행하고 싶다면 `useEffect()`의 두 번째 인자로 빈 배열 `[]`을 전달하면 된다.**
- cleanup 함수는 그럼 정확히 언제 실행되는가?
  - useEffect의 실행과 순서를 비교해보자.
    ```javascript
    useEffect(() => {
      console.log("effect");
      return () => {
        console.log("cleanup");
      };
    });
    ```
    - 처음 렌더링(마운트)될 때, `"effect"`
    - state 값이 업데이트될 때, `"cleanup"` -> `"effect"`
    - 컴포넌트가 언마운트될 때, `"cleanup"`
-
