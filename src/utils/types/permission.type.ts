export type TPermission = {
  id: string;
  description?: string;
  action: string;
  subject: string;
  fields?: any;
  conditions?: any;
  createdAt?: string;
  updatedAt?: string;
};
