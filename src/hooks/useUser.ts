// src/hooks/use-user.ts
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AdminApi } from '@/apis/admin.api'
import { User } from '@/utils/types/user.type'
import { USERS_QUERY_KEY } from './useUsers'


export function useUser(id?: string) {
  const queryClient = useQueryClient()
  
  const {
    data: user,
    isLoading,
    error
  } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!id) return null
      
      // Trước tiên, kiểm tra xem có thể lấy người dùng từ cache không
      const usersCache = queryClient.getQueryData<User[]>(USERS_QUERY_KEY)
      
      if (usersCache) {
        const cachedUser = usersCache.find(u => u.id === id)
        if (cachedUser) {
          return cachedUser
        }
      }
      
      // Nếu không tìm thấy trong cache, gọi API
      return AdminApi.getUserById(id)
    },
    enabled: !!id, // Chỉ chạy query khi có id
    staleTime: 5 * 60 * 1000 // 5 phút
  })
  
  return {
    user: user || null,
    isLoading,
    error: error as Error | null
  }
}