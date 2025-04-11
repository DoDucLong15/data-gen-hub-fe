// src/components/generator/FileUpload.tsx
'use client';

import { useState } from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { XCircle, Upload } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { GeneratorOtherDocumentFormValues } from '../utils/validations';
import { THESIS_PAGE } from '@/configs/messages.config';

interface FileUploadProps {
  name: keyof GeneratorOtherDocumentFormValues | `${keyof GeneratorOtherDocumentFormValues & string}.${string}`;
  label: string;
  description?: string;
  form: UseFormReturn<GeneratorOtherDocumentFormValues>;
  multiple?: boolean;
  accept?: string;
  componentId: string;
}

export function FileUpload({ name, label, description, form, multiple = false, accept, componentId }: FileUploadProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const filesArray = Array.from(files);
    form.setValue(name as any, multiple ? filesArray : filesArray[0], {
      shouldValidate: true,
    });
    setFileNames(filesArray.map((file) => file.name));
  };

  const handleRemoveFile = (name: string) => {
    const newFileNames = fileNames.filter((fileName) => fileName !== name);
    setFileNames(newFileNames);
    form.setValue(name as any, newFileNames.length ? newFileNames : undefined, {
      shouldValidate: true,
    });
  };

  return (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => document.getElementById(`file-${name}`)?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                {multiple
                  ? THESIS_PAGE.OTHER_DOCUMENTS.FILE_UPLOAD.UPLOAD_FILES
                  : THESIS_PAGE.OTHER_DOCUMENTS.FILE_UPLOAD.UPLOAD_FILE}
              </Button>
            </div>
            <Input
              id={`file-${name}`}
              type="file"
              onChange={handleFileChange}
              multiple={multiple}
              accept={accept}
              className="hidden"
            />
            {fileNames.length > 0 && (
              <div className="text-muted-foreground text-sm">
                {fileNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="truncate">{name}</div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveFile(name)}>
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
