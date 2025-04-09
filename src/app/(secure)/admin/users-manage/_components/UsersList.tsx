// src/components/admin/users/users-list.tsx
'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, MoreHorizontal, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { UserFormDialog } from './UserFormDialog';
import { UserDetailDialog } from './UserDetailDialog';
import { useUsers } from '@/hooks/useUsers';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { USERS_LIST } from '@/configs/messages.config';

export function UsersList() {
  const { users, isLoading, deleteUser } = useUsers();
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [userToEdit, setUserToEdit] = useState<string | null>(null);
  const [userToView, setUserToView] = useState<string | null>(null);

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete);
      toast(USERS_LIST.TOAST.DELETE_SUCCESS);
    } catch (error) {
      toast.error(USERS_LIST.TOAST.DELETE_ERROR);
    } finally {
      setUserToDelete(null);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-red-500">{USERS_LIST.TABLE.ROLES.ADMIN}</Badge>;
      default:
        return <Badge>{USERS_LIST.TABLE.ROLES.TEACHER}</Badge>;
    }
  };

  if (isLoading) {
    return <div className="my-8 flex justify-center">{USERS_LIST.LOADING}</div>;
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{USERS_LIST.TABLE.HEADERS.ID}</TableHead>
              <TableHead>{USERS_LIST.TABLE.HEADERS.NAME}</TableHead>
              <TableHead>{USERS_LIST.TABLE.HEADERS.EMAIL}</TableHead>
              <TableHead>{USERS_LIST.TABLE.HEADERS.ROLE}</TableHead>
              <TableHead>{USERS_LIST.TABLE.HEADERS.CREATED_AT}</TableHead>
              <TableHead>{USERS_LIST.TABLE.HEADERS.STATUS}</TableHead>
              <TableHead className="text-right">{USERS_LIST.TABLE.HEADERS.ACTIONS}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id.slice(0, 8)}...</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>{user.createdAt && new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {user.deletedAt ? (
                      <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                        {USERS_LIST.TABLE.STATUS.DELETED}
                      </Badge>
                    ) : (
                      <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        {USERS_LIST.TABLE.STATUS.ACTIVE}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{USERS_LIST.DROPDOWN.LABEL}</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setUserToView(user.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          {USERS_LIST.DROPDOWN.VIEW}
                        </DropdownMenuItem>
                        <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Users }]}>
                          <DropdownMenuItem onClick={() => setUserToEdit(user.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            {USERS_LIST.DROPDOWN.EDIT}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setUserToDelete(user.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {USERS_LIST.DROPDOWN.DELETE}
                          </DropdownMenuItem>
                        </ProtectedComponent>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  {USERS_LIST.TABLE.EMPTY}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete User Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{USERS_LIST.DELETE_DIALOG.TITLE}</AlertDialogTitle>
            <AlertDialogDescription>{USERS_LIST.DELETE_DIALOG.DESCRIPTION}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{USERS_LIST.DELETE_DIALOG.CANCEL}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-500 hover:bg-red-600">
              {USERS_LIST.DELETE_DIALOG.CONFIRM}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit User Dialog */}
      <UserFormDialog
        open={!!userToEdit}
        onOpenChange={(open) => !open && setUserToEdit(null)}
        userId={userToEdit || undefined}
        mode="edit"
      />

      {/* View User Dialog */}
      <UserDetailDialog
        open={!!userToView}
        onOpenChange={(open) => !open && setUserToView(null)}
        userId={userToView || undefined}
      />
    </>
  );
}
