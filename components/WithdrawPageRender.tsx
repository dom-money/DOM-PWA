import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import AmountInput from './AmountInput';
import Button from './Button';
import Loading from './Loading';

interface WithdrawPageRenderProps {
  /**
   * Available Balance Amount
   */
  availableBalance: number;
  /**
   * Input amount as a string (for state control)
   */
  inputAmount?: string;
  /**
   * Input on change handler function (for state control)
   */
  onInputChange?: ({ formattedValue, value }: onInputChangeType) => void;
  /**
   * Validation error message
   */
  errorMessage?: string,
  /**
   * Is input valid?
   */
  isInputValid: boolean,
  /**
   * Is Component in the process of submitting data?
   */
  isSubmitting?: boolean
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
  availableBalance,
  inputAmount,
  onInputChange,
  errorMessage = '',
  isInputValid = false,
  isSubmitting,
  withdrawButtonOnClick,
  clearButtonOnClick,
}: WithdrawPageRenderProps) => {
  return (
    <>
      <Wrapper>
        <HeaderWithMargin
          href={'/'}
        />
        <TotalBalance
          amount={availableBalance}
          asAvailableBalance
        />
        <AmountInput
          label='How much do you want to withdraw?'
          inputID='amount-to-withdraw-input'
          amount={inputAmount}
          onInputChange={onInputChange}
          errorMessage={errorMessage}
        />
        <ButtonContainer>
          <Button
            label='Withdraw'
            primary
            onClick={withdrawButtonOnClick}
            disabled={!isInputValid}
          />
          <Button
            label='Clear'
            onClick={clearButtonOnClick}
          />
        </ButtonContainer>
      </Wrapper>
      {isSubmitting && <Loading primary />}
    </>
  );
};

export default WithdrawPageRender;
