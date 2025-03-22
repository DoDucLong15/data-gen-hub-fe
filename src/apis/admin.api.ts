import { User, UserFormData } from '@/utils/types/user.type';
import { apiClient } from './instances/api-client.instance';
import { TRole } from '@/utils/types/role.type';
import { TPermission } from '@/utils/types/permission.type';
import { TPermissionFormData } from '@/hooks/usePermissions';

const ManageUserEndpoint = {
  GET_ALL: '/users',
  GET_BY_ID: (id: string) => `/users/one/${id}`,
  CREATE: '/users',
  UPDATE: '/users',
  DELETE: (id: string) => `/users/${id}`,
};

const ManageRoleEndpoint = {
  GET_ALL: 'roles',
  CREATE: 'roles',
  UPDATE: 'roles',
  DELETE: (id: string) => `roles/${id}`,
};

const ManagePermissionEndpoint = {
  GET_ALL: 'permissions',
  CREATE: 'permissions',
  UPDATE: 'permissions',
  DELETE: (id: string) => `permissions/${id}`,
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

  async getAllPermissions(): Promise<TPermission[]> {
    try {
      const response = await apiClient.get(ManagePermissionEndpoint.GET_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createPermission(permission: TPermissionFormData): Promise<TPermission> {
    try {
      const response = await apiClient.post(ManagePermissionEndpoint.CREATE, permission);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updatePermission(id: string, permission: TPermissionFormData): Promise<TPermission> {
    try {
      const response = await apiClient.patch(ManagePermissionEndpoint.UPDATE, { ...permission, id });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deletePermission(id: string): Promise<void> {
    try {
      await apiClient.delete(ManagePermissionEndpoint.DELETE(id));
    } catch (error) {
      throw error;
    }
  },
};
