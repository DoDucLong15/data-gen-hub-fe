// src/app/admin/users/page.tsx
'use client';

import { useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { UsersList } from './_components/UsersList';
import { UserFormDialog } from './_components/UserFormDialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUsers } from '@/hooks/useUsers';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterTable } from './_components/_registers/RegisterTable';
import { useRegisters } from '@/hooks/useRegisters';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { USERS_PAGE } from '@/configs/messages.config';

export default function UsersPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoading, error } = useUsers();
  const [refreshing, setRefreshing] = useState(false);
  const { fetchUsers } = useUsers();
  const { refetch: refetchRegisters } = useRegisters();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUsers(); // force refresh từ server
      toast(USERS_PAGE.TOAST.REFRESH_SUCCESS);
    } catch (error) {
      toast.error(USERS_PAGE.TOAST.REFRESH_ERROR);
    } finally {
      setRefreshing(false);
    }
  };

  if (error) {
    toast.error(USERS_PAGE.TOAST.LOAD_ERROR);
  }

  if (isLoading) return <div>{USERS_PAGE.LOADING}</div>;

  return (
    <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Users }]}>
      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="users" className="w-full space-y-6">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="users" className="px-8 py-3 text-base">
              {USERS_PAGE.TABS.USERS}
            </TabsTrigger>
            <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Users }]}>
              <TabsTrigger value="registers" className="px-8 py-3 text-base">
                {USERS_PAGE.TABS.REGISTERS}
              </TabsTrigger>
            </ProtectedComponent>
          </TabsList>

          <TabsContent value="users" className="mt-6 rounded-lg border p-6">
            <div className="mb-6 flex items-center justify-end">
              <div className="flex gap-2">
                <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Users }]}>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {USERS_PAGE.ACTIONS.ADD_USER}
                  </Button>
                </ProtectedComponent>
                <Button variant="outline" onClick={handleRefresh} disabled={refreshing || isLoading}>
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            <UsersList />
          </TabsContent>

          <TabsContent value="registers" className="mt-6 rounded-lg border p-6">
            <div className="mb-6 flex items-center justify-end">
              <Button variant="outline" onClick={() => refetchRegisters()}>
                <RefreshCw className={`h-4 w-4`} />
              </Button>
            </div>
            <RegisterTable />
          </TabsContent>
        </Tabs>

        <UserFormDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} mode="add" />
      </div>
    </ProtectedComponent>
  );
}
