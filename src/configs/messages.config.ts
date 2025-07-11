import { VIETNAMESE_MESSAGES } from './vietnamese-messages';
import { ENGLISH_MESSAGES } from './english-messages';

export const DEFAULT_LANGUAGE = process.env.NEXT_PUBLIC_LANGUAGE || 'en';

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
  SYSTEM_CONFIG_PAGE,
  ABOUT_US,
  CONTACT_US,
  LOGIN,
  REGISTER,
  METADATA,
  PERMISSION_FORM,
  PERMISSION_LIST,
  ROLE_FORM,
  ROLE_LIST,
  ROLES_PAGE,
  USER_DETAIL,
  USER_FORM,
  USERS_LIST,
  USERS_PAGE,
  REGISTER_APPROVE_DIALOG,
  REGISTER_LIST,
  REGISTER_ACTIONS,
  REGISTER_REJECT_DIALOG,
  PROFILE_FORM,
  PROFILE_VIEW,
  USER_SIDEBAR,
  ACCOUNT_PAGE,
  THESIS_DETAIL_DIALOG,
  THESIS_FORM,
  THESIS_TABLE,
  THESIS_CONFIG,
  THESIS_PAGE,
} = CURRENT_MESSAGES;
