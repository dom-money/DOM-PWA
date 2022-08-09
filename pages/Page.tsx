/* eslint-disable require-jsdoc */
import { AppProps } from 'next/app';
import React, { useContext } from 'react';
import LoadingPage from '../components/LoadingPage';
import LoginPageRender from '../components/LoginPageRender';
import LoadingContext, { LoadingContextType } from '../context/LoadingContext';
import AuthContext, { AuthContextType } from '../context/AuthContext';

const Page = ({ Component, pageProps }: AppProps) => {
  const { isAppLoaded } = useContext(LoadingContext) as LoadingContextType;

  const {
    provider,
    login,
  } = useContext(AuthContext) as AuthContextType;

  if (!isAppLoaded) {
    return <LoadingPage />;
  }

  return (
    <>
      {/* Is user logged in? */}
      {provider ?
          <Component {...pageProps} /> :
          <LoginPageRender onClick={login} {...pageProps}/>
      }
    </>
  );
};

export default Page;
