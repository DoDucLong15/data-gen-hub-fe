import { ProcessApi } from '@/apis/process.api';
import { StudentApi } from '@/apis/student.api';
import { EProgressAction, EProgressType } from '@/utils/enums/progress.enum';
import { TExportOptions, TStudent } from '@/utils/types/student.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const STUDENTS_QUERY_KEY = (classId: string) => ['students', classId];
export const TEMPLATE_IMPORT_CLASS_QUERY_KEY = (classId: string) => ['template-import', classId];
export const PROGRESS_STUDENTS_QUERY_KEY = (classId: string) => ['progress-students', classId];

export function useStudents(classId: string, getProgress: boolean = true) {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery({
    queryKey: STUDENTS_QUERY_KEY(classId),
    queryFn: () => StudentApi.getAllStudents(classId),
    staleTime: 1 * 60 * 1000,
  });

  const templateQuery = useQuery({
    queryKey: TEMPLATE_IMPORT_CLASS_QUERY_KEY(classId),
    queryFn: () => StudentApi.getTemplate(classId, EProgressAction.IMPORT),
    staleTime: 1 * 60 * 1000,
  });

  const processesQuery = useQuery({
    queryKey: PROGRESS_STUDENTS_QUERY_KEY(classId),
    queryFn: () =>
      ProcessApi.getProgress({
        classIds: [classId],
        types: [EProgressType.STUDENT_LIST],
      }),
    refetchInterval: 5 * 1000,
    enabled: !!classId && getProgress,
  });

  const createStudentMutation = useMutation({
    mutationFn: (studentData: Omit<TStudent, 'id'>) => StudentApi.createStudent({ ...studentData, classId }),
    onSuccess: (newStudent: TStudent) => {
      queryClient.setQueryData(STUDENTS_QUERY_KEY(newStudent.classId), (oldStudents: TStudent[] = []) => [
        ...oldStudents,
        newStudent,
      ]);
    },
  });

  const updateStudentMutation = useMutation({
    mutationFn: ({ id, studentData }: { id: string; studentData: Partial<TStudent> }) =>
      StudentApi.updateStudent(id, studentData),
    onSuccess: (updatedStudent: TStudent) => {
      queryClient.setQueryData(STUDENTS_QUERY_KEY(updatedStudent.classId), (oldStudents: TStudent[] = []) =>
        oldStudents.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)),
      );
    },
  });

  const deleteStudentMutation = useMutation({
    mutationFn: (id: string) => StudentApi.deleteStudent(id),
    onSuccess: (_, id) => {
      queryClient.setQueryData(STUDENTS_QUERY_KEY(classId), (oldStudents: TStudent[] = []) =>
        oldStudents.filter((student) => student.id !== id),
      );
    },
  });

  const exportMutation = useMutation({
    mutationFn: (data: TExportOptions) => StudentApi.exportStudents(data),
    onSuccess: () => {
      toast.success('Export success');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const importMutation = useMutation({
    mutationFn: (files: File[]) => StudentApi.importStudents(files, classId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: PROGRESS_STUDENTS_QUERY_KEY(classId),
      });
      return data;
    },
  });

  const uploadTemplateMutation = useMutation({
    mutationFn: ({ template, id }: { template: File; id: string }) => StudentApi.updateTemplate(template, id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: TEMPLATE_IMPORT_CLASS_QUERY_KEY(classId),
      });
      return data;
    },
  });

  const createStudent = async (studentData: Omit<TStudent, 'id'>) => {
    return createStudentMutation.mutateAsync(studentData);
  };

  const updateStudent = async (id: string, studentData: Partial<TStudent>) => {
    return updateStudentMutation.mutateAsync({ id, studentData });
  };

  const deleteStudent = async (id: string) => {
    return deleteStudentMutation.mutateAsync(id);
  };

  const exportStudents = async (data: TExportOptions) => {
    return exportMutation.mutateAsync(data);
  };

  const importStudents = async (files: File[]) => {
    return importMutation.mutateAsync(files);
  };

  const uploadTemplate = async (template: File, id: string) => {
    return uploadTemplateMutation.mutateAsync({ template, id });
  };

  return {
    students: studentsQuery.data || [],
    studentsIsLoading: studentsQuery.isLoading,
    studentsError: studentsQuery.error as Error | null,
    studentsRefetch: studentsQuery.refetch,
    templateImport: templateQuery.data,
    templateImportIsLoading: templateQuery.isLoading,
    templateImportError: templateQuery.error as Error | null,
    processes: processesQuery.data || [],
    processesIsLoading: processesQuery.isLoading,
    processesError: processesQuery.error as Error | null,
    createStudent,
    updateStudent,
    deleteStudent,
    exportStudents,
    importStudents,
    uploadTemplate,
    isImporting: importMutation.isPending,
    isExporting: exportMutation.isPending,
  };
}
