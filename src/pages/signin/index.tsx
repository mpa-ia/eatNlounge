import React from 'react';
import SignInForm from '../../components/SignInForm';
import Link from 'next/link';
import { content } from '../../settings';
import { signIn } from '../../services/auth';
import {useUser} from '../../context/user';
import { useRouter } from 'next/router';

const SignIn: React.FunctionComponent = () => {
  const { setUser } = useUser();
  const router = useRouter();
  const SignInSubmit = async (formFieldsData: User.SignIn): Promise<void> => { 
    const response = await signIn(formFieldsData);
    if (response) {
      setUser(response.data.user);
      router.replace('/bookings');
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
