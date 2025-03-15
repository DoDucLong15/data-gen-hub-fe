'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, UsersIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import StudentSelectionDialog from './StudentSelectionDialog';
import { toast } from 'sonner';
import { TGenerateThesisDocFormData } from '@/utils/types/thesis-doc.type';
import { useGenerateThesis } from '@/hooks/useGenerateThesis';
import { EThesisDocumentType } from '@/utils/enums/thesis-document.enum';
import { useStudents } from '@/hooks/useStudents';

export default function GenerateForm({ classId, thesisType }: { classId: string; thesisType: EThesisDocumentType }) {
  const { generateSheets, isGenerating, openStudentSelection, closeStudentSelection, isDialogOpen, selectedStudents } =
    useGenerateThesis(thesisType, classId);
  const { students } = useStudents(classId, false);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

  const form = useForm<TGenerateThesisDocFormData>({
    defaultValues: {
      classId: '',
      studentIds: [],
      thesisStartDate: format(new Date(), 'yyyy-MM-dd'),
      thesisEndDate: format(new Date(new Date().setMonth(new Date().getMonth() + 3)), 'yyyy-MM-dd'),
      teacherSignatureDate: format(new Date(), 'yyyy-MM-dd'),
    },
  });

  const handleOpenStudentSelection = () => {
    openStudentSelection(students);
  };

  const handleSelectStudents = (studentIds: string[]) => {
    setSelectedStudentIds(studentIds);
    form.setValue('studentIds', studentIds);
  };

  const onSubmit = (data: TGenerateThesisDocFormData) => {
    if (data.studentIds.length === 0) {
      toast.error('Vui lòng chọn ít nhất một sinh viên');
      return;
    }

    generateSheets({
      ...data,
      thesisStartDate: data.thesisStartDate ? format(data.thesisStartDate, 'yyyy-MM-dd') : undefined,
      thesisEndDate: data.thesisEndDate ? format(data.thesisEndDate, 'yyyy-MM-dd') : undefined,
      teacherSignatureDate: data.teacherSignatureDate ? format(data.teacherSignatureDate, 'yyyy-MM-dd') : undefined,
    });
    setSelectedStudentIds([]);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormItem>
            <FormLabel>Sinh viên</FormLabel>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleOpenStudentSelection}
                disabled={!classId}
                className="w-full justify-start text-left font-normal"
              >
                <UsersIcon className="mr-2 h-4 w-4" />
                {selectedStudentIds.length > 0 ? `Đã chọn ${selectedStudentIds.length} sinh viên` : 'Chọn sinh viên'}
              </Button>
            </div>
          </FormItem>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="thesisStartDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="thesisEndDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="teacherSignatureDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày ký</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Chọn ngày</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isGenerating}>
              {isGenerating ? 'Đang xử lý...' : 'Tạo phiếu giao nhiệm vụ'}
            </Button>
          </div>
        </form>
      </Form>

      <StudentSelectionDialog
        open={isDialogOpen}
        onClose={closeStudentSelection}
        students={selectedStudents}
        onSelectStudents={handleSelectStudents}
      />
    </div>
  );
}
