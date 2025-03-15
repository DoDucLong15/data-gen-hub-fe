import { EThesisDocumentType } from '../enums/thesis-document.enum';

export type TGenerateThesisDocFormData = {
  classId: string;
  studentIds: string[];
  thesisStartDate?: string;
  thesisEndDate?: string;
  teacherSignatureDate?: string;
  thesisDocType: EThesisDocumentType;
};
