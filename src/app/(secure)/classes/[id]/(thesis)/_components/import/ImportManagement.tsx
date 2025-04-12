'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Download, RefreshCw, FileText, X } from 'lucide-react';
import { toast } from 'sonner';
import { StorageApi } from '@/apis/storage.api';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useImportThesis } from '@/hooks/useImportThesis';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { useI18n } from '@/i18n';
export function ImportManagement({ classId, thesisType }: { classId: string; thesisType: EThesisDocumentType }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const { templateImport, importThesisDoc, isImporting, uploadTemplate } = useImportThesis(thesisType, classId);
  const { t, isReady } = useI18n();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (Array.from(e.target.files).length > 10) {
        toast.error(t('IMPORT_THESIS.IMPORT_SECTION.MAX_FILES_ERROR'));
        return;
      }
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleTemplateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTemplateFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (selectedFiles.length === 0) return;
    try {
      await importThesisDoc(selectedFiles);
      setSelectedFiles([]);
      toast.success(t('IMPORT_THESIS.IMPORT_SECTION.IMPORT_SUCCESS'));
    } catch (error) {
      toast.error(t('IMPORT_THESIS.IMPORT_SECTION.IMPORT_ERROR'));
    }
  };

  const handleTemplateUpload = async () => {
    if (!templateFile) return;
    try {
      if (templateImport) {
        await uploadTemplate(templateFile, templateImport.id);
        setTemplateFile(null);
        toast.success(t('IMPORT_THESIS.TEMPLATE_SECTION.UPLOAD.SUCCESS'));
      }
    } catch (error) {
      toast.error(t('IMPORT_THESIS.TEMPLATE_SECTION.UPLOAD.ERROR'));
    }
  };

  const handleDownloadTemplate = () => {
    if (templateImport?.jsonFile) {
      StorageApi.downloadOneFile(templateImport.jsonFile).catch((error) =>
        toast.error(t('IMPORT_THESIS.TEMPLATE_SECTION.DOWNLOAD.ERROR')),
      );
    } else {
      toast.error(t('IMPORT_THESIS.TEMPLATE_SECTION.DOWNLOAD.NOT_FOUND'));
    }
  };

  if (!isReady) return null;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="import" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="import">{t('IMPORT_THESIS.TABS.IMPORT')}</TabsTrigger>
          <TabsTrigger value="templates">{t('IMPORT_THESIS.TABS.TEMPLATES')}</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="rounded-lg border p-4">
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8">
              <FileText className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-700">{t('IMPORT_THESIS.IMPORT_SECTION.TITLE')}</h3>
              <p className="mb-4 text-center text-sm text-gray-500">{t('IMPORT_THESIS.IMPORT_SECTION.DESCRIPTION')}</p>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="student-files"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".csv,.xlsx,.xls"
                />
                <label
                  htmlFor="student-files"
                  className="bg-primary hover:bg-primary/90 inline-flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {t('IMPORT_THESIS.IMPORT_SECTION.SELECT_FILES')}
                </label>
              </div>
              <span className="mt-2 text-sm text-gray-500">
                {selectedFiles.length
                  ? t('IMPORT_THESIS.IMPORT_SECTION.FILES_SELECTED').replace('{count}', selectedFiles.length.toString())
                  : t('IMPORT_THESIS.IMPORT_SECTION.NO_FILES')}
              </span>
            </div>

            {selectedFiles.length > 0 && (
              <div className="mt-4">
                <h4 className="mb-2 font-medium">{t('IMPORT_THESIS.IMPORT_SECTION.SELECTED_FILES')}</h4>
                <ul className="max-h-32 space-y-1 overflow-y-auto rounded-md border p-2 text-sm">
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="group flex items-center justify-between text-gray-600">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-gray-400" />
                        {file.name}
                      </div>
                      <button
                        onClick={() => {
                          const newFiles = selectedFiles.filter((_, i) => i !== index);
                          setSelectedFiles(newFiles);
                        }}
                        className="hidden h-5 w-5 items-center justify-center rounded-full group-hover:flex hover:bg-gray-100"
                      >
                        <X className="h-3 w-3 text-gray-500" />
                      </button>
                    </li>
                  ))}
                </ul>
                <Button className="mt-4 w-full" onClick={handleImport} disabled={isImporting}>
                  {isImporting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      {t('IMPORT_THESIS.IMPORT_SECTION.IMPORTING')}
                    </>
                  ) : (
                    t('IMPORT_THESIS.IMPORT_SECTION.IMPORT_BUTTON')
                  )}
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="rounded-lg border p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="shadow-lg transition-shadow hover:shadow-xl">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-lg">{t('IMPORT_THESIS.TEMPLATE_SECTION.DOWNLOAD.TITLE')}</CardTitle>
                <CardDescription>{t('IMPORT_THESIS.TEMPLATE_SECTION.DOWNLOAD.SUBTITLE')}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-sm text-gray-600">{t('IMPORT_THESIS.TEMPLATE_SECTION.DOWNLOAD.DESCRIPTION')}</p>
              </CardContent>
              <CardFooter className="border-t bg-gray-50">
                <Button variant="outline" className="w-full" onClick={handleDownloadTemplate}>
                  <Download className="mr-2 h-4 w-4" />
                  {t('IMPORT_THESIS.TEMPLATE_SECTION.DOWNLOAD.BUTTON')}
                </Button>
              </CardFooter>
            </Card>

            <Card className="shadow-lg transition-shadow hover:shadow-xl">
              <CardHeader className="border-b bg-gray-50">
                <CardTitle className="text-lg">{t('IMPORT_THESIS.TEMPLATE_SECTION.UPLOAD.TITLE')}</CardTitle>
                <CardDescription>{t('IMPORT_THESIS.TEMPLATE_SECTION.UPLOAD.SUBTITLE')}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-4 text-sm text-gray-600">{t('IMPORT_THESIS.TEMPLATE_SECTION.UPLOAD.DESCRIPTION')}</p>
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    id="template-file"
                    className="hidden"
                    onChange={handleTemplateChange}
                    accept=".json"
                  />
                  <label
                    htmlFor="template-file"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    <Upload className="h-4 w-4" />
                    {t('IMPORT_THESIS.TEMPLATE_SECTION.UPLOAD.SELECT_BUTTON')}
                  </label>
                </div>
                <span className="mt-2 block truncate text-sm text-gray-500">
                  {templateFile ? templateFile.name : t('IMPORT_THESIS.TEMPLATE_SECTION.UPLOAD.NO_FILE')}
                </span>
              </CardContent>
              <CardFooter className="border-t bg-gray-50">
                <Button className="w-full" onClick={handleTemplateUpload} disabled={!templateFile}>
                  {t('IMPORT_THESIS.TEMPLATE_SECTION.UPLOAD.UPLOAD_BUTTON')}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
