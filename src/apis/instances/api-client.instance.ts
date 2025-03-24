// src/utils/api-client.ts
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { AuthApi, SignInResponse } from '@/apis/auth.api';

// Thời gian hết hạn token
export const ACCESS_TOKEN_EXPIRES_IN = 60 * 60 * 1000; // 60 phút
export const REFRESH_TOKEN_EXPIRES_IN = 7 * 24 * 60 * 60 * 1000; // 7 ngày

// Hàm xử lý logout - cần được override bởi AuthContext
let logoutHandler: () => Promise<void> = async () => {
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  localStorage.removeItem('user');
  window.location.href = '/account/login';
};

// Cho phép override hàm logout từ bên ngoài
export const setLogoutHandler = (handler: () => Promise<void>) => {
  logoutHandler = handler;
};

// Tạo instance API client
export const createApiClient = (baseURL?: string): AxiosInstance => {
  const apiClient = axios.create({
    baseURL: baseURL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor request - thêm token vào header
  apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const token = getCookie('accessToken');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Interceptor response - xử lý refresh token
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Nếu lỗi 401 (Unauthorized) và chưa thử refresh token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Thử refresh token
          const refreshToken = getCookie('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await AuthApi.refreshToken({ refreshToken: refreshToken.toString() });
          const data = response.data as SignInResponse;

          if (data?.accessToken) {
            // Lưu token mới
            setCookie('accessToken', data.accessToken, {
              expires: new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRES_IN),
            });
            setCookie('refreshToken', data.refreshToken, {
              expires: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN),
            });

            // Cập nhật header và thử lại request
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
            }

            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          // Gọi hàm logout
          await logoutHandler();
        }
      }

      return Promise.reject(error);
    },
  );

  return apiClient;
};

// Export một instance mặc định để sử dụng ở nhiều nơi
export const apiClient = createApiClient();
