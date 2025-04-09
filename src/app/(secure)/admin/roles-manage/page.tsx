// src/app/admin/users/page.tsx
'use client';

import { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUsers } from '@/hooks/useUsers';
import { useRoles } from '@/hooks/useRoles';
import { RolesList } from './_components/RolesList';
import { RoleFormDialog } from './_components/RoleFormDialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PermissionsList } from './_components/_permissions/PermissionList';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ROLES_PAGE } from '@/configs/messages.config';

export default function RolesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoading, error } = useUsers();
  const [refreshing, setRefreshing] = useState(false);
  const { refetchRoles } = useRoles();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchRoles();
      toast(ROLES_PAGE.TOAST.REFRESH_SUCCESS);
    } catch (error) {
      toast.error(ROLES_PAGE.TOAST.REFRESH_ERROR);
    } finally {
      setRefreshing(false);
    }
  };

  if (error) {
    toast.error(ROLES_PAGE.TOAST.LOAD_ERROR);
  }

  if (isLoading) return <div>{ROLES_PAGE.LOADING}</div>;

  return (
    <div className="container mx-auto px-6 py-6">
      <Tabs defaultValue="roles" className="w-full space-y-6">
        <TabsList className="w-full justify-start border-b">
          <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Roles }]}>
            <TabsTrigger value="roles" className="px-8 py-3 text-base">
              {ROLES_PAGE.TABS.ROLES}
            </TabsTrigger>
          </ProtectedComponent>
          <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Permissions }]}>
            <TabsTrigger value="permissions" className="px-8 py-3 text-base">
              {ROLES_PAGE.TABS.PERMISSIONS}
            </TabsTrigger>
          </ProtectedComponent>
        </TabsList>

        <TabsContent value="roles" className="mt-6 rounded-lg border p-6">
          <div className="mb-6 flex items-center justify-end">
            <div className="flex gap-2">
              <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Roles }]}>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  {ROLES_PAGE.ACTIONS.ADD_ROLE}
                </Button>
              </ProtectedComponent>
              <Button variant="outline" onClick={handleRefresh} disabled={refreshing || isLoading}>
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>

          <RolesList />
        </TabsContent>

        <TabsContent value="permissions" className="mt-6 rounded-lg border p-6">
          <PermissionsList />
        </TabsContent>
      </Tabs>

      <RoleFormDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} mode="add" />
    </div>
  );
}
