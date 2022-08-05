import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import AmountInput from './AmountInput';
import Button from './Button';

interface WithdrawPageRenderProps {
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
  withdrawButtonOnClick?: () => void,
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

const WithdrawPageRender = ({
  totalAmount,
  inputAmount,
  onInputChange,
  isError = false,
  errorMessage = '',
  isValid = false,
  withdrawButtonOnClick,
  clearButtonOnClick,
}: WithdrawPageRenderProps) => {
  return (
    <Wrapper>
      <HeaderWithMargin
        href={'/'}
      />
      <TotalBalance
        amount={totalAmount}
      />
      <AmountInput
        label='How much do you want to withdraw?'
        inputID='amount-to-withdraw-input'
        amount={inputAmount}
        onInputChange={onInputChange}
        isError={isError}
        errorMessage={errorMessage}
      />
      <ButtonContainer>
        <Button
          label='Withdraw'
          primary
          onClick={withdrawButtonOnClick}
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

export default WithdrawPageRender;
