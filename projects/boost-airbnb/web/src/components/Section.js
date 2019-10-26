import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchGetRooms } from "../utils/fetch.js";
import Room from "./Room.js";
import Footer from "./Footer.js";
import styles from "../styles/index.js";
import arrowBottomImage from "../assets/images/arrow_bottom.png";

const SectionWrapper = styled.div`
  position: relative;
  top: 11.4rem;
  background: #ffffff;
  font-family: "KimNamyun", sans-serif;
  font-size: 2rem;
`;
const RoomsCounterContainer = styled.div`
  position: relative;
  width: 100%;
  height: 10rem;
  line-height: 10rem;
  text-align: center;
  font-size: 3.5rem;
  font-weight: bold;
  background: #f7f7f7;
  border-bottom: 0.1rem solid ${styles.borderColor};
`;
const RoomsWrapper = styled.div`
  position: relative;
  margin-top: 1rem;
  width: auto;
  min-height: 150rem;
`;
const RoomContainer = styled.div`
  position: relative;
  top: 1rem;
  margin: 0 auto;
  width: 90rem;
  padding: 2rem 0;
  ${props => (!!props.idx ? "border-top: 1px solid " + styles.borderColor : "")}
`;
const ViewMoreButtonContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 90rem;
  height: 10rem;
  text-align: center;
`;
const ViewMoreButton = styled.button`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  width: 5rem;
  height: 4rem;
  background: url(${arrowBottomImage}) no-repeat 50% 50%;
  background-size: 5rem 4rem;
  outline: none;
  border: none;
  opacity: 0.6;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
`;

const Section = ({ dateInfo, personnelInfo, costInfo }) => {
  const [roomsData, setRoomsData] = useState();
  const [rooms, setRooms] = useState();
  const [scrollLimit, setScrollLimit] = useState(20);

  useEffect(() => {
    (async () => {
      const result = await fetchGetRooms();
      if (result.message === "success") {
        if (JSON.stringify(rooms) !== JSON.stringify(result.data.rooms)) {
          setRoomsData(result.data.rooms);
          setRooms(result.data.rooms);
        }
      }
    })();
  }, []);
  useEffect(() => {
    if (!roomsData) return;
    const min = !costInfo || !costInfo.minCost ? -1234567890 : costInfo.minCost;
    const max = !costInfo || !costInfo.maxCost ? 1234567890 : costInfo.maxCost;
    const guest = !personnelInfo ? 0 : personnelInfo.guest;
    let newRooms = [];
    for (const room of roomsData) {
      if (
        min <= room.price * 1172 &&
        room.price * 1172 <= max &&
        guest <= room.capacity
      ) {
        newRooms.push(room);
      }
    }
    setRooms(newRooms);
  }, [costInfo, personnelInfo]);

  return (
    <SectionWrapper>
      {!rooms ? (
        <div
          style={{
            position: "relative",
            top: "5rem",
            textAlign: "center",
            fontSize: "3rem"
          }}
        >
          로딩중..
        </div>
      ) : (
        <RoomsCounterContainer>
          숙소 {rooms ? rooms.length : 0}개
        </RoomsCounterContainer>
      )}
      <RoomsWrapper>
        {rooms &&
          rooms.map((room, idx) => {
            if (idx > scrollLimit) return;
            return (
              <RoomContainer key={room.id} idx={idx}>
                <Room room={room} key={room.id} />
              </RoomContainer>
            );
          })}
      </RoomsWrapper>
      {rooms && scrollLimit + 10 < rooms.length && (
        <ViewMoreButtonContainer>
          <ViewMoreButton
            onClick={() => {
              setScrollLimit(scrollLimit + 10);
            }}
          />
        </ViewMoreButtonContainer>
      )}
      <Footer />
    </SectionWrapper>
  );
};

export default Section;
