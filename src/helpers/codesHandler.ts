import { errorCodes } from '../settings/codes';
import { notification } from 'antd';

type ExecuteCode = (code: number, type: 'success' | 'error' | 'warning') => void;
type GenerateMessage = (code: number) => { message: string; description: string; };

class CodesHandler {
  private notificationDefaultConfig = {
    top: 50,
    duration: 3,
  };
  private generateMessage: GenerateMessage = code => {
    switch (code) {
      case (errorCodes.AUTH_NO_USER):
        return {
          message: 'Cannot sign in', description: 'Email address not found, account does not exist.',
        };
      case (errorCodes.AUTH_WRONG_PASSWORD):
        return {
          message: 'Cannot sign in', description: 'Wrong password.',
        };
      case (errorCodes.AUTH_USER_EXISTS):
        return {
          message: 'Cannot sign up', description: 'Account already exists.',
        };
      case (errorCodes.AUTH_PASSWORDS_DONT_MATCH):
        return {
          message: 'Cannot sign up', description: 'Passwords don\'t match.',
        };
      default: return { message: 'Unknown error', description: ''};
    }
  }
  public executeCode: ExecuteCode = (code, type) => {
    notification[type]({
      ...this.notificationDefaultConfig,
      ...this.generateMessage(code),
    });
  }
}

export default new CodesHandler();
