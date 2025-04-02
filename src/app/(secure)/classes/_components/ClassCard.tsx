// components/classes/class-card.tsx
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, File, BookOpen, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
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
import { TClass } from '@/utils/types/classes.type';
import { useClasses } from '@/hooks/useClasses';
import { ClassDialog } from './ClassDialog';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';

interface ClassCardProps {
  classItem: TClass;
}

export function ClassCard({ classItem }: ClassCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const router = useRouter();
  const { update, delete: deleteClass, isUpdating, isDeleting } = useClasses();

  const handleEditSubmit = (data: Omit<TClass, 'id'>) => {
    if (classItem.id) {
      update(classItem.id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDelete = () => {
    if (classItem.id) {
      deleteClass(classItem.id);
    }
  };

  const handleViewDetails = () => {
    router.push(`/classes/${classItem.id}/dashboard`);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="from-primary/10 bg-gradient-to-r to-transparent pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">{classItem.name}</h3>
            <p className="text-sm text-gray-500">{classItem.classCode}</p>
          </div>
          <Badge variant="outline" className="bg-primary/10">
            {classItem.semester}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <BookOpen className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              Course: <span className="font-medium">{classItem.courseCode}</span>
            </span>
          </div>
          <div className="flex items-center text-sm">
            <File className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              Input files: <span className="font-medium">{classItem.studentPaths?.length || 0}</span>
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              Semester: <span className="font-medium">{classItem.semester}</span>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 pt-2">
        <div className="flex w-full justify-between">
          <Button variant="ghost" size="sm" onClick={handleViewDetails}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.Classes }]}>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the class
                      <span className="font-semibold"> {classItem.name}</span> and all associated data.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </ProtectedComponent>
        </div>
      </CardFooter>

      <ClassDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSubmit={handleEditSubmit}
        initialData={classItem}
        mode="edit"
        isSubmitting={isUpdating}
      />
    </Card>
  );
}
