import { Badge } from '@/components/ui/badge';
import { useDriveDataSyncHistory } from '@/hooks/useDrive';
import { EProgressStatus } from '@/utils/enums/progress.enum';
import { ProcessTable } from '../../student-list/_components/ProcessTable';
import { CURRENT_MESSAGES } from '@/configs/messages.config';

interface SyncHistoryProps {
  classId: string;
}

export const SyncHistory: React.FC<SyncHistoryProps> = ({ classId }) => {
  const { processes, processesIsLoafing } = useDriveDataSyncHistory(classId);
  const { SYNC_HISTORY } = CURRENT_MESSAGES.THESIS_PAGE.DRIVE_INFO;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case EProgressStatus.COMPLETED:
        return <Badge className="bg-green-500">{SYNC_HISTORY.STATUS.COMPLETED}</Badge>;
      case EProgressStatus.FAILED:
        return <Badge variant="destructive">{SYNC_HISTORY.STATUS.FAILED}</Badge>;
      case EProgressStatus.PROCESSING:
        return <Badge className="bg-blue-500">{SYNC_HISTORY.STATUS.PROCESSING}</Badge>;
      default:
        return <Badge variant="outline">{SYNC_HISTORY.STATUS.PENDING}</Badge>;
    }
  };

  return <ProcessTable processes={processes} processesIsLoading={processesIsLoafing} getStatusBadge={getStatusBadge} />;
};
