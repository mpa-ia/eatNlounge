import React from 'react';
import Link from 'next/link';
import { content } from '../../settings';
import { useUser } from '../../context/user';
import { Button } from 'antd';
const Nav: React.FunctionComponent = () => {
  const { userData, logout } = useUser();
  return (
    <nav>
      {userData ?
        <>
          <span>{userData.name} {userData.surname}</span>
          <Button onClick={logout}>Logout</Button>
        </>
        :
        <Link href="/signin">
          <a>{content.general.signIn}</a>
        </Link>
      }
    </nav>
  );
};
export default Nav;