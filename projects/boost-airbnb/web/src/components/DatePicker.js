import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../styles";
import "react-dates/initialize";
import { DayPickerRangeController } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/ko";
moment.locale("ko");

const DatePickerWrapper = styled.div`
  position: absolute;
  top: 3.8rem;
  width: 65rem;
  height: 36rem;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
  border-radius: 0.8rem;
  padding-top: 1.5rem;
  display: flex;
  justify-content: center;
  color: ${styles.textColor};
  font-size: 2rem;
  font-family: ${styles.normalFont};
`;
const Button = styled.div`
  z-index: 5;
  position: absolute;
  ${props =>
    props.type === "delete"
      ? "left: 2rem;"
      : "right: 2rem; color: " + styles.primaryColor + ";"}
  bottom: 2.5rem;
  cursor: pointer;
  font-family: ${styles.handWrittenFont};
  &:hover {
    text-decoration: underline;
  }
`;

const DatePicker = ({
  checkInDatePassed,
  checkOutDatePassed,
  handleDateChange,
  handleSaveButtonClick
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [checkInDate, setCheckInDate] = useState(checkInDatePassed);
  const [checkOutDate, setCheckOutDate] = useState(checkOutDatePassed);
  const [visibilityForDelete, setVisibilityForDelete] = useState(false);

  useEffect(() => {
    if (startDate instanceof moment) {
      const d = startDate.format("l").split(".");
      const year = d[0];
      const month = d[1];
      const day = d[2];
      setCheckInDate(`${year}년 ${month}월 ${day}일`);
    }
    if (endDate instanceof moment) {
      const d = endDate.format("l").split(".");
      const year = d[0];
      const month = d[1];
      const day = d[2];
      setCheckOutDate(`${year}년 ${month}월 ${day}일`);
    }
  }, [startDate, endDate]);
  useEffect(() => {
    handleDateChange(checkInDate, checkOutDate);
    if (!!checkInDate) {
      const year = checkInDate.split("년 ")[0];
      const month = checkInDate.split("년 ")[1].split("월 ")[0];
      const day = checkInDate.split("월 ")[1].split("일")[0];
      setStartDate(moment(`${year}-${month}-${day}`));
      setFocusedInput("endDate");
    }
    if (!!checkOutDate) {
      const year = checkOutDate.split("년 ")[0];
      const month = checkOutDate.split("년 ")[1].split("월 ")[0];
      const day = checkOutDate.split("월 ")[1].split("일")[0];
      setEndDate(moment(`${year}-${month}-${day}`));
      setFocusedInput("endDate");
    }
    if (checkInDate || checkOutDate) {
      setVisibilityForDelete(true);
    } else {
      setVisibilityForDelete(false);
    }
  }, [checkInDate, checkOutDate]);

  return (
    <DatePickerWrapper>
      <DayPickerRangeController
        startDate={startDate}
        endDate={endDate}
        focusedInput={focusedInput}
        hideKeyboardShortcutsPanel={true}
        keepOpenOnDateSelect={true}
        numberOfMonths={2}
        noBorder={true}
        monthFormat={"YYYY MMMM"}
        isOutsideRange={day => day.isBefore(moment())}
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        onFocusChange={focusedInput => {
          setFocusedInput(focusedInput);
        }}
      />
      {visibilityForDelete && (
        <Button
          type={"delete"}
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            setCheckInDate(undefined);
            setCheckOutDate(undefined);
            setFocusedInput("startDate");
          }}
        >
          삭제
        </Button>
      )}

      <Button
        type={"save"}
        onClick={() => {
          handleSaveButtonClick();
        }}
      >
        저장
      </Button>
    </DatePickerWrapper>
  );
};

export default DatePicker;
