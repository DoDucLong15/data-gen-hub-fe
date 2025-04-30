'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { FileExplorer } from './_components/FileExplorer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SyncHistory } from './_components/SyncHistory';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { ESubject } from '@/utils/types/authorization.type';
import { useI18n } from '@/i18n';

export default function FileManagerPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('files');
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  return (
    <div className="container mx-auto space-y-6 py-3">
      <Card>
        <CardContent>
          <Tabs defaultValue="files" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 w-full">
              <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Thesis_GoogleDrive }]}>
                <TabsTrigger value="files" className="flex-1">
                  {t('THESIS_PAGE.DRIVE_INFO.TABS.FILES.LABEL')}
                </TabsTrigger>
              </ProtectedComponent>
              <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Progress }]}>
                <TabsTrigger value="history" className="flex-1">
                  {t('THESIS_PAGE.DRIVE_INFO.TABS.HISTORY.LABEL')}
                </TabsTrigger>
              </ProtectedComponent>
            </TabsList>

            <TabsContent value="files" className="w-full">
              <FileExplorer classId={id as string} />
            </TabsContent>

            <TabsContent value="history" className="w-full">
              <SyncHistory classId={id as string} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
