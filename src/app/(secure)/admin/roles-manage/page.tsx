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

export default function RolesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoading, error } = useUsers();
  const [refreshing, setRefreshing] = useState(false);
  const { refetchRoles } = useRoles();

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetchRoles(); // force refresh từ server
      toast('Đã cập nhật danh sách vai trò');
    } catch (error) {
      toast.error('Không thể làm mới dữ liệu');
    } finally {
      setRefreshing(false);
    }
  };

  if (error) {
    toast.error('Có lỗi xảy ra khi tải dữ liệu vai trò.');
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-6">
      <Tabs defaultValue="roles" className="w-full space-y-6">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="roles" className="px-8 py-3 text-base">
            Danh sách vai trò
          </TabsTrigger>
          <TabsTrigger value="permissions" className="px-8 py-3 text-base">
            Quản lý quyền hạn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roles" className="mt-6 rounded-lg border p-6">
          <div className="mb-6 flex items-center justify-end">
            <div className="flex gap-2">
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm vai trò
              </Button>
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
