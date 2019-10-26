import React, { useState, useEffect } from "react";
import Header from "./Header.js";
import Nav from "./Nav.js";
import Section from "./Section.js";
import styled from "styled-components";
import styles from "../styles";
import util from "../utils";

const AppWrapper = styled.div`
  ${styles.handWrittenFontFace};
`;
const HeaderContainer = styled.div`
  z-index: 99;
  position: fixed;
  width: 100%;
  background: #ffffff;
`;

const App = () => {
  const [dateInfo, setDateInfo] = useState();
  const [personnelInfo, setPersonnelInfo] = useState();
  const [costInfo, setCostInfo] = useState();

  let closeNavModal;

  useEffect(() => {
    // 최초 마운트, 필터링 결과 update -> section 리렌더링해야 함
  }, [dateInfo, personnelInfo, costInfo]);

  const liftUpFilterInfo = (
    dateInfoPassed,
    personnelInfoPassed,
    costInfoPassed
  ) => {
    const dateInfoParsed = util.parseDateInfo(dateInfoPassed);
    const personnelInfoParsed = util.parsePersonnelInfo(personnelInfoPassed);
    const costInfoParsed = util.parseCostInfo(costInfoPassed);
    // 실제 변경 사항이 있을 때만 setState
    if (JSON.stringify(dateInfo) !== JSON.stringify(dateInfoParsed))
      setDateInfo(dateInfoParsed);
    if (JSON.stringify(personnelInfo) !== JSON.stringify(personnelInfoParsed))
      setPersonnelInfo(personnelInfoParsed);
    if (JSON.stringify(costInfo) !== JSON.stringify(costInfoParsed))
      setCostInfo(costInfoParsed);
  };
  const liftUpNavModalControl = setAllToFalse => {
    closeNavModal = setAllToFalse;
  };
  const handleHeaderMenuClick = () => {
    closeNavModal();
  };
  return (
    <AppWrapper>
      <HeaderContainer>
        <Header handleHeaderMenuClick={handleHeaderMenuClick} />
        <Nav
          liftUpFilterInfo={liftUpFilterInfo}
          liftUpNavModalControl={liftUpNavModalControl}
        />
      </HeaderContainer>
      <Section
        dateInfo={dateInfo}
        personnelInfo={personnelInfo}
        costInfo={costInfo}
      />
    </AppWrapper>
  );
};

export default App;
