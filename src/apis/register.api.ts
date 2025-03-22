import { ApproveData } from '@/utils/types/register.type';
import { apiClient } from './instances/api-client.instance';

const RegisterEndpoints = {
  GET_ALL_REGISTERS: 'users/registers',
  APPROVE_REGISTER: `users/registers`,
  DELETE_REGISTER: (id: string) => `users/registers/${id}`,
};

export const RegisterApi = {
  getAllRegisters: async () => {
    try {
      const response = await apiClient.get(RegisterEndpoints.GET_ALL_REGISTERS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  approveRegister: async (data: ApproveData) => {
    try {
      const response = await apiClient.post(RegisterEndpoints.APPROVE_REGISTER, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteRegister: async (id: string) => {
    try {
      const response = await apiClient.delete(RegisterEndpoints.DELETE_REGISTER(id));
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
