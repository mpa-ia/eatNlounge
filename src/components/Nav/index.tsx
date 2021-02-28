import React from 'react';
import Link from 'next/link';
import { content } from '../../settings';

const Nav: React.FunctionComponent = () => {
  return (
    <nav>
      <Link href="/signin">
        <a>{content.general.signIn}</a>
      </Link>
    </nav>
  );
};
export default Nav;