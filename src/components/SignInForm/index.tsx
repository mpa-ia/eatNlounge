import React from 'react';
import { Form, Button, Input } from 'antd';
import { content } from '../../settings';

const { form } = content.pages.signUpIn;

interface Props {
  onSignIn: (formFieldsData: User.SignIn) => void;
}

const SignInForm: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Form onFinish={props.onSignIn} >
      <Form.Item
        label={form.email}
        name="email"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={form.password}
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">{content.general.signIn}</Button>
      </Form.Item>
    </Form>
  );
};
export default SignInForm;