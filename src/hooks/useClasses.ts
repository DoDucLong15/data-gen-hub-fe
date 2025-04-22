import { ClassesApi } from '@/apis/classes.api';
import { CLASSES } from '@/configs/messages.config';
import { TClass } from '@/utils/types/classes.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useMemo } from 'react';

export const CLASSES_QUERY_KEY = ['classes'];

export function useClasses() {
  const queryClient = useQueryClient();

  const {
    data: classes = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: CLASSES_QUERY_KEY,
    queryFn: () => ClassesApi.getAll(),
    staleTime: 1 * 60 * 1000, // Data được coi là "fresh" trong 1 phút
  });

  // Cải thiện hàm getById để không tạo query mới mỗi lần gọi
  const getById = (id: string) => {
    // Sử dụng useMemo để tránh tính toán lại khi các dependency không thay đổi
    const classItem = useMemo(() => {
      return classes.find((c) => c.id === id);
    }, [classes, id]);

    return {
      data: classItem,
      isLoading,
      error,
    };
  };

  // Cải thiện hàm search để không tạo query mới mỗi lần gọi
  const search = (query: string) => {
    // Sử dụng useMemo để tránh tính toán lại khi các dependency không thay đổi
    const filteredClasses = useMemo(() => {
      if (!query || query.length === 0) return classes;
      return classes.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));
    }, [classes, query]);

    return {
      data: filteredClasses,
      isLoading,
      error,
    };
  };

  const createMutation = useMutation({
    mutationFn: (classData: Omit<TClass, 'id'>) => ClassesApi.create(classData),
    onSuccess: (newClass) => {
      // Cập nhật cache trực tiếp thay vì invalidate
      queryClient.setQueryData(CLASSES_QUERY_KEY, (oldData: TClass[] = []) => {
        return [...oldData, newClass];
      });
      toast.success(CLASSES.SUCCESS_CREATE);
    },
    onError: () => {
      toast.error(CLASSES.ERROR_CREATE);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TClass> }) => ClassesApi.update(id, data),
    onSuccess: (updatedClass, { id }) => {
      // Cập nhật cache trực tiếp thay vì invalidate
      queryClient.setQueryData(CLASSES_QUERY_KEY, (oldData: TClass[] = []) => {
        return oldData.map((item) => (item.id === id ? { ...item, ...updatedClass } : item));
      });
      toast.success(CLASSES.SUCCESS_UPDATE);
    },
    onError: () => {
      toast.error(CLASSES.ERROR_UPDATE);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ClassesApi.delete(id),
    onSuccess: (_, id) => {
      // Cập nhật cache trực tiếp thay vì invalidate
      queryClient.setQueryData(CLASSES_QUERY_KEY, (oldData: TClass[] = []) => {
        return oldData.filter((item) => item.id !== id);
      });
      toast.success(CLASSES.SUCCESS_DELETE);
    },
    onError: () => {
      toast.error(CLASSES.ERROR_DELETE);
    },
  });

  return {
    classes,
    isLoading,
    error,
    refetch,
    getById,
    search,
    create: async (classData: Omit<TClass, 'id'>) => {
      return createMutation.mutateAsync(classData);
    },
    update: async (id: string, data: Partial<TClass>) => {
      return updateMutation.mutateAsync({ id, data });
    },
    delete: async (id: string) => {
      return deleteMutation.mutateAsync(id);
    },
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useDashboard(id: string) {
  const { data: dashboard, isLoading: dashboardLoading } = useQuery({
    queryKey: ['dashboard', id],
    queryFn: async () => {
      return await ClassesApi.getDashboardData(id);
    },
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
  });

  return { dashboard, isLoading: dashboardLoading };
}
