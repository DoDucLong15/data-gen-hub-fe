'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GraduationCap, Clock, BarChart, Layers, ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n';
export default function AboutPage() {
  const { t, isReady } = useI18n();
  if (!isReady) return null;
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="from-primary bg-gradient-to-r to-transparent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="space-y-6 md:w-1/2">
              <h1 className="text-4xl font-bold md:text-5xl">{t('ABOUT_US.HERO.TITLE')}</h1>
              <p className="text-xl text-blue-100 md:text-2xl">{t('ABOUT_US.HERO.DESCRIPTION')}</p>
              <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
                <Link href="/contact-us">
                  {t('ABOUT_US.HERO.CONTACT_NOW')} <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="flex justify-center md:w-1/2">
              <div className="relative aspect-video w-full max-w-md rounded-lg bg-white/10 p-1">
                <div className="absolute inset-0 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex h-full items-center justify-center">
                    <GraduationCap className="h-24 w-24 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">{t('ABOUT_US.MISSION.TITLE')}</h2>
            <p className="text-lg text-gray-600">{t('ABOUT_US.MISSION.DESCRIPTION')}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{t('ABOUT_US.MISSION.FEATURES.TIME_SAVING.TITLE')}</h3>
              <p className="text-gray-600">{t('ABOUT_US.MISSION.FEATURES.TIME_SAVING.DESCRIPTION')}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
                <BarChart className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{t('ABOUT_US.MISSION.FEATURES.HIGH_EFFICIENCY.TITLE')}</h3>
              <p className="text-gray-600">{t('ABOUT_US.MISSION.FEATURES.HIGH_EFFICIENCY.DESCRIPTION')}</p>
            </div>

            <div className="rounded-lg bg-gray-50 p-8">
              <div className="mb-4 inline-flex rounded-full bg-blue-100 p-3 text-blue-700">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{t('ABOUT_US.MISSION.FEATURES.COMPREHENSIVE.TITLE')}</h3>
              <p className="text-gray-600">{t('ABOUT_US.MISSION.FEATURES.COMPREHENSIVE.DESCRIPTION')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">{t('ABOUT_US.TEAM.TITLE')}</h2>
            <p className="text-lg text-gray-600">{t('ABOUT_US.TEAM.DESCRIPTION')}</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: 'Đỗ Đức Long',
                role: t('ABOUT_US.TEAM.MEMBERS.CEO.ROLE'),
                image: '/member.png',
              },
              {
                name: 'Đỗ Đức Long',
                role: t('ABOUT_US.TEAM.MEMBERS.CTO.ROLE'),
                image: '/member.png',
              },
              {
                name: 'Đỗ Đức Long',
                role: t('ABOUT_US.TEAM.MEMBERS.HEAD_DEV.ROLE'),
                image: '/member.png',
              },
            ].map((member, index) => (
              <div key={index} className="rounded-lg bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 h-32 w-32 overflow-hidden rounded-full">
                  <Image src={member.image} alt={member.name} width={128} height={128} className="object-cover" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-slate-800">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-700 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">{t('ABOUT_US.CTA.TITLE')}</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">{t('ABOUT_US.CTA.DESCRIPTION')}</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-slate-700 hover:bg-blue-50">
              <Link href="/contact-us">{t('ABOUT_US.CTA.CONTACT_NOW')}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-slate-700 hover:bg-blue-50">
              <Link href={process.env.NEXT_PUBLIC_URL_DEMO || ''} target="_blank">
                {t('ABOUT_US.CTA.LEARN_MORE')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
