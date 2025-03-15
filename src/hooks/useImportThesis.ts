import { ProcessApi } from '@/apis/process.api';
import { ThesisDocumentApi } from '@/apis/thesis-document.api';
import { EProgressAction, EProgressType } from '@/utils/enums/progress.enum';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const TEMPLATE_IMPORT_THESIS_QUERY_KEYS = (type: EThesisDocumentType, classId: string) => [
  'thesis-template-import',
  type,
  classId,
];
const PROCESS_IMPORT_THESIS_QUERY_KEYS = (type: EThesisDocumentType, classId: string) => [
  'process-import-thesis',
  type,
  classId,
];
const GENERATED_IMPORT_QUERY_KEY = (type: EThesisDocumentType, classId: string) => ['sheets-import', type, classId];

export const useImportThesis = (type: EThesisDocumentType, classId: string) => {
  const queryClient = useQueryClient();
  const thesisApiInstance = ThesisDocumentApi(type);

  const { data: templateImport, isLoading: loadingTemplateImport } = useQuery({
    queryKey: TEMPLATE_IMPORT_THESIS_QUERY_KEYS(type, classId),
    queryFn: () => thesisApiInstance.getTemplate(classId, EProgressAction.IMPORT),
  });

  const importMutation = useMutation({
    mutationFn: (files: File[]) => thesisApiInstance.importFile(files, classId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: PROCESS_IMPORT_THESIS_QUERY_KEYS(type, classId),
      });
      queryClient.invalidateQueries({
        queryKey: GENERATED_IMPORT_QUERY_KEY(type, classId),
      });
      return data;
    },
    onError: (error) => {
      toast.error(`Import failed: ${error.message}`);
    },
  });

  const uploadTemplateMutation = useMutation({
    mutationFn: ({ template, id }: { template: File; id: string }) =>
      thesisApiInstance.updateTemplate(template, id, 'json'),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: TEMPLATE_IMPORT_THESIS_QUERY_KEYS(type, classId),
      });
      return data;
    },
  });

  const {
    data: processes = [],
    isLoading: processesIsLoafing,
    refetch: refetchProcesses,
  } = useQuery({
    queryKey: PROCESS_IMPORT_THESIS_QUERY_KEYS(type, classId),
    queryFn: () =>
      ProcessApi.getProgress({
        classIds: [classId],
        types: [type as unknown as EProgressType],
        actions: [EProgressAction.IMPORT],
      }),
    refetchInterval: 10 * 1000,
    enabled: !!classId,
  });

  const {
    data: listThesis = [],
    isLoading: isLoadingListThesis,
    refetch: refetchListThesis,
  } = useQuery({
    queryKey: GENERATED_IMPORT_QUERY_KEY(type, classId),
    queryFn: () => thesisApiInstance.list(classId, EProgressAction.IMPORT),
  });

  const createThesisMutation = useMutation({
    mutationFn: (data: any) => thesisApiInstance.createThesis(data, classId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GENERATED_IMPORT_QUERY_KEY(type, classId),
      });
      toast.success('Thesis created successfully');
    },
    onError: (error) => {
      toast.error(`Create thesis failed: ${error.message}`);
    },
  });

  const updateThesisMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => thesisApiInstance.updateThesis(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GENERATED_IMPORT_QUERY_KEY(type, classId),
      });
      toast.success('Thesis updated successfully');
    },
    onError: (error) => {
      toast.error(`Update thesis failed: ${error.message}`);
    },
  });

  const deleteThesisMutation = useMutation({
    mutationFn: (id: string) => thesisApiInstance.deleteThesis(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: GENERATED_IMPORT_QUERY_KEY(type, classId),
      });
      toast.success('Thesis deleted successfully');
    },
    onError: (error) => {
      toast.error(`Delete thesis failed: ${error.message}`);
    },
  });

  const importThesisDoc = async (files: File[]) => {
    return await importMutation.mutateAsync(files);
  };

  const uploadTemplate = async (template: File, id: string) => {
    return await uploadTemplateMutation.mutateAsync({ template, id });
  };

  const createThesis = async (data: any) => {
    return await createThesisMutation.mutateAsync(data);
  };

  const updateThesis = async (id: string, data: any) => {
    return await updateThesisMutation.mutateAsync({ id, data });
  };

  const deleteThesis = async (id: string) => {
    return await deleteThesisMutation.mutateAsync(id);
  };

  return {
    templateImport,
    importThesisDoc,
    uploadTemplate,
    isImporting: importMutation.isPending,
    processes,
    processesIsLoafing,
    refetchProcesses,
    listThesis,
    isLoadingListThesis,
    refetchListThesis,
    createThesis,
    updateThesis,
    deleteThesis,
    isCreatingThesis: createThesisMutation.isPending,
    isUpdatingThesis: updateThesisMutation.isPending,
    isDeletingThesis: deleteThesisMutation.isPending,
  };
};
