import { User } from '@/utils/types/user.type';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { capitalizeFirstLetters } from '@/utils/common.util';
import { Camera, UserCircle, Mail, BadgeCheck } from 'lucide-react';
import { useI18n } from '@/i18n';
import { useAuth } from '@/context/auth.context';
import { useRef } from 'react';
import { toast } from 'sonner';

interface UserSidebarProps {
  user: User;
}

export default function UserSidebar({ user }: UserSidebarProps) {
  const { t, isReady } = useI18n();
  const { updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isReady) return null;

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await updateUser(
        {
          id: user.id,
        },
        file,
      );
      toast(t('USER_SIDEBAR.AVATAR.UPLOAD_SUCCESS'));
    } catch (error) {
      console.error('Failed to upload avatar:', error);
      toast.error(t('USER_SIDEBAR.AVATAR.UPLOAD_ERROR'));
    }
  };

  return (
    <Card className="bg-card/30 overflow-hidden backdrop-blur-sm">
      <div className="from-primary/20 to-primary/40 relative h-32 w-full bg-gradient-to-r">
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 transform">
          <div className="relative">
            <Avatar className="border-background h-24 w-24 border-4">
              <AvatarImage src={user.avatar?.url || '/user.png'} alt={user.name || t('USER_SIDEBAR.AVATAR.ALT')} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {user.name?.charAt(0) || t('USER_SIDEBAR.AVATAR.FALLBACK')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-0 bottom-0 h-8 w-8 rounded-full shadow-md"
              aria-label={t('USER_SIDEBAR.AVATAR.UPLOAD_BUTTON')}
              onClick={handleUploadClick}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
          </div>
        </div>
      </div>

      <CardContent className="mt-14 pt-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold">{user.name || t('USER_SIDEBAR.NAME_NOT_SET')}</h2>
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
              <Label className="text-muted-foreground text-xs">{t('USER_SIDEBAR.INFO.ID.LABEL')}</Label>
              <p className="text-sm font-medium">{user.id}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">{t('USER_SIDEBAR.INFO.EMAIL.LABEL')}</Label>
              <p className="text-sm font-medium">{user.email}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <BadgeCheck className="text-muted-foreground mt-0.5 h-5 w-5" />
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">{t('USER_SIDEBAR.INFO.ROLE.LABEL')}</Label>
              <p className="text-sm font-medium">{capitalizeFirstLetters(user.role)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
