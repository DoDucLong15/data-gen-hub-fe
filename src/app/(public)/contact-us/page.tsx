// app/contact/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MailIcon, PhoneIcon, MapPinIcon, CheckCircle, Send } from 'lucide-react';
import { useI18n } from '@/i18n';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const { t, isReady } = useI18n();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Giả lập gửi form - trong thực tế sẽ gọi API
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  // Tạo mảng FAQ items động theo ngôn ngữ hiện tại
  const faqItems = [
    {
      question: t('CONTACT_US.FAQ.ITEMS.0.QUESTION'),
      answer: t('CONTACT_US.FAQ.ITEMS.0.ANSWER'),
    },
    {
      question: t('CONTACT_US.FAQ.ITEMS.1.QUESTION'),
      answer: t('CONTACT_US.FAQ.ITEMS.1.ANSWER'),
    },
    {
      question: t('CONTACT_US.FAQ.ITEMS.2.QUESTION'),
      answer: t('CONTACT_US.FAQ.ITEMS.2.ANSWER'),
    },
    {
      question: t('CONTACT_US.FAQ.ITEMS.3.QUESTION'),
      answer: t('CONTACT_US.FAQ.ITEMS.3.ANSWER'),
    },
  ];

  if (!isReady) return null;

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-600 to-slate-700 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">{t('CONTACT_US.HERO.TITLE')}</h1>
          <p className="mx-auto max-w-2xl text-xl text-blue-100">{t('CONTACT_US.HERO.DESCRIPTION')}</p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="h-full rounded-lg bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-slate-700">{t('CONTACT_US.CONTACT_INFO.TITLE')}</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-blue-100 p-3 text-slate-700">
                      <MailIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('CONTACT_US.CONTACT_INFO.EMAIL.LABEL')}</h3>
                      <Link href={`mailto:llong6412@gmail.com`} className="text-slate-600 hover:underline">
                        llong6412@gmail.com
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-blue-100 p-3 text-slate-700">
                      <PhoneIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('CONTACT_US.CONTACT_INFO.PHONE.LABEL')}</h3>
                      <Link
                        href={`tel:${t('CONTACT_US.CONTACT_INFO.PHONE.VALUE')}`}
                        className="text-slate-600 hover:underline"
                      >
                        {t('CONTACT_US.CONTACT_INFO.PHONE.VALUE')}
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-4 rounded-full bg-blue-100 p-3 text-slate-700">
                      <MapPinIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{t('CONTACT_US.CONTACT_INFO.ADDRESS.LABEL')}</h3>
                      <p className="text-gray-600">Gia Lâm, Hà Nội</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="mb-3 font-semibold text-gray-900">
                    {t('CONTACT_US.CONTACT_INFO.WORKING_HOURS.TITLE')}
                  </h3>
                  <p className="whitespace-pre-line text-gray-600">
                    {t('CONTACT_US.CONTACT_INFO.WORKING_HOURS.SCHEDULE')}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="py-12 text-center">
                      <div className="mb-4 flex justify-center">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                      </div>
                      <h2 className="mb-2 text-2xl font-bold">{t('CONTACT_US.FORM.SUCCESS.TITLE')}</h2>
                      <p className="mb-8 text-gray-600">{t('CONTACT_US.FORM.SUCCESS.MESSAGE')}</p>
                      <Button onClick={() => setSubmitted(false)}>{t('CONTACT_US.FORM.SUCCESS.NEW_MESSAGE')}</Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="mb-6 text-2xl font-bold text-slate-700">{t('CONTACT_US.FORM.TITLE')}</h2>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                              {t('CONTACT_US.FORM.NAME.LABEL')}
                            </label>
                            <Input
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              placeholder={t('CONTACT_US.FORM.NAME.PLACEHOLDER')}
                            />
                          </div>

                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                              {t('CONTACT_US.FORM.EMAIL.LABEL')}
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              placeholder={t('CONTACT_US.FORM.EMAIL.PLACEHOLDER')}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium">
                            {t('CONTACT_US.FORM.SUBJECT.LABEL')}
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder={t('CONTACT_US.FORM.SUBJECT.PLACEHOLDER')}
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium">
                            {t('CONTACT_US.FORM.MESSAGE.LABEL')}
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder={t('CONTACT_US.FORM.MESSAGE.PLACEHOLDER')}
                            rows={5}
                          />
                        </div>

                        <Button type="submit" size="lg" className="w-full cursor-pointer md:w-auto">
                          <Send className="mr-2 h-4 w-4" /> {t('CONTACT_US.FORM.SUBMIT')}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold">{t('CONTACT_US.FAQ.TITLE')}</h2>
            <p className="text-lg text-gray-600">{t('CONTACT_US.FAQ.DESCRIPTION')}</p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-6">
              {faqItems.map((faq, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-6">
                  <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-700 py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">{t('CONTACT_US.CTA.TITLE')}</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-blue-100">{t('CONTACT_US.CTA.DESCRIPTION')}</p>
          <Button asChild size="lg" className="bg-white text-slate-700 hover:bg-blue-50">
            <Link href="/account/register">{t('CONTACT_US.CTA.SIGNUP')}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
