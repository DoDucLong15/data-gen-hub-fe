// src/components/generator/GeneratorForm.tsx
'use client';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUpload } from './FileUpload';
import { InputTypeSelector } from './InputTypeSelector';
import { EmailList } from './EmailList';
import { toast } from 'sonner';
import { useOtherDocumentGeneratorForm, useOtherDocumentGeneratorSubmit } from '@/hooks/useOtherDocument';
import { GeneratorOtherDocumentFormValues } from '../utils/validations';
import { ExportTypeSelector } from './ExportType';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';

export function GeneratorForm({ classId }: { classId: string }) {
  const { form, isSubmitting, setIsSubmitting } = useOtherDocumentGeneratorForm();
  const [componentId, setComponentId] = useState(0);
  const { submitGenerator } = useOtherDocumentGeneratorSubmit(classId, {
    onSuccess: (data) => {
      toast.success(`Process ID: ${data.processId}`);
      form.reset();
      setComponentId((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: GeneratorOtherDocumentFormValues) => {
    setIsSubmitting(true);
    try {
      await submitGenerator(data);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card bên trái - Input Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Input Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="space-y-6">
                <FileUpload
                  componentId={`inputFiles-${componentId}`}
                  name="inputFiles"
                  label="Input Files"
                  description="Upload your input files"
                  form={form}
                  multiple
                />
                <Separator />
                <FileUpload
                  componentId={`specificationInput-${componentId}`}
                  name="specificationInput"
                  label="Input Configuration"
                  description="Upload JSON file that defines which fields to extract"
                  form={form}
                  accept=".json"
                />
                <Separator />
                <InputTypeSelector form={form} componentId={`inputType-${componentId}`} />
              </div>
            </Form>
          </CardContent>
        </Card>

        {/* Card bên phải - Output Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Output Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="space-y-6">
                <FileUpload
                  componentId={`specificationOutput-${componentId}`}
                  name="specificationOutput"
                  label="Output Configuration"
                  description="Upload JSON file that defines output format"
                  form={form}
                  accept=".json"
                />
                <Separator />
                <FileUpload
                  componentId={`templateFile-${componentId}`}
                  name="templateFile"
                  label="Template File"
                  description="Upload template file for data output"
                  form={form}
                />
                <Separator />
                <ExportTypeSelector form={form} componentId={`exportType-${componentId}`} />
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Card dưới cùng - Email & Submit */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <EmailList form={form} componentId={`emailList-${componentId}`} />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Submitting...' : 'Generate Data'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
