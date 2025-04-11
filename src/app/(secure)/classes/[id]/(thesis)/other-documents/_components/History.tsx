import { useOtherDocumentHistory } from '@/hooks/useOtherDocument';
import { ProcessTable } from '../../../student-list/_components/ProcessTable';
import { Badge } from '@/components/ui/badge';
import { EProgressStatus } from '@/utils/enums/progress.enum';
import { THESIS_PAGE } from '@/configs/messages.config';

function HistoryOtherDocument({ classId }: { classId: string }) {
  const { processes, processesIsLoafing } = useOtherDocumentHistory(classId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case EProgressStatus.COMPLETED:
        return <Badge className="bg-green-500">{THESIS_PAGE.OTHER_DOCUMENTS.HISTORY.STATUS.COMPLETED}</Badge>;
      case EProgressStatus.FAILED:
        return <Badge variant="destructive">{THESIS_PAGE.OTHER_DOCUMENTS.HISTORY.STATUS.FAILED}</Badge>;
      case EProgressStatus.PROCESSING:
        return <Badge className="bg-blue-500">{THESIS_PAGE.OTHER_DOCUMENTS.HISTORY.STATUS.PROCESSING}</Badge>;
      default:
        return <Badge variant="outline">{THESIS_PAGE.OTHER_DOCUMENTS.HISTORY.STATUS.PENDING}</Badge>;
    }
  };

  return <ProcessTable processes={processes} processesIsLoading={processesIsLoafing} getStatusBadge={getStatusBadge} />;
}
export default HistoryOtherDocument;
