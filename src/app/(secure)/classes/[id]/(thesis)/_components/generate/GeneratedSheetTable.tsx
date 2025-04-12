'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, RefreshCw, Search, Trash, Trash2, X } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { useGenerateThesis } from '@/hooks/useGenerateThesis';
import { StorageApi } from '@/apis/storage.api';
import { toast } from 'sonner';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { usePathname } from 'next/navigation';
import { useI18n } from '@/i18n';

export default function GeneratedSheetsTable({
  classId,
  thesisType,
}: {
  classId: string;
  thesisType: EThesisDocumentType;
}) {
  const pathName = usePathname();
  const subjectCheck = pathName.includes('assignment')
    ? ESubject.Thesis_AssignmentSheets
    : pathName.includes('review')
      ? ESubject.Thesis_GuidanceReviews
      : ESubject.Thesis_SupervisoryComments;
  const {
    generatedSheets,
    generatedSheetsIsLoading,
    refetchGeneratedSheets,
    deleteSheet,
    deleteAllSheets,
    downloadAllSheet,
    isDeletingAllSheets,
  } = useGenerateThesis(thesisType, classId);
  const { t, isReady } = useI18n();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter sheets based on search term
  const filteredSheets =
    searchTerm.trim() === ''
      ? generatedSheets
      : generatedSheets.filter((sheet) => {
          const lowerSearchTerm = searchTerm.toLowerCase();
          return (
            sheet.fullName.toLowerCase().includes(lowerSearchTerm) || sheet.mssv.toLowerCase().includes(lowerSearchTerm)
          );
        });

  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSheets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSheets.length / itemsPerPage);

  const downloadOneFile = async (path: string) => {
    try {
      await StorageApi.downloadOneFile(path);
      toast.success(t('GENERATE_THESIS.TABLE.TOAST.DOWNLOAD_SUCCESS'));
    } catch (error) {
      toast.error(t('GENERATE_THESIS.TABLE.TOAST.DOWNLOAD_ERROR'));
    }
  };

  if (!isReady) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetchGeneratedSheets()}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          {t('GENERATE_THESIS.TABLE.ACTIONS.REFRESH')}
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadAllSheet}
            disabled={generatedSheets.length === 0}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {t('GENERATE_THESIS.TABLE.ACTIONS.DOWNLOAD_ALL')}
          </Button>

          <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: subjectCheck }]}>
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={generatedSheets.length === 0 || isDeletingAllSheets}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  {t('GENERATE_THESIS.TABLE.ACTIONS.DELETE_ALL')}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('GENERATE_THESIS.TABLE.DELETE_DIALOG.TITLE')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('GENERATE_THESIS.TABLE.DELETE_DIALOG.DESCRIPTION')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('GENERATE_THESIS.TABLE.DELETE_DIALOG.CANCEL')}</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      deleteAllSheets();
                      setIsDeleteDialogOpen(false);
                    }}
                  >
                    {t('GENERATE_THESIS.TABLE.DELETE_DIALOG.CONFIRM')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </ProtectedComponent>
        </div>
      </div>

      {/* Search box */}
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder={t('GENERATE_THESIS.TABLE.SEARCH.PLACEHOLDER')}
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

      <div className="rounded-md border">
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">{t('GENERATE_THESIS.TABLE.HEADER.NO')}</TableHead>
                <TableHead>{t('GENERATE_THESIS.TABLE.HEADER.STUDENT_ID')}</TableHead>
                <TableHead>{t('GENERATE_THESIS.TABLE.HEADER.FULL_NAME')}</TableHead>
                <TableHead>{t('GENERATE_THESIS.TABLE.HEADER.CREATED_AT')}</TableHead>
                <TableHead className="w-[120px]">{t('GENERATE_THESIS.TABLE.HEADER.ACTIONS')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {generatedSheetsIsLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    {t('GENERATE_THESIS.TABLE.EMPTY.LOADING')}
                  </TableCell>
                </TableRow>
              ) : filteredSheets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    {searchTerm
                      ? t('GENERATE_THESIS.TABLE.EMPTY.NO_RESULTS')
                      : t('GENERATE_THESIS.TABLE.EMPTY.NO_SHEETS')}
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((sheet, index) => (
                  <TableRow key={sheet.id}>
                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                    <TableCell>{sheet.mssv}</TableCell>
                    <TableCell>{sheet.fullName}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(sheet.createdAt), {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => downloadOneFile(sheet.outputPath)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: subjectCheck }]}>
                          <Button variant="ghost" size="icon" onClick={() => deleteSheet(sheet.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
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

      {filteredSheets.length > 0 && (
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
    </div>
  );
}
