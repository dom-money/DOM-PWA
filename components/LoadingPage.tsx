import React from 'react';
import styled from 'styled-components';
import LogoSVG from '../styles/svg/LogoSVG';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const AnimatedLogoSVG = styled(LogoSVG)`
  animation-name: grow;
  animation-duration: 10000ms;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  @keyframes grow {
    from {
      transform: scale(1);
    }
    50% {
      transform: scale(1.5)
    }
    to {
      transform: scale(1);
    }
  }
`;

const LoadingPage = () => {
  return (
    <Wrapper>
      <AnimatedLogoSVG />
    </Wrapper>
  );
};

export default LoadingPage;
