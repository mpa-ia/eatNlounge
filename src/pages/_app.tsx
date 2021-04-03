import { AppProps } from 'next/app';
import React from 'react';
import { GlobalStyle } from '../styles/global';
import {UserProvider} from '../context/user';
import {LanguageProvider} from '../context/language';
import {ThemeProvider } from '../context/theme';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return <>
    <ThemeProvider>
      <GlobalStyle />
      <LanguageProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  </>;
}

export default MyApp;
