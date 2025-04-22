import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderInput, FolderOutput, FileText } from 'lucide-react';
import { useI18n } from '@/i18n';
import React from 'react';

export function DashboardStats({ inputPaths, outputPath }: { inputPaths: string[]; outputPath: string }) {
  const { t } = useI18n();
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="shadow-sm transition-shadow hover:shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{t('THESIS_PAGE.DASHBOARD.STATS.TOTAL_INPUT_FILES')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
              <FolderInput className="h-5 w-5 text-blue-500" />
            </div>
            <span className="ml-4 text-3xl font-bold text-blue-600">{inputPaths.length}</span>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm transition-shadow hover:shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{t('THESIS_PAGE.DASHBOARD.STATS.OUTPUT_FILES')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-50">
              <FolderOutput className="h-5 w-5 text-green-500" />
            </div>
            <span className="ml-4 text-3xl font-bold text-green-600">{outputPath ? 1 : 0}</span>
          </div>
        </CardContent>
      </Card>
      <Card className="shadow-sm transition-shadow hover:shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">{t('THESIS_PAGE.DASHBOARD.STATS.STATUS')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50">
              <FileText className="h-5 w-5 text-purple-500" />
            </div>
            <span className="ml-4 text-lg font-bold text-purple-600">
              {inputPaths.length > 0 && outputPath
                ? t('THESIS_PAGE.DASHBOARD.STATS.PROCESSED')
                : t('THESIS_PAGE.DASHBOARD.STATS.NOT_PROCESSED')}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
