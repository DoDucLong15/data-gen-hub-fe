// src/lib/validations/generator.ts
import { z } from 'zod';
import { InputType, ExportType } from '@/utils/types/other-document.type';

export const emailSchema = z.string().email('Phải là địa chỉ email hợp lệ').min(1, 'Email không được để trống');

export const generatorSchema = z.object({
  inputFiles: z.instanceof(File).array().min(1, 'Phải tải lên ít nhất một tệp'),
  specificationInput: z.instanceof(File).refine((file) => file?.type === 'application/json', {
    message: 'File phải có định dạng JSON',
  }),
  importType: z.nativeEnum(InputType),
  specificationOutput: z.instanceof(File).refine((file) => file?.type === 'application/json', {
    message: 'File phải có định dạng JSON',
  }),
  templateFile: z.instanceof(File),
  exportType: z.nativeEnum(ExportType),
  shareEmails: z.array(emailSchema).min(1, 'Phải có ít nhất một email'),
});

export type GeneratorOtherDocumentFormValues = z.infer<typeof generatorSchema>;
