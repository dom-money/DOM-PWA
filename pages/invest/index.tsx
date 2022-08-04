import React from 'react';
import type { NextPage } from 'next';

import InvestPageRender from '../../components/InvestPageRender';

import useUSDCBalance from '../../hooks/useUSDCBalance';
import useInputAmount from '../../hooks/useInputAmount';

const InvestPage: NextPage = () => {
  const [
    walletBalance,
    isWalletBalanceLoading,
    hasWalletBalanceError,
  ] = useUSDCBalance();

  const [
    inputAmount,
    inputAmountIsValid,
    inputAmountErrorMessage,
    inputAmountHandleChange,
    inputAmountHandleClear,
  ] = useInputAmount(walletBalance);

  if (isWalletBalanceLoading || hasWalletBalanceError) {
    return null;
  };


  return (
    <InvestPageRender
      totalAmount={walletBalance}
      inputAmount={inputAmount}
      onInputChange={inputAmountHandleChange}
      errorMessage={inputAmountErrorMessage}
      isValid={inputAmountIsValid}
      clearButtonOnClick={inputAmountHandleClear}
    />
  );
};

export default InvestPage;
