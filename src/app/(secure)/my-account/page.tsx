'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/context/auth.context';
import UserSidebar from './_components/UserSidebar';
import ProfileForm from './_components/ProfileForm';
import ProfileView from './_components/ProfileView';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AccountLayout() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[400px] items-center justify-center py-10">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="text-muted-foreground mt-4">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto py-10">
        <Card className="bg-card/30 backdrop-blur-sm">
          <CardContent className="py-10">
            <div className="text-center">
              <h2 className="text-xl font-semibold">Không tìm thấy thông tin người dùng</h2>
              <p className="text-muted-foreground mt-2">Vui lòng đăng nhập để xem thông tin tài khoản của bạn.</p>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 rounded-md px-4 py-2 transition-colors"
                onClick={() => router.push('/account/login')}
              >
                Đăng nhập
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="mb-6 text-2xl font-bold">Tài khoản của tôi</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Sidebar */}
        <div className="md:col-span-4 lg:col-span-3">
          <UserSidebar user={user} />
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 lg:col-span-9">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full rounded-lg p-1">
              <TabsTrigger value="profile" className="data-[state=active]:bg-background rounded-md">
                Hồ sơ
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              {isEditing ? (
                <ProfileForm user={user} onCancel={() => setIsEditing(false)} onSuccess={() => setIsEditing(false)} />
              ) : (
                <ProfileView user={user} onEdit={() => setIsEditing(true)} />
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
