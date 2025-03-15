import { TProcess, TProgressFilter } from '@/utils/types/progress.type';
import { apiClient } from './instances/api-client.instance';

export const ProcessEndpoints = {
  GET: '/progress',
};

export const ProcessApi = {
  async getProgress(filter: TProgressFilter): Promise<TProcess[]> {
    try {
      const response = await apiClient.get(ProcessEndpoints.GET, { params: filter });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
