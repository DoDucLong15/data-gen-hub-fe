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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { TRole, TRoleFormData } from '@/utils/types/role.type';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ROLES_QUERY_KEY, useRoles } from '@/hooks/useRoles';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePermissions } from '@/hooks/usePermissions';
import { TPermission } from '@/utils/types/permission.type';
import { Loader2 } from 'lucide-react';

// Zod schema for form validation
const roleFormSchema = z.object({
  name: z.string().min(2, { message: 'Tên phải có ít nhất 2 ký tự' }),
  description: z.string().min(2, { message: 'Mô tả phải có ít nhất 2 ký tự' }).optional(),
  permissionIds: z.array(z.string()).optional(),
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
  const { permissions = [], isLoading: isLoadingPermissions } = usePermissions();
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const { data: role, isLoading } = useQuery({
    queryKey: [...ROLES_QUERY_KEY, 'role', roleId],
    queryFn: () => {
      const roles: TRole[] | undefined = queryClient.getQueryData(ROLES_QUERY_KEY);
      if (!roles) return null;
      return roles.find((u) => u.id === roleId);
    },
    enabled: !!roleId && mode === 'edit',
  });

  const form = useForm<z.infer<typeof roleFormSchema>>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: {
      name: '',
      description: '',
      permissionIds: [],
    },
  });

  useEffect(() => {
    if (mode === 'edit' && role) {
      // Ensure we have permissions data before setting values
      const permIds = role.permissions?.map((p) => p.id) || [];

      form.reset({
        name: role.name || '',
        description: role.description || '',
        permissionIds: permIds,
      });

      setSelectedPermissions(permIds);
    } else if (mode === 'add') {
      form.reset({
        name: '',
        description: '',
        permissionIds: [],
      });
      setSelectedPermissions([]);
    }
  }, [role, mode, form]);

  const togglePermission = (permissionId: string) => {
    const newSelection = selectedPermissions.includes(permissionId)
      ? selectedPermissions.filter((id) => id !== permissionId)
      : [...selectedPermissions, permissionId];

    setSelectedPermissions(newSelection);
    form.setValue('permissionIds', newSelection, { shouldValidate: true });
  };

  const selectAllPermissions = () => {
    const allPermissionIds = permissions.map((p) => p.id);
    setSelectedPermissions(allPermissionIds);
    form.setValue('permissionIds', allPermissionIds, { shouldValidate: true });
  };

  const deselectAllPermissions = () => {
    setSelectedPermissions([]);
    form.setValue('permissionIds', [], { shouldValidate: true });
  };

  const onSubmit = async (data: z.infer<typeof roleFormSchema>) => {
    try {
      const formData: TRoleFormData = {
        name: data.name,
        description: data.description,
        permissionIds: selectedPermissions,
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

  // Group permissions by module/group if available
  const groupedPermissions = permissions.reduce((groups: Record<string, TPermission[]>, permission) => {
    const group = permission.subject;
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(permission);
    return groups;
  }, {});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90vh] flex-col overflow-hidden sm:max-w-[625px]">
        <DialogHeader className="mb-4">
          <DialogTitle>{mode === 'add' ? 'Thêm vai trò mới' : 'Chỉnh sửa vai trò'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Nhập thông tin để tạo vai trò mới.' : 'Cập nhật thông tin vai trò.'}
          </DialogDescription>
        </DialogHeader>

        {(isLoading && mode === 'edit') || isLoadingPermissions ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
            <span className="ml-2">Đang tải dữ liệu...</span>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1 flex-col space-y-4 overflow-hidden">
              <div className="space-y-4">
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
                        <Textarea placeholder="Nhập mô tả vai trò" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="permissionIds"
                render={() => (
                  <FormItem className="flex flex-1 flex-col overflow-hidden">
                    <div className="flex items-center justify-between">
                      <FormLabel>Quyền</FormLabel>
                      <div className="space-x-2">
                        <Button type="button" variant="outline" size="sm" onClick={deselectAllPermissions}>
                          Bỏ chọn tất cả
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={selectAllPermissions}>
                          Chọn tất cả
                        </Button>
                      </div>
                    </div>
                    <FormControl>
                      <div className="flex flex-1 flex-col overflow-hidden rounded-md border p-3">
                        <ScrollArea className="h-[300px] pr-3" type="always">
                          <div className="space-y-4">
                            {Object.entries(groupedPermissions).map(([group, perms]) => (
                              <div key={group} className="pb-3">
                                <h4 className="mb-2 text-sm font-semibold">{group}</h4>
                                <div className="grid grid-cols-2 gap-2">
                                  {perms.map((permission) => (
                                    <div key={permission.id} className="flex items-start space-x-2">
                                      <Checkbox
                                        id={`permission-${permission.id}`}
                                        checked={selectedPermissions.includes(permission.id)}
                                        onCheckedChange={() => togglePermission(permission.id)}
                                        className="mt-0.5"
                                      />
                                      <label htmlFor={`permission-${permission.id}`} className="cursor-pointer text-sm">
                                        <div className="font-medium">{permission.action}</div>
                                        {permission.description && (
                                          <div className="text-muted-foreground mt-0.5 text-xs">
                                            {permission.description}
                                          </div>
                                        )}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
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
