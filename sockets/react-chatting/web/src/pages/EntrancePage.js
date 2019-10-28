import React from "react";
import styled from "styled-components";
import Entrance from "components/Entrance";

function EntrancePage({ history }) {
  return (
    <EntranceContainer>
      <Entrance history={history} />
    </EntranceContainer>
  );
}

const EntranceContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export default EntrancePage;
