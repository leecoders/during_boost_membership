import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Entrance({ history }) {
  const enterRoom = () => {
    const input = document.querySelector(".room-code-input");
    history.push("/room/" + input.value);
    input.value = "";
  };

  return (
    <EntranceWrapper>
      <RoomCodeFormContainer>
        <RoomCodeInput
          className="room-code-input"
          placeholder="#Room Number"
          onKeyPress={e => {
            if (e.key === "Enter") {
              enterRoom();
            }
          }}
          autoFocus
        ></RoomCodeInput>
        <Button onClick={enterRoom}>입장</Button>
        <FlashMessage></FlashMessage>
      </RoomCodeFormContainer>
    </EntranceWrapper>
  );
}

const EntranceWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 2rem;
`;
const RoomCodeFormContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 42rem;
  top: 50%;
  transform: translateY(-50%);
`;
const RoomCodeInput = styled.input`
  position: relative;
  display: inline-block;
  width: 30rem;
  height: 5rem;
  padding: 0 1rem;
  font-size: 2rem;
  outline: none;
`;
const Button = styled.div`
  position: relative;
  display: inline-block;
  left: 1.5rem;
  width: 7rem;
  height: 5rem;
  line-height: 5rem;
  background: #adb5bd;
  border: none;
  outline: none;
  text-align: center;
  border-radius: 0.4rem;
  cursor: pointer;
`;
const FlashMessage = styled.div`
  position: relative;
  width: 30rem;
  margin-top: 0.5rem;
  font-size: 1.4rem;
  color: red;
`;

export default Entrance;
