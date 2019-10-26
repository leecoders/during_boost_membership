import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../styles";
import util from "../utils";

const RoomWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  height: 22rem;
`;
const RoomImage = styled.div`
  position: relative;
  display: inline-block;
  width: 30rem;
  height: 100%;
  background: url(${props => props.src}) no-repeat 50% 50%;
  background-size: 30rem 100%;
  border-radius: 0.3rem;
`;
const RoomInfoContainer = styled.div`
  position: absolute;
  display: inline-block;
  margin-left: 2rem;
  width: 58rem;
  height: 100%;
`;
const RoomType = styled.div`
  position: relative;
  display: inline-block;
  color: ${styles.bluishColor};
`;
const RoomTitle = styled.div`
  position: relative;
  font-size: 3rem;
`;
const RoomInfo = styled.div`
  position: relative;
  top: 0.5rem;
  color: ${styles.bluishColor};
`;
const RoomRating = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;
const RoomCost = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 3rem;
`;
const ReserveButton = styled.button`
  position: relative;
  right: 0;
  bottom: 0.2rem;
  margin-left: 1rem;
  padding: 0.5rem 2rem;
  font-family: ${styles.handWrittenFont};
  font-size: 2rem;
  color: #ffffff;
  outline: none;
  border: none;
  border-radius: 0.4rem;
  background: ${styles.titleColor};
  &:hover {
    background: ${styles.hoverTitleColor};
  }
  &:active {
    background: ${styles.activeTitleColor};
  }
`;

const Room = ({ room }) => {
  return (
    <RoomWrapper>
      <RoomImage src={room.images}></RoomImage>
      <RoomInfoContainer>
        <RoomType>{room.type}</RoomType>
        <RoomTitle>{room.name}</RoomTitle>
        <RoomInfo>
          {room.capacity && "인원 " + room.capacity + "명"}
          {room.bedroom && "·침실 " + room.bedroom + "개"}
          {room.bed && "·침대 " + room.bed + "개"}
          {Math.floor(room.bathroom) &&
            "·개인 욕실 " + Math.floor(room.bathroom) + "개"}
          {room.bathroom - Math.floor(room.bathroom) > 0 && "·공동 욕실 1개"}
        </RoomInfo>
        <RoomRating>
          {!room.review_count ? (
            "리뷰가 없어요ㅠㅠ"
          ) : (
            <div>
              <span style={{ color: "#FF0000" }}>&#11089;</span>
              {room.rating / 20}
              <span style={{ color: styles.bluishColor }}>
                ({room.review_count})
              </span>
            </div>
          )}
        </RoomRating>
        <RoomCost>
          <strong>
            {util.convertCostToCurrencyFormat(1172 * room.price)}원
          </strong>
          /1박
          <ReserveButton>예 약</ReserveButton>
        </RoomCost>
      </RoomInfoContainer>
    </RoomWrapper>
  );
};

export default Room;
