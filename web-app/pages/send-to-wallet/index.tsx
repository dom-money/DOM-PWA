import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import SendToWalletPageRender from '../../components/SendToWalletPageRender';

import AddressQRReader from '../../components/AddressQRReader';
import PaymentStatus from '../../components/PaymentStatus';
import useSafeUsdtBalance from '../../hooks/useSafeUsdtBalance';
import useInputAmount from '../../hooks/useInputAmount';
import useInputAddress from '../../hooks/useInputAddress';
import useQRAddressReader from '../../hooks/useQRAddressReader';
import useSendToWallet from '../../hooks/useSendToWallet';

const SendToWalletPage: NextPage = () => {
  const { data: walletBalance, isLoading, isError } = useSafeUsdtBalance();

  const {
    amount: inputAmount,
    amountAsBigNumber: inputAmountAsBigNumber,
    isValid: inputAmountIsValid,
    errorMessage: inputAmountErrorMessage,
    handleChange: inputAmountHandleChange,
    handleClear: inputAmountHandleClear,
  } = useInputAmount({
    balance: walletBalance?.balanceAsBigNumber,
    tokenDecimals: walletBalance?.tokenDecimals,
  });

  const {
    address: inputAddress,
    setAddress: setInputAddress,
    isValid: inputAddessIsValid,
    handleChange: inputAddressHandleChange,
    handleClear: inputAddressHandleClear,
  } = useInputAddress();

  const [
    isQRDialogOpen,
    handleQRDialogOpen,
    handleQRReaderResult,
    handleQRDialogClose,
  ] = useQRAddressReader({ setInputAddress: setInputAddress });

  const [
    sendToWallet,
    transactionResult,
    isTransactionLoading,
    transactionErrorMessage,
    handleUseSendToWalletStateClear,
  ] = useSendToWallet();

  const [ isPaymentStatusOpen, setIsPaymentStatusOpen ] = useState(false);
  const [ preserveState, setPreserveState ] = useState(false);

  useEffect(() => {
    if (transactionResult || transactionErrorMessage) {
      setIsPaymentStatusOpen(true);
    }
  }, [ transactionResult, transactionErrorMessage ]);

  const handleSendToWallet = () => {
    sendToWallet(inputAmountAsBigNumber, inputAddress);
  };

  const handlePaymentStatusDrawerClose = (shouldPreserveState?: boolean) => {
    if (shouldPreserveState) {
      setPreserveState(true);
    }
    setIsPaymentStatusOpen(false);
  };

  const handlePaymentStatusDrawerOnExited = () => {
    if (preserveState) {
      handleUseSendToWalletStateClear();
      setPreserveState(false);
      return;
    }
    handleUseSendToWalletStateClear();
    handleClearInputs();
  };

  const isSubmitReady = inputAmountIsValid && inputAddessIsValid;

  const handleClearInputs = () => {
    inputAmountHandleClear();
    inputAddressHandleClear();
  };

  if (isLoading || isError) {
    return <SendToWalletPageRender isLoading />;
  };

  return (
    <>
      <SendToWalletPageRender
        availableBalance={ walletBalance.balanceAsString }
        inputAmount={ inputAmount }
        onInputAmountChange={ inputAmountHandleChange }
        inputAddress={ inputAddress }
        onInputAddressChange={ inputAddressHandleChange }
        inputAmountErrorMessage={
          inputAmountErrorMessage ?
          inputAmountErrorMessage :
          undefined
        }
        scanQROnClick={ handleQRDialogOpen }
        areInputsValid={ isSubmitReady }
        isSubmitting={ isTransactionLoading }
        sendButtonOnClick={ handleSendToWallet }
        clearButtonOnClick={ handleClearInputs }
      />
      <AddressQRReader
        isOpen={ isQRDialogOpen }
        onResult={ handleQRReaderResult }
        onClose={ handleQRDialogClose }
      />
      {
        transactionResult && !transactionErrorMessage &&
        <PaymentStatus
          type='successful'
          isOpen={ isPaymentStatusOpen }
          onClose={ () => handlePaymentStatusDrawerClose() }
          onExited={ handlePaymentStatusDrawerOnExited }
          paymentTo={ inputAddress }
          amount={ inputAmount }
          message='Submitted successfully'
          sendAgainOnClick={ () => handlePaymentStatusDrawerClose() }
        />
      }
      {
        transactionErrorMessage && !transactionResult &&
        <PaymentStatus
          type='failed'
          isOpen={ isPaymentStatusOpen }
          onClose={ () => handlePaymentStatusDrawerClose() }
          onExited={ handlePaymentStatusDrawerOnExited }
          paymentTo={ inputAddress }
          amount={ inputAmount }
          errorMessage={ transactionErrorMessage }
          tryAgainOnClick={ () => handlePaymentStatusDrawerClose(true) }
        />
      }
    </>
  );
};

export default SendToWalletPage;
