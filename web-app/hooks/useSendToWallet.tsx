import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { BigNumber, ethers } from 'ethers';
import genericErc20Abi from '../utils/Erc20.json';
import { PAYMENT_TOKEN_CONTRACT_ADDRESS } from '@/constants';

type ErrorMessageType = null | string;

type useSendToWalletType = () => [
  sendToWallet: (amountToSend: BigNumber, recipient: string) => void,
  transactionResult: object | null,
  isLoading: boolean,
  errorMessage: ErrorMessageType,
  handleStateClear: () => void,
];

const useSendToWallet: useSendToWalletType = () => {
  const { signer } = useAuthContext();

  const [ transactionResult, setTransactionResult ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState<ErrorMessageType>(null);

  const sendToWallet = async (amountToSend: BigNumber, recipient: string) => {
    setIsLoading(true);

    if (!signer) {
      setErrorMessage('Signer not initialized');
      setIsLoading(false);
      return;
    };

    try {
      const usdcContractWithSigner = new ethers.Contract(
          PAYMENT_TOKEN_CONTRACT_ADDRESS,
          genericErc20Abi,
          signer,
      );
      const result = await usdcContractWithSigner.transfer(
          recipient,
          amountToSend,
      );
      setTransactionResult(result);
    } catch (error) {
      if (!(error instanceof Error)) {
        console.error('Unexpected error', error);
        setErrorMessage('Unexpected error');
        return;
      };
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStateClear = () => {
    setTransactionResult(null);
    setIsLoading(false);
    setErrorMessage(null);
  };

  return [
    sendToWallet,
    transactionResult,
    isLoading,
    errorMessage,
    handleStateClear,
  ];
};

export default useSendToWallet;
