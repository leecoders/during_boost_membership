import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Speech({ data }) {
  return (
    <SpeechWrapper>
      <Bubble>{data.message}</Bubble>
      <Time>{data.date}</Time>
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
  max-width: 70%;
  padding: 1rem;
  background: #ffd43b;
  border-radius: 0.7rem;
`;
const Time = styled.div`
  position: relative;
  display: inline-block;
  top: 0.5rem;
  margin-left: 0.5rem;
  font-size: 1.4rem;
  color: #ffffff;
`;

export default Speech;
