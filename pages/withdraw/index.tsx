import React from 'react';
import type { NextPage } from 'next';

import WithdrawPageRender from '../../components/WithdrawPageRender';

import useUSDCBalance from '../../hooks/useUSDCBalance';
import useInputAmount from '../../hooks/useInputAmount';

const WithdrawPage: NextPage = () => {
  const [
    walletBalance,
    isWalletBalanceLoading,
    hasWalletBalanceError,
  ] = useUSDCBalance();

  const wealthBalance = 0;

  const [
    inputAmount,
    inputAmountIsValid,
    inputAmountErrorMessage,
    inputAmountHandleChange,
    inputAmountHandleClear,
  ] = useInputAmount(wealthBalance);

  if (isWalletBalanceLoading || hasWalletBalanceError) {
    return null;
  };


  return (
    <WithdrawPageRender
      totalAmount={walletBalance}
      inputAmount={inputAmount}
      onInputChange={inputAmountHandleChange}
      errorMessage={inputAmountErrorMessage}
      isInputValid={inputAmountIsValid}
      clearButtonOnClick={inputAmountHandleClear}
    />
  );
};

export default WithdrawPage;
