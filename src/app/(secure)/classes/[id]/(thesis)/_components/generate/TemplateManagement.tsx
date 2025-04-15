'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Upload, FileUp, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGenerateThesis } from '@/hooks/useGenerateThesis';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/i18n';
import { Spinner } from '@/components/ui/spinner';

export default function TemplateManagement({
  classId,
  thesisType,
}: {
  classId: string;
  thesisType: EThesisDocumentType;
}) {
  const { template, uploading, uploadTemplate, downloadTemplate } = useGenerateThesis(thesisType, classId);

  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [fileInputKey, setFileInputKey] = useState<number>(0);
  const [downloadingPath, setDownloadingPath] = useState<string | null>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);
  const { t, isReady } = useI18n();

  const handleExcelUpload = () => {
    if (excelFile) {
      uploadTemplate(excelFile, template?.id!, 'excel');
      setExcelFile(null);
      if (excelInputRef.current) {
        excelInputRef.current.value = '';
      }
      setFileInputKey((prev) => prev + 1);
    }
  };

  const handleJsonUpload = () => {
    if (jsonFile) {
      uploadTemplate(jsonFile, template?.id!, 'json');
      setJsonFile(null);
      if (jsonInputRef.current) {
        jsonInputRef.current.value = '';
      }
      setFileInputKey((prev) => prev + 1);
    }
  };

  const handleDownloadTemplate = async (path: string) => {
    try {
      setDownloadingPath(path);
      await downloadTemplate(path);
    } finally {
      setDownloadingPath(null);
    }
  };

  if (!isReady) return null;

  return (
    <Tabs defaultValue="excel">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="excel">{t('GENERATE_THESIS.TEMPLATE.TABS.EXCEL')}</TabsTrigger>
        <TabsTrigger value="json">{t('GENERATE_THESIS.TEMPLATE.TABS.JSON')}</TabsTrigger>
      </TabsList>

      <TabsContent value="excel" className="space-y-4">
        <Card>
          <CardContent className="pt-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleDownloadTemplate(template?.templateFile!)}
                  disabled={!template?.templateFile || downloadingPath === template?.templateFile}
                  className="flex items-center gap-2"
                >
                  {downloadingPath === template?.templateFile ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {t('GENERATE_THESIS.TEMPLATE.EXCEL.DOWNLOAD_DEFAULT')}
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    key={`excel-input-${fileInputKey}`}
                    ref={excelInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="border-input bg-background flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                    <div className="text-muted-foreground">
                      {excelFile ? excelFile.name : t('GENERATE_THESIS.TEMPLATE.EXCEL.CHOOSE_FILE')}
                    </div>
                    <FileUp className="text-muted-foreground h-4 w-4" />
                  </div>
                </div>
                <Button
                  variant="secondary"
                  disabled={!excelFile || uploading}
                  onClick={handleExcelUpload}
                  className="whitespace-nowrap"
                >
                  {uploading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      {t('GENERATE_THESIS.TEMPLATE.EXCEL.UPLOADING')}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      {t('GENERATE_THESIS.TEMPLATE.EXCEL.UPLOAD_BUTTON')}
                    </>
                  )}
                </Button>
              </div>

              {template?.templateFile && (
                <div className="mt-4 flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm">{template.templateFile}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadTemplate(template?.templateFile!)}
                    disabled={downloadingPath === template?.templateFile}
                    className="ml-2"
                  >
                    {downloadingPath === template?.templateFile ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}

              {!template?.templateFile && (
                <div className="text-muted-foreground mt-4 rounded-md border p-3 text-center">
                  {t('GENERATE_THESIS.TEMPLATE.EXCEL.NO_TEMPLATE')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="json" className="space-y-4">
        <Card>
          <CardContent className="pt-1">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleDownloadTemplate(template?.jsonFile!)}
                  disabled={!template?.jsonFile || downloadingPath === template?.jsonFile}
                  className="flex items-center gap-2"
                >
                  {downloadingPath === template?.jsonFile ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {t('GENERATE_THESIS.TEMPLATE.JSON.DOWNLOAD_DEFAULT')}
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    key={`json-input-${fileInputKey}`}
                    ref={jsonInputRef}
                    type="file"
                    accept=".json"
                    onChange={(e) => setJsonFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="border-input bg-background flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                    <div className="text-muted-foreground">
                      {jsonFile ? jsonFile.name : t('GENERATE_THESIS.TEMPLATE.JSON.CHOOSE_FILE')}
                    </div>
                    <FileUp className="text-muted-foreground h-4 w-4" />
                  </div>
                </div>
                <Button
                  variant="secondary"
                  disabled={!jsonFile || uploading}
                  onClick={handleJsonUpload}
                  className="whitespace-nowrap"
                >
                  {uploading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      {t('GENERATE_THESIS.TEMPLATE.JSON.UPLOADING')}
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      {t('GENERATE_THESIS.TEMPLATE.JSON.UPLOAD_BUTTON')}
                    </>
                  )}
                </Button>
              </div>

              {template?.jsonFile && (
                <div className="mt-4 flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm">{template.jsonFile}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownloadTemplate(template?.jsonFile!)}
                    disabled={downloadingPath === template?.jsonFile}
                    className="ml-2"
                  >
                    {downloadingPath === template?.jsonFile ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              )}

              {!template?.jsonFile && (
                <div className="text-muted-foreground mt-4 rounded-md border p-3 text-center">
                  {t('GENERATE_THESIS.TEMPLATE.JSON.NO_MAPPING')}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
