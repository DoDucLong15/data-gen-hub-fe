import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Edit, Eye, Plus, RefreshCw, Search, Trash, Trash2, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { entityConfigs } from '../../_config/thesis.config';
import { useImportThesis } from '@/hooks/useImportThesis';
import { StorageApi } from '@/apis/storage.api';
import { toast } from 'sonner';
import { ThesisForm } from './ThesisForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ThesisDetailDialog } from './ThesisDetailDialog';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n';

interface ThesisTableProps {
  thesisType: EThesisDocumentType;
  classId: string;
}

export function ThesisTable({ thesisType, classId }: ThesisTableProps) {
  const pathName = usePathname();
  const subjectCheck = pathName.includes('assignment')
    ? ESubject.Thesis_AssignmentSheets
    : pathName.includes('review')
      ? ESubject.Thesis_GuidanceReviews
      : ESubject.Thesis_SupervisoryComments;
  const config = entityConfigs[thesisType];
  const {
    listThesis,
    isLoadingListThesis,
    refetchListThesis,
    createThesis,
    updateThesis,
    deleteThesis,
    isCreatingThesis,
    isUpdatingThesis,
  } = useImportThesis(thesisType, classId);
  const { t, isReady } = useI18n();

  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<any>(null);
  const [viewingEntity, setViewingEntity] = useState<any>(null);
  const itemsPerPage = 5;
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [downloadingItemPath, setDownloadingItemPath] = useState<string | null>(null);

  // Reset pagination when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter entities based on search term
  const filteredEntities =
    searchTerm.trim() === ''
      ? listThesis
      : listThesis.filter((entity: any) => {
          const lowerSearchTerm = searchTerm.toLowerCase();
          return config.columns.some((column) => {
            const value = entity[column.accessorKey];
            return value && String(value).toLowerCase().includes(lowerSearchTerm);
          });
        });

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEntities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEntities.length / itemsPerPage);

  // Handle form submission
  const handleFormSubmit = (data: any) => {
    if (editingEntity) {
      updateThesis(editingEntity.id, data);
    } else {
      createThesis(data);
    }
    setIsFormDialogOpen(false);
    setEditingEntity(null);
  };

  // Open form dialog for editing
  const handleEdit = (entity: any) => {
    setEditingEntity(entity);
    setIsFormDialogOpen(true);
  };

  // Open form dialog for creating
  const handleCreate = () => {
    setEditingEntity(null);
    setIsFormDialogOpen(true);
  };

  const handleDownloadAllFiles = async () => {
    try {
      setIsDownloadingAll(true);
      await StorageApi.downloadFile(
        listThesis.map((entity) => entity.inputPath).filter(Boolean),
        `${config.title}.zip`,
      );
    } catch (error) {
      toast.error(t('THESIS_TABLE.TOAST.DOWNLOAD_ERROR'));
    } finally {
      setIsDownloadingAll(false);
    }
  };

  const handleDownloadFile = async (path: string) => {
    try {
      setDownloadingItemPath(path);
      await StorageApi.downloadOneFile(path);
    } catch (error) {
      toast.error(t('THESIS_TABLE.TOAST.DOWNLOAD_ERROR'));
    } finally {
      setDownloadingItemPath(null);
    }
  };

  const handleViewDetail = (entity: any) => {
    setViewingEntity(entity);
    setIsDetailDialogOpen(true);
  };

  // Visible columns (exclude hidden ones)
  const visibleColumns = config.columns.filter((column) => !column.hidden).slice(0, 5);

  if (!isReady) return null;

  return (
    <div className="space-y-4">
      {/* Actions bar */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetchListThesis()} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            {t('THESIS_TABLE.ACTIONS.REFRESH')}
          </Button>

          <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: subjectCheck }]}>
            <Button variant="default" size="sm" onClick={handleCreate} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {t('THESIS_TABLE.ACTIONS.CREATE')}
            </Button>
          </ProtectedComponent>
        </div>

        <div className="flex gap-2">
          {config.downloadEnabled && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadAllFiles}
              disabled={listThesis.length === 0 || isDownloadingAll}
              className="flex items-center gap-2"
            >
              {isDownloadingAll ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {t('THESIS_TABLE.ACTIONS.DOWNLOAD_ALL')}
            </Button>
          )}
        </div>
      </div>

      {/* Search box */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder={t('THESIS_TABLE.ACTIONS.SEARCH').replace('{type}', config.title.toLowerCase())}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pr-8 pl-8"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-0 right-0 h-full"
            onClick={() => setSearchTerm('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Entity table */}
      <div className="rounded-md border">
        <ScrollArea className="h-[300px] pr-5">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">{t('THESIS_TABLE.TABLE.HEADER.NO')}</TableHead>
                {visibleColumns.map((column) => (
                  <TableHead key={column.accessorKey} className="w-[125px]">
                    {column.header}
                  </TableHead>
                ))}
                <TableHead className="w-[140px]">{t('THESIS_TABLE.TABLE.HEADER.ACTIONS')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingListThesis ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + 2} className="text-center">
                    {t('THESIS_TABLE.TABLE.LOADING')}
                  </TableCell>
                </TableRow>
              ) : filteredEntities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + 2} className="text-center">
                    {searchTerm
                      ? t('THESIS_TABLE.TABLE.NO_RESULTS')
                      : t('THESIS_TABLE.TABLE.NO_DATA').replace('{type}', config.title.toLowerCase())}
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((entity: any, index) => (
                  <TableRow key={entity.id}>
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    {visibleColumns.map((column) => (
                      <TableCell key={column.accessorKey} className="max-w-[120px] truncate">
                        {column.cell
                          ? column.cell(entity)
                          : column.accessorKey === 'createdAt'
                            ? formatDistanceToNow(new Date(entity[column.accessorKey]), {
                                addSuffix: true,
                                locale: vi,
                              })
                            : entity[column.accessorKey]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleViewDetail(entity)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {config.downloadEnabled && entity.inputPath && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownloadFile(entity.inputPath)}
                            disabled={downloadingItemPath === entity.inputPath}
                          >
                            {downloadingItemPath === entity.inputPath ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Download className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                        <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: subjectCheck }]}>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(entity)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>{t('THESIS_TABLE.DIALOG.DELETE.TITLE')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                  {t('THESIS_TABLE.DIALOG.DELETE.DESCRIPTION').replace('{id}', entity.id)}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>{t('THESIS_TABLE.DIALOG.DELETE.CANCEL')}</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteThesis(entity.id)}>
                                  {t('THESIS_TABLE.DIALOG.DELETE.CONFIRM')}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </ProtectedComponent>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {/* Pagination */}
      {filteredEntities.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
              let pageNumber;

              // Logic for which page numbers to show
              if (totalPages <= 5) {
                // Show all pages if 5 or less
                pageNumber = index + 1;
              } else if (currentPage <= 3) {
                // At start, show 1,2,3,4,...
                if (index < 4) {
                  pageNumber = index + 1;
                } else {
                  return (
                    <PaginationItem key={index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
              } else if (currentPage >= totalPages - 2) {
                // At end, show ...,n-3,n-2,n-1,n
                if (index === 0) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                    </PaginationItem>
                  );
                } else if (index === 1) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else {
                  pageNumber = totalPages - (4 - index);
                }
              } else {
                // In middle, show 1,...,currentPage-1,currentPage,currentPage+1,...,totalPages
                if (index === 0) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                    </PaginationItem>
                  );
                } else if (index === 1) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else if (index === 4) {
                  return (
                    <PaginationItem key={index}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                } else {
                  pageNumber = currentPage + index - 2;
                }
              }

              return (
                <PaginationItem key={index}>
                  <PaginationLink onClick={() => setCurrentPage(pageNumber)} isActive={currentPage === pageNumber}>
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Entity form dialog */}
      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingEntity
                ? t('THESIS_TABLE.DIALOG.UPDATE_TITLE').replace('{type}', config.title)
                : t('THESIS_TABLE.DIALOG.CREATE_TITLE').replace('{type}', config.title)}
            </DialogTitle>
          </DialogHeader>
          <ThesisForm
            config={config}
            initialData={editingEntity}
            onSubmit={handleFormSubmit}
            isSubmitting={isCreatingThesis || isUpdatingThesis}
            onCancel={() => {
              setIsFormDialogOpen(false);
              setEditingEntity(null);
            }}
          />
        </DialogContent>
      </Dialog>

      <ThesisDetailDialog
        isOpen={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
        entity={viewingEntity}
        config={config}
        onEdit={handleEdit}
        onDownload={handleDownloadFile}
      />
    </div>
  );
}
