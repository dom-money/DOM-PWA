import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import AmountInput from './AmountInput';
import Button from './Button';
import Loading from './Loading';

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
  investButtonOnClick?: () => void,
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
  errorMessage = '',
  isInputValid = false,
  isSubmitting,
  investButtonOnClick,
  clearButtonOnClick,
}: InvestPageRenderProps) => {
  return (
    <>
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
          errorMessage={errorMessage}
        />
        <ButtonContainer>
          <Button
            label='Invest'
            primary
            onClick={investButtonOnClick}
            disabled={!isInputValid || isSubmitting}
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

export default InvestPageRender;
