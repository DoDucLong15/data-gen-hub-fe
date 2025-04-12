import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { EntityConfig } from '../../_config/thesis.config';
import { useI18n } from '@/i18n';

interface EntityFormProps {
  config: EntityConfig;
  initialData?: any;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function ThesisForm({ config, initialData, onSubmit, isSubmitting, onCancel }: EntityFormProps) {
  const { t, isReady } = useI18n();

  // Process initial data for date fields before setting up form
  const processedInitialData = { ...initialData };
  if (initialData) {
    config.columns.forEach((column) => {
      if (column.type === 'date' && initialData[column.accessorKey]) {
        // Keep date in the DD/MM/YYYY format, don't try to convert
        processedInitialData[column.accessorKey] = initialData[column.accessorKey];
      }
    });
  }

  const form = useForm({
    resolver: zodResolver(config.formSchema),
    defaultValues: processedInitialData || config.defaultValues,
  });

  // Filter out columns that shouldn't be displayed in the form
  const formColumns = config.columns.filter((column) => column.accessorKey !== 'createdAt');

  // Organize columns into rows for better layout when there are many fields
  const organizeColumnsIntoRows = () => {
    const columnsPerRow = formColumns.length > 6 ? 2 : 1;
    const rows = [];

    for (let i = 0; i < formColumns.length; i += columnsPerRow) {
      rows.push(formColumns.slice(i, i + columnsPerRow));
    }

    return rows;
  };

  const rows = organizeColumnsIntoRows();

  // Function to render the appropriate input type based on column configuration
  const renderInputField = (field: any, column: any) => {
    switch (column.type) {
      case 'textarea':
        return (
          <Textarea
            {...field}
            className="min-h-24 resize-y border-2"
            placeholder={
              column.placeholder || t('THESIS_FORM.INPUT.PLACEHOLDER').replace('{field}', column.header.toLowerCase())
            }
          />
        );
      case 'date':
        // Use a text input with pattern/placeholder for date format DD/MM/YYYY
        return (
          <Input
            {...field}
            type="text"
            className="border-2"
            placeholder={t('THESIS_FORM.DATE.PLACEHOLDER')}
            // Optional: Add pattern validation if needed
            pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
          />
        );
      case 'number':
        return <Input {...field} type="number" className="border-2" />;
      default:
        return (
          <Input
            {...field}
            className="border-2"
            placeholder={
              column.placeholder || t('THESIS_FORM.INPUT.PLACEHOLDER').replace('{field}', column.header.toLowerCase())
            }
          />
        );
    }
  };

  // Handle form submission with any necessary data transformations
  const handleSubmit = (data: any) => {
    // Process data before submitting if needed
    // Date fields remain in DD/MM/YYYY format
    onSubmit(data);
  };

  if (!isReady) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full flex-col">
        {/* Scrollable form content */}
        <div className="max-h-[70vh] overflow-y-auto pr-2 pb-4">
          {rows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {row.map((column) => (
                <FormField
                  key={column.accessorKey}
                  control={form.control}
                  name={column.accessorKey as any}
                  render={({ field }) => (
                    <FormItem className={column.type === 'textarea' ? 'md:col-span-2' : ''}>
                      <FormLabel className="mb-1 block text-base font-bold text-gray-700">{column.header}</FormLabel>
                      <FormControl>{renderInputField(field, column)}</FormControl>
                      {column.type === 'date' && (
                        <p className="mt-1 text-xs text-gray-500">{t('THESIS_FORM.DATE.FORMAT')}</p>
                      )}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Fixed footer with buttons */}
        <div className="mt-auto flex justify-end gap-3 border-t pt-4">
          <Button variant="outline" type="button" onClick={onCancel} className="w-24">
            {t('THESIS_FORM.BUTTONS.CANCEL')}
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-24">
            {initialData ? t('THESIS_FORM.BUTTONS.UPDATE') : t('THESIS_FORM.BUTTONS.CREATE')}
          </Button>
        </div>
      </form>
    </Form>
  );
}
