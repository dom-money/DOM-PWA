import React, { createContext, useContext, useEffect, useState } from 'react';

const MIN_SPLASH_SCREEN_DISPLAY_TIME = 750; // ms

type GlobalLoading = {
  isAppLoaded: boolean,
  setIsAuthLoaded: React.Dispatch<React.SetStateAction<boolean>>,
};

type ProviderProps = {
  children: React.ReactNode,
}

const GlobalLoadingContext = createContext<GlobalLoading>({
  isAppLoaded: false,
  setIsAuthLoaded: () => {},
});

const useGlobalLoading = () => {
  const [ isAuthLoaded, setIsAuthLoaded ] = useState(false);
  const [ minimumTimeElapsed, setMinimumTimeElapsed ] = useState(false);

  // Setting Timeout for minimum Splash Screen display time
  useEffect(() => {
    const splashScreenDisplayTimeout = setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, MIN_SPLASH_SCREEN_DISPLAY_TIME);
    return () => {
      clearTimeout(splashScreenDisplayTimeout);
    };
  }, []);

  const isAppLoaded = isAuthLoaded && minimumTimeElapsed;

  return {
    isAppLoaded,
    setIsAuthLoaded,
  };
};

export const GlobalLoadingProvider = ({ children }: ProviderProps) => (
  <GlobalLoadingContext.Provider value={ useGlobalLoading() }>
    { children }
  </GlobalLoadingContext.Provider>
);

export const useGlobalLoadingContext = () => useContext(GlobalLoadingContext);
