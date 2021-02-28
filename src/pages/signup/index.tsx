import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Link from 'next/link';
import { content } from '../../settings';
import { signUp } from '../../services/auth';

const SignUp: React.FunctionComponent = () => {
  const SignUp = async (formFieldsData: User.SignUp): Promise<void> => { 
    const res = await signUp(formFieldsData);
    if (res) {
      console.log('signed up');
    }
  };

  return (
    <div>
      <SignUpForm onSignUp={SignUp} />
      <Link href="/signin">
        <a>{content.pages.signUpIn.signInLink}</a>
      </Link>
    </div>
  );
};

export default SignUp;
