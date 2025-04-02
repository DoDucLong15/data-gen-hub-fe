import { useAuth } from '@/context/auth.context';
import { ESubject } from '@/utils/types/authorization.type';
import { EAction } from '@/utils/types/authorization.type';
import React, { ReactNode } from 'react';

interface ProtectedProps {
  children: ReactNode;
  permissions: Array<{ action: EAction; subject: ESubject }>;
  logic?: 'AND' | 'OR';
  fallback?: ReactNode;
}

export const ProtectedComponent: React.FC<ProtectedProps> = ({
  children,
  permissions,
  logic = 'AND',
  fallback = null,
}) => {
  const { checkPermissions } = useAuth();
  const hasAccess = checkPermissions(permissions, logic);

  if (!hasAccess) return <>{fallback}</>;
  return <>{children}</>;
};
