import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import Title from './Title';

interface InvestButtonProps {
  /**
   * URL on Click
   */
  href?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  position: fixed;
  bottom: 3.75rem;
  left: 50%;
  transform: translate(-50%, 0);
`;

const ButtonBackground = styled.span`
  display: inline-block;
  position: absolute;
  width: 200%;
  height: 200%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #020202;
  filter: blur(40px);
  border-radius: 60px;
  z-index: -1;
`;

const Button = styled.span`
  display: inline-block;
  height: 28px;
  width: 81px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
`;

const InvestButton = ({ href = '' }: InvestButtonProps) => {
  return (
    <Wrapper>
      <ButtonBackground />
      <Link href={ href } aria-labelledby='invest-button-title'>
        <Button />
      </Link>
      <Title id='invest-button-title' text='Press To Invest' />
    </Wrapper>
  );
};

export default InvestButton;
