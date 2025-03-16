import { useOtherDocumentHistory } from '@/hooks/useOtherDocument';
import { ProcessTable } from '../../../student-list/_components/ProcessTable';
import { Badge } from '@/components/ui/badge';
import { EProgressStatus } from '@/utils/enums/progress.enum';

function HistoryOtherDocument({ classId }: { classId: string }) {
  const { processes, processesIsLoafing } = useOtherDocumentHistory(classId);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case EProgressStatus.COMPLETED:
        return <Badge className="bg-green-500">Completed</Badge>;
      case EProgressStatus.FAILED:
        return <Badge variant="destructive">Failed</Badge>;
      case EProgressStatus.PROCESSING:
        return <Badge className="bg-blue-500">Processing</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return <ProcessTable processes={processes} processesIsLoading={processesIsLoafing} getStatusBadge={getStatusBadge} />;
}
export default HistoryOtherDocument;
