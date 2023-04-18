import { rest } from 'msw';
import transactionsResolver from './resolvers/transactionsResolver';

const TRANSACTIONS_API_BASE_URL =
  process.env.NEXT_PUBLIC_ETHERSCAN_BASE_URL as string;

export const handlers = [
  rest.get(`${TRANSACTIONS_API_BASE_URL}/`, transactionsResolver),
];
