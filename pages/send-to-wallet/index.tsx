import React from 'react';
import type { NextPage } from 'next';

import SendToWalletPageRender from '../../components/SendToWalletPageRender';

import useWalletBalance from '../../hooks/useWalletBalance';
import useInputAmount from '../../hooks/useInputAmount';
import useInputAddress from '../../hooks/useInputAddress';
import AddressQRReader from '../../components/AddressQRReader';
import useQRAddressReader from '../../hooks/useQRAddressReader';

const SendToWalletPage: NextPage = () => {
  const [
    walletBalance,
    ,
    isWalletBalanceLoading,
    hasWalletBalanceError,
  ] = useWalletBalance();

  const [
    inputAmount,
    inputAmountUnformatted,
    inputAmountIsValid,
    inputAmountErrorMessage,
    inputAmountHandleChange,
    inputAmountHandleClear,
  ] = useInputAmount(walletBalance);

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

  if (isWalletBalanceLoading || hasWalletBalanceError) {
    return null;
  };


  return (
    <>
      <SendToWalletPageRender
        totalAmount={walletBalance}
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
