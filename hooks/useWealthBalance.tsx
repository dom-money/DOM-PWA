import { useState, useEffect, useContext } from 'react';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { ethers, BigNumber } from 'ethers';
import EventListenersContext, {
  EventListenersContextType,
} from '../context/EventListenersContext';
import abi from '../utils/DepositManager-ABI.json';
import { CONTRACT_ADDRESS } from './useContract';

type useWealthBalanceType = () => [
  balanceAsNumber: number,
  balanceAsBigNumber: BigNumber,
  apy: number,
  rewards: string,
  isLoading: boolean,
  isError: boolean
];

const useWealthBalance: useWealthBalanceType = () => {
  const { signer } = useContext(AuthContext) as AuthContextType;

  const {
    depositToWealthEventData,
    withdrawFromWealthEventData,
  } = useContext(EventListenersContext) as EventListenersContextType;

  const [ balanceAsNumber, setBalanceAsNumber ] = useState(0);
  const [
    balanceAsBigNumber,
    setBalanceAsBigNumber,
  ] = useState(BigNumber.from(0));
  const [ apy, setApy ] = useState(0);
  const [ rewards, setRewards ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);
  const [ isError, setIsError ] = useState(false);

  useEffect(() => {
    const getBalance = async () => {
      if (!signer) {
        return;
      };
      try {
        const address = await signer.getAddress();

        const contractWithSigner = new ethers.Contract(
            CONTRACT_ADDRESS,
            abi,
            signer,
        );
        const tokensAmountAsBigNumber =
          await contractWithSigner.balanceOf(address);
        const tokensAmountAsString =
          ethers.utils.formatUnits(tokensAmountAsBigNumber, 0);
        if (tokensAmountAsString === '0') {
          clearState();
          return;
        }
        const tokenIdAsBigNumber = await contractWithSigner.tokenOfOwnerByIndex(
            address,
            BigNumber.from(0),
        );
        const wealthData =
          await contractWithSigner.positions(tokenIdAsBigNumber);
        setApy(parseFloat(ethers.utils.formatUnits(wealthData.apy, 0)));
        setRewards(ethers.utils.formatUnits(wealthData.rewards, 0));
        setBalanceAsBigNumber(wealthData.depositAmount);
        setBalanceAsNumber(
            parseFloat(ethers.utils.formatEther(wealthData.depositAmount)),
        );
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    getBalance();
  }, [ signer, depositToWealthEventData, withdrawFromWealthEventData ]);

  const clearState = () => {
    setBalanceAsNumber(0);
    setBalanceAsBigNumber(BigNumber.from(0));
    setApy(0);
    setRewards('');
    setIsError(false);
    setIsLoading(false);
  };

  return [
    balanceAsNumber,
    balanceAsBigNumber,
    apy,
    rewards,
    isLoading,
    isError,
  ];
};

export default useWealthBalance;
