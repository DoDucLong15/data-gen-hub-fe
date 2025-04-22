import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FolderInput, FolderOutput, FileText } from 'lucide-react';
import { useI18n } from '@/i18n';
import React from 'react';

export function DashboardDetails({ inputPaths, outputPath }: { inputPaths: string[]; outputPath: string }) {
  const { t } = useI18n();
  return (
    <>
      {/* Danh sách Input Paths */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FolderInput className="h-5 w-5 text-blue-500" />
            {t('THESIS_PAGE.DASHBOARD.INPUT_PATHS.TITLE')}
          </CardTitle>
          <CardDescription>{t('THESIS_PAGE.DASHBOARD.INPUT_PATHS.DESCRIPTION')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Separator />
            <div className="space-y-2">
              {inputPaths.length > 0 ? (
                inputPaths.map((path, index) => (
                  <div
                    key={path || index}
                    className="flex items-center rounded-md border border-gray-100 bg-white p-3 shadow-sm transition-colors hover:bg-gray-50"
                  >
                    <FileText className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="font-medium">{path}</span>
                  </div>
                ))
              ) : (
                <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
                  <p className="text-gray-500">{t('THESIS_PAGE.DASHBOARD.INPUT_PATHS.NO_FILES')}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Output Path */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FolderOutput className="h-5 w-5 text-green-500" />
            {t('THESIS_PAGE.DASHBOARD.OUTPUT_PATH.TITLE')}
          </CardTitle>
          <CardDescription>{t('THESIS_PAGE.DASHBOARD.OUTPUT_PATH.DESCRIPTION')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {outputPath ? (
              <div className="rounded-md border border-green-100 bg-green-50 p-4">
                <div className="flex items-center">
                  <FolderOutput className="mr-2 h-5 w-5 text-green-500" />
                  <span className="font-medium">{outputPath}</span>
                </div>
              </div>
            ) : (
              <div className="flex h-24 items-center justify-center rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
                <p className="text-gray-500">{t('THESIS_PAGE.DASHBOARD.OUTPUT_PATH.NO_OUTPUT')}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
