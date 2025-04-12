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
import { useRoles } from '@/hooks/useRoles';
import { useI18n } from '@/i18n';

type UserFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  mode: 'add' | 'edit';
};

export function UserFormDialog({ open, onOpenChange, userId, mode }: UserFormDialogProps) {
  const queryClient = useQueryClient();
  const { addUser, updateUser } = useUsers();
  const { roles } = useRoles();
  const { data: user, isLoading } = useQuery({
    queryKey: [...USERS_QUERY_KEY, 'user', userId],
    queryFn: () => {
      const users: User[] | undefined = queryClient.getQueryData(USERS_QUERY_KEY);
      if (!users) return null;
      return users.find((u) => u.id === userId);
    },
    enabled: !!userId,
  });
  const { t, isReady } = useI18n();

  // Zod schema for form validation
  const userFormSchema = z.object({
    name: z.string().min(2, { message: t('USER_FORM.FORM.NAME.VALIDATION') }),
    email: z.string().email({ message: t('USER_FORM.FORM.EMAIL.VALIDATION') }),
    roleId: z.string(),
    phone: z
      .string()
      .min(10, { message: t('USER_FORM.FORM.PHONE.VALIDATION') })
      .optional(),
    school: z
      .string()
      .min(2, { message: t('USER_FORM.FORM.SCHOOL.VALIDATION') })
      .optional(),
    department: z
      .string()
      .min(2, { message: t('USER_FORM.FORM.DEPARTMENT.VALIDATION') })
      .optional(),
    position: z
      .string()
      .min(2, { message: t('USER_FORM.FORM.POSITION.VALIDATION') })
      .optional(),
  });

  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: '',
      email: '',
      roleId: '',
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
        phone: user.phone,
        roleId: user.roleId,
        school: user.school,
        department: user.department,
        position: user.position,
      });
    } else if (mode === 'add') {
      form.reset({
        name: '',
        email: '',
        roleId: '',
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
        roleId: data.roleId,
        phone: data.phone?.length ? data.phone : undefined,
        school: data.school?.length ? data.school : undefined,
        department: data.department?.length ? data.department : undefined,
        position: data.position?.length ? data.position : undefined,
      };

      if (mode === 'add') {
        await addUser(formData);
        toast(t('USER_FORM.TOAST.SUCCESS.ADD'));
      } else if (mode === 'edit' && userId) {
        await updateUser(userId, formData);
        toast(t('USER_FORM.TOAST.SUCCESS.UPDATE'));
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(mode === 'add' ? t('USER_FORM.TOAST.ERROR.ADD') : t('USER_FORM.TOAST.ERROR.UPDATE'));
    }
  };

  if (!isReady) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="mb-5">
          <DialogTitle>{mode === 'add' ? t('USER_FORM.TITLE.ADD') : t('USER_FORM.TITLE.EDIT')}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? t('USER_FORM.DESCRIPTION.ADD') : t('USER_FORM.DESCRIPTION.EDIT')}
          </DialogDescription>
        </DialogHeader>

        {isLoading && mode === 'edit' ? (
          <div className="my-4 flex justify-center">{t('USER_FORM.LOADING')}</div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('USER_FORM.FORM.NAME.LABEL')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('USER_FORM.FORM.NAME.PLACEHOLDER')} {...field} />
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
                    <FormLabel>{t('USER_FORM.FORM.EMAIL.LABEL')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('USER_FORM.FORM.EMAIL.PLACEHOLDER')} type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('USER_FORM.FORM.ROLE.LABEL')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('USER_FORM.FORM.ROLE.PLACEHOLDER')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roles.map((role, index) => (
                          <SelectItem key={index} value={role.id}>
                            {capitalizeFirstLetters(role.name)}
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
                    <FormLabel>{t('USER_FORM.FORM.PHONE.LABEL')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('USER_FORM.FORM.PHONE.PLACEHOLDER')} {...field} />
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
                    <FormLabel>{t('USER_FORM.FORM.SCHOOL.LABEL')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('USER_FORM.FORM.SCHOOL.PLACEHOLDER')} {...field} />
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
                    <FormLabel>{t('USER_FORM.FORM.DEPARTMENT.LABEL')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('USER_FORM.FORM.DEPARTMENT.PLACEHOLDER')} {...field} />
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
                    <FormLabel>{t('USER_FORM.FORM.POSITION.LABEL')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('USER_FORM.FORM.POSITION.PLACEHOLDER')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  {t('USER_FORM.BUTTON.CANCEL')}
                </Button>
                <Button type="submit">{mode === 'add' ? t('USER_FORM.BUTTON.ADD') : t('USER_FORM.BUTTON.SAVE')}</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
