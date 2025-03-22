import { UserRole } from '@/configs/role.config';

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
  permissions: {
    action: string;
    subject: string;
  }[];
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
