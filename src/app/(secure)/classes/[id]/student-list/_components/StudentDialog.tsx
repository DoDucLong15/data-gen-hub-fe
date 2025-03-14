import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TStudent } from '@/utils/types/student.type';
import { User, Phone, Mail, BookOpen, UserCheck, FileText } from 'lucide-react';

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
    // Basic validation
    if (!form.mssv.trim()) {
      alert('Student ID is required');
      return;
    }
    onSave(form);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-950 rounded-lg border dark:border-gray-800">
        <DialogHeader className="p-6 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
            {student ? (
              <>
                <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                Edit Student Details
              </>
            ) : (
              <>
                <User className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                Add New Student
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {student ? 'Update student information' : 'Fill in the student details below'}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <Tabs defaultValue="personal" className="w-full">
            <div className="px-6 pt-2">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="personal" className="rounded-md">
                  <User className="mr-2 h-4 w-4" />
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="academic" className="rounded-md">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Academic Details
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="personal" className="p-6">
              <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="mssv" className="text-sm font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        MSSV (Student ID) <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="mssv"
                        placeholder="Enter student ID"
                        value={form.mssv}
                        onChange={(e) => handleChange('mssv', e.target.value)}
                        className="border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="studentClassName" className="text-sm font-medium flex items-center">
                        <BookOpen className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        Student Class Name
                      </Label>
                      <Input
                        id="studentClassName"
                        placeholder="Enter class name"
                        value={form.studentClassName || ''}
                        onChange={(e) => handleChange('studentClassName', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium flex items-center">
                        <User className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Enter last name"
                        value={form.lastName || ''}
                        onChange={(e) => handleChange('lastName', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="middleName" className="text-sm font-medium flex items-center">
                        <User className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        Middle Name
                      </Label>
                      <Input
                        id="middleName"
                        placeholder="Enter middle name"
                        value={form.middleName || ''}
                        onChange={(e) => handleChange('middleName', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium flex items-center">
                        <User className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Enter first name"
                        value={form.firstName || ''}
                        onChange={(e) => handleChange('firstName', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium flex items-center">
                        <Mail className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        value={form.email || ''}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium flex items-center">
                        <Phone className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        placeholder="Enter phone number"
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
                      <Label htmlFor="projectTitle" className="text-sm font-medium flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                        Project Title
                      </Label>
                      <Input
                        id="projectTitle"
                        placeholder="Enter project title"
                        value={form.projectTitle || ''}
                        onChange={(e) => handleChange('projectTitle', e.target.value)}
                        className="border-gray-300 dark:border-gray-700"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="supervisor" className="text-sm font-medium flex items-center">
                          <UserCheck className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                          Supervisor
                        </Label>
                        <Input
                          id="supervisor"
                          placeholder="Enter supervisor name"
                          value={form.supervisor || ''}
                          onChange={(e) => handleChange('supervisor', e.target.value)}
                          className="border-gray-300 dark:border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reviewer" className="text-sm font-medium flex items-center">
                          <UserCheck className="h-4 w-4 mr-1 text-slate-500 dark:text-slate-400" />
                          Reviewer
                        </Label>
                        <Input
                          id="reviewer"
                          placeholder="Enter reviewer name"
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
        
        <DialogFooter className="p-6 pt-2 border-t bg-gray-50 dark:bg-gray-900 flex justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-slate-600 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-800"
          >
            {student ? 'Update Student' : 'Save Student'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}