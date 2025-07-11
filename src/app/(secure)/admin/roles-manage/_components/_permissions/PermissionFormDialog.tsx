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
import { useI18n } from '@/i18n';

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
  const { t, isReady } = useI18n();

  const actionInputRef = useRef<HTMLInputElement>(null);
  const subjectInputRef = useRef<HTMLInputElement>(null);

  const permission = permissionId ? permissions?.find((p) => p.id === permissionId) : undefined;

  // Zod schema for form validation
  const permissionFormSchema = z.object({
    action: z.string().min(2, { message: t('PERMISSION_FORM.FORM.ACTION.VALIDATION') }),
    subject: z.string().min(2, { message: t('PERMISSION_FORM.FORM.SUBJECT.VALIDATION') }),
    description: z.string().optional(),
  });

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
        toast.success(t('PERMISSION_FORM.TOAST.SUCCESS.ADD'));
      } else if (mode === 'edit' && permissionId) {
        await updatePermission(permissionId, formData);
        toast.success(t('PERMISSION_FORM.TOAST.SUCCESS.UPDATE'));
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(mode === 'add' ? t('PERMISSION_FORM.TOAST.ERROR.ADD') : t('PERMISSION_FORM.TOAST.ERROR.UPDATE'));
    }
  };

  const commonActions = ['create', 'read', 'update', 'delete', 'manage'];

  const handleActionChange = (value: string) => {
    form.setValue('action', value, { shouldValidate: true });

    const allActions = Array.from(new Set([...commonActions, ...(actions || [])]));
    if (value) {
      const filtered = allActions.filter((action) => action.toLowerCase().includes(value.toLowerCase()));
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
      const filtered = allSubjects.filter((subject) => subject.toLowerCase().includes(value.toLowerCase()));
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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

  if (!isReady) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="mb-5">
          <DialogTitle>{mode === 'add' ? t('PERMISSION_FORM.TITLE.ADD') : t('PERMISSION_FORM.TITLE.EDIT')}</DialogTitle>
          <DialogDescription>
            {mode === 'add' ? t('PERMISSION_FORM.DESCRIPTION.ADD') : t('PERMISSION_FORM.DESCRIPTION.EDIT')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem className="relative flex flex-col">
                  <FormLabel>{t('PERMISSION_FORM.FORM.ACTION.LABEL')}</FormLabel>
                  <div className="flex space-x-2" ref={actionInputRef}>
                    <FormControl>
                      <Input
                        placeholder={t('PERMISSION_FORM.FORM.ACTION.PLACEHOLDER')}
                        {...field}
                        onChange={(e) => handleActionChange(e.target.value)}
                        onFocus={handleActionFocus}
                      />
                    </FormControl>
                    {showActionSuggestions && (
                      <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-32 overflow-auto rounded-md border bg-white shadow-lg dark:bg-gray-800">
                        {actionSuggestions.map((action) => (
                          <div
                            key={action}
                            className="cursor-pointer px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
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
                <FormItem className="relative flex flex-col">
                  <FormLabel>{t('PERMISSION_FORM.FORM.SUBJECT.LABEL')}</FormLabel>
                  <div className="flex space-x-2" ref={subjectInputRef}>
                    <FormControl>
                      <Input
                        placeholder={t('PERMISSION_FORM.FORM.SUBJECT.PLACEHOLDER')}
                        {...field}
                        onChange={(e) => handleSubjectChange(e.target.value)}
                        onFocus={handleSubjectFocus}
                      />
                    </FormControl>
                    {showSubjectSuggestions && (
                      <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-32 overflow-auto rounded-md border bg-white shadow-lg dark:bg-gray-800">
                        {subjectSuggestions.map((subject) => (
                          <div
                            key={subject}
                            className="cursor-pointer px-3 py-1 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
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
                  <FormLabel>{t('PERMISSION_FORM.FORM.DESCRIPTION.LABEL')}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t('PERMISSION_FORM.FORM.DESCRIPTION.PLACEHOLDER')}
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
                {t('PERMISSION_FORM.BUTTON.CANCEL')}
              </Button>
              <Button type="submit">
                {mode === 'add' ? t('PERMISSION_FORM.BUTTON.ADD') : t('PERMISSION_FORM.BUTTON.SAVE')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
