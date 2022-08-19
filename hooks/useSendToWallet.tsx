import { useState, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { ethers } from 'ethers';
import genericErc20Abi from '../utils/Erc20.json';
import { TOKEN_USDC_CONTRACT_ADDRESS } from './useWalletBalance';

type ErrorMessageType = null | string;

type useSendToWalletType = () => [
  sendToWallet: (amount: string, recipient: string) => void,
  transactionResult: object | null,
  isLoading: boolean,
  errorMessage: ErrorMessageType,
  handleStateClear: () => void,
];

const useSendToWallet: useSendToWalletType = () => {
  const { signer } = useContext(AuthContext) as AuthContextType;

  const [ transactionResult, setTransactionResult ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState<ErrorMessageType>(null);

  const sendToWallet = async (amountToSend: string, recipient: string) => {
    setIsLoading(true);

    if (!signer) {
      setErrorMessage('Signer not initialized');
      setIsLoading(false);
      return;
    };

    try {
      const amountToSendAsBigNumber =
        ethers.utils.parseUnits(amountToSend, 6);
      const contractWithSigner = new ethers.Contract(
          TOKEN_USDC_CONTRACT_ADDRESS,
          genericErc20Abi,
          signer,
      );
      const result = await contractWithSigner.transfer(
          recipient,
          amountToSendAsBigNumber,
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
