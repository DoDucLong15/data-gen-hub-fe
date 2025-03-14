"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useStudents } from "@/hooks/useStudents";
import { TExportOptions } from "@/utils/types/student.type";
import { StudentList } from "./_components/StudentList";
import { ImportExport } from "./_components/StudentImportExport";

export default function StudentsPage() {
  const {id} = useParams();
  const [activeTab, setActiveTab] = useState("list");
  const { exportStudents } = useStudents(id as string);

  const handleExport = (options: TExportOptions) => {
    exportStudents(options);
  };

  return (
    <div className="container mx-auto py-1">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="import-export">Import</TabsTrigger>
        </TabsList>
        <div className="mt-2">
          <TabsContent value="list">
            <StudentList onExport={handleExport} classId={id as string}/>
          </TabsContent>
          <TabsContent value="import-export">
            <ImportExport classId={id as string}/>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}