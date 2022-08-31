import { useEffect, useState } from 'react';

const MIN_SPLASH_SCREEN_DISPLAY_TIME = 750; // ms

const useLoading = () => {
  const [ isAppLoaded, setIsAppLoaded ] = useState(false);
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

  useEffect(() => {
    if (isAuthLoaded && minimumTimeElapsed) {
      setIsAppLoaded(true);
    };
  }, [ isAuthLoaded, minimumTimeElapsed ]);

  return {
    isAppLoaded,
    setIsAuthLoaded,
  };
};

export default useLoading;
