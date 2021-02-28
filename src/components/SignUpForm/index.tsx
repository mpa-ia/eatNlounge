import React from 'react';
import { Form, Button, Input, Checkbox } from 'antd';
import { content } from '../../settings';

const { form } = content.pages.signUpIn;

interface Props {
  onSignUp: (formFieldsData: User.SignUp) => void;
}

const SignUpForm: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <Form onFinish={props.onSignUp} >
      <Form.Item
        label={form.name}
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label={form.surname}
        name="surname"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
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
      <Form.Item
        label={form.confirmPassword}
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[{ required: true },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item  name="acceptPolicy" valuePropName="checked">
        <Checkbox>{form.acceptPolicy}</Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">{content.general.signUp}</Button>
      </Form.Item>
    </Form>
  );
};
export default SignUpForm;