// src/components/generator/InputTypeSelector.tsx
'use client';

import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { InputType } from '@/utils/types/other-document.type';
import { GeneratorOtherDocumentFormValues } from '../utils/validations';
import { ListFilter, FileInput } from 'lucide-react';
import { THESIS_PAGE } from '@/configs/messages.config';

interface InputTypeSelectorProps {
  form: UseFormReturn<GeneratorOtherDocumentFormValues>;
  componentId: string;
}

export function InputTypeSelector({ form, componentId }: InputTypeSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="importType"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel className="text-lg font-semibold">
            {THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.INPUT_TYPE.LABEL}
          </FormLabel>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            <div
              className={`flex cursor-pointer items-start space-x-4 rounded-lg border-2 p-4 ${field.value === InputType.LIST ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'} `}
              onClick={() => field.onChange(InputType.LIST)}
            >
              <RadioGroupItem value={InputType.LIST} id="input-list" className="mt-1" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <ListFilter className="text-primary h-5 w-5" />
                  <Label htmlFor="input-list" className="font-medium">
                    {THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.INPUT_TYPE.OPTIONS.LIST.LABEL}
                  </Label>
                </div>
                <p className="text-muted-foreground text-sm">
                  {THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.INPUT_TYPE.OPTIONS.LIST.DESCRIPTION}
                </p>
              </div>
            </div>

            <div
              className={`flex cursor-pointer items-start space-x-4 rounded-lg border-2 p-4 ${field.value === InputType.SINGLE ? 'border-primary bg-primary/5' : 'border-muted hover:border-muted-foreground/50'} `}
              onClick={() => field.onChange(InputType.SINGLE)}
            >
              <RadioGroupItem value={InputType.SINGLE} id="input-single" className="mt-1" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <FileInput className="text-primary h-5 w-5" />
                  <Label htmlFor="input-single" className="font-medium">
                    {THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.INPUT_TYPE.OPTIONS.SINGLE.LABEL}
                  </Label>
                </div>
                <p className="text-muted-foreground text-sm">
                  {THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.INPUT_TYPE.OPTIONS.SINGLE.DESCRIPTION}
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
