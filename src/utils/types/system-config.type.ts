import { EConfigValueType } from '@/app/(secure)/admin/system-config-manage/_constants/value.type';

export type TSystemConfig = {
  key: string;
  stringValue?: string;
  numberValue?: number;
  booleanValue?: boolean;
  jsonValue?: any;
  createdAt?: string;
  updatedAt?: string;
};
