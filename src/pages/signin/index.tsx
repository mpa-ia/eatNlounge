import React from 'react';
import SignInForm from '../../components/SignInForm';
import Link from 'next/link';
import { content } from '../../settings';

const SignIn: React.FunctionComponent = () => {
  const SignIn = (formFieldsData: any): void => { 
    console.log(formFieldsData);
  };
  return (
    <div>
      <SignInForm
        onSignIn={SignIn}
      />
      <Link href="/signup">
        <a>{content.pages.signUpIn.signUpLink}</a>
      </Link>
    </div>
  );
};

export default SignIn;
