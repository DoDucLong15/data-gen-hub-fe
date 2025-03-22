import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TPermission } from '@/utils/types/permission.type';
import { toast } from 'sonner';
import { AdminApi } from '@/apis/admin.api';

export const PERMISSIONS_QUERY_KEY = ['permissions'];

export type TPermissionFormData = {
  action: string;
  subject: string;
  description?: string;
  fields?: any;
  conditions?: any;
};

export function usePermissions() {
  const queryClient = useQueryClient();

  // Fetch all permissions
  const {
    data: permissions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: PERMISSIONS_QUERY_KEY,
    queryFn: () => AdminApi.getAllPermissions(),
    staleTime: 1000 * 60,
  });

  // Add a new permission
  const addPermissionMutation = useMutation({
    mutationFn: (data: TPermissionFormData) => AdminApi.createPermission(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_QUERY_KEY });
    },
  });

  // Update a permission
  const updatePermissionMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TPermissionFormData }) => AdminApi.updatePermission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_QUERY_KEY });
    },
  });

  // Delete a permission
  const deletePermissionMutation = useMutation({
    mutationFn: (id: string) => AdminApi.deletePermission(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PERMISSIONS_QUERY_KEY });
    },
  });

  // Get subjects and actions for grouping permissions
  const permissionsBySubject = permissions.reduce((acc: Record<string, TPermission[]>, permission) => {
    if (!acc[permission.subject]) {
      acc[permission.subject] = [];
    }
    acc[permission.subject].push(permission);
    return acc;
  }, {});

  const subjects = Object.keys(permissionsBySubject).sort();
  const actions = [...new Set(permissions.map((p) => p.action))].sort();

  // Wrapper for mutations
  const addPermission = async (data: TPermissionFormData) => {
    return await addPermissionMutation.mutateAsync(data);
  };

  const updatePermission = async (id: string, data: TPermissionFormData) => {
    return await updatePermissionMutation.mutateAsync({ id, data });
  };

  const deletePermission = async (id: string) => {
    return await deletePermissionMutation.mutateAsync(id);
  };

  return {
    permissions,
    permissionsBySubject,
    subjects,
    actions,
    refetch,
    isLoading,
    error,
    addPermission,
    updatePermission,
    deletePermission,
  };
}
