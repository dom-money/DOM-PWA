import { rest } from 'msw';
import transactionsResolver from './resolvers/transactionsResolver';

const TRANSACTIONS_API_BASE_URL =
  CHAIN_EXPLORER_API_URL as string;

export const handlers = [
  rest.get(`${TRANSACTIONS_API_BASE_URL}/`, transactionsResolver),
];
