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

export function GeneratorForm() {
  const { form, isSubmitting, setIsSubmitting } = useOtherDocumentGeneratorForm();
  const { submitGenerator } = useOtherDocumentGeneratorSubmit({
    onSuccess: (data) => {
      toast.success(`Process ID: ${data.processId}`);
      form.reset();
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
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle>Data Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FileUpload
              name="inputFiles"
              label="Input Files"
              description="Upload your input files"
              form={form}
              multiple
            />

            <Separator />

            <FileUpload
              name="specificationInput"
              label="Input Configuration"
              description="Upload JSON file that defines which fields to extract"
              form={form}
              accept=".json"
            />
            <Separator />

            <InputTypeSelector form={form} />
            <Separator />

            <FileUpload
              name="specificationOutput"
              label="Output Configuration"
              description="Upload JSON file that defines output format"
              form={form}
              accept=".json"
            />
            <Separator />

            <FileUpload
              name="templateFile"
              label="Template File"
              description="Upload template file for data output"
              form={form}
            />
            <Separator />

            <ExportTypeSelector form={form} />
            <Separator />

            <EmailList form={form} />
            <Separator />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Submitting...' : 'Generate Data'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
