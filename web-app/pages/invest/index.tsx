import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';

import InvestPageRender from '../../components/InvestPageRender';
import PaymentStatus from '../../components/PaymentStatus';

import useSafeUsdtBalance from '@/hooks/useSafeUsdtBalance';
import useInputAmount from '../../hooks/useInputAmount';
import useContract from '../../hooks/useContract';

const InvestPage: NextPage = () => {
  const { data: walletBalance, isLoading, isError } = useSafeUsdtBalance();

  const {
    amount: inputAmount,
    amountUnformatted: inputAmountUnformatted,
    isValid: inputAmountIsValid,
    errorMessage: inputAmountErrorMessage,
    handleChange: inputAmountHandleChange,
    handleClear: inputAmountHandleClear,
  } = useInputAmount({
    balance: walletBalance?.balanceAsBigNumber,
    tokenDecimals: walletBalance?.tokenDecimals,
  });

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
        availableBalance={ walletBalance.balanceAsString }
        inputAmount={ inputAmount }
        onInputChange={ inputAmountHandleChange }
        errorMessage={
          inputAmountErrorMessage ?
          inputAmountErrorMessage :
          undefined
        }
        isInputValid={ inputAmountIsValid }
        isSubmitting={ isTransactionLoading }
        investButtonOnClick={ handleInvestToWealth }
        clearButtonOnClick={ inputAmountHandleClear }
      />
      {
        depositResult && !depositErrorMessage &&
        <PaymentStatus
          type='successful'
          isOpen={ isPaymentStatusOpen }
          onClose={ () => handlePaymentStatusDrawerClose() }
          onExited={ handlePaymentStatusDrawerOnExited }
          paymentTo='Your wealth wallet'
          amount={ inputAmount }
          message='Submitted successfully'
          sendAgainOnClick={ () => handlePaymentStatusDrawerClose() }
        />
      }
      {
        depositErrorMessage && !depositResult &&
        <PaymentStatus
          type='failed'
          isOpen={ isPaymentStatusOpen }
          onClose={ () => handlePaymentStatusDrawerClose() }
          onExited={ handlePaymentStatusDrawerOnExited }
          paymentTo='Your wealth wallet'
          amount={ inputAmount }
          errorMessage={ depositErrorMessage }
          tryAgainOnClick={ () => handlePaymentStatusDrawerClose(true) }
        />
      }
    </>
  );
};

export default InvestPage;
