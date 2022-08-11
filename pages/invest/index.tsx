import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';

import InvestPageRender from '../../components/InvestPageRender';
import PaymentStatus from '../../components/PaymentStatus';

import useUSDCBalance from '../../hooks/useUSDCBalance';
import useInputAmount from '../../hooks/useInputAmount';
import useContract from '../../hooks/useContract';

const InvestPage: NextPage = () => {
  const [
    walletBalance,
    ,
    isWalletBalanceLoading,
    hasWalletBalanceError,
  ] = useUSDCBalance();

  const [
    inputAmount,
    inputAmountUnformatted,
    inputAmountIsValid,
    inputAmountErrorMessage,
    inputAmountHandleChange,
    inputAmountHandleClear,
  ] = useInputAmount(walletBalance);

  const [
    depositToWealth,
    depositResult,
    isTransactionLoading,
    depositErrorMessage,
    handleUseDepositStateClear,
  ] = useContract();

  const [ isPaymentStatusOpen, setIsPaymentStatusOpen ] = useState(false);

  useEffect(() => {
    if (depositResult || depositErrorMessage) {
      setIsPaymentStatusOpen(true);
    }
  }, [ depositResult, depositErrorMessage ]);

  const handleInvestToWealth = () => {
    depositToWealth(inputAmountUnformatted);
  };

  const handlePaymentStatusDrawerClose = () => {
    setIsPaymentStatusOpen(false);
  };

  const handlePaymentStatusDrawerOnExited = () => {
    inputAmountHandleClear();
    handleUseDepositStateClear();
  };

  if (isWalletBalanceLoading || hasWalletBalanceError) {
    return null;
  };

  return (
    <>
      <InvestPageRender
        totalAmount={walletBalance}
        inputAmount={inputAmount}
        onInputChange={inputAmountHandleChange}
        errorMessage={inputAmountErrorMessage}
        isInputValid={inputAmountIsValid}
        isSubmitting={isTransactionLoading}
        investButtonOnClick={handleInvestToWealth}
        clearButtonOnClick={inputAmountHandleClear}
      />
      <PaymentStatus
        type={depositResult ? 'successful' : 'failed'}
        isOpen={isPaymentStatusOpen}
        onClose={handlePaymentStatusDrawerClose}
        onExited={handlePaymentStatusDrawerOnExited}
        paymentTo='Your wealth wallet'
        amount={inputAmount}
        message='Submitted successfully'
        errorMessage={depositErrorMessage ? depositErrorMessage : undefined}
      />
    </>
  );
};

export default InvestPage;
