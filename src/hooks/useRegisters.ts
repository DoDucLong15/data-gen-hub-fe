import { RegisterApi } from '@/apis/register.api';
import { REGISTERS } from '@/configs/messages.config';
import { ApproveData } from '@/utils/types/register.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { USERS_QUERY_KEY } from './useUsers';

const REGISTERS_QUERY_KEY = ['registers'];

export function useRegisters() {
  const queryClient = useQueryClient();

  const {
    data: registers = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: REGISTERS_QUERY_KEY,
    queryFn: () => RegisterApi.getAllRegisters(),
    staleTime: 1000 * 60,
  });

  const approveRegisterMutation = useMutation({
    mutationFn: (data: ApproveData) => RegisterApi.approveRegister(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REGISTERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      toast.success(REGISTERS.APPROVE_SUCCESS);
    },
    onError: () => {
      toast.error(REGISTERS.APPROVE_ERROR);
    },
  });

  const rejectRegisterMutation = useMutation({
    mutationFn: (id: string) => RegisterApi.deleteRegister(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REGISTERS_QUERY_KEY });
      toast.success(REGISTERS.REJECT_SUCCESS);
    },
    onError: () => {
      toast.error(REGISTERS.REJECT_ERROR);
    },
  });

  const approveRegister = async (data: ApproveData) => {
    return await approveRegisterMutation.mutateAsync(data);
  };

  const rejectRegister = async (id: string) => {
    return await rejectRegisterMutation.mutateAsync(id);
  };

  return {
    registers,
    isLoading,
    error,
    refetch,
    approveRegister,
    isApproveRegisterLoading: approveRegisterMutation.isPending,
    rejectRegister,
    isRejectRegisterLoading: rejectRegisterMutation.isPending,
  };
}
