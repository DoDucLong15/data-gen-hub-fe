// src/components/generator/EmailList.tsx
'use client';

import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { GeneratorOtherDocumentFormValues } from '../utils/validations';
import { THESIS_PAGE } from '@/configs/messages.config';

interface EmailListProps {
  form: UseFormReturn<GeneratorOtherDocumentFormValues>;
  componentId: string;
}

export function EmailList({ form, componentId }: EmailListProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'shareEmails' as never,
  });

  return (
    <FormField
      control={form.control}
      name="shareEmails"
      render={() => (
        <FormItem>
          <FormLabel>{THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.NOTIFICATION.EMAIL_LIST.LABEL}</FormLabel>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`shareEmails.${index}`}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.NOTIFICATION.EMAIL_LIST.PLACEHOLDER}
                      type="email"
                    />
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    if (fields.length > 1) {
                      remove(index);
                    }
                  }}
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append('')}>
              <Plus className="mr-2 h-4 w-4" />
              {THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.NOTIFICATION.EMAIL_LIST.ADD_BUTTON}
            </Button>
          </div>
          <FormDescription>
            {THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.NOTIFICATION.EMAIL_LIST.DESCRIPTION}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
