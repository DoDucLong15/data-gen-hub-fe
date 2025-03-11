// src/components/admin/users/user-detail-dialog.tsx
'use client'

import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useUser } from '@/hooks/useUser'
import { UserRole } from '@/configs/role.config'

type UserDetailDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId?: string
}

export function UserDetailDialog({ open, onOpenChange, userId }: UserDetailDialogProps) {
  const { user, isLoading } = useUser(userId)

  const getRoleBadge = (role: string) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Badge className="bg-red-500">Admin</Badge>
      default:
        return <Badge>Teacher</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className='mb-5'>
          <DialogTitle>Thông tin người dùng</DialogTitle>
          <DialogDescription>
            Chi tiết về người dùng này.
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center my-4">Loading user data...</div>
        ) : user ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="font-medium">ID:</div>
              <div>{user.id}</div>
              
              <div className="font-medium">Tên:</div>
              <div>{user.name}</div>
              
              <div className="font-medium">Email:</div>
              <div>{user.email}</div>

              <div className="font-medium">Số điện thoại:</div>
              <div>{user.phone}</div>

              <div className="font-medium">Trường học:</div>
              <div>{user.school}</div>

              <div className="font-medium">Khoa:</div>
              <div>{user.department}</div>

              <div className="font-medium">Chức vụ:</div>
              <div>{user.position}</div>
              
              <div className="font-medium">Vai trò:</div>
              <div>{getRoleBadge(user.role)}</div>
              
              <div className="font-medium">Ngày tạo:</div>
              <div>{user.createdAt && new Date(user.createdAt).toLocaleString()}</div>
              
              <div className="font-medium">Cập nhật:</div>
              <div>{user.updatedAt && new Date(user.updatedAt).toLocaleString()}</div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 text-red-500">
            Không thể tải thông tin người dùng.
          </div>
        )}

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}