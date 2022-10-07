import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import AuthContext, { AuthContextType } from '../context/AuthContext';
import { SignerType } from './useAuth';

type WalletAddressType = {
  walletAddress: string,
};

type GetWalletAddressType = (signer: SignerType) => Promise<WalletAddressType>;

const getWalletAddress: GetWalletAddressType = async (signer) => {
  return new Promise(async (resolve, reject) => {
    if (!signer ) {
      throw new Error('Signer is not initialized');
    };
    try {
      const walletAddress = await signer.getAddress();
      resolve({ walletAddress });
    } catch (error) {
      reject(error);
    };
  });
};

const useWalletAddress = () => {
  const { signer } = useContext(AuthContext) as AuthContextType;

  return useQuery(
      [ 'walletAddress' ],
      () => getWalletAddress(signer),
      {
        // The query will not execute until the `signer` is initialized
        enabled: !!signer,
        // New data on key change will be swapped without Loading state
        keepPreviousData: true,
      },
  );
};

export default useWalletAddress;
