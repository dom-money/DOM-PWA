import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { ethers } from 'ethers';
import abi from '../utils/DepositManager-ABI.json';
import { DOM_CONTRACT_ADDRESS } from '@/constants';

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

const useContract: useContractType = () => {
  const { signer } = useAuthContext();

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
          DOM_CONTRACT_ADDRESS,
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
          DOM_CONTRACT_ADDRESS,
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
