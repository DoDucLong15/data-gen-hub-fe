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

interface ApproveDialogProps {
  register: Register;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApproveDialog({ register, open, onOpenChange }: ApproveDialogProps) {
  const [selectedRole, setSelectedRole] = useState<TRole | null>(null);
  const { roles } = useRoles();
  const { approveRegister, isApproveRegisterLoading } = useRegisters();

  const handleApprove = () => {
    if (selectedRole) {
      approveRegister({
        id: register.id,
        roleId: selectedRole.id,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Approve Registration</DialogTitle>
          <DialogDescription>Approve {register.name}'s registration and assign a role.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Select
              value={selectedRole?.id}
              onValueChange={(value) => setSelectedRole(roles.find((role) => role.id === value) || null)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a role" />
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
            Cancel
          </Button>
          <Button onClick={handleApprove} disabled={isApproveRegisterLoading}>
            {isApproveRegisterLoading ? 'Approving...' : 'Approve'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
