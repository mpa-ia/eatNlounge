import { AppProps } from 'next/app';
import React from 'react';
import { GlobalStyle } from '../styles/global';
import {UserProvider} from '../context/user';
import {LanguageProvider} from '../context/language';
import {ThemeProvider } from '../context/theme';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return <>
    <ThemeProvider>
      <GlobalStyle />
      <LanguageProvider>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  </>;
}

export default MyApp;
