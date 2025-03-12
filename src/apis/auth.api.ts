import { FetchInstance } from './instances/fetch.instance';
import { ApiResponse } from './instances/instance.config';

const AuthApiEndPoint = {
  SIGN_IN: '/auth/sign-in',
  REFRESH_TOKEN: '/auth/refresh-token',
};

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export const AuthApi = {
  async signIn(request: SignInRequest): Promise<ApiResponse<SignInResponse>> {
    return await new FetchInstance<SignInResponse>().post(AuthApiEndPoint.SIGN_IN, {
      next: { revalidate: false },
      body: JSON.stringify(request),
    });
  },

  async refreshToken(request: RefreshTokenRequest): Promise<ApiResponse<SignInResponse>> {
    return await new FetchInstance<SignInResponse>().post(AuthApiEndPoint.REFRESH_TOKEN, {
      next: { revalidate: false },
      body: JSON.stringify(request),
    });
  },
};
