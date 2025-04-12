'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { User } from '@/utils/types/user.type';
import { useAuth } from '@/context/auth.context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { useI18n } from '@/i18n';

interface ProfileFormProps {
  user: User;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ProfileForm({ user, onCancel, onSuccess }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useAuth();
  const { t, isReady } = useI18n();

  const formSchema = z.object({
    name: z
      .string()
      .min(2, {
        message: t('PROFILE_FORM.FORM.NAME.VALIDATION'),
      })
      .optional(),
    email: z.string().email({
      message: t('PROFILE_FORM.FORM.EMAIL.VALIDATION'),
    }),
    phone: z
      .string()
      .min(10, {
        message: t('PROFILE_FORM.FORM.PHONE.VALIDATION'),
      })
      .optional(),
    school: z.string().optional(),
    department: z.string().optional(),
    position: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      school: user?.school || '',
      department: user?.department || '',
      position: user?.position || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      // Cập nhật thông tin người dùng
      await updateUser({
        ...user,
        name: values.name,
        email: values.email,
        phone: values.phone,
        school: values.school,
        department: values.department,
        position: values.position,
      });

      toast.success(t('PROFILE_FORM.TOAST.SUCCESS.TITLE'), {
        description: t('PROFILE_FORM.TOAST.SUCCESS.DESCRIPTION'),
      });

      onSuccess();
    } catch (error) {
      toast.error(t('PROFILE_FORM.TOAST.ERROR.TITLE'), {
        description: t('PROFILE_FORM.TOAST.ERROR.DESCRIPTION'),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isReady) return null;

  return (
    <Card className="bg-card/30 overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-muted/30 border-b pb-6">
        <div className="space-y-1">
          <CardTitle className="text-2xl">{t('PROFILE_FORM.TITLE')}</CardTitle>
          <CardDescription>{t('PROFILE_FORM.DESCRIPTION')}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('PROFILE_FORM.FORM.NAME.LABEL')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('PROFILE_FORM.FORM.NAME.PLACEHOLDER')}
                        {...field}
                        value={field.value || ''}
                      />
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
                    <FormLabel>{t('PROFILE_FORM.FORM.EMAIL.LABEL')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('PROFILE_FORM.FORM.EMAIL.PLACEHOLDER')} {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('PROFILE_FORM.FORM.PHONE.LABEL')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('PROFILE_FORM.FORM.PHONE.PLACEHOLDER')}
                        {...field}
                        value={field.value || ''}
                      />
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
                    <FormLabel>{t('PROFILE_FORM.FORM.SCHOOL.LABEL')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('PROFILE_FORM.FORM.SCHOOL.PLACEHOLDER')}
                        {...field}
                        value={field.value || ''}
                      />
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
                    <FormLabel>{t('PROFILE_FORM.FORM.DEPARTMENT.LABEL')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('PROFILE_FORM.FORM.DEPARTMENT.PLACEHOLDER')}
                        {...field}
                        value={field.value || ''}
                      />
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
                    <FormLabel>{t('PROFILE_FORM.FORM.POSITION.LABEL')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('PROFILE_FORM.FORM.POSITION.PLACEHOLDER')}
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="gap-2">
                <X className="h-4 w-4" />
                {t('PROFILE_FORM.BUTTONS.CANCEL')}
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('PROFILE_FORM.BUTTONS.SAVING')}
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    {t('PROFILE_FORM.BUTTONS.SAVE')}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
