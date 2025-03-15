'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import TemplateManagement from '../../_components/generate/TemplateManagement';
import { useParams } from 'next/navigation';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import GenerateForm from '../../_components/generate/GeneratedForm';
import GeneratedSheetsTable from '../../_components/generate/GeneratedSheetTable';
import ProcessTable from '../../_components/generate/ProcessTable';

export default function GuidanceReviewGeneratePage() {
  const { id } = useParams();
  return (
    <div className="container space-y-6 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quản lý Template</CardTitle>
          </CardHeader>
          <CardContent>
            <TemplateManagement classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generate Phiếu Nhận Xét Hướng Dẫn</CardTitle>
          </CardHeader>
          <CardContent>
            <GenerateForm classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phiếu đã tạo</CardTitle>
        </CardHeader>
        <CardContent>
          <GeneratedSheetsTable classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
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
