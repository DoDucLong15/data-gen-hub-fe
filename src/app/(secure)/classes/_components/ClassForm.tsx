import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TClass } from '@/utils/types/classes.type';
import { Spinner } from '@/components/ui/spinner';
import { CURRENT_MESSAGES } from '@/configs/messages.config';

interface ClassFormProps {
  initialData?: TClass;
  onSubmit: (data: Omit<TClass, 'id'>) => void;
  isSubmitting?: boolean;
  onCancel?: () => void;
}

export function ClassForm({ initialData, onSubmit, isSubmitting = false, onCancel }: ClassFormProps) {
  const [formData, setFormData] = useState<Omit<TClass, 'id'>>({
    name: '',
    classCode: '',
    courseCode: '',
    semester: '',
  });
  const { CLASSES } = CURRENT_MESSAGES;

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'driveId') {
      setFormData((prev) => ({ ...prev, [name]: value.trim() === '' ? undefined : value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{CLASSES.FORM.NAME.LABEL}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={CLASSES.FORM.NAME.PLACEHOLDER}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classCode">{CLASSES.FORM.CLASS_CODE.LABEL}</Label>
            <Input
              id="classCode"
              name="classCode"
              value={formData.classCode}
              onChange={handleChange}
              required
              placeholder={CLASSES.FORM.CLASS_CODE.PLACEHOLDER}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="courseCode">{CLASSES.FORM.COURSE_CODE.LABEL}</Label>
            <Input
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
              placeholder={CLASSES.FORM.COURSE_CODE.PLACEHOLDER}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">{CLASSES.FORM.SEMESTER.LABEL}</Label>
            <Input
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              placeholder={CLASSES.FORM.SEMESTER.PLACEHOLDER}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="driveId">{CLASSES.FORM.DRIVE_ID.LABEL}</Label>
          <Input
            id="driveId"
            name="driveId"
            value={formData.driveId || ''}
            onChange={handleChange}
            placeholder={CLASSES.FORM.DRIVE_ID.PLACEHOLDER}
          />
          <p className="text-muted-foreground text-sm">
            {CLASSES.FORM.DRIVE_ID.DESCRIPTION}
            <br />
            <span className="font-bold text-red-400">{CLASSES.FORM.DRIVE_ID.IMPORTANT}:</span>{' '}
            {CLASSES.FORM.DRIVE_ID.ACCESS_NOTE}
            <span className="rounded bg-red-200 px-1 font-mono text-xs">{CLASSES.FORM.DRIVE_ID.SERVICE_ACCOUNT}</span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {CLASSES.FORM.BUTTONS.CANCEL}
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner size="sm" className="mr-2" /> : null}
          {initialData ? CLASSES.FORM.BUTTONS.SAVE : CLASSES.FORM.BUTTONS.CREATE}
        </Button>
      </div>
    </form>
  );
}
