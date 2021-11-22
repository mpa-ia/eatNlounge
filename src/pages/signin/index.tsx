import React from 'react';
import SignInForm from '../../components/SignInForm';
import Link from 'next/link';
import { content } from '../../settings';
import { signIn } from '../../services/auth';
import { Card } from '../../styles/layout.style';
import { Col, Row } from 'antd';
import useUser from '../../helpers/useUser';

const SignIn: React.FunctionComponent = () => {
  const { mutateUser } = useUser();
  const SignInSubmit = async (formFieldsData: User.SignIn): Promise<void> => { 
    await mutateUser(signIn(formFieldsData));
  };
  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <Card type="lightAccent" >
            <SignInForm
              onSignIn={SignInSubmit}
            />
            <Link href="/reset-password">
              <a>{content.pages.signUpIn.resetPassword}</a>
            </Link>
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
