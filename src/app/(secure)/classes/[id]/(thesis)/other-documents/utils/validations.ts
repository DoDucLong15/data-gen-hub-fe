// src/lib/validations/generator.ts
import { z } from 'zod';
import { InputType, ExportType } from '@/utils/types/other-document.type';
import { THESIS_PAGE } from '@/configs/messages.config';

export const emailSchema = z
  .string()
  .email(THESIS_PAGE.OTHER_DOCUMENTS.VALIDATIONS.EMAIL.INVALID)
  .min(1, THESIS_PAGE.OTHER_DOCUMENTS.VALIDATIONS.EMAIL.REQUIRED);

export const generatorSchema = z.object({
  inputFiles: z.instanceof(File).array().min(1, THESIS_PAGE.OTHER_DOCUMENTS.VALIDATIONS.FORM.INPUT_FILES.REQUIRED),
  specificationInput: z.instanceof(File).refine((file) => file?.type === 'application/json', {
    message: THESIS_PAGE.OTHER_DOCUMENTS.VALIDATIONS.FORM.SPECIFICATION_INPUT.INVALID_FORMAT,
  }),
  importType: z.nativeEnum(InputType),
  specificationOutput: z.instanceof(File).refine((file) => file?.type === 'application/json', {
    message: THESIS_PAGE.OTHER_DOCUMENTS.VALIDATIONS.FORM.SPECIFICATION_OUTPUT.INVALID_FORMAT,
  }),
  templateFile: z.instanceof(File),
  exportType: z.nativeEnum(ExportType),
  shareEmails: z.array(emailSchema).min(1, THESIS_PAGE.OTHER_DOCUMENTS.VALIDATIONS.FORM.SHARE_EMAILS.REQUIRED),
});

export type GeneratorOtherDocumentFormValues = z.infer<typeof generatorSchema>;
