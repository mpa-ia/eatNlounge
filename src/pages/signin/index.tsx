import React from 'react';
import SignInForm from '../../components/SignInForm';
import Link from 'next/link';
import { content } from '../../settings';
import { signIn } from '../../services/auth';
const SignIn: React.FunctionComponent = () => {
  const SignInSubmit = async (formFieldsData: User.SignIn): Promise<void> => { 
    const res = await signIn(formFieldsData);
    if (res) {
      console.log('logged in');
    }
  };
  return (
    <div>
      <SignInForm
        onSignIn={SignInSubmit}
      />
      <Link href="/signup">
        <a>{content.pages.signUpIn.signUpLink}</a>
      </Link>
    </div>
  );
};

export default SignIn;
