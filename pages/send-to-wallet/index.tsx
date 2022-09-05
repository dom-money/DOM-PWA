import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';

import SendToWalletPageRender from '../../components/SendToWalletPageRender';

import AddressQRReader from '../../components/AddressQRReader';
import PaymentStatus from '../../components/PaymentStatus';
import useWalletBalance from '../../hooks/useWalletBalance';
import useInputAmount from '../../hooks/useInputAmount';
import useInputAddress from '../../hooks/useInputAddress';
import useQRAddressReader from '../../hooks/useQRAddressReader';
import useSendToWallet from '../../hooks/useSendToWallet';


const SendToWalletPage: NextPage = () => {
  const walletBalance = useWalletBalance();

  const [
    inputAmount,
    inputAmountUnformatted,
    inputAmountIsValid,
    inputAmountErrorMessage,
    inputAmountHandleChange,
    inputAmountHandleClear,
  ] = useInputAmount(walletBalance.data?.balanceAsNumber ?? 0);

  const [
    inputAddress,
    setInputAddress,
    inputAddessIsValid,
    inputAddressHandleChange,
    inputAddressHandleFocus,
    inputAddressHandleClear,
  ] = useInputAddress();

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
    sendToWallet(inputAmountUnformatted, inputAddress);
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

  if (walletBalance.isLoading || walletBalance.isError) {
    return <SendToWalletPageRender isLoading />;
  };

  return (
    <>
      <SendToWalletPageRender
        availableBalance={walletBalance.data.balanceAsNumber}
        inputAmount={inputAmount}
        onInputAmountChange={inputAmountHandleChange}
        inputAddress={inputAddress}
        onInputAddressChange={inputAddressHandleChange}
        onInputAddressFocus={inputAddressHandleFocus}
        inputAmountErrorMessage={inputAmountErrorMessage}
        scanQROnClick={handleQRDialogOpen}
        areInputsValid={isSubmitReady}
        isSubmitting={isTransactionLoading}
        sendButtonOnClick={handleSendToWallet}
        clearButtonOnClick={handleClearInputs}
      />
      <AddressQRReader
        isOpen={isQRDialogOpen}
        onResult={handleQRReaderResult}
        onClose={handleQRDialogClose}
      />
      <PaymentStatus
        type={transactionResult ? 'successful' : 'failed'}
        isOpen={isPaymentStatusOpen}
        onClose={() => handlePaymentStatusDrawerClose()}
        onExited={handlePaymentStatusDrawerOnExited}
        paymentTo={inputAddress}
        amount={inputAmount}
        message='Submitted successfully'
        errorMessage={
          transactionErrorMessage ?
          transactionErrorMessage : undefined
        }
        sendAgainOnClick={() => handlePaymentStatusDrawerClose()}
        tryAgainOnClick={() => handlePaymentStatusDrawerClose(true)}
      />
    </>
  );
};

export default SendToWalletPage;
