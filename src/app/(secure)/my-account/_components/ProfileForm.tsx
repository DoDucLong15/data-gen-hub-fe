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

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Tên phải có ít nhất 2 ký tự.',
    })
    .optional(),
  email: z.string().email({
    message: 'Vui lòng nhập địa chỉ email hợp lệ.',
  }),
  phone: z
    .string()
    .min(10, {
      message: 'Số điện thoại phải có ít nhất 10 chữ số.',
    })
    .optional(),
  school: z.string().optional(),
  department: z.string().optional(),
  position: z.string().optional(),
});

interface ProfileFormProps {
  user: User;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function ProfileForm({ user, onCancel, onSuccess }: ProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useAuth();

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

      toast.success('Cập nhật thông tin thành công!', {
        description: 'Thông tin cá nhân của bạn đã được cập nhật.',
      });

      onSuccess();
    } catch (error) {
      toast.error('Cập nhật thông tin thất bại!', {
        description: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="bg-card/30 overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-muted/30 border-b pb-6">
        <div className="space-y-1">
          <CardTitle className="text-2xl">Chỉnh sửa thông tin</CardTitle>
          <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
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
                    <FormLabel>Họ và tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nguyễn Văn A" {...field} value={field.value || ''} />
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
                      <Input placeholder="example@email.com" {...field} disabled />
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
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input placeholder="0123456789" {...field} value={field.value || ''} />
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
                    <FormLabel>Trường học</FormLabel>
                    <FormControl>
                      <Input placeholder="Trường của bạn" {...field} value={field.value || ''} />
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
                    <FormLabel>Khoa/Phòng ban</FormLabel>
                    <FormControl>
                      <Input placeholder="Khoa/Phòng ban của bạn" {...field} value={field.value || ''} />
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
                      <Input placeholder="Chức vụ của bạn" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting} className="gap-2">
                <X className="h-4 w-4" />
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Lưu thay đổi
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
