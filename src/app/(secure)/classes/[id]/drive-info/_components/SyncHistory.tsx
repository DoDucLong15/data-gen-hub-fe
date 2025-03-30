import { Badge } from '@/components/ui/badge';
import { useDriveDataSyncHistory } from '@/hooks/useDrive';
import { EProgressStatus } from '@/utils/enums/progress.enum';
import { ProcessTable } from '../../student-list/_components/ProcessTable';

interface SyncHistoryProps {
  classId: string;
}

export const SyncHistory: React.FC<SyncHistoryProps> = ({ classId }) => {
  const { processes, processesIsLoafing } = useDriveDataSyncHistory(classId);

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
};
