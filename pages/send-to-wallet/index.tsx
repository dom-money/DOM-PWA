import React from 'react';
import type { NextPage } from 'next';

import SendToWalletPageRender from '../../components/SendToWalletPageRender';

import useUSDCBalance from '../../hooks/useUSDCBalance';
import useInputAmount from '../../hooks/useInputAmount';
import useInputAddress from '../../hooks/useInputAddress';
import AddressQRReader from '../../components/AddressQRReader';
import useQRAddressReader from '../../hooks/useQRAddressReader';

const SendToWalletPage: NextPage = () => {
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
        clearButtonOnClick={handleClearInputs}
      />
      <AddressQRReader
        isOpen={isQRDialogOpen}
        onResult={handleQRReaderResult}
        onClose={handleQRDialogClose}
      />
    </>
  );
};

export default SendToWalletPage;
