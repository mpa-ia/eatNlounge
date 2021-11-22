import React from 'react';
import { Form, Button, Input } from 'antd';
import { content } from '../../settings';

const { form } = content.pages.signUpIn;

interface Props {
  onEmailVerification: (formFieldsData: User.SignIn) => void;
}

const ResetPasswordForm: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Form onFinish={props.onEmailVerification} >
      <Form.Item
        label={form.email}
        name="email"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">{content.general.resetPassword}</Button>
      </Form.Item>
    </Form>
  );
};
export default ResetPasswordForm;