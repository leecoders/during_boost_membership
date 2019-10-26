import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../styles";
import { fetchSignInResult } from "../utils/fetch.js";

const SigninTabWrapper = styled.div`
  z-index: 102;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30rem;
  border-radius: 0.8rem;
  background: #ffffff;
`;
const FormContainer = styled.div`
  position: relative;
  top: 5rem;
  margin: 0 auto;
  width: 40rem;
  height: auto;
`;
const Input = styled.input`
  position: relative;
  width: 30rem;
  height: 4rem;
  font-size: 2rem;
  padding: 0 1rem;
  border: 1px solid ${styles.borderColor};
  border-radius: 0.3rem;
  outline: none;
  &:focus {
    border: 1px solid ${styles.primaryColor};
  }
  &::placeholder {
    color: #adb5bd;
    font-family: "KimNamyun", sans-serif;
  }
`;
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 1rem 0;
  height: 4rem;
`;
const SubmitButton = styled.button`
  position: relative;
  top: 0.5rem;
  width: 32.2rem;
  height: 4rem;
  border: 1px solid ${styles.borderColor};
  border-radius: 0.4rem;
  font-family: "KimNamyun", sans-serif;
  font-size: 2rem;
  outline: none;
  color: #ffffff;
  background: ${styles.primaryColor};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;
const FlashMessageContainer = styled.div`
  text-align: start;
  font-size: 1.4rem;
  width: 32rem;
  margin: 0 auto;
  color: ${styles.titleColor};
`;
const SignoutContainer = styled.div`
  position: relative;
  top: 8rem;
  margin: 0 auto;
  width: 40rem;
  height: auto;
`;
const SignoutWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  width: 20rem;
  text-align: center;
  font-size: 3rem;
`;
const SignoutButton = styled.button`
  position: relative;
  top: 5rem;
  width: 32.2rem;
  height: 4rem;
  border: 1px solid ${styles.borderColor};
  border-radius: 0.4rem;
  font-family: "KimNamyun", sans-serif;
  font-size: 2rem;
  outline: none;
  color: #ffffff;
  background: ${styles.primaryColor};
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  &:hover {
    background: ${styles.hoverPrimaryColor};
  }
  &:active {
    background: ${styles.activePrimaryColor};
  }
`;

const SigninTab = ({ signinStatePassed, liftUpSigninStateToUserBox }) => {
  const [id, setId] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [signinState, setSigninState] = useState(signinStatePassed);
  const [failureMessage, setFailureMessage] = useState("");

  useEffect(() => {
    liftUpSigninStateToUserBox(signinState);
  }, [signinState]);

  const signin = async () => {
    const result = await fetchSignInResult(id, password);
    if (result.message === "success") {
      setSigninState(true);
    } else {
      setFailureMessage("사용자 정보를 다시 확인해주세요.");
    }
  };

  return (
    <SigninTabWrapper>
      {!signinState ? (
        <FormContainer>
          <InputWrapper>
            <Input
              onChange={e => {
                setId(e.target.value);
              }}
              placeholder={"아이디"}
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              onChange={e => {
                setPassword(e.target.value);
              }}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  signin();
                }
              }}
              placeholder={"비밀번호"}
            />
          </InputWrapper>
          {!!failureMessage && (
            <FlashMessageContainer>{failureMessage}</FlashMessageContainer>
          )}
          <SubmitButton onClick={signin}>로그인</SubmitButton>
        </FormContainer>
      ) : (
        <SignoutContainer>
          <SignoutWrapper>
            <div>로그인 되었습니다.</div>
          </SignoutWrapper>
          <SignoutButton>로그아웃</SignoutButton>
        </SignoutContainer>
      )}
    </SigninTabWrapper>
  );
};

export default SigninTab;
