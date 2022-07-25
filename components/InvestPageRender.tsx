import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import AmountInput from './AmountInput';
import Button from './Button';

interface InvestPageRenderProps {
  /**
   * Total Balance Amount
   */
  totalAmount: number;
  /**
   * Input amount as a string (for state control)
   */
  inputAmount?: string;
  /**
   * Input on change handler function (for state control)
   */
  onInputChange?: ({ formattedValue, value }: onInputChangeType) => void;
  /**
   * Is there a validation error present?
   */
  isError?: boolean,
  /**
   * Validation error message
   */
  errorMessage?: string,
  /**
   * Is input valid?
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

const InvestPageRender = ({
  totalAmount,
  inputAmount,
  onInputChange,
  isError = false,
  errorMessage = '',
  isValid = false,
  sendButtonOnClick,
  clearButtonOnClick,
}: InvestPageRenderProps) => {
  return (
    <Wrapper>
      <HeaderWithMargin
        href={'/'}
      />
      <TotalBalance
        amount={totalAmount}
      />
      <AmountInput
        label='How much do you want to invest?'
        inputID='amount-to-invest-input'
        amount={inputAmount}
        onInputChange={onInputChange}
        isError={isError}
        errorMessage={errorMessage}
      />
      <ButtonContainer>
        <Button
          label='Send'
          primary
          onClick={sendButtonOnClick}
          disabled={!isValid}
        />
        <Button
          label='Clear'
          onClick={clearButtonOnClick}
        />
      </ButtonContainer>
    </Wrapper>
  );
};

export default InvestPageRender;
