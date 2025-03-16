import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { X, Search, Edit, Trash2, Download, Filter, RefreshCw } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { StudentFilter, TExportOptions, TStudent } from '@/utils/types/student.type';
import { useStudents } from '@/hooks/useStudents';
import { StudentDialog } from './StudentDialog';
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
import { Spinner } from '@/components/ui/spinner';

interface StudentListProps {
  classId: string;
}

export function StudentList({ classId }: StudentListProps) {
  const [filters, setFilters] = useState<StudentFilter>({});
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<TStudent | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const {
    students,
    studentsIsLoading,
    createStudent,
    updateStudent,
    deleteStudent,
    studentsRefetch,
    isExporting,
    exportStudents,
  } = useStudents(classId, false);

  const handleExport = () => {
    exportStudents({
      studentIds: selectedStudents.length > 0 ? selectedStudents : undefined,
      classId,
    });
  };

  const handleFilterChange = (key: keyof StudentFilter, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({});
  };

  const handleEdit = (student: TStudent) => {
    setCurrentStudent(student);
    setIsEditOpen(true);
  };

  const confirmDelete = (id: string) => {
    setStudentToDelete(id);
  };

  const handleDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete);
      setStudentToDelete(null);
    }
  };

  const handleCreate = () => {
    setCurrentStudent(null);
    setIsEditOpen(true);
  };

  const handleSave = (student: TStudent) => {
    if (student.id) {
      updateStudent(student.id, student);
    } else {
      createStudent(student);
    }
    setIsEditOpen(false);
  };

  const toggleSelectStudent = (id: string) => {
    setSelectedStudents((prev) => (prev.includes(id) ? prev.filter((studentId) => studentId !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === paginatedStudents?.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(paginatedStudents?.map((s) => s.id).filter((id): id is string => id !== undefined) || []);
    }
  };

  const getFullName = (student: TStudent) => {
    return [student.lastName, student.middleName, student.firstName].filter(Boolean).join(' ');
  };

  // Pagination
  const filteredStudents = students?.filter((student) => {
    if (!filters) return true;
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const studentValue = student[key as keyof TStudent];
      return studentValue && String(studentValue).toLowerCase().includes(value.toLowerCase());
    });
  });

  const totalPages = filteredStudents ? Math.ceil(filteredStudents.length / itemsPerPage) : 0;
  const paginatedStudents = filteredStudents?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className={`w-full max-w-full space-y-4 overflow-hidden`}>
      {/* Mobile and Desktop Header */}
      <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:space-y-0">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <Input
              placeholder="Search MSSV"
              className="w-full pl-8"
              value={filters.mssv || ''}
              onChange={(e) => {
                handleFilterChange('mssv', e.target.value);
              }}
            />
          </div>

          {/* Desktop Filter Controls */}
          <div className="hidden sm:flex sm:gap-2">
            {Object.values(filters).some((v) => v) && (
              <Button variant="outline" size="icon" onClick={clearFilters}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleCreate} className="sm:whitespace-nowrap">
            Add Student
          </Button>
          <Button
            variant="outline"
            onClick={handleExport}
            disabled={studentsIsLoading}
            className="sm:whitespace-nowrap"
          >
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
            {selectedStudents.length > 0 && <span className="ml-1">({selectedStudents.length})</span>}
            {isExporting && <Spinner />}
          </Button>
          <Button variant="outline" onClick={() => studentsRefetch()} disabled={studentsIsLoading}>
            <RefreshCw className={`h-4 w-4`} />
          </Button>
        </div>
      </div>

      <Card className="w-full">
        <CardContent className="p-0">
          {studentsIsLoading ? (
            <div className="flex justify-center p-4">Loading...</div>
          ) : (
            <>
              <div className="overflow-x-auto pr-5">
                <Table className="w-full table-fixed">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox
                          checked={
                            selectedStudents.length === paginatedStudents?.length && paginatedStudents?.length > 0
                          }
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-22">MSSV</TableHead>
                      <TableHead className="w-40">Full Name</TableHead>
                      <TableHead className="hidden w-20 md:table-cell">Email</TableHead>
                      <TableHead className="hidden w-20 lg:table-cell">Phone</TableHead>
                      <TableHead className="hidden w-24 md:table-cell">Class</TableHead>
                      <TableHead className="hidden w-40 lg:table-cell">Project Title</TableHead>
                      <TableHead className="hidden w-32 xl:table-cell">Supervisor</TableHead>
                      <TableHead className="hidden w-32 xl:table-cell">Reviewer</TableHead>
                      <TableHead className="w-16">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedStudents?.length ? (
                      paginatedStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedStudents.includes(student.id!)}
                              onCheckedChange={() => toggleSelectStudent(student.id!)}
                            />
                          </TableCell>
                          <TableCell className="whitespace-nowrap">{student.mssv}</TableCell>
                          <TableCell className="whitespace-nowrap">{getFullName(student)}</TableCell>
                          <TableCell className="hidden max-w-[160px] truncate md:table-cell">{student.email}</TableCell>
                          <TableCell className="hidden max-w-[128px] truncate lg:table-cell">{student.phone}</TableCell>
                          <TableCell className="hidden truncate md:table-cell">{student.studentClassName}</TableCell>
                          <TableCell className="hidden max-w-xs truncate lg:table-cell">
                            {student.projectTitle}
                          </TableCell>
                          <TableCell className="hidden truncate xl:table-cell">{student.supervisor}</TableCell>
                          <TableCell className="hidden truncate xl:table-cell">{student.reviewer}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleEdit(student)}>
                                <Edit className="h-4 w-4" />
                              </Button>

                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="icon" onClick={() => confirmDelete(student.id!)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This action cannot be undone. This will permanently delete the student record from
                                      the database.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>

                              <div className="md:hidden">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <Filter className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => handleEdit(student)}>
                                      View Details
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} className="py-6 text-center">
                          No students found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              {totalPages > 1 && (
                <div className="flex justify-center p-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} isActive={page !== 1} />
                      </PaginationItem>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNumber: number;
                        if (totalPages <= 5) {
                          pageNumber = i + 1;
                        } else {
                          if (page <= 3) {
                            pageNumber = i + 1;
                          } else if (page >= totalPages - 2) {
                            pageNumber = totalPages - 4 + i;
                          } else {
                            pageNumber = page - 2 + i;
                          }
                        }
                        return (
                          <PaginationItem key={pageNumber}>
                            <Button
                              variant={pageNumber === page ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setPage(pageNumber)}
                              className="h-8 w-8 p-0"
                            >
                              {pageNumber}
                            </Button>
                          </PaginationItem>
                        );
                      })}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          isActive={page !== totalPages}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <StudentDialog
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSave}
        student={currentStudent}
        classId={classId}
      />
    </div>
  );
}
