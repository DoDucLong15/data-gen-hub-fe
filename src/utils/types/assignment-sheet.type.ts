import { EThesisDocumentType } from '../enums/thesis-document.enum';

export type TAssignmentSheet = {
  id: string;
  fullName: string;
  mssv: string;
  studentClassName?: string;
  projectTitle?: string;
  supervisor?: string;
  phone?: string;
  email?: string;
  classCode?: string;
  inputPath?: string;
  outputPath?: string;
  semester?: string;
  school?: string;
  thesisStartDate?: string;
  thesisEndDate?: string;
  studentKnowledgeGained?: string;
  technologyGained?: string;
  acquiredSkills?: string;
  expectedProducts?: string;
  realWorldProblemSolved?: string;
  student_sign_date?: string;
  supervisor_sign_date?: string;
  createdAt?: Date;
  updatedAt?: Date;
  classId: string;
};
