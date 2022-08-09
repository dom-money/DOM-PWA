import { createContext } from 'react';
import useLoading from '../hooks/useLoading';

export type LoadingContextType = ReturnType<typeof useLoading>;

const LoadingContext =
  createContext<LoadingContextType | null>(null);

export default LoadingContext;
