import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Register } from '@/utils/types/register.type';
import { useRoles } from '@/hooks/useRoles';
import { useRegisters } from '@/hooks/useRegisters';
import { TRole } from '@/utils/types/role.type';
import { capitalizeFirstLetters } from '@/utils/common.util';
import { useI18n } from '@/i18n';

interface ApproveDialogProps {
  register: Register;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApproveDialog({ register, open, onOpenChange }: ApproveDialogProps) {
  const [selectedRole, setSelectedRole] = useState<TRole | null>(null);
  const { roles } = useRoles();
  const { approveRegister, isApproveRegisterLoading } = useRegisters();
  const { t, isReady } = useI18n();

  const handleApprove = () => {
    if (selectedRole) {
      approveRegister({
        id: register.id,
        roleId: selectedRole.id,
      });
      onOpenChange(false);
    }
  };

  if (!isReady) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('REGISTER_APPROVE_DIALOG.TITLE')}</DialogTitle>
          <DialogDescription>
            {t('REGISTER_APPROVE_DIALOG.DESCRIPTION').replace('{name}', register.name)}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              {t('REGISTER_APPROVE_DIALOG.FORM.ROLE.LABEL')}
            </Label>
            <Select
              value={selectedRole?.id}
              onValueChange={(value) => setSelectedRole(roles.find((role) => role.id === value) || null)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={t('REGISTER_APPROVE_DIALOG.FORM.ROLE.PLACEHOLDER')} />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {capitalizeFirstLetters(role.name)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t('REGISTER_APPROVE_DIALOG.BUTTONS.CANCEL')}
          </Button>
          <Button onClick={handleApprove} disabled={isApproveRegisterLoading}>
            {isApproveRegisterLoading
              ? t('REGISTER_APPROVE_DIALOG.BUTTONS.APPROVING')
              : t('REGISTER_APPROVE_DIALOG.BUTTONS.APPROVE')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
