'use client';

import { DashboardStats } from './_components/DashboardStats';
import { DashboardCharts } from './_components/DashboardCharts';
import { DashboardDetails } from './_components/DashboardDetails';
import { useParams } from 'next/navigation';
import { useClasses, useDashboard } from '@/hooks/useClasses';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { useI18n } from '@/i18n';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, FileText } from 'lucide-react';

export default function Dashboard() {
  const { id } = useParams();
  const { getById } = useClasses();
  const { data: classDetail, isLoading } = getById(id as string);
  const { dashboard, isLoading: dashboardLoading } = useDashboard(id as string);
  const { t, isReady } = useI18n();

  const inputPaths = classDetail?.studentPaths || [];
  const outputPath = classDetail?.outputPath || '';

  if (isLoading || dashboardLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">{t('THESIS_PAGE.DASHBOARD.LOADING')}</p>
      </div>
    );
  }
  if (!isReady) return null;

  return (
    <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Classes }]}>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <main className="flex-1 p-4">
          <Tabs defaultValue="charts" className="w-full">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">{t('THESIS_PAGE.DASHBOARD.TITLE')}</h1>
              <TabsList className="grid w-[300px] grid-cols-2">
                <TabsTrigger value="charts" className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  <span>{t('THESIS_PAGE.DASHBOARD.TABS.CHARTS')}</span>
                </TabsTrigger>
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{t('THESIS_PAGE.DASHBOARD.TABS.DETAILS')}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="charts" className="space-y-6">
              <DashboardStats inputPaths={inputPaths} outputPath={outputPath} />
              <DashboardCharts dashboard={dashboard} />
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <DashboardDetails inputPaths={inputPaths} outputPath={outputPath} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedComponent>
  );
}
