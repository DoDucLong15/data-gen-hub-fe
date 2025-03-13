import axios from 'axios';
import { apiClient } from './instances/api-client.instance';
import { TClass } from '@/utils/types/classes.type';

const ClassApiEndpoint = {
  GET_ALL: '/class',
  CREATE: '/class',
  UPDATE: '/class',
  DELETE: (id: string) => `/class/${id}`,
};

export const ClassesApi = {
  async getAll(): Promise<TClass[]> {
    try {
      const response = await apiClient.get(ClassApiEndpoint.GET_ALL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(classData: TClass): Promise<TClass> {
    try {
      const response = await apiClient.post(ClassApiEndpoint.CREATE, classData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async update(id: string, classData: Partial<TClass>): Promise<TClass> {
    try {
      const response = await apiClient.patch(ClassApiEndpoint.UPDATE, { ...classData, id });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      await apiClient.delete(ClassApiEndpoint.DELETE(id));
    } catch (error) {
      throw error;
    }
  },
};
