import React from 'react';
import SignUpForm from '../../components/SignUpForm';
import Link from 'next/link';
import { content } from '../../settings';
import { signUp } from '../../services/auth';
import { Card } from '../../styles/layout.style';
import { Col, Row } from 'antd';
const SignUp: React.FunctionComponent = () => {
  const SignUp = async (formFieldsData: User.SignUp): Promise<void> => { 
    const res = await signUp(formFieldsData);
    if (res) {
      console.log('signed up');
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
