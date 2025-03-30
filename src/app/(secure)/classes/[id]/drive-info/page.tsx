'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { FileExplorer } from './_components/FileExplorer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SyncHistory } from './_components/SyncHistory';

export default function FileManagerPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('files');

  return (
    <div className="container mx-auto space-y-6 py-3">
      <Card>
        <CardContent>
          <Tabs defaultValue="files" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="files" className="flex-1">
                Drives
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1">
                History Sync Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="files" className="w-full">
              <FileExplorer classId={id as string} />
            </TabsContent>

            <TabsContent value="history" className="w-full">
              <SyncHistory classId={id as string} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
