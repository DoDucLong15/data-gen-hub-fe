import { UserRole } from '@/configs/role.config';
import { IPermission } from './authorization.type';

export type User = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  school?: string;
  department?: string;
  position?: string;
  role: string;
  roleId: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  permissions: IPermission[];
};

export type UserFormData = {
  id?: string;
  email: string;
  name?: string;
  phone?: string;
  school?: string;
  department?: string;
  position?: string;
  roleId: string;
};
