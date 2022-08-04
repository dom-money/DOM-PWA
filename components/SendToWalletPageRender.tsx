import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import AddressInput from './AddressInput';
import AmountInput from './AmountInput';
import Button from './Button';

interface SendToWalletPageRenderProps {
  /**
   * Total Balance Amount
   */
  totalAmount: number;
  /**
   * Input amount
   */
  inputAmount?: string;
  /**
   * Amount input on change handler function
   */
  onInputAmountChange?: ({ formattedValue, value }: onInputChangeType) => void;
  /**
   * Input address
   */
  inputAddress: string;
  /**
   * Address input on change handler function
   */
  onInputAddressChange?: (addressValue: string) => void;
  /**
   * Address input on focus handler function
   */
  onInputAddressFocus?: (addressValue: string) => void;
  /**
   * Amount input validation error message
   */
  inputAmountErrorMessage?: string;
  /**
   * Are inputs valid for submission?
   */
  isValid: boolean,
  /**
   * 'Send' Button Click Handler
   */
  sendButtonOnClick?: () => void,
  /**
   * 'Clear' Button Click Handler
   */
  clearButtonOnClick?: () => void,
  /**
   * 'Get Contact' Button Click handler
   */
  getContactOnClick?: () => void;
  /**
   * 'Scan QR' Button Click handler
   */
  scanQROnClick?: () => void;
}

interface onInputChangeType {
  formattedValue: string,
  value: string
};

const Wrapper = styled.div`
  padding: 1.625rem 0.313rem;
`;

const HeaderWithMargin = styled(HeaderGoBack)`
  margin: 0 2.25rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.375rem;
`;

const SendToWalletPageRender = ({
  totalAmount,
  inputAmount,
  onInputAmountChange,
  inputAddress,
  onInputAddressChange,
  onInputAddressFocus,
  inputAmountErrorMessage = '',
  isValid = false,
  getContactOnClick,
  scanQROnClick,
  sendButtonOnClick,
  clearButtonOnClick,
}: SendToWalletPageRenderProps) => {
  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    if (!sendButtonOnClick) {
      return;
    }
    sendButtonOnClick();
  };
  return (
    <Wrapper>
      <HeaderWithMargin
        href={'/'}
      />
      <TotalBalance
        amount={totalAmount}
      />
      <form onSubmit={handleSubmit}>
        <AddressInput
          label='Enter Or Choose Address'
          inputID='send-to-address-input'
          addressValue={inputAddress}
          onValueChange={onInputAddressChange}
          onFocus={onInputAddressFocus}
          getContactOnClick={getContactOnClick}
          scanQROnClick={scanQROnClick}
        />
        <AmountInput
          label='Enter Amount To Transfer'
          inputID='amount-to-transfer-input'
          amount={inputAmount}
          onInputChange={onInputAmountChange}
          errorMessage={inputAmountErrorMessage}
          autoFocus={false}
        />
        <ButtonContainer>
          <Button
            label='Send'
            primary
            disabled={!isValid}
            type='submit'
          />
          <Button
            label='Clear'
            onClick={clearButtonOnClick}
          />
        </ButtonContainer>
      </form>
    </Wrapper>
  );
};

export default SendToWalletPageRender;
