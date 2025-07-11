import { JSX, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RefreshCw, AlertCircle, ChevronsLeft, ChevronsRight, Eye } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TProcess } from '@/utils/types/progress.type';
import { useI18n } from '@/i18n';
import { ProgressLog } from '@/components/common/ProgressLog';

// Component chính cho bảng với phân trang
export function ProcessTable({
  processes,
  processesIsLoading,
  getStatusBadge,
}: {
  processes: TProcess[];
  processesIsLoading: boolean;
  getStatusBadge: (status: string) => JSX.Element;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedProgressId, setSelectedProgressId] = useState<string>('');
  const { t, isReady } = useI18n();

  // Tính toán cho phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processes ? processes.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = processes ? Math.ceil(processes.length / itemsPerPage) : 0;

  // Hàm xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Hàm xử lý thay đổi số lượng item mỗi trang
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số lượng item/trang
  };

  const handleViewLog = (id: string) => {
    setSelectedProgressId(id);
    setIsLogModalOpen(true);
  };

  // Tạo mảng số trang để hiển thị
  const getPageNumbers = () => {
    let pages = [];

    // Luôn hiển thị trang đầu tiên
    pages.push(1);

    // Tính toán phạm vi trang xung quanh trang hiện tại
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Thêm dấu chấm lửng nếu cần
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }

    // Thêm các trang ở giữa
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Thêm dấu chấm lửng nếu cần
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    // Thêm trang cuối cùng nếu có nhiều hơn 1 trang
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  if (processesIsLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <RefreshCw className="text-primary mr-2 h-6 w-6 animate-spin" />
        <span>{t('PROCESS_TABLE.LOADING')}</span>
      </div>
    );
  }

  if (!processes || processes.length === 0) {
    return (
      <div className="rounded-lg border py-12 text-center text-gray-500">
        <AlertCircle className="mx-auto mb-2 h-8 w-8 text-gray-400" />
        <p>{t('PROCESS_TABLE.NO_PROCESSES')}</p>
      </div>
    );
  }

  if (!isReady) return null;

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">{t('PROCESS_TABLE.TABLE_HEADERS.NUMBER')}</TableHead>
            <TableHead>{t('PROCESS_TABLE.TABLE_HEADERS.ACTION')}</TableHead>
            <TableHead>{t('PROCESS_TABLE.TABLE_HEADERS.TYPE')}</TableHead>
            <TableHead>{t('PROCESS_TABLE.TABLE_HEADERS.STATUS')}</TableHead>
            <TableHead>{t('PROCESS_TABLE.TABLE_HEADERS.ERROR')}</TableHead>
            <TableHead>{t('PROCESS_TABLE.TABLE_HEADERS.CREATED_BY')}</TableHead>
            <TableHead>{t('PROCESS_TABLE.TABLE_HEADERS.CREATED_AT')}</TableHead>
            <TableHead>{t('PROCESS_TABLE.TABLE_HEADERS.LOG')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((process: TProcess, index: number) => (
            <TableRow key={process.id}>
              <TableCell className="font-medium">{indexOfFirstItem + index + 1}</TableCell>
              <TableCell>{process.action}</TableCell>
              <TableCell>{process.type}</TableCell>
              <TableCell>{getStatusBadge(process.status)}</TableCell>
              <TableCell className="max-w-[200px] truncate">
                {process.error ? (
                  <div
                    className="overflow-hidden text-ellipsis whitespace-nowrap"
                    title={JSON.stringify(process.error)}
                  >
                    {JSON.stringify(process.error)}
                  </div>
                ) : (
                  ''
                )}
              </TableCell>
              <TableCell>{process.createBy}</TableCell>
              <TableCell>{new Date(process.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer"
                  onClick={() => handleViewLog(process.processId)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{t('PROCESS_TABLE.PAGINATION.SHOW')}</span>
          <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
            <SelectTrigger className="w-16">
              <SelectValue placeholder={itemsPerPage} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>{t('PROCESS_TABLE.PAGINATION.ENTRIES')}</span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button variant="outline" size="icon" onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                <ChevronsLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis-start' || page === 'ellipsis-end' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink isActive={page === currentPage} onClick={() => handlePageChange(Number(page))}>
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Progress Log Modal */}
      <ProgressLog
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        progressId={selectedProgressId}
        title={t('PROCESS_TABLE.LOG_MODAL.TITLE')}
      />
    </div>
  );
}
