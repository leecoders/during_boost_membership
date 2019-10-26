import React, { useState, useEffect } from "react";
import styled from "styled-components";
import styles from "../styles";

const FooterWrapper = styled.div`
  position: relative;
  height: 10rem;
  border-top: 1px solid ${styles.borderColor};
  background: rgb(62, 62, 62);
  font-family: ${styles.normalFont};
  text-align: center;
  font-size: 1.5rem;
`;
const Copyright = styled.div`
  height: 10rem;
  line-height: 10rem;
  color: #ffffff;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Copyright>
        Copyright © {new Date().getFullYear()} leecoders. All rights reserved.
      </Copyright>
    </FooterWrapper>
  );
};

export default Footer;
