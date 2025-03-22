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
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will reject {register.name}'s registration request. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleReject}
            disabled={isRejectRegisterLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            {isRejectRegisterLoading ? 'Rejecting...' : 'Reject'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
