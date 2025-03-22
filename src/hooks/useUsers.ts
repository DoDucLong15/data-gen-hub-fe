// src/hooks/use-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminApi } from '@/apis/admin.api';
import { User } from '@/utils/types/user.type';

// Định nghĩa key query để dùng trong toàn ứng dụng
export const USERS_QUERY_KEY = ['users'];

export function useUsers() {
  const queryClient = useQueryClient();

  // Fetch users với React Query
  const {
    data: users = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: () => AdminApi.getAllUsers(),
    staleTime: 5 * 60 * 1000, // Data được coi là "fresh" trong 5 phút
  });

  // Mutation để thêm user mới
  const addUserMutation = useMutation({
    mutationFn: (userData: any) => AdminApi.createUser(userData),
    onSuccess: (newUser) => {
      // Cập nhật cache trong React Query
      queryClient.setQueryData(USERS_QUERY_KEY, (oldUsers: User[] = []) => [...oldUsers, newUser]);
    },
  });

  // Mutation để cập nhật user
  const updateUserMutation = useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: any }) => AdminApi.updateUser(id, userData),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(USERS_QUERY_KEY, (oldUsers: User[] = []) =>
        oldUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
      );
    },
  });

  // Mutation để xóa user
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => AdminApi.deleteUser(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
  });

  // Hàm wrapper cho các mutation
  const addUser = async (userData: any) => {
    return addUserMutation.mutateAsync(userData);
  };

  const updateUser = async (id: string, userData: any) => {
    return updateUserMutation.mutateAsync({ id, userData });
  };

  const deleteUser = async (id: string) => {
    return deleteUserMutation.mutateAsync(id);
  };

  return {
    users,
    isLoading,
    error: error as Error | null,
    fetchUsers: refetch,
    addUser,
    updateUser,
    deleteUser,
    isInitialized: !isLoading && !error,
  };
}
