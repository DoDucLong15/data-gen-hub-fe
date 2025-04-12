'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Upload } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGenerateThesis } from '@/hooks/useGenerateThesis';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { Card, CardContent } from '@/components/ui/card';
import { useI18n } from '@/i18n';

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
  const { t, isReady } = useI18n();

  const handleExcelUpload = () => {
    if (excelFile) {
      uploadTemplate(excelFile, template?.id!, 'excel');
      setExcelFile(null);
    }
  };

  const handleJsonUpload = () => {
    if (jsonFile) {
      uploadTemplate(jsonFile, template?.id!, 'json');
      setJsonFile(null);
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
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => downloadTemplate(template?.templateFile!)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {t('GENERATE_THESIS.TEMPLATE.EXCEL.DOWNLOAD_DEFAULT')}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Input type="file" accept=".xlsx,.xls" onChange={(e) => setExcelFile(e.target.files?.[0] || null)} />
                <Button
                  variant="secondary"
                  disabled={!excelFile || uploading}
                  onClick={handleExcelUpload}
                  className="whitespace-nowrap"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {t('GENERATE_THESIS.TEMPLATE.EXCEL.UPLOAD_BUTTON')}
                </Button>
              </div>

              {template?.templateFile && (
                <div className="mt-4 flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm">{template.templateFile}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadTemplate(template?.templateFile!)}
                    className="ml-2"
                  >
                    <Download className="h-4 w-4" />
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
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => downloadTemplate(template?.jsonFile!)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  {t('GENERATE_THESIS.TEMPLATE.JSON.DOWNLOAD_DEFAULT')}
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Input type="file" accept=".json" onChange={(e) => setJsonFile(e.target.files?.[0] || null)} />
                <Button
                  variant="secondary"
                  disabled={!jsonFile || uploading}
                  onClick={handleJsonUpload}
                  className="whitespace-nowrap"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {t('GENERATE_THESIS.TEMPLATE.JSON.UPLOAD_BUTTON')}
                </Button>
              </div>

              {template?.jsonFile && (
                <div className="mt-4 flex items-center justify-between rounded-md border p-3">
                  <span className="text-sm">{template.jsonFile}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadTemplate(template?.jsonFile!)}
                    className="ml-2"
                  >
                    <Download className="h-4 w-4" />
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
