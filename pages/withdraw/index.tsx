import React, { useState } from 'react';
import type { NextPage } from 'next';

import WithdrawPageRender from '../../components/WithdrawPageRender';

import useUSDCBalance from '../../hooks/useUSDCBalance';

interface HandleInputChangeType {
  formattedValue: string,
  value: string
};

const WithdrawPage: NextPage = () => {
  const [ inputAmount, setInputAmount ] = useState('');
  const [ isError, setIsError ] = useState(false);
  const [ isValid, setIsValid ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  const [
    walletBalance,
    isWalletBalanceLoading,
    hasWalletBalanceError,
  ] = useUSDCBalance();

  const wealthBalance = 0;

  const handleInputChange = ({
    formattedValue,
    value,
  }: HandleInputChangeType) => {
    setInputAmount(formattedValue);
    if (value && value.length > 0) {
      validateInput(parseFloat(value));
    } else {
      validateInput(0);
    }
  };

  const validateInput = (numericAmountValue: number) => {
    // Checking if user has enough money on his wealth balance
    if (numericAmountValue > wealthBalance) {
      setIsError(true);
      setIsValid(false);
      setErrorMessage('Not enough money');
      return;
    }
    // Checking if field was filled
    if (!numericAmountValue) {
      setErrorMessage('');
      setIsError(false);
      setIsValid(false);
      return;
    }
    setErrorMessage('');
    setIsError(false);
    setIsValid(true);
  };

  const handleInputClear = () => {
    setInputAmount('');
  };

  if (isWalletBalanceLoading || hasWalletBalanceError) {
    return null;
  };


  return (
    <WithdrawPageRender
      totalAmount={walletBalance}
      inputAmount={inputAmount}
      onInputChange={handleInputChange}
      isError={isError}
      errorMessage={errorMessage}
      isValid={isValid}
      clearButtonOnClick={handleInputClear}
    />
  );
};

export default WithdrawPage;
