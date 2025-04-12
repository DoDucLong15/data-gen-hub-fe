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
import { Edit, MoreHorizontal, Trash2, Shield, Users, Info, CheckCircle2, Clock, Plus, Key } from 'lucide-react';
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
import { useRoles } from '@/hooks/useRoles';
import { RoleFormDialog } from './RoleFormDialog';
import { capitalizeFirstLetters } from '@/utils/common.util';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { useI18n } from '@/i18n';

export function RolesList() {
  const { roles, isLoading, deleteRole } = useRoles();
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);
  const [roleToEdit, setRoleToEdit] = useState<string | null>(null);
  const { t, isReady } = useI18n();

  const handleDeleteRole = async () => {
    if (!roleToDelete) return;

    try {
      await deleteRole(roleToDelete);
      toast(t('ROLE_LIST.TOAST.DELETE_SUCCESS'));
    } catch (error) {
      toast.error(t('ROLE_LIST.TOAST.DELETE_ERROR'));
    } finally {
      setRoleToDelete(null);
    }
  };

  // Hàm tạo màu ngẫu nhiên nhưng ổn định cho mỗi role
  const getRoleBadgeVariant = (roleName: string): 'default' | 'secondary' | 'outline' | 'destructive' => {
    const variants = ['default', 'secondary', 'outline', 'destructive'] as const;
    const hash = roleName.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return variants[hash % variants.length] ?? 'default';
  };

  // Hàm tạo icon cho mỗi role
  const getRoleIcon = (roleName: string) => {
    const roleLower = roleName.toLowerCase();
    if (roleLower.includes('admin')) return <Shield className="h-4 w-4" />;
    if (roleLower.includes('teacher') || roleLower.includes('giáo viên')) return <Users className="h-4 w-4" />;
    if (roleLower.includes('manager') || roleLower.includes('quản lý')) return <CheckCircle2 className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
  };

  // Tạo ngày cập nhật giả định
  const getLastUpdated = (createdAt?: string) => {
    return createdAt ? new Date(createdAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN');
  };

  if (isLoading) {
    return (
      <div className="my-4 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array(4)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isReady) return null;

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('ROLE_LIST.TABLE.HEADER.ROLE')}</TableHead>
              <TableHead>{t('ROLE_LIST.TABLE.HEADER.DESCRIPTION')}</TableHead>
              <TableHead>{t('ROLE_LIST.TABLE.HEADER.USER_COUNT')}</TableHead>
              <TableHead>{t('ROLE_LIST.TABLE.HEADER.PERMISSION_COUNT')}</TableHead>
              <TableHead>{t('ROLE_LIST.TABLE.HEADER.LAST_UPDATED')}</TableHead>
              <TableHead>{t('ROLE_LIST.TABLE.HEADER.STATUS')}</TableHead>
              <TableHead className="text-right">{t('ROLE_LIST.TABLE.HEADER.ACTIONS')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.length > 0 ? (
              roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={getRoleBadgeVariant(role.name)} className="flex h-7 items-center gap-1 px-2">
                        {getRoleIcon(role.name)}
                        <span>{capitalizeFirstLetters(role.name)}</span>
                      </Badge>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="text-muted-foreground h-4 w-4 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="font-mono text-xs">{role.id}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {role.description ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="cursor-help">
                                {role.description.length > 50
                                  ? `${role.description.slice(0, 50)}...`
                                  : role.description}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm text-wrap">{role.description}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <span className="text-muted-foreground italic">{t('ROLE_LIST.TABLE.NO_DESCRIPTION')}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="text-muted-foreground h-4 w-4" />
                      <span>{role.userCount || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Key className="text-muted-foreground h-4 w-4" />
                      <span>{role.permissions?.length || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="text-muted-foreground h-4 w-4" />
                      <span>{getLastUpdated(role.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={role.id.charCodeAt(0) % 2 === 0 ? 'default' : 'outline'}
                      className={role.id.charCodeAt(0) % 2 === 0 ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      {role.id.charCodeAt(0) % 2 === 0
                        ? t('ROLE_LIST.TABLE.STATUS.ACTIVE')
                        : t('ROLE_LIST.TABLE.STATUS.INACTIVE')}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Roles }]}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{t('ROLE_LIST.DROPDOWN.LABEL')}</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => setRoleToEdit(role.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            {t('ROLE_LIST.DROPDOWN.EDIT')}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setRoleToDelete(role.id)} className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('ROLE_LIST.DROPDOWN.DELETE')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </ProtectedComponent>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  <div className="text-muted-foreground flex flex-col items-center justify-center">
                    <Shield className="mb-2 h-10 w-10 opacity-20" />
                    <p>{t('ROLE_LIST.TABLE.EMPTY.MESSAGE')}</p>
                    <Button variant="outline" className="mt-4" onClick={() => setRoleToEdit('')}>
                      <Plus className="mr-2 h-4 w-4" /> {t('ROLE_LIST.TABLE.EMPTY.ADD_BUTTON')}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Role Dialog */}
      <AlertDialog open={!!roleToDelete} onOpenChange={(open) => !open && setRoleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('ROLE_LIST.DELETE_DIALOG.TITLE')}</AlertDialogTitle>
            <AlertDialogDescription>{t('ROLE_LIST.DELETE_DIALOG.DESCRIPTION')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('ROLE_LIST.DELETE_DIALOG.CANCEL')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-red-500 hover:bg-red-600">
              {t('ROLE_LIST.DELETE_DIALOG.CONFIRM')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Role Dialog */}
      <RoleFormDialog
        open={!!roleToEdit}
        onOpenChange={(open) => !open && setRoleToEdit(null)}
        roleId={roleToEdit || undefined}
        mode="edit"
      />
    </>
  );
}
