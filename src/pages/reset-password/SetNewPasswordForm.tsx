import React from 'react';
import { Form, Button, Input } from 'antd';
import { content } from '../../settings';

const { form } = content.pages.signUpIn;

interface Props {
  onNewPasswordSet: (formFieldsData: User.SetNewPassword) => void;
}

const ResetPasswordForm: React.FunctionComponent<Props> = (props: Props) => (
  <Form onFinish={props.onNewPasswordSet} >
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
            return Promise.reject(new Error('Passwords you entered do not match!'));
          },
        }),
      ]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit">{content.general.setNewPassword}</Button>
    </Form.Item>
  </Form>
);
export default ResetPasswordForm;