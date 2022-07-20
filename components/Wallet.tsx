import React from 'react';
import styled from 'styled-components';

import CollapsibleContainer from './CollapsibleContainer';
import AmountDisplay from './AmountDisplay';
import Button from './Button';
import IconButton from './IconButton';
import ScanQRIcon from '../styles/icons/ScanQRIcon';

interface WalletProps {
  /**
   * Currency amount
   */
  amount: number;
  /**
   * Is component inactive?
   */
  inactive?: boolean;
  /**
   * 'Top Up' Button Click handler
   */
  topUpButtonOnClick?: () => void;
  /**
   * 'Send' Button Click handler
   */
  SendButtonOnClick?: () => void;
  /**
   * Scan QR Icon Button Click handler
   */
  ScanQRIconButtonOnClick?: () => void;
}

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.375rem;
`;

const Wallet = ({
  amount,
  inactive = false,
  topUpButtonOnClick,
  SendButtonOnClick,
  ScanQRIconButtonOnClick,
}: WalletProps) => {
  return (
    <CollapsibleContainer
      label='Wallet'
      primaryContent={
        <ContentContainer>
          <AmountDisplay amount={amount} size='small' inactive={inactive}/>
          <IconButton
            size='large'
            backgroundColor='#020202'
            onClick={ScanQRIconButtonOnClick}
          >
            <ScanQRIcon color='#FFFFFF'/>
          </IconButton>
        </ContentContainer>
      }
      secondaryContent={
        <ButtonContainer>
          <Button label='Top Up' primary onClick={topUpButtonOnClick} />
          <Button label='Send' onClick={SendButtonOnClick}/>
        </ButtonContainer>
      }
      shouldSecondaryContentBeOutside={true}
    />
  );
};

export default Wallet;
