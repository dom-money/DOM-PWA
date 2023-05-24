import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import type { OpenloginUserInfo } from '@toruslabs/openlogin';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { WalletConnectV2Adapter } from '@web3auth/wallet-connect-v2-adapter';
import { web3AuthClientId, web3AuthNetwork, DEFAULT_USER } from '@/constants';
import { useGlobalLoadingContext } from '@/store/GlobalLoadingStore';
import Safe, { EthersAdapter } from '@safe-global/protocol-kit';
import { useRelayAdapter } from '@/store/GelatoRelayStore';
import SafeApiKit from '@safe-global/api-kit';
import deploySafe from '@/services/safe/deploySafe';

export type Web3AuthProvider = NonNullable<Web3Auth['provider']>;
export type Provider = ethers.providers.Web3Provider;
export type Signer = ethers.providers.JsonRpcSigner;
export type User = typeof DEFAULT_USER & Partial<OpenloginUserInfo>;

const useAuth = () => {
  const [ web3Auth, setWeb3Auth ] = useState<Web3Auth | null>(null);
  const [ provider, setProvider ] = useState<Provider | null>(null);
  const [ signer, setSigner ] = useState<Signer | null>(null);
  const [ user, setUser ] = useState<User | null>(null);

  const { setIsAuthLoaded } = useGlobalLoadingContext();
  const router = useRouter();
  const relayAdapter = useRelayAdapter();

  const effectCalled = useRef(false);

  const initWeb3Auth = useCallback(async () => {
    const web3Auth = new Web3Auth({
      clientId: web3AuthClientId,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
        rpcTarget: process.env.NEXT_PUBLIC_RPC_TARGET,
      },
      uiConfig: {
        appName: 'DOM',
        appLogo: `${location.origin}/images/logo/logo-dark.svg`,
        theme: 'dark',
      },
    });

    const openloginAdapter = new OpenloginAdapter({
      adapterSettings: {
        network: web3AuthNetwork,
        uxMode: 'popup',
        whiteLabel: {
          name: 'DOM Wallet',
          logoLight: `${location.origin}/images/logo/logo-light-with-text.svg`,
          logoDark: `${location.origin}/images/logo/logo-dark-with-text.svg`,
          defaultLanguage: 'en',
          dark: true,
        },
      },
    });
    const metamaskAdapter = new MetamaskAdapter({ clientId: web3AuthClientId });

    web3Auth.configureAdapter(openloginAdapter);
    web3Auth.configureAdapter(metamaskAdapter);
    web3Auth.configureAdapter(new WalletConnectV2Adapter());

    await web3Auth.initModal();
    setWeb3Auth(web3Auth);

    return web3Auth;
  }, []);

  const initProviderAndSinger = useCallback(
      (web3AuthProvider: Web3AuthProvider) => {
        const provider = new ethers.providers.Web3Provider(web3AuthProvider);

        // Implementing reload on network change
        provider.on('network', (newNetwork, oldNetwork) => {
          // When a Provider makes its initial connection, it emits a "network"
          // event with a null oldNetwork along with the newNetwork. So, if the
          // oldNetwork exists, it represents a changing network
          if (oldNetwork) router.reload();
        });
        setProvider(provider);
        const signer = provider.getSigner();
        setSigner(signer);
        return signer;
      },
      [ router ],
  );

  const initSafe = useCallback(async (signer: Signer) => {
    const walletAddress = await signer.getAddress();

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });

    const safeService = new SafeApiKit({
      txServiceUrl: 'https://safe-transaction-mumbai.dom.money',
      ethAdapter,
    });

    const { safes } = await safeService.getSafesByOwner(walletAddress);

    let safeSdk: Safe;

    if (safes.length === 0) {
      // Deploying a safe
      safeSdk = await deploySafe(ethAdapter, signer, relayAdapter);
    } else {
      // Loading existing safe
      console.log(`Available Safes:\n\t${safes.join('\n\t')}`);

      safeSdk = await Safe.create({
        ethAdapter,
        safeAddress: safes[ 0 ],
      });
    };

    console.log('Loaded Safe:', await safeSdk.getAddress());
  }, [ relayAdapter ]);

  const initUser = useCallback(async (
      web3Auth: Web3Auth,
      web3AuthProvider: Web3AuthProvider,
  ) => {
    const signer = initProviderAndSinger(web3AuthProvider);

    await initSafe(signer);

    setUser({
      ...DEFAULT_USER,
      ...await web3Auth.getUserInfo(),
    });
  }, [ initProviderAndSinger, initSafe ]);

  useEffect(() => {
    if (effectCalled.current) return;

    const initAuth = async () => {
      try {
        const web3Auth = await initWeb3Auth();

        // If user has active session
        if (web3Auth.provider) await initUser(web3Auth, web3Auth.provider);
      } catch (error) {
        console.error(error);
      } finally {
        setIsAuthLoaded(true);
      };
    };

    initAuth();
    effectCalled.current = true;
  }, [ initUser, initWeb3Auth, setIsAuthLoaded ]);

  const login = useCallback(async () => {
    if (!web3Auth) {
      console.log('web3Auth not initialized yet');
      return;
    };
    const web3AuthProvider = await web3Auth.connect();
    if (!web3AuthProvider) return;

    await initUser(web3Auth, web3AuthProvider);
  }, [ web3Auth, initUser ]);

  const logout = useCallback(async () => {
    if (!web3Auth) {
      console.log('web3Auth not initialized yet');
      return;
    }
    await web3Auth.logout();
    setUser(null);
    setProvider(null);
    setSigner(null);
  }, [ web3Auth ]);

  return {
    user,
    provider,
    signer,
    login,
    logout,
  };
};

export default useAuth;
