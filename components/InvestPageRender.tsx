import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import AmountInput from './AmountInput';
import Button from './Button';
import Loading from './Loading';

import { onInputChangeType } from './AmountInput';

interface InvestPageRenderProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading?: false;
  /**
   * Available Balance Amount
   */
  availableBalance: string;
  /**
   * Is input valid?
   */
  isInputValid: boolean;
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
  errorMessage?: string;
  /**
   * Is Component in the process of submitting data?
   */
  isSubmitting?: boolean;
  /**
   * 'Send' Button Click Handler
   */
  investButtonOnClick?: () => void;
  /**
   * 'Clear' Button Click Handler
   */
  clearButtonOnClick?: () => void;
};

interface LoadingProps {
  /**
   * Should component display loading skeleton?
   */
  isLoading: true;
  availableBalance?: never;
  inputAmount?: never;
  onInputChange?: never;
  errorMessage?: string;
  isInputValid?: never;
  isSubmitting?: never;
  investButtonOnClick?: never;
  clearButtonOnClick?: never;
};

type Props = LoadingProps | InvestPageRenderProps;

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
  availableBalance,
  inputAmount,
  onInputChange,
  errorMessage = '',
  isInputValid = false,
  isSubmitting,
  investButtonOnClick,
  clearButtonOnClick,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <Wrapper>
        <HeaderWithMargin
          href={'/'}
        />
        <TotalBalance
          isLoading
          asAvailableBalance
        />
        <AmountInput
          label='How much do you want to invest?'
          inputID='amount-to-invest-input'
          disabled
        />
        <ButtonContainer>
          <Button
            label='Invest'
            primary
            disabled={true}
          />
          <Button
            label='Clear'
            disabled={true}
          />
        </ButtonContainer>
      </Wrapper>
    );
  };

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
      <Loading
        isOpen={isSubmitting}
        primary
        ariaLabel='Transaction is in progress'
      />
    </>
  );
};

export default InvestPageRender;
