'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { TStudent } from '@/utils/types/student.type';
import { GENERATE_THESIS } from '@/configs/messages.config';

interface StudentSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  students: TStudent[];
  onSelectStudents: (selectedIds: string[]) => void;
}

export default function StudentSelectionDialog({
  open,
  onClose,
  students,
  onSelectStudents,
}: StudentSelectionDialogProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<TStudent[]>(students);

  // Reset selection when dialog opens with new students
  useEffect(() => {
    if (open) {
      setSelectedIds(new Set());
      setSearchTerm('');
      setFilteredStudents(students);
    }
  }, [open, students]);

  // Filter students based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredStudents(students);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredStudents(
        students.filter(
          (student) =>
            `${student.lastName} ${student.middleName} ${student.firstName}`.toLowerCase().includes(term) ||
            student.mssv.toLowerCase().includes(term),
        ),
      );
    }
  }, [searchTerm, students]);

  const handleSelectAll = () => {
    if (selectedIds.size === filteredStudents.length) {
      // Deselect all
      setSelectedIds(new Set());
    } else {
      // Select all
      setSelectedIds(new Set(filteredStudents.map((student) => student.id!)));
    }
  };

  const handleToggleStudent = (id: string) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  const handleConfirm = () => {
    onSelectStudents(Array.from(selectedIds));
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{GENERATE_THESIS.STUDENT_DIALOG.TITLE}</DialogTitle>
        </DialogHeader>

        <div className="mb-4 flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute top-2.5 left-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={GENERATE_THESIS.STUDENT_DIALOG.SEARCH.PLACEHOLDER}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button variant="outline" onClick={handleSelectAll}>
            {selectedIds.size === filteredStudents.length
              ? GENERATE_THESIS.STUDENT_DIALOG.SELECT_ALL.DESELECT
              : GENERATE_THESIS.STUDENT_DIALOG.SELECT_ALL.SELECT}
          </Button>
        </div>

        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">{GENERATE_THESIS.STUDENT_DIALOG.TABLE.HEADER.SELECT}</TableHead>
                <TableHead>{GENERATE_THESIS.STUDENT_DIALOG.TABLE.HEADER.STUDENT_ID}</TableHead>
                <TableHead>{GENERATE_THESIS.STUDENT_DIALOG.TABLE.HEADER.FULL_NAME}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
                    {GENERATE_THESIS.STUDENT_DIALOG.TABLE.EMPTY}
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedIds.has(student.id!)}
                        onCheckedChange={() => handleToggleStudent(student.id!)}
                      />
                    </TableCell>
                    <TableCell>{student.mssv}</TableCell>
                    <TableCell>{`${student.lastName} ${student.middleName} ${student.firstName}`}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>

        <DialogFooter className="flex items-center justify-between">
          <div>
            {GENERATE_THESIS.STUDENT_DIALOG.FOOTER.SELECTED_COUNT.replace(
              '{selected}',
              selectedIds.size.toString(),
            ).replace('{total}', students.length.toString())}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              {GENERATE_THESIS.STUDENT_DIALOG.FOOTER.CANCEL}
            </Button>
            <Button onClick={handleConfirm}>{GENERATE_THESIS.STUDENT_DIALOG.FOOTER.CONFIRM}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
