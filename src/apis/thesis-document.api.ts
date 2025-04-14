import { EProgressAction } from '@/utils/enums/progress.enum';
import { EThesisDocName, EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { TTemplate } from '@/utils/types/template.type';
import { apiClient } from './instances/api-client.instance';
import { TGenerateThesisDocFormData } from '@/utils/types/thesis-doc.type';

export const ThesisDocumentsEndpoint = {
  GET_TEMPLATE: (classId: string) => `template-specification/${classId}`,
  UPDATE_TEMPLATE: '/template-specification',
  GENERATE: '/student-v2/thesis-document/export',
  LIST: '/thesis-management/list',
  DOWNLOAD_THESIS_FILE: '/thesis-management/download-file',
  DELETE_THESIS_FILE: '/thesis-management/delete-file',
  IMPORT_THESIS_FILE: '/student-v2/thesis-document/import',
  CREATE_THESIS: '/thesis-management',
  UPDATE_THESIS: '/thesis-management',
  DELETE_THESIS: '/thesis-management',
};

export const ThesisDocumentApi = <T extends object = any>(type: EThesisDocumentType) => ({
  async getTemplate(classId: string, action: EProgressAction): Promise<TTemplate | undefined> {
    try {
      const response = await apiClient.get(ThesisDocumentsEndpoint.GET_TEMPLATE(classId));
      const list: TTemplate[] = response.data;
      return list.find((item) => item.name === EThesisDocName[type] && item.action === action);
    } catch (error) {
      throw error;
    }
  },

  async updateTemplate(file: File, id: string, type: 'excel' | 'json'): Promise<TTemplate> {
    try {
      const formData = new FormData();
      if (type === 'excel') {
        formData.append('templateFile', file);
      } else {
        formData.append('jsonFile', file);
      }
      formData.append('id', id);
      const response = await apiClient.patch(ThesisDocumentsEndpoint.UPDATE_TEMPLATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async generate(request: TGenerateThesisDocFormData): Promise<{
    status: 'success' | 'failure' | 'error' | 'processing';
    data: {
      processId: string;
    };
    message: string;
  }> {
    try {
      const response = await apiClient.post(ThesisDocumentsEndpoint.GENERATE, {
        ...request,
        thesisDocType: type,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async list(classId: string, action: EProgressAction): Promise<T[]> {
    try {
      const response = await apiClient.post(ThesisDocumentsEndpoint.LIST, {
        classId,
        thesisDocType: type,
      });
      return (response.data as T[]).filter((item) => {
        if (action === EProgressAction.EXPORT) {
          return 'outputPath' in item && item.outputPath;
        } else {
          return ('inputPath' in item && item.inputPath) || ('outputPath' in item && !item.outputPath);
        }
      });
    } catch (error) {
      throw error;
    }
  },

  async downloadFile(request: { classId: string; ids?: string[] }): Promise<void> {
    try {
      const response = await apiClient.post(
        ThesisDocumentsEndpoint.DOWNLOAD_THESIS_FILE,
        {
          ...request,
          thesisDocType: type,
        },
        {
          responseType: 'blob',
        },
      );
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${type}-${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      link.remove();
    } catch (error) {
      throw error;
    }
  },

  async deleteFile(request: { classId: string; ids?: string[] }): Promise<void> {
    try {
      await apiClient.post(ThesisDocumentsEndpoint.DELETE_THESIS_FILE, {
        ...request,
        thesisDocType: type,
      });
    } catch (error) {
      throw error;
    }
  },

  async importFile(files: File[], classId: string): Promise<void> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('classId', classId);
      formData.append('thesisDocType', type);
      await apiClient.post(ThesisDocumentsEndpoint.IMPORT_THESIS_FILE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async deleteThesis(id: string): Promise<void> {
    try {
      await apiClient.delete(ThesisDocumentsEndpoint.DELETE_THESIS, {
        data: {
          id,
          thesisDocType: type,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  async createThesis(data: T, classId: string): Promise<void> {
    try {
      await apiClient.post(ThesisDocumentsEndpoint.CREATE_THESIS, {
        ...data,
        thesisDocType: type,
        classId,
      });
    } catch (error) {
      throw error;
    }
  },

  async updateThesis(id: string, data: Partial<T>): Promise<void> {
    try {
      await apiClient.patch(ThesisDocumentsEndpoint.UPDATE_THESIS, {
        id,
        ...data,
        thesisDocType: type,
      });
    } catch (error) {
      throw error;
    }
  },
});
