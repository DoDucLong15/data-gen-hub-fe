import { TNavbarContent } from '../types/nav-bar.type';
import { NAVBAR } from '@/configs/messages.config';

export const NAVBAR_CONTENT: TNavbarContent[] = [
  { label: NAVBAR.HOME, href: '/' },
  { label: NAVBAR.CLASSES, href: '/classes' },
  { label: NAVBAR.ABOUT_US, href: '/about-us' },
  { label: NAVBAR.CONTACT_US, href: '/contact-us' },
];
