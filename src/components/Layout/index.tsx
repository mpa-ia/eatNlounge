import React from 'react';
import Nav from '../Nav';
import * as Styles from './Layout.style';

const Layout: React.FC = ({ children }) => (
  <Styles.Main>
    <Nav />
    {children}
  </Styles.Main>
);
export default Layout;