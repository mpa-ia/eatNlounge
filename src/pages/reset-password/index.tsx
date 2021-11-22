import React, { useState } from 'react';
import VerifyEmailForm from './VerifyEmailForm';
import SetNewPasswordForm from './SetNewPasswordForm';
import { verifyEmail, setNewPassword } from '../../services/auth';
import { Card } from '../../styles/layout.style';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { notificate } from '../../helpers/codesHandler';

const SignIn: React.FunctionComponent = () => {
  const router = useRouter();
  const [verifiedEmail, setEmailVerified] = useState<string | null>(null);
  const verifyUserEmail = async (formFieldsData: User.ResetPassword): Promise<void> => {
    const res = await verifyEmail(formFieldsData);
    if (res) {
      setEmailVerified(formFieldsData.email);
    }
  };
  const setPassword = async (formFieldsData: User.SetNewPassword): Promise<void> => {
    if (verifiedEmail) {
      const res = await setNewPassword(verifiedEmail, formFieldsData);
      if (res && res.code) {
        notificate.success(res.code);
        router.push('/signin');
      }
    }
  };
  return (
    <div>
      <Row>
        <Col span={12} offset={6}>
          <Card type="lightAccent" >
            {verifiedEmail ? <SetNewPasswordForm onNewPasswordSet={setPassword} /> :
              <VerifyEmailForm
                onEmailVerification={verifyUserEmail}
              />
            }
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
