import { Button } from '@/components/ui/button';
import { PlusIcon, RefreshCw } from 'lucide-react';

interface ClassPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onRefresh: () => void;
}

export function ClassPageHeader({ title, description, actionLabel, onAction, onRefresh }: ClassPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      <div className="flex gap-2">
        {actionLabel && onAction && (
          <Button onClick={onAction} className="shrink-0">
            <PlusIcon className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
