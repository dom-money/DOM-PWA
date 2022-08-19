import { useState, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { ethers } from 'ethers';
import abi from '../utils/DepositManager-ABI.json';

type ErrorMessageType = string | null;
type TransactionResultType = object | null;

type useContractType = () => [
  depositToWealth: (amountToDeposit: string) => void,
  withdrawFromWealth: (amountToWithdraw: string) => void,
  transactionResult: TransactionResultType,
  isLoading: boolean,
  errorMessage: ErrorMessageType,
  handleStateClear: () => void,
];

export const CONTRACT_ADDRESS = '0x9C4ebB64127c52b7B3d5C602C979438A7FbAb0D2';

const useContract: useContractType = () => {
  const { signer } = useContext(AuthContext) as AuthContextType;

  const [
    transactionResult,
    setTransactionResult,
  ] = useState<TransactionResultType>(null);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState<ErrorMessageType>(null);

  const depositToWealth = async (amountToDeposit: string) => {
    setIsLoading(true);

    if (!signer) {
      setErrorMessage('Signer not initialized');
      setIsLoading(false);
      return;
    };

    try {
      const recipient = await signer.getAddress();
      const amountToDepositAsBigNumber =
        ethers.utils.parseUnits(amountToDeposit, 'ether');
      const contractWithSigner = new ethers.Contract(
          CONTRACT_ADDRESS,
          abi,
          signer,
      );
      const result = await contractWithSigner.deposit({
        recipient: recipient,
        depositAmount: amountToDepositAsBigNumber,
      });
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

  const withdrawFromWealth = async (amountToWithdraw: string) => {
    setIsLoading(true);

    if (!signer) {
      setErrorMessage('Signer not initialized');
      setIsLoading(false);
      return;
    };

    try {
      const recipient = await signer.getAddress();
      const amountToWithdrawAsBigNumber =
        ethers.utils.parseUnits(amountToWithdraw, 'ether');
      const contractWithSigner = new ethers.Contract(
          CONTRACT_ADDRESS,
          abi,
          signer,
      );
      const result = await contractWithSigner.withdraw({
        recipient: recipient,
        withdrawalAmount: amountToWithdrawAsBigNumber,
      });
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
    depositToWealth,
    withdrawFromWealth,
    transactionResult,
    isLoading,
    errorMessage,
    handleStateClear,
  ];
};

export default useContract;
