import React from 'react';
import useLoading from '../hooks/useLoading';
import LoadingContext from './LoadingContext';

interface LoadingProviderProps {
  children: React.ReactNode;
};

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const { ...loadingArgs } = useLoading();

  return (
    <LoadingContext.Provider value={{ ...loadingArgs }}>
      { children }
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
