import React from "react";
import styled from "styled-components";
import styles from "../styles";

const SignupTabWrapper = styled.div`
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
  top: 1rem;
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
    font-family: "KimNamyun", sans-serif;
    color: #adb5bd;
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
    background: ${styles.hoverPrimaryColor};
  }
  &:active {
    background: ${styles.activePrimaryColor};
  }
`;
const FlashMessageContainer = styled.div`
  text-align: start;
  font-size: 1.4rem;
  width: 32rem;
  margin: 0 auto;
  color: ${styles.titleColor};
`;

const SignupTab = () => {
  return (
    <SignupTabWrapper>
      <FormContainer>
        <InputWrapper>
          <Input placeholder={"아이디"} />
        </InputWrapper>
        <InputWrapper>
          <Input placeholder={"비밀번호"} />
        </InputWrapper>
        <InputWrapper>
          <Input placeholder={"비밀번호 확인"} />
        </InputWrapper>
        <InputWrapper>
          <Input placeholder={"이름"} />
        </InputWrapper>
        <FlashMessageContainer>
          사용자 정보를 다시 확인해주세요.
        </FlashMessageContainer>
        <SubmitButton>회원가입</SubmitButton>
      </FormContainer>
    </SignupTabWrapper>
  );
};

export default SignupTab;
