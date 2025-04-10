// components/classes/class-dialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TClass } from '@/utils/types/classes.type';
import { ClassForm } from './ClassForm';
import { CURRENT_MESSAGES } from '@/configs/messages.config';

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
  const { CLASSES } = CURRENT_MESSAGES;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {mode === 'create' ? CLASSES.DIALOG.CREATE_TITLE : CLASSES.DIALOG.EDIT_TITLE}
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
