'use client';

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useGenerateThesis } from '@/hooks/useGenerateThesis';
import { EProgressStatus } from '@/utils/enums/progress.enum';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useImportThesis } from '@/hooks/useImportThesis';
import { IMPORT_THESIS } from '@/configs/messages.config';

export default function ProcessTable({ classId, thesisType }: { classId: string; thesisType: EThesisDocumentType }) {
  const { processes, processesIsLoafing, refetchProcesses } = useImportThesis(thesisType, classId);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusBadge = (status: EProgressStatus) => {
    switch (status) {
      case EProgressStatus.PROCESSING:
        return <Badge variant="secondary">{IMPORT_THESIS.PROCESS_TABLE.TABLE.STATUS.PROCESSING}</Badge>;
      case EProgressStatus.COMPLETED:
        return <Badge variant="success">{IMPORT_THESIS.PROCESS_TABLE.TABLE.STATUS.COMPLETED}</Badge>;
      case EProgressStatus.FAILED:
        return <Badge variant="destructive">{IMPORT_THESIS.PROCESS_TABLE.TABLE.STATUS.FAILED}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(processes.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => refetchProcesses()} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          {IMPORT_THESIS.PROCESS_TABLE.ACTIONS.REFRESH}
        </Button>
        <div className="text-muted-foreground text-sm">{IMPORT_THESIS.PROCESS_TABLE.AUTO_UPDATE}</div>
      </div>

      <div className="rounded-md border">
        <ScrollArea className="h-[300px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{IMPORT_THESIS.PROCESS_TABLE.TABLE.HEADER.NO}</TableHead>
                <TableHead>{IMPORT_THESIS.PROCESS_TABLE.TABLE.HEADER.ACTION}</TableHead>
                <TableHead>{IMPORT_THESIS.PROCESS_TABLE.TABLE.HEADER.TYPE}</TableHead>
                <TableHead>{IMPORT_THESIS.PROCESS_TABLE.TABLE.HEADER.ERROR}</TableHead>
                <TableHead>{IMPORT_THESIS.PROCESS_TABLE.TABLE.HEADER.STATUS}</TableHead>
                <TableHead>{IMPORT_THESIS.PROCESS_TABLE.TABLE.HEADER.TIME}</TableHead>
                <TableHead>{IMPORT_THESIS.PROCESS_TABLE.TABLE.HEADER.CREATOR}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processesIsLoafing ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    {IMPORT_THESIS.PROCESS_TABLE.TABLE.EMPTY.LOADING}
                  </TableCell>
                </TableRow>
              ) : processes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    {IMPORT_THESIS.PROCESS_TABLE.TABLE.EMPTY.NO_PROCESS}
                  </TableCell>
                </TableRow>
              ) : (
                currentItems.map((process, index) => (
                  <TableRow key={process.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{process.action}</TableCell>
                    <TableCell>{process.type}</TableCell>
                    <TableCell className="truncate">{process.error ? JSON.stringify(process.error) : ''}</TableCell>
                    <TableCell>{getStatusBadge(process.status)}</TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(process.createdAt), {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </TableCell>
                    <TableCell>{process.createBy}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>

      {processes.length > 0 && (
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
