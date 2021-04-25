import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Link from 'next/link';
import { content } from '../../settings';
import { signUp } from '../../services/auth';
import { Card } from '../../styles/layout.style';
import { Col, Row } from 'antd';
import useUser from '../../helpers/useUser';
import { useRouter } from 'next/router';

const SignUp: React.FunctionComponent = () => {
  useUser();
  const router = useRouter();
  const SignUp = async (formFieldsData: User.SignUp): Promise<void> => {
    const res = await signUp(formFieldsData);
    if (res) {
      router.replace('/signin');
    }
  };
  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <Card type="lightAccent" >
            <SignUpForm onSignUp={SignUp} />
            <Link href="/signin">
              <a>{content.pages.signUpIn.signInLink}</a>
            </Link>
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default SignUp;
