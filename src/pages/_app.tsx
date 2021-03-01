import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../styles/global';
import {UserProvider} from '../context/user';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  </>;
}

export default MyApp;
