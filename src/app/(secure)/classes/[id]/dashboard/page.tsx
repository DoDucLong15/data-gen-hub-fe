'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FolderInput, FolderOutput, FileText } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useClasses } from '@/hooks/useClasses';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import { ProtectedComponent } from '@/components/common/ProtectedComponent';

export default function Dashboard() {
  // Sử dụng TanStack Query để lấy dữ liệu
  const { id } = useParams();
  const { getById } = useClasses();
  const { data: classDetail, isLoading } = getById(id as string);

  const inputPaths = classDetail?.studentPaths || [];
  const outputPath = classDetail?.outputPath || '';

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <ProtectedComponent permissions={[{ action: EAction.READ, subject: ESubject.Classes }]}>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <main className="flex-1 p-4">
          <div className="grid gap-6">
            {/* Thống kê tổng quan */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tổng số file nhập</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FolderInput className="mr-2 h-4 w-4 text-blue-500" />
                    <span className="text-2xl font-bold">{inputPaths.length}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">File xuất</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FolderOutput className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-2xl font-bold">{outputPath ? 1 : 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Trạng thái</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="text-2xl font-bold">
                      {inputPaths.length > 0 && outputPath ? 'Đã xử lý' : 'Chưa xử lý'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Danh sách Input Paths */}
            <Card>
              <CardHeader>
                <CardTitle>Input Paths</CardTitle>
                <CardDescription>Danh sách các file nguồn đã được import vào hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Separator />

                  <div className="space-y-2">
                    {inputPaths.length > 0 ? (
                      inputPaths.map((path, index) => (
                        <div key={index} className="flex items-center rounded-md border p-3">
                          <FileText className="mr-2 h-4 w-4 text-blue-500" />
                          <span className="font-medium">{path}</span>
                        </div>
                      ))
                    ) : (
                      <div className="py-4 text-center text-gray-500">Chưa có file nguồn nào</div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Output Path */}
            <Card>
              <CardHeader>
                <CardTitle>Output Path</CardTitle>
                <CardDescription>Đường dẫn file dữ liệu đã được xuất</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {outputPath ? (
                    <div className="rounded-md border p-3">
                      <div className="flex items-center">
                        <FolderOutput className="mr-2 h-5 w-5 text-green-500" />
                        <span className="font-medium">{outputPath}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="py-4 text-center text-gray-500">Chưa có file xuất</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedComponent>
  );
}
