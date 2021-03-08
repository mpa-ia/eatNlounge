import SuperFetch from '../helpers/superFetch';

interface UserResponse {
  user: User.Data;
}
interface SignInResponse extends UserResponse {
  token: string;
}
export const signIn = async (payload: User.SignIn): Promise<ApiResponse<SignInResponse>> =>
  SuperFetch.post('auth/signin', false, payload);

export const signUp = async (payload: User.SignIn): Promise<ApiResponse<undefined>> =>
  SuperFetch.post('auth/signup', false, payload);

export const authorize = async (): Promise<ApiResponse<UserResponse>> =>
  SuperFetch.get('auth', true);