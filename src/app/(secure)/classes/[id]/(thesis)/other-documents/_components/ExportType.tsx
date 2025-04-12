// src/components/generator/ExportTypeSelector.tsx
'use client';

import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { ExportType } from '@/utils/types/other-document.type';
import { GeneratorOtherDocumentFormValues } from '../utils/validations';
import { FileText, Files } from 'lucide-react';
import { useI18n } from '@/i18n';

interface ExportTypeSelectorProps {
  form: UseFormReturn<GeneratorOtherDocumentFormValues>;
  componentId: string;
}

export function ExportTypeSelector({ form, componentId }: ExportTypeSelectorProps) {
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  return (
    <FormField
      control={form.control}
      name="exportType"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel className="text-lg font-semibold">
            {t('THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.EXPORT_TYPE.LABEL')}
          </FormLabel>
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
                    {t('THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.EXPORT_TYPE.OPTIONS.LIST.LABEL')}
                  </Label>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t('THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.EXPORT_TYPE.OPTIONS.LIST.DESCRIPTION')}
                </p>
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
                    {t('THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.EXPORT_TYPE.OPTIONS.SINGLE.LABEL')}
                  </Label>
                </div>
                <p className="text-muted-foreground text-sm">
                  {t('THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.EXPORT_TYPE.OPTIONS.SINGLE.DESCRIPTION')}
                </p>
              </div>
            </div>
          </RadioGroup>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
