// components/classes/class-list.tsx
import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TClass } from '@/utils/types/classes.type';
import { ClassCard } from './ClassCard';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { useI18n } from '@/i18n';

interface ClassListProps {
  classes: TClass[];
  isLoading: boolean;
  onRefresh: () => void;
  onAdd: () => void;
  searchQuery?: string;
}

export function ClassList({ classes, isLoading, onRefresh, onAdd, searchQuery }: ClassListProps) {
  const { t, isReady } = useI18n();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isReady) return null;

  if (classes.length === 0) {
    if (searchQuery) {
      return (
        <EmptyState
          title={t('CLASSES.LIST.EMPTY.NO_RESULTS.TITLE')}
          description={t('CLASSES.LIST.EMPTY.NO_RESULTS.DESCRIPTION').replace('{query}', searchQuery)}
          actionLabel={t('CLASSES.LIST.EMPTY.NO_RESULTS.ACTION')}
          onAction={onRefresh}
        />
      );
    }

    return (
      <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.Classes }]}>
        <EmptyState
          title={t('CLASSES.LIST.EMPTY.NO_CLASSES.TITLE')}
          description={t('CLASSES.LIST.EMPTY.NO_CLASSES.DESCRIPTION')}
          actionLabel={t('CLASSES.LIST.EMPTY.NO_CLASSES.ACTION')}
          onAction={onAdd}
        />
      </ProtectedComponent>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <ClassCard key={classItem.id} classItem={classItem} />
        ))}
      </div>
    </div>
  );
}
