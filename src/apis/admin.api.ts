import { User, UserFormData } from '@/utils/types/user.type';
import { apiClient } from './instances/api-client.instance';
import { TRole } from '@/utils/types/role.type';

const ManageUserEndpoint = {
  GET_ALL: '/users',
  GET_BY_ID: (id: string) => `/users/one/${id}`,
  CREATE: '/users',
  UPDATE: '/users',
  DELETE: (id: string) => `/users/${id}`,
};

const ManageRoleEndpoint = {
  GET_ALL: 'users/role',
  CREATE: 'users/role',
  UPDATE: 'users/role',
  DELETE: (id: string) => `users/role/${id}`,
};

export const AdminApi = {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await apiClient.get(ManageUserEndpoint.GET_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(id: string): Promise<User> {
    try {
      const response = await apiClient.get(ManageUserEndpoint.GET_BY_ID(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createUser(userData: UserFormData): Promise<User> {
    try {
      const response = await apiClient.post(ManageUserEndpoint.CREATE, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateUser(id: string, userData: UserFormData): Promise<User> {
    try {
      const response = await apiClient.patch(ManageUserEndpoint.UPDATE, { ...userData, id });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      await apiClient.delete(ManageUserEndpoint.DELETE(id));
    } catch (error) {
      throw error;
    }
  },

  async getAllRoles(): Promise<TRole[]> {
    try {
      const response = await apiClient.get(ManageRoleEndpoint.GET_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createRole(role: TRole): Promise<TRole> {
    try {
      const response = await apiClient.post(ManageRoleEndpoint.CREATE, role);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateRole(id: string, role: TRole): Promise<TRole> {
    try {
      const response = await apiClient.patch(ManageRoleEndpoint.UPDATE, { ...role, id });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteRole(id: string): Promise<void> {
    try {
      await apiClient.delete(ManageRoleEndpoint.DELETE(id));
    } catch (error) {
      throw error;
    }
  },
};
