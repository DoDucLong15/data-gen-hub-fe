import { TExportOptions, TStudent } from '@/utils/types/student.type';
import { apiClient } from './instances/api-client.instance';
import { TTemplate } from '@/utils/types/template.type';
import { EProgressAction } from '@/utils/enums/progress.enum';
import { TProcess, TProgressFilter } from '@/utils/types/progress.type';

const StudentEnpoint = {
  CREATE: '/students',
  UPDATE: 'students',
  GET_ALL: (classId: string) => `/students/${classId}`,
  DELETE: (id: string) => `/students/${id}`,
  GET_TEMPLATE: (classId: string) => `template-specification/${classId}`,
  UPDATE_TEMPLATE: '/template-specification',
  EXPORT_STUDENTS: '/student-v2/student-list/export',
  IMPORT_STUDENTS: '/student-v2/student-list/import',
  GET_POGRESS: '/progress',
};

export const StudentApi = {
  async createStudent(data: Omit<TStudent, 'id'>): Promise<TStudent> {
    try {
      const response = await apiClient.post(StudentEnpoint.CREATE, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateStudent(id: string, data: Partial<TStudent>): Promise<TStudent> {
    try {
      const response = await apiClient.patch(StudentEnpoint.UPDATE, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAllStudents(classId: string): Promise<TStudent[]> {
    try {
      const response = await apiClient.get(StudentEnpoint.GET_ALL(classId));
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteStudent(id: string): Promise<void> {
    try {
      await apiClient.delete(StudentEnpoint.DELETE(id));
    } catch (error) {
      throw error;
    }
  },

  async exportStudents(data: TExportOptions) {
    try {
      const response = await apiClient.post(StudentEnpoint.EXPORT_STUDENTS, data, {
        responseType: 'blob',
      });
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `students-export-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      throw error;
    }
  },

  async getTemplate(classId: string, action: EProgressAction): Promise<TTemplate | undefined> {
    try {
      const response = await apiClient.get(StudentEnpoint.GET_TEMPLATE(classId));
      const list: TTemplate[] = response.data;
      return list.find((item) => item.name === 'DSSV' && item.action === action);
    } catch (error) {
      throw error;
    }
  },

  async updateTemplate(template: File, id: string): Promise<TTemplate> {
    try {
      const formData = new FormData();
      formData.append('jsonFile', template);
      formData.append('id', id);
      const response = await apiClient.patch(StudentEnpoint.UPDATE_TEMPLATE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async importStudents(
    files: File[],
    classId: string,
  ): Promise<{
    status: string;
    message: string;
    data: {
      processId: string;
    };
  }> {
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append('files', file);
      });
      formData.append('classId', classId);
      const response = await apiClient.post(StudentEnpoint.IMPORT_STUDENTS, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
