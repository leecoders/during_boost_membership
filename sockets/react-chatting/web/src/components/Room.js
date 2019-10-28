import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Speech from "./Speech.js";
import fetch from "../utils/fetch.js";

function Room() {
  const [socket, setSocket] = useState(io.connect("http://localhost:8000"));
  const [text, setText] = useState("");
  const [messages, setMessages] = useState();

  useEffect(() => {
    (async () => {
      await setInitialData();
      socket.on("add message", data => {
        setMessages(data);
      });
    })();
  }, []);
  useEffect(() => {
    document.querySelector(
      ".message-container"
    ).scrollTop = document.querySelector(".message-container").scrollHeight;
  }, [messages]);

  const setInitialData = async () => {
    const result = await fetch.fetchInitialData();
    setMessages(result);
  };
  const sendMessageToServer = () => {
    if (text === "") return;
    socket.emit("new message", text);
    setText("");
    document.querySelector(".text-input").focus();
  };

  return (
    <RoomWrapper>
      <MessageContainer
        className="message-container"
        onClick={() => {
          document.querySelector(".text-input").focus();
        }}
      >
        {messages &&
          messages.data.map((data, idx) => {
            return <Speech key={idx} data={data} />;
          })}
      </MessageContainer>
      <InputContainer>
        <Input
          className="text-input"
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          onKeyPress={e => {
            if (e.key === "Enter") {
              sendMessageToServer();
            }
          }}
          autoFocus
        />
        <Button onClick={sendMessageToServer}>전송</Button>
      </InputContainer>
    </RoomWrapper>
  );
}

const RoomWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 2rem;
`;
const MessageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  font-size: 2rem;
`;
const InputContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10%;
  border-top: 1px solid #868e96;
`;
const Input = styled.input`
  position: relative;
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
  left: 3rem;
  width: 85%;
  height: 5rem;
  border: none;
  outline: none;
  background: #ffffff;
  font-size: 2rem;
  padding: 0 1rem;
`;
const Button = styled.div`
  position: relative;
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
  left: 5rem;
  width: 8%;
  height: 5rem;
  line-height: 5rem;
  background: #adb5bd;
  border: none;
  outline: none;
  text-align: center;
  border-radius: 0.4rem;
`;

export default Room;
