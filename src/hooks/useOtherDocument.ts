import { apiClient } from '@/apis/instances/api-client.instance';
import { ProcessApi } from '@/apis/process.api';
import { GeneratorOtherDocumentFormValues } from '@/app/(secure)/classes/[id]/(thesis)/other-documents/utils/validations';
import { generatorSchema } from '@/app/(secure)/classes/[id]/(thesis)/other-documents/utils/validations';
import { EProgressType } from '@/utils/enums/progress.enum';
import { ExportType, GeneratorRequestData, GeneratorResponse, InputType } from '@/utils/types/other-document.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useOtherDocumentGeneratorForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GeneratorOtherDocumentFormValues>({
    resolver: zodResolver(generatorSchema),
    defaultValues: {
      inputFiles: [],
      specificationInput: undefined,
      importType: InputType.LIST,
      specificationOutput: undefined,
      templateFile: undefined,
      exportType: ExportType.LIST,
      shareEmails: [''],
    },
    mode: 'onBlur',
  });

  return {
    form,
    isSubmitting,
    setIsSubmitting,
  };
};

export const useOtherDocumentFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, single = false) => {
    if (!e.target.files?.length) return;

    if (single) {
      setFiles([e.target.files[0]]);
    } else {
      setFiles(Array.from(e.target.files));
    }
  };

  const clearFiles = () => {
    setFiles([]);
  };

  return {
    files,
    handleFileChange,
    clearFiles,
  };
};

interface UseGeneratorSubmitOptions {
  onSuccess?: (response: GeneratorResponse) => void;
  onError?: (error: Error) => void;
}

export const useOtherDocumentGeneratorSubmit = (classId: string, options?: UseGeneratorSubmitOptions) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitGenerator = async (data: GeneratorRequestData) => {
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // Thêm multiple files
      data.inputFiles.forEach((file) => {
        formData.append(`inputFiles`, file);
      });

      // Thêm các file đơn
      formData.append('specificationInput', data.specificationInput);
      formData.append('specificationOutput', data.specificationOutput);
      formData.append('templateFile', data.templateFile);

      // Thêm các trường thông thường
      formData.append('importType', data.importType);
      formData.append('exportType', data.exportType);

      formData.append('classId', classId);

      data.shareEmails.forEach((email) => {
        formData.append('shareEmails', email);
      });

      const response = await apiClient.post(`/office/import-export-dynamic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 201) {
        throw new Error('Submission failed');
      }

      const result: GeneratorResponse = response.data.data;

      if (options?.onSuccess) {
        options.onSuccess(result);
      }
      return result;
    } catch (error) {
      if (options?.onError && error instanceof Error) {
        options.onError(error);
      }
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitGenerator,
    isSubmitting,
  };
};

export const useOtherDocumentEmailList = (initialEmails: string[] = ['']) => {
  const [emails, setEmails] = useState<string[]>(initialEmails);

  const addEmail = () => {
    setEmails([...emails, '']);
  };

  const removeEmail = (index: number) => {
    const newEmails = [...emails];
    newEmails.splice(index, 1);
    setEmails(newEmails.length ? newEmails : ['']);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  return {
    emails,
    addEmail,
    removeEmail,
    updateEmail,
  };
};

export const useOtherDocumentHistory = (classId: string) => {
  const {
    data: processes = [],
    isLoading: processesIsLoafing,
    refetch: refetchProcesses,
  } = useQuery({
    queryKey: ['process-other-document', classId],
    queryFn: () =>
      ProcessApi.getProgress({
        classIds: [classId],
        types: [EProgressType.OTHER_DOCUMENT],
      }),
    refetchInterval: 5 * 1000,
    enabled: !!classId,
  });

  return {
    processes,
    processesIsLoafing,
    refetchProcesses,
  };
};
