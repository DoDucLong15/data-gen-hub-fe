export type TRole = {
  id: string;
  name: string;
  description?: string;
  userCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TRoleFormData = {
  id?: string;
  name: string;
  description?: string;
};
