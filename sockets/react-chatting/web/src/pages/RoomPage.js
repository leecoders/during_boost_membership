import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Room from "components/Room.js";

function RoomPage({ match }) {
  return (
    <RoomContainer>
      <Room roomNumber={match.params.number} />
    </RoomContainer>
  );
}

const RoomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default RoomPage;
