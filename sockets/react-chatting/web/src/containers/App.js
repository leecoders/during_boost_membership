import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import EntrancePage from "pages/EntrancePage.js";
import RoomPage from "pages/RoomPage.js";

function App() {
  return (
    <AppWrapper>
      <Route exact path="/" component={EntrancePage} />
      <Route path="/room/:number" component={RoomPage} />
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default App;
