import SuperFetch from '../helpers/superFetch';
// import { AxiosResponse } from 'axios';

interface SignInResponse {
  token: string;
  user: User.Data;
}
export const signIn = async (payload: User.SignIn): Promise<ApiResponse<SignInResponse>> =>
  SuperFetch.post('auth/signin', false, payload);

export const signUp = async (payload: User.SignIn): Promise<ApiResponse<undefined>> =>
  SuperFetch.post('auth/signup', false, payload);