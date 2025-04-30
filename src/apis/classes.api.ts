import axios from 'axios';
import { apiClient } from './instances/api-client.instance';
import { LecturerDashboardResponse, TClass } from '@/utils/types/classes.type';
import { FileItem, FileTreeResponse, UploadFileResponse } from '@/utils/types/file.type';
import { TOnedriveHierarchy, TOnedrivePreviewItem } from '@/utils/types/onedrive.type';

const ClassApiEndpoint = {
  GET_ALL: '/class',
  CREATE: '/class',
  UPDATE: '/class',
  DELETE: (id: string) => `/class/${id}`,
  GET_DRIVE_INFO: (id: string) => `/class/${id}/drive-info`,
  DOWNLOAD_FILE: (id: string) => `/class/${id}/drive-info/download`,
  UPLOAD_FILE: (id: string) => `/class/${id}/drive-info/upload`,
  DELETE_FILE: (classId: string, fileId: string) => `/class/${classId}/drive-info/${fileId}`,
  CREATE_FOLDER: (classId: string) => `/class/${classId}/drive-info/folders`,
  SYNC_DRIVE_DATA: `/class/drive-info/sync`,
  GET_DASHBOARD_DATA: (id: string) => `/thesis-management/dashboard/${id}`,
  GET_ONE_DRIVE_INFO: (id: string) => `/class/${id}/onedrive-info`,
  UPLOAD_ONE_DRIVE_FILE: (id: string) => `/class/${id}/onedrive-info/upload`,
  DELETE_ONE_DRIVE_FILE: (classId: string, driveId: string, fileId: string) =>
    `/class/${classId}/onedrive-info/${driveId}/${fileId}`,
  SYNC_ONE_DRIVE_DATA: `/class/onedrive-info/sync`,
  GET_ONE_DRIVE_FILE_PREVIEW: '/onedrive/specific-drive/preview',
};

export enum ESyncDriveDataType {
  GUIDANCE_REVIEW = 'guidance_reviews',
  SUPERVISORY_COMMENTS = 'supervisory_comments',
  ASSIGNMENT_SHEET = 'assignment_sheets',
  STUDENT_LIST = 'student_list',
}

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

  async getDriveInfoTree(classId: string): Promise<FileTreeResponse> {
    try {
      const response = await apiClient.get(ClassApiEndpoint.GET_DRIVE_INFO(classId));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async downloadFile(classId: string, fileIds: string[]): Promise<Blob> {
    try {
      const response = await apiClient.get(ClassApiEndpoint.DOWNLOAD_FILE(classId), {
        params: { fileIds: fileIds },
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async uploadFiles(classId: string, files: File[], folderId: string): Promise<UploadFileResponse[]> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('folderId', folderId);

      const response = await apiClient.post(ClassApiEndpoint.UPLOAD_FILE(classId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createFolder(classId: string, folderName: string, parentId: string): Promise<FileItem> {
    try {
      const response = await apiClient.post(ClassApiEndpoint.CREATE_FOLDER(classId), {
        folderName,
        parentFolderId: parentId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteFile(classId: string, fileId: string): Promise<{ success: boolean }> {
    try {
      await apiClient.delete(ClassApiEndpoint.DELETE_FILE(classId, fileId));
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  async syncDriveData(classIds?: string[], types?: ESyncDriveDataType[]): Promise<any> {
    try {
      const response = await apiClient.post(ClassApiEndpoint.SYNC_DRIVE_DATA, {
        classIds,
        types,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getDashboardData(classId: string): Promise<LecturerDashboardResponse> {
    try {
      const response = await apiClient.get(ClassApiEndpoint.GET_DASHBOARD_DATA(classId));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getOneDriveInfo(classId: string): Promise<TOnedriveHierarchy> {
    try {
      const response = await apiClient.get(ClassApiEndpoint.GET_ONE_DRIVE_INFO(classId));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // async downloadFile(classId: string, fileIds: string[]): Promise<Blob> {
  //   try {
  //     const response = await apiClient.get(ClassApiEndpoint.DOWNLOAD_FILE(classId), {
  //       params: { fileIds: fileIds },
  //       responseType: 'blob',
  //     });
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // },

  async uploadOneDriveFile(classId: string, files: File[], driveId: string, folderId: string): Promise<any[]> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('folderId', folderId);
      formData.append('driveId', driveId);

      const response = await apiClient.post(ClassApiEndpoint.UPLOAD_ONE_DRIVE_FILE(classId), formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteOneDriveFile(classId: string, driveId: string, fileId: string): Promise<{ success: boolean }> {
    try {
      await apiClient.delete(ClassApiEndpoint.DELETE_ONE_DRIVE_FILE(classId, driveId, fileId));
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  async syncOneDriveData(classIds?: string[], types?: ESyncDriveDataType[]): Promise<any> {
    try {
      const response = await apiClient.post(ClassApiEndpoint.SYNC_ONE_DRIVE_DATA, {
        classIds,
        types,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getOneDriveFilePreview(driveId: string, fileId: string): Promise<TOnedrivePreviewItem> {
    try {
      const response = await apiClient.get(ClassApiEndpoint.GET_ONE_DRIVE_FILE_PREVIEW, {
        params: {
          driveId,
          fileId,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
