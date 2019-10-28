import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Room from "./Room.js";

function Entrance() {
  return (
    <EntranceWrapper>
      <RoomCodeFormContainer>
        <RoomCodeInput placeholder="#Room Number"></RoomCodeInput>
        <Button>입장</Button>
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
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
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
  width: 5%;
  height: 5rem;
  line-height: 5rem;
  background: #adb5bd;
  border: none;
  outline: none;
  text-align: center;
  border-radius: 0.4rem;
  cursor: pointer;
`;

export default Entrance;
