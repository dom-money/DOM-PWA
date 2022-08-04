/* eslint-disable require-jsdoc */
import { useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/web3auth';
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  ADAPTER_EVENTS,
} from '@web3auth/base';
import { ethers } from 'ethers';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { useTheme } from 'styled-components';
import { ThemeType } from '../styles/theme';

const clientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID as string;

const useAuth = () => {
  const [ web3auth, setWeb3auth ] =
    useState<Web3Auth | null>(null);
  const [ provider, setProvider ] =
    useState<SafeEventEmitterProvider | null>(null);
  const [ ethersProvider, setEthersProvider ] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [ signer, setSigner ] =
    useState<ethers.providers.JsonRpcSigner | null>(null);

  // Shows if web3Auth instance & provider are ready and autologin process ended
  const [ isAuthLoaded, setIsAuthLoaded ] = useState(false);

  const theme = useTheme() as ThemeType;

  const subscribeAuthEvents = (web3auth: Web3Auth) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, () => {
      setProvider(web3auth.provider);
      // Initializing Ethers.js Provider & Signer
      setEthersProviderAndSinger(web3auth);
    });
    web3auth.on(ADAPTER_EVENTS.ERRORED, () => {
      setIsAuthLoaded(true);
    });
  };

  const setEthersProviderAndSinger = (web3auth: Web3Auth) => {
    const ethersProvider =
        new ethers.providers.Web3Provider(web3auth.provider as any);
    setEthersProvider(ethersProvider);
    const signer = ethersProvider.getSigner();
    setSigner(signer);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: process.env.NEXT_PUBLIC_CHAIN_ID,
            rpcTarget: process.env.NEXT_PUBLIC_RPC_TARGET,
          },
          uiConfig: {
            theme: 'dark',
          },
        });

        subscribeAuthEvents(web3auth);

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            clientId,
            // eslint-disable-next-line max-len
            network: process.env.NEXT_PUBLIC_NETWORK_TYPE as 'testnet' | 'mainnet',
            uxMode: 'popup',
            whiteLabel: {
              name: 'DOM Wallet',
              logoLight: 'https://web3auth.io/images/w3a-L-Favicon-1.svg',
              logoDark: 'https://web3auth.io/images/w3a-D-Favicon-1.svg',
              defaultLanguage: 'en',
              dark: true,
              theme: { primary: theme.colors.primary },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        const metamaskAdapter = new MetamaskAdapter();
        web3auth.configureAdapter(metamaskAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
      } catch (error) {
        console.error(error);
      } finally {
        setIsAuthLoaded(true);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    };
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    // Initializing Ethers.js Provider & Signer
    setEthersProviderAndSinger(web3auth);
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setEthersProvider(null);
    setSigner(null);
  };

  return {
    web3auth,
    provider,
    ethersProvider,
    signer,
    isAuthLoaded,
    login,
    logout,
  };
};

export default useAuth;
