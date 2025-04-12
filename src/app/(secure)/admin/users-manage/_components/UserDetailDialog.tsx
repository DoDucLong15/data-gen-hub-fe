'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@/configs/role.config';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { USERS_QUERY_KEY } from '@/hooks/useUsers';
import { User } from '@/utils/types/user.type';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Building, BookOpen, Users, Calendar, ClockIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useI18n } from '@/i18n';

type UserDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
};

export function UserDetailDialog({ open, onOpenChange, userId }: UserDetailDialogProps) {
  const queryClient = useQueryClient();
  const { t, isReady } = useI18n();

  const { data: user, isLoading } = useQuery({
    queryKey: [...USERS_QUERY_KEY, 'user', userId],
    queryFn: () => {
      const users: User[] | undefined = queryClient.getQueryData(USERS_QUERY_KEY);
      if (!users) return null;
      return users.find((u) => u.id === userId);
    },
    enabled: !!userId,
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case UserRole.ADMIN:
        return <Badge variant="destructive">{t('USER_DETAIL.ROLES.ADMIN')}</Badge>;
      default:
        return <Badge variant="secondary">{t('USER_DETAIL.ROLES.TEACHER')}</Badge>;
    }
  };

  const InfoItem = ({
    icon,
    label,
    value,
    className = '',
  }: {
    icon: React.ReactNode;
    label: string;
    value?: string | React.ReactNode;
    className?: string;
  }) => (
    <div className={cn('flex items-start space-x-3', className)}>
      <div className="text-muted-foreground mt-0.5 flex-shrink-0">{icon}</div>
      <div className="space-y-1">
        <p className="text-muted-foreground text-sm">{label}</p>
        <p className="font-medium">
          {value || <span className="text-muted-foreground italic">{t('USER_DETAIL.NO_DATA')}</span>}
        </p>
      </div>
    </div>
  );

  if (!isReady) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-[600px]">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-xl font-bold">{t('USER_DETAIL.TITLE')}</DialogTitle>
          <DialogDescription>{t('USER_DETAIL.DESCRIPTION')}</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4 p-6">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex space-x-3">
                  <Skeleton className="h-8 w-8" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
          </div>
        ) : user ? (
          <>
            <div className="px-6 py-4">
              <div className="mb-6 flex items-center">
                <Avatar className="mr-4 h-16 w-16">
                  <AvatarImage src="/user.png" alt={user.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                    {user.name?.substring(0, 2).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <div className="mt-1 flex items-center space-x-2">
                    {getRoleBadge(user.role)}
                    <Badge variant="outline" className="ml-2">
                      {user.id}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <InfoItem icon={<Mail size={18} />} label={t('USER_DETAIL.INFO_ITEMS.EMAIL')} value={user.email} />
                <InfoItem icon={<Phone size={18} />} label={t('USER_DETAIL.INFO_ITEMS.PHONE')} value={user.phone} />
                <InfoItem
                  icon={<Building size={18} />}
                  label={t('USER_DETAIL.INFO_ITEMS.SCHOOL')}
                  value={user.school}
                />
                <InfoItem
                  icon={<BookOpen size={18} />}
                  label={t('USER_DETAIL.INFO_ITEMS.DEPARTMENT')}
                  value={user.department}
                />
                <InfoItem
                  icon={<Users size={18} />}
                  label={t('USER_DETAIL.INFO_ITEMS.POSITION')}
                  value={user.position}
                />
                <InfoItem
                  icon={<Calendar size={18} />}
                  label={t('USER_DETAIL.INFO_ITEMS.CREATED_AT')}
                  value={user.createdAt && new Date(user.createdAt).toLocaleString('vi-VN')}
                />
                <InfoItem
                  icon={<ClockIcon size={18} />}
                  label={t('USER_DETAIL.INFO_ITEMS.UPDATED_AT')}
                  value={user.updatedAt && new Date(user.updatedAt).toLocaleString('vi-VN')}
                />
              </div>
            </div>

            <Card className="mt-2 rounded-none rounded-b-lg border-t">
              <CardContent className="p-0">
                <div className="bg-muted/50 flex items-center justify-between px-6 py-3">
                  <p className="text-sm font-medium">{t('USER_DETAIL.ACCOUNT_STATUS.TITLE')}</p>
                  <Badge variant="outline" className="bg-green-500">
                    {t('USER_DETAIL.ACCOUNT_STATUS.ACTIVE')}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-2 rounded-full bg-red-100 p-3 text-red-600">
              <Users size={24} />
            </div>
            <p className="text-lg font-medium text-red-500">{t('USER_DETAIL.ERROR.TITLE')}</p>
            <p className="text-muted-foreground mt-1 text-sm">{t('USER_DETAIL.ERROR.MESSAGE')}</p>
          </div>
        )}

        <DialogFooter className="bg-muted/30 px-6 py-4">
          <Button onClick={() => onOpenChange(false)}>{t('USER_DETAIL.CLOSE_BUTTON')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
