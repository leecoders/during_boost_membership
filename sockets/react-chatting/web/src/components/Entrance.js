import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Room from "./Room.js";

function Entrance() {
  return <EntranceWrapper></EntranceWrapper>;
}

const EntranceWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 2rem;
`;

export default Entrance;
