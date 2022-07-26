import React from 'react';
import styled from 'styled-components';

import IconButtonCircular from './IconButtonCircular';
import GoBackIcon from '../styles/icons/GoBackIcon';

interface HeaderGoBackProps {
  /**
   * Prop for extending styled-components style
   */
  className?: string;
  /**
   * URL to Click
   */
  href: string;
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  height: 2.75rem;
`;

const HeaderGoBack = ({ href, ...props }: HeaderGoBackProps) => {
  return (
    <Wrapper {...props}>
      <IconButtonCircular
        ariaLabel='Return to previous page'
        data-testid='goBackIcon'
        href={href}
      >
        <GoBackIcon color='#F8F8F8'/>
      </IconButtonCircular>
    </Wrapper>
  );
};

export default HeaderGoBack;
