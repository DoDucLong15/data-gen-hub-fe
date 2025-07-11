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
import { useI18n } from '@/i18n';

export default function UsersPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoading, error } = useUsers();
  const [refreshing, setRefreshing] = useState(false);
  const { fetchUsers } = useUsers();
  const { refetch: refetchRegisters } = useRegisters();
  const { t, isReady } = useI18n();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchUsers(); // force refresh từ server
      toast(t('USERS_PAGE.TOAST.REFRESH_SUCCESS'));
    } catch (error) {
      toast.error(t('USERS_PAGE.TOAST.REFRESH_ERROR'));
    } finally {
      setRefreshing(false);
    }
  };

  if (error) {
    toast.error(t('USERS_PAGE.TOAST.LOAD_ERROR'));
  }

  if (isLoading) return <div>{t('USERS_PAGE.LOADING')}</div>;
  if (!isReady) return null;

  return (
    <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.System_Users }]}>
      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="users" className="w-full space-y-6">
          <TabsList className="w-full justify-start border-b border-gray-200">
            <TabsTrigger
              value="users"
              className="data-[state=active]:text-primary data-[state=active]:after:bg-primary relative rounded-t-md px-8 py-3 text-base font-medium transition-colors data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-800"
            >
              {t('USERS_PAGE.TABS.USERS')}
            </TabsTrigger>
            <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Users }]}>
              <TabsTrigger
                value="registers"
                className="data-[state=active]:text-primary data-[state=active]:after:bg-primary relative rounded-t-md px-8 py-3 text-base font-medium transition-colors data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-0.5 data-[state=active]:after:w-full data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-800"
              >
                {t('USERS_PAGE.TABS.REGISTERS')}
              </TabsTrigger>
            </ProtectedComponent>
          </TabsList>

          <TabsContent value="users" className="rounded-lg border p-6">
            <div className="mb-6 flex items-center justify-end">
              <div className="flex gap-2">
                <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Users }]}>
                  <Button onClick={() => setIsAddDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t('USERS_PAGE.ACTIONS.ADD_USER')}
                  </Button>
                </ProtectedComponent>
                <Button variant="outline" onClick={handleRefresh} disabled={refreshing || isLoading}>
                  <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                </Button>
              </div>
            </div>

            <UsersList />
          </TabsContent>

          <TabsContent value="registers" className="rounded-lg border p-6">
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
