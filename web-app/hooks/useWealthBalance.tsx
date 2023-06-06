import { ethers, BigNumber } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '@/context/AuthContext';
import { useEventListenersContext } from '@/context/EventListenersContext';
import { Signer } from './useAuth';
import abiDOM from '@/utils/DepositManager-ABI.json';

type WealthBalanceType = {
  balanceAsString: string;
  balanceAsBigNumber: BigNumber;
  tokenDecimals: number;
  apy: number;
  rewards: string;
};

type GetWalletBalanceType = (signer: Signer | null) =>
  Promise<WealthBalanceType>;

const USDC_TOKEN_DECIMALS = 6;

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
      if (tokensAmountAsBigNumber.isZero()) {
        resolve({
          balanceAsString: '0',
          balanceAsBigNumber: BigNumber.from(0),
          tokenDecimals: USDC_TOKEN_DECIMALS,
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
      const balanceAsBigNumberEthers: BigNumber = wealthData.depositAmount;
      const stringEthers = ethers.utils.formatEther(balanceAsBigNumberEthers);
      // Converting to BigNumber as USDC with 6 decimals
      const balanceAsBigNumber = ethers.utils.parseUnits(
          stringEthers,
          USDC_TOKEN_DECIMALS,
      );
      const balanceAsString = ethers.utils.formatUnits(
          balanceAsBigNumber,
          USDC_TOKEN_DECIMALS,
      );
      resolve({
        balanceAsString,
        balanceAsBigNumber,
        tokenDecimals: USDC_TOKEN_DECIMALS,
        apy,
        rewards,
      });
    } catch (error) {
      reject(error);
    };
  });
};

const useWealthBalance = () => {
  const { signer } = useAuthContext();
  const { wealthEvent } = useEventListenersContext();

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
