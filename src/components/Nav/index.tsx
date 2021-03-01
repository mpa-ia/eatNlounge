import React from 'react';
import Link from 'next/link';
import { content } from '../../settings';
import { useUser } from '../../context/user';
const Nav: React.FunctionComponent = () => {
  const { userData } = useUser();
  return (
    <nav>
      {userData ?
        <span>{userData.name} {userData.surname}</span>
        :
        <Link href="/signin">
          <a>{content.general.signIn}</a>
        </Link>
      }
    </nav>
  );
};
export default Nav;