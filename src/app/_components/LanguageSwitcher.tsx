'use client';

import { useI18n } from '@/i18n';
import { ChevronDown } from 'lucide-react';
import ReactCountryFlag from 'react-country-flag';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type LocaleType = 'en' | 'vi';

export default function LanguageSwitcher() {
  const { locale, setLocale, isReady } = useI18n();

  if (!isReady) return null;

  // Language options with country codes for flags
  const languages = [
    { code: 'en', name: 'English (US)', displayName: 'English', countryCode: 'US' },
    { code: 'vi', name: 'Vietnamese', displayName: 'Vietnamese', countryCode: 'VN' },
  ];

  // Get current language display info
  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-foreground hover:text-foreground/90 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-200 focus:outline-none">
          <ReactCountryFlag
            countryCode={currentLanguage.countryCode}
            svg
            style={{
              width: '18px',
              height: '12px',
            }}
          />
          <span>{currentLanguage.displayName}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLocale(lang.code as LocaleType)}
            className="flex cursor-pointer items-center gap-2"
          >
            <ReactCountryFlag
              countryCode={lang.countryCode}
              svg
              style={{
                width: '18px',
                height: '12px',
              }}
            />
            <span>{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
