'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { ImportManagement } from '../../_components/import/ImportManagement';
import ProcessTable from '../../_components/import/ProcessTable';
import { ThesisTable } from '../../_components/import/ThesisTable';

export default function GuidanceReviewImportPage() {
  const { id } = useParams();
  return (
    <div className="container space-y-6 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Execute Import</CardTitle>
        </CardHeader>
        <CardContent>
          <ImportManagement classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Phiếu đã import</CardTitle>
        </CardHeader>
        <CardContent>
          <ThesisTable classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tiến trình xử lý</CardTitle>
        </CardHeader>
        <CardContent>
          <ProcessTable classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
        </CardContent>
      </Card>
    </div>
  );
}
