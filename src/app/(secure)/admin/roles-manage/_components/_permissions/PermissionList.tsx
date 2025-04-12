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
import { Edit, MoreHorizontal, Trash2, Key, Plus, Search, Filter, RefreshCw } from 'lucide-react';
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
import { usePermissions } from '@/hooks/usePermissions';
import { PermissionFormDialog } from './PermissionFormDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ESubject } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { EAction } from '@/utils/types/authorization.type';
import { useI18n } from '@/i18n';

export function PermissionsList() {
  const { permissions, permissionsBySubject, subjects, isLoading, deletePermission, refetch } = usePermissions();
  const [permissionToDelete, setPermissionToDelete] = useState<string | null>(null);
  const [permissionToEdit, setPermissionToEdit] = useState<string | null>(null);
  const [showAddPermission, setShowAddPermission] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [refreshing, setRefreshing] = useState(false);
  const { t, isReady } = useI18n();

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
      toast(t('PERMISSION_LIST.TOAST.REFRESH_SUCCESS'));
    } catch (error) {
      toast.error(t('PERMISSION_LIST.TOAST.REFRESH_ERROR'));
    } finally {
      setRefreshing(false);
    }
  };

  const handleDeletePermission = async () => {
    if (!permissionToDelete) return;

    try {
      await deletePermission(permissionToDelete);
      toast.success(t('PERMISSION_LIST.TOAST.DELETE_SUCCESS'));
    } catch (error) {
      toast.error(t('PERMISSION_LIST.TOAST.DELETE_ERROR'));
    } finally {
      setPermissionToDelete(null);
    }
  };

  // Filter permissions based on search term and subject filter
  const filteredPermissions = permissions.filter((permission) => {
    const matchesSearch =
      permission.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (permission.description && permission.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSubject = filterSubject === 'all' || permission.subject === filterSubject;

    return matchesSearch && matchesSubject;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredPermissions.length / itemsPerPage);

  // Get current page items
  const currentItems = filteredPermissions.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Function to get color for action badges
  const getActionColor = (action: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'default';
      case 'read':
        return 'secondary';
      case 'update':
        return 'outline';
      case 'delete':
        return 'destructive';
      case 'manage':
        return 'default';
      default:
        // Hash the string to get a consistent but seemingly random color
        const hash = action.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
        const colors: ('default' | 'secondary' | 'destructive' | 'outline')[] = [
          'default',
          'secondary',
          'outline',
          'destructive',
        ];
        return colors[hash % colors.length];
    }
  };

  // Generate pagination links
  const getPaginationLinks = () => {
    const links = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        links.push(i);
      }
    } else {
      links.push(1);

      if (page <= 3) {
        links.push(2, 3, 4);
      } else if (page >= totalPages - 2) {
        links.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        links.push(page - 1, page, page + 1);
      }

      if (!links.includes(totalPages)) {
        links.push(totalPages);
      }

      const sortedLinks = [...new Set(links)].sort((a, b) => a - b);
      const linksWithEllipsis = [];

      for (let i = 0; i < sortedLinks.length; i++) {
        linksWithEllipsis.push(sortedLinks[i]);
        if (sortedLinks[i + 1] && sortedLinks[i + 1] > sortedLinks[i] + 1) {
          linksWithEllipsis.push('ellipsis');
        }
      }

      return linksWithEllipsis;
    }

    return links;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mb-4 flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-40" />
        </div>

        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array(5)
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
      <div className="mb-4 flex items-center justify-end">
        <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Permissions }]}>
          <Button onClick={() => setShowAddPermission(true)}>
            <Plus className="mr-2 h-4 w-4" /> {t('PERMISSION_LIST.ADD_BUTTON')}
          </Button>
        </ProtectedComponent>
        <Button variant="outline" onClick={handleRefresh} disabled={refreshing || isLoading} className="ml-2">
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <div className="mb-4 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
          <Input
            placeholder={t('PERMISSION_LIST.SEARCH.PLACEHOLDER')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={filterSubject} onValueChange={setFilterSubject}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder={t('PERMISSION_LIST.FILTER.PLACEHOLDER')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('PERMISSION_LIST.FILTER.ALL_SUBJECTS')}</SelectItem>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>
            {t('PERMISSION_LIST.TITLE')} ({filteredPermissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">{t('PERMISSION_LIST.TABLE.NO')}</TableHead>
                  <TableHead>{t('PERMISSION_LIST.TABLE.ACTION')}</TableHead>
                  <TableHead>{t('PERMISSION_LIST.TABLE.SUBJECT')}</TableHead>
                  <TableHead>{t('PERMISSION_LIST.TABLE.DESCRIPTION')}</TableHead>
                  <TableHead className="text-right">{t('PERMISSION_LIST.TABLE.OPERATIONS')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((permission, index) => (
                    <TableRow key={permission.id}>
                      <TableCell className="text-center font-medium">{(page - 1) * itemsPerPage + index + 1}</TableCell>
                      <TableCell>
                        <Badge variant={getActionColor(permission.action)}>{permission.action}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{permission.subject}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {permission.description ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help">
                                    {permission.description.length > 50
                                      ? `${permission.description.slice(0, 50)}...`
                                      : permission.description}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent className="max-w-sm text-wrap">{permission.description}</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <span className="text-muted-foreground italic">
                              {t('PERMISSION_LIST.TABLE.NO_DESCRIPTION')}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <ProtectedComponent
                          permissions={[{ action: EAction.MANAGE, subject: ESubject.System_Permissions }]}
                        >
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>{t('PERMISSION_LIST.DROPDOWN.LABEL')}</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => setPermissionToEdit(permission.id)}>
                                <Edit className="mr-2 h-4 w-4" />
                                {t('PERMISSION_LIST.DROPDOWN.EDIT')}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => setPermissionToDelete(permission.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                {t('PERMISSION_LIST.DROPDOWN.DELETE')}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </ProtectedComponent>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="text-muted-foreground flex flex-col items-center justify-center">
                        <Key className="mb-2 h-10 w-10 opacity-20" />
                        <p>{t('PERMISSION_LIST.TABLE.EMPTY.MESSAGE')}</p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setSearchTerm('');
                            setFilterSubject('all');
                          }}
                        >
                          {t('PERMISSION_LIST.TABLE.EMPTY.CLEAR_FILTER')}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {filteredPermissions.length > 0 && (
            <div className="mt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                      className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {getPaginationLinks().map((link, index) =>
                    link === 'ellipsis' ? (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    ) : (
                      <PaginationItem key={link}>
                        <PaginationLink
                          isActive={page === link}
                          onClick={() => setPage(Number(link))}
                          className="cursor-pointer"
                        >
                          {link}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                      className={
                        page === totalPages || totalPages === 0 ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Permission Dialog */}
      <AlertDialog open={!!permissionToDelete} onOpenChange={(open) => !open && setPermissionToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('PERMISSION_LIST.DELETE_DIALOG.TITLE')}</AlertDialogTitle>
            <AlertDialogDescription>{t('PERMISSION_LIST.DELETE_DIALOG.DESCRIPTION')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('PERMISSION_LIST.DELETE_DIALOG.CANCEL')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePermission} className="bg-red-500 hover:bg-red-600">
              {t('PERMISSION_LIST.DELETE_DIALOG.CONFIRM')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add/Edit Permission Dialog */}
      <PermissionFormDialog
        open={!!permissionToEdit || showAddPermission}
        onOpenChange={(open) => {
          if (!open) {
            setPermissionToEdit(null);
            setShowAddPermission(false);
          }
        }}
        permissionId={permissionToEdit || undefined}
        mode={permissionToEdit ? 'edit' : 'add'}
      />
    </>
  );
}
