import { User } from '@/utils/types/user.type';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { capitalizeFirstLetters } from '@/utils/common.util';
import { Camera, UserCircle, Mail, BadgeCheck } from 'lucide-react';

interface UserSidebarProps {
  user: User;
}

export default function UserSidebar({ user }: UserSidebarProps) {
  return (
    <Card className="bg-card/30 overflow-hidden backdrop-blur-sm">
      <div className="from-primary/20 to-primary/40 relative h-32 w-full bg-gradient-to-r">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform">
          <div className="relative">
            <Avatar className="border-background h-24 w-24 border-4">
              <AvatarImage src="/user.png" alt={user.name || 'User'} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {user.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-0 bottom-0 h-8 w-8 rounded-full shadow-md"
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="mt-14 pt-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">{user.name || 'Chưa cập nhật'}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="mt-3">
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
              {capitalizeFirstLetters(user.role)}
            </span>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="space-y-5">
          <div className="flex items-start gap-3">
            <UserCircle className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">ID</Label>
              <p className="text-sm font-medium">{user.id}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Email</Label>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BadgeCheck className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Vai trò</Label>
              <p className="text-sm font-medium">{capitalizeFirstLetters(user.role)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
