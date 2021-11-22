import { errorCodes, successCodes } from '../settings/codes';
import { notification } from 'antd';
import React from 'react';
import Tln from '../components/languageProvider/Tln';

type Method = 'success' | 'error' | 'warning';
type Base = (code: number) => void;
type GenerateMessage = (code: number) => React.ReactNode;
type CodesHandler = Record<Method, Base>

const generateMessage: GenerateMessage = code => {
  switch (code) {
    case (errorCodes.AUTH_NO_USER):
      return <Tln id="ERROR_AUTH_NO_USER" />;
    case (errorCodes.AUTH_WRONG_PASSWORD):
      return <Tln id="ERROR_AUTH_WRONG_PASSWORD" />;
    case (errorCodes.AUTH_USER_EXISTS):
      return <Tln id="ERROR_AUTH_USER_EXISTS" />;
    case (errorCodes.AUTH_PASSWORDS_DONT_MATCH):
      return <Tln id="ERROR_AUTH_PASSWORDS_DONT_MATCH" />;
    case (errorCodes.AUTH_USER_NOT_AUTHENTICATED):
      return <Tln id="ERROR_AUTH_USER_NOT_AUTHENTICATED" />;
    case (successCodes.NEW_PASSWORD_SET):
      return <Tln id="SUCCESS_NEW_PASSWORD_SET" />;
    default: return <Tln id="ERROR_DEFAULT" />;
  }
};

const base = (method: Method, code: number): void => {
  notification[method]({
    top: 50,
    duration: 3,
    description: '',
    message: generateMessage(code),
  });
};
export const notificate = {} as CodesHandler;
['success', 'error', 'warning'].forEach(method => {
  notificate[method as Method] = base.bind(null, method as Method);
});

// export default codesHandler;