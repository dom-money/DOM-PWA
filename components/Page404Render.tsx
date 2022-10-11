import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 7vmin;
  color: #ffffff;
`;

const Page404Render = () => {
  return (
    <Wrapper>
      <Title>Error 404: Not Found</Title>
    </Wrapper>
  );
};

export default Page404Render;
