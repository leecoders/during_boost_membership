import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import Speech from "./Speech.js";
import fetch from "../utils/fetch.js";

function Room({ roomNumber }) {
  const [socket, setSocket] = useState(io.connect("http://localhost:8000"));
  const [text, setText] = useState("");
  const [messages, setMessages] = useState();

  useEffect(() => {
    setInitialData();
    socket.on("add message", data => {
      setMessages(data);
    });
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
      <HeaderContainer>
        <RoomNumberContainer>#{roomNumber}</RoomNumberContainer>
      </HeaderContainer>
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

const HeaderContainer = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100%;
  height: 5rem;
  line-height: 5rem;
  background: #343a40;
  color: #ffffff;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.5);
`;
const RoomNumberContainer = styled.div`
  position: relative;
  left: 2rem;
  font-size: 2.5rem;
`;
const RoomWrapper = styled.div`
  position: fixed;
  top: 5rem;
  width: 100%;
  height: calc(100% - 13rem);
  font-size: 2rem;
`;
const MessageContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  font-size: 2rem;
`;
const InputContainer = styled.div`
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 8rem;
  bottom: 0;
  background: #343a40;
  box-shadow: 0 1px 11px rgba(0, 0, 0, 0.5);
`;
const Input = styled.input`
  position: relative;
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
  left: 2rem;
  width: calc(95% - 8rem);
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
  left: 3.5rem;
  width: 8rem;
  height: 5rem;
  line-height: 5rem;
  background: #adb5bd;
  border: none;
  outline: none;
  text-align: center;
  border-radius: 0.4rem;
  cursor: pointer;
`;

export default Room;
