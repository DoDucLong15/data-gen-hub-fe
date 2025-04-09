import { AdminApi } from '@/apis/admin.api';
import { SYSTEM_CONFIG } from '@/configs/messages.config';
import { TSystemConfig } from '@/utils/types/system-config.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const SYSTEM_CONFIG_QUERY_KEY = ['system-config'];

export const useSystemConfig = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: SYSTEM_CONFIG_QUERY_KEY,
    queryFn: () => AdminApi.getAllSystemConfig(),
    staleTime: 1 * 60 * 1000,
  });

  const createSystemConfigMutation = useMutation({
    mutationFn: (config: TSystemConfig) => AdminApi.createSystemConfig(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SYSTEM_CONFIG_QUERY_KEY });
      toast.success(SYSTEM_CONFIG.CREATE_SUCCESS);
    },
  });

  const updateSystemConfigMutation = useMutation({
    mutationFn: (config: TSystemConfig) => AdminApi.updateSystemConfig(config.key, config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SYSTEM_CONFIG_QUERY_KEY });
      toast.success(SYSTEM_CONFIG.UPDATE_SUCCESS);
    },
  });

  const deleteSystemConfigMutation = useMutation({
    mutationFn: (key: string) => AdminApi.deleteSystemConfig(key),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SYSTEM_CONFIG_QUERY_KEY });
      toast.success(SYSTEM_CONFIG.DELETE_SUCCESS);
    },
  });

  // Wrapper
  const createSystemConfig = async (config: TSystemConfig) => {
    return await createSystemConfigMutation.mutateAsync(config);
  };

  const updateSystemConfig = async (config: TSystemConfig) => {
    return await updateSystemConfigMutation.mutateAsync(config);
  };

  const deleteSystemConfig = async (key: string) => {
    return await deleteSystemConfigMutation.mutateAsync(key);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
    createSystemConfig,
    isCreating: createSystemConfigMutation.isPending,
    updateSystemConfig,
    isUpdating: updateSystemConfigMutation.isPending,
    deleteSystemConfig,
    isDeleting: deleteSystemConfigMutation.isPending,
  };
};
