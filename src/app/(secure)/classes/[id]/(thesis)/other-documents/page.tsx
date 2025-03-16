'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GeneratorForm } from './_components/GeneratorFrom';
import { FileText, History } from 'lucide-react';

function OtherDocumentsPage() {
  return (
    <div className="container mx-auto px-6 py-4">
      <Tabs defaultValue="generator" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="generator" className="flex flex-1 items-center justify-center gap-2">
            <FileText className="h-4 w-4" />
            Tạo tài liệu
          </TabsTrigger>
          <TabsTrigger value="history" className="flex flex-1 items-center justify-center gap-2">
            <History className="h-4 w-4" />
            Lịch sử tạo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <GeneratorForm />
        </TabsContent>

        <TabsContent value="history">
          <div className="rounded-lg border p-8 text-center">Lịch sử tạo tài liệu sẽ được hiển thị ở đây</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default OtherDocumentsPage;
