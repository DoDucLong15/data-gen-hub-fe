import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, RefreshCw, AlertCircle, FileText, X } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { toast } from 'sonner';
import { StorageApi } from '@/apis/storage.api';
import { EProgressAction, EProgressStatus } from '@/utils/enums/progress.enum';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcessTable } from './ProcessTable';
import { useI18n } from '@/i18n';
import { TemplateSpecificationApi } from '@/apis/template-specification.api';

export function ImportExport({ classId }: { classId: string }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [isDownloadingTemplate, setIsDownloadingTemplate] = useState(false);
  const [isDownloadingDefault, setIsDownloadingDefault] = useState(false);
  const [isUploadingTemplate, setIsUploadingTemplate] = useState(false);
  const { templateImport, processes, processesIsLoading, importStudents, isImporting, uploadTemplate } =
    useStudents(classId);
  const { t, isReady } = useI18n();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (Array.from(e.target.files).length > 10) {
        toast.error(t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.MAX_FILES_ERROR'));
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
      await importStudents(selectedFiles);
      setSelectedFiles([]);
      toast.success(t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.IMPORT_SUCCESS'));
    } catch (error) {
      toast.error(t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.IMPORT_ERROR'));
    }
  };

  const handleTemplateUpload = async () => {
    if (!templateFile) return;
    try {
      setIsUploadingTemplate(true);
      if (templateImport) {
        await uploadTemplate(templateFile, templateImport.id);
        setTemplateFile(null);
        toast.success(t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.SUCCESS'));
      }
    } catch (error) {
      toast.error(t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.ERROR'));
    } finally {
      setIsUploadingTemplate(false);
    }
  };

  const handleDownloadTemplate = async () => {
    if (templateImport?.jsonFile) {
      try {
        setIsDownloadingTemplate(true);
        await StorageApi.downloadOneFile(templateImport.jsonFile);
      } catch (error) {
        toast.error(t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.DOWNLOAD.ERROR'));
      } finally {
        setIsDownloadingTemplate(false);
      }
    } else {
      toast.error(t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.DOWNLOAD.NOT_FOUND'));
    }
  };

  const handleDownloadDefault = async () => {
    try {
      setIsDownloadingDefault(true);
      await TemplateSpecificationApi.downloadDefault({
        name: 'DSSV',
        action: EProgressAction.IMPORT,
      });
    } catch (error) {
      toast.error(t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.DOWNLOAD.ERROR'));
    } finally {
      setIsDownloadingDefault(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case EProgressStatus.COMPLETED:
        return (
          <Badge className="bg-green-500">
            {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.PROGRESS.STATUS.COMPLETED')}
          </Badge>
        );
      case EProgressStatus.FAILED:
        return (
          <Badge variant="destructive">
            {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.PROGRESS.STATUS.FAILED')}
          </Badge>
        );
      case EProgressStatus.PROCESSING:
        return (
          <Badge className="bg-blue-500">
            {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.PROGRESS.STATUS.PROCESSING')}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.PROGRESS.STATUS.PENDING')}</Badge>
        );
    }
  };

  if (!isReady) return null;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-50">
        <CardHeader className="border-b border-slate-300 bg-slate-100/80">
          <CardTitle className="text-2xl">{t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TITLE')}</CardTitle>
          <CardDescription>{t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.DESCRIPTION')}</CardDescription>
        </CardHeader>
        <CardContent className="bg-slate-50">
          <Tabs defaultValue="import" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="import">{t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TABS.IMPORT')}</TabsTrigger>
              <TabsTrigger value="templates">
                {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TABS.TEMPLATES')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="import" className="rounded-lg border border-slate-300 bg-slate-100/60 p-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8">
                  <FileText className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-700">
                    {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.TITLE')}
                  </h3>
                  <p className="mb-4 text-center text-sm text-gray-500">
                    {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.DESCRIPTION')}
                  </p>
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
                      {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.SELECT_FILES')}
                    </label>
                  </div>
                  <span className="mt-2 text-sm text-gray-500">
                    {selectedFiles.length
                      ? t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.FILES_SELECTED').replace(
                          '{count}',
                          selectedFiles.length.toString(),
                        )
                      : t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.NO_FILES')}
                  </span>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 font-medium">
                      {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.SELECTED_FILES')}
                    </h4>
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
                          {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.IMPORTING')}
                        </>
                      ) : (
                        t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.UPLOAD_SECTION.IMPORT_BUTTON')
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="rounded-lg border border-slate-300 bg-slate-100/60 p-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Card className="border border-slate-400 bg-white shadow-md transition-shadow hover:shadow-lg">
                  <CardHeader className="border-b border-slate-300 bg-slate-100/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.DOWNLOAD.TITLE')}
                        </CardTitle>
                        <CardDescription>
                          {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.DOWNLOAD.SUBTITLE')}
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadDefault}
                        disabled={isDownloadingDefault}
                      >
                        {isDownloadingDefault ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="mr-2 h-4 w-4" />
                        )}
                        {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.DOWNLOAD.DEFAULT_BUTTON')}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="mb-4 text-sm text-gray-600">
                      {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.DOWNLOAD.DESCRIPTION')}
                    </p>
                    <p className="text-sm font-bold text-gray-500">
                      Path: {templateImport ? templateImport.jsonFile : 'None'}
                    </p>
                  </CardContent>
                  <CardFooter className="border-t border-slate-300 bg-slate-100/50">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleDownloadTemplate}
                      disabled={isDownloadingTemplate}
                    >
                      {isDownloadingTemplate ? (
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.DOWNLOAD.BUTTON')}
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border border-slate-400 bg-white shadow-md transition-shadow hover:shadow-lg">
                  <CardHeader className="border-b border-slate-300 bg-slate-100/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">
                          {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.TITLE')}
                        </CardTitle>
                        <CardDescription>
                          {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.SUBTITLE')}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="mb-4 text-sm text-gray-600">
                      {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.DESCRIPTION')}
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="file"
                        id="template-file"
                        className="hidden"
                        onChange={handleTemplateChange}
                        accept=".json"
                        disabled={isUploadingTemplate}
                      />
                      <label
                        htmlFor="template-file"
                        className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-gray-800 ${
                          isUploadingTemplate ? 'cursor-not-allowed bg-gray-200' : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        <Upload className="h-4 w-4" />
                        {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.SELECT_BUTTON')}
                      </label>
                    </div>
                    <span className="mt-2 block truncate text-sm text-gray-500">
                      {templateFile
                        ? templateFile.name
                        : t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.NO_FILE')}
                    </span>
                  </CardContent>
                  <CardFooter className="border-t border-slate-300 bg-slate-100/50">
                    <Button
                      className="w-full"
                      onClick={handleTemplateUpload}
                      disabled={!templateFile || isUploadingTemplate}
                    >
                      {isUploadingTemplate ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          {t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.UPLOADING')}
                        </>
                      ) : (
                        t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.TEMPLATE.UPLOAD.UPLOAD_BUTTON')
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border border-slate-300 shadow-md">
        <CardHeader className="border-b border-slate-200 bg-slate-50/80">
          <CardTitle>{t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.PROGRESS.TITLE')}</CardTitle>
          <CardDescription>{t('THESIS_PAGE.STUDENT_LIST.IMPORT_EXPORT.IMPORT.PROGRESS.DESCRIPTION')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ProcessTable processes={processes} processesIsLoading={processesIsLoading} getStatusBadge={getStatusBadge} />
        </CardContent>
      </Card>
    </div>
  );
}
