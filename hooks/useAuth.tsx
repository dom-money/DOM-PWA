/* eslint-disable require-jsdoc */
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { Web3Auth } from '@web3auth/modal';
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  ADAPTER_EVENTS,
} from '@web3auth/base';
import type { OpenloginUserInfo } from '@toruslabs/openlogin';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { MetamaskAdapter } from '@web3auth/metamask-adapter';
import { ethers } from 'ethers';
import { useLoadingContext } from '../context/LoadingContext';
import { useTheme } from 'styled-components';
import { ThemeType } from '../styles/theme';

const clientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID as string;
const web3authNetworkType =
  process.env.NEXT_PUBLIC_NETWORK_TYPE as 'testnet' | 'mainnet';

export type Web3authType = Web3Auth | null;
export type Web3AuthProviderType = SafeEventEmitterProvider | null;
export type EthersProviderType = ethers.providers.Web3Provider | null;
export type SignerType = ethers.providers.JsonRpcSigner | null;
export type UserType = typeof DEFAULT_USER & Partial<OpenloginUserInfo>;

export const DEFAULT_USER = {
  email: '',
  name: 'Anonymous User',
  profileImage: '',
};

const useAuth = () => {
  const [ web3auth, setWeb3auth ] = useState<Web3authType>(null);
  const [ ethersProvider, setEthersProvider ] =
    useState<EthersProviderType>(null);
  const [ signer, setSigner ] = useState<SignerType>(null);
  const [ user, setUser ] = useState<UserType>(DEFAULT_USER);

  const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false);
  const [ isWeb3AuthLoaded, setIsWeb3AuthLoaded ] = useState(false);
  const [ isUserDataLoading, setIsUserDataLoading ] = useState(false);

  const theme = useTheme() as ThemeType;

  const { setIsAuthLoaded } = useLoadingContext();

  const subscribeToAuthEvents = (web3auth: Web3Auth) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, () => {
      // Initializing Ethers.js Provider & Signer
      setEthersProviderAndSinger(web3auth);
      // Fetching and setting user data
      getUserData(web3auth);
    });
    web3auth.on(ADAPTER_EVENTS.ERRORED, () => {
      setIsWeb3AuthLoaded(true);
    });
  };

  const setEthersProviderAndSinger = (web3auth: Web3Auth) => {
    const ethersProvider =
        new ethers.providers.Web3Provider(
          web3auth.provider as Exclude<Web3AuthProviderType, null>,
        );

    // Implementing reload on network change
    ethersProvider.on('network', (newNetwork, oldNetwork) => {
      // When a Provider makes its initial connection, it emits a "network"
      // event with a null oldNetwork along with the newNetwork. So, if the
      // oldNetwork exists, it represents a changing network
      if (oldNetwork) {
        Router.reload();
      }
    });
    setEthersProvider(ethersProvider);
    const signer = ethersProvider.getSigner();
    setSigner(signer);
  };

  const getUserData = async (web3auth: Web3Auth) => {
    setIsUserDataLoading(true);
    try {
      const response = await web3auth.getUserInfo();
      const userData = { ...DEFAULT_USER, ...response };
      setUser(userData);
      setIsUserLoggedIn(true);
      console.log('User data:', userData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUserDataLoading(false);
    };
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
            appLogo: `${location.origin}/images/logo/logo-dark.svg`,
          },
        });

        subscribeToAuthEvents(web3auth);

        const openloginAdapter = new OpenloginAdapter({
          adapterSettings: {
            network: web3authNetworkType,
            uxMode: 'popup',
            whiteLabel: {
              name: 'DOM Wallet',
              // eslint-disable-next-line max-len
              logoLight: `${location.origin}/images/logo/logo-light-with-text.svg`,
              // eslint-disable-next-line max-len
              logoDark: `${location.origin}/images/logo/logo-dark-with-text.svg`,
              defaultLanguage: 'en',
              dark: true,
              theme: { primary: theme.colors.primary },
            },
          },
        });
        web3auth.configureAdapter(openloginAdapter);

        const metamaskAdapter = new MetamaskAdapter({ clientId });
        web3auth.configureAdapter(metamaskAdapter);

        setWeb3auth(web3auth);

        await web3auth.initModal();
      } catch (error) {
        console.error(error);
      } finally {
        setIsWeb3AuthLoaded(true);
      };
    };

    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isWeb3AuthLoaded && !isUserDataLoading) {
      setIsAuthLoaded(true);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ isWeb3AuthLoaded, isUserDataLoading ]);

  const login = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    };
    await web3auth.connect();
  };

  const logout = async () => {
    if (!web3auth) {
      console.log('web3auth not initialized yet');
      return;
    }
    await web3auth.logout();
    setIsUserLoggedIn(false);
    setUser(DEFAULT_USER);
    setEthersProvider(null);
    setSigner(null);
  };

  return {
    isUserLoggedIn,
    user,
    web3auth,
    ethersProvider,
    signer,
    login,
    logout,
  };
};

export default useAuth;
