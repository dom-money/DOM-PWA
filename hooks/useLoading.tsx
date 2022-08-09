import { useEffect, useState } from 'react';

const useLoading = () => {
  const [ isAppLoaded, setIsAppLoaded ] = useState(false);
  const [ isAuthLoaded, setIsAuthLoaded ] = useState(false);

  useEffect(() => {
    if (isAuthLoaded) {
      setIsAppLoaded(true);
    };
  }, [ isAuthLoaded ]);

  return {
    isAppLoaded,
    setIsAuthLoaded,
  };
};

export default useLoading;
