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
import { entityConfigs } from '../../_config/thesis.config';
import { GENERATE_THESIS } from '@/configs/messages.config';

export default function GenerateForm({ classId, thesisType }: { classId: string; thesisType: EThesisDocumentType }) {
  const config = entityConfigs[thesisType];
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
      toast.error(GENERATE_THESIS.FORM.ERROR.NO_STUDENT);
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
            <FormLabel>{GENERATE_THESIS.FORM.STUDENT.LABEL}</FormLabel>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleOpenStudentSelection}
                disabled={!classId}
                className="w-full justify-start text-left font-normal"
              >
                <UsersIcon className="mr-2 h-4 w-4" />
                {selectedStudentIds.length > 0
                  ? GENERATE_THESIS.FORM.STUDENT.SELECTED.replace('{count}', selectedStudentIds.length.toString())
                  : GENERATE_THESIS.FORM.STUDENT.PLACEHOLDER}
              </Button>
            </div>
          </FormItem>

          {thesisType === EThesisDocumentType.ASSIGNMENT_SHEET && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="thesisStartDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>{GENERATE_THESIS.FORM.DATE.START.LABEL}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>{GENERATE_THESIS.FORM.DATE.START.PLACEHOLDER}</span>
                            )}
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
                    <FormLabel>{GENERATE_THESIS.FORM.DATE.END.LABEL}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>{GENERATE_THESIS.FORM.DATE.END.PLACEHOLDER}</span>
                            )}
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
                    <FormLabel>{GENERATE_THESIS.FORM.DATE.SIGNATURE.LABEL}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn('w-full pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>{GENERATE_THESIS.FORM.DATE.SIGNATURE.PLACEHOLDER}</span>
                            )}
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
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isGenerating}>
              {isGenerating
                ? GENERATE_THESIS.FORM.SUBMIT.PROCESSING
                : GENERATE_THESIS.FORM.SUBMIT.LABEL.replace('{type}', config.title.toLowerCase())}
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
