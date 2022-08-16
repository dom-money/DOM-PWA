import { useState, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { ethers } from 'ethers';
import abi from '../utils/DepositManager-ABI.json';

type ErrorMessageType = string | null;
type DepositResultType = object | null;

type useContractType = () => [
  depositToWealth: (amountToDeposit: string) => void,
  depositResult: DepositResultType,
  isLoading: boolean,
  errorMessage: ErrorMessageType,
  handleStateClear: () => void,
];

export const CONTRACT_ADDRESS = '0xBC91bEdE221AbDAc4F39AF2827Cef8aD9313A7ba';

const useContract: useContractType = () => {
  const { signer } = useContext(AuthContext) as AuthContextType;

  const [ depositResult, setDepositResult ] = useState<DepositResultType>(null);
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
      setDepositResult(result);
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
    setDepositResult(null);
    setIsLoading(false);
    setErrorMessage(null);
  };

  return [
    depositToWealth,
    depositResult,
    isLoading,
    errorMessage,
    handleStateClear,
  ];
};

export default useContract;
