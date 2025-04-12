// components/classes/class-dialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TClass } from '@/utils/types/classes.type';
import { ClassForm } from './ClassForm';
import { useI18n } from '@/i18n';

interface ClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<TClass, 'id'>) => void;
  initialData?: TClass;
  mode?: 'create' | 'edit';
  isSubmitting?: boolean;
}

export function ClassDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  mode = 'create',
  isSubmitting = false,
}: ClassDialogProps) {
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === 'create' ? t('CLASSES.DIALOG.CREATE_TITLE') : t('CLASSES.DIALOG.EDIT_TITLE')}
          </DialogTitle>
        </DialogHeader>
        <ClassForm
          initialData={initialData}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
