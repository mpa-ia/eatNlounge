import { AppProps } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../styles/global';

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return <>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>;
}

export default MyApp;
