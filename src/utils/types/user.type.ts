import { UserRole } from '@/configs/role.config';
import { IPermission } from './authorization.type';
import { TImageInfo } from './image.type';

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
  avatar?: TImageInfo;
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
