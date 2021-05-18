import { AppProps } from 'next/app';
import React from 'react';
import { GlobalStyle } from '../styles/global';
import {UserProvider} from '../context/user';
import {LanguageProvider} from '../context/language';
import {ThemeProvider } from '../context/theme';
import Layout from '../components/Layout';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return <>
    <SWRConfig value={{}}>
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
    </SWRConfig>
  </>;
}

export default MyApp;
