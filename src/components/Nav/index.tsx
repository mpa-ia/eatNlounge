import React from 'react';
import Link from 'next/link';
import { content } from '../../settings';
import { useUser } from '../../context/user';
import { Button } from 'antd';
import LanguageSwitcher from '../languageProvider/languageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';
import * as Style from './Nav.style';
import Tln from '../languageProvider/Tln';

const Nav: React.FunctionComponent = () => {
  const { userData, logout } = useUser();
  return (
    <Style.NavBar>

      <LanguageSwitcher />
      <ThemeSwitcher />
      {userData ?
        <>
          <span></span>
          <Link href="/user/dashboard">
            <a>{userData.name} {userData.surname}</a>
          </Link>
          <Button onClick={logout}><Tln id="LOGOUT" /></Button>
        </>
        :
        <Link href="/signin">
          <a>{content.general.signIn}</a>
        </Link>
      }
    </Style.NavBar>
  );
};
export default Nav;