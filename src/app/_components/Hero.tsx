'use client';

import React from 'react';
import { ArrowRight, Database, FileText, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useI18n } from '@/i18n';

function Hero() {
  const { t, isReady } = useI18n();
  if (!isReady) return null;
  return (
    <div className="my-16 px-6 md:my-16">
      {/* Main Hero Section */}
      <div className="flex flex-col items-center justify-center text-center">
        <span className="text-primary mb-4 inline-block rounded-full bg-indigo-100 px-4 py-1 text-base font-medium">
          {t('HERO.BADGE')}
        </span>
        <h1 className="mt-4 mb-6 text-4xl font-bold text-slate-800 md:text-5xl lg:text-6xl">{t('HERO.TITLE')}</h1>
        <p className="mb-8 max-w-3xl text-lg text-slate-600 md:text-xl">{t('HERO.DESCRIPTION')}</p>

        {/* CTA Buttons */}
        <div className="mb-12 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Link href="/account/login">
            <Button className="transition-al flex cursor-pointer items-center justify-center rounded-lg px-6 py-3 text-base font-medium text-white md:px-8 md:py-4 md:text-lg">
              {t('HERO.CTA.START')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link
            href={
              process.env.NEXT_PUBLIC_URL_DEMO ||
              'https://drive.google.com/file/d/1Pic9QHPUF1s6AczS1DuQbmf0WM30aWH9/view?usp=sharing'
            }
            target="_blank"
          >
            <Button className="flex cursor-pointer items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 transition-all hover:bg-slate-50 md:px-8 md:py-4 md:text-lg">
              {t('HERO.CTA.DEMO')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Features Overview */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 p-3">
            <Database className="text-primary h-6 w-6" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-slate-800">{t('HERO.FEATURES.DATA_COLLECTION.TITLE')}</h3>
          <p className="text-slate-600">{t('HERO.FEATURES.DATA_COLLECTION.DESCRIPTION')}</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 p-3">
            <FileText className="text-primary h-6 w-6" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-slate-800">{t('HERO.FEATURES.SMART_DATA.TITLE')}</h3>
          <p className="text-slate-600">{t('HERO.FEATURES.SMART_DATA.DESCRIPTION')}</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 p-3">
            <Users className="text-primary h-6 w-6" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-slate-800">{t('HERO.FEATURES.COLLABORATION.TITLE')}</h3>
          <p className="text-slate-600">{t('HERO.FEATURES.COLLABORATION.DESCRIPTION')}</p>
        </div>
      </div>

      {/* Trust Badge - Enhanced */}
      <div className="mt-20 rounded-2xl bg-gradient-to-r from-slate-200 to-slate-400 py-10">
        <h3 className="mb-8 text-center text-2xl font-bold text-slate-900">{t('HERO.TRUSTED_BY')}</h3>
        <div className="flex flex-wrap items-center justify-center gap-8 px-4">
          <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <Image src="/logo-dhqg.png" alt="Đại học Quốc gia TPHCM" width={180} height={180} />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <Image src="/logo-hust.png" alt="Đại học Bách Khoa Hà Nội" width={80} height={80} />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <Image src="/logo-fpt.png" alt="Đại học FPT" width={180} height={180} />
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md">
            <Image src="/logo-dhqghn.png" alt="Đại học Quốc gia Hà Nội" width={160} height={160} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
