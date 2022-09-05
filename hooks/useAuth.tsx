/* eslint-disable require-jsdoc */
import { useState, useEffect } from 'react';
import Router from 'next/router';
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

export type Web3authType = Web3Auth | null;
export type ProviderType = SafeEventEmitterProvider | null;
export type EthersProviderType = ethers.providers.Web3Provider | null;
export type SignerType = ethers.providers.JsonRpcSigner | null;

const useAuth = (
    setIsAuthLoaded: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [ web3auth, setWeb3auth ] = useState<Web3authType>(null);
  const [ provider, setProvider ] = useState<ProviderType>(null);
  const [ ethersProvider, setEthersProvider ] =
    useState<EthersProviderType>(null);
  const [ signer, setSigner ] = useState<SignerType>(null);

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
              logoLight: `${location.origin}/images/logo/logo-light.svg`,
              logoDark: `${location.origin}/images/logo/logo-dark.svg`,
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
    login,
    logout,
  };
};

export default useAuth;
