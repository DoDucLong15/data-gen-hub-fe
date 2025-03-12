'use client';

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { AxiosError } from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import {
  ACCESS_TOKEN_EXPIRES_IN,
  apiClient,
  REFRESH_TOKEN_EXPIRES_IN,
  setLogoutHandler,
} from '@/apis/instances/api-client.instance';
import { UserRole } from '@/configs/role.config';
import { SignInResponse } from '@/apis/auth.api';
import { redirect } from 'next/navigation';
import { User } from '@/utils/types/user.type';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Tạo context cho quản lý xác thực
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Logout function
  const logout = async (): Promise<void> => {
    // Xóa token
    deleteCookie('accessToken');
    deleteCookie('refreshToken');

    // Cập nhật user state
    setUser(null);

    // Chuyển hướng về trang login
    redirect('/account/login');
  };

  // Đăng ký hàm logout với API client
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  // Kiểm tra và load user khi component mount
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = getCookie('accessToken');
      if (accessToken) {
        try {
          const response = await apiClient.get('/users/me');
          setUser(response.data as User);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.post<SignInResponse>('/auth/sign-in', { email, password });
      const { accessToken, refreshToken } = response.data;

      // Lưu token vào cookies
      setCookie('accessToken', accessToken, {
        expires: new Date(new Date().getTime() + ACCESS_TOKEN_EXPIRES_IN),
      });
      setCookie('refreshToken', refreshToken, {
        expires: new Date(new Date().getTime() + REFRESH_TOKEN_EXPIRES_IN),
      });
      const userResponse = await apiClient.get('/users/me');
      // Cập nhật user state
      setUser(userResponse.data as User);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      const axiosError = error as AxiosError;
      throw axiosError.response?.data || error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook để sử dụng context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
