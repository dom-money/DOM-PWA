import { rest } from 'msw';
import transactionsResolver from './resolvers/transactionsResolver';
import { CHAIN_EXPLORER_API_URL } from '@/constants';

export const handlers = [
  rest.get(`${CHAIN_EXPLORER_API_URL}/`, transactionsResolver),
];
