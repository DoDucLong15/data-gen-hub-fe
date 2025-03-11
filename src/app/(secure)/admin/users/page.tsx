// src/app/admin/users/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { UsersList } from './_components/UsersList'
import { UserFormDialog } from './_components/UserFormDialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useUsers } from '@/hooks/useUsers'

export default function UsersPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const { isLoading, error } = useUsers()

  if (error) {
    toast.error('Có lỗi xảy ra khi tải dữ liệu người dùng.')
  }

  if(isLoading) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-6 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <UsersList />

      <UserFormDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        mode="add"
      />
    </div>
  )
}