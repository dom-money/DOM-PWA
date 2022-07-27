import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
`;

const LoadingPage = () => {
  return (
    <Wrapper>
      <Title>
        Loading...
      </Title>
    </Wrapper>
  );
};

export default LoadingPage;
