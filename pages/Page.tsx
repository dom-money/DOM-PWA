/* eslint-disable require-jsdoc */
import { AppProps } from 'next/app';
import React, { useContext } from 'react';
import SplashScreenPage from '../components/SplashScreenPage';
import LoginPageRender from '../components/LoginPageRender';
import LoadingContext, { LoadingContextType } from '../context/LoadingContext';
import AuthContext, { AuthContextType } from '../context/AuthContext';

const Page = ({ Component, pageProps }: AppProps) => {
  const { isAppLoaded } = useContext(LoadingContext) as LoadingContextType;

  const {
    isUserLoggedIn,
    login,
  } = useContext(AuthContext) as AuthContextType;

  if (!isAppLoaded) {
    return <SplashScreenPage />;
  }

  return (
    <>
      {/* Is user logged in? */}
      {isUserLoggedIn ?
          <Component {...pageProps} /> :
          <LoginPageRender onClick={login} {...pageProps}/>
      }
    </>
  );
};

export default Page;
