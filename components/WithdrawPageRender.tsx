import React from 'react';
import styled from 'styled-components';

import HeaderGoBack from './HeaderGoBack';
import TotalBalance from './TotalBalance';
import AmountInput from './AmountInput';
import Button from './Button';
import Loading from './Loading';

interface WithdrawPageRenderProps {
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
  withdrawButtonOnClick?: () => void;
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
  withdrawButtonOnClick?: never;
  clearButtonOnClick?: never;
};

type Props = LoadingProps | WithdrawPageRenderProps;

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
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <Wrapper>
        <HeaderWithMargin
          href={ '/' }
        />
        <TotalBalance
          isLoading
          asAvailableBalance
        />
        <AmountInput
          label='How much do you want to withdraw?'
          inputID='amount-to-withdraw-input'
          disabled
        />
        <ButtonContainer>
          <Button
            label='Withdraw'
            primary
            disabled={ true }
          />
          <Button
            label='Clear'
            disabled={ true }
          />
        </ButtonContainer>
      </Wrapper>
    );
  };

  return (
    <>
      <Wrapper>
        <HeaderWithMargin
          href={ '/' }
        />
        <TotalBalance
          amount={ availableBalance }
          asAvailableBalance
        />
        <AmountInput
          label='How much do you want to withdraw?'
          inputID='amount-to-withdraw-input'
          amount={ inputAmount }
          onInputChange={ onInputChange }
          errorMessage={ errorMessage }
        />
        <ButtonContainer>
          <Button
            label='Withdraw'
            primary
            onClick={ withdrawButtonOnClick }
            disabled={ !isInputValid }
          />
          <Button
            label='Clear'
            onClick={ clearButtonOnClick }
          />
        </ButtonContainer>
      </Wrapper>
      <Loading
        isOpen={ isSubmitting }
        primary
        ariaLabel='Transaction is in progress'
      />
    </>
  );
};

export default WithdrawPageRender;
