import { TPermission } from './permission.type';

export type TRole = {
  id: string;
  name: string;
  description?: string;
  userCount?: number;
  createdAt?: string;
  updatedAt?: string;
  permissions: TPermission[];
};

export type TRoleFormData = {
  id?: string;
  name: string;
  description?: string;
  permissionIds?: string[];
};
