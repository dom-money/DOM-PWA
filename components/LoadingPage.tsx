import React from 'react';
import styled from 'styled-components';
import LogoSVG from '../styles/svg/LogoSVG';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const LoadingPage = () => {
  return (
    <Wrapper>
      <LogoSVG />
    </Wrapper>
  );
};

export default LoadingPage;
