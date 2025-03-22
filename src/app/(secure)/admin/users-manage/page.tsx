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
      toast('Đã cập nhật danh sách người dùng');
    } catch (error) {
      toast.error('Không thể làm mới dữ liệu');
    } finally {
      setRefreshing(false);
    }
  };

  if (error) {
    toast.error('Có lỗi xảy ra khi tải dữ liệu người dùng.');
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-6">
      <Tabs defaultValue="users" className="w-full space-y-6">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="users" className="px-8 py-3 text-base">
            Danh sách người dùng
          </TabsTrigger>
          <TabsTrigger value="registers" className="px-8 py-3 text-base">
            Đăng ký chờ duyệt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6 rounded-lg border p-6">
          <div className="mb-6 flex items-center justify-end">
            <div className="flex gap-2">
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm người dùng
              </Button>
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
  );
}
