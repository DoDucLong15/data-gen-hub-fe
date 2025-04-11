'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useParams } from 'next/navigation';
import { useStudents } from '@/hooks/useStudents';
import { TExportOptions } from '@/utils/types/student.type';
import { StudentList } from './_components/StudentList';
import { ImportExport } from './_components/StudentImportExport';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';
import { THESIS_PAGE } from '@/configs/messages.config';

export default function StudentsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('list');
  const { STUDENT_LIST } = THESIS_PAGE;

  return (
    <div className="container mx-auto py-1 lg:px-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Students }]}>
            <TabsTrigger value="list">{STUDENT_LIST.TABS.LIST}</TabsTrigger>
          </ProtectedComponent>
          <ProtectedComponent permissions={[{ action: EAction.MANAGE, subject: ESubject.Students }]}>
            <TabsTrigger value="import-export">{STUDENT_LIST.TABS.IMPORT_EXPORT}</TabsTrigger>
          </ProtectedComponent>
        </TabsList>
        <div className="mt-2">
          <TabsContent value="list">
            <StudentList classId={id as string} />
          </TabsContent>
          <TabsContent value="import-export">
            <ImportExport classId={id as string} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
