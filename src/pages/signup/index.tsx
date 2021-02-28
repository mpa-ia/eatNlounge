import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Link from 'next/link';
import { content } from '../../settings';

const SignUp: React.FunctionComponent = () => {
  const SignUp = (formFieldsData: any): void => { 
    console.log(formFieldsData);
  };

  return (
    <div>
      <SignUpForm onSignUp={SignUp} />
      <Link href="/signup">
        <a>{content.pages.signUpIn.signInLink}</a>
      </Link>
    </div>
  );
};

export default SignUp;
