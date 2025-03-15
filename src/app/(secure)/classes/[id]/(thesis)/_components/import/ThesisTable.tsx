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

interface ThesisTableProps {
  thesisType: EThesisDocumentType;
  classId: string;
}

export function ThesisTable({ thesisType, classId }: ThesisTableProps) {
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

  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [editingEntity, setEditingEntity] = useState<any>(null);
  const [viewingEntity, setViewingEntity] = useState<any>(null);
  const itemsPerPage = 5;

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
      await StorageApi.downloadFile(
        listThesis.map((entity) => entity.inputPath).filter(Boolean),
        `${config.title}.zip`,
      );
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tải tệp');
    }
  };

  const handleDownloadFile = async (path: string) => {
    try {
      await StorageApi.downloadOneFile(path);
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi tải tệp');
    }
  };

  const handleViewDetail = (entity: any) => {
    setViewingEntity(entity);
    setIsDetailDialogOpen(true);
  };

  // Visible columns (exclude hidden ones)
  const visibleColumns = config.columns.filter((column) => !column.hidden);

  return (
    <div className="space-y-4">
      {/* Actions bar */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => refetchListThesis()} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Làm mới
          </Button>

          <Button variant="default" size="sm" onClick={handleCreate} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Tạo mới
          </Button>
        </div>

        <div className="flex gap-2">
          {config.downloadEnabled && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadAllFiles}
              disabled={listThesis.length === 0}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Tải tất cả
            </Button>
          )}
        </div>
      </div>

      {/* Search box */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder={`Tìm kiếm ${config.title.toLowerCase()}...`}
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
                <TableHead className="w-[50px]">STT</TableHead>
                {visibleColumns.map((column) => (
                  <TableHead key={column.accessorKey} className="w-[125px]">
                    {column.header}
                  </TableHead>
                ))}
                <TableHead className="w-[140px]">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingListThesis ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + 2} className="text-center">
                    Đang tải...
                  </TableCell>
                </TableRow>
              ) : filteredEntities.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={visibleColumns.length + 2} className="text-center">
                    {searchTerm ? 'Không tìm thấy kết quả phù hợp' : `Chưa có ${config.title.toLowerCase()} nào`}
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
                          <Button variant="ghost" size="icon" onClick={() => handleDownloadFile(entity.inputPath)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(entity)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <AlertDialog>
                          {/* Nút kích hoạt AlertDialog */}
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>

                          {/* Nội dung hộp thoại */}
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the thesis with ID:{' '}
                                {entity.id}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteThesis(entity.id)}>Confirm</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
            <DialogTitle>{editingEntity ? `Cập nhật ${config.title}` : `Tạo ${config.title} mới`}</DialogTitle>
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
