// src/components/generator/ExportTypeSelector.tsx
'use client';

import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { ExportType } from '@/utils/types/other-document.type';
import { GeneratorOtherDocumentFormValues } from '../utils/validations';

interface ExportTypeSelectorProps {
  form: UseFormReturn<GeneratorOtherDocumentFormValues>;
}

export function ExportTypeSelector({ form }: ExportTypeSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="exportType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Export Type</FormLabel>
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4 pt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={ExportType.LIST} id="export-list" />
              <Label htmlFor="export-list">Export as List</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={ExportType.SINGLE} id="export-single" />
              <Label htmlFor="export-single">Export to Single Files</Label>
            </div>
          </RadioGroup>
          <FormDescription>Choose how to export the processed data</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
