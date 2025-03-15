import { apiClient } from './instances/api-client.instance';

const StorageEndpoint = {
  DOWNLOAD: '/storage/download',
  DOWNLOAD_ONE_FILE: `/storage/download-one`,
  GET_POGRESS: '/progress',
};

export const StorageApi = {
  async downloadFile(paths: string[]): Promise<void> {
    try {
      const response = await apiClient.post(
        StorageEndpoint.DOWNLOAD,
        { paths },
        {
          responseType: 'blob',
        },
      );
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'student-import-template.zip';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      throw error;
    }
  },

  async downloadOneFile(path: string): Promise<void> {
    try {
      const response = await apiClient.get(StorageEndpoint.DOWNLOAD_ONE_FILE, {
        responseType: 'blob',
        params: { path },
      });
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = path.split('/').pop() || 'file';
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      throw error;
    }
  },
};
