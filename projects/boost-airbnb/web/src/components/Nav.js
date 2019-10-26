import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../styles";
import DatePicker from "./DatePicker.js";
import PersonnelPicker from "./PersonnelPicker.js";
import CostPicker from "./CostPicker.js";
import util from "../utils";

const NavWrapper = styled.div`
  position: relative;
  height: 4.8rem;
  border-bottom: 1px solid ${styles.borderColor};
  box-shadow: 0 4px 11px rgba(0, 0, 0, 0.1);
`;
const ButtonContainer = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;
const ButtonWrapper = styled.span`
  position: relative;
  display: inline-block;
  margin-left: 1.5rem;
`;
const Button = styled.button`
  position: relative;
  height: 3.2rem;
  width: auto;
  padding: 0 1.5rem;
  border: 1px solid ${styles.borderColor};
  font-family: "KimNamyun", sans-serif;
  font-size: 2rem;
  border-radius: 0.4rem;
  color: ${props =>
    props.isClicked || props.isSet ? "#ffffff" : styles.textColor};
  background: ${props =>
    props.isClicked || props.isSet ? styles.primaryColor : "#ffffff"};
  outline: none;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  &:hover {
    background: ${props =>
      props.isClicked ? styles.hoverPrimaryColor : styles.buttonHoverColor};
  }
  ${props =>
    props.isSet && "&:hover { background: " + styles.hoverPrimaryColor + "}"}
`;
const BackgroundShadow = styled.div`
  position: fixed;
  top: 4.1rem;
  display: ${props => (props.isModalOn ? "block" : "none")};
  width: 500rem;
  height: 500rem;
  background: rgba(255, 255, 255, 0.85);
`;

const Nav = ({ liftUpFilterInfo, liftUpNavModalControl }) => {
  const [visibilityForDate, setVisibilityForDate] = useState(false);
  const [visibilityForPersonnel, setVisibilityForPersonnel] = useState(false);
  const [visibilityForCost, setVisibilityForCost] = useState(false);
  // for DatePicker
  const [dateInfo, setDateInfo] = useState("날짜");
  const [checkInDate, setCheckInDate] = useState(undefined);
  const [checkOutDate, setCheckOutDate] = useState(undefined);
  // for PersonnelPicker
  const [personnelInfo, setPersonnelInfo] = useState("인원");
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);
  const [infantCount, setInfantCount] = useState(0);
  // for CostPicker
  const [costInfo, setCostInfo] = useState("가격");
  const [minCost, setMinCost] = useState(12000);
  const [maxCost, setMaxCost] = useState(1000000);

  useEffect(() => {
    if (!checkModalOn()) liftUpFilterInfo(dateInfo, personnelInfo, costInfo);
  }, [visibilityForDate, visibilityForPersonnel, visibilityForCost]);
  useEffect(() => {
    let infoMessage = "";
    if (!checkInDate && !checkOutDate) {
      infoMessage = "날짜";
    } else if (!checkOutDate) {
      infoMessage = `${checkInDate} - 체크아웃`;
    } else if (!checkInDate) {
      infoMessage = `체크인 - ${checkOutDate}`;
    } else {
      infoMessage = `${checkInDate} - ${checkOutDate}`;
    }
    setDateInfo(infoMessage);
  }, [checkInDate, checkOutDate]);
  useEffect(() => {
    let infoMessage = "";
    if (adultCount + childCount === 0) infoMessage = "인원";
    else infoMessage = `게스트 ${adultCount + childCount}명`;
    if (infantCount > 0) infoMessage += `, 유아 ${infantCount}명`;
    setPersonnelInfo(infoMessage);
  }, [adultCount, childCount, infantCount]);
  useEffect(() => {
    let costMessage = "";
    if (+minCost === 12000 && +maxCost === 1000000) {
      costMessage = "가격";
    } else if (+minCost === 12000) {
      costMessage = `최대 ${util.convertCostToCurrencyFormat(maxCost)}원`;
    } else if (+maxCost === 1000000) {
      costMessage = `${util.convertCostToCurrencyFormat(minCost)}원+`;
    } else {
      costMessage = `${util.convertCostToCurrencyFormat(
        minCost
      )}원 - ${util.convertCostToCurrencyFormat(maxCost)}원`;
    }
    setCostInfo(costMessage);
  }, [minCost, maxCost]);

  const setAllToFalse = () => {
    if (visibilityForDate) setVisibilityForDate(false);
    if (visibilityForPersonnel) setVisibilityForPersonnel(false);
    if (visibilityForCost) setVisibilityForCost(false);
  };
  const checkModalOn = () => {
    return visibilityForDate || visibilityForPersonnel || visibilityForCost;
  };
  const handleSaveButtonClick = () => {
    setAllToFalse();
  };
  const handleDateChange = (checkInDatePassed, checkOutDatePassed) => {
    setCheckInDate(checkInDatePassed);
    setCheckOutDate(checkOutDatePassed);
  };
  const handlePersonnelChange = (
    guestCountPassed,
    childCountPassed,
    infantCountPassed
  ) => {
    setAdultCount(guestCountPassed);
    setChildCount(childCountPassed);
    setInfantCount(infantCountPassed);
  };
  const handleCostChange = (minCostPassed, maxCostPassed) => {
    setMinCost(minCostPassed);
    setMaxCost(maxCostPassed);
  };
  liftUpNavModalControl(setAllToFalse);

  return (
    <NavWrapper>
      <ButtonContainer>
        <BackgroundShadow isModalOn={checkModalOn()} onClick={setAllToFalse} />
        <ButtonWrapper>
          <Button
            isClicked={visibilityForDate}
            isSet={dateInfo !== "날짜"}
            alt="date"
            onClick={() => {
              setAllToFalse();
              setVisibilityForDate(!visibilityForDate);
            }}
          >
            {dateInfo}
          </Button>
          {visibilityForDate && (
            <DatePicker
              checkInDatePassed={checkInDate}
              checkOutDatePassed={checkOutDate}
              handleSaveButtonClick={handleSaveButtonClick}
              handleDateChange={handleDateChange}
            />
          )}
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            isClicked={visibilityForPersonnel}
            isSet={personnelInfo !== "인원"}
            alt="personnel"
            onClick={() => {
              setAllToFalse();
              setVisibilityForPersonnel(!visibilityForPersonnel);
            }}
          >
            {personnelInfo}
          </Button>
          {visibilityForPersonnel && (
            <PersonnelPicker
              adultCountPassed={adultCount}
              childCountPassed={childCount}
              infantCountPassed={infantCount}
              handleSaveButtonClick={handleSaveButtonClick}
              handlePersonnelChange={handlePersonnelChange}
            />
          )}
        </ButtonWrapper>
        <ButtonWrapper>
          <Button
            isClicked={visibilityForCost}
            isSet={costInfo !== "가격"}
            alt="cost"
            onClick={() => {
              setAllToFalse();
              setVisibilityForCost(!visibilityForCost);
            }}
          >
            {costInfo}
          </Button>
          {visibilityForCost && (
            <CostPicker
              minCostPassed={minCost}
              maxCostPassed={maxCost}
              handleSaveButtonClick={handleSaveButtonClick}
              handleCostChange={handleCostChange}
            />
          )}
        </ButtonWrapper>
      </ButtonContainer>
    </NavWrapper>
  );
};

export default Nav;
