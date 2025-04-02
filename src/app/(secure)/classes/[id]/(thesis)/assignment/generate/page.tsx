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

export default function AssignmentSheetGeneratePage() {
  const { id } = useParams();
  return (
    <div className="container mx-auto space-y-6 py-4">
      <ProtectedComponent
        permissions={[
          { action: EAction.MANAGE, subject: ESubject.Students },
          { action: EAction.MANAGE, subject: ESubject.Thesis_AssignmentSheets },
        ]}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quản lý Template</CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateManagement classId={id as string} thesisType={EThesisDocumentType.ASSIGNMENT_SHEET} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generate Phiếu Giao Nhiệm Vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <GenerateForm classId={id as string} thesisType={EThesisDocumentType.ASSIGNMENT_SHEET} />
            </CardContent>
          </Card>
        </div>
      </ProtectedComponent>

      <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Thesis_AssignmentSheets }]}>
        <Card>
          <CardHeader>
            <CardTitle>Phiếu đã tạo</CardTitle>
          </CardHeader>
          <CardContent>
            <GeneratedSheetsTable classId={id as string} thesisType={EThesisDocumentType.ASSIGNMENT_SHEET} />
          </CardContent>
        </Card>
      </ProtectedComponent>

      <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Progress }]}>
        <Card>
          <CardHeader>
            <CardTitle>Tiến trình xử lý</CardTitle>
          </CardHeader>
          <CardContent>
            <ProcessTable classId={id as string} thesisType={EThesisDocumentType.ASSIGNMENT_SHEET} />
          </CardContent>
        </Card>
      </ProtectedComponent>
    </div>
  );
}
