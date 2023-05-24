// Auth
export const DEFAULT_USER = {
  email: '',
  name: 'Anonymous User',
  profileImage: '',
};

// Web3Auth
export const web3AuthClientId = process.env.NEXT_PUBLIC_WEB3_AUTH_CLIENT_ID;
export const web3AuthNetwork = process.env.NEXT_PUBLIC_NETWORK_TYPE;

// Gelato Relay
export const GELATO_RELAY_API_KEY =
  process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY;
