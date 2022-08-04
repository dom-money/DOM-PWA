import React, { useState } from 'react';
import type { NextPage } from 'next';

import InvestPageRender from '../../components/InvestPageRender';

import useUSDCBalance from '../../hooks/useUSDCBalance';

interface HandleInputChangeType {
  formattedValue: string,
  value: string
};

const InvestPage: NextPage = () => {
  const [ inputAmount, setInputAmount ] = useState('');
  const [ isInputValid, setIsInputValid ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');

  // eslint-disable-next-line max-len
  const [ walletBalance, isWalletBalanceLoading, hasWalletBalanceError ] = useUSDCBalance();

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
    // Checking if user has enough money on his balance
    if (numericAmountValue > walletBalance) {
      setIsInputValid(false);
      setErrorMessage('Not enough money');
      return;
    }
    // Checking if field was filled
    if (!numericAmountValue) {
      setErrorMessage('');
      setIsInputValid(false);
      return;
    }
    setErrorMessage('');
    setIsInputValid(true);
  };

  const handleInputClear = () => {
    setInputAmount('');
  };

  if (isWalletBalanceLoading || hasWalletBalanceError) {
    return null;
  };


  return (
    <InvestPageRender
      totalAmount={walletBalance}
      inputAmount={inputAmount}
      onInputChange={handleInputChange}
      errorMessage={errorMessage}
      isInputValid={isInputValid}
      clearButtonOnClick={handleInputClear}
    />
  );
};

export default InvestPage;
