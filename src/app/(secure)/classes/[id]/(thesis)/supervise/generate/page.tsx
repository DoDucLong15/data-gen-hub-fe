'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TemplateManagement from '../../_components/generate/TemplateManagement';
import { useParams } from 'next/navigation';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import GenerateForm from '../../_components/generate/GeneratedForm';
import GeneratedSheetsTable from '../../_components/generate/GeneratedSheetTable';
import ProcessTable from '../../_components/generate/ProcessTable';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { useI18n } from '@/i18n';
export default function SupervisoryCommentGeneratePage() {
  const { id } = useParams();
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  return (
    <div className="container mx-auto space-y-6 py-4">
      <ProtectedComponent
        permissions={[
          { action: EAction.MANAGE, subject: ESubject.Students },
          { action: EAction.MANAGE, subject: ESubject.Thesis_SupervisoryComments },
        ]}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('THESIS_PAGE.SUPERVISORY.GENERATE.TEMPLATE_MANAGEMENT')}</CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateManagement classId={id as string} thesisType={EThesisDocumentType.SUPERVISORY_COMMENTS} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('THESIS_PAGE.SUPERVISORY.GENERATE.GENERATE_FORM')}</CardTitle>
            </CardHeader>
            <CardContent>
              <GenerateForm classId={id as string} thesisType={EThesisDocumentType.SUPERVISORY_COMMENTS} />
            </CardContent>
          </Card>
        </div>
      </ProtectedComponent>

      <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Thesis_SupervisoryComments }]}>
        <Card>
          <CardHeader>
            <CardTitle>{t('THESIS_PAGE.SUPERVISORY.GENERATE.GENERATED_SHEETS')}</CardTitle>
          </CardHeader>
          <CardContent>
            <GeneratedSheetsTable classId={id as string} thesisType={EThesisDocumentType.SUPERVISORY_COMMENTS} />
          </CardContent>
        </Card>
      </ProtectedComponent>

      <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Progress }]}>
        <Card>
          <CardHeader>
            <CardTitle>{t('THESIS_PAGE.SUPERVISORY.GENERATE.PROCESS_TABLE')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ProcessTable classId={id as string} thesisType={EThesisDocumentType.SUPERVISORY_COMMENTS} />
          </CardContent>
        </Card>
      </ProtectedComponent>
    </div>
  );
}
