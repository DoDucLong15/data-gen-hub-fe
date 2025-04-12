'use client';

import { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import enTranslations from './locales/en.json';
import viTranslations from './locales/vi.json';

// Định nghĩa kiểu dữ liệu
type TranslationsType = typeof enTranslations;
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}` | Key
    : Key;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<TranslationsType>;

const locales = {
  en: enTranslations,
  vi: viTranslations,
} as const;

type LocaleType = keyof typeof locales;

type I18nContextType = {
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
  t: (key: TranslationKey | string) => string;
  isReady: boolean;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'app_locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [locale, setLocaleState] = useState<LocaleType>('en');

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as LocaleType | null;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'vi')) {
        setLocaleState(savedLocale);
      }
    } catch (e) {
      // Nếu localStorage không khả dụng, giữ nguyên 'en'
      console.log('LocalStorage not available');
    } finally {
      setIsReady(true);
    }
  }, []);

  const setLocale = useCallback((newLocale: LocaleType) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch (e) {
      console.log('LocalStorage not available');
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let result: any = locales[locale];

      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) return key; // Trả về key nếu không tìm thấy
      }

      return result as string;
    },
    [locale],
  );

  return <I18nContext.Provider value={{ locale, setLocale, t, isReady }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
