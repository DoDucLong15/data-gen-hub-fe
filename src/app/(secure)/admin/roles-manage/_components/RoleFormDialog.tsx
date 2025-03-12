// src/components/admin/users/user-form-dialog.tsx
'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { TRole, TRoleFormData } from '@/utils/types/role.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ROLES_QUERY_KEY, useRoles } from '@/hooks/useRoles';
import { Textarea } from '@/components/ui/textarea';

// Zod schema for form validation
const roleFormSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  description: z.string().min(2, { message: 'Mô tả phải có ít nhất 2 ký tự' }).optional(),
});

type RoleFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  roleId?: string;
  mode: 'add' | 'edit';
};

export function RoleFormDialog({ open, onOpenChange, roleId, mode }: RoleFormDialogProps) {
  const queryClient = useQueryClient();
  const { addRole, updateRole } = useRoles();
  const { data: role, isLoading } = useQuery({
    queryKey: [...ROLES_QUERY_KEY, 'role', roleId],
    queryFn: () => {
      const roles: TRole[] | undefined = queryClient.getQueryData(ROLES_QUERY_KEY);
      if (!roles) return null;
      return roles.find((u) => u.id === roleId);
    },
    enabled: !!roleId,
  });

  const form = useForm<z.infer<typeof roleFormSchema>>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && role) {
      form.reset({
        name: role.name,
        description: role.description ?? '',
      });
    } else if (mode === 'add') {
      form.reset({
        name: '',
        description: '',
      });
    }
  }, [role, mode, form]);

  const onSubmit = async (data: z.infer<typeof roleFormSchema>) => {
    try {
      const formData: TRoleFormData = {
        name: data.name,
        description: data.description,
      };

      if (mode === 'add') {
        await addRole(formData);
        toast('Thêm vai trò thành công');
      } else if (mode === 'edit' && roleId) {
        await updateRole(roleId, formData);
        toast('Cập nhật vai trò thành công');
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        mode === 'add' ? 'Không thể thêm vai trò. Vui lòng thử lại.' : 'Không thể cập nhật vai trò. Vui lòng thử lại.',
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="mb-5">
          <DialogTitle>{mode === 'add' ? 'Thêm vai trò mới' : 'Chỉnh sửa vai trò'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Nhập thông tin để tạo vai trò mới.' : 'Cập nhật thông tin vai trò.'}
          </DialogDescription>
        </DialogHeader>

        {isLoading && mode === 'edit' ? (
          <div className="my-4 flex justify-center">Loading role data...</div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên vai trò" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Nhập mô tả vai trò" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Hủy
                </Button>
                <Button type="submit">{mode === 'add' ? 'Thêm vai trò' : 'Lưu thay đổi'}</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
