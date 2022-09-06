import { createContext, useContext } from 'react';
import useLoading from '../hooks/useLoading';

export type LoadingContextType = ReturnType<typeof useLoading>;

const LoadingContext =
  createContext<LoadingContextType>({} as LoadingContextType);

export default LoadingContext;

export const useLoadingContext = () => {
  return useContext(LoadingContext);
};
