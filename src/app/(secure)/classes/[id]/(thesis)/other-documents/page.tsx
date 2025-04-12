'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneratorForm } from './_components/GeneratorFrom';
import { FileText, History } from 'lucide-react';
import { useParams } from 'next/navigation';
import HistoryOtherDocument from './_components/History';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { useI18n } from '@/i18n';

function OtherDocumentsPage() {
  const { id } = useParams();
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  return (
    <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.Thesis_OtherDocuments }]}>
      <div className="container mx-auto px-6 py-4">
        <Tabs defaultValue="generator" className="space-y-4">
          <TabsList className="w-full">
            <TabsTrigger value="generator" className="flex flex-1 items-center justify-center gap-2">
              <FileText className="h-4 w-4" />
              {t('THESIS_PAGE.OTHER_DOCUMENTS.TABS.GENERATOR.LABEL')}
            </TabsTrigger>
            <TabsTrigger value="history" className="flex flex-1 items-center justify-center gap-2">
              <History className="h-4 w-4" />
              {t('THESIS_PAGE.OTHER_DOCUMENTS.TABS.HISTORY.LABEL')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator">
            <GeneratorForm classId={id as string} />
          </TabsContent>

          <TabsContent value="history">
            <HistoryOtherDocument classId={id as string} />
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedComponent>
  );
}

export default OtherDocumentsPage;
