import { FileItem } from '@/utils/types/file.type';
import { apiClient } from './instances/api-client.instance';

// Support Admin

const DriveApiEndpoint = {
  LIST_FILES: '/drive-apis/files',
  DOWNLOAD_FILE: '/drive-apis/download-file',
  UPLOAD_FILE: '/drive-apis/files',
  CREATE_FOLDER: '/drive-apis/folders',
  DELETE_FILE: (id: string) => `/drive-apis/files/${id}`,
};

export const DriveApi = {
  async listFiles(folderId: string): Promise<FileItem[]> {
    try {
      const response = await apiClient.get(DriveApiEndpoint.LIST_FILES, {
        params: { driveIds: folderId, deps: 0 },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async downloadFile(fileId: string): Promise<Blob> {
    try {
      const response = await apiClient.get(DriveApiEndpoint.DOWNLOAD_FILE, {
        params: { fileId },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async uploadFiles(folderId: string, files: File[], onProgress?: (progress: number) => void): Promise<FileItem> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('folderId', folderId);

      const response = await apiClient.post(DriveApiEndpoint.UPLOAD_FILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress && progressEvent.total) {
            const { loaded, total } = progressEvent;
            const progress = Math.round((loaded * 100) / total);
            onProgress(progress);
          }
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createFolder(name: string, parentId?: string): Promise<FileItem> {
    try {
      const response = await apiClient.post(DriveApiEndpoint.CREATE_FOLDER, {
        folderName: name,
        parentFolderId: parentId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteFile(fileId: string): Promise<void> {
    try {
      await apiClient.delete(DriveApiEndpoint.DELETE_FILE(fileId));
    } catch (error) {
      throw error;
    }
  },
};
