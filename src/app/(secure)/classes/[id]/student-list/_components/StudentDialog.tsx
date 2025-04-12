import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TStudent } from '@/utils/types/student.type';
import { User, Phone, Mail, BookOpen, UserCheck, FileText } from 'lucide-react';
import { useI18n } from '@/i18n';

interface StudentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: TStudent) => void;
  student?: TStudent | null;
  classId: string;
}

export function StudentDialog({ isOpen, onClose, onSave, student, classId }: StudentDialogProps) {
  const [form, setForm] = useState<TStudent>({
    mssv: '',
    phone: '',
    email: '',
    lastName: '',
    middleName: '',
    firstName: '',
    projectTitle: '',
    supervisor: '',
    reviewer: '',
    studentClassName: '',
    classId: classId,
  });
  const { t, isReady } = useI18n();

  useEffect(() => {
    if (student) {
      setForm(student);
    } else {
      setForm({
        mssv: '',
        phone: '',
        email: '',
        lastName: '',
        middleName: '',
        firstName: '',
        projectTitle: '',
        supervisor: '',
        reviewer: '',
        studentClassName: '',
        classId: classId,
      });
    }
  }, [student, classId]);

  const handleChange = (field: keyof TStudent, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.mssv.trim()) {
      alert(t('THESIS_PAGE.STUDENT_LIST.DIALOG.VALIDATION.MSSV_REQUIRED'));
      return;
    }
    onSave(form);
  };

  if (!isReady) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden rounded-lg border bg-white p-0 sm:max-w-md md:max-w-2xl dark:border-gray-800 dark:bg-gray-950">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 pb-2 dark:from-blue-950/30 dark:to-indigo-950/30">
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
            {student ? (
              <>
                <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TITLE.EDIT')}
              </>
            ) : (
              <>
                <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TITLE.ADD')}
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {student
              ? t('THESIS_PAGE.STUDENT_LIST.DIALOG.DESCRIPTION.EDIT')
              : t('THESIS_PAGE.STUDENT_LIST.DIALOG.DESCRIPTION.ADD')}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <Tabs defaultValue="personal" className="w-full">
            <div className="px-6 pt-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal" className="rounded-md">
                  <User className="mr-2 h-4 w-4" />
                  {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.LABEL')}
                </TabsTrigger>
                <TabsTrigger value="academic" className="rounded-md">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.ACADEMIC.LABEL')}
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="personal" className="p-6">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="mssv" className="flex items-center text-sm font-medium">
                        <FileText className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.MSSV.LABEL')}
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.MSSV.REQUIRED') && (
                          <span className="ml-1 text-red-500">*</span>
                        )}
                      </Label>
                      <Input
                        id="mssv"
                        placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.MSSV.PLACEHOLDER')}
                        value={form.mssv}
                        onChange={(e) => handleChange('mssv', e.target.value)}
                        className="border-gray-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-500 dark:border-gray-700"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="studentClassName" className="flex items-center text-sm font-medium">
                        <BookOpen className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.CLASS_NAME.LABEL')}
                      </Label>
                      <Input
                        id="studentClassName"
                        placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.CLASS_NAME.PLACEHOLDER')}
                        value={form.studentClassName || ''}
                        onChange={(e) => handleChange('studentClassName', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="flex items-center text-sm font-medium">
                        <User className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.LAST_NAME.LABEL')}
                      </Label>
                      <Input
                        id="lastName"
                        placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.LAST_NAME.PLACEHOLDER')}
                        value={form.lastName || ''}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="middleName" className="flex items-center text-sm font-medium">
                        <User className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.MIDDLE_NAME.LABEL')}
                      </Label>
                      <Input
                        id="middleName"
                        placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.MIDDLE_NAME.PLACEHOLDER')}
                        value={form.middleName || ''}
                        onChange={(e) => handleChange('middleName', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center text-sm font-medium">
                        <User className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.FIRST_NAME.LABEL')}
                      </Label>
                      <Input
                        id="firstName"
                        placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.FIRST_NAME.PLACEHOLDER')}
                        value={form.firstName || ''}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center text-sm font-medium">
                        <Mail className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.EMAIL.LABEL')}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.EMAIL.PLACEHOLDER')}
                        value={form.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center text-sm font-medium">
                        <Phone className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.PHONE.LABEL')}
                      </Label>
                      <Input
                        id="phone"
                        placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.PERSONAL.FIELDS.PHONE.PLACEHOLDER')}
                        value={form.phone || ''}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic" className="p-6">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle" className="flex items-center text-sm font-medium">
                        <FileText className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                        {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.ACADEMIC.FIELDS.PROJECT_TITLE.LABEL')}
                      </Label>
                      <Input
                        id="projectTitle"
                        placeholder={t(
                          'THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.ACADEMIC.FIELDS.PROJECT_TITLE.PLACEHOLDER',
                        )}
                        value={form.projectTitle || ''}
                        onChange={(e) => handleChange('projectTitle', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="supervisor" className="flex items-center text-sm font-medium">
                          <UserCheck className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                          {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.ACADEMIC.FIELDS.SUPERVISOR.LABEL')}
                        </Label>
                        <Input
                          id="supervisor"
                          placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.ACADEMIC.FIELDS.SUPERVISOR.PLACEHOLDER')}
                          value={form.supervisor || ''}
                          onChange={(e) => handleChange('supervisor', e.target.value)}
                          className="border-gray-300 dark:border-gray-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reviewer" className="flex items-center text-sm font-medium">
                          <UserCheck className="mr-1 h-4 w-4 text-slate-500 dark:text-slate-400" />
                          {t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.ACADEMIC.FIELDS.REVIEWER.LABEL')}
                        </Label>
                        <Input
                          id="reviewer"
                          placeholder={t('THESIS_PAGE.STUDENT_LIST.DIALOG.TABS.ACADEMIC.FIELDS.REVIEWER.PLACEHOLDER')}
                          value={form.reviewer || ''}
                          onChange={(e) => handleChange('reviewer', e.target.value)}
                          className="border-gray-300 dark:border-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </ScrollArea>

        <DialogFooter className="flex justify-end gap-2 border-t bg-gray-50 p-6 pt-2 dark:bg-gray-900">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {t('THESIS_PAGE.STUDENT_LIST.DIALOG.BUTTONS.CANCEL')}
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-slate-600 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-800"
          >
            {student
              ? t('THESIS_PAGE.STUDENT_LIST.DIALOG.BUTTONS.UPDATE')
              : t('THESIS_PAGE.STUDENT_LIST.DIALOG.BUTTONS.SAVE')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
