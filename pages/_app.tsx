import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { AppProps } from 'next/app';
import LogRocket from 'logrocket';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import GlobalStyle from '../styles/global';
import Loading from '../components/Loading';

const DynamicContextProviders = dynamic(
    () => import('../context/ContextProviders'),
    {
      ssr: false,
      loading: () => <Loading />,
    },
);

const DynamicPage = dynamic(() => import('./Page'), {
  ssr: false,
  loading: () => <Loading />,
});

LogRocket.init('8dtdv2/dom');

const Container = styled.div`
  max-width: 926px;
  margin: auto;
`;

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          // eslint-disable-next-line max-len
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>DOM Wallet</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content={theme.colors.backgroundMain} />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <DynamicContextProviders>
          <Container>
            <DynamicPage Component={Component} {...pageProps}/>
          </Container>
        </DynamicContextProviders>
      </ThemeProvider>
    </>
  );
};

export default App;
