// src/app/admin/users/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import { UsersList } from './_components/UsersList';
import { UserFormDialog } from './_components/UserFormDialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUsers } from '@/hooks/useUsers';

export default function UsersPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { isLoading, error } = useUsers();
  const [refreshing, setRefreshing] = useState(false);
  const { fetchUsers } = useUsers();

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
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
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

      <UserFormDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} mode="add" />
    </div>
  );
}
