import React from 'react';
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
import { Register } from '@/utils/types/register.type';
import { useRegisters } from '@/hooks/useRegisters';
import { useI18n } from '@/i18n';

interface RejectDialogProps {
  register: Register;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RejectDialog({ register, open, onOpenChange }: RejectDialogProps) {
  const { rejectRegister, isRejectRegisterLoading } = useRegisters();
  const { t, isReady } = useI18n();

  const handleReject = () => {
    rejectRegister(register.id);
    onOpenChange(false);
  };

  if (!isReady) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('REGISTER_REJECT_DIALOG.TITLE')}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('REGISTER_REJECT_DIALOG.DESCRIPTION').replace('{name}', register.name)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('REGISTER_REJECT_DIALOG.BUTTONS.CANCEL')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReject}
            disabled={isRejectRegisterLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isRejectRegisterLoading
              ? t('REGISTER_REJECT_DIALOG.BUTTONS.REJECTING')
              : t('REGISTER_REJECT_DIALOG.BUTTONS.REJECT')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
