import { Inter, Roboto_Mono } from 'next/font/google';

// See more: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});
