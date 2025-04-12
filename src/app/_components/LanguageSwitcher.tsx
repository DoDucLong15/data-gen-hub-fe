'use client';

import { useI18n } from '@/i18n';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';

type LocaleType = 'en' | 'vi';

export default function LanguageSwitcher() {
  const { locale, setLocale, isReady } = useI18n();

  if (!isReady) return null;

  // Hiển thị tên ngôn ngữ hiện tại
  const localeText = {
    en: 'EN',
    vi: 'VI',
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex h-8 items-center gap-1">
          <Languages className="h-4 w-4" />
          <span>{localeText[locale as LocaleType]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setLocale('en' as LocaleType)}
          className={locale === 'en' ? 'bg-accent text-accent-foreground' : ''}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale('vi' as LocaleType)}
          className={locale === 'vi' ? 'bg-accent text-accent-foreground' : ''}
        >
          Tiếng Việt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
