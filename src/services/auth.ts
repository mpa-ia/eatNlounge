import { AxiosResponse } from 'axios';
import SuperFetch from '../helpers/superFetch';

interface SignInResponse {
  token: string;
  user: User.Data;
}
export const signIn = async (payload: User.SignIn): Promise<AxiosResponse<ApiResponse<SignInResponse>>> =>
  SuperFetch.post('auth/signin', false, payload);

export const signUp = async (payload: User.SignIn): Promise<AxiosResponse<ApiResponse<undefined>>> =>
  SuperFetch.post('auth/signup', false, payload);