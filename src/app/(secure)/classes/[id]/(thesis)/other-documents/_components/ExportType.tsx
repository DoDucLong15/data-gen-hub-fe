// src/components/generator/ExportTypeSelector.tsx
'use client';

import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { ExportType } from '@/utils/types/other-document.type';
import { GeneratorOtherDocumentFormValues } from '../utils/validations';
import { FileText, Files } from 'lucide-react';

interface ExportTypeSelectorProps {
  form: UseFormReturn<GeneratorOtherDocumentFormValues>;
  componentId: string;
}

export function ExportTypeSelector({ form, componentId }: ExportTypeSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="exportType"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel className="text-lg font-semibold">Export Type</FormLabel>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div
              className={`flex cursor-pointer items-start space-x-4 rounded-lg border-2 p-4 ${field.value === ExportType.LIST ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'} `}
              onClick={() => field.onChange(ExportType.LIST)}
            >
              <RadioGroupItem value={ExportType.LIST} id="export-list" className="mt-1" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileText className="text-primary h-5 w-5" />
                  <Label htmlFor="export-list" className="font-medium">
                    Export as List
                  </Label>
                </div>
                <p className="text-muted-foreground text-sm">Xuất tất cả dữ liệu vào một file duy nhất</p>
              </div>
            </div>

            <div
              className={`flex cursor-pointer items-start space-x-4 rounded-lg border-2 p-4 ${field.value === ExportType.SINGLE ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'} `}
              onClick={() => field.onChange(ExportType.SINGLE)}
            >
              <RadioGroupItem value={ExportType.SINGLE} id="export-single" className="mt-1" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Files className="text-primary h-5 w-5" />
                  <Label htmlFor="export-single" className="font-medium">
                    Export to Single Files
                  </Label>
                </div>
                <p className="text-muted-foreground text-sm">Xuất mỗi bản ghi thành một file riêng biệt</p>
              </div>
            </div>
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
