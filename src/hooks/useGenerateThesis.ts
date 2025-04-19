import { ProcessApi } from '@/apis/process.api';
import { StorageApi } from '@/apis/storage.api';
import { ThesisDocumentApi } from '@/apis/thesis-document.api';
import { GENERATE_THESIS } from '@/configs/messages.config';
import { EProgressAction, EProgressType } from '@/utils/enums/progress.enum';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { TStudent } from '@/utils/types/student.type';
import { TGenerateThesisDocFormData } from '@/utils/types/thesis-doc.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

const TEMPLATE_EXPORT_THESIS_QUERY_KEYS = (type: EThesisDocumentType, classId: string) => [
  'thesis-template-export',
  type,
  classId,
];
const PROCESS_EXPORT_THESIS_QUERY_KEYS = (type: EThesisDocumentType, classId: string) => [
  'process-export-thesis',
  type,
  classId,
];
export const GENERATED_SHEETS_QUERY_KEY = (type: EThesisDocumentType, classId: string) => [
  'generated-sheets-export',
  type,
  classId,
];

export const useGenerateThesis = (type: EThesisDocumentType, classId: string) => {
  const queryClient = useQueryClient();
  const thesisApiInstance = ThesisDocumentApi(type);
  const [uploading, setUploading] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<TStudent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: template, isLoading: loadingTemplates } = useQuery({
    queryKey: TEMPLATE_EXPORT_THESIS_QUERY_KEYS(type, classId),
    queryFn: () => thesisApiInstance.getTemplate(classId, EProgressAction.EXPORT),
  });

  const uploadTemplateMutation = useMutation({
    mutationFn: ({ file, id, type }: { file: File; id: string; type: 'excel' | 'json' }) =>
      thesisApiInstance.updateTemplate(file, id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEMPLATE_EXPORT_THESIS_QUERY_KEYS(type, classId) });
      toast.success(GENERATE_THESIS.TEMPLATE_UPLOADED);
    },
    onError: (error) => {
      toast.error(GENERATE_THESIS.TEMPLATE_UPLOAD_FAILED.replace('{message}', error.message));
    },
  });

  const downloadTemplate = async (path: string) => {
    try {
      await StorageApi.downloadOneFile(path);
      toast.success(GENERATE_THESIS.TEMPLATE_DOWNLOADED.replace('{type}', type));
    } catch (error) {
      toast.error(GENERATE_THESIS.TEMPLATE_DOWNLOAD_FAILED);
    }
  };

  const generateMutation = useMutation({
    mutationFn: (request: TGenerateThesisDocFormData) =>
      thesisApiInstance.generate({
        ...request,
        classId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROCESS_EXPORT_THESIS_QUERY_KEYS(type, classId) });
      queryClient.invalidateQueries({ queryKey: GENERATED_SHEETS_QUERY_KEY(type, classId) });
      toast.success(GENERATE_THESIS.REQUEST_SENT);
    },
    onError: (error) => {
      toast.error(GENERATE_THESIS.GENERATION_FAILED.replace('{message}', error.message));
    },
  });

  const openStudentSelection = (students: TStudent[]) => {
    setSelectedStudents(students);
    setIsDialogOpen(true);
  };

  const closeStudentSelection = () => {
    setIsDialogOpen(false);
  };

  const {
    data: processes = [],
    isLoading: processesIsLoafing,
    refetch: refetchProcesses,
  } = useQuery({
    queryKey: PROCESS_EXPORT_THESIS_QUERY_KEYS(type, classId),
    queryFn: () =>
      ProcessApi.getProgress({
        classIds: [classId],
        types: [type as unknown as EProgressType],
        actions: [EProgressAction.EXPORT],
      }),
    refetchInterval: 5 * 1000,
    enabled: !!classId,
  });

  // wrapper
  const uploadTemplate = async (file: File, id: string, type: 'excel' | 'json') => {
    setUploading(true);
    return await uploadTemplateMutation.mutateAsync({ file, id, type }).then(() => {
      setUploading(false);
    });
  };

  const generateSheets = async (request: TGenerateThesisDocFormData) => {
    return await generateMutation.mutateAsync(request);
  };

  const {
    data: generatedSheets = [],
    isLoading: generatedSheetsIsLoading,
    refetch: refetchGeneratedSheets,
  } = useQuery({
    queryKey: GENERATED_SHEETS_QUERY_KEY(type, classId),
    queryFn: () => thesisApiInstance.list(classId, EProgressAction.EXPORT),
  });

  const deleteSheetMutation = useMutation({
    mutationFn: (sheetId: string) =>
      thesisApiInstance.deleteFile({
        classId,
        ids: [sheetId],
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GENERATED_SHEETS_QUERY_KEY(type, classId) });
      toast.success(GENERATE_THESIS.SHEET_DELETED);
    },
    onError: (error) => {
      toast.error(GENERATE_THESIS.SHEET_DELETE_FAILED.replace('{message}', error.message));
    },
  });

  const deleteAllSheetsMutation = useMutation({
    mutationFn: () =>
      thesisApiInstance.deleteFile({
        classId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GENERATED_SHEETS_QUERY_KEY(type, classId) });
      toast.success(GENERATE_THESIS.ALL_SHEETS_DELETED);
    },
    onError: (error) => {
      toast.error(GENERATE_THESIS.ALL_SHEETS_DELETE_FAILED.replace('{message}', error.message));
    },
  });

  const downloadAllSheet = async () => {
    try {
      await thesisApiInstance.downloadFile({
        classId,
      });
    } catch (error) {
      toast.error(GENERATE_THESIS.DOWNLOAD_FAILED);
    }
  };

  const deleteSheet = async (sheetId: string) => {
    return await deleteSheetMutation.mutateAsync(sheetId);
  };

  const deleteAllSheets = async () => {
    return await deleteAllSheetsMutation.mutateAsync();
  };

  return {
    template,
    loadingTemplates,
    uploading,
    uploadTemplate,
    downloadTemplate,
    generateSheets,
    isGenerating: generateMutation.isPending,
    selectedStudents,
    isDialogOpen,
    openStudentSelection,
    closeStudentSelection,
    processes,
    processesIsLoafing,
    refetchProcesses,
    generatedSheets,
    generatedSheetsIsLoading,
    refetchGeneratedSheets,
    deleteSheet,
    deleteAllSheets,
    downloadAllSheet,
    isDeletingSheet: deleteSheetMutation.isPending,
    isDeletingAllSheets: deleteAllSheetsMutation.isPending,
  };
};
