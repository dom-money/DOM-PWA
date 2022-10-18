import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { BigNumber, ethers } from 'ethers';
import genericErc20Abi from '../utils/Erc20.json';

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
        process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS as string,
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
