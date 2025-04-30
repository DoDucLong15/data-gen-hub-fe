import { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TClass } from '@/utils/types/classes.type';
import { Spinner } from '@/components/ui/spinner';
import { useI18n } from '@/i18n';
import Link from 'next/link';

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
  const { t, isReady } = useI18n();

  useEffect(() => {
    if (initialData) {
      const { id, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'driveId' || name === 'onedriveSharedLink') {
      setFormData((prev) => ({ ...prev, [name]: value.trim() === '' ? undefined : value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isReady) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">{t('CLASSES.FORM.NAME.LABEL')}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t('CLASSES.FORM.NAME.PLACEHOLDER')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="classCode">{t('CLASSES.FORM.CLASS_CODE.LABEL')}</Label>
            <Input
              id="classCode"
              name="classCode"
              value={formData.classCode}
              onChange={handleChange}
              required
              placeholder={t('CLASSES.FORM.CLASS_CODE.PLACEHOLDER')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="courseCode">{t('CLASSES.FORM.COURSE_CODE.LABEL')}</Label>
            <Input
              id="courseCode"
              name="courseCode"
              value={formData.courseCode}
              onChange={handleChange}
              required
              placeholder={t('CLASSES.FORM.COURSE_CODE.PLACEHOLDER')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="semester">{t('CLASSES.FORM.SEMESTER.LABEL')}</Label>
            <Input
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              placeholder={t('CLASSES.FORM.SEMESTER.PLACEHOLDER')}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="driveId">{t('CLASSES.FORM.DRIVE_ID.LABEL')}</Label>
          <Input
            id="driveId"
            name="driveId"
            value={formData.driveId || ''}
            onChange={handleChange}
            placeholder={t('CLASSES.FORM.DRIVE_ID.PLACEHOLDER')}
          />
          <p className="text-muted-foreground text-sm">
            {/* {t('CLASSES.FORM.DRIVE_ID.DESCRIPTION')}
            <br /> */}
            <span className="font-bold text-red-400">{t('CLASSES.FORM.DRIVE_ID.IMPORTANT')}:</span>{' '}
            {t('CLASSES.FORM.DRIVE_ID.ACCESS_NOTE')}
            <span className="rounded bg-red-200 px-1 font-mono text-xs">
              {t('CLASSES.FORM.DRIVE_ID.SERVICE_ACCOUNT')}
            </span>
            <br />
            {/* Instructions */}
            <span className="rounded text-sm font-bold">
              {t('CLASSES.FORM.DRIVE_ID.INSTRUCTIONS')}:{' '}
              <Link
                href={process.env.NEXT_PUBLIC_URL_INSTRUCTION_DRIVE || ''}
                target="_blank"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Link
              </Link>
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="onedriveSharedLink">{t('CLASSES.FORM.ONEDRIVE_SHARED_LINK.LABEL')}</Label>
          <Input
            id="onedriveSharedLink"
            name="onedriveSharedLink"
            value={formData.onedriveSharedLink || ''}
            onChange={handleChange}
            placeholder={t('CLASSES.FORM.ONEDRIVE_SHARED_LINK.PLACEHOLDER')}
          />
          <p className="text-muted-foreground text-sm">
            {t('CLASSES.FORM.ONEDRIVE_SHARED_LINK.DESCRIPTION')}
            <br />
            <span className="font-bold text-red-400">{t('CLASSES.FORM.ONEDRIVE_SHARED_LINK.IMPORTANT')}:</span>{' '}
            {t('CLASSES.FORM.ONEDRIVE_SHARED_LINK.ACCESS_NOTE')}
            <span className="rounded bg-red-200 px-1 font-mono text-xs">
              {t('CLASSES.FORM.ONEDRIVE_SHARED_LINK.SERVICE_ACCOUNT')}
            </span>
            <br />
            {/* Instructions */}
            <span className="rounded text-sm font-bold">
              {t('CLASSES.FORM.ONEDRIVE_SHARED_LINK.INSTRUCTIONS')}:{' '}
              <Link
                href={process.env.NEXT_PUBLIC_URL_INSTRUCTION_ONEDRIVE || ''}
                target="_blank"
                className="text-blue-500 underline hover:text-blue-600"
              >
                Link
              </Link>
            </span>
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {t('CLASSES.FORM.BUTTONS.CANCEL')}
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner size="sm" className="mr-2" /> : null}
          {initialData ? t('CLASSES.FORM.BUTTONS.SAVE') : t('CLASSES.FORM.BUTTONS.CREATE')}
        </Button>
      </div>
    </form>
  );
}
