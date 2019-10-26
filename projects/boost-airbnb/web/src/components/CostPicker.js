import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../styles";
import util from "../utils";

const CostPickerWrapper = styled.div`
  position: absolute;
  top: 3.8rem;
  width: 45rem;
  height: 22rem;
  background: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
  border-radius: 0.8rem;
  font-size: 2rem;
  font-family: ${styles.handWrittenFont};
  user-select: none;
`;
const CostPickerInfo = styled.div`
  position: absolute;
  top: 1rem;
  left: 2rem;
`;
const RangeSliderContainer = styled.div`
  position: relative;
  top: 5rem;
  margin: 0 auto;
  width: 35rem;
  height: 3.2rem;
`;
const RangeSliderBar = styled.div`
  position: relative;
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  width: 32rem;
  height: 0.4rem;
  background: ${styles.borderColor};
  border-radius: 0.4rem;
`;
const RangeSliderBarBetweenButtons = styled.div`
  position: relative;
  left: ${props => props.rangeBarLeft + "px"};
  width: ${props => props.rangeBarWidth + "px"};
  height: 0.4rem;
  background: ${styles.primaryColor};
  border-radius: 0.4rem;
`;
const RangeButton = styled.button`
  position: absolute;
  left: ${props => props.left + "px"};
  top: 0;
  width: 3rem;
  height: 3rem;
  background: #ffffff;
  border: 0.1rem solid ${styles.primaryColor};
  color: ${styles.primaryColor};
  font-size: 1.2rem;
  border-radius: 50%;
  cursor: pointer;
  outline: none;
  user-select: none;
`;
const CostInputContainer = styled.div`
  position: relative;
  top: 7rem;
  margin: 0 auto;
  width: 32rem;
`;
const CostInputWrapper = styled.div`
  position: absolute;
  display: inline-block;
  ${props => (props.isLeft ? "left: 0" : "right: 0")};
  width: 14.2rem;
  height: 4rem;
  border: 1px solid
    ${props => (props.visibleFocus ? styles.primaryColor : styles.borderColor)};
  border-radius: 0.4rem;
`;
const BeforeCostInput = styled.div`
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  font-family: ${styles.normalFont};
  font-weight: bold;
`;
const CostInput = styled.input`
  position: relative;
  display: inline-block;
  width: 10rem;
  height: 4rem;
  border: none;
  outline: none;
  padding: 0 0.5rem;
  font-size: 1.6rem;
`;
const BetweenCostInput = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 4.2rem;
  line-height: 4.2rem;
  font-family: ${styles.symbolFont};
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

const CostPicker = ({
  minCostPassed,
  maxCostPassed,
  handleCostChange,
  handleSaveButtonClick
}) => {
  const [leftPos, setLeftPos] = useState(0);
  const [rightPos, setRightPos] = useState(320);
  const [leftMouseStart, setLeftMouseStart] = useState(undefined);
  const [rightMouseStart, setRightMouseStart] = useState(undefined);
  const [leftButtonStart, setLeftButtonStart] = useState(0);
  const [rightButtonStart, setRightButtonStart] = useState(0);
  const [focusLeftInput, setFocusLeftInput] = useState(false);
  const [focusRightInput, setFocusRightInput] = useState(false);
  const [minCost, setMinCost] = useState(minCostPassed);
  const [maxCost, setMaxCost] = useState(maxCostPassed);
  const [visibilityForDelete, setVisibilityForDelete] = useState(false);

  useEffect(() => {
    handleCostChange(minCost, maxCost);
    setLeftPos(getLeftPos(minCost));
    setRightPos(getRightPos(maxCost));
    if (+minCost !== 12000 || +maxCost !== 1000000) {
      setVisibilityForDelete(true);
    } else {
      setVisibilityForDelete(false);
    }
  }, [minCost, maxCost]);

  const handleDragStartForLeft = e => {
    e.dataTransfer.setDragImage(document.querySelector("#hidden"), 0, 0);
    setLeftButtonStart(leftPos);
    setLeftMouseStart(e.pageX);
  };
  const handleDragStartForRight = e => {
    e.dataTransfer.setDragImage(document.querySelector("#hidden"), 0, 0);
    setRightButtonStart(rightPos);
    setRightMouseStart(e.pageX);
  };
  const handleDrag = e => {
    if (leftMouseStart) {
      const dist = e.pageX - leftMouseStart;
      let nextLeft = leftButtonStart + dist;
      if (nextLeft + 10 > rightPos) return;
      if (nextLeft < 0) return;
      if (nextLeft > 320) return;
      setLeftPos(nextLeft);
      const portion = util.getCostPortionByRange(nextLeft);
      const nextCost = 988000 * portion + 12000;
      setMinCost(parseInt(nextCost));
    }
    if (rightMouseStart) {
      const dist = e.pageX - rightMouseStart;
      let nextRight = rightButtonStart + dist;
      if (nextRight - 10 < leftPos) return;
      if (nextRight < 0) return;
      if (nextRight > 320) return;
      setRightPos(nextRight);
      const portion = util.getCostPortionByRange(nextRight);
      const nextCost = 988000 * portion + 12000;
      setMaxCost(parseInt(nextCost));
    }
  };
  const handleDragEnd = e => {
    setLeftMouseStart(undefined);
    setRightMouseStart(undefined);
  };
  const handleMinCostChange = e => {
    let value = e.target.value;
    if (value > maxCost) setMaxCost(value);
    setMinCost(value);
  };
  const handleMaxCostChange = e => {
    let value = e.target.value;
    if (value < minCost) setMinCost(value);
    setMaxCost(value);
  };
  const getLeftPos = value => {
    const portion = util.getRangePortionByCost(value);
    let nextLeft = portion * 320;
    if (nextLeft > rightPos) {
      setRightPos(nextLeft);
      nextLeft -= 10;
      if (nextLeft < 0) nextLeft = 0;
    }
    return nextLeft;
  };
  const getRightPos = value => {
    const portion = util.getRangePortionByCost(value);
    let nextRight = portion * 320;
    if (nextRight < leftPos) {
      setLeftPos(nextRight);
      nextRight += 10;
      if (nextRight > 320) nextRight = 320;
    }
    return nextRight;
  };

  return (
    <CostPickerWrapper
      onClick={() => {
        setFocusRightInput(false);
        setFocusLeftInput(false);
      }}
    >
      <CostPickerInfo>*1박 기준 요금입니다.</CostPickerInfo>
      <img
        id="hidden"
        style={{ position: "absolute", left: "-5000rem", visibility: "hidden" }} // 하..
        src="../assets/images/logo.png"
      />
      <RangeSliderContainer>
        <RangeSliderBar>
          <RangeSliderBarBetweenButtons
            rangeBarLeft={leftPos}
            rangeBarWidth={rightPos - leftPos}
          />
        </RangeSliderBar>
        <RangeButton
          draggable="true"
          onDragStart={handleDragStartForLeft}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          left={leftPos}
        >
          |||
        </RangeButton>
        <RangeButton
          draggable="true"
          onDragStart={handleDragStartForRight}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          left={rightPos}
        >
          |||
        </RangeButton>
      </RangeSliderContainer>
      <CostInputContainer>
        <CostInputWrapper
          onClick={e => {
            setFocusRightInput(false);
            setFocusLeftInput(true);
            e.stopPropagation();
          }}
          isLeft={true}
          visibleFocus={focusLeftInput}
        >
          <BeforeCostInput>₩</BeforeCostInput>
          <CostInput
            id="min-cost"
            type="number"
            value={minCost}
            onChange={handleMinCostChange}
          ></CostInput>
        </CostInputWrapper>
        <BetweenCostInput>-</BetweenCostInput>
        <CostInputWrapper
          onClick={e => {
            setFocusLeftInput(false);
            setFocusRightInput(true);
            e.stopPropagation();
          }}
          isLeft={false}
          visibleFocus={focusRightInput}
        >
          <BeforeCostInput>₩</BeforeCostInput>
          <CostInput
            id="max-cost"
            type="number"
            value={maxCost}
            onChange={handleMaxCostChange}
          ></CostInput>
        </CostInputWrapper>
      </CostInputContainer>
      {visibilityForDelete && (
        <Button
          type={"delete"}
          onClick={() => {
            setMinCost(12000);
            setMaxCost(1000000);
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
    </CostPickerWrapper>
  );
};

export default CostPicker;
