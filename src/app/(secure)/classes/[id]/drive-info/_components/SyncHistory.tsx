import { Badge } from '@/components/ui/badge';
import { useDriveDataSyncHistory } from '@/hooks/useDrive';
import { EProgressStatus } from '@/utils/enums/progress.enum';
import { ProcessTable } from '../../student-list/_components/ProcessTable';
import { useI18n } from '@/i18n';

interface SyncHistoryProps {
  classId: string;
}

export const SyncHistory: React.FC<SyncHistoryProps> = ({ classId }) => {
  const { processes, processesIsLoafing } = useDriveDataSyncHistory(classId);
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case EProgressStatus.COMPLETED:
        return <Badge className="bg-green-500">{t('THESIS_PAGE.DRIVE_INFO.SYNC_HISTORY.STATUS.COMPLETED')}</Badge>;
      case EProgressStatus.FAILED:
        return <Badge variant="destructive">{t('THESIS_PAGE.DRIVE_INFO.SYNC_HISTORY.STATUS.FAILED')}</Badge>;
      case EProgressStatus.PROCESSING:
        return <Badge className="bg-blue-500">{t('THESIS_PAGE.DRIVE_INFO.SYNC_HISTORY.STATUS.PROCESSING')}</Badge>;
      default:
        return <Badge variant="outline">{t('THESIS_PAGE.DRIVE_INFO.SYNC_HISTORY.STATUS.PENDING')}</Badge>;
    }
  };

  return <ProcessTable processes={processes} processesIsLoading={processesIsLoafing} getStatusBadge={getStatusBadge} />;
};
