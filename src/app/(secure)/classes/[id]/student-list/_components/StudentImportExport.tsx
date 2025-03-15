import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, RefreshCw, AlertCircle, FileText } from 'lucide-react';
import { useStudents } from '@/hooks/useStudents';
import { toast } from 'sonner';
import { StorageApi } from '@/apis/storage.api';
import { EProgressStatus } from '@/utils/enums/progress.enum';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcessTable } from './ProcessTable';

export function ImportExport({ classId }: { classId: string }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const { exportStudents, templateImport, processes, processesIsLoading, importStudents, isImporting, uploadTemplate } =
    useStudents(classId);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
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
      toast.success('Import started successfully');
    } catch (error) {
      toast.error('Import failed. Please try again.');
    }
  };

  const handleTemplateUpload = async () => {
    if (!templateFile) return;
    try {
      if (templateImport) {
        await uploadTemplate(templateFile, templateImport.id);
        setTemplateFile(null);
        toast.success('Template uploaded successfully');
      }
    } catch (error) {
      toast.error('Template upload failed. Please try again.');
    }
  };

  const handleDownloadTemplate = () => {
    if (templateImport?.jsonFile) {
      StorageApi.downloadOneFile(templateImport.jsonFile).catch((error) =>
        toast.error('Failed to download template. Please try again.'),
      );
    } else {
      toast.error('Template not found. Please upload a template');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case EProgressStatus.COMPLETED:
        return <Badge className="bg-green-500">Completed</Badge>;
      case EProgressStatus.FAILED:
        return <Badge variant="destructive">Failed</Badge>;
      case EProgressStatus.PROCESSING:
        return <Badge className="bg-blue-500">Processing</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Import Students</CardTitle>
          <CardDescription>Manage student data imports for your class</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="import" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="import">Import Students</TabsTrigger>
              <TabsTrigger value="templates">Template Management</TabsTrigger>
            </TabsList>

            <TabsContent value="import" className="rounded-lg border p-4">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-8">
                  <FileText className="mb-4 h-12 w-12 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-700">Upload Student Data</h3>
                  <p className="mb-4 text-center text-sm text-gray-500">Drag and drop files here or click to browse</p>
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
                      Select Files
                    </label>
                  </div>
                  <span className="mt-2 text-sm text-gray-500">
                    {selectedFiles.length ? `${selectedFiles.length} files selected` : 'No files selected'}
                  </span>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 font-medium">Selected Files:</h4>
                    <ul className="max-h-32 space-y-1 overflow-y-auto rounded-md border p-2 text-sm">
                      {selectedFiles.map((file, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <FileText className="mr-2 h-4 w-4 text-gray-400" />
                          {file.name}
                        </li>
                      ))}
                    </ul>
                    <Button className="mt-4 w-full" onClick={handleImport} disabled={isImporting}>
                      {isImporting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Importing...
                        </>
                      ) : (
                        'Import Files'
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
                    <CardTitle className="text-lg">Download Template</CardTitle>
                    <CardDescription>Get the standard import template</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="mb-4 text-sm text-gray-600">
                      Download our standard template for student imports. Use this template to format your data
                      correctly.
                    </p>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50">
                    <Button variant="outline" className="w-full" onClick={handleDownloadTemplate}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Template
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="shadow-lg transition-shadow hover:shadow-xl">
                  <CardHeader className="border-b bg-gray-50">
                    <CardTitle className="text-lg">Upload Custom Template</CardTitle>
                    <CardDescription>Use your own template for imports</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="mb-4 text-sm text-gray-600">
                      Upload your own custom template for future imports. The template should be in JSON format.
                    </p>
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
                        Select Template
                      </label>
                    </div>
                    <span className="mt-2 block truncate text-sm text-gray-500">
                      {templateFile ? templateFile.name : 'No file selected'}
                    </span>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50">
                    <Button className="w-full" onClick={handleTemplateUpload} disabled={!templateFile}>
                      Upload Template
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Import Progress</CardTitle>
          <CardDescription>Monitor the status of your import processes</CardDescription>
        </CardHeader>
        <CardContent>
          <ProcessTable processes={processes} processesIsLoading={processesIsLoading} getStatusBadge={getStatusBadge} />
        </CardContent>
      </Card>
    </div>
  );
}
