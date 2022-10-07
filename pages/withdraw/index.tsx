import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';

import WithdrawPageRender from '../../components/WithdrawPageRender';
import PaymentStatus from '../../components/PaymentStatus';

import useWealthBalance from '../../hooks/useWealthBalance';
import useInputAmount from '../../hooks/useInputAmount';
import useContract from '../../hooks/useContract';

const WithdrawPage: NextPage = () => {
  const { data: wealthBalance, isLoading, isError } = useWealthBalance();

  const [
    inputAmount,
    inputAmountUnformatted,
    inputAmountIsValid,
    inputAmountErrorMessage,
    inputAmountHandleChange,
    inputAmountHandleClear,
  ] = useInputAmount(wealthBalance?.balanceAsNumber ?? 0);

  const [
    ,
    withdrawFromWealth,
    withdrawalResult,
    isTransactionLoading,
    withdrawalErrorMessage,
    handleUseContractStateClear,
  ] = useContract();

  const [ isPaymentStatusOpen, setIsPaymentStatusOpen ] = useState(false);
  const [ preserveState, setPreserveState ] = useState(false);

  useEffect(() => {
    if (withdrawalResult || withdrawalErrorMessage) {
      setIsPaymentStatusOpen(true);
    }
  }, [ withdrawalResult, withdrawalErrorMessage ]);

  const handleWithdrawFromWealth = () => {
    withdrawFromWealth(inputAmountUnformatted);
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
    return <WithdrawPageRender isLoading />;
  };

  return (
    <>
      <WithdrawPageRender
        availableBalance={wealthBalance.balanceAsNumber}
        inputAmount={inputAmount}
        onInputChange={inputAmountHandleChange}
        errorMessage={inputAmountErrorMessage}
        isInputValid={inputAmountIsValid}
        isSubmitting={isTransactionLoading}
        withdrawButtonOnClick={handleWithdrawFromWealth}
        clearButtonOnClick={inputAmountHandleClear}
      />
      <PaymentStatus
        type={withdrawalResult ? 'successful' : 'failed'}
        isOpen={isPaymentStatusOpen}
        onClose={() => handlePaymentStatusDrawerClose()}
        onExited={handlePaymentStatusDrawerOnExited}
        paymentTo='Your wallet balance'
        amount={inputAmount}
        message='Submitted successfully'
        errorMessage={
          withdrawalErrorMessage ? withdrawalErrorMessage : undefined
        }
        sendAgainOnClick={() => handlePaymentStatusDrawerClose()}
        tryAgainOnClick={() => handlePaymentStatusDrawerClose(true)}
      />
    </>
  );
};

export default WithdrawPage;
