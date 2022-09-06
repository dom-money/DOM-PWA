import { useContext } from 'react';
import { ethers, BigNumber } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import EventListenersContext, {
  EventListenersContextType,
} from '../context/EventListenersContext';
import { SignerType } from './useAuth';
import abiDOM from '../utils/DepositManager-ABI.json';

type WealthBalanceType = {
  balanceAsNumber: number,
  balanceAsBigNumber: BigNumber,
  apy: number,
  rewards: string,
};

type GetWalletBalanceType = (signer: SignerType) => Promise<WealthBalanceType>;

const getWealthBalance: GetWalletBalanceType = async (signer) => {
  return new Promise(async (resolve, reject) => {
    if (!signer) {
      throw new Error('Signer is not initialized');
    };
    try {
      const address = await signer.getAddress();

      const domContractWithSigner = new ethers.Contract(
          process.env.NEXT_PUBLIC_DOM_CONTRACT_ADDRESS as string,
          abiDOM,
          signer,
      );
      const tokensAmountAsBigNumber =
        await domContractWithSigner.balanceOf(address);
      const tokensAmountAsString =
        ethers.utils.formatUnits(tokensAmountAsBigNumber, 0);
      if (tokensAmountAsString === '0') {
        resolve({
          balanceAsNumber: 0,
          balanceAsBigNumber: BigNumber.from(0),
          apy: 0,
          rewards: '',
        });
        return;
      }
      const tokenIdAsBigNumber =
        await domContractWithSigner.tokenOfOwnerByIndex(
            address,
            BigNumber.from(0),
        );
      const wealthData =
        await domContractWithSigner.positions(tokenIdAsBigNumber);
      const apy = parseFloat(ethers.utils.formatUnits(wealthData.apy, 0));
      const rewards = ethers.utils.formatUnits(wealthData.rewards, 0);
      const balanceAsBigNumber = wealthData.depositAmount;
      const balanceAsNumber =
          parseFloat(ethers.utils.formatEther(wealthData.depositAmount));
      resolve({ balanceAsNumber, balanceAsBigNumber, apy, rewards });
    } catch (error) {
      reject(error);
    };
  });
};

const useWealthBalance = () => {
  const { signer } = useAuthContext();

  const {
    wealthEvent,
  } = useContext(EventListenersContext) as EventListenersContextType;

  return useQuery(
      [ 'wealthBalance', wealthEvent ],
      () => getWealthBalance(signer),
      {
        // The query will not execute until the `signer` is initialized
        enabled: !!signer,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
      },
  );
};

export default useWealthBalance;
