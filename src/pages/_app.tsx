import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../styles/global';
import {UserProvider} from '../context/user';
import {LanguageProvider} from '../context/language';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </LanguageProvider>
    </ThemeProvider>
  </>;
}

export default MyApp;
