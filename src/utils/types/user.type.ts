import { UserRole } from '@/configs/role.config';

export type User = {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  school?: string;
  department?: string;
  position?: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserFormData = {
  id?: string;
  email: string;
  name?: string;
  phone?: string;
  school?: string;
  department?: string;
  position?: string;
  role: UserRole;
};
