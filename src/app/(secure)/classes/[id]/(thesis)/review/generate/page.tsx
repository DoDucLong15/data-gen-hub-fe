'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Settings, FileText, Table, Activity, Info } from 'lucide-react';
import TemplateManagement from '../../_components/generate/TemplateManagement';
import { useParams } from 'next/navigation';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import GenerateForm from '../../_components/generate/GeneratedForm';
import GeneratedSheetsTable from '../../_components/generate/GeneratedSheetTable';
import ProcessTable from '../../_components/generate/ProcessTable';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { useI18n } from '@/i18n';

export default function GuidanceReviewGeneratePage() {
  const { id } = useParams();
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  return (
    <div className="container mx-auto space-y-6 py-4">
      <ProtectedComponent
        permissions={[
          { action: EAction.MANAGE, subject: ESubject.Students },
          { action: EAction.MANAGE, subject: ESubject.Thesis_GuidanceReviews },
        ]}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-2">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Settings className="h-4 w-4 text-gray-600" />
                {t('THESIS_PAGE.GUIDANCE.GENERATE.TEMPLATE_MANAGEMENT')}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-3 w-3 cursor-help text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{t('THESIS_PAGE.GUIDANCE.GENERATE.TEMPLATE_MANAGEMENT_TOOLTIP')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TemplateManagement classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
            </CardContent>
          </Card>

          <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
            <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-2">
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <FileText className="h-4 w-4 text-gray-600" />
                {t('THESIS_PAGE.GUIDANCE.GENERATE.GENERATE_FORM')}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="ml-1 h-3 w-3 cursor-help text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{t('THESIS_PAGE.GUIDANCE.GENERATE.GENERATE_FORM_TOOLTIP')}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <GenerateForm classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
            </CardContent>
          </Card>
        </div>
      </ProtectedComponent>

      <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Thesis_GuidanceReviews }]}>
        <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-2">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Table className="h-4 w-4 text-gray-600" />
              {t('THESIS_PAGE.GUIDANCE.GENERATE.GENERATED_SHEETS')}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="ml-1 h-3 w-3 cursor-help text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{t('THESIS_PAGE.GUIDANCE.GENERATE.GENERATED_SHEETS_TOOLTIP')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <GeneratedSheetsTable classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
          </CardContent>
        </Card>
      </ProtectedComponent>

      <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Progress }]}>
        <Card className="border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-2">
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Activity className="h-4 w-4 text-gray-600" />
              {t('THESIS_PAGE.GUIDANCE.GENERATE.PROCESS_TABLE')}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="ml-1 h-3 w-3 cursor-help text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{t('THESIS_PAGE.GUIDANCE.GENERATE.PROCESS_TABLE_TOOLTIP')}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProcessTable classId={id as string} thesisType={EThesisDocumentType.GUIDANCE_REVIEW} />
          </CardContent>
        </Card>
      </ProtectedComponent>
    </div>
  );
}
