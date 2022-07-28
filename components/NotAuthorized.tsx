import React from 'react';
import styled from 'styled-components';

import Button from './Button';

interface NotAuthorizedProps {
  /**
   * Profile Avatar Button Click handler
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

const NotAuthorized = ({ ...props }: NotAuthorizedProps) => {
  return (
    <Wrapper>
      <StyledButton label="Login" primary {...props}/>
    </Wrapper>
  );
};

export default NotAuthorized;
