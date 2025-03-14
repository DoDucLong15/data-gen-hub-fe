export type TStudent = {
  id?: string;
  mssv: string;
  phone?: string;
  email?: string;
  lastName?: string;
  middleName?: string;
  firstName?: string;
  projectTitle?: string;
  supervisor?: string;
  reviewer?: string;
  studentClassName?: string;
  classId: string;
};

export interface StudentFilter {
  mssv?: string;
  lastName?: string;
  firstName?: string;
  studentClassName?: string;
  supervisor?: string;
  reviewer?: string;
}

export interface TImportTemplate {
  fields: {
    name: string;
    required: boolean;
    type: 'string' | 'number' | 'date';
    description: string;
  }[];
}

export interface TExportOptions {
  classId: string;
  studentIds?: string[];
}
