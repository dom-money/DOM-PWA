import React, { useState } from 'react';
import type { NextPage } from 'next';

import SendToWalletPageRender from '../../components/SendToWalletPageRender';

import useUSDCBalance from '../../hooks/useUSDCBalance';

interface HandleInputChangeType {
  formattedValue: string,
  value: string
};

const SendToWalletPage: NextPage = () => {
  const [ inputAmount, setInputAmount ] = useState('');
  const [ inputAddress, setInputAddress ] = useState('');
  const [ hasInputAmountError, setHasInputAmountError ] = useState(false);
  const [ inputAmountErrorMessage, setInputAmountErrorMessage ] = useState('');

  // eslint-disable-next-line max-len
  const [ walletBalance, isWalletBalanceLoading, hasWalletBalanceError ] = useUSDCBalance();

  // eslint-disable-next-line max-len
  const addressFinalValidationPattern = /^0x[\da-f]{40}$/i;

  const isSubmitReady =
    !hasInputAmountError &&
    inputAmount.length > 0 &&
    addressFinalValidationPattern.test(inputAddress);

  const handleInputAmountChange = ({
    formattedValue,
    value,
  }: HandleInputChangeType) => {
    setInputAmount(formattedValue);
    if (value && value.length > 0) {
      checkAmountInputForErrors(parseFloat(value));
    } else {
      checkAmountInputForErrors(0);
    }
  };

  const checkAmountInputForErrors = (numericAmountValue: number) => {
    // Checking if user has enough money on his balance
    if (numericAmountValue > walletBalance) {
      setHasInputAmountError(true);
      setInputAmountErrorMessage('Not enough money');
      return;
    }
    setInputAmountErrorMessage('');
    setHasInputAmountError(false);
  };

  const handleInputAddressChange = (addressValue: string) => {
    setInputAddress(addressValue);
  };

  const handleInputAddressFocus = (addressValue: string) => {
    setInputAddress(addressValue);
  };

  const handleInputAmountClear = () => {
    setInputAmount('');
    setInputAddress('');
  };

  if (isWalletBalanceLoading || hasWalletBalanceError) {
    return null;
  };


  return (
    <SendToWalletPageRender
      totalAmount={walletBalance}
      inputAmount={inputAmount}
      onInputAmountChange={handleInputAmountChange}
      inputAddress={inputAddress}
      onInputAddressChange={handleInputAddressChange}
      onInputAddressFocus={handleInputAddressFocus}
      hasInputAmountError={hasInputAmountError}
      inputAmountErrorMessage={inputAmountErrorMessage}
      isValid={isSubmitReady}
      clearButtonOnClick={handleInputAmountClear}
    />
  );
};

export default SendToWalletPage;
