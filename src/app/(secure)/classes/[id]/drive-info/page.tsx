'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
import { FileExplorer } from './_components/FileExplorer';

export default function FileManagerPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Quản lý Files & Thư mục</h1>
        <p className="text-muted-foreground">Quản lý tất cả các tệp và thư mục của bạn tại một nơi.</p>
      </div>

      <Card>
        <CardContent>
          <FileExplorer classId={id as string} />
        </CardContent>
      </Card>
    </div>
  );
}
