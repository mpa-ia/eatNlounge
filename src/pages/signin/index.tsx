import React, { useEffect } from 'react';
import SignInForm from '../../components/SignInForm';
import Link from 'next/link';
import { content } from '../../settings';
import { signIn } from '../../services/auth';
import {useUser} from '../../context/user';
import { useRouter } from 'next/router';
import { Card } from '../../styles/layout.style';
import { Col, Row } from 'antd';

const SignIn: React.FunctionComponent = () => {
  const { setUser, userData } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (userData) {
      router.replace('/user/dashboard');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);
  const SignInSubmit = async (formFieldsData: User.SignIn): Promise<void> => { 
    const response = await signIn(formFieldsData);
    if (response) {
      setUser(response.data.user);
      router.replace('/user/dashboard');
    }
  };
  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <Card type="lightAccent" >
            <SignInForm
              onSignIn={SignInSubmit}
            />
            <Link href="/signup">
              <a>{content.pages.signUpIn.signUpLink}</a>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
