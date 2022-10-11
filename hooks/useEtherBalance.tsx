import { ethers, BigNumber } from 'ethers';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import { EthersProviderType, SignerType } from './useAuth';

type EtherBalanceType = {
  balanceAsString: string;
  balanceAsBigNumber: BigNumber;
};

type GetEtherBalanceType = (
  ethersProvider: EthersProviderType,
  signer: SignerType
) => Promise<EtherBalanceType>;

const getEtherBalance: GetEtherBalanceType = async (
    ethersProvider,
    signer,
) => {
  return new Promise(async (resolve, reject) => {
    if (!signer || !ethersProvider ) {
      throw new Error('Signer and EthersProvider are not initialized');
    };
    try {
      const receivedBalance = await signer.getBalance();
      const balanceAsBigNumber = receivedBalance;
      const balanceAsString = ethers.utils.formatEther(receivedBalance);
      resolve({ balanceAsString, balanceAsBigNumber });
    } catch (error) {
      reject(error);
    };
  });
};

const useEtherBalance = () => {
  const { ethersProvider, signer } = useAuthContext();

  return useQuery(
      [ 'walletBalance' ],
      () => getEtherBalance(ethersProvider, signer),
      {
        // The query will not execute until the `signer` and ...
        // .. `ethersProvider` are initialized
        enabled: !!signer && !!ethersProvider,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
      },
  );
};

export default useEtherBalance;
