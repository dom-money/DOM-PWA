/* eslint-disable require-jsdoc */
import { AppProps } from 'next/app';
import React, { useContext } from 'react';
import Loading from '../components/Loading';
import NotAuthorized from '../components/NotAuthorized';
import AuthContext, { AuthContextType } from '../context/AuthContext';

const Page = ({ Component, pageProps }: AppProps) => {
  const {
    provider,
    login,
    isLoaded,
  } = useContext(AuthContext) as AuthContextType;

  if (!isLoaded) {
    return <Loading />;
  }

  return (
    <>
      {/* Is user logged in? */}
      {provider ?
          <Component {...pageProps} /> :
          <NotAuthorized onClick={login} {...pageProps}/>
      }
    </>
  );
};

export default Page;
