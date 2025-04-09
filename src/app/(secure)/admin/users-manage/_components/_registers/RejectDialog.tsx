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
import { REGISTER_REJECT_DIALOG } from '@/configs/messages.config';

interface RejectDialogProps {
  register: Register;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RejectDialog({ register, open, onOpenChange }: RejectDialogProps) {
  const { rejectRegister, isRejectRegisterLoading } = useRegisters();

  const handleReject = () => {
    rejectRegister(register.id);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{REGISTER_REJECT_DIALOG.TITLE}</AlertDialogTitle>
          <AlertDialogDescription>
            {REGISTER_REJECT_DIALOG.DESCRIPTION.replace('{name}', register.name)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{REGISTER_REJECT_DIALOG.BUTTONS.CANCEL}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReject}
            disabled={isRejectRegisterLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isRejectRegisterLoading ? REGISTER_REJECT_DIALOG.BUTTONS.REJECTING : REGISTER_REJECT_DIALOG.BUTTONS.REJECT}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
