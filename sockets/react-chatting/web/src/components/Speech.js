import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Speech({ message }) {
  return (
    <SpeechWrapper>
      <Bubble>{message}</Bubble>
    </SpeechWrapper>
  );
}

const SpeechWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 1rem 0;
  left: 1rem;
`;
const Bubble = styled.div`
  position: relative;
  display: inline-block;
  padding: 1rem;
  background: #ffd43b;
  border-radius: 0.7rem;
`;

export default Speech;
