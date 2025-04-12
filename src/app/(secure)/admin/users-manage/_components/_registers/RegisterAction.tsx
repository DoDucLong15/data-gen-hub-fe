import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Register } from '@/utils/types/register.type';
import { ApproveDialog } from './ApproveDialog';
import { RejectDialog } from './RejectDialog';
import { useI18n } from '@/i18n';

interface RegisterActionsProps {
  register: Register;
}

export function RegisterActions({ register }: RegisterActionsProps) {
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const { t, isReady } = useI18n();

  if (!isReady) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 text-green-500"
        onClick={() => setApproveDialogOpen(true)}
      >
        <Check className="h-4 w-4" />
        <span className="sr-only">{t('REGISTER_ACTIONS.BUTTONS.APPROVE.TOOLTIP')}</span>
      </Button>

      <Button
        size="sm"
        variant="outline"
        className="h-8 w-8 p-0 text-red-500"
        onClick={() => setRejectDialogOpen(true)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">{t('REGISTER_ACTIONS.BUTTONS.REJECT.TOOLTIP')}</span>
      </Button>

      <ApproveDialog register={register} open={approveDialogOpen} onOpenChange={setApproveDialogOpen} />

      <RejectDialog register={register} open={rejectDialogOpen} onOpenChange={setRejectDialogOpen} />
    </div>
  );
}
