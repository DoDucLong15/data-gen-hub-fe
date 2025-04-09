import { VIETNAMESE_MESSAGES } from './vietnamese-messages';
import { ENGLISH_MESSAGES } from './english-messages';

export const DEFAULT_LANGUAGE = process.env.NEXT_PUBLIC_LANGUAGE || 'vi';

export const MESSAGES = {
  vi: VIETNAMESE_MESSAGES,
  en: ENGLISH_MESSAGES,
};

export const getCurrentMessages = () => {
  return MESSAGES[DEFAULT_LANGUAGE as keyof typeof MESSAGES] || MESSAGES.vi;
};

export const CURRENT_MESSAGES = getCurrentMessages();

export const {
  FOOTER,
  HEADER,
  HERO,
  NAVBAR,
  CLASSES,
  GENERATE_THESIS,
  IMPORT_THESIS,
  REGISTERS,
  SYSTEM_CONFIG,
  ABOUT_US,
  CONTACT_US,
  LOGIN,
  REGISTER,
  METADATA,
} = CURRENT_MESSAGES;
