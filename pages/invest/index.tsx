import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';

import InvestPageRender from '../../components/InvestPageRender';
import PaymentStatus from '../../components/PaymentStatus';

import useWalletBalance from '../../hooks/useWalletBalance';
import useInputAmount from '../../hooks/useInputAmount';
import useContract from '../../hooks/useContract';

const InvestPage: NextPage = () => {
  const { data: walletBalance, isLoading, isError } = useWalletBalance();

  const [
    inputAmount,
    inputAmountUnformatted,
    inputAmountIsValid,
    inputAmountErrorMessage,
    inputAmountHandleChange,
    inputAmountHandleClear,
  ] = useInputAmount(walletBalance?.balanceAsNumber ?? 0);

  const [
    depositToWealth,
    ,
    depositResult,
    isTransactionLoading,
    depositErrorMessage,
    handleUseContractStateClear,
  ] = useContract();

  const [ isPaymentStatusOpen, setIsPaymentStatusOpen ] = useState(false);
  const [ preserveState, setPreserveState ] = useState(false);

  useEffect(() => {
    if (depositResult || depositErrorMessage) {
      setIsPaymentStatusOpen(true);
    }
  }, [ depositResult, depositErrorMessage ]);

  const handleInvestToWealth = () => {
    depositToWealth(inputAmountUnformatted);
  };

  const handlePaymentStatusDrawerClose = (shouldPreserveState?: boolean) => {
    if (shouldPreserveState) {
      setPreserveState(true);
    }
    setIsPaymentStatusOpen(false);
  };

  const handlePaymentStatusDrawerOnExited = () => {
    if (preserveState) {
      handleUseContractStateClear();
      setPreserveState(false);
      return;
    }
    handleUseContractStateClear();
    inputAmountHandleClear();
  };

  if (isLoading || isError) {
    return <InvestPageRender isLoading />;
  };

  return (
    <>
      <InvestPageRender
        availableBalance={walletBalance.balanceAsNumber}
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
        onClose={() => handlePaymentStatusDrawerClose()}
        onExited={handlePaymentStatusDrawerOnExited}
        paymentTo='Your wealth wallet'
        amount={inputAmount}
        message='Submitted successfully'
        errorMessage={depositErrorMessage ? depositErrorMessage : undefined}
        sendAgainOnClick={() => handlePaymentStatusDrawerClose()}
        tryAgainOnClick={() => handlePaymentStatusDrawerClose(true)}
      />
    </>
  );
};

export default InvestPage;
