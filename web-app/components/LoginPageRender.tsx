import React from 'react';
import styled from 'styled-components';

import Button from './Button';

interface LoginPageRenderProps {
  /**
   * Login Button Click handler
   */
  onClick?: () => void;
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  max-width: 20rem;
`;

const LoginPageRender = ({ ...props }: LoginPageRenderProps) => {
  return (
    <Wrapper>
      <StyledButton label="Login" primary { ...props }/>
    </Wrapper>
  );
};

export default LoginPageRender;
