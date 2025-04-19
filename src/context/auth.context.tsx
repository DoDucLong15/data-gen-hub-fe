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
import { redirect, useRouter } from 'next/navigation';
import { User } from '@/utils/types/user.type';
import { ESubject, IPermission } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { AuthorizationHelper } from '@/utils/helper/authorization.helper';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updateUser: (userData: Partial<User>) => Promise<User>;
  hasPermission: (action: EAction, subject: ESubject) => boolean;
  checkPermissions: (permissions: Array<{ action: EAction; subject: ESubject }>, logic?: 'AND' | 'OR') => boolean;
}

// Tạo context cho quản lý xác thực
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Logout function
  const logout = async (): Promise<void> => {
    // Xóa token
    deleteCookie('accessToken', { path: '/' });
    deleteCookie('refreshToken', { path: '/' });

    // document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    // document.cookie =
    //   'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;

    localStorage.removeItem('user');
    // Cập nhật user state
    setUser(null);

    sessionStorage.clear();

    // Chuyển hướng về trang login
    router.push('/account/login');
  };

  // Đăng ký hàm logout với API client
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  // Kiểm tra và load user khi component mount
  useEffect(() => {
    const initAuth = async () => {
      const accessToken = getCookie('accessToken');
      const cachedUser = localStorage.getItem('user');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser) as User);
      }
      const processWhenError = () => {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        localStorage.removeItem('user');
        sessionStorage.clear();
        setUser(null);
      };
      if (accessToken) {
        try {
          const response = await apiClient.get('/users/me');
          setUser(response.data as User);
          localStorage.setItem('user', JSON.stringify(response.data));
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          processWhenError();
        }
      } else {
        processWhenError();
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
      localStorage.setItem('user', JSON.stringify(userResponse.data));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      const axiosError = error as AxiosError;
      throw axiosError.response?.data || error;
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<User> => {
    try {
      setLoading(true);
      const response = await apiClient.patch('/users', {
        ...userData,
        id: user?.id,
      });
      const updatedUser = response.data;
      setUser((prevUser) => {
        if (!prevUser) return updatedUser;
        return {
          ...prevUser,
          ...updatedUser,
        };
      });
      return response.data as User;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const permissionCheck = (action: EAction, subject: ESubject) => {
    if (!user) return false;
    return AuthorizationHelper.hasPermission(user.permissions, action, subject);
  };

  const permissionsCheck = (
    permissions: Array<{ action: EAction; subject: ESubject }>,
    logic: 'AND' | 'OR' = 'AND',
  ) => {
    if (!user) return false;
    return AuthorizationHelper.checkPermissions(user.permissions, permissions, logic);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        updateUser,
        hasPermission: permissionCheck,
        checkPermissions: permissionsCheck,
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
