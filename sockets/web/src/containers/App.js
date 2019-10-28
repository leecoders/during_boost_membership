import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Room from "../components/Room.js";

function App() {
  // const [text, setText] = useState("");
  // const [socket, setSocket] = useState(io.connect("http://localhost:8000"));

  // useEffect(() => {
  //   console.log("client is connected on socket");
  //   socket.on("chat message", data => {
  //     console.log(data);
  //   });
  // }, []);

  return (
    <AppWrapper className="App">
      <Room></Room>
      {/* <InputWrapper>
        <Input
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
        />
        <Button
          onClick={() => {
            socket.emit("new message", text);
            setText("");
          }}
        >
          전송
        </Button>
      </InputWrapper> */}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default App;
