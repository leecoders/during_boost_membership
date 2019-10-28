import React from "react";
import styled from "styled-components";
import Entrance from "../components/Entrance.js";
import Room from "../components/Room.js";

function App() {
  return (
    <AppWrapper className="App">
      <Entrance />
      {/* <Room /> */}
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default App;
