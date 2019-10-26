import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../styles";
import SigninTab from "./SigninTab.js";
import SignupTab from "./SignupTab.js";

const UserBoxWrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 7.5rem;
  right: 1rem;
  width: 50.5rem;
  height: 34rem;
  background: #dee2e6;
  box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
  border-radius: 0.8rem;
  color: ${styles.textColor};
  font-size: 2.5rem;
  text-align: center;
`;
const Button = styled.div`
  z-index: ${props => (props.isTurnedOn ? "101" : "100")};
  position: absolute;
  ${props => (props.isSignin ? "left: 0" : "right: 0")}
  width: 50%;
  height: 20%;
  padding-top: 0.7rem;
  border-radius: 0.8rem;
  background: ${props => (props.isTurnedOn ? "#ffffff" : "#dee2e6")};
  box-shadow: ${props =>
    props.isTurnedOn ? "rgba(0, 0, 0, 0.08) 0px 4px 8px" : "none"};
  cursor: pointer;
  font-weight: bold;
`;

const UserBox = ({ signinStatePassed, liftUpSigninStateToHeader }) => {
  const [visibilityForSignin, setVisibilityForSignin] = useState(true);
  const [signinState, setSigninState] = useState(signinStatePassed);

  useEffect(() => {
    liftUpSigninStateToHeader(signinState);
  }, [signinState]);

  const liftUpSigninStateToUserBox = signinStatePassed => {
    setSigninState(signinStatePassed);
  };

  return (
    <UserBoxWrapper>
      <Button
        isSignin={true}
        isTurnedOn={visibilityForSignin}
        onClick={() => {
          setVisibilityForSignin(true);
        }}
      >
        로그인
      </Button>
      <Button
        isSignin={false}
        isTurnedOn={!visibilityForSignin}
        onClick={() => {
          setVisibilityForSignin(false);
        }}
      >
        회원가입
      </Button>
      {visibilityForSignin ? (
        <SigninTab
          signinStatePassed={signinState}
          liftUpSigninStateToUserBox={liftUpSigninStateToUserBox}
        />
      ) : (
        <SignupTab />
      )}
    </UserBoxWrapper>
  );
};

export default UserBox;
