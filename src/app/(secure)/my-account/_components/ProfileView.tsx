import { User } from '@/utils/types/user.type';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Pencil, School, Phone, Building, Award, Mail, User as UserIcon } from 'lucide-react';
import { PROFILE_VIEW } from '@/configs/messages.config';

interface ProfileViewProps {
  user: User;
  onEdit: () => void;
}

export default function ProfileView({ user, onEdit }: ProfileViewProps) {
  const profileItems = [
    {
      label: PROFILE_VIEW.FIELDS.NAME.LABEL,
      value: user.name || PROFILE_VIEW.NO_DATA,
      icon: <UserIcon className="text-primary/60 h-5 w-5" />,
    },
    {
      label: PROFILE_VIEW.FIELDS.EMAIL.LABEL,
      value: user.email,
      icon: <Mail className="text-primary/60 h-5 w-5" />,
    },
    {
      label: PROFILE_VIEW.FIELDS.PHONE.LABEL,
      value: user.phone || PROFILE_VIEW.NO_DATA,
      icon: <Phone className="text-primary/60 h-5 w-5" />,
    },
    {
      label: PROFILE_VIEW.FIELDS.SCHOOL.LABEL,
      value: user.school || PROFILE_VIEW.NO_DATA,
      icon: <School className="text-primary/60 h-5 w-5" />,
    },
    {
      label: PROFILE_VIEW.FIELDS.DEPARTMENT.LABEL,
      value: user.department || PROFILE_VIEW.NO_DATA,
      icon: <Building className="text-primary/60 h-5 w-5" />,
    },
    {
      label: PROFILE_VIEW.FIELDS.POSITION.LABEL,
      value: user.position || PROFILE_VIEW.NO_DATA,
      icon: <Award className="text-primary/60 h-5 w-5" />,
    },
  ];

  return (
    <Card className="bg-card/30 overflow-hidden backdrop-blur-sm">
      <CardHeader className="bg-muted/30 border-b pb-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl">{PROFILE_VIEW.TITLE}</CardTitle>
            <CardDescription>{PROFILE_VIEW.DESCRIPTION}</CardDescription>
          </div>
          <Button onClick={onEdit} className="gap-2">
            <Pencil className="h-4 w-4" />
            {PROFILE_VIEW.EDIT_BUTTON}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {profileItems.map((item, index) => (
            <div
              key={index}
              className="hover:border-primary/50 hover:bg-muted/50 flex items-start gap-3 rounded-lg border p-4 transition-all"
            >
              <div className="mt-1">{item.icon}</div>
              <div className="space-y-1">
                <Label className="text-muted-foreground text-sm">{item.label}</Label>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
