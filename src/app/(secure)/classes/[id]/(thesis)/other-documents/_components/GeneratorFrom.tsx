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
import { THESIS_PAGE } from '@/configs/messages.config';

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
            <CardTitle>{THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.TITLE}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="space-y-6">
                <FileUpload
                  componentId={`inputFiles-${componentId}`}
                  name="inputFiles"
                  label={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.INPUT_FILES.LABEL}
                  description={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.INPUT_FILES.DESCRIPTION}
                  form={form}
                  multiple
                />
                <Separator />
                <FileUpload
                  componentId={`specificationInput-${componentId}`}
                  name="specificationInput"
                  label={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.SPECIFICATION.LABEL}
                  description={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.INPUT_CONFIG.SPECIFICATION.DESCRIPTION}
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
            <CardTitle>{THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.TITLE}</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <div className="space-y-6">
                <FileUpload
                  componentId={`specificationOutput-${componentId}`}
                  name="specificationOutput"
                  label={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.SPECIFICATION.LABEL}
                  description={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.SPECIFICATION.DESCRIPTION}
                  form={form}
                  accept=".json"
                />
                <Separator />
                <FileUpload
                  componentId={`templateFile-${componentId}`}
                  name="templateFile"
                  label={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.TEMPLATE_FILE.LABEL}
                  description={THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.OUTPUT_CONFIG.TEMPLATE_FILE.DESCRIPTION}
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
          <CardTitle>{THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.NOTIFICATION.TITLE}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <EmailList form={form} componentId={`emailList-${componentId}`} />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting
                  ? THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.NOTIFICATION.SUBMIT.SUBMITTING
                  : THESIS_PAGE.OTHER_DOCUMENTS.GENERATOR_FORM.NOTIFICATION.SUBMIT.LABEL}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
