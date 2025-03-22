'use client';

import { useEffect, useState, useRef } from 'react';
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
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { usePermissions } from '@/hooks/usePermissions';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

// Zod schema for form validation
const permissionFormSchema = z.object({
  action: z.string().min(2, { message: 'Hành động phải có ít nhất 2 ký tự' }),
  subject: z.string().min(2, { message: 'Đối tượng phải có ít nhất 2 ký tự' }),
  description: z.string().optional(),
});

type PermissionFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  permissionId?: string;
  mode: 'add' | 'edit';
};

export function PermissionFormDialog({ open, onOpenChange, permissionId, mode }: PermissionFormDialogProps) {
  const { addPermission, updatePermission, permissions, actions, subjects } = usePermissions();
  const [actionSuggestions, setActionSuggestions] = useState<string[]>([]);
  const [subjectSuggestions, setSubjectSuggestions] = useState<string[]>([]);
  const [showActionSuggestions, setShowActionSuggestions] = useState(false);
  const [showSubjectSuggestions, setShowSubjectSuggestions] = useState(false);
  const [isDialogInitialized, setIsDialogInitialized] = useState(false);
  
  const actionInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);

  const permission = permissionId 
    ? permissions?.find((p) => p.id === permissionId)
    : undefined;

  const form = useForm<z.infer<typeof permissionFormSchema>>({
    resolver: zodResolver(permissionFormSchema),
    defaultValues: {
      action: '',
      subject: '',
      description: '',
    },
  });

  useEffect(() => {
    if (open && !isDialogInitialized) {
      setIsDialogInitialized(true);
    }
    
    if (!open) {
      setIsDialogInitialized(false);
      setShowActionSuggestions(false);
      setShowSubjectSuggestions(false);
    }
  }, [open, isDialogInitialized]);

  useEffect(() => {
    if (mode === 'edit' && permission) {
      form.reset({
        action: permission.action,
        subject: permission.subject,
        description: permission.description ?? '',
      });
    } else if (mode === 'add') {
      form.reset({
        action: '',
        subject: '',
        description: '',
      });
    }
  }, [permission, mode, form]);

  const onSubmit = async (data: z.infer<typeof permissionFormSchema>) => {
    try {
      const formData = {
        action: data.action,
        subject: data.subject,
        description: data.description,
      };

      if (mode === 'add') {
        await addPermission(formData);
        toast.success('Thêm quyền thành công');
      } else if (mode === 'edit' && permissionId) {
        await updatePermission(permissionId, formData);
        toast.success('Cập nhật quyền thành công');
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        mode === 'add' ? 'Không thể thêm quyền. Vui lòng thử lại.' : 'Không thể cập nhật quyền. Vui lòng thử lại.',
      );
    }
  };

  const commonActions = ['create', 'read', 'update', 'delete', 'manage'];
  
  const handleActionChange = (value: string) => {
    form.setValue('action', value, { shouldValidate: true });
    
    const allActions = Array.from(new Set([...commonActions, ...(actions || [])]));
    if (value) {
      const filtered = allActions.filter(action => 
        action.toLowerCase().includes(value.toLowerCase())
      );
      setActionSuggestions(filtered);
      setShowActionSuggestions(filtered.length > 0);
    } else {
      setActionSuggestions(allActions);
      setShowActionSuggestions(true);
    }
  };

  const handleSubjectChange = (value: string) => {
    form.setValue('subject', value, { shouldValidate: true });
    
    const allSubjects = subjects || [];
    if (value) {
      const filtered = allSubjects.filter(subject => 
        subject.toLowerCase().includes(value.toLowerCase())
      );
      setSubjectSuggestions(filtered);
      setShowSubjectSuggestions(filtered.length > 0);
    } else {
      setSubjectSuggestions(allSubjects);
      setShowSubjectSuggestions(true);
    }
  };

  const handleActionFocus = () => {
    if (isDialogInitialized) {
      const allActions = Array.from(new Set([...commonActions, ...(actions || [])]));
      setActionSuggestions(allActions);
      setShowActionSuggestions(true);
    }
  };

  const handleSubjectFocus = () => {
    if (isDialogInitialized) {
      const allSubjects = subjects || [];
      setSubjectSuggestions(allSubjects);
      setShowSubjectSuggestions(true);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (actionInputRef.current && !actionInputRef.current.contains(event.target as Node)) {
      setShowActionSuggestions(false);
    }
    if (subjectInputRef.current && !subjectInputRef.current.contains(event.target as Node)) {
      setShowSubjectSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectAction = (action: string) => {
    form.setValue('action', action, { shouldValidate: true });
    setShowActionSuggestions(false);
  };

  const selectSubject = (subject: string) => {
    form.setValue('subject', subject, { shouldValidate: true });
    setShowSubjectSuggestions(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="mb-5">
          <DialogTitle>{mode === 'add' ? 'Thêm quyền mới' : 'Chỉnh sửa quyền'}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? 'Nhập thông tin để tạo quyền mới.' : 'Cập nhật thông tin quyền.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem className="flex flex-col relative">
                  <FormLabel>Hành động</FormLabel>
                  <div className="flex space-x-2" ref={actionInputRef}>
                    <FormControl>
                      <Input
                        placeholder="Chọn hoặc nhập hành động"
                        {...field}
                        onChange={(e) => handleActionChange(e.target.value)}
                        onFocus={handleActionFocus}
                      />
                    </FormControl>
                    {showActionSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50 max-h-32 overflow-auto">
                        {actionSuggestions.map((action) => (
                          <div
                            key={action}
                            className="px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => selectAction(action)}
                          >
                            {action}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="flex flex-col relative">
                  <FormLabel>Đối tượng</FormLabel>
                  <div className="flex space-x-2" ref={subjectInputRef}>
                    <FormControl>
                      <Input
                        placeholder="Chọn hoặc nhập đối tượng"
                        {...field}
                        onChange={(e) => handleSubjectChange(e.target.value)}
                        onFocus={handleSubjectFocus}
                      />
                    </FormControl>
                    {showSubjectSuggestions && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-50 max-h-32 overflow-auto">
                        {subjectSuggestions.map((subject) => (
                          <div
                            key={subject}
                            className="px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            onClick={() => selectSubject(subject)}
                          >
                            {subject}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                    <Textarea 
                      placeholder="Nhập mô tả cho quyền này" 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Hủy
              </Button>
              <Button type="submit">{mode === 'add' ? 'Thêm quyền' : 'Lưu thay đổi'}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}