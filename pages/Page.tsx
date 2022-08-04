/* eslint-disable require-jsdoc */
import { AppProps } from 'next/app';
import React, { useContext } from 'react';
import LoadingPage from '../components/LoadingPage';
import LoginPageRender from '../components/LoginPageRender';
import AuthContext, { AuthContextType } from '../context/AuthContext';

const Page = ({ Component, pageProps }: AppProps) => {
  const {
    provider,
    login,
    isAuthLoaded,
  } = useContext(AuthContext) as AuthContextType;

  if (!isAuthLoaded) {
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
