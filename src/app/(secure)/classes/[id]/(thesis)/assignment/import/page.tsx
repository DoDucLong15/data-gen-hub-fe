'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { ImportManagement } from '../../_components/import/ImportManagement';
import ProcessTable from '../../_components/import/ProcessTable';
import { ThesisTable } from '../../_components/import/ThesisTable';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { useI18n } from '@/i18n';
import { Upload, FileText, Activity } from 'lucide-react';

export default function AssignmentSheetImportPage() {
  const { id } = useParams();
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  return (
    <div className="container mx-auto space-y-6 py-4">
      <ProtectedComponent
        permissions={[
          { action: EAction.MANAGE, subject: ESubject.Students },
          { action: EAction.MANAGE, subject: ESubject.Thesis_AssignmentSheets },
        ]}
      >
        <Card>
          <CardHeader className="border-b pb-2">
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {t('THESIS_PAGE.ASSIGNMENT.IMPORT.IMPORT_MANAGEMENT')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ImportManagement classId={id as string} thesisType={EThesisDocumentType.ASSIGNMENT_SHEET} />
          </CardContent>
        </Card>
      </ProtectedComponent>

      <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Thesis_AssignmentSheets }]}>
        <Card>
          <CardHeader className="border-b pb-2">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {t('THESIS_PAGE.ASSIGNMENT.IMPORT.IMPORTED_SHEETS')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ThesisTable classId={id as string} thesisType={EThesisDocumentType.ASSIGNMENT_SHEET} />
          </CardContent>
        </Card>
      </ProtectedComponent>

      <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Progress }]}>
        <Card>
          <CardHeader className="border-b pb-2">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {t('THESIS_PAGE.ASSIGNMENT.IMPORT.PROCESS_TABLE')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProcessTable classId={id as string} thesisType={EThesisDocumentType.ASSIGNMENT_SHEET} />
          </CardContent>
        </Card>
      </ProtectedComponent>
    </div>
  );
}
