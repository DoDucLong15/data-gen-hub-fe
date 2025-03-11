// src/components/admin/users/user-form-dialog.tsx
'use client';

import { useEffect, useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { USERS_QUERY_KEY, useUsers } from '@/hooks/useUsers';
import { User, UserFormData } from '@/utils/types/user.type';
import { toast } from 'sonner';
import { UserRole } from '@/configs/role.config';
import { TRole } from '@/utils/types/role.type';
import { AdminApi } from '@/apis/admin.api';
import { capitalizeFirstLetters } from '@/utils/common.util';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Zod schema for form validation
const userFormSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  email: z.string().email({ message: 'Email không hợp lệ' }),
  role: z.enum(['admin', 'teacher']),
  phone: z.string().min(10, { message: 'Số điện thoại không hợp lệ' }).optional(),
  school: z.string().min(2, { message: 'Tên trường không hợp lệ' }).optional(),
  department: z.string().min(2, { message: 'Tên khoa không hợp lệ' }).optional(),
  position: z.string().min(2, { message: 'Chức vụ không hợp lệ' }).optional(),
});

type UserFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  mode: 'add' | 'edit';
};

export function UserFormDialog({ open, onOpenChange, userId, mode }: UserFormDialogProps) {
  const queryClient = useQueryClient();
  const { addUser, updateUser } = useUsers();
  const { data: user, isLoading } = useQuery({
    queryKey: [...USERS_QUERY_KEY, 'user', userId],
    queryFn: () => {
      const users: User[] | undefined = queryClient.getQueryData(USERS_QUERY_KEY)
      if (!users) return null
      return users.find(u => u.id === userId)
    },
    enabled: !!userId
  })

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      role: 'teacher',
      phone: '',
      school: '',
      department: '',
      position: '',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && user) {
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        school: user.school,
        department: user.department,
        position: user.position,
      });
    } else if (mode === 'add') {
      form.reset({
        name: '',
        email: '',
        role: 'teacher',
        phone: '',
        school: '',
        department: '',
        position: '',
      });
    }
  }, [user, mode, form]);

  const onSubmit = async (data: z.infer<typeof userFormSchema>) => {
    try {
      const formData: UserFormData = {
        name: data.name,
        email: data.email,
        role: data.role as UserRole,
        phone: data.phone?.length ? data.phone : undefined,
        school: data.school?.length ? data.school : undefined,
        department: data.department?.length ? data.department : undefined,
        position: data.position?.length ? data.position : undefined,
      };

      if (mode === 'add') {
        await addUser(formData);
        toast('Thêm người thành công');
      } else if (mode === 'edit' && userId) {
        await updateUser(userId, formData);
        toast('Cập nhật người dùng thành công');
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        mode === 'add'
          ? 'Không thể thêm người dùng. Vui lòng thử lại.'
          : 'Không thể cập nhật người dùng. Vui lòng thử lại.',
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className='mb-5'>
          <DialogTitle>{mode === 'add' ? 'Thêm người dùng mới' : 'Chỉnh sửa người dùng'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Nhập thông tin để tạo người dùng mới.' : 'Cập nhật thông tin người dùng.'}
          </DialogDescription>
        </DialogHeader>

        {isLoading && mode === 'edit' ? (
          <div className="my-4 flex justify-center">Loading user data...</div>
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
                      <Input placeholder="Nhập tên người dùng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vai trò" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(UserRole).map((role, index) => (
                          <SelectItem key={index} value={role}>
                            {capitalizeFirstLetters(role)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập số điện thoại" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="school"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trường</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên trường" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Khoa</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tên khoa" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chức vụ</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập chức vụ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Hủy
                </Button>
                <Button type="submit">{mode === 'add' ? 'Thêm người dùng' : 'Lưu thay đổi'}</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
