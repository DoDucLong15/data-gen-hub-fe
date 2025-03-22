// src/hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminApi } from '@/apis/admin.api';
import { TRole } from '@/utils/types/role.type';

// Định nghĩa key query để dùng trong toàn ứng dụng
export const ROLES_QUERY_KEY = ['roles'];

export function useRoles() {
  const queryClient = useQueryClient();

  // Fetch roles với React Query
  const {
    data: roles = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ROLES_QUERY_KEY,
    queryFn: () => AdminApi.getAllRoles(),
    staleTime: 5 * 60 * 1000, // Data được coi là "fresh" trong 5 phút
  });

  // Mutation để thêm role mới
  const addRoleMutation = useMutation({
    mutationFn: (roleData: any) => AdminApi.createRole(roleData),
    onSuccess: (newRole) => {
      // Cập nhật cache trong React Query
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
    },
  });

  // Mutation để cập nhật role
  const updateRoleMutation = useMutation({
    mutationFn: ({ id, roleData }: { id: string; roleData: any }) => AdminApi.updateRole(id, roleData),
    onSuccess: (updatedRole) => {
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
    },
  });

  // Mutation để xóa role
  const deleteRoleMutation = useMutation({
    mutationFn: (id: string) => AdminApi.deleteRole(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEY });
    },
  });

  // Hàm wrapper cho các mutation
  const addRole = async (roleData: any) => {
    return addRoleMutation.mutateAsync(roleData);
  };

  const updateRole = async (id: string, roleData: any) => {
    return updateRoleMutation.mutateAsync({ id, roleData });
  };

  const deleteRole = async (id: string) => {
    return deleteRoleMutation.mutateAsync(id);
  };

  return {
    roles,
    isLoading,
    error: error as Error | null,
    refetchRoles: refetch,
    addRole,
    updateRole,
    deleteRole,
    isInitialized: !isLoading && !error,
  };
}
