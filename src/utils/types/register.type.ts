export interface Register {
  id: string;
  email: string;
  name: string;
  phone?: string;
  school?: string;
  department?: string;
  position?: string;
  createdAt: Date;
}

export interface RegisterWithRole extends Register {
  roleId: string;
}

export type RegisterStatus = 'approved' | 'rejected' | 'pending';

export interface ApproveData {
  id: string;
  roleId: string;
}
