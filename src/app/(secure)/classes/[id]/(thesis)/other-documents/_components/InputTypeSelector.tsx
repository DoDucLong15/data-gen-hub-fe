// src/components/generator/InputTypeSelector.tsx
'use client';

import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { InputType } from '@/utils/types/other-document.type';
import { GeneratorOtherDocumentFormValues } from '../utils/validations';

interface InputTypeSelectorProps {
  form: UseFormReturn<GeneratorOtherDocumentFormValues>;
}

export function InputTypeSelector({ form }: InputTypeSelectorProps) {
  return (
    <FormField
      control={form.control}
      name="importType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Input Type</FormLabel>
          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4 pt-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={InputType.LIST} id="input-list" />
              <Label htmlFor="input-list">Process as List</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value={InputType.SINGLE} id="input-single" />
              <Label htmlFor="input-single">Process as Single File</Label>
            </div>
          </RadioGroup>
          <FormDescription>Choose how to process input files</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
