// src/types/generator.ts
export enum InputType {
  LIST = 'list',
  SINGLE = 'single',
}

export enum ExportType {
  LIST = 'list',
  SINGLE = 'single',
}

export interface GeneratorRequestData {
  inputFiles: File[];
  specificationInput: File;
  importType: InputType;
  specificationOutput: File;
  templateFile: File;
  exportType: ExportType;
  shareEmails: string[];
}

export interface GeneratorResponse {
  processId: string;
}
