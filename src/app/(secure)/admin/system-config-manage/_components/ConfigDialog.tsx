import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ConfigForm } from './ConfigForm';
import { TSystemConfig } from '@/utils/types/system-config.type';

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  config?: TSystemConfig;
  onSave: (config: TSystemConfig) => void;
  isLoading?: boolean;
}

export const EditConfigDialog = ({ isOpen, onClose, config, onSave, isLoading = false }: EditDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{config ? 'Edit Configuration' : 'Add New Configuration'}</DialogTitle>
          <DialogDescription>
            {config ? `Editing configuration with key: ${config.key}` : 'Add a new system configuration.'}
          </DialogDescription>
        </DialogHeader>

        <ConfigForm initialData={config} onSubmit={onSave} isLoading={isLoading} />
      </DialogContent>
    </Dialog>
  );
};

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  configKey?: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeleteConfigDialog = ({ isOpen, onClose, configKey, onConfirm, isLoading = false }: DeleteDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the configuration with key: <strong>{configKey}</strong>. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
