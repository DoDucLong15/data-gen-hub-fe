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
import { useI18n } from '@/i18n';

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  config?: TSystemConfig;
  onSave: (config: TSystemConfig) => void;
  isLoading?: boolean;
}

export const EditConfigDialog = ({ isOpen, onClose, config, onSave, isLoading = false }: EditDialogProps) => {
  const { t, isReady } = useI18n();
  if (!isReady) return null;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {config ? t('SYSTEM_CONFIG_PAGE.FORM.TITLE.EDIT') : t('SYSTEM_CONFIG_PAGE.FORM.TITLE.ADD')}
          </DialogTitle>
          <DialogDescription>
            {config
              ? t('SYSTEM_CONFIG_PAGE.FORM.DESCRIPTION.EDIT').replace('{key}', config.key)
              : t('SYSTEM_CONFIG_PAGE.FORM.DESCRIPTION.ADD')}
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
  const { t, isReady } = useI18n();
  if (!isReady) return null;
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('SYSTEM_CONFIG_PAGE.DELETE_DIALOG.TITLE')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('SYSTEM_CONFIG_PAGE.DELETE_DIALOG.DESCRIPTION').replace('{key}', configKey || '')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>{t('SYSTEM_CONFIG_PAGE.DELETE_DIALOG.CANCEL')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-destructive hover:bg-destructive/90 text-white"
          >
            {isLoading ? t('SYSTEM_CONFIG_PAGE.DELETE_DIALOG.DELETING') : t('SYSTEM_CONFIG_PAGE.DELETE_DIALOG.CONFIRM')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
