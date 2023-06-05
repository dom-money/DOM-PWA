namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID: string;
    NEXT_PUBLIC_RPC_TARGET: string;
    NEXT_PUBLIC_CHAIN_ID: string;
    NEXT_PUBLIC_NETWORK_TYPE: 'testnet' | 'mainnet';
    NEXT_PUBLIC_USDC_CONTRACT_ADDRESS: string;
    NEXT_PUBLIC_DOM_CONTRACT_ADDRESS: string;
    NEXT_PUBLIC_ETHERSCAN_BASE_URL: string;
    NEXT_PUBLIC_GELATO_RELAY_API_KEY: string;
  };
};
